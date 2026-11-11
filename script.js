// Database Produk Agen PPOB Lengkap
const productData = {
    pulsa: [
        { id: 'p5', title: 'Pulsa Telkomsel 5.000', desc: 'Masa aktif +7 hari', costPrice: 5150, tag: 'Grosir' },
        { id: 'p10', title: 'Pulsa Telkomsel 10.000', desc: 'Masa aktif +15 hari', costPrice: 10150, tag: 'Laris' },
        { id: 'p20', title: 'Pulsa Telkomsel 20.000', desc: 'Masa aktif +30 hari', costPrice: 20050, tag: 'Promo' },
        { id: 'p25', title: 'Pulsa Indosat 25.000', desc: 'Masa aktif +30 hari', costPrice: 24900, tag: 'Murah' },
        { id: 'p50', title: 'Pulsa XL 50.000', desc: 'Masa aktif +45 hari', costPrice: 49500, tag: 'Grosir' },
        { id: 'p100', title: 'Pulsa Tri 100.000', desc: 'Masa aktif +60 hari', costPrice: 98500, tag: 'Hemat' }
    ],
    data: [
        { id: 'd1', title: 'Data 1.5 GB / 3 Hari', desc: 'Full 24 Jam All Jaringan', costPrice: 8500, tag: 'Hemat' },
        { id: 'd2', title: 'Data 3 GB / 7 Hari', desc: 'Full 24 Jam All Jaringan', costPrice: 14500, tag: 'Laris' },
        { id: 'd3', title: 'Data 10 GB / 30 Hari', desc: 'Kuota Utama Nasional', costPrice: 35000, tag: 'Super' },
        { id: 'd4', title: 'Data 25 GB / 30 Hari', desc: 'Full 24 Jam + Youtube', costPrice: 62000, tag: 'Best' }
    ],
    game: [
        { id: 'ml86', title: '86 Diamonds MLBB', desc: 'Proses Instan VIA User ID', costPrice: 19500, tag: 'Laris' },
        { id: 'ml172', title: '172 Diamonds MLBB', desc: 'Proses Instan VIA User ID', costPrice: 38000, tag: 'Promo' },
        { id: 'ff140', title: '140 Diamonds Free Fire', desc: 'Proses Fast via User ID', costPrice: 18500, tag: 'Grosir' },
        { id: 'ff355', title: '355 Diamonds Free Fire', desc: 'Proses Fast via User ID', costPrice: 46000, tag: 'Popular' },
        { id: 'pubg60', title: '60 UC PUBG Mobile', desc: 'Direct Top Up Player ID', costPrice: 14000, tag: 'Cheap' }
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
    tagihan: [
        { id: 'indihome', title: 'Tagihan IndiHome / Wi-Fi', desc: 'Cek & Bayar Bulanan', costPrice: 2500, tag: 'PPOB' },
        { id: 'bpjs', title: 'BPJS Kesehatan', desc: 'Iuran Keluarga', costPrice: 2500, tag: 'Resmi' },
        { id: 'pdam', title: 'Tagihan Air PDAM', desc: 'PDAM Daerah Kota/Kab', costPrice: 2500, tag: 'Cepat' }
    ]
};

let currentCategory = 'pulsa';
let selectedProduct = null;
let agentSaldo = parseInt(localStorage.getItem('agent_saldo')) || 250000;
let myQrisData = localStorage.getItem('user_qris_image') || '';
let transactionHistory = JSON.parse(localStorage.getItem('tx_history')) || [];

window.onload = function() {
    updateSaldoDisplay();
    renderProducts();
    if(myQrisData) {
        document.getElementById('qrisPreviewImg').src = myQrisData;
        document.getElementById('qrisPreviewImg').style.display = 'block';
    }
};

function updateSaldoDisplay() {
    document.getElementById('agentSaldoText').innerText = 'Rp ' + agentSaldo.toLocaleString('id-ID');
    localStorage.setItem('agent_saldo', agentSaldo);
}

function switchCategory(cat, btnElement) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    const labelMap = {
        pulsa: 'Nomor HP Tujuan Pelanggan',
        data: 'Nomor HP Paket Data',
        game: 'ID Game & Server ID',
        emoney: 'Nomor HP / Akun E-Wallet',
        pln: 'Nomor Meteran / ID Pelanggan PLN',
        tagihan: 'Nomor ID Pelanggan / Kontrak'
    };
    document.getElementById('inputLabel').innerText = labelMap[cat];
    renderProducts();
}

