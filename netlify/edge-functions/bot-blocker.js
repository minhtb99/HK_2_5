const BLOCKED_USER_AGENTS = [
  "AhrefsBot",
  "AhrefsSiteAudit",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "BLEXBot",
  "YandexBot",
  "PetalBot",
  "Bytespider",
  "GPTBot",
  "GoogleOther",
  "ClaudeBot",
  "CCBot",
  "DataForSeoBot",
  "serpstatbot",
  "linkdexbot",
  "MegaIndex",
  "Factset_spyderbot",
  "LINERBot",
  "Timpibot",
  "AwarioBot",
  "DuckDuckBot",
  "masscan",
  "ZmEu",
  "nikto",
  "sqlmap",
  "zgrab",
  "python-requests",
  "curl/",
  "libwww-perl",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "YouBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "cohere-ai",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "Diffbot",
  "Omgili",
  "Omgilibot",
  "ImagesiftBot",
  "VelenPublicWebCrawler",
  "Webzio-Extended",
  "img2dataset",
  "Applebot-Extended",
];

const MAX_PATH_DEPTH = 6;
const RATE_LIMIT = 200; // requests per minute

// In-memory rate limit store: IP -> { count, windowStart }
const rateLimitMap = new Map();

export default async function handler(request, context) {
  try {
    const url = new URL(request.url);

    // 0. Immediately pass through static assets — no checks, no rate limiting
    const isStaticAsset =
      /\.(css|js|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot|otf|mp4|webm|pdf|json|txt|xml|map)$/i.test(
        url.pathname,
      );
    if (isStaticAsset) {
      return context.next();
    }

    const userAgent = request.headers.get("user-agent") || "";

    // 1. Block by User-Agent
    const isBlocked = BLOCKED_USER_AGENTS.some((bot) =>
      userAgent.toLowerCase().includes(bot.toLowerCase()),
    );
    if (isBlocked) {
      return new Response("Forbidden", { status: 403 });
    }

    // 2. Block excessive path depth
    const pathDepth = url.pathname.split("/").filter(Boolean).length;
    if (pathDepth > MAX_PATH_DEPTH) {
      return new Response("Not Found", { status: 404 });
    }

    // 3. Rate limiting by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const now = Date.now();
    const windowMs = 60 * 1000; // 60 seconds

    const record = rateLimitMap.get(ip);
    if (!record || now - record.windowStart > windowMs) {
      rateLimitMap.set(ip, { count: 1, windowStart: now });
    } else {
      record.count += 1;
      if (record.count > RATE_LIMIT) {
        return new Response("Too Many Requests", {
          status: 429,
          headers: { "Retry-After": "60" },
        });
      }
    }

    return context.next();
  } catch (_err) {
    // On any unexpected error, pass through to avoid breaking the site
    return context.next();
  }
}
