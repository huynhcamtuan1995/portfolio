/**
 * Advanced Build script for portfolio site
 * - Cleans dist/
 * - Copies assets
 * - Minifies CSS (Clean-CSS) with content hashing
 * - Minifies JS (Terser) with content hashing
 * - Minifies HTML (html-minifier-terser)
 * - Updates HTML references to hashed/minified files
 */
import { readFileSync, writeFileSync, cpSync, mkdirSync, readdirSync, existsSync, rmSync, unlinkSync } from 'fs';
import { resolve, join, basename, dirname } from 'path';
import { createHash } from 'crypto';
import CleanCSS from 'clean-css';
import { minify as minifyJs } from 'terser';
import { minify as minifyHtml } from 'html-minifier-terser';

const ROOT = resolve('.');
const DIST = resolve('dist');

// Files/dirs to exclude from copy
const EXCLUDE = new Set([
  'node_modules', '.git', '.gitignore', 'dist', 'package.json', 'package-lock.json',
  'vite.config.js', 'scripts', '.vite',
]);

// Map to track original file paths to their hashed versions for HTML replacement
const hashMap = new Map();

async function runBuild() {
  try {
    // Step 1: Clean and copy everything to dist
    console.log('📦 Initializing build folder...\n');
    if (existsSync(DIST)) {
      console.log('  🧹 Cleaning old dist/ folder...');
      rmSync(DIST, { recursive: true, force: true });
    }
    mkdirSync(DIST, { recursive: true });

    // Copy all files except excluded ones
    const entries = readdirSync(ROOT);
    for (const entry of entries) {
      if (EXCLUDE.has(entry)) continue;
      const src = join(ROOT, entry);
      const dest = join(DIST, entry);
      cpSync(src, dest, { recursive: true });
      console.log(`  ✓ Copied: ${entry}`);
    }

    // Step 2: Minify and Hash CSS files
    console.log('\n🎨 Processing CSS files...\n');
    await processCssFiles(join(DIST, 'assets/css'));

    // Step 3: Minify and Hash JS files
    console.log('\n⚡ Processing JS files...\n');
    await processJsFiles(join(DIST, 'assets/js'));

    // Step 4: Update HTML to use hashed/minified files
    console.log('\n🔗 Updating HTML references...\n');
    updateHtmlReferences(join(DIST, 'index.html'));

    // Step 5: Minify HTML files
    console.log('\n📄 Minifying HTML files...\n');
    await processHtmlFiles(DIST);

    console.log('\n✅ Build complete and cache-busted!\n');
  } catch (err) {
    console.error('\n❌ Build failed:', err);
    process.exit(1);
  }
}

// --- Helper functions ---

function generateHash(content) {
  return createHash('md5').update(content).digest('hex').substring(0, 8);
}

async function processCssFiles(dir) {
  if (!existsSync(dir)) return;
  const files = readdirSync(dir).filter(f => f.endsWith('.css') && !f.endsWith('.min.css'));

  for (const file of files) {
    const filePath = join(dir, file);
    const css = readFileSync(filePath, 'utf-8');
    const originalSize = Buffer.byteLength(css);

    const minified = new CleanCSS({ level: 2 }).minify(css).styles;
    const hash = generateHash(minified);
    const hashedFile = file.replace('.css', `.${hash}.min.css`);
    
    const outputDir = dirname(filePath);
    writeFileSync(join(outputDir, hashedFile), minified);
    
    // Track for HTML update: e.g., "assets/css/style.css" -> "assets/css/style.8d3f.min.css"
    const relOrig = join('assets/css', file).replace(/\\/g, '/');
    const relHashed = join('assets/css', hashedFile).replace(/\\/g, '/');
    hashMap.set(relOrig, relHashed);

    // Clean up original file from dist
    unlinkSync(filePath);

    const newSize = Buffer.byteLength(minified);
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
    console.log(`  ✓ ${file} → ${hashedFile}: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savings}% smaller)`);
  }
}

async function processJsFiles(dir) {
  if (!existsSync(dir)) return;
  const files = readdirSync(dir).filter(f => f.endsWith('.js') && !f.endsWith('.min.js'));

  for (const file of files) {
    const filePath = join(dir, file);
    const code = readFileSync(filePath, 'utf-8');
    const originalSize = Buffer.byteLength(code);

    const minifiedResult = await minifyJs(code, {
      compress: { passes: 2 },
      mangle: true
    });
    
    const minified = minifiedResult.code;
    const hash = generateHash(minified);
    const hashedFile = file.replace('.js', `.${hash}.min.js`);
    
    const outputDir = dirname(filePath);
    writeFileSync(join(outputDir, hashedFile), minified);

    // Track for HTML update
    const relOrig = join('assets/js', file).replace(/\\/g, '/');
    const relHashed = join('assets/js', hashedFile).replace(/\\/g, '/');
    hashMap.set(relOrig, relHashed);

    // Clean up original file from dist
    unlinkSync(filePath);

    const newSize = Buffer.byteLength(minified);
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
    console.log(`  ✓ ${file} → ${hashedFile}: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savings}% smaller)`);
  }
}

function updateHtmlReferences(htmlPath) {
  if (!existsSync(htmlPath)) return;
  let html = readFileSync(htmlPath, 'utf-8');

  // Replace all mapped files
  let count = 0;
  for (const [orig, hashed] of hashMap.entries()) {
    // Regex to find the exact relative path in href or src
    const regex = new RegExp(`(href|src)=["']${orig}["']`, 'g');
    if (regex.test(html)) {
      html = html.replace(regex, `$1="${hashed}"`);
      count++;
    }
  }

  writeFileSync(htmlPath, html);
  console.log(`  ✓ Updated ${count} references in ${basename(htmlPath)}`);
}

async function processHtmlFiles(dir) {
  const files = readdirSync(dir).filter(f => f.endsWith('.html'));

  for (const file of files) {
    const filePath = join(dir, file);
    const html = readFileSync(filePath, 'utf-8');
    const originalSize = Buffer.byteLength(html);

    const minified = await minifyHtml(html, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
      removeAttributeQuotes: true
    });

    writeFileSync(filePath, minified);
    const newSize = Buffer.byteLength(minified);
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
    console.log(`  ✓ ${file}: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savings}% smaller)`);
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

// Run the build
runBuild();
