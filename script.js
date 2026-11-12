
// ==========================================
// PULSAKULA - SISTEM TOKO DIGITAL
// ==========================================

const ADMIN_WA = "6283894053143";
const EWALLET_PROFIT = 2000;
const TRANSFER_PROFIT = 2000;

let products = [];
let selectedProduct = null;
let cart = [];
let activeCategory = "Semua";
let activeOperator = "";

// ==========================================
// DAFTAR LAYANAN
// ==========================================

const serviceList = [
  ["Pulsa", "📱", "Isi ulang pulsa"],
  ["Paket Data", "🌐", "Paket internet"],
  ["Masa Aktif", "⏳", "Perpanjang masa aktif"],
  ["Token PLN", "⚡", "Token listrik"],
  ["E-Wallet", "💳", "Isi saldo e-wallet"],
  ["Transfer", "🏦", "Layanan transfer"],
  ["Voucher Game", "🎮", "Top up permainan"],
  ["Telepon & SMS", "☎️", "Paket komunikasi"],
  ["TV & Hiburan", "📺", "Voucher hiburan"],
  ["Tagihan", "🧾", "Bayar tagihan"],
  ["PDAM", "💧", "Tagihan air"],
  ["BPJS", "🏥", "Iuran BPJS"],
  ["Internet & WiFi", "📡", "Pembayaran internet"]
];

// ==========================================
// DAFTAR OPERATOR
// ==========================================

const operators = [
  ["Telkomsel", "🔴"],
  ["Indosat", "🟡"],
  ["XL", "🔵"],
  ["Tri", "⚫"],
  ["Smartfren", "🔴"],
  ["Axis", "🟣"]
];

// ==========================================
// PRODUK CONTOH
// ==========================================

const demoProducts = [
  {name:"Telkomsel 5.000",category:"Pulsa",price:6500,operator:"Telkomsel",icon:"🔴"},
  {name:"Telkomsel 10.000",category:"Pulsa",price:11500,operator:"Telkomsel",icon:"🔴"},
  {name:"Telkomsel 20.000",category:"Pulsa",price:21500,operator:"Telkomsel",icon:"🔴"},
  {name:"Telkomsel 50.000",category:"Pulsa",price:51500,operator:"Telkomsel",icon:"🔴"},
  {name:"Indosat 10.000",category:"Pulsa",price:11500,operator:"Indosat",icon:"🟡"},
  {name:"XL 10.000",category:"Pulsa",price:11500,operator:"XL",icon:"🔵"},
  {name:"Tri 10.000",category:"Pulsa",price:11500,operator:"Tri",icon:"⚫"},
  {name:"Smartfren 10.000",category:"Pulsa",price:11500,operator:"Smartfren",icon:"🔴"},
  {name:"Axis 10.000",category:"Pulsa",price:11500,operator:"Axis",icon:"🟣"},

  {name:"Telkomsel Data 1GB",category:"Paket Data",price:12000,operator:"Telkomsel",icon:"🌐"},
  {name:"Indosat Data 2GB",category:"Paket Data",price:15000,operator:"Indosat",icon:"🌐"},
  {name:"XL Data 5GB",category:"Paket Data",price:25000,operator:"XL",icon:"🌐"},
  {name:"Tri Data 10GB",category:"Paket Data",price:35000,operator:"Tri",icon:"🌐"},

  {name:"Token PLN 20.000",category:"Token PLN",price:23000,icon:"⚡"},
  {name:"Token PLN 50.000",category:"Token PLN",price:53000,icon:"⚡"},
  {name:"Token PLN 100.000",category:"Token PLN",price:103000,icon:"⚡"},

  {name:"Mobile Legends 86 Diamond",category:"Voucher Game",price:22000,icon:"🎮"},
  {name:"Mobile Legends 172 Diamond",category:"Voucher Game",price:43000,icon:"🎮"},
  {name:"Free Fire 70 Diamond",category:"Voucher Game",price:11000,icon:"🎮"},
  {name:"Free Fire 355 Diamond",category:"Voucher Game",price:50000,icon:"🎮"}
];

// ==========================================
// FORMAT HARGA
// ==========================================

function rupiah(number) {
  return "Rp " + Number(number || 0).toLocaleString("id-ID");
}

function sortProductsByPrice(list) {
  return [...list].sort((a, b) =>
    Number(a.price || 0) - Number(b.price || 0)
  );
}

// ==========================================
// AMBIL PRODUK BACKEND
// ==========================================

async function loadProducts() {
  try {
    const response = await fetch("/api/products");
    const result = await response.json();

    if (
      response.ok &&
      result.success &&
      Array.isArray(result.products) &&
      result.products.length > 0
    ) {
      products = result.products.map(p => ({
        ...p,
        name: p.name || p.product_name || p.title || "Produk",
        category: p.category || p.kategori || "Lainnya",
        price: Number(p.price || p.harga || p.selling_price || 0),
        operator: p.operator || p.brand || "",
        icon: p.icon || "📦"
      }));
    } else {
      products = [...demoProducts];
    }
  } catch (error) {
    console.error("Katalog belum tersedia:", error);
    products = [...demoProducts];
  }

  products = sortProductsByPrice(products);
  renderProducts();
}

