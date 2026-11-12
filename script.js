
function sendOrder() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const customer = document.getElementById("customer").value.trim();

  if (!customer) {
    alert("Nama pemesan belum diisi!");
    return;
  }

  const total = cart.reduce((sum, item) =>
    sum + Number(item.price), 0
  );

  let message = `KONFIRMASI PEMBAYARAN PULSAKULA\n\n`;
  message += `Nama Pemesan: ${customer}\n`;
  message += `Status: SUDAH MELAKUKAN PEMBAYARAN\n\n`;
  message += `DETAIL PESANAN:\n`;

  cart.forEach((item, index) => {
    message += `\n${index + 1}. ${item.name}\n`;
    message += `Tujuan: ${item.target}\n`;
    message += `Harga: ${rupiah(item.price)}\n`;
  });

  message += `\nTOTAL PEMBAYARAN: ${rupiah(total)}\n`;
  message += `\nSaya akan mengirimkan bukti pembayaran berupa gambar setelah pesan ini.`;
  message += `\nMohon periksa pembayaran dan proses pesanan saya.`;

  const url = "https://wa.me/" + ADMIN_WA +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}