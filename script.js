
 // ==================================
 // PULSAKULA - SISTEM PELANGGAN
 // ==================================

const ADMIN_WA = "6283894053143";

let products = [];
let selectedProduct = null;
let cart = [];
let activeCategory = "Semua";

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
// AMBIL PRODUK DARI BACKEND
// ==================================

async function loadProducts() {
  try {
    const response = await fetch("/api/products");

    if (!response.ok) {
      throw new Error("Gagal mengambil produk");
    }

    const data = await response.json();

    if (!data.success || !Array.isArray(data.products)) {
      throw new Error("Data produk tidak sesuai");
    }

    products = data.products.map(item => {
      let category = item.category;
      let icon = "📱";

      if (category === "Paket Data") icon = "🌐";
      if (category === "Token Listrik") icon = "⚡";

      if (category === "Top Up Game") {
        category = "Voucher Game";
        icon = "🎮";
      }

      return [
        category,
        item.name,
        item.price,
        icon,
        item.id
      ];
    });

    renderProducts();

  } catch (error) {
    console.error(error);

    el("products").innerHTML =
      "<p>Produk gagal dimuat. Silakan coba lagi.</p>";
  }
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
      productId: product[4],
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
      <strong>${rupiah(item[2])}</strong>
    `;

    row.querySelector("button").addEventListener("click", () => {
      cart = cart.filter(p => p.id !== item.id);
      renderCart();
    });

    container.appendChild(row);
  });

  const total = cart.reduce(
    (sum, item) => sum + item[2], 0
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
    (sum, item) => sum + item[2], 0
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
  const customer = el("customer").value.trim();

  if (!customer || cart.length === 0) {
    alert("Data pesanan belum lengkap.");
    return;
  }

  const detail = cart.map((item, index) => {
    return (
      `${index + 1}. ${item[1]}\n` +
      `Tujuan: ${item.target}\n` +
      `Harga simulasi: ${rupiah(item[2])}`
    );
  }).join("\n\n");

  const total = cart.reduce(
    (sum, item) => sum + item[2], 0
  );

  const message =
    `PESANAN PULSAKULA\n\n` +
    `Nama: ${customer}\n\n` +
    `${detail}\n\n` +
    `Total simulasi: ${rupiah(total)}\n\n` +
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
  renderServices();
  renderFilters();
  renderCart();

  const search = el("search");
  if (search) {
    search.addEventListener("input", renderProducts);
  }

  loadProducts();
});
