// ==================================
// PULSAKULA - SISTEM PELANGGAN
// ==================================

// GANTI dengan nomor WhatsApp admin kamu
const ADMIN_WA = "6281234567890";

// KATALOG PRODUK DEMO
const products = [
  // PULSA
  ["Pulsa","Telkomsel 5.000",6000,"📱"],
  ["Pulsa","Telkomsel 10.000",11000,"📱"],
  ["Pulsa","Telkomsel 20.000",21000,"📱"],
  ["Pulsa","Telkomsel 50.000",51000,"📱"],
  ["Pulsa","Indosat 5.000",6500,"📱"],
  ["Pulsa","Indosat 10.000",11000,"📱"],
  ["Pulsa","Indosat 20.000",21000,"📱"],
  ["Pulsa","Indosat 50.000",51000,"📱"],
  ["Pulsa","XL 5.000",6500,"📱"],
  ["Pulsa","XL 10.000",11000,"📱"],
  ["Pulsa","XL 25.000",26000,"📱"],
  ["Pulsa","AXIS 10.000",11000,"📱"],
  ["Pulsa","Tri 10.000",11000,"📱"],
  ["Pulsa","Smartfren 10.000",11000,"📱"],

  // PAKET DATA
  ["Paket Data","Telkomsel 3 GB",18000,"🌐"],
  ["Paket Data","Telkomsel 8 GB",35000,"🌐"],
  ["Paket Data","Indosat 5 GB",22000,"🌐"],
  ["Paket Data","Indosat 10 GB",39000,"🌐"],
  ["Paket Data","XL 5 GB",23000,"🌐"],
  ["Paket Data","AXIS 5 GB",21000,"🌐"],
  ["Paket Data","Tri 6 GB",24000,"🌐"],
  ["Paket Data","Smartfren 6 GB",25000,"🌐"],

  // MASA AKTIF
  ["Masa Aktif","Telkomsel Masa Aktif",8000,"⏳"],
  ["Masa Aktif","XL Masa Aktif",7000,"⏳"],

  // TOKEN LISTRIK
  ["Token PLN","Token PLN 20.000",22000,"⚡"],
  ["Token PLN","Token PLN 50.000",52000,"⚡"],
  ["Token PLN","Token PLN 100.000",102000,"⚡"],
  ["Token PLN","Token PLN 200.000",202000,"⚡"],

  // E-WALLET
  ["E-Wallet","DANA 10.000",11200,"💳"],
  ["E-Wallet","DANA 20.000",21200,"💳"],
  ["E-Wallet","DANA 50.000",51200,"💳"],
  ["E-Wallet","OVO 20.000",21500,"💳"],
  ["E-Wallet","GoPay 20.000",21500,"💳"],
  ["E-Wallet","ShopeePay 20.000",21500,"💳"],

  // GAME
  ["Voucher Game","Mobile Legends 86 Diamonds",22000,"🎮"],
  ["Voucher Game","Mobile Legends 172 Diamonds",43000,"🎮"],
  ["Voucher Game","Free Fire 70 Diamonds",11000,"🎮"],
  ["Voucher Game","Free Fire 140 Diamonds",21000,"🎮"],
  ["Voucher Game","PUBG Mobile 60 UC",16000,"🎮"],
  ["Voucher Game","PUBG Mobile 325 UC",75000,"🎮"],

  // LAYANAN LAIN
  ["Telepon & SMS","Paket Telepon",12000,"☎️"],
  ["TV & Hiburan","Voucher TV",25000,"📺"],
  ["Tagihan","Biaya layanan tagihan",2500,"🧾"],
  ["PDAM","Biaya layanan PDAM",3000,"💧"],
  ["BPJS","Biaya layanan BPJS",3000,"🏥"],
  ["Internet & WiFi","Biaya layanan internet",3000,"📡"]
];

const serviceList = [
  ["Pulsa","📱","Isi ulang pulsa"],
  ["Paket Data","🌐","Paket internet"],
  ["Masa Aktif","⏳","Perpanjang masa aktif"],
  ["Token PLN","⚡","Token listrik"],
  ["E-Wallet","💳","Isi saldo e-wallet"],
  ["Voucher Game","🎮","Top up permainan"],
  ["Telepon & SMS","☎️","Paket komunikasi"],
  ["TV & Hiburan","📺","Voucher hiburan"],
  ["Tagihan","🧾","Bayar tagihan"],
  ["PDAM","💧","Tagihan air"],
  ["BPJS","🏥","Iuran BPJS"],
  ["Internet & WiFi","📡","Pembayaran internet"]
];

// ==================================
// VARIABEL
// ==================================

let selectedProduct = null;
let cart = [];
let activeCategory = "Semua";

const rupiah = value =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);

function el(id) {
  return document.getElementById(id);
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
// FILTER PRODUK
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

  document.getElementById("produk")?.scrollIntoView({
    behavior: "smooth"
  });
}

// ==================================
// TAMPILKAN PRODUK
// ==================================

function renderProducts() {
  const container = el("products");
  const search = el("search").value.toLowerCase().trim();

  container.innerHTML = "";

  const filtered = products
    .map((product, index) => ({
      category: product[0],
      name: product[1],
      price: product[2],
      icon: product[3],
      index
    }))
    .filter(product => {
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

    card.querySelector(".choose-btn")
      .addEventListener("click", () => {
        openProduct(product);
      });

    container.appendChild(card);
  });

  if (filtered.length === 0) {
    container.innerHTML =
      "<p>Produk tidak ditemukan.</p>";
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
    target: target,
    id: Date.now() + Math.random()
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
      cart = cart.filter(p => p.id !== item.id);
      renderCart();
    });

    container.appendChild(row);
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price, 0
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
    (sum, item) => sum + item.price, 0
  );

  el("paymentTotal").textContent = rupiah(total);

  closeCart();
  el("paymentModal").classList.add("show");
}

function closePayment() {
  el("paymentModal").classList.remove("show");
}

// ==================================
// KIRIM PESANAN WHATSAPP
// ==================================

function sendOrder() {
  if (!ADMIN_WA || ADMIN_WA === "6281234567890") {
    alert("Ganti nomor ADMIN_WA di script.js dengan nomor WhatsApp admin kamu.");
    return;
  }

  const customer = el("customer").value.trim();

  const detail = cart.map((item, index) => {
    return (
      `${index + 1}. ${item.name}\n` +
      `Tujuan: ${item.target}\n` +
      `Harga contoh: ${rupiah(item.price)}`
    );
  }).join("\n\n");

  const total = cart.reduce(
    (sum, item) => sum + item.price, 0
  );

  const message =
    `PESANAN PULSAKULA\n\n` +
    `Nama: ${customer}\n\n` +
    `${detail}\n\n` +
    `Total harga contoh: ${rupiah(total)}\n\n` +
    `Mohon konfirmasi harga akhir dan instruksi pembayaran.`;

  const url =
    "https://wa.me/" + ADMIN_WA +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}

// ==================================
// MULAI WEBSITE
// ==================================

document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderFilters();
  renderProducts();
  renderCart();
});