// ==========================================
// TAMPILKAN LAYANAN
// ==========================================

function renderServices() {
  const container = document.getElementById("services");
  if (!container) return;

  container.innerHTML = serviceList.map(item => `
    <button class="service-card" type="button"
      onclick="selectCategory('${item[0]}')">
      <span class="service-icon">${item[1]}</span>
      <h3>${item[0]}</h3>
      <p>${item[2]}</p>
    </button>
  `).join("");
}

// ==========================================
// PILIH KATEGORI
// ==========================================

function selectCategory(category) {
  activeCategory = category;
  activeOperator = "";

  const operatorSection = document.getElementById("operatorSection");
  const productSection = document.getElementById("productSection");

  if (category === "E-Wallet" || category === "Transfer") {
    openCustomWallet(category);
    return;
  }

  if (category === "Pulsa" || category === "Paket Data") {
    operatorSection.hidden = false;
    renderOperators(category);
    document.getElementById("operatorTitle").textContent =
      "Pilih Operator " + category;
    operatorSection.scrollIntoView({behavior:"smooth"});
    return;
  }

  if (operatorSection) operatorSection.hidden = true;

  renderFilters();
  renderProducts();

  if (productSection) {
    productSection.scrollIntoView({behavior:"smooth"});
  }
}

// ==========================================
// TAMPILKAN OPERATOR
// ==========================================

function renderOperators(category) {
  const container = document.getElementById("operators");
  if (!container) return;

  container.innerHTML = operators.map(item => `
    <button class="service-card" type="button"
      onclick="selectOperator('${item[0]}')">
      <span class="service-icon">${item[1]}</span>
      <h3>${item[0]}</h3>
      <p>Lihat produk ${item[0]}</p>
    </button>
  `).join("");
}

function selectOperator(operator) {
  activeOperator = operator;
  activeCategory = "Semua";

  const operatorSection = document.getElementById("operatorSection");
  if (operatorSection) operatorSection.hidden = true;

  renderFilters();
  renderProducts();

  document.getElementById("productSection")
    ?.scrollIntoView({behavior:"smooth"});
}

// ==========================================
// FILTER KATEGORI
// ==========================================

function renderFilters() {
  const container = document.getElementById("filters");
  if (!container) return;

  const categories = ["Semua", ...new Set(
    products.map(p => p.category)
  )];

  container.innerHTML = categories.map(category => `
    <button class="filter-btn"
      onclick="setFilter('${category}')">
      ${category}
    </button>
  `).join("");
}

function setFilter(category) {
  activeCategory = category;
  activeOperator = "";
  renderProducts();
}

// ==========================================
// TAMPILKAN PRODUK
// ==========================================

function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  const search = (
    document.getElementById("search")?.value || ""
  ).toLowerCase();

  let filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search);

    const matchCategory =
      activeCategory === "Semua" ||
      p.category === activeCategory;

    const matchOperator =
      !activeOperator ||
      p.operator === activeOperator;

    return matchSearch && matchCategory && matchOperator;
  });

  filtered = sortProductsByPrice(filtered);

  if (filtered.length === 0) {
    container.innerHTML = "<p>Produk belum tersedia.</p>";
    return;
  }

  container.innerHTML = filtered.map((p, index) => `
    <div class="product-card">
      <div class="product-symbol">${p.icon || "📦"}</div>
      <h3>${p.name}</h3>
      <p class="product-price">${rupiah(p.price)}</p>
      <button class="choose-btn"
        onclick="openProductByIndex(${products.indexOf(p)})">
        Pilih Produk
      </button>
    </div>
  `).join("");
}

function openProductByIndex(index) {
  openProduct(products[index]);
}

// ==========================================
// PRODUK BIASA
// ==========================================

function openProduct(product) {
  selectedProduct = product;

  const amount = document.getElementById("walletAmount");
  if (amount) amount.remove();

  document.getElementById("productIcon").textContent =
    product.icon || "📦";

  document.getElementById("productName").textContent =
    product.name;

  document.getElementById("productCategory").textContent =
    product.category;

  document.getElementById("productPrice").textContent =
    rupiah(product.price);

  document.getElementById("target").value = "";
  document.getElementById("productModal").classList.add("show");
}

function closeProduct() {
  document.getElementById("productModal").classList.remove("show");
}

// ==========================================
// E-WALLET DAN TRANSFER NOMINAL BEBAS
// ==========================================

