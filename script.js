
// ========================================
// PULSAKULA - JAVASCRIPT LENGKAP
// KATALOG + KERANJANG + QRIS + WHATSAPP
// ========================================

const ADMIN_WA = "6283894053143";
const KEUNTUNGAN = 1000;

// ========================================
// DAFTAR PRODUK
// Harga di sini adalah modal provider
// ========================================

const products = [
  // PULSA
  {id:1,name:"Pulsa 5.000",category:"Pulsa",price:5200,icon:"📱"},
  {id:2,name:"Pulsa Promo 5.000",category:"Pulsa",price:5228,icon:"📱"},
  {id:3,name:"Pulsa Promo 10.000",category:"Pulsa",price:10042,icon:"📱"},
  {id:4,name:"Pulsa 10.000",category:"Pulsa",price:10335,icon:"📱"},
  {id:5,name:"Pulsa 15.000",category:"Pulsa",price:14750,icon:"📱"},
  {id:6,name:"Pulsa Promo 20.000",category:"Pulsa",price:19845,icon:"📱"},
  {id:7,name:"Pulsa 20.000",category:"Pulsa",price:19950,icon:"📱"},
  {id:8,name:"Pulsa 25.000",category:"Pulsa",price:24745,icon:"📱"},
  {id:9,name:"Pulsa 30.000",category:"Pulsa",price:29655,icon:"📱"},
  {id:10,name:"Pulsa 40.000",category:"Pulsa",price:39845,icon:"📱"},
  {id:11,name:"Pulsa 50.000",category:"Pulsa",price:49350,icon:"📱"},
  {id:12,name:"Pulsa 60.000",category:"Pulsa",price:59256,icon:"📱"},
  {id:13,name:"Pulsa 70.000",category:"Pulsa",price:68925,icon:"📱"},
  {id:14,name:"Pulsa 75.000",category:"Pulsa",price:74523,icon:"📱"},
  {id:15,name:"Pulsa 80.000",category:"Pulsa",price:79786,icon:"📱"},
  {id:16,name:"Pulsa 90.000",category:"Pulsa",price:89250,icon:"📱"},
  {id:17,name:"Pulsa Promo 100.000",category:"Pulsa",price:96788,icon:"📱"},
  {id:18,name:"Pulsa 100.000",category:"Pulsa",price:99000,icon:"📱"},
  {id:19,name:"Pulsa 150.000",category:"Pulsa",price:148372,icon:"📱"},
  {id:20,name:"Pulsa 200.000",category:"Pulsa",price:198622,icon:"📱"},

  // PAKET DATA
  {id:21,name:"Paket Data Telkomsel 5GB",category:"Paket Data",price:25000,icon:"🌐"},
  {id:22,name:"Paket Data Telkomsel 10GB",category:"Paket Data",price:45000,icon:"🌐"},
  {id:23,name:"Paket Data Indosat 5GB",category:"Paket Data",price:22000,icon:"🌐"},
  {id:24,name:"Paket Data XL 8GB",category:"Paket Data",price:30000,icon:"🌐"},

  // TOKEN PLN
  {id:25,name:"Token PLN 5.000",category:"Token Listrik",price:6995,icon:"⚡"},
  {id:26,name:"Token PLN 10.000",category:"Token Listrik",price:11995,icon:"⚡"},
  {id:27,name:"Token PLN 15.000",category:"Token Listrik",price:16995,icon:"⚡"},
  {id:28,name:"Token PLN 20.000",category:"Token Listrik",price:22195,icon:"⚡"},
  {id:29,name:"Token PLN 25.000",category:"Token Listrik",price:27995,icon:"⚡"},
  {id:30,name:"Token PLN 50.000",category:"Token Listrik",price:52195,icon:"⚡"},
  {id:31,name:"Token PLN 100.000",category:"Token Listrik",price:102195,icon:"⚡"},
  {id:32,name:"Token PLN 200.000",category:"Token Listrik",price:202195,icon:"⚡"},
  {id:33,name:"Token PLN 500.000",category:"Token Listrik",price:502195,icon:"⚡"},
  {id:34,name:"Token PLN 1.000.000",category:"Token Listrik",price:1002195,icon:"⚡"},

  // E-WALLET
  {id:35,name:"Top Up DANA 10.000",category:"E-Wallet",price:10000,icon:"💳"},
  {id:36,name:"Top Up DANA 20.000",category:"E-Wallet",price:20000,icon:"💳"},
  {id:37,name:"Top Up OVO 20.000",category:"E-Wallet",price:20000,icon:"💳"},

  // GAME LAMA
  {id:38,name:"Diamond Game 50",category:"Game",price:15000,icon:"🎮"},
  {id:39,name:"Diamond Game 100",category:"Game",price:28000,icon:"🎮"},

  // DIAMOND FREE FIRE
  {id:40,name:"10 Diamond FF",category:"Diamond FF",price:1491,icon:"💎"},
  {id:41,name:"12 Diamond FF",category:"Diamond FF",price:1636,icon:"💎"},
  {id:42,name:"15 Diamond FF",category:"Diamond FF",price:2239,icon:"💎"},
  {id:43,name:"20 Diamond FF",category:"Diamond FF",price:2957,icon:"💎"},
  {id:44,name:"24 Diamond FF",category:"Diamond FF",price:3280,icon:"💎"},
  {id:45,name:"25 Diamond FF",category:"Diamond FF",price:3675,icon:"💎"},
  {id:46,name:"30 Diamond FF",category:"Diamond FF",price:4393,icon:"💎"},
  {id:47,name:"40 Diamond FF",category:"Diamond FF",price:5566,icon:"💎"},
  {id:48,name:"50 Diamond FF",category:"Diamond FF",price:5843,icon:"💎"},
  {id:49,name:"55 Diamond FF",category:"Diamond FF",price:6561,icon:"💎"},
  {id:50,name:"60 Diamond FF",category:"Diamond FF",price:7279,icon:"💎"},
  {id:51,name:"70 Diamond FF",category:"Diamond FF",price:7999,icon:"💎"},
  {id:52,name:"75 Diamond FF",category:"Diamond FF",price:8701,icon:"💎"},
  {id:53,name:"80 Diamond FF",category:"Diamond FF",price:9419,icon:"💎"},
  {id:54,name:"90 Diamond FF",category:"Diamond FF",price:10870,icon:"💎"},
  {id:55,name:"95 Diamond FF",category:"Diamond FF",price:11588,icon:"💎"},
  {id:56,name:"100 Diamond FF",category:"Diamond FF",price:12299,icon:"💎"},
  {id:57,name:"105 Diamond FF",category:"Diamond FF",price:12314,icon:"💎"},
  {id:58,name:"120 Diamond FF",category:"Diamond FF",price:13736,icon:"💎"},
  {id:59,name:"125 Diamond FF",category:"Diamond FF",price:14454,icon:"💎"},
  {id:60,name:"130 Diamond FF",category:"Diamond FF",price:15212,icon:"💎"},
  {id:61,name:"140 Diamond FF",category:"Diamond FF",price:15760,icon:"💎"},
  {id:62,name:"145 Diamond FF",category:"Diamond FF",price:16634,icon:"💎"}
];

