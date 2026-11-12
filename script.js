
const ADMIN_WA = "6283894053143";

let products = [];
let selectedProduct = null;
let cart = [];
let activeCategory = "Semua";
let activeOperator = "";

const serviceList = [
  ["Pulsa", "📱", "Isi ulang pulsa"],
  ["Paket Data", "🌐", "Paket internet"],
  ["Masa Aktif", "⏳", "Perpanjang masa aktif"],
  ["Token PLN", "⚡", "Token listrik"],
  ["E-Wallet", "💳", "Isi saldo e-wallet"],
  ["Voucher Game", "🎮", "Top up permainan"],
  ["Telepon & SMS", "☎️", "Paket komunikasi"],
  ["TV & Hiburan", "📺", "Voucher hiburan"],
  ["Tagihan", "🧾", "Bayar tagihan"],
  ["PDAM", "💧", "Tagihan air"],
  ["BPJS", "🏥", "Iuran BPJS"],
  ["Internet & WiFi", "📡", "Pembayaran internet"]
];

const operators = [
  ["Telkomsel", "🔴"],
  ["Indosat", "🟡"],
  ["XL", "🔵"],
  ["Tri", "⚫"],
  ["Smartfren", "🔴"],
  ["Axis", "🟣"]
];

const demoProducts = [
  {name:"Telkomsel 5.000",category:"Pulsa",price:6500,operator:"Telkomsel",icon:"🔴"},
  {name:"Telkomsel 10.000",category:"Pulsa",price:11500,operator:"Telkomsel",icon:"🔴"},
  {name:"Telkomsel 20.000",category:"Pulsa",price:21500,operator:"Telkomsel",icon:"🔴"},
  {name:"Indosat 10.000",category:"Pulsa",price:11500,operator:"Indosat",icon:"🟡"},
  {name:"XL 10.000",category:"Pulsa",price:11500,operator:"XL",icon:"🔵"},
  {name:"Tri 10.000",category:"Pulsa",price:11500,operator:"Tri",icon:"⚫"},

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
  {name:"Free Fire 355 Diamond",category:"Voucher Game",price:50000,icon:"🎮"},

  {name:"GoPay 10.000",category:"E-Wallet",price:11500,icon:"💳"},
  {name:"OVO 20.000",category:"E-Wallet",price:21500,icon:"💳"},
  {name:"DANA 50.000",category:"E-Wallet",price:51500,icon:"💳"}
];

function rupiah(number) {
  return "Rp " + Number(number || 0).toLocaleString("id-ID");
}
