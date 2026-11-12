
// ========================================
// CHECKOUT - BUKA PEMBAYARAN QRIS
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

  const total = cart.reduce((sum, item) => {
    return sum + Number(item.price || 0);
  }, 0);

  // Tampilkan total pembayaran
  document.getElementById("paymentTotal").textContent =
    rupiah(total);

  // Pastikan gambar QRIS terlihat
  const qris = document.getElementById("qrisImage");
  const error = document.getElementById("qrisError");

  if (qris) {
    qris.src = "https://raw.githubusercontent.com/meyrafli24-a11y/Pulsa-agen/main/qr_ID1025376713323_07.01.26_176777048_1767770502053.jpeg";

    qris.style.display = "block";
  }

  if (error) {
    error.style.display = "none";
  }

  // Tutup keranjang
  closeCart();

  // Buka pembayaran
  document.getElementById("paymentModal").classList.add("show");
}
