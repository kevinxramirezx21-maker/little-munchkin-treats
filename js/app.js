const PRODUCTS = [
  {
    id: "classic-dozen",
    name: "Classic Cake Pop Dozen",
    price: 42,
    category: "cake-pops",
    min: 1,
    blurb: "A baker’s dozen of hand-dipped vanilla cake pops with drizzle, hearts, and sprinkles.",
    img: "box",
    unit: "box of 12"
  },
  {
    id: "party-dozen",
    name: "Party Mix Dozen",
    price: 46,
    category: "cake-pops",
    min: 1,
    blurb: "Pink, mint, chocolate, and gold pops styled for birthdays, showers, and sweet tables.",
    img: "box",
    unit: "box of 12"
  },
  {
    id: "signature-trio",
    name: "Signature Munchkin Trio Look",
    price: 24,
    category: "cake-pops",
    min: 1,
    blurb: "Six pops inspired by the shop logo: key lime drizzle, rainbow sprinkle, and pink bow.",
    img: "hero",
    unit: "box of 6"
  },
  {
    id: "birthday-six",
    name: "Birthday Bow Cake Pops",
    price: 28,
    category: "seasonal",
    min: 1,
    blurb: "Pink and gold celebration pops with bows and pearl details. Perfect for birthday tables.",
    img: "birthday",
    unit: "box of 6"
  },
  {
    id: "flavor-six",
    name: "Key Lime & Strawberry Six",
    price: 24,
    category: "cake-pops",
    min: 1,
    blurb: "A half-and-half box of citrus-green and strawberry-pink cake pops.",
    img: "flavors",
    unit: "box of 6"
  },
  {
    id: "chocolate-box",
    name: "Chocolate Treat Sampler",
    price: 32,
    category: "chocolate",
    min: 1,
    blurb: "Chocolate-covered strawberries, pretzels, bark, and cocoa truffles on one pretty plate.",
    img: "chocolate",
    unit: "sampler box"
  },
  {
    id: "strawberries",
    name: "Chocolate Strawberries",
    price: 18,
    category: "chocolate",
    min: 1,
    blurb: "Half a dozen ripe strawberries dipped in chocolate and finished with pink sprinkle kisses.",
    img: "chocolate",
    unit: "box of 6"
  },
  {
    id: "custom-dozen",
    name: "Custom Cake Pops",
    price: 48,
    category: "custom",
    min: 1,
    blurb: "Theme colors, character details, or party matching. Starts at $4 each, minimum 12.",
    img: "birthday",
    unit: "from 12 pops"
  }
];

const img = (key) => (window.LMT_IMAGES && LMT_IMAGES[key]) || `images/${key}.jpg`;

const state = {
  page: "home",
  filter: "all",
  cart: JSON.parse(localStorage.getItem("lmt-cart") || "[]"),
  qty: {}
};

function saveCart() {
  localStorage.setItem("lmt-cart", JSON.stringify(state.cart));
  renderCart();
}

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2200);
}

function navigate(page) {
  state.page = page;
  document.querySelectorAll(".page").forEach((p) => p.classList.toggle("active", p.dataset.page === page));
  document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === page));
  document.getElementById("navLinks").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (page === "shop") renderProducts();
}

function productById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function addToCart(id, qty = 1) {
  const item = state.cart.find((i) => i.id === id);
  if (item) item.qty += qty;
  else state.cart.push({ id, qty });
  saveCart();
  toast("Added to your treat box");
}