function renderProducts(customItems = null) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    const margin = parseInt(document.getElementById('agentMargin').value) || 0;
    const items = customItems || productData[currentCategory] || [];

    document.getElementById('productCountLabel').innerText = `${items.length} produk tersedia`;

    if(items.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 2; text-align:center; padding:20px; color:var(--muted); font-size:0.8rem;">Produk tidak ditemukan</div>`;
        return;
    }

    items.forEach(item => {
        const sellPrice = item.costPrice + margin;
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => selectProduct(item, sellPrice);
        card.innerHTML = `
            <span class="tag">${item.tag}</span>
            <div class="prod-title">${item.title}</div>
            <div class="prod-desc">${item.desc}</div>
            <div class="prod-price">Rp ${sellPrice.toLocaleString('id-ID')}</div>
            <div class="prod-modal">Modal: Rp ${item.costPrice.toLocaleString('id-ID')}</div>
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
        item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

function detectOperator() {
    const val = document.getElementById('targetInput').value;
    const badge = document.getElementById('operatorBadge');
    if(val.startsWith('0812') || val.startsWith('0813') || val.startsWith('0821')) {
        badge.innerText = 'TELKOMSEL'; badge.style.display = 'block';
    } else if(val.startsWith('0857') || val.startsWith('0856')) {
        badge.innerText = 'INDOSAT'; badge.style.display = 'block';
    } else if(val.startsWith('0878') || val.startsWith('0859')) {
        badge.innerText = 'XL'; badge.style.display = 'block';
    } else if(val.startsWith('0896') || val.startsWith('0895')) {
        badge.innerText = 'TRI'; badge.style.display = 'block';
    } else {
        badge.style.display = 'none';
    }
}

function selectProduct(item, sellPrice) {
    const target = document.getElementById('targetInput').value.trim();
    if(!target) {
        alert('Harap masukkan nomor HP atau ID tujuan terlebih dahulu!');
        document.getElementById('targetInput').focus();
        return;
    }

    selectedProduct = { ...item, sellPrice, target };

    const dateStr = new Date().toLocaleString('id-ID');
    document.getElementById('sumDate').innerText = dateStr;
    document.getElementById('sumProduct').innerText = item.title;
    document.getElementById('sumTarget').innerText = target;
    document.getElementById('sumPrice').innerText = 'Rp ' + sellPrice.toLocaleString('id-ID');

    const qrisImg = document.getElementById('displayQrisImage');
    const warning = document.getElementById('qrisWarning');
    if(myQrisData) {
        qrisImg.src = myQrisData;
        qrisImg.style.display = 'inline-block';
        warning.style.display = 'none';
    } else {
        qrisImg.style.display = 'none';
        warning.style.display = 'block';
    }

    openModal('checkoutModal');
}

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
    if(id === 'historyModal') renderHistory();
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function saveQrisSettings() {
    const fileInput = document.getElementById('qrisFileInput');
    const urlInput = document.getElementById('qrisUrlInput').value.trim();

    if(fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            myQrisData = e.target.result;
            localStorage.setItem('user_qris_image', myQrisData);
            alert('QRIS berhasil disimpan!');
            closeModal('qrisSettingsModal');
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else if(urlInput) {
        myQrisData = urlInput;
        localStorage.setItem('user_qris_image', myQrisData);
        alert('URL QRIS berhasil disimpan!');
        closeModal('qrisSettingsModal');
    } else {
        alert('Pilih file atau masukkan link QRIS.');
    }
}

function processDeposit() {
    const amount = parseInt(document.getElementById('depositAmountInput').value) || 0;
    if(amount <= 0) return alert('Masukkan nominal yang valid');
    agentSaldo += amount;
    updateSaldoDisplay();
    alert('Top up saldo berhasil! Saldo bertambah Rp ' + amount.toLocaleString('id-ID'));
    closeModal('depositModal');
}

function processTransactionWhatsApp() {
    if(!selectedProduct) return;
    if(agentSaldo < selectedProduct.sellPrice) {
        alert('Saldo deposit Anda tidak mencukupi! Silakan lakukan top up saldo terlebih dahulu.');
        return;
    }

    // Potong saldo
    agentSaldo -= selectedProduct.sellPrice;
    updateSaldoDisplay();

    // Simpan history
    const tx = {
        title: selectedProduct.title,
        target: selectedProduct.target,
        price: selectedProduct.sellPrice,
        date: new Date().toLocaleString('id-ID')
    };
    transactionHistory.unshift(tx);
    localStorage.setItem('tx_history', JSON.stringify(transactionHistory));

    const text = `*TRANSAKSI PPOB / GAME SUKSES*%0A%0A` +
                 `*Produk:* ${selectedProduct.title}%0A` +
                 `*Tujuan:* ${selectedProduct.target}%0A` +
                 `*Harga:* Rp ${selectedProduct.sellPrice.toLocaleString('id-ID')}%0A` +
                 `*Status:* Lunas via QRIS%0A%0A` +
                 `Terima kasih telah bertransaksi di toko kami!`;

    window.open(`https://wa.me/?text=${text}`, '_blank');
    closeModal('checkoutModal');
}

function renderHistory() {
    const container = document.getElementById('historyListContainer');
    container.innerHTML = '';
    if(transactionHistory.length === 0) {
        container.innerHTML = `<p class="muted" style="text-align:center; font-size:0.8rem; padding:15px;">Belum ada riwayat transaksi.</p>`;
        return;
    }
    transactionHistory.forEach(tx => {
        container.innerHTML += `
            <div style="border-bottom:1px solid var(--border); padding:8px 0; font-size:0.75rem;">
                <div style="display:flex; justify-content:space-between; font-weight:700;">
                    <span>${tx.title}</span>
                    <span style="color:var(--primary);">Rp ${tx.price.toLocaleString('id-ID')}</span>
                </div>
                <div class="muted">Tujuan: ${tx.target} | ${tx.date}</div>
            </div>
        `;
    });
}

function clearHistory() {
    if(confirm('Hapus seluruh riwayat transaksi?')) {
        transactionHistory = [];
        localStorage.removeItem('tx_history');
        renderHistory();
    }
}

function printReceipt() {
    window.print();
}
