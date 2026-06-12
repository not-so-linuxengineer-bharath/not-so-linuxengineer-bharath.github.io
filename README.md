# Bharath M. — personal site

A fast, dependency-free static site (plain HTML + CSS). No build step, no framework.

## Structure
```
bharath-site/
  index.html                      # landing / about / skills / writing / contact
  css/style.css                   # all styling (dark theme, responsive)
  articles/
    hft-aws-bare-metal.html       # the HFT low-latency article
```

## Preview locally
```bash
cd bharath-site
python3 -m http.server 8000
# open http://localhost:8000
```

## Things to personalize (search for "EDIT" in index.html)
- About paragraph (role, experience, current focus)
- Contact links: LinkedIn, GitHub, email (currently placeholders `#` / you@example.com)
- Optional: add a photo (drop into an `img/` folder and reference it)

## Add a new article
1. Copy `articles/hft-aws-bare-metal.html` to a new file.
2. Replace the `<article class="post">` content.
3. Add a new `<a class="card">` block in the `#writing` section of `index.html`.

## Hosting options (all work as-is)
- GitHub Pages: push to a repo, enable Pages on the branch root. Free, simple.
- Netlify / Cloudflare Pages: drag-and-drop the folder. Free, HTTPS + custom domain.
- AWS S3 + CloudFront: `aws s3 sync . s3://your-bucket` with static website hosting.
  (Happy to script the S3 + CloudFront setup if you want it on your own AWS account.)

## Note
The article uses only public sources (DPDK + AWS docs, quoted with links) and
no internal tooling — safe to publish.