function setQty(id, qty) {
  const item = state.cart.find((i) => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart();
}

function removeItem(id) {
  state.cart = state.cart.filter((i) => i.id !== id);
  saveCart();
}

function cartCount() {
  return state.cart.reduce((n, i) => n + i.qty, 0);
}

function cartTotal() {
  return state.cart.reduce((n, i) => n + productById(i.id).price * i.qty, 0);
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const list = PRODUCTS.filter((p) => state.filter === "all" || p.category === state.filter);
  grid.innerHTML = list.map((p) => `
    <article class="product">
      <img src="${img(p.img)}" alt="${p.name}">
      <div class="product-body">
        <h3>${p.name}</h3>
        <p class="muted">${p.blurb}</p>
        <div class="price-row">
          <div>
            <div class="price">$${p.price.toFixed(2)}</div>
            <small class="muted">${p.unit}</small>
          </div>
          <button class="btn btn-primary" onclick="addToCart('${p.id}', 1)">Add</button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderCart() {
  document.getElementById("cartCount").textContent = cartCount();
  const box = document.getElementById("cartItems");
  if (!state.cart.length) {
    box.innerHTML = "<p class='muted'>Your treat box is empty. Add a dozen pops and we will make them cute.</p>";
  } else {
    box.innerHTML = state.cart.map((line) => {
      const p = productById(line.id);
      return `<div class="cart-line">
        <img src="${img(p.img)}" alt="">
        <div>
          <strong>${p.name}</strong>
          <div class="muted">$${p.price.toFixed(2)} · ${p.unit}</div>
          <div class="qty">
            <button onclick="setQty('${p.id}', ${line.qty - 1})">−</button>
            <span>${line.qty}</span>
            <button onclick="setQty('${p.id}', ${line.qty + 1})">+</button>
            <button onclick="removeItem('${p.id}')" style="border:0;background:none;color:#c75d7a;cursor:pointer">Remove</button>
          </div>
        </div>
        <strong>$${(p.price * line.qty).toFixed(2)}</strong>
      </div>`;
    }).join("");
  }
  document.getElementById("cartTotal").textContent = `$${cartTotal().toFixed(2)}`;
}

function toggleCart(open) {
  document.getElementById("drawer").classList.toggle("open", open);
  document.getElementById("drawerBg").classList.toggle("open", open);
}

function checkout() {
  if (!state.cart.length) return toast("Add something sweet first");
  toggleCart(false);
  navigate("checkout");
  const summary = document.getElementById("orderSummary");
  summary.innerHTML = state.cart.map((line) => {
    const p = productById(line.id);
    return `<div class="price-row"><span>${p.name} × ${line.qty}</span><strong>$${(p.price * line.qty).toFixed(2)}</strong></div>`;
  }).join("") + `<div class="price-row"><span>Total</span><strong>$${cartTotal().toFixed(2)}</strong></div>`;
}

function placeOrder(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const lines = state.cart.map((line) => {
    const p = productById(line.id);
    return `${p.name} x${line.qty} = $${(p.price * line.qty).toFixed(2)}`;
  }).join("%0A");
  const body = `New Little Munchkin Treats order%0A%0AName: ${data.name}%0APhone: ${data.phone}%0AEmail: ${data.email}%0AEvent date: ${data.date}%0AFulfillment: ${data.fulfillment}%0A%0AItems:%0A${lines}%0ATotal: $${cartTotal().toFixed(2)}%0A%0ANotes:%0A${data.notes || "None"}`;
  const mailto = `mailto:hello@littlemunchkintreats.com?subject=Treat%20order%20from%20${encodeURIComponent(data.name)}&body=${body}`;
  document.getElementById("successBox").style.display = "block";
  document.getElementById("mailtoLink").href = mailto;
  localStorage.setItem("lmt-last-order", JSON.stringify({ data, cart: state.cart, total: cartTotal(), at: new Date().toISOString() }));
  state.cart = [];
  saveCart();
}

function submitCustom(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const qty = Number(data.quantity || 12);
  const estimate = Math.max(qty, 12) * 4;
  const body = `Custom cake pop request%0A%0AName: ${data.cname}%0APhone: ${data.cphone}%0ATheme: ${data.theme}%0AColors: ${data.colors}%0AQuantity: ${qty}%0ANeeded by: ${data.cdate}%0AEstimate: $${estimate.toFixed(2)} (final quoted after design)%0A%0ADetails:%0A${data.details || ""}`;
  window.location.href = `mailto:hello@littlemunchkintreats.com?subject=Custom%20cake%20pop%20request&body=${body}`;
  toast("Opening email so Mom can confirm the custom order");
}

function hydrateImages() {
  document.querySelectorAll("[data-img]").forEach((el) => {
    el.src = img(el.dataset.img);
  });
  const fav = document.getElementById("favicon");
  if (fav && LMT_IMAGES?.favicon) fav.href = LMT_IMAGES.favicon;
}

window.addEventListener("DOMContentLoaded", () => {
  hydrateImages();
  renderProducts();
  renderCart();
  const hash = location.hash.replace("#", "");
  if (hash) navigate(hash);
});
