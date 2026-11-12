// ==================================
// PULSAKULA - SISTEM PELANGGAN
// ==================================

const ADMIN_WA = "6283894053143";

let products = [];
let selectedProduct = null;
let cart = [];
let activeCategory = "Semua";

const serviceList = [
  ["Pulsa", "📱", "Isi ulang pulsa"],
  ["Paket Data", "🌐", "Paket internet"],
  ["Masa Aktif", "⏳", "Perpanjang masa aktif"],
  ["Token PLN", "⚡", "Token listrik"],
  ["E-Wallet", "💳", "Isi saldo e-wallet"],
  ["Voucher Game", "🎮", "Top up permainan"],
  ["Telepon & SMS", "☎️", "Paket komunikasi"],
  ["TV & Hiburan", "📺", "Voucher hiburan"],
  ["Tagihan", "🧾", "Bayar tagihan"],
  ["PDAM", "💧", "Tagihan air"],
  ["BPJS", "🏥", "Iuran BPJS"],
  ["Internet & WiFi", "📡", "Pembayaran internet"]
];

const rupiah = value =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);

function el(id) {
  return document.getElementById(id);
}

// ==================================
// NORMALISASI KATEGORI
// ==================================

function normalizeCategory(category) {
  const value = String(category || "").toLowerCase().trim();

  const mapping = {
    "token listrik": "Token PLN",
    "pln": "Token PLN",
    "top up game": "Voucher Game",
    "game": "Voucher Game",
    "e wallet": "E-Wallet",
    "ewallet": "E-Wallet",
    "masa aktif": "Masa Aktif",
    "telepon dan sms": "Telepon & SMS",
    "tv": "TV & Hiburan",
    "internet": "Internet & WiFi"
  };

  const found = Object.keys(mapping).find(key => value === key);
  if (found) return mapping[found];

  const service = serviceList.find(
    item => item[0].toLowerCase() === value
  );
  return service ? service[0] : category;
}

function getIcon(category) {
  const service = serviceList.find(
    item => item[0] === category
  );
  return service ? service[1] : "📦";
}

// ==================================
// DATA PRODUK
// ==================================

function loadProducts() {
  const dataProduk = [
    // PULSA
    { category: "Pulsa", name: "Telkomsel 5.000", price: 6500 },
    { category: "Pulsa", name: "Telkomsel 10.000", price: 11500 },
    { category: "Pulsa", name: "Indosat 10.000", price: 11000 },
    { category: "Pulsa", name: "XL 10.000", price: 11000 },
    { category: "Pulsa", name: "Tri 10.000", price: 10500 },
    { category: "Pulsa", name: "Telkomsel 50.000", price: 49500 },
    
    // PAKET DATA
    { category: "Paket Data", name: "Telkomsel Data 1GB", price: 15000 },
    { category: "Paket Data", name: "Indosat Data 2GB", price: 20000 },
    { category: "Paket Data", name: "XL Data 5GB", price: 35000 },
    { category: "Paket Data", name: "Tri Data 10GB", price: 55000 },

    // TOKEN PLN
    { category: "Token PLN", name: "Token Listrik 20.000", price: 21500 },
    { category: "Token PLN", name: "Token Listrik 50.000", price: 51500 },
    { category: "Token PLN", name: "Token Listrik 100.000", price: 101500 },
    
    // VOUCHER GAME
    { category: "Voucher Game", name: "Mobile Legends 86 Diamond", price: 22000 },
    { category: "Voucher Game", name: "Mobile Legends 172 Diamond", price: 43000 },
    { category: "Voucher Game", name: "Free Fire 70 Diamond", price: 10000 },
    { category: "Voucher Game", name: "Free Fire 355 Diamond", price: 50000 },
    { category: "Voucher Game", name: "PUBG Mobile 60 UC", price: 15000 },

    // E-WALLET
    { category: "E-Wallet", name: "GoPay 10.000", price: 11000 },
    { category: "E-Wallet", name: "OVO 20.000", price: 21000 },
    { category: "E-Wallet", name: "DANA 50.000", price: 51000 }
  ];

  products = dataProduk.map((item, index) => {
    const category = normalizeCategory(item.category);
    return {
      category: category,
      name: String(item.name),
      price: Number(item.price),
      icon: getIcon(category),
      productId: "PROD-" + (index + 1)
    };
  });

  renderProducts();
}

// ==================================
// TAMPILKAN LAYANAN & FILTER
// ==================================

function renderServices() {
  const container = el("services");
  if (!container) return;
  container.innerHTML = "";

  serviceList.forEach(service => {
    const [name, icon, description] = service;
    const button = document.createElement("button");
    button.className = "service-card";
    button.innerHTML = `
      <div class="service-icon">${icon}</div>
      <b>${name}</b>
      <small>${description}</small>
    `;
    button.addEventListener("click", () => selectCategory(name));
    container.appendChild(button);
  });
}

