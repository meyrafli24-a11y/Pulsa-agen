
// ========================================
// PULSAKULA - JAVASCRIPT
// ========================================

const ADMIN_WA = "6283894053143";

const QRIS_URL = "https://raw.githubusercontent.com/meyrafli24-a11y/Pulsa-agen/main/qr_ID1025376713323_07.01.26_176777048_1767770502053.jpeg";

let products = [];
let cart = [];
let selectedProduct = null;
let activeCategory = "Semua";
let activeOperator = "";

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

const services = [
  ["Pulsa","📱"],
  ["Paket Data","🌐"],
  ["Token PLN","⚡"],
  ["Voucher Game","🎮"],
  ["E-Wallet","💳"],
  ["Transfer","🏦"]
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
// FORMAT HARGA
// ========================================

function rupiah(value) {
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}

function totalHarga() {
  return cart.reduce((sum,item) => sum + item.price,0);
}

// ========================================
// TAMPILKAN LAYANAN
// ========================================

function renderServices() {
  const area = document.getElementById("services");
  if (!area) return;

  area.innerHTML = services.map(item => `
    <button class="service-card" onclick="selectCategory('${item[0]}')">
      <div class="service-icon">${item[1]}</div>
      <b>${item[0]}</b>
    </button>
  `).join("");
}

// ========================================
// AMBIL PRODUK BACKEND
// ========================================

async function loadProducts() {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error("Produk API tidak tersedia");

    const data = await response.json();

    if (Array.isArray(data.products) && data.products.length > 0) {
      products = data.products.map(item => ({
        name: item.name || item.product_name,
        category: item.category || "Lainnya",
        price: Number(item.price || item.selling_price || 0),
        operator: item.operator || "",
        icon: item.icon || "📦"
      }));
    } else {
      products = [...demoProducts];
    }
  } catch (error) {
    console.log(error);
    products = [...demoProducts];
  }

  renderFilters();
  renderProducts();
}

// ========================================
// KATEGORI
// ========================================

function selectCategory(category) {
  activeCategory = category;
  activeOperator = "";

  const operatorSection = document.getElementById("operatorSection");

  if (category === "E-Wallet" || category === "Transfer") {
    openCustomProduct(category);
    return;
  }

  if (category === "Pulsa" || category === "Paket Data") {
    if (operatorSection) operatorSection.hidden = false;

    const title = document.getElementById("operatorTitle");
    if (title) title.textContent = "Pilih Operator";

    renderOperators();
  } else {
    if (operatorSection) operatorSection.hidden = true;
  }

  renderFilters();
  renderProducts();
}

function renderOperators() {
  const area = document.getElementById("operators");
  if (!area) return;

  area.innerHTML = operators.map(item => `
    <button class="operator-card" onclick="selectOperator('${item[0]}')">
      <div>${item[1]}</div>
      <b>${item[0]}</b>
    </button>
  `).join("");
}

function selectOperator(operator) {
  activeOperator = operator;
  renderProducts();
}

// ========================================
// FILTER PRODUK
// ========================================

