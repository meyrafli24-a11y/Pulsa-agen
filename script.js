
const ADMIN_WA = ""; 
// Masukkan nomor WhatsApp admin, contoh: 6281234567890

const products = [
["Pulsa","Telkomsel 5.000",6000,"📱"],
["Pulsa","Telkomsel 10.000",10500,"📱"],
["Pulsa","Telkomsel 20.000",20500,"📱"],
["Pulsa","Telkomsel 50.000",50500,"📱"],
["Pulsa","Indosat 5.000",6500,"📱"],
["Pulsa","Indosat 10.000",11500,"📱"],
["Pulsa","XL 10.000",12500,"📱"],
["Pulsa","AXIS 10.000",11000,"📱"],
["Pulsa","Tri 10.000",12000,"📱"],
["Pulsa","Smartfren 10.000",10500,"📱"],

["Paket Data","Telkomsel 3 GB",18000,"🌐"],
["Paket Data","Telkomsel 8 GB",35000,"🌐"],
["Paket Data","Indosat 5 GB",22000,"🌐"],
["Paket Data","XL 5 GB",23000,"🌐"],
["Paket Data","AXIS 5 GB",21000,"🌐"],
["Paket Data","Tri 6 GB",24000,"🌐"],

["Token PLN","Token 20.000",22000,"⚡"],
["Token PLN","Token 50.000",52000,"⚡"],
["Token PLN","Token 100.000",102000,"⚡"],

["E-Wallet","DANA 10.000",11200,"💳"],
["E-Wallet","DANA 20.000",21200,"💳"],
["E-Wallet","OVO 20.000",21500,"💳"],
["E-Wallet","GoPay 20.000",21500,"💳"],
["E-Wallet","ShopeePay 20.000",21500,"💳"],

["Voucher Game","ML 86 Diamonds",22000,"🎮"],
["Voucher Game","FF 70 Diamonds",11000,"🎮"],
["Voucher Game","PUBG 60 UC",16000,"🎮"],

["Masa Aktif","Telkomsel Masa Aktif",8000,"⏳"],
["Telepon & SMS","Paket Telepon",12000,"☎️"],
["TV & Hiburan","Voucher TV",25000,"📺"],

["Tagihan","Biaya layanan listrik",2500,"🧾"],
["PDAM","Biaya layanan PDAM",3000,"💧"],
["BPJS","Biaya layanan BPJS",3000,"🏥"],
["Internet & WiFi","Biaya layanan internet",3000,"📡"]
];

const rupiah = n =>
  "Rp" + n.toLocaleString("id-ID");

let cart = [];
let selected = null;
let category = "Semua";

const grid = document.getElementById("productGrid");
const filters = document.getElementById("filterRow");
const search = document.getElementById("searchInput");

const services = [
["Pulsa","📱"],
["Paket Data","🌐"],
["Masa Aktif","⏳"],
["Token PLN","⚡"],
["E-Wallet","💳"],
["Voucher Game","🎮"],
["Telepon & SMS","☎️"],
["TV & Hiburan","📺"],
["Tagihan","🧾"],
["PDAM","💧"],
["BPJS","🏥"],
["Internet & WiFi","📡"]
];

services.forEach(s => {
  const btn = document.createElement("button");
  btn.className = "service-card";
  btn.innerHTML = `<span>${s[1]}</span><b>${s[0]}</b>`;

  btn.onclick = () => selectCategory(s[0]);
  document.getElementById("serviceGrid").appendChild(btn);
});

const categories = ["Semua", ...services.map(s => s[0])];

categories.forEach(c => {
  const btn = document.createElement("button");
  btn.className = "filter-btn";
  if (c === "Semua") btn.classList.add("active");
  btn.textContent = c;

  btn.onclick = () => selectCategory(c);
  filters.appendChild(btn);
});

function selectCategory(c) {
  category = c;

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.textContent === c);
  });

  renderProducts();
  document.getElementById("produk").scrollIntoView({
    behavior: "smooth"
  });
}

function renderProducts() {
  grid.innerHTML = "";

  const q = search.value.toLowerCase();

  const result = products.filter(p =>
    (category === "Semua" || p[0] === category) &&
    p[1].toLowerCase().includes(q)
  );

  result.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-symbol">${p[3]}</div>
      <h3>${p[1]}</h3>
      <p>${p[0]}</p>
      <span class="product-price">${rupiah(p[2])}</span>
      <button class="choose-btn">Pilih Produk</button>
    `;

    card.querySelector("button").onclick = () => openProduct(p);
    grid.appendChild(card);
  });

  document.getElementById("emptyState").hidden =
    result.length > 0;
}

function openProduct(p) {
  selected = p;

  document.getElementById("modalIcon").textContent = p[3];
  document.getElementById("modalName").textContent = p[1];
  document.getElementById("modalInfo").textContent = p[0];
  document.getElementById("modalPrice").textContent = rupiah(p[2]);
  document.getElementById("targetInput").value = "";

  document.getElementById("productModal").hidden = false;
}

document.querySelectorAll("[data-close]").forEach(btn => {
  btn.onclick = () => {
    document.getElementById(btn.dataset.close).hidden = true;
  };
});

document.getElementById("addToCart").onclick = () => {
  const target = document.getElementById("targetInput").value.trim();

  if (!target) {
    alert("Masukkan nomor tujuan!");
    return;
  }

  cart.push({ product: selected, target });
  document.getElementById("productModal").hidden = true;
  renderCart();
  document.getElementById("cartDrawer").hidden = false;
};

function renderCart() {
  const box = document.getElementById("cartItems");
  box.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.product[2];

    const row = document.createElement("div");
    row.className = "cart-row";

    row.innerHTML = `
      <div>
        <b>${item.product[1]}</b>
        <small>${item.target}</small>
        <button class="remove-btn">Hapus</button>
      </div>
      <b>${rupiah(item.product[2])}</b>
    `;

    row.querySelector("button").onclick = () => {
      cart.splice(index, 1);
      renderCart();
    };

    box.appendChild(row);
  });

  document.getElementById("cartCount").textContent = cart.length;
  document.getElementById("cartTotal").textContent = rupiah(total);
}

document.getElementById("cartOpen").onclick = () => {
  document.getElementById("cartDrawer").hidden = false;
};

document.getElementById("cartClose").onclick = () => {
  document.getElementById("cartDrawer").hidden = true;
};

document.getElementById("navCart").onclick = e => {
  e.preventDefault();
  document.getElementById("cartDrawer").hidden = false;
};

document.getElementById("checkoutBtn").onclick = () => {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const name = document.getElementById("customerName").value.trim();

  if (!name) {
    alert("Masukkan nama pemesan!");
    return;
  }

  if (!ADMIN_WA) {
    alert("Nomor WhatsApp admin belum diisi di script.js");
    return;
  }

  let message = `Pesanan PULSAKULA\nNama: ${name}\n\n`;

  cart.forEach((item, i) => {
    message += `${i + 1}. ${item.product[1]}\n`;
    message += `Tujuan: ${item.target}\n`;
    message += `Harga: ${rupiah(item.product[2])}\n\n`;
  });

  const total = cart.reduce(
    (sum, item) => sum + item.product[2], 0
  );

  message += `Total: ${rupiah(total)}`;

  window.open(
    "https://wa.me/" + ADMIN_WA +
    "?text=" + encodeURIComponent(message),
    "_blank"
  );
};

search.addEventListener("input", renderProducts);

renderProducts();
renderCart();
