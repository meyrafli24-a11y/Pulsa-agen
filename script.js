
// ========================================
// PULSAKULA - SISTEM TOKO DIGITAL
// ========================================

const ADMIN_WA = "6283894053143";
const QRIS_URL = "https://raw.githubusercontent.com/meyrafli24-a11y/Pulsa-agen/main/qr_ID1025376713323_07.01.26_176777048_1767770502053.jpeg";

const EWALLET_PROFIT = 2000;
const TRANSFER_PROFIT = 2000;

let products = [];
let selectedProduct = null;
let cart = [];
let activeCategory = "Semua";
let activeOperator = "";

// ========================================
// LAYANAN
// ========================================

const serviceList = [
  ["Pulsa","📱","Isi ulang pulsa"],
  ["Paket Data","🌐","Paket internet"],
  ["Masa Aktif","⏳","Perpanjang masa aktif"],
  ["Token PLN","⚡","Token listrik"],
  ["E-Wallet","💳","Isi saldo e-wallet"],
  ["Transfer","🏦","Layanan transfer"],
  ["Voucher Game","🎮","Top up permainan"],
  ["Telepon & SMS","☎️","Paket komunikasi"],
  ["TV & Hiburan","📺","Voucher hiburan"],
  ["Tagihan","🧾","Bayar tagihan"],
  ["PDAM","💧","Tagihan air"],
  ["BPJS","🏥","Iuran BPJS"],
  ["Internet & WiFi","📡","Pembayaran internet"]
];

const operators = [
  ["Telkomsel","🔴"],
  ["Indosat","🟡"],
  ["XL","🔵"],
  ["Tri","⚫"],
  ["Smartfren","🔴"],
  ["Axis","🟣"]
];

// ========================================
// PRODUK DEMO
// ========================================

const demoProducts = [
  {name:"Telkomsel 5.000",category:"Pulsa",price:6500,operator:"Telkomsel",icon:"📱"},
  {name:"Telkomsel 10.000",category:"Pulsa",price:11500,operator:"Telkomsel",icon:"📱"},
  {name:"Telkomsel 20.000",category:"Pulsa",price:21500,operator:"Telkomsel",icon:"📱"},
  {name:"Telkomsel 50.000",category:"Pulsa",price:51500,operator:"Telkomsel",icon:"📱"},
  {name:"Indosat 10.000",category:"Pulsa",price:11500,operator:"Indosat",icon:"📱"},
  {name:"XL 10.000",category:"Pulsa",price:11500,operator:"XL",icon:"📱"},
  {name:"Tri 10.000",category:"Pulsa",price:11500,operator:"Tri",icon:"📱"},
  {name:"Smartfren 10.000",category:"Pulsa",price:11500,operator:"Smartfren",icon:"📱"},
  {name:"Axis 10.000",category:"Pulsa",price:11500,operator:"Axis",icon:"📱"},

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

// ========================================
// FORMAT RUPIAH
// ========================================

function rupiah(number) {
  return "Rp " + Number(number || 0).toLocaleString("id-ID");
}

function getTotal() {
  return cart.reduce((sum,item) =>
    sum + Number(item.price || 0),0
  );
}

// ========================================
// MEMUAT PRODUK
// ========================================

async function loadProducts() {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error("API gagal");

    const data = await response.json();

    if (data.success && Array.isArray(data.products) && data.products.length) {
      products = data.products.map(item => ({
        name: item.name || item.product_name || "Produk",
        category: item.category || "Lainnya",
        price: Number(item.price || item.selling_price || 0),
        operator: item.operator || "",
        icon: item.icon || "📦"
      }));
    } else {
      products = [...demoProducts];
    }
  } catch (error) {
    console.log("Menggunakan katalog demo:",error);
    products = [...demoProducts];
  }

  products.sort((a,b) => a.price - b.price);

  renderFilters();
  renderProducts();
}

// ========================================
// LAYANAN
// ========================================

function renderServices() {
  const container = document.getElementById("services");
  if (!container) return;

  container.innerHTML = serviceList.map(item => `
    <button class="service-card"
      onclick="selectCategory('${item[0]}')">
      <div class="service-icon">${item[1]}</div>
      <b>${item[0]}</b>
      <small>${item[2]}</small>
    </button>
  `).join("");
}

