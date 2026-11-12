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
// AMBIL PRODUK (LANGSUNG DARI KODE)
// ==================================

function loadProducts() {
  // Daftar produk kamu dari murah sampai mahal
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

  // Proses datanya
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

  // Tampilkan produk
  renderProducts();
}

// ==================================
// TAMPILKAN LAYANAN
// ==================================

function renderServices() {
  const container = el("services");
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

    button.addEventListener("click", () => {
      selectCategory(name);
    });

    container.appendChild(button);
  });
}

// ==================================
// FILTER KATEGORI
// ==================================

function renderFilters() {
  const container = el("filters");
  container.innerHTML = "";

  const categories = ["Semua", ...serviceList.map(s => s[0])];

  categories.forEach(name => {
    const button = document.createElement("button");

    button.className = "filter-btn";
    button.textContent = name;

    if (name === activeCategory) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      selectCategory(name);
    });

    container.appendChild(button);
  });
}

function selectCategory(name) {
  activeCategory = name;

  renderFilters();
  renderProducts();

  const section = el("products").closest(".section");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

// ==================================
// TAMPILKAN PRODUK
// ==================================

function renderProducts() {
  const container = el("products");
  const search = (el("search")?.value || "").toLowerCase().trim();

  container.innerHTML = "";

  const filtered = products.filter(product => {
    const matchCategory =
      activeCategory === "Semua" ||
      product.category === activeCategory;

    const matchSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    return matchCategory && matchSearch;
  });

  filtered.forEach(product => {
    const card = document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `
      <div class="product-symbol">${product.icon}</div>
      <h3>${product.name}</h3>
      <p>${product.category}</p>

      <div class="product-bottom">
        <b class="product-price">${rupiah(product.price)}</b>
        <button class="choose-btn">Pilih</button>
      </div>
    `;

    card.querySelector(".choose-btn").addEventListener("click", () => {
      openProduct(product);
    });

    container.appendChild(card);
  });

  if (filtered.length === 0) {
    container.innerHTML = "<p>Produk tidak ditemukan.</p>";
  }
}

// ==================================
// MODAL PRODUK
// ==================================

function openProduct(product) {
  selectedProduct = product;

  el("productIcon").textContent = product.icon;
  el("productName").textContent = product.name;
  el("productCategory").textContent = product.category;
  el("productPrice").textContent = rupiah(product.price);
  el("target").value = "";

  el("productModal").classList.add("show");
}

function closeProduct() {
  el("productModal").classList.remove("show");
  selectedProduct = null;
}

// ==================================
// KERANJANG
// ==================================

function addToCart() {
  const target = el("target").value.trim();

  if (!target) {
    alert("Masukkan nomor tujuan terlebih dahulu!");
    return;
  }

  if (!selectedProduct) {
    alert("Silakan pilih produk terlebih dahulu.");
    return;
  }

  cart.push({
    ...selectedProduct,
    target,
    cartId: Date.now() + Math.random()
  });

  closeProduct();
  renderCart();

  alert("Produk berhasil ditambahkan!");
}

function renderCart() {
  const container = el("cartItems");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Keranjang masih kosong.</p>";
  }

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

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  el("total").textContent = "Total: " + rupiah(total);
  el("cartCount").textContent = cart.length;
}

function openCart() {
  el("cartModal").classList.add("show");
  renderCart();
}

function closeCart() {
  el("cartModal").classList.remove("show");
}

// ==================================
// CHECKOUT
// ==================================

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const customer = el("customer").value.trim();

  if (!customer) {
    alert("Masukkan nama pemesan!");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  el("paymentTotal").textContent = rupiah(total);

  closeCart();
  el("paymentModal").classList.add("show");
}

function closePayment() {
  el("paymentModal").classList.remove("show");
}

// ==================================
// KONFIRMASI WHATSAPP
// ==================================

function sendOrder() {
  const customer = el("customer").value.trim();

  if (!customer || cart.length === 0) {
    alert("Data pesanan belum lengkap.");
    return;
  }

  const detail = cart.map((item, index) => {
    return (
      `${index + 1}. ${item.name}\n` +
      `Tujuan: ${item.target}\n` +
      `Harga: ${rupiah(item.price)}`
    );
  }).join("\n\n");

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const message =
    `PESANAN PULSAKULA\n\n` +
    `Nama: ${customer}\n\n` +
    `${detail}\n\n` +
    `Total: ${rupiah(total)}\n\n` +
    `Mohon konfirmasi pesanan.`;

  const url =
    "https://wa.me/" + ADMIN_WA +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}

// ==================================
// MULAI WEBSITE
// ==================================

document.addEventListener("DOMContentLoaded", () => {
  // Tambahkan ID produk karena HTML belum memilikinya.
  const productContainer = el("products");
  if (productContainer) {
    const productSection = productContainer.closest(".section");
    if (productSection) {
      productSection.id = "produk";
    }
  }

  renderServices();
  renderFilters();
  renderCart();

  loadProducts();
});