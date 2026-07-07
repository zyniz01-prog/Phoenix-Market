

let products = [
  {
    id: "laptop",
    name: "Laptop Kerja Slim",
    category: "Gadget",
    price: 15500000,
    image: "images/Laptop Slim.jpeg",
    description: "Laptop slim dengan desain ringan, performa cepat, dan layar jernih untuk belajar, bekerja, serta aktivitas produktif sehari-hari."
  },
  {
    id: "iphone",
    name: "Iphone 17 Pro Max",
    category: "Gadget",
    price: 50000000,
    image: "images/Iphone-17-Pro-Max.jpeg",
    description: "Smartphone premium dengan desain modern, kamera tajam, performa tinggi, dan kapasitas besar untuk komunikasi, hiburan, serta kebutuhan profesional."
  },
  {
    id: "headphone",
    name: "Headphone Wireless",
    category: "Aksesoris",
    price: 750000,
    image: "images/Headphone-Wireless.jpg",
    description: "Headphone wireless nyaman dipakai dengan kualitas suara jernih, cocok untuk mendengarkan musik, meeting online, gaming, dan menonton film."
  },
  {
    id: "earphone",
    name: "Earphone Wireless",
    category: "Aksesoris",
    price: 800000,
    image: "images/EarPhone.jpeg",
    description: "Earphone wireless praktis dengan case pengisi daya, suara stabil, dan desain ringkas untuk aktivitas harian di rumah maupun perjalanan."
  },
  {
    id: "jam",
    name: "Jam Tangan Analog",
    category: "Aksesoris",
    price: 1200000,
    image: "images/JT-Analog.jpeg",
    description: "Jam tangan analog bergaya elegan dengan tampilan klasik, cocok digunakan untuk kegiatan formal, kasual, sekolah, maupun bekerja."
  },
  {
    id: "dslr",
    name: "Kamera DSLR Pro",
    category: "Elektronik",
    price: 5000000,
    image: "images/DSLR.jpg",
    description: "Kamera DSLR berkualitas tinggi untuk fotografi produk, dokumentasi acara, konten kreatif, dan menghasilkan gambar yang tajam."
  },
  {
    id: "mouse",
    name: "Mouse Gaming RGB",
    category: "Elektronik",
    price: 450000,
    image: "images/Mouse-RGB.jpeg",
    description: "Mouse gaming RGB dengan desain ergonomis, respons cepat, dan tampilan lampu menarik untuk pengalaman bermain game yang lebih nyaman."
  },
  {
    id: "tv",
    name: "Smart TV",
    category: "Elektronik",
    price: 4000000,
    image: "images/Smart TV.jpeg",
    description: "Smart TV layar lebar dengan tampilan warna tajam, cocok untuk menonton film, streaming, presentasi, dan hiburan keluarga."
  },
  {
    id: "lampu",
    name: "Lampu Meja Antik",
    category: "Elektronik",
    price: 8000000,
    image: "images/Lampu meja.jpeg",
    description: "Lampu meja antik dengan desain premium dan cahaya nyaman, cocok untuk ruang belajar, meja kerja, kamar, atau dekorasi ruangan."
  },
  {
    id: "ac",
    name: "AC Premium",
    category: "Elektronik",
    price: 5000000,
    image: "images/AC Premium.jpeg",
    description: "AC premium dengan pendinginan cepat, hemat energi, dan cocok digunakan untuk kamar tidur, ruang kerja, maupun ruang keluarga."
  },
  {
    id: "kulkas",
    name: "Kulkas dua pintu",
    category: "Elektronik",
    price: 10000000,
    image: "images/Kulkas Dua Pintu.jpeg",
    description: "Kulkas dua pintu dengan kapasitas luas, desain modern, dan ruang penyimpanan rapi untuk kebutuhan makanan serta minuman keluarga."
  },
  {
    id: "ipad",
    name: "Apple iPad Pro",
    category: "Gadget",
    price: 18000000,
    image: "images/Apple iPad Pro.jpeg",
    description: "Tablet premium dengan layar luas, performa cepat, dan desain elegan untuk belajar, menggambar, bekerja, menonton, serta produktivitas kreatif."
  }
];

const cartKey = "phoenix-cart";
const orderKey = "phoenix-orders";