function openCustomWallet(type) {
  selectedProduct = {
    name: type + " Nominal Bebas",
    category: type,
    price: 0,
    icon: type === "Transfer" ? "🏦" : "💳",
    customWallet: true
  };

  document.getElementById("productIcon").textContent =
    selectedProduct.icon;

  document.getElementById("productName").textContent =
    type + " Nominal Bebas";

  document.getElementById("productCategory").textContent =
    "Keuntungan PULSAKULA Rp2.000";

  document.getElementById("productPrice").textContent =
    "Nominal ditentukan pelanggan";

  const target = document.getElementById("target");
  target.value = "";
  target.placeholder = type === "Transfer"
    ? "Nama bank dan nomor rekening tujuan"
    : "Nomor HP / akun tujuan";

  const oldInput = document.getElementById("walletAmount");
  if (oldInput) oldInput.remove();

  const amountInput = document.createElement("input");
  amountInput.id = "walletAmount";
  amountInput.type = "number";
  amountInput.min = "1000";
  amountInput.step = "1000";
  amountInput.placeholder = "Masukkan nominal (Rp)";
  amountInput.style.marginTop = "12px";
  amountInput.style.width = "100%";

  target.after(amountInput);

  document.getElementById("productModal").classList.add("show");
}

// ==========================================
// TAMBAHKAN KE KERANJANG
// ==========================================

function addToCart() {
  if (!selectedProduct) return;

  const target = document.getElementById("target").value.trim();

  if (!target) {
    alert("Masukkan nomor atau data tujuan terlebih dahulu.");
    return;
  }

  let item;

  if (selectedProduct.customWallet) {
    const amount = Number(
      document.getElementById("walletAmount")?.value || 0
    );

    if (!Number.isFinite(amount) || amount < 1000) {
      alert("Masukkan nominal minimal Rp1.000.");
      return;
    }

    const fee = selectedProduct.category === "Transfer"
      ? TRANSFER_PROFIT
      : EWALLET_PROFIT;

    item = {
      ...selectedProduct,
      target,
      nominal: amount,
      fee,
      price: amount + fee
    };
  } else {
    item = {
      ...selectedProduct,
      target,
      nominal: selectedProduct.price,
      fee: 0
    };
  }

  cart.push(item);

  closeProduct();
  renderCart();

  alert("Produk berhasil ditambahkan ke keranjang.");
}

// ==========================================
// KERANJANG
// ==========================================

function renderCart() {
  const container = document.getElementById("cartItems");
  const totalElement = document.getElementById("total");
  const countElement = document.getElementById("cartCount");

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  if (container) {
    if (cart.length === 0) {
      container.innerHTML = "<p>Keranjang masih kosong.</p>";
    } else {
      container.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
          <div>
            <b>${item.name}</b>
            <p>Tujuan: ${item.target}</p>
            ${item.customWallet
              ? `<p>Nominal: ${rupiah(item.nominal)}</p>
                 <p>Keuntungan: ${rupiah(item.fee)}</p>`
              : ""}
            <strong>${rupiah(item.price)}</strong>
          </div>
          <button onclick="removeCartItem(${index})">Hapus</button>
        </div>
      `).join("");
    }
  }

  if (totalElement) {
    totalElement.textContent = "Total: " + rupiah(total);
  }

  if (countElement) {
    countElement.textContent = cart.length;
  }
}

function removeCartItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function openCart() {
  renderCart();
  document.getElementById("cartModal").classList.add("show");
}

function closeCart() {
  document.getElementById("cartModal").classList.remove("show");
}

// ==========================================
// CHECKOUT
// ==========================================

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  const customer = document.getElementById("customer").value.trim();

  if (!customer) {
    alert("Masukkan nama pemesan.");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  document.getElementById("paymentTotal").textContent =
    rupiah(total);

  closeCart();
  document.getElementById("paymentModal").classList.add("show");
}

function closePayment() {
  document.getElementById("paymentModal").classList.remove("show");
}

// ==========================================
// KIRIM PESANAN KE WHATSAPP
// ==========================================

function sendOrder() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  const customer = document.getElementById("customer").value.trim();

  if (!customer) {
    alert("Nama pemesan belum diisi.");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  let message = `PESANAN PULSAKULA\n\n`;
  message += `Nama: ${customer}\n\n`;
  message += `DAFTAR PESANAN:\n`;

  cart.forEach((item, index) => {
    message += `\n${index + 1}. ${item.name}\n`;
    message += `Tujuan: ${item.target}\n`;

    if (item.customWallet) {
      message += `Nominal: ${rupiah(item.nominal)}\n`;
      message += `Keuntungan: ${rupiah(item.fee)}\n`;
    }

    message += `Harga: ${rupiah(item.price)}\n`;
  });

  message += `\nTOTAL: ${rupiah(total)}\n`;
  message += `\nMohon konfirmasi pesanan saya.`;

  const url =
    "https://wa.me/" + ADMIN_WA +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}

// ==========================================
// MULAI WEBSITE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderFilters();
  renderCart();
  loadProducts();
});
