/**
 * Build script for portfolio site
 * - Copies all files to dist/
 * - Minifies CSS and JS files
 * - Minifies HTML files
 */
import { readFileSync, writeFileSync, cpSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { resolve, join, extname } from 'path';

const ROOT = resolve('.');
const DIST = resolve('dist');

// Files/dirs to exclude from copy
const EXCLUDE = new Set([
  'node_modules', '.git', '.gitignore', 'dist', 'package.json', 'package-lock.json',
  'vite.config.js', 'scripts', '.vite',
]);

// Step 1: Clean and copy everything to dist
console.log('📦 Copying files to dist/...\n');
if (existsSync(DIST)) {
  cpSync(DIST, DIST, { recursive: true }); // no-op to validate
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

// Step 2: Minify CSS files
console.log('\n🎨 Minifying CSS files...\n');
await minifyCssFiles(join(DIST, 'assets/css'));

// Step 3: Minify custom JS files (not vendor - already minified)
console.log('\n⚡ Minifying JS files...\n');
await minifyJsFiles(join(DIST, 'assets/js'));

// Step 4: Minify HTML files
console.log('\n📄 Minifying HTML files...\n');
await minifyHtmlFiles(DIST);

// Step 5: Update HTML to use minified files
console.log('\n🔗 Updating HTML references...\n');
updateHtmlReferences(join(DIST, 'index.html'));

console.log('\n✅ Build complete!\n');

// --- Helper functions ---

async function minifyCssFiles(dir) {
  if (!existsSync(dir)) return;
  const files = readdirSync(dir).filter(f => f.endsWith('.css') && !f.endsWith('.min.css'));

  for (const file of files) {
    const filePath = join(dir, file);
    const css = readFileSync(filePath, 'utf-8');
    const originalSize = Buffer.byteLength(css);

    // Simple CSS minification: remove comments, whitespace, newlines
    const minified = css
      .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
      .replace(/\s+/g, ' ')            // collapse whitespace
      .replace(/\s*([{}:;,>~+])\s*/g, '$1') // remove space around selectors
      .replace(/;}/g, '}')             // remove last semicolon
      .replace(/^\s+|\s+$/g, '')        // trim
      .trim();

    const minFile = file.replace('.css', '.min.css');
    writeFileSync(join(dir, minFile), minified);
    const newSize = Buffer.byteLength(minified);
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
    console.log(`  ✓ ${file} → ${minFile}: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savings}% smaller)`);
  }
}

async function minifyJsFiles(dir) {
  if (!existsSync(dir)) return;
  const files = readdirSync(dir).filter(f => f.endsWith('.js') && !f.endsWith('.min.js'));

  for (const file of files) {
    const filePath = join(dir, file);
    const code = readFileSync(filePath, 'utf-8');
    const originalSize = Buffer.byteLength(code);

    // Use oxc-minify if available, fallback to basic minification
    let minified;
    try {
      const { minify } = await import('oxc-minify');
      const result = await minify(file, code);
      minified = result.code;
    } catch {
      // Fallback: basic JS minification (remove comments, excess whitespace)
      minified = code
        .replace(/\/\*[\s\S]*?\*\//g, '')        // block comments
        .replace(/\/\/.*$/gm, '')                   // line comments
        .replace(/^\s+/gm, '')                      // leading whitespace
        .replace(/\n{2,}/g, '\n')                   // multiple newlines
        .trim();
    }

    const minFile = file.replace('.js', '.min.js');
    writeFileSync(join(dir, minFile), minified);
    const newSize = Buffer.byteLength(minified);
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
    console.log(`  ✓ ${file} → ${minFile}: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savings}% smaller)`);
  }
}

async function minifyHtmlFiles(dir) {
  const files = readdirSync(dir).filter(f => f.endsWith('.html'));

  for (const file of files) {
    const filePath = join(dir, file);
    const html = readFileSync(filePath, 'utf-8');
    const originalSize = Buffer.byteLength(html);

    // Simple HTML minification: remove extra whitespace between tags
    const minified = html
      .replace(/<!--(?!\[if).*?-->/gs, '')  // remove comments (except IE conditionals)
      .replace(/^\s+/gm, '')                // remove leading whitespace
      .replace(/\n{2,}/g, '\n')             // collapse blank lines
      .trim();

    writeFileSync(filePath, minified);
    const newSize = Buffer.byteLength(minified);
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
    console.log(`  ✓ ${file}: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savings}% smaller)`);
  }
}

function updateHtmlReferences(htmlPath) {
  if (!existsSync(htmlPath)) return;
  let html = readFileSync(htmlPath, 'utf-8');

  // Replace source CSS with minified version
  html = html.replace(
    'href="assets/css/style.css"',
    'href="assets/css/style.min.css"'
  );

  // Replace source JS with minified version
  html = html.replace(
    'src="assets/js/main.js"',
    'src="assets/js/main.min.js"'
  );
  html = html.replace(
    'src="assets/js/extends.js"',
    'src="assets/js/extends.min.js"'
  );
  html = html.replace(
    'src="assets/js/form.js"',
    'src="assets/js/form.min.js"'
  );

  writeFileSync(htmlPath, html);
  console.log('  ✓ Updated index.html references to minified files');
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}