function getAdminProducts() {
  return JSON.parse(localStorage.getItem("phoenix-admin-products") || "[]");
}

function saveAdminProducts(data) {
  localStorage.setItem("phoenix-admin-products", JSON.stringify(data));
}

products = products.concat(getAdminProducts());

function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}

function getCart() {
  return JSON.parse(localStorage.getItem(cartKey) || "{}");
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartBadge();
}

function getOrders() {
  return JSON.parse(localStorage.getItem(orderKey) || "[]");
}

function saveOrders(orders) {
  localStorage.setItem(orderKey, JSON.stringify(orders));
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;

  const cart = getCart();
  const totalQty = Object.values(cart).reduce((sum, qty) => sum + Number(qty), 0);

  badge.textContent = totalQty;
  badge.hidden = totalQty === 0;
}

function addToCart(id) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
  alert("Produk berhasil masuk keranjang!");
}

function renderProducts(list = products) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = list.map(product => {

    return `
    <article class="card">
      <a href="#" onclick="showDetail('${product.id}')">
        <img src="${product.image}" alt="${product.name}">
      </a>

      <small>${product.category}</small>
      <h3>${product.name}</h3>
      <p>${rupiah(product.price)}</p>
      <button class="btn-detail" type="button" onclick="showDetail('${product.id}')">
      Detail Produk
      </button>

      <button class="btn-buy" onclick="addToCart('${product.id}')">
        Tambah ke Keranjang
      </button>

    </article>
  `;
  }).join("");
}

function showDetail(id) {
  const product = products.find(item => item.id === id);
  const modal = document.getElementById("productModal");

  if (!product || !modal) return;

  setText("modalCategory", product.category);
  setText("modalName", product.name);
  setText("modalPrice", rupiah(product.price));
  setText(
    "modalDescription",
    product.description || "Produk pilihan Phoenix Market dengan kualitas terbaik."
  );

  const image = document.getElementById("modalImage");
  if (image) {
    image.src = product.image;
    image.alt = product.name;
  }

  const addButton = document.getElementById("modalAddCart");
  if (addButton) {
    addButton.onclick = function () {
      addToCart(product.id);
    };
  }

  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeDetail() {
  const modal = document.getElementById("productModal");
  if (!modal) return;

  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeDetail();
});

function filterProducts() {
  const search = document.getElementById("searchProduct")?.value.toLowerCase() || "";
  const category = document.getElementById("categoryFilter")?.value || "Semua";
  const price = document.getElementById("priceFilter")?.value || "Semua";

  const filtered = products.filter(product => {
    const cocokNama = product.name.toLowerCase().includes(search);
    const cocokKategori = category === "Semua" || product.category === category;

    const cocokHarga =
      price === "Semua" ||
      (price === "Murah" && product.price < 1000000) ||
      (price === "Menengah" && product.price >= 1000000 && product.price <= 7000000) ||
      (price === "Premium" && product.price > 7000000);

    return cocokNama && cocokKategori && cocokHarga;
  });

  renderProducts(filtered);

  const empty = document.getElementById("emptyProduct");
  if (empty) empty.hidden = filtered.length > 0;
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  const cart = getCart();
  const ids = Object.keys(cart);

  let subtotal = 0;

  cartItems.innerHTML = ids.length ? ids.map(id => {
    const product = products.find(item => item.id === id);
    if (!product) return "";
    const qty = cart[id];
    const total = product.price * qty;
    subtotal += total;

    return `
      <article class="cart-item-card">
        <img class="cart-item-image" src="${product.image}" alt="${product.name}">

        <div class="cart-item-info">
          <h3>${product.name}</h3>
          <small>${product.category}</small>
          <p class="cart-item-price">${rupiah(product.price)}</p>

          <div class="qty-area">
            <button type="button" class="qty-btn" onclick="updateQty('${id}', ${qty - 1})">-</button>
            <span class="qty-number">${qty}</span>
            <button type="button" class="qty-btn" onclick="updateQty('${id}', ${qty + 1})">+</button>
          </div>
        </div>

        <div class="cart-item-action">
          <span class="item-total">${rupiah(total)}</span>
          <button class="cart-remove-btn" type="button" onclick="removeItem('${id}')">Hapus</button>
        </div>
      </article>
    `;
  }).join("") : `
    <article class="cart-empty-card">
      <h3>Keranjang masih kosong</h3>
      <p>Silakan pilih produk dulu.</p>
      <a class="btn-link" href="IT-II-ZynXiz-Produk.html">Belanja Produk</a>
    </article>
  `;

  const admin = subtotal > 0 ? 10000 : 0;
  const diskon = subtotal >= 5000000 ? subtotal * 0.05 : 0;
  const total = subtotal + admin - diskon;

  setText("cartSubtotal", rupiah(subtotal));
  setText("cartAdmin", rupiah(admin));
  setText("cartDiscount", "-" + rupiah(diskon));
  setText("cartTotal", rupiah(total));
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function updateQty(id, qty) {
  const cart = getCart();
  const newQty = Number(qty);

  if (newQty <= 0) {
    delete cart[id];
  } else {
    cart[id] = newQty;
  }

  saveCart(cart);
  renderCart();
}

function removeItem(id) {
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
  renderCart();
}

const checkoutForm = document.getElementById("checkoutForm");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const cart = getCart();
    const message = document.getElementById("checkoutMessage");

    if (Object.keys(cart).length === 0) {
      message.textContent = "Keranjang masih kosong.";
      return;
    }

    if (!checkoutForm.checkValidity()) {
      message.textContent = "Lengkapi semua data checkout.";
      checkoutForm.reportValidity();
      return;
    }

    const order = createOrder(cart);
    saveOrders([order, ...getOrders()]);

    closeCheckoutModal();
    showSuccessModal(order.id);
    localStorage.removeItem(cartKey);
    checkoutForm.reset();
    renderCart();
  });
}

