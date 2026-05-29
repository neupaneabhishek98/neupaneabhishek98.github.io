# Brand CSS Rules

Use these project brand tokens directly instead of introducing new one-off colors.

```css
:root {
  --color-sky: #219ebc;
  --color-navy: #023047;
  --color-orange: #fb8500;
  --color-yellow: var(--color-orange);
  --color-white: #ffffff;
  --color-matte: #18181b;

  --brand-facebook: #1877f2;
  --brand-instagram: #e4405f;
  --brand-instagram-gradient: linear-gradient(135deg, #833ab4 0%, #e4405f 45%, #f77737 100%);
  --brand-whatsapp: #25d366;
  --brand-github: #181717;
  --brand-gmail: #ea4335;

  --bg: var(--color-matte);
  --bg-elev: var(--color-navy);
  --bg-soft: var(--color-matte);
  --text: var(--color-white);
  --primary: var(--color-navy);
  --primary-2: var(--color-sky);
  --accent: var(--color-orange);
  --success: var(--color-sky);
  --danger: var(--color-orange);
  --grad: linear-gradient(135deg, var(--color-navy) 0%, var(--color-sky) 58%, var(--color-orange) 100%);
}
```

Brand usage:
- Use `--primary` / `--color-navy` for core dark-blue brand surfaces, borders, and title tooltip backgrounds.
- Use `--accent` / `--color-orange` for highlights, active states, hover glows, and call-to-action emphasis.
- Use social brand variables only for their matching platform icons or hover states.
- Keep separator dots and structural marks dark navy unless explicitly requested otherwise.
