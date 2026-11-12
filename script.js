// ==================================
// DATA PRODUK LANGSUNG (TANPA BACKEND)
// ==================================

function loadProducts() {
  const container = el("products");
  
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

  // Proses datanya (ini bagian dari kode asli kamu yang kita pertahankan)
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

  // Tampilkan
  renderProducts();
}