function createOrder(cart) {
  const items = Object.keys(cart).map(id => {
    const product = products.find(item => item.id === id);
    if (!product) return null;

    const qty = Number(cart[id]);
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      qty,
      total: product.price * qty
    };
  }).filter(Boolean);

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const admin = subtotal > 0 ? 10000 : 0;
  const discount = subtotal >= 5000000 ? subtotal * 0.05 : 0;
  const total = subtotal + admin - discount;
  const payment = document.querySelector("input[name='payment']:checked")?.value || "Belum dipilih";
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  return {
    id: "#PM" + randomNumber,
    buyer: document.getElementById("nama")?.value.trim() || "Pelanggan",
    phone: document.getElementById("telepon")?.value.trim() || "-",
    city: document.getElementById("kota")?.value.trim() || "-",
    address: document.getElementById("alamat")?.value.trim() || "-",
    payment,
    subtotal,
    admin,
    discount,
    total,
    status: "Menunggu Pembayaran",
    items,
    createdAt: new Date().toISOString()
  };
}

function showSuccessModal(orderId) {
  const modal = document.getElementById("successModal");
  const orderNumber = document.getElementById("orderNumber");

  orderNumber.textContent = orderId || "#PM000000";

  modal.classList.add("show");
}

function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  modal.classList.remove("show");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  renderAdminProductList();

  document.getElementById("searchProduct")?.addEventListener("input", filterProducts);
  document.getElementById("categoryFilter")?.addEventListener("change", filterProducts);
  document.getElementById("priceFilter")?.addEventListener("change", filterProducts);

  document.getElementById("resetFilter")?.addEventListener("click", () => {
    document.getElementById("searchProduct").value = "";
    document.getElementById("categoryFilter").value = "Semua";
    document.getElementById("priceFilter").value = "Semua";
    filterProducts();
  });
});

document.addEventListener("click", function (event) {
  const productId = event.target.dataset.add;

  if (productId) {
    addToCart(productId);
  }
});

const adminForm = document.getElementById("adminProductForm");

const imageInput = document.getElementById("adminProductImage");

if (imageInput) {

  imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

      document.getElementById("previewImage").src = e.target.result;

    };

    reader.readAsDataURL(file);

  });

}