function renderFilters() {
  const area = document.getElementById("filters");
  if (!area) return;

  const categories = ["Semua", ...new Set(products.map(p => p.category))];

  area.innerHTML = categories.map(category => `
    <button class="filter-btn ${activeCategory === category ? "active" : ""}"
      onclick="filterCategory('${category}')">
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
// TAMPILKAN PRODUK
// ========================================

function renderProducts() {
  const area = document.getElementById("products");
  if (!area) return;

  const search = document.getElementById("search");
  const keyword = search ? search.value.toLowerCase() : "";

  let result = products.filter(item => {
    const categoryMatch = activeCategory === "Semua" ||
      item.category === activeCategory;

    const operatorMatch = !activeOperator ||
      item.operator === activeOperator;

    const searchMatch = item.name.toLowerCase().includes(keyword);

    return categoryMatch && operatorMatch && searchMatch;
  });

  if (result.length === 0) {
    area.innerHTML = "<p>Produk tidak ditemukan.</p>";
    return;
  }

  area.innerHTML = result.map((item,index) => `
    <div class="product-card">
      <div class="product-symbol">${item.icon}</div>
      <h3>${item.name}</h3>
      <p>${item.category}</p>
      <div class="product-price">${rupiah(item.price)}</div>
      <button class="choose-btn" onclick="openProduct(${products.indexOf(item)})">
        Pilih Produk
      </button>
    </div>
  `).join("");
}

// ========================================
// DETAIL PRODUK
// ========================================

function openProduct(index) {
  selectedProduct = products[index];

  document.getElementById("productIcon").textContent = selectedProduct.icon;
  document.getElementById("productName").textContent = selectedProduct.name;
  document.getElementById("productCategory").textContent = selectedProduct.category;
  document.getElementById("productPrice").textContent = rupiah(selectedProduct.price);
  document.getElementById("target").value = "";

  document.getElementById("productModal").classList.add("show");
}

function closeProduct() {
  document.getElementById("productModal").classList.remove("show");
}

// ========================================
// PRODUK NOMINAL BEBAS
// ========================================

function openCustomProduct(category) {
  selectedProduct = {
    name: category,
    category: category,
    price: 0,
    icon: category === "E-Wallet" ? "💳" : "🏦",
    custom: true
  };

  document.getElementById("productIcon").textContent = selectedProduct.icon;
  document.getElementById("productName").textContent = category;
  document.getElementById("productCategory").textContent = "Masukkan nominal";
  document.getElementById("productPrice").textContent = "Nominal bebas";
  document.getElementById("target").value = "";

  let old = document.getElementById("customAmount");
  if (old) old.remove();

  const input = document.createElement("input");
  input.id = "customAmount";
  input.type = "number";
  input.placeholder = "Masukkan nominal";
  input.min = "1000";

  const target = document.getElementById("target");
  target.parentNode.insertBefore(input,target);

  document.getElementById("productModal").classList.add("show");
}

// ========================================
// TAMBAH KE KERANJANG
// ========================================

function addToCart() {
  if (!selectedProduct) return;

  const target = document.getElementById("target").value.trim();

  if (!target) {
    alert("Masukkan nomor atau ID tujuan!");
    return;
  }

  let price = selectedProduct.price;
  let name = selectedProduct.name;

  if (selectedProduct.custom) {
    const amount = Number(document.getElementById("customAmount").value);

    if (!amount || amount < 1000) {
      alert("Minimal nominal Rp 1.000!");
      return;
    }

    price = amount + 2000;
    name += " " + rupiah(amount);
  }

  cart.push({
    name: name,
    target: target,
    category: selectedProduct.category,
    price: price
  });

  closeProduct();
  renderCart();

  alert("Berhasil ditambahkan ke keranjang!");
}

// ========================================
// KERANJANG
// ========================================

function renderCart() {
  const area = document.getElementById("cartItems");
  const count = document.getElementById("cartCount");

  if (count) count.textContent = cart.length;
  if (!area) return;

  if (cart.length === 0) {
    area.innerHTML = "<p>Keranjang masih kosong.</p>";
  } else {
    area.innerHTML = cart.map((item,index) => `
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
  if (total) total.textContent = "Total: " + rupiah(totalHarga());
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
// CHECKOUT QRIS
// ========================================

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const customer = document.getElementById("customer").value.trim();

  if (!customer) {
    alert("Masukkan nama pemesan!");
    return;
  }

  document.getElementById("paymentTotal").textContent = rupiah(totalHarga());

  const image = document.getElementById("qrisImage");
  const error = document.getElementById("qrisError");

  if (image) {
    image.style.display = "block";
    image.onerror = function() {
      image.style.display = "none";
      if (error) error.style.display = "block";
    };
    image.onload = function() {
      if (error) error.style.display = "none";
      image.style.display = "block";
    };
    image.src = QRIS_URL;
  }

  if (error) error.style.display = "none";

  closeCart();
  document.getElementById("paymentModal").classList.add("show");
}

function closePayment() {
  document.getElementById("paymentModal").classList.remove("show");
}

// ========================================
// KIRIM PESANAN KE WHATSAPP
// ========================================

function sendOrder() {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  const customer = document.getElementById("customer").value.trim();

  if (!customer) {
    alert("Nama pemesan belum diisi!");
    return;
  }

  let message = "PESANAN PULSAKULA\n\n";
  message += "Nama: " + customer + "\n\n";
  message += "Daftar Pesanan:\n";

  cart.forEach((item,index) => {
    message += "\n" + (index + 1) + ". " + item.name;
    message += "\nTujuan: " + item.target;
    message += "\nHarga: " + rupiah(item.price) + "\n";
  });

  message += "\nTOTAL: " + rupiah(totalHarga());
  message += "\n\nSaya sudah melakukan pembayaran QRIS. Saya akan mengirim bukti pembayaran.";

  const whatsappURL = "https://wa.me/" + ADMIN_WA +
    "?text=" + encodeURIComponent(message);

  window.open(whatsappURL,"_blank");
}

// ========================================
// MULAI WEBSITE
// ========================================

document.addEventListener("DOMContentLoaded",function() {
  renderServices();
  renderCart();
  loadProducts();
});