// ========================================
// HARGA DAN FORMAT
// ========================================

function hargaJual(hargaModal) {
  return hargaModal + KEUNTUNGAN;
}

function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style:"currency",
    currency:"IDR",
    maximumFractionDigits:0
  }).format(number);
}

// ========================================
// KERANJANG
// ========================================

let selectedCategory = "Semua";
let selectedProduct = null;
let cart = [];

// ========================================
// TAMPILKAN PRODUK
// ========================================

function renderProducts() {
  const container = document.getElementById("productList");
  const searchInput = document.getElementById("searchInput");

  if (!container || !searchInput) return;

  const search = searchInput.value.toLowerCase().trim();

  const filtered = products.filter(product => {
    const matchCategory =
      selectedCategory === "Semua" ||
      product.category === selectedCategory;

    const matchSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML =
      `<p class="empty-state">Produk tidak ditemukan.</p>`;
    return;
  }

  container.innerHTML = filtered.map(product => `
    <div class="product-card">
      <div class="product-icon">${product.icon}</div>
      <h3>${product.name}</h3>
      <p>${product.category}</p>
      <div class="product-price">
        ${rupiah(hargaJual(product.price))}
      </div>
      <button class="buy-button" onclick="openProduct(${product.id})">
        Beli Sekarang
      </button>
    </div>
  `).join("");
}

// ========================================
// KATEGORI
// ========================================

function selectCategory(category, button) {
  selectedCategory = category;

  document.querySelectorAll(".category").forEach(item => {
    item.classList.remove("active");
  });

  if (button) button.classList.add("active");

  renderProducts();
}

// ========================================
// DETAIL PRODUK
// ========================================

function openProduct(id) {
  selectedProduct = products.find(product => product.id === id);

  if (!selectedProduct) return;

  document.getElementById("modalIcon").textContent = selectedProduct.icon;
  document.getElementById("modalName").textContent = selectedProduct.name;
  document.getElementById("modalCategory").textContent = selectedProduct.category;
  document.getElementById("modalPrice").textContent = rupiah(hargaJual(selectedProduct.price));
  document.getElementById("targetInput").value = "";

  document.getElementById("productModal").classList.add("show");
}

function closeProduct() {
  document.getElementById("productModal").classList.remove("show");
}

// ========================================
// TAMBAH KERANJANG
// ========================================

function addToCart() {
  if (!selectedProduct) return;

  const target = document.getElementById("targetInput").value.trim();

  if (!target) {
    alert("Masukkan nomor HP atau ID pelanggan!");
    return;
  }

  if (target.length < 4) {
    alert("Nomor atau ID terlalu pendek!");
    return;
  }

  cart.push({
    id:selectedProduct.id,
    name:selectedProduct.name,
    category:selectedProduct.category,
    icon:selectedProduct.icon,
    price:hargaJual(selectedProduct.price),
    target:target,
    cartId:Date.now() + Math.random()
  });

  updateCartCount();
  closeProduct();
  alert("Produk berhasil ditambahkan ke keranjang!");
}

function getTotal() {
  return cart.reduce((total,item) => total + item.price,0);
}

function updateCartCount() {
  const count = document.getElementById("cartCount");
  if (count) count.textContent = cart.length;
}

// ========================================
// KERANJANG
// ========================================

function openCart() {
  renderCart();
  document.getElementById("cartModal").classList.add("show");
}

function closeCart() {
  document.getElementById("cartModal").classList.remove("show");
}

function renderCart() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-state">Keranjang masih kosong.</p>`;
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <p>Tujuan: ${item.target}</p>
          <p>${rupiah(item.price)}</p>
        </div>
        <button class="remove-button" onclick="removeCart('${item.cartId}')">
          Hapus
        </button>
      </div>
    `).join("");
  }

  document.getElementById("cartTotal").textContent = rupiah(getTotal());
}

function removeCart(id) {
  cart = cart.filter(item => String(item.cartId) !== String(id));
  updateCartCount();
  renderCart();
}

// ========================================
// CHECKOUT
// ========================================

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  document.getElementById("paymentTotal").textContent = rupiah(getTotal());

  closeCart();
  document.getElementById("paymentModal").classList.add("show");
}

function closePayment() {
  document.getElementById("paymentModal").classList.remove("show");
}

// ========================================
// WHATSAPP ADMIN
// ========================================

function sendOrder() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let message = "HALO ADMIN PULSAKULA\nSaya ingin memesan:\n\n";

  cart.forEach((item,index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `Tujuan: ${item.target}\n`;
    message += `Harga: ${rupiah(item.price)}\n\n`;
  });

  message += `TOTAL: ${rupiah(getTotal())}\n\n`;
  message += "Mohon konfirmasi pesanan dan pembayaran saya.";

  const url = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(message)}`;

  window.open(url,"_blank");
}

// ========================================
// TUTUP MODAL
// ========================================

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click",event => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
});

// ========================================
// PENCARIAN
// ========================================

document.getElementById("searchInput")?.addEventListener(
  "input",
  renderProducts
);

// ========================================
// JALANKAN WEBSITE
// ========================================

renderProducts();
updateCartCount();