if (adminForm) {
  adminForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("adminProductName").value;
    const price = Number(document.getElementById("adminProductPrice").value);
    const category = document.getElementById("adminProductCategory").value;

    const imageFile = document.getElementById("adminProductImage").files[0];

    const description =
      document.getElementById("adminProductDescription").value;

    const reader = new FileReader();

    reader.onload = function (e) {

      const image = imageFile
        ? e.target.result
        : "images/pngegg.png";

      const newProduct = {

        id: name.toLowerCase().replaceAll(" ", "-"),

        name,

        category,

        price,

        image,

        description,

        isAdmin: true

      };

      const adminProducts = getAdminProducts();

      adminProducts.push(newProduct);

      saveAdminProducts(adminProducts);

      products.push(newProduct);

      renderProducts();

      renderAdminProductList();

      renderAdminDashboard();

      alert("Produk berhasil ditambahkan!");

      adminForm.reset();

      document.getElementById("previewImage").src = "images/pngegg.png";

    };

    if (imageFile) {

      reader.readAsDataURL(imageFile);

    } else {

      reader.onload({ target: { result: "images/pngegg.png" } });

    }
  });
}

function deleteAdminProduct(id) {
  const yakin = confirm("Yakin ingin menghapus produk ini?");
  if (!yakin) return;

  let adminProducts = getAdminProducts();
  adminProducts = adminProducts.filter(product => product.id !== id);

  saveAdminProducts(adminProducts);

  products = products.filter(product => product.id !== id);

  renderProducts();
  renderAdminProductList();
  renderAdminDashboard();

  alert("Produk berhasil dihapus.");
}

function renderAdminProductList() {
  const list = document.getElementById("adminProductList");
  if (!list) return;

  const adminProducts = getAdminProducts();

  if (adminProducts.length === 0) {
    list.innerHTML = "<p>Belum ada produk tambahan dari admin.</p>";
    return;
  }

  list.innerHTML = adminProducts.map(product => `
    <div class="admin-product-row">
      <div>
        <strong>${product.name}</strong>
        <p>${product.category} - ${rupiah(product.price)}</p>
      </div>

      <button class="btn-b" type="button" onclick="deleteAdminProduct('${product.id}')">
        Hapus
      </button>
    </div>
  `).join("");
}

const orderStatuses = ["Menunggu Pembayaran", "Diproses", "Dikirim", "Selesai"];

function updateOrderStatus(orderId) {
  const orders = getOrders().map(order => {
    if (order.id !== orderId) return order;

    const currentIndex = orderStatuses.indexOf(order.status);
    const nextStatus = orderStatuses[(currentIndex + 1) % orderStatuses.length];

    return { ...order, status: nextStatus };
  });

  saveOrders(orders);
  renderAdminDashboard();
}

function renderAdminOrderList() {
  const list = document.getElementById("adminOrderList");
  if (!list) return;

  const orders = getOrders();

  if (orders.length === 0) {
    list.innerHTML = "<p>Belum ada pesanan masuk.</p>";
    return;
  }

  list.innerHTML = orders.map(order => {
    const itemCount = order.items?.reduce((sum, item) => sum + Number(item.qty), 0) || 0;

    return `
      <div class="order-row" data-order>
        <p><strong>${order.id}</strong> - ${order.buyer}</p>
        <small>${order.payment}</small>
        <p>Kota: ${order.city} | Item: ${itemCount}</p>
        <p>Total: <strong>${rupiah(order.total)}</strong></p>
        <p>Status: <span data-status>${order.status}</span></p>
        <button class="btn-buy" type="button" onclick="updateOrderStatus('${order.id}')">Update Status</button>
      </div>
    `;
  }).join("");
}

function renderAdminDashboard() {
  setText("adminProductCount", products.length + " Produk");

  const orders = getOrders();
  setText("adminOrderCount", orders.length + " Pesanan");

  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

  setText("adminRevenue", rupiah(revenue));
  renderAdminOrderList();
}

document.addEventListener("DOMContentLoaded", function () {
  renderAdminDashboard();
  updateCartBadge();
});

function openCheckoutModal() {
  const cart = getCart();

  if (Object.keys(cart).length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  const subtotal = document.getElementById("cartSubtotal").textContent;
  const admin = document.getElementById("cartAdmin").textContent;
  const discount = document.getElementById("cartDiscount").textContent;
  const total = document.getElementById("cartTotal").textContent;

  document.getElementById("modalSubtotal").textContent = subtotal;
  document.getElementById("modalAdmin").textContent = admin;
  document.getElementById("modalDiscount").textContent = discount;
  document.getElementById("modalTotal").textContent = total;

  document.getElementById("checkoutModal").classList.add("show");
}

function closeCheckoutModal() {
  document.getElementById("checkoutModal").classList.remove("show");
}
