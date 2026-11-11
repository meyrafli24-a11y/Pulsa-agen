// Database Katalog Produk Super Lengkap
const productData = {
    pulsa: [
        { id: 'p5', title: 'Pulsa 5.000', desc: 'Masa aktif +7 hari', costPrice: 5150, tag: 'Grosir' },
        { id: 'p10', title: 'Pulsa 10.000', desc: 'Masa aktif +15 hari', costPrice: 10150, tag: 'Laris' },
        { id: 'p15', title: 'Pulsa 15.000', desc: 'Masa aktif +20 hari', costPrice: 15150, tag: 'Hemat' },
        { id: 'p20', title: 'Pulsa 20.000', desc: 'Masa aktif +30 hari', costPrice: 20050, tag: 'Promo' },
        { id: 'p25', title: 'Pulsa 25.000', desc: 'Masa aktif +30 hari', costPrice: 24900, tag: 'Murah' },
        { id: 'p50', title: 'Pulsa 50.000', desc: 'Masa aktif +45 hari', costPrice: 49500, tag: 'Grosir' },
        { id: 'p100', title: 'Pulsa 100.000', desc: 'Masa aktif +60 hari', costPrice: 98500, tag: 'Hemat' }
    ],
    data: [
        { id: 'd1', title: 'Kuota 1.5 GB / 3 Hari', desc: 'Full 24 Jam All Jaringan', costPrice: 8500, tag: 'Hemat' },
        { id: 'd2', title: 'Kuota 3 GB / 7 Hari', desc: 'Full 24 Jam All Jaringan', costPrice: 14500, tag: 'Laris' },
        { id: 'd3', title: 'Kuota 5 GB / 14 Hari', desc: 'Full 24 Jam All Jaringan', costPrice: 22000, tag: 'Promo' },
        { id: 'd4', title: 'Kuota 10 GB / 30 Hari', desc: 'Kuota Utama tanpa bagi-bagi', costPrice: 35000, tag: 'Super' },
        { id: 'd5', title: 'Kuota 25 GB / 30 Hari', desc: 'Full 24 Jam + Youtube', costPrice: 62000, tag: 'Best' }
    ],
    game: [
        { id: 'ml86', title: '86 Diamonds MLBB', desc: 'Proses Instan VIA User ID', costPrice: 19500, tag: 'Laris' },
        { id: 'ml172', title: '172 Diamonds MLBB', desc: 'Proses Instan VIA User ID', costPrice: 38000, tag: 'Promo' },
        { id: 'ml257', title: '257 Diamonds MLBB', desc: 'Proses Instan VIA User ID', costPrice: 56000, tag: 'Best' },
        { id: 'ff140', title: '140 Diamonds Free Fire', desc: 'Proses Fast via User ID', costPrice: 18500, tag: 'Grosir' },
        { id: 'ff355', title: '355 Diamonds Free Fire', desc: 'Proses Fast via User ID', costPrice: 46000, tag: 'Popular' },
        { id: 'pubg60', title: '60 UC PUBG Mobile', desc: 'Direct Top Up Player ID', costPrice: 14000, tag: 'Cheap' },
        { id: 'genshin60', title: '60 Genesis Crystal', desc: 'Via UID + Server ID', costPrice: 14200, tag: 'Fast' }
    ],
    emoney: [
        { id: 'dana20', title: 'Saldo DANA Rp 20.000', desc: 'Saldo Masuk Instan', costPrice: 20250, tag: 'Instan' },
        { id: 'dana50', title: 'Saldo DANA Rp 50.000', desc: 'Saldo Masuk Instan', costPrice: 50250, tag: 'Laris' },
        { id: 'gopay50', title: 'GoPay Rp 50.000', desc: 'Bisa Customer / Driver', costPrice: 50250, tag: 'Laris' },
        { id: 'ovo50', title: 'Saldo OVO Rp 50.000', desc: 'Topup Saldo OVO Cash', costPrice: 50300, tag: 'Fast' },
        { id: 'spay100', title: 'ShopeePay Rp 100.000', desc: 'Langsung Aktif', costPrice: 100250, tag: 'Bebas Admin' }
    ],
    pln: [
        { id: 'pln20', title: 'Token PLN Rp 20.000', desc: 'KWH Listrik Pintar', costPrice: 20100, tag: 'Resmi' },
        { id: 'pln50', title: 'Token PLN Rp 50.000', desc: 'KWH Listrik Pintar', costPrice: 50100, tag: 'Laris' },
        { id: 'pln100', title: 'Token PLN Rp 100.000', desc: 'KWH Listrik Pintar', costPrice: 100100, tag: 'Hemat' }
    ],
    ppob: [
        { id: 'indihome', title: 'Pembayaran Wi-Fi IndiHome', desc: 'Cek & Bayar Tagihan', costPrice: 2500, tag: 'PPOB' },
        { id: 'bpjs', title: 'Tagihan BPJS Kesehatan', desc: 'Pembayaran Bulanan', costPrice: 2500, tag: 'Resmi' },
        { id: 'pdam', title: 'Tagihan Air PDAM', desc: 'Cek Tagihan Daerah', costPrice: 2500, tag: 'Cepat' }
    ]
};

let currentCategory = 'pulsa';
let selectedProduct = null;
let myQrisData = localStorage.getItem('user_qris_image') || '';

window.onload = function() {
    renderProducts();
    if(myQrisData) {
        const preview = document.getElementById('qrisPreview');
        if(preview) {
            preview.src = myQrisData;
            preview.style.display = 'block';
        }
    }
};

