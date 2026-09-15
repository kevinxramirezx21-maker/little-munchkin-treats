# Little Munchkin Treats

Handmade cake pops and chocolate treats website.

Live repo: https://github.com/kevinxramirezx21-maker/little-munchkin-treats

## Turn on GitHub Pages

1. Open the repo on GitHub.
2. Go to **Settings → Pages**.
3. Source: **Deploy from a branch**.
4. Branch: `main` / folder: `/ (root)`.
5. Save. The site will be at:

`https://kevinxramirezx21-maker.github.io/little-munchkin-treats/`

To use a custom domain later, add a `CNAME` file with the domain and point DNS to GitHub Pages.

## What the site does

- Brand home page using the official logo and thank-you card look
- Shop with add-to-cart (saved in the browser)
- Checkout form that drafts an email order to the kitchen
- Custom cake-pop request form
- Instagram + TikTok links
- Pickup messaging for the Fontana / Inland Empire area

## Payments

This first version does **not** charge a card. After an order request, confirm the date and collect Zelle / Venmo / Cash App. Square or Stripe can be added when you are ready for live payments.

## Edit products or prices

Open `js/app.js` and change the `PRODUCTS` list.

## Local preview

Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8080
```