// ========================================
// KATEGORI
// ========================================

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

    document.getElementById("operatorTitle").textContent =
      "Pilih Operator " + category;

    renderOperators();
    renderFilters();
    renderProducts();

    operatorSection.scrollIntoView({behavior:"smooth"});
    return;
  }

  operatorSection.hidden = true;

  renderFilters();
  renderProducts();

  productSection.scrollIntoView({behavior:"smooth"});
}

// ========================================
// OPERATOR
// ========================================

function renderOperators() {
  const container = document.getElementById("operators");
  if (!container) return;

  container.innerHTML = operators.map(item => `
    <button class="operator-card"
      onclick="selectOperator('${item[0]}')">
      <div>${item[1]}</div>
      <b>${item[0]}</b>
    </button>
  `).join("");
}

function selectOperator(operator) {
  activeOperator = operator;
  renderProducts();

  document.getElementById("productSection")
    .scrollIntoView({behavior:"smooth"});
}

// ========================================
// FILTER
// ========================================

function renderFilters() {
  const container = document.getElementById("filters");
  if (!container) return;

  const categories = [
    "Semua",
    ...new Set(products.map(item => item.category))
  ];

  container.innerHTML = categories.map(category => `
    <button class="filter-btn ${
      activeCategory === category ? "active" : ""
    }" onclick="filterCategory('${category}')">
      ${category}
    </button>
  `).join("");
}

function filterCategory(category) {
  activeCategory = category;
  activeOperator = "";

  renderFilters();
  renderProducts();
}

// ========================================
// DAFTAR PRODUK
// ========================================