function switchCategory(cat, cardElement) {
    currentCategory = cat;
    document.querySelectorAll('.cat-card').forEach(card => card.classList.remove('active'));
    cardElement.classList.add('active');

    const labelMap = {
        pulsa: 'Nomor HP Tujuan',
        data: 'Nomor HP Paket Data',
        game: 'ID Game & Server',
        emoney: 'Nomor HP / Akun E-Wallet',
        pln: 'Nomor Meteran / ID PLN',
        ppob: 'Nomor ID Pelanggan / Kontrak'
    };
    
    const inputLabel = document.getElementById('inputLabel');
    if(inputLabel) inputLabel.innerText = labelMap[cat];
    renderProducts();
}

function renderProducts(itemsToRender = null) {
    const grid = document.getElementById('productsGrid');
    if(!grid) return;
    grid.innerHTML = '';

    const marginInput = document.getElementById('agentMargin');
    const margin = marginInput ? (parseInt(marginInput.value) || 0) : 0;
    const items = itemsToRender || productData[currentCategory] || [];

    if(items.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 2; text-align:center; padding:20px; color:#64748b; font-size:0.85rem;">Produk tidak ditemukan...</div>`;
        return;
    }

    items.forEach(item => {
        const sellPrice = item.costPrice + margin;
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => selectProduct(item, sellPrice);
        card.innerHTML = `
            <span class="tag">${item.tag}</span>
            <div class="product-title">${item.title}</div>
            <div class="product-desc">${item.desc}</div>
            <div class="product-price">Rp ${sellPrice.toLocaleString('id-ID')}</div>
            <div class="product-modal-price">Modal: Rp ${item.costPrice.toLocaleString('id-ID')}</div>
        `;
        grid.appendChild(card);
    });
}

function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if(!query) {
        renderProducts();
        return;
    }
    const currentList = productData[currentCategory] || [];
    const filtered = currentList.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

function detectOperator() {
    const targetInput = document.getElementById('targetInput');
    const badge = document.getElementById('operatorBadge');
    if(!targetInput || !badge) return;

    const input = targetInput.value;
    if (input.startsWith('0812') || input.startsWith('0813') || input.startsWith('0821') || input.startsWith('0852')) {
        badge.innerText = 'TELKOMSEL';
        badge.style.display = 'block';
    } else if (input.startsWith('0857') || input.startsWith('0856') || input.startsWith('0815')) {
        badge.innerText = 'INDOSAT';
        badge.style.display = 'block';
    } else if (input.startsWith('0817') || input.startsWith('0818') || input.startsWith('0859') || input.startsWith('0878')) {
        badge.innerText = 'XL AXIATA';
        badge.style.display = 'block';
    } else if (input.startsWith('0896') || input.startsWith('0895') || input.startsWith('0897')) {
        badge.innerText = 'TRI (3)';
        badge.style.display = 'block';
    } else {
        badge.style.display = 'none';
    }
}

function selectProduct(item, sellPrice) {
    const targetInput = document.getElementById('targetInput');
    const target = targetInput ? targetInput.value.trim() : '';
    
    if(!target) {
        alert('Silakan masukkan nomor HP / ID tujuan terlebih dahulu!');
        if(targetInput) targetInput.focus();
        return;
    }

    selectedProduct = { ...item, sellPrice, target };

    const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' });
    document.getElementById('summaryDate').innerText = today;
    document.getElementById('summaryProductName').innerText = item.title;
    document.getElementById('summaryTarget').innerText = target;
    document.getElementById('summaryTotalPrice').innerText = 'Rp ' + sellPrice.toLocaleString('id-ID');

    const qrisImgElement = document.getElementById('displayQrisImage');
    const qrisWarning = document.getElementById('qrisWarning');

    if(myQrisData) {
        qrisImgElement.src = myQrisData;
        qrisImgElement.style.display = 'inline-block';
        qrisWarning.style.display = 'none';
    } else {
        qrisImgElement.style.display = 'none';
        qrisWarning.style.display = 'block';
    }

    document.getElementById('checkoutModal').style.display = 'flex';
}

function openQrisSettings() {
    document.getElementById('qrisSettingsModal').style.display = 'flex';
}

function saveQrisSettings() {
    const fileInput = document.getElementById('qrisFileInput');
    const urlInputElem = document.getElementById('qrisUrlInput');
    const urlInput = urlInputElem ? urlInputElem.value.trim() : '';

    if (fileInput && fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            myQrisData = e.target.result;
            localStorage.setItem('user_qris_image', myQrisData);
            alert('Foto QRIS berhasil disimpan!');
            closeModal('qrisSettingsModal');
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else if (urlInput !== '') {
        myQrisData = urlInput;
        localStorage.setItem('user_qris_image', myQrisData);
        alert('Link URL QRIS berhasil disimpan!');
        closeModal('qrisSettingsModal');
    } else {
        alert('Silakan upload file foto QRIS atau masukkan link URL QRIS.');
    }
}

function printReceipt() {
    window.print();
}

function shareWhatsApp() {
    if(!selectedProduct) return;
    const text = `*KONFIRMASI PEMBAYARAN PPOB*%0A%0A` +
                 `*Produk:* ${selectedProduct.title}%0A` +
                 `*Tujuan/ID:* ${selectedProduct.target}%0A` +
                 `*Total Pembayaran:* Rp ${selectedProduct.sellPrice.toLocaleString('id-ID')}%0A` +
                 `*Status:* LUNAS (Via QRIS)%0A%0A` +
                 `Mohon segera diproses, terima kasih!`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if(modal) modal.style.display = 'none';
}