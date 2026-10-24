# Go-Live Poster

**Open it:** https://buyittradeit-spec.github.io/go-live-poster/

A one-page helper for BuyItTradeIt streams and uploads. Paste a stream or video link once and get ready-to-post text for every channel.

- X, Bluesky, Threads, Facebook, Pinterest, Reddit: a post sized for each platform, with Copy and Open buttons
- Discord / YouTube community: a longer post to paste in
- Video upload kits: title, description and tags ready to paste into each site's upload page (YouTube, Rumble, Odysee, Dailymotion, Twitch, plus Shorts, TikTok and Reels for clips). You attach the video file on each site yourself; the page never uploads it.
- Optional per-platform link tags (`utm_source`) so site stats show which post sent each visitor

No server, no API keys, no AI calls. The page keeps only your last 8 links and your hashtags in your own browser.

## Run it

Open `index.html` in any browser, or turn on GitHub Pages:
Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / root → Save.

## Pages

- `index.html`: the poster. Paste a link, get posts for every platform, then hit Post everywhere.
- `recap.html`: after a stream, log moments, levels, trades and the lesson. Get a replay post, YouTube chapters and a full description, then send the post to the poster.
- `overlay.html`: build an OBS browser-source overlay with a QR code for your site, Streamlabs tip jar and deals page. Optional Streamlabs socket token adds tip and follow pop-ups.

`qrcode.js` is [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) by Kazuhiko Arase, MIT license.
