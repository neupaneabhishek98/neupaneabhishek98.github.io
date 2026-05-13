# Abhishek Neupane - Portfolio

A professional, fully responsive single-page portfolio website for Abhishek Neupane, built with plain HTML, CSS, and JavaScript - no build tools required. Designed to be hosted on **GitHub Pages**.

## Sections

1. **Hero** - Animated headline with typewriter effect and two CTAs (View My Work / Contact Me).
2. **About** - Personal bio, focus areas, and tech stack.
3. **Portfolio** - Project direction cards for web, UI, and app work.
4. **CV** - Experience, practice, education, and CV download.
5. **Contact** - Get-in-touch form using `mailto:` so it works on static hosting.

## Features

- Fully responsive, mobile-first layout
- Light/Dark theme toggle (persists in `localStorage`)
- Smooth scrolling, scroll-spy active nav, scroll-reveal animations
- Animated hero background (blobs + grid)
- Typewriter headline
- Accessible mobile menu
- Validated contact form that opens the user's email client
- Reduced-motion support
- Zero dependencies - just open `index.html`

## File structure

```
.
|-- index.html      # Markup
|-- styles.css      # All styles + themes + responsive rules
|-- script.js       # Interactivity (menu, theme, reveal, form)
`-- README.md
```

## Run locally

Just open `index.html` in your browser. That's it.

Or serve it with any static server, e.g.:

```bash
# Python 3
python -m http.server 8000

# Node (npx)
npx serve .
```

## Deploy to GitHub Pages

1. **Create a repo** on GitHub (e.g., `portfolio` or `your-username.github.io`).
2. **Push these files** to the repo's `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In GitHub: **Settings > Pages**.
4. Under *Source*, choose **Deploy from a branch**, pick `main` and the `/ (root)` folder, then **Save**.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/` in a minute or two.

Tip: If you name the repo `<your-username>.github.io`, your site will be served from the root domain (`https://<your-username>.github.io/`).

## Customise

Open `index.html` and update:

- **Name, headline, bio** - search for `Abhishek` and edit the surrounding text.
- **Project cards** - find `class="project-card"` blocks; replace titles, descriptions, tech stacks, and links. Swap `pattern-1` through `pattern-6` for your own image (`<img>`) inside `.project-thumb` if you'd like real screenshots.
- **CV timeline** - find `class="timeline-item"` and update dates, roles, and descriptions.
- **CV download** - drop your PDF (e.g. `cv.pdf`) next to `index.html` and change the `href="#"` on the **Download CV** link to `href="cv.pdf"`.
- **Social links** - find `class="social-link"` and add your GitHub, LinkedIn, X, and Dribbble URLs.
- **Email address** - search for `neupaneabhishek98@gmail.com` and replace if needed.

The colour palette and typography live as CSS variables at the top of `styles.css` - change once, everything updates.

## License

MIT - feel free to fork and make it your own.
