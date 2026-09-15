# Little Munchkin Treats

Official website for Mom’s handmade cake pops and chocolate treats.

**Repository:** https://github.com/kevinxramirezx21-maker/little-munchkin-treats

**Live site (after Pages is turned on):**  
https://kevinxramirezx21-maker.github.io/little-munchkin-treats/

## Turn the site on (one click)

GitHub will not publish the site until Pages is enabled on this repo.

1. Open [Settings → Pages](https://github.com/kevinxramirezx21-maker/little-munchkin-treats/settings/pages)
2. Under **Build and deployment → Source**, pick **GitHub Actions**
   - or **Deploy from a branch** → `main` / `/ (root)`
3. Save
4. Wait 1–2 minutes, then open the live URL above

If the Actions tab asks you to approve the `github-pages` environment, click **Approve**.

## Custom domain later

When you buy a domain:

1. Add a `CNAME` file in this repo with just the domain (example: `littlemunchkintreats.com`)
2. In the domain registrar, point DNS to GitHub Pages
3. Add the same domain under Settings → Pages → Custom domain

## What the site does

- Home, shop, custom orders, story, FAQ, checkout
- Cart saved in the browser
- Checkout drafts an email order to `hello@littlemunchkintreats.com`
- Branding from the official logo and thank-you cards
- Instagram + TikTok links
- Pickup messaging for Fontana / Inland Empire

## Payments

This version does **not** charge a card. After an order request, confirm the date and collect Zelle / Venmo / Cash App. Square or Stripe can be added later.

## Edit products or prices

Open `js/app.js` and change the `PRODUCTS` list.

## Local preview

Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8080
```
