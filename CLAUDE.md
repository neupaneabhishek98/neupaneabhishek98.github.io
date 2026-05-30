# Brand Rules

Use only these brand tokens and font stacks for this project. Do not import random colors or fonts, and do not add one-off hex values in components. Add a token here first when a new brand-level value is genuinely needed.

```css
:root {
  /* Core brand colors */
  --color-navy: #023047;
  --color-sky: #219ebc;
  --color-orange: #fb8500;
  --color-red: #ff0002;
  --color-green: #16a34a;
  --color-white: #ffffff;
  --color-matte: #18181b;

  /* Neutral UI scale */
  --gray-50: #f0f2fa;
  --gray-100: #e4e8f4;
  --gray-200: #d8deea;
  --gray-500: #5a6688;
  --gray-800: #2b3253;

  /* Platform colors */
  --brand-facebook: #1877f2;
  --brand-instagram: #e4405f;
  --brand-instagram-gradient: linear-gradient(135deg, #833ab4 0%, #e4405f 45%, #f77737 100%);
  --brand-whatsapp: #25d366;
  --brand-github: #181717;
  --brand-gmail: var(--color-red);
  --brand-android: var(--color-sky);

  /* Semantic aliases */
  --bg: var(--color-matte);
  --bg-elev: var(--color-navy);
  --bg-soft: var(--color-matte);
  --surface: rgba(255, 255, 255, 0.04);
  --surface-hover: rgba(255, 255, 255, 0.08);
  --border: rgba(255, 255, 255, 0.08);
  --text: var(--color-white);
  --text-muted: var(--gray-200);
  --text-soft: var(--gray-100);
  --primary: var(--color-navy);
  --primary-2: var(--color-sky);
  --accent: var(--color-orange);
  --yellow: var(--color-orange);
  --yellow-soft: var(--color-orange);
  --success: var(--color-green);
  --danger: var(--color-red);
  --grad: linear-gradient(135deg, var(--color-navy) 0%, var(--color-sky) 58%, var(--color-orange) 100%);

  /* Shape, effects, and layout */
  --radius-sm: 8px;
  --radius: 14px;
  --radius-lg: 22px;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 30px 60px rgba(0, 0, 0, 0.45);
  --container: 1360px;
  --nav-h: 88px;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);

  /* Fonts */
  --font-body: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-head: 'Sora', 'Manrope', sans-serif;
}

[data-theme="light"] {
  --bg: var(--gray-200);
  --bg-elev: var(--gray-50);
  --bg-soft: var(--gray-100);
  --surface: rgba(24, 24, 27, 0.1);
  --surface-hover: rgba(24, 24, 27, 0.16);
  --border: rgba(24, 24, 27, 0.18);
  --text: var(--color-navy);
  --text-muted: var(--gray-500);
  --text-soft: var(--gray-800);
  --shadow: 0 10px 30px rgba(24, 24, 27, 0.08);
  --shadow-lg: 0 30px 60px rgba(24, 24, 27, 0.12);
}
```

Usage:
- Use `--primary` / `--color-navy` for primary brand surfaces, core text, borders, and tooltip backgrounds.
- Use `--accent` / `--color-orange` for highlights, active states, and call-to-action emphasis.
- Use `--danger` / `--color-red` for destructive actions, validation errors, and red hover states.
- Use `--success` / `--color-green` for success states and green hover states.
- Use platform brand variables only for their matching platform icons or links.
- Use `--font-body` for standard UI text and `--font-head` for headings, logos, and stat numerals.
