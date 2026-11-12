// ========================================
// PULSAKULA - JAVASCRIPT
// ========================================

// Nomor WhatsApp admin
const ADMIN_WA = "6283894053143";

// Daftar produk contoh.
// Ganti dengan katalog dari API provider setelah backend siap.
const products = [
  { id: 1, name: "Pulsa Telkomsel 5.000", category: "Pulsa", price: 7000, icon: "📱" },
  { id: 2, name: "Pulsa Telkomsel 10.000", category: "Pulsa", price: 12000, icon: "📱" },
  { id: 3, name: "Pulsa Telkomsel 20.000", category: "Pulsa", price: 22000, icon: "📱" },
  { id: 4, name: "Pulsa Indosat 10.000", category: "Pulsa", price: 12000, icon: "📱" },
  { id: 5, name: "Pulsa XL 10.000", category: "Pulsa", price: 12000, icon: "📱" },
  { id: 6, name: "Pulsa Tri 10.000", category: "Pulsa", price: 12000, icon: "📱" },

  { id: 7, name: "Paket Data Telkomsel 5GB", category: "Paket Data", price: 25000, icon: "🌐" },
  { id: 8, name: "Paket Data Telkomsel 10GB", category: "Paket Data", price: 45000, icon: "🌐" },
  { id: 9, name: "Paket Data Indosat 5GB", category: "Paket Data", price: 22000, icon: "🌐" },
  { id: 10, name: "Paket Data XL 8GB", category: "Paket Data", price: 30000, icon: "🌐" },

  { id: 11, name: "Token Listrik 20.000", category: "Token Listrik", price: 23000, icon: "⚡" },
  { id: 12, name: "Token Listrik 50.000", category: "Token Listrik", price: 53000, icon: "⚡" },
  { id: 13, name: "Token Listrik 100.000", category: "Token Listrik", price: 103000, icon: "⚡" },

  { id: 14, name: "Top Up DANA 10.000", category: "E-Wallet", price: 12000, icon: "💳" },
  { id: 15, name: "Top Up DANA 20.000", category: "E-Wallet", price: 22000, icon: "💳" },
  { id: 16, name: "Top Up OVO 20.000", category: "E-Wallet", price: 22000, icon: "💳" },

  { id: 17, name: "Diamond Game 50", category: "Game", price: 15000, icon: "🎮" },
  { id: 18, name: "Diamond Game 100", category: "Game", price: 28000, icon: "🎮" }
];

let selectedCategory = "Semua";
let selectedProduct = null;
let cart = [];

// Format rupiah
function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}

// Tampilkan produk
function renderProducts() {
  const container = document.getElementById("productList");
  const search = document.getElementById("searchInput").value.toLowerCase();

  const filtered = products.filter(product => {
    const matchCategory =
      selectedCategory === "Semua" ||
      product.category === selectedCategory;

    const matchSearch =
      product.name.toLowerCase().includes(search);

    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        Produk tidak ditemukan.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(product => `
    <div class="product-card">
      <div class="product-icon">${product.icon}</div>
      <h3>${product.name}</h3>
      <p>${product.category}</p>
      <div class="product-bottom">
        <span class="product-price">${rupiah(product.price)}</span>
        <button onclick="openProduct(${product.id})">Pilih</button>
      </div>
    </div>
  `).join("");
}

// Pilih kategori
function selectCategory(category, button) {
  selectedCategory = category;

  document.querySelectorAll(".category").forEach(item => {
    item.classList.remove("active");
  });

  button.classList.add("active");
  renderProducts();
}

// Buka detail produk
function openProduct(id) {
  selectedProduct = products.find(product => product.id === id);

  if (!selectedProduct) return;

  document.getElementById("modalIcon").textContent =
    selectedProduct.icon;

  document.getElementById("modalName").textContent =
    selectedProduct.name;

  document.getElementById("modalCategory").textContent =
    selectedProduct.category;

  document.getElementById("modalPrice").textContent =
    rupiah(selectedProduct.price);

  document.getElementById("targetInput").value = "";

  document.getElementById("productModal").classList.add("show");
}

function closeProduct() {
  document.getElementById("productModal").classList.remove("show");
}

// Tambahkan produk ke keranjang
function addToCart() {
  if (!selectedProduct) return;

  const target = document.getElementById("targetInput").value.trim();

  if (!target) {
    alert("Masukkan nomor HP atau ID pelanggan terlebih dahulu.");
    return;
  }

  if (target.length < 4) {
    alert("Nomor atau ID tujuan terlalu pendek.");
    return;
  }

  cart.push({
    ...selectedProduct,
    target: target,
    cartId: Date.now() + Math.random()
  });

  updateCartCount();
  closeProduct();

  alert("Produk berhasil dimasukkan ke keranjang.");
}

// Hitung total
function getTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

// Perbarui jumlah keranjang
function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.length;
}

// Buka keranjang
function openCart() {
  renderCart();
  document.getElementById("cartModal").classList.add("show");
}

function closeCart() {
  document.getElementById("cartModal").classList.remove("show");
}

// Tampilkan isi keranjang
function renderCart() {
  const container = document.getElementById("cartItems");

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        Keranjang masih kosong.
      </div>
    `;
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <small>Tujuan: ${item.target}</small>
          <small>${rupiah(item.price)}</small>
        </div>
        <button class="remove-button"
          onclick="removeCart('${item.cartId}')">
          Hapus
        </button>
      </div>
    `).join("");
  }

  document.getElementById("cartTotal").textContent =
    rupiah(getTotal());
}

// Hapus produk
function removeCart(id) {
  cart = cart.filter(item => String(item.cartId) !== String(id));

  updateCartCount();
  renderCart();
}

// Lanjut ke pembayaran
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  document.getElementById("paymentTotal").textContent =
    rupiah(getTotal());

  closeCart();
  document.getElementById("paymentModal").classList.add("show");
}

function closePayment() {
  document.getElementById("paymentModal").classList.remove("show");
}

// Kirim detail pesanan ke WhatsApp admin
function sendOrder() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  let message = "Halo Admin PULSAKULA, saya ingin memesan:%0A%0A";

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name}%0A`;
    message += `Tujuan: ${item.target}%0A`;
    message += `Harga: ${rupiah(item.price)}%0A%0A`;
  });

  message += `TOTAL: ${rupiah(getTotal())}%0A%0A`;
  message += "Mohon konfirmasi pesanan dan pembayaran saya.";

  const url = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(
    decodeURIComponent(message)
  )}`;

  window.open(url, "_blank");
}

// Tutup modal jika area luar diklik
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
});

// Jalankan saat halaman dibuka
renderProducts();
updateCartCount();