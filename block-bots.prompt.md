---
description: "Tạo các file chặn bot spam và crawler cho Netlify site: robots.txt, edge function, và cập nhật netlify.toml"
name: "Block Bots & Crawlers (Netlify)"
argument-hint: "Tên domain của site (VD: example.com)"
agent: "agent"
---

Tạo hoặc cập nhật các file cần thiết để chặn bot spam và crawler cho Netlify site có domain `$ARGUMENTS`.

## 1. `main/robots.txt`

Tạo file `main/robots.txt` với nội dung:

- Cho phép Googlebot, Bingbot với `Crawl-delay`
- Chặn hoàn toàn các bot spam phổ biến: AhrefsBot, AhrefsSiteAudit, SemrushBot, MJ12bot, DotBot, BLEXBot, YandexBot, PetalBot, Bytespider, GPTBot, GoogleOther, ClaudeBot, CCBot, DataForSeoBot, serpstatbot, linkdexbot, MegaIndex, Screaming Frog, Factset_spyderbot, LINER Bot, Timpibot, AwarioBot, DuckDuckBot
- Chặn AI Agent crawler: Claude-SearchBot, anthropic-ai, PerplexityBot, YouBot, OAI-SearchBot, ChatGPT-User, cohere-ai, Meta-ExternalAgent, Meta-ExternalFetcher, Diffbot, Omgili, Omgilibot, ImagesiftBot, Kangaroo Bot, Timpibot, VelenPublicWebCrawler, Webzio-Extended, img2dataset, Applebot-Extended
- Default `User-agent: *` với `Crawl-delay: 10` và Disallow các path nhạy cảm: `/wp-json/`, `/wp-content/`, `/wp-includes/`, `/cdn-cgi/`, `/data/`
- Thêm `Sitemap: https://$ARGUMENTS/sitemap.xml`

## 2. `netlify/edge-functions/bot-blocker.js`

Tạo Netlify Edge Function (Deno runtime) tại `netlify/edge-functions/bot-blocker.js`:

- Danh sách `BLOCKED_USER_AGENTS` gồm: AhrefsBot, AhrefsSiteAudit, SemrushBot, MJ12bot, DotBot, BLEXBot, YandexBot, PetalBot, Bytespider, GPTBot, GoogleOther, ClaudeBot, CCBot, DataForSeoBot, serpstatbot, linkdexbot, MegaIndex, Factset_spyderbot, LINERBot, Timpibot, AwarioBot, DuckDuckBot, masscan, ZmEu, nikto, sqlmap, zgrab, python-requests, curl/, libwww-perl, Claude-SearchBot, anthropic-ai, PerplexityBot, YouBot, OAI-SearchBot, ChatGPT-User, cohere-ai, Meta-ExternalAgent, Meta-ExternalFetcher, Diffbot, Omgili, Omgilibot, ImagesiftBot, VelenPublicWebCrawler, Webzio-Extended, img2dataset, Applebot-Extended
- Hằng số `MAX_PATH_DEPTH = 6`
- Hằng số `RATE_LIMIT = 200` (request/phút) — dùng in-memory Map lưu `{ count, windowStart }` theo IP
- Logic:
  1. Nếu `User-Agent` khớp danh sách → trả về `403 Forbidden`
  2. Nếu độ sâu path > `MAX_PATH_DEPTH` → trả về `404 Not Found` (bỏ qua kiểm tra với static assets: `.css|.js|.png|.jpg|.jpeg|.gif|.webp|.svg|.ico|.woff|.woff2|.ttf|.eot|.otf|.mp4|.webm|.pdf|.json`):

  ```js
  // 2. Block excessive path depth (skip static assets)
  const url = new URL(request.url);
  const isStaticAsset =
    /\.(css|js|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot|otf|mp4|webm|pdf|json)$/i.test(
      url.pathname,
    );
  const pathDepth = url.pathname.split("/").filter(Boolean).length;
  if (!isStaticAsset && pathDepth > MAX_PATH_DEPTH) {
    return new Response("Not Found", { status: 404 });
  }
  ```

  3. Lấy IP từ header `x-forwarded-for` hoặc `x-real-ip`; đếm request trong cửa sổ 60 giây; nếu vượt `RATE_LIMIT` → trả về `429 Too Many Requests` với header `Retry-After: 60`
  4. Ngược lại → `context.next()`

## 3. `netlify.toml`

Cập nhật `netlify.toml` để đăng ký edge function trước redirect:

```toml
[build]
  publish = "main"

[build.environment]
  SECRETS_SCAN_SMART_DETECTION_ENABLED = "false"

[[edge_functions]]
  path = "/*"
  function = "bot-blocker"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Lưu ý

- Đọc file `netlify.toml` hiện tại trước khi chỉnh sửa để tránh ghi đè cấu hình có sẵn
- Nếu `robots.txt` đã tồn tại, merge danh sách bot thay vì ghi đè hoàn toàn
- Nếu edge function đã tồn tại, chỉ cập nhật danh sách `BLOCKED_USER_AGENTS`, `MAX_PATH_DEPTH`, và `RATE_LIMIT`
