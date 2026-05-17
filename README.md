# Huỳnh Cẩm Tuấn (Tuna Dev) - Personal Portfolio

Trang web giới thiệu năng lực (Portfolio) cá nhân của **Huỳnh Cẩm Tuấn (Tuna Dev)** - Senior Software Engineer. Dự án được thiết kế chuyên nghiệp, tối ưu hóa hiệu suất tải trang cực nhanh (Instant Paint) và tuân thủ các tiêu chuẩn SEO kỹ thuật nâng cao.

---

## 🛠️ Yêu cầu hệ thống
Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:
*   [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản LTS mới nhất - v18 trở lên)
*   [npm](https://www.npmjs.com/) (Trình quản lý gói đi kèm với Node.js)

---

## 🚀 Hướng dẫn cài đặt và khởi chạy

### 1. Cài đặt các gói phụ thuộc (Dependencies)
Mở terminal tại thư mục gốc của dự án và chạy lệnh sau để cài đặt các thư viện cần thiết:
```bash
npm install
```

### 2. Chạy ứng dụng ở môi trường phát triển (Development Mode)
Khởi chạy máy chủ ảo (dev server) với tính năng Hot Module Replacement (HMR) giúp cập nhật thay đổi tức thì trên trình duyệt:
```bash
npm run dev
```
Sau khi chạy lệnh, truy cập địa chỉ hiển thị trong terminal (thường là `http://localhost:5173` hoặc `http://localhost:3000`) để xem trang web.

### 3. Đóng gói ứng dụng cho môi trường Production (Build)
Dự án sử dụng hệ thống build tối ưu hóa tùy chỉnh thông qua [scripts/build.mjs](file:///d:/environment/source/personal/portfolio/scripts/build.mjs). Lệnh này sẽ dọn dẹp thư mục cũ, nén ảnh, nén CSS/JS và minify HTML để tối đa hóa điểm số PageSpeed:
```bash
npm run build
```
Sản phẩm sau khi đóng gói sẽ nằm trong thư mục `/dist`. Bạn có thể lấy toàn bộ nội dung thư mục này để đưa lên bất kỳ dịch vụ hosting tĩnh nào (GitHub Pages, Netlify, Vercel, VPS...).

### 4. Xem trước bản đóng gói (Preview Production)
Để kiểm tra sản phẩm sau khi đóng gói chạy như thế nào trước khi deploy:
```bash
npm run preview
```

---

## 📁 Cấu trúc thư mục dự án
```text
portfolio/
├── assets/             # Các tệp tài nguyên tĩnh (CSS, JS, Fonts, Img)
│   ├── css/            # Stylesheet chính (style.css)
│   ├── js/             # Mã nguồn Javascript logic (main.js, extends.js, form.js)
│   └── img/            # Hình ảnh gốc của dự án (WebP, SVG)
├── dist/               # Thư mục chứa sản phẩm hoàn chỉnh sau khi chạy lệnh 'npm run build'
├── public/             # Thư mục tài nguyên công khai
├── scripts/            # Chứa script build.mjs xử lý nén asset nâng cao
├── index.html          # File HTML cấu trúc giao diện chính
├── robots.txt          # Cấu hình chỉ thị cho Googlebot thu thập dữ liệu
├── sitemap.xml         # Bản đồ trang web giúp index Google Search nhanh hơn
├── package.json        # Cấu hình script và các dependencies của Node.js
└── vite.config.js      # Cấu hình công cụ bundler Vite
```

---

## ✨ Các điểm nổi bật của dự án

1.  **Tối ưu hóa SEO đỉnh cao:**
    *   Sử dụng hình ảnh chuẩn `.webp` siêu nhẹ và được tối ưu hóa tên tệp theo từ khóa SEO thương hiệu (`huynh-cam-tuan-senior-backend-engineer.webp`).
    *   Tệp `sitemap.xml` và `robots.txt` chuẩn chỉ giúp tăng tốc độ lập chỉ mục từ khóa trên Google Search.
2.  **Bảo vệ dữ liệu nhạy cảm cực tốt:**
    *   Thông tin dự án nhạy cảm (như NFT Gofox) được tải động thông qua file [assets/js/extends.js](file:///d:/environment/source/personal/portfolio/assets/js/extends.js) bằng cơ chế cuộn trang, tránh bot thô cào dữ liệu.
    *   Cấu hình `robots.txt` chặn riêng `extends.js` để bảo vệ dữ liệu nhạy cảm khỏi Googlebot nhưng vẫn cho phép lập chỉ mục các file CSS/JS giao diện thông thường giúp giữ vững điểm thân thiện của Google.
3.  **Tối ưu hóa tốc độ tải trang:**
    *   Minify toàn bộ HTML/CSS/JS và cache-busting tự động mỗi lần build.
    *   Preload các ảnh banner quan trọng ở trên cùng để tăng tốc độ hiển thị bức vẽ đầu tiên (Instant Paint).