function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  const search = document.getElementById("search");
  const keyword = search ? search.value.toLowerCase() : "";

  let filtered = [...products].sort((a,b) => a.price - b.price);

  if (activeCategory !== "Semua") {
    filtered = filtered.filter(item =>
      item.category === activeCategory
    );
  }

  if (activeOperator) {
    filtered = filtered.filter(item =>
      item.operator === activeOperator
    );
  }

  if (keyword) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(keyword)
    );
  }

  if (!filtered.length) {
    container.innerHTML = "<p>Produk belum tersedia.</p>";
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="product-card">
      <div class="product-symbol">${item.icon || "📦"}</div>
      <h3>${item.name}</h3>
      <p>${item.category}</p>
      <div class="product-price">${rupiah(item.price)}</div>

      <button class="choose-btn"
        onclick="openProductByName('${encodeURIComponent(item.name)}')">
        Pilih Produk
      </button>
    </div>
  `).join("");
}

// ========================================
// DETAIL PRODUK
// ========================================

function openProductByName(encodedName) {
  const name = decodeURIComponent(encodedName);
  const product = products.find(item => item.name === name);

  if (product) openProduct(product);
}

function openProduct(product) {
  selectedProduct = {...product};

  document.getElementById("productIcon").textContent =
    product.icon || "📦";

  document.getElementById("productName").textContent =
    product.name;

  document.getElementById("productCategory").textContent =
    product.category;

  document.getElementById("productPrice").textContent =
    rupiah(product.price);

  document.getElementById("target").value = "";

  const oldAmount = document.getElementById("customAmountWrap");
  if (oldAmount) oldAmount.remove();

  document.getElementById("productModal").classList.add("show");
}

function closeProduct() {
  document.getElementById("productModal").classList.remove("show");
}

// ========================================
// E-WALLET DAN TRANSFER
// ========================================

function openCustomWallet(type) {
  const isWallet = type === "E-Wallet";

  selectedProduct = {
    name: isWallet ? "Isi Saldo E-Wallet" : "Transfer",
    category: type,
    price: 0,
    icon: isWallet ? "💳" : "🏦",
    customWallet: true
  };

  document.getElementById("productIcon").textContent =
    selectedProduct.icon;

  document.getElementById("productName").textContent =
    selectedProduct.name;

  document.getElementById("productCategory").textContent =
    "Masukkan nominal yang diinginkan";

  document.getElementById("productPrice").textContent =
    "Nominal bebas";

  document.getElementById("target").value = "";

  const oldAmount = document.getElementById("customAmountWrap");
  if (oldAmount) oldAmount.remove();

  const targetLabel = document.querySelector(
    "#productModal label[for='target']"
  );

  const amountWrap = document.createElement("div");
  amountWrap.id = "customAmountWrap";

  amountWrap.innerHTML = `
    <label for="walletAmount">Nominal transaksi</label>
    <input id="walletAmount" type="number"
      min="1000" step="1000"
      placeholder="Contoh: 50000">
  `;

  targetLabel.parentNode.insertBefore(amountWrap,targetLabel);

  targetLabel.textContent = isWallet
    ? "Nomor E-Wallet tujuan"
    : "Nomor rekening tujuan";

  document.getElementById("productModal").classList.add("show");
}

// ========================================
// TAMBAH KERANJANG
// ========================================

function addToCart() {
  if (!selectedProduct) return;

  const target = document.getElementById("target").value.trim();

  if (!target) {
    alert("Masukkan nomor atau ID tujuan!");
    return;
  }

  let price = Number(selectedProduct.price || 0);
  let name = selectedProduct.name;

  if (selectedProduct.customWallet) {
    const amount = Number(
      document.getElementById("walletAmount").value
    );

    if (!amount || amount < 1000) {
      alert("Minimal nominal Rp 1.000!");
      return;
    }

    const fee = selectedProduct.category === "E-Wallet"
      ? EWALLET_PROFIT
      : TRANSFER_PROFIT;

    price = amount + fee;
    name += " " + rupiah(amount);
  }

  cart.push({
    name,
    category: selectedProduct.category,
    target,
    price
  });

  closeProduct();
  renderCart();

  alert("Produk berhasil ditambahkan ke keranjang!");
}

// ========================================
// KERANJANG
// ========================================

function renderCart() {
  const container = document.getElementById("cartItems");
  const count = document.getElementById("cartCount");

  if (!container) return;

  if (count) count.textContent = cart.length;

  if (!cart.length) {
    container.innerHTML = "<p>Keranjang masih kosong.</p>";
  } else {
    container.innerHTML = cart.map((item,index) => `
      <div class="cart-item">
        <div>
          <b>${item.name}</b>
          <p>${item.target}</p>
          <strong>${rupiah(item.price)}</strong>
        </div>
        <button onclick="removeCart(${index})">❌</button>
      </div>
    `).join("");
  }

  const total = document.getElementById("total");
  if (total) total.textContent = "Total: " + rupiah(getTotal());
}

function removeCart(index) {
  cart.splice(index,1);
  renderCart();
}

function openCart() {
  renderCart();
  document.getElementById("cartModal").classList.add("show");
}

function closeCart() {
  document.getElementById("cartModal").classList.remove("show");
}

// ========================================
// CHECKOUT - TAMPILKAN QRIS
// ========================================

function checkout() {
  if (!cart.length) {
    alert("Keranjang masih kosong!");
    return;
  }

  const customer = document.getElementById("customer").value.trim();

  if (!customer) {
    alert("Masukkan nama pemesan!");
    return;
  }

  const total = getTotal();

  document.getElementById("paymentTotal").textContent =
    rupiah(total);

  const qris = document.getElementById("qrisImage");
  const error = document.getElementById("qrisError");

  if (qris) {
    qris.src = QRIS_URL;
    qris.style.display = "block";
  }

  if (error) {
    error.style.display = "none";
  }

  closeCart();

  const paymentModal = document.getElementById("paymentModal");

  if (!paymentModal) {
    alert("Modal pembayaran tidak ditemukan di HTML!");
    return;
  }

  paymentModal.classList.add("show");
}

// ========================================
// TUTUP PEMBAYARAN
// ========================================

function closePayment() {
  document.getElementById("paymentModal").classList.remove("show");
}

// ========================================
// KONFIRMASI WHATSAPP
// ========================================

function sendOrder() {
  if (!cart.length) {
    alert("Keranjang masih kosong!");
    return;
  }

  const customer = document.getElementById("customer").value.trim();

  if (!customer) {
    alert("Nama pemesan belum diisi!");
    return;
  }

  const total = getTotal();

  let message = "KONFIRMASI PESANAN PULSAKULA\n\n";
  message += "Nama: " + customer + "\n";
  message += "DETAIL PESANAN:\n";

  cart.forEach((item,index) => {
    message += `\n${index + 1}. ${item.name}\n`;
    message += `Tujuan: ${item.target}\n`;
    message += `Harga: ${rupiah(item.price)}\n`;
  });

  message += "\nTOTAL: " + rupiah(total);
  message += "\n\nSaya akan mengirimkan bukti pembayaran berupa foto secara manual setelah pesan ini.";

  const url = "https://wa.me/" + ADMIN_WA +
    "?text=" + encodeURIComponent(message);

  window.open(url,"_blank");
}

// ========================================
// MULAI WEBSITE
// ========================================

document.addEventListener("DOMContentLoaded",function() {
  renderServices();
  renderCart();
  loadProducts();
});