function renderFilters() {
  const container = el("filters");
  if (!container) return;
  container.innerHTML = "";

  const categories = ["Semua", ...serviceList.map(s => s[0])];

  categories.forEach(name => {
    const button = document.createElement("button");
    button.className = "filter-btn";
    button.textContent = name;
    if (name === activeCategory) button.classList.add("active");
    button.addEventListener("click", () => selectCategory(name));
    container.appendChild(button);
  });
}

function selectCategory(name) {
  activeCategory = name;
  renderFilters();
  renderProducts();
  const section = el("products")?.closest(".section");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ==================================
// TAMPILKAN PRODUK & HARGA
// ==================================

function renderProducts() {
  const container = el("products");
  if (!container) return;
  
  const search = (el("search")?.value || "").toLowerCase().trim();
  container.innerHTML = "";

  const filtered = products.filter(product => {
    const matchCategory = activeCategory === "Semua" || product.category === activeCategory;
    const matchSearch = product.name.toLowerCase().includes(search) || product.category.toLowerCase().includes(search);
    return matchCategory && matchSearch;
  });

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    // HARGA DIPAKSA MUNCUL HIJAU & TEBAL DI SINI
    card.innerHTML = `
      <div class="product-symbol">${product.icon}</div>
      <h3>${product.name}</h3>
      <p>${product.category}</p>

      <div class="product-bottom">
        <b class="product-price" style="color: #16a34a; font-size: 16px; display: block; margin: 8px 0;">${rupiah(product.price)}</b>
        <button class="choose-btn">Pilih</button>
      </div>
    `;

    card.querySelector(".choose-btn").addEventListener("click", () => openProduct(product));
    container.appendChild(card);
  });

  if (filtered.length === 0) {
    container.innerHTML = "<p>Produk tidak ditemukan.</p>";
  }
}

// ==================================
// MODAL PRODUK & KERANJANG
// ==================================

function openProduct(product) {
  selectedProduct = product;
  if(el("productIcon")) el("productIcon").textContent = product.icon;
  if(el("productName")) el("productName").textContent = product.name;
  if(el("productCategory")) el("productCategory").textContent = product.category;
  if(el("productPrice")) el("productPrice").textContent = rupiah(product.price);
  if(el("target")) el("target").value = "";
  if(el("productModal")) el("productModal").classList.add("show");
}

function closeProduct() {
  if(el("productModal")) el("productModal").classList.remove("show");
  selectedProduct = null;
}

function addToCart() {
  const target = el("target").value.trim();
  if (!target) return alert("Masukkan nomor tujuan terlebih dahulu!");
  if (!selectedProduct) return alert("Silakan pilih produk terlebih dahulu.");

  cart.push({ ...selectedProduct, target, cartId: Date.now() + Math.random() });
  closeProduct();
  renderCart();
  alert("Produk berhasil ditambahkan!");
}

function renderCart() {
  const container = el("cartItems");
  if (!container) return;
  container.innerHTML = "";

  if (cart.length === 0) container.innerHTML = "<p>Keranjang masih kosong.</p>";

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <b>${item.name}</b>
        <p>${item.target}</p>
        <button>Hapus</button>
      </div>
      <strong>${rupiah(item.price)}</strong>
    `;
    row.querySelector("button").addEventListener("click", () => {
      cart = cart.filter(p => p.cartId !== item.cartId);
      renderCart();
    });
    container.appendChild(row);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if(el("total")) el("total").textContent = "Total: " + rupiah(total);
  if(el("cartCount")) el("cartCount").textContent = cart.length;
}

function openCart() {
  if(el("cartModal")) el("cartModal").classList.add("show");
  renderCart();
}

function closeCart() {
  if(el("cartModal")) el("cartModal").classList.remove("show");
}

// ==================================
// CHECKOUT & WA
// ==================================

function checkout() {
  if (cart.length === 0) return alert("Keranjang masih kosong!");
  const customer = el("customer").value.trim();
  if (!customer) return alert("Masukkan nama pemesan!");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if(el("paymentTotal")) el("paymentTotal").textContent = rupiah(total);

  closeCart();
  if(el("paymentModal")) el("paymentModal").classList.add("show");
}

function closePayment() {
  if(el("paymentModal")) el("paymentModal").classList.remove("show");
}

function sendOrder() {
  const customer = el("customer").value.trim();
  if (!customer || cart.length === 0) return alert("Data pesanan belum lengkap.");

  const detail = cart.map((item, index) => {
    return `${index + 1}. ${item.name}\nTujuan: ${item.target}\nHarga: ${rupiah(item.price)}`;
  }).join("\n\n");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const message = `PESANAN PULSAKULA\n\nNama: ${customer}\n\n${detail}\n\nTotal: ${rupiah(total)}\n\nMohon konfirmasi pesanan.`;
  const url = "https://wa.me/" + ADMIN_WA + "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}

// ==================================
// MULAI
// ==================================

document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderFilters();
  renderCart();
  loadProducts();
});