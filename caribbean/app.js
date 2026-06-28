// --- Caribbean Juice Bar AR Prototype Logic ---

// 1. Menu Data
const menuData = {
    juices: [
        {
            id: "juice-1",
            name: "Immunity Boost",
            description: "Orange, Carrot, Ginger, & Lemon. Boost your immune system naturally.",
            price: 13.00,
            image: "https://static.wixstatic.com/media/67bd81_0c9a3248e03a4f35bc0143b15ce254d2~mv2.jpeg/v1/fill/w_600,h_450,al_c,q_80,enc_avif,quality_auto/67bd81_0c9a3248e03a4f35bc0143b15ce254d2~mv2.jpeg",
            badges: ["Cold-Pressed", "Best Seller"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "juice-2",
            name: "Papaya Punch",
            description: "Papaya, Pineapple & Lemon. A sweet, tropical refreshment.",
            price: 13.00,
            image: "https://static.wixstatic.com/media/67bd81_3ce34e8d065044d6a412f0f0bb758a1a~mv2.jpeg/v1/fill/w_600,h_450,al_c,q_80,enc_avif,quality_auto/67bd81_3ce34e8d065044d6a412f0f0bb758a1a~mv2.jpeg",
            badges: ["Fresh Juice", "Digestive Aid"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "juice-3",
            name: "Detox Me",
            description: "Apple, Mixed Berries & Lemon. High in antioxidants to help you cleanse.",
            price: 13.00,
            image: "https://static.wixstatic.com/media/67bd81_3ce34e8d065044d6a412f0f0bb758a1a~mv2.jpeg/v1/fill/w_600,h_450,al_c,q_80,enc_avif,quality_auto/67bd81_3ce34e8d065044d6a412f0f0bb758a1a~mv2.jpeg",
            badges: ["Detox", "Antioxidant"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "juice-4",
            name: "Coa Juice",
            description: "Freshly squeezed Carrot, Orange & Apple.",
            price: 13.00,
            image: "https://static.wixstatic.com/media/67bd81_53ccfcc6173f4b8cbdb126ddce590ab6~mv2.jpeg/v1/fill/w_537,h_716,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/67bd81_53ccfcc6173f4b8cbdb126ddce590ab6~mv2.jpeg",
            badges: ["Freshly Squeezed", "Beta-Carotene"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "juice-5",
            name: "Revitalizer",
            description: "Apple, Carrot, Ginger & Lime. Designed for sustained natural energy.",
            price: 13.00,
            image: "https://static.wixstatic.com/media/67bd81_3ce34e8d065044d6a412f0f0bb758a1a~mv2.jpeg/v1/fill/w_600,h_450,al_c,q_80,enc_avif,quality_auto/67bd81_3ce34e8d065044d6a412f0f0bb758a1a~mv2.jpeg",
            badges: ["Energy Boost", "Zesty"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "juice-6",
            name: "Sunshine",
            description: "Watermelon & Pineapple. Rehydrate and refresh under the sun.",
            price: 13.00,
            image: "https://static.wixstatic.com/media/67bd81_3ce34e8d065044d6a412f0f0bb758a1a~mv2.jpeg/v1/fill/w_600,h_450,al_c,q_80,enc_avif,quality_auto/67bd81_3ce34e8d065044d6a412f0f0bb758a1a~mv2.jpeg",
            badges: ["Hydration", "Refreshing"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        }
    ],
    smoothies: [
        {
            id: "smoothie-1",
            name: "Morning Smoothie",
            description: "Banana, Mixed Berries, Coconut Milk, & Oats. A perfect healthy breakfast option.",
            price: 13.00,
            image: "https://static.wixstatic.com/media/67bd81_71e569e912674af697b90a6928c33e28~mv2.jpeg/v1/fill/w_600,h_596,al_c,q_80,enc_avif,quality_auto/67bd81_71e569e912674af697b90a6928c33e28~mv2.jpeg",
            badges: ["Breakfast", "Fiber Rich"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "smoothie-2",
            name: "Pink Smoothie",
            description: "Dragonfruit, Mixed Berries, Pineapple & Banana. Rich in vitamins and vibrant color.",
            price: 13.00,
            image: "https://static.wixstatic.com/media/67bd81_49c372d067c1431f85b340118af824f9~mv2.jpeg/v1/fill/w_600,h_594,al_c,q_80,enc_avif,quality_auto/67bd81_49c372d067c1431f85b340118af824f9~mv2.jpeg",
            badges: ["Vibrant Pink", "Vitamins"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "smoothie-3",
            name: "Green Smoothie",
            description: "Pineapple, Banana, Spinach, Wheatgrass & Lime. A green powerhouse of nutrients.",
            price: 13.00,
            image: "https://static.wixstatic.com/media/67bd81_c908d190cb274627addcae9f3ccef8fb~mv2.jpeg/v1/fill/w_600,h_600,al_c,q_80,enc_avif,quality_auto/67bd81_c908d190cb274627addcae9f3ccef8fb~mv2.jpeg",
            badges: ["Green Cleanser", "Superfood"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "smoothie-4",
            name: "Banana Split",
            description: "Banana, Cacao, Coconut Milk & Chocolate Chips. Naturally sweet, guilt-free treat.",
            price: 13.00,
            image: "https://static.wixstatic.com/media/67bd81_ccb04afcfa3742af910bb8456e3ec2e5~mv2.jpeg/v1/fill/w_600,h_600,al_c,q_80,enc_avif,quality_auto/67bd81_ccb04afcfa3742af910bb8456e3ec2e5~mv2.jpeg",
            badges: ["Decadent", "Vegan Dessert"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "smoothie-5",
            name: "Sunday Smoothie",
            description: "Banana, Mixed Berry, Coconut Milk, & Peanut Butter. Protein-packed and nutty.",
            price: 13.00,
            image: "https://static.wixstatic.com/media/67bd81_ccb04afcfa3742af910bb8456e3ec2e5~mv2.jpeg/v1/fill/w_600,h_600,al_c,q_80,enc_avif,quality_auto/67bd81_ccb04afcfa3742af910bb8456e3ec2e5~mv2.jpeg",
            badges: ["Protein Boost", "Nutty"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "smoothie-6",
            name: "Tropicana",
            description: "Pineapple, Lime, Banana, & Coconut Milk. Transport yourself to tropical paradise.",
            price: 13.00,
            image: "https://static.wixstatic.com/media/67bd81_ccb04afcfa3742af910bb8456e3ec2e5~mv2.jpeg/v1/fill/w_600,h_600,al_c,q_80,enc_avif,quality_auto/67bd81_ccb04afcfa3742af910bb8456e3ec2e5~mv2.jpeg",
            badges: ["Tropical Vibes"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        }
    ],
    bowls: [
        {
            id: "bowl-1",
            name: "Natty Coco Bowl",
            description: "Base: Coconut Milk, Vanilla, Salt & Banana. Toppings: Granola, Rice Puffs, Coconut Flakes & Gula Melaka.",
            price: 16.00,
            image: "https://static.wixstatic.com/media/67bd81_3952fc7553ad494b98c30a746298bfe0~mv2.jpeg/v1/fill/w_504,h_672,al_c,lg_1,q_80,enc_avif,quality_auto/67bd81_3952fc7553ad494b98c30a746298bfe0~mv2.jpeg",
            badges: ["Local Flavour", "Coconut Base"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "bowl-2",
            name: "Purple Paradise Bowl",
            description: "Base: Banana, Dragonfruit, Pineapple, Berries, Coconut Milk & Blue Pea. Toppings: Granola, Banana, Coconut & Flaxseeds.",
            price: 16.00,
            image: "https://static.wixstatic.com/media/67bd81_f405e10df1ed47e0aae6cd2bb5cf7f82~mv2.jpeg/v1/fill/w_591,h_600,al_c,q_80,enc_avif,quality_auto/67bd81_f405e10df1ed47e0aae6cd2bb5cf7f82~mv2.jpeg",
            badges: ["Blue Pea Magic", "Flaxseeds"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "bowl-3",
            name: "Munchies Bowl",
            description: "Base: Banana, Coconut Milk, Cocoa Powder & Salt. Toppings: Granola, Choco Chips, Rice Puff & Peanut Butter.",
            price: 16.00,
            image: "https://static.wixstatic.com/media/67bd81_53ccfcc6173f4b8cbdb126ddce590ab6~mv2.jpeg/v1/fill/w_537,h_716,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/67bd81_53ccfcc6173f4b8cbdb126ddce590ab6~mv2.jpeg",
            badges: ["Rich Cacao", "Peanut Butter"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "bowl-4",
            name: "All Fruits Ripe Bowl",
            description: "Base: Dragonfruit, Berries, Banana & Pineapple. Toppings: Homemade Granola, Chia Seeds, Coconut Flakes & Rice Puffs.",
            price: 16.00,
            image: "https://static.wixstatic.com/media/67bd81_9bcfa867bd594797b561fc8932ca5e3d~mv2.jpeg/v1/fill/w_697,h_522,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/67bd81_9bcfa867bd594797b561fc8932ca5e3d~mv2.jpeg",
            badges: ["Berry-Packed", "Chia Seeds"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "bowl-5",
            name: "Key Lime Pie Bowl",
            description: "Base: Lime, Banana, Coconut Milk, Vanilla & Salt. Toppings: Homemade Granola, Rice Puffs & Coconut Flakes.",
            price: 16.00,
            image: "https://static.wixstatic.com/media/67bd81_5bd6bc121f6f48018e7728158a73f883~mv2.jpeg/v1/fill/w_552,h_600,al_c,q_80,enc_avif,quality_auto/67bd81_5bd6bc121f6f48018e7728158a73f883~mv2.jpeg",
            badges: ["Tangy & Sweet", "Lime Zest"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "bowl-6",
            name: "Acai Bowl",
            description: "Base: Banana, Dragonfruit, Pineapple, Berries & Acai. Toppings: Granola, Banana, Rice Puffs, Coconut & Flaxseeds.",
            price: 16.00,
            image: "https://static.wixstatic.com/media/67bd81_14fe9ca0b7fd4ba3bc046f6d4b76fc43~mv2.jpg/v1/crop/x_114,y_497,w_1635,h_1442/fill/w_601,h_530,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202024-04-07%20at%2020_22_edite.jpg",
            badges: ["Acai Superfood", "Nutrient-Dense"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "bowl-7",
            name: "Pandan Bowl",
            description: "Base: Coconut Milk, Banana, Pandan. Toppings: Homemade Granola, Banana, Coconut Flakes, Rice Puffs & Flax Seeds.",
            price: 16.00,
            image: "https://static.wixstatic.com/media/67bd81_49c372d067c1431f85b340118af824f9~mv2.jpeg/v1/fill/w_600,h_594,al_c,q_80,enc_avif,quality_auto/67bd81_49c372d067c1431f85b340118af824f9~mv2.jpeg",
            badges: ["Pandan Aroma", "Local Classic"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        }
    ],
    snacks: [
        {
            id: "snack-1",
            name: "Loaded Papaya",
            description: "Half Papaya stuffed with Homemade Granola, Coconut Milk, Goji Berries, Flaxseeds, Chia Seeds & Lemon.",
            price: 16.00,
            image: "https://static.wixstatic.com/media/67bd81_10a28ef419344f81b14f6be562a22593~mv2.jpeg/v1/fill/w_540,h_720,al_c,lg_1,q_85,enc_avif,quality_auto/67bd81_10a28ef419344f81b14f6be562a22593~mv2.jpeg",
            badges: ["Superfood Bite", "Raw Vegan"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "snack-2",
            name: "Sourdough Spread",
            description: "Toasted Sourdough with Homemade Vegan Pink Beetroot Hummus & Veggie Sticks.",
            price: 16.00,
            image: "https://static.wixstatic.com/media/67bd81_c00deb45fcac4d77adf22d5c8f6ab98c~mv2.jpeg/v1/fill/w_517,h_690,al_c,lg_1,q_80,enc_avif,quality_auto/67bd81_c00deb45fcac4d77adf22d5c8f6ab98c~mv2.jpeg",
            badges: ["Savory Vegan", "Fresh Baked"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "snack-3",
            name: "Vegan Cake",
            description: "Ask our staff about our current selection of delicious, raw vegan cheesecakes.",
            price: 17.00,
            image: "https://static.wixstatic.com/media/67bd81_2de8db576bdd4c51b2ec5af4b5066bdb~mv2.jpeg/v1/fill/w_529,h_705,al_c,lg_1,q_85,enc_avif,quality_auto/67bd81_2de8db576bdd4c51b2ec5af4b5066bdb~mv2.jpeg",
            badges: ["Gluten-Free", "Raw Cheesecakes"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        },
        {
            id: "snack-4",
            name: "Fresh Fruit Bowl",
            description: "Freshly cut variety of seasonal tropical fruits.",
            price: 13.00,
            image: "https://static.wixstatic.com/media/67bd81_fc63d45493f24a85b468d53a8b048a5e~mv2.jpg/v1/fill/w_570,h_536,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/67bd81_fc63d45493f24a85b468d53a8b048a5e~mv2.jpg",
            badges: ["Seasonal Mix", "Hydrating Snack"],
            kivicubeId: "uqdAQAKvWo39yF53kwd18NN6gLc6DaKN",
            kivicubeType: "scene"
        }
    ]
};

// 2. Application State
let cart = [];
let currentCategory = 'juices';

// 3. DOM Elements
const menuGrid = document.getElementById('menuGrid');
const tabButtons = document.querySelectorAll('.tab-btn');
const themeToggleBtn = document.getElementById('themeToggle');
const cartToggleBtn = document.getElementById('cartToggle');
const closeCartBtn = document.getElementById('closeCartDrawer');
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartBadge = document.getElementById('cartBadge');
const cartSubtotalEl = document.getElementById('cartSubtotal');
const cartTaxEl = document.getElementById('cartTax');
const cartTotalEl = document.getElementById('cartTotal');
const btnCheckout = document.getElementById('btnCheckout');
const mainHeader = document.getElementById('mainHeader');

// AR Elements
const arDrawer = document.getElementById('arDrawer');
const closeArBtn = document.getElementById('closeArDrawer');
const arItemName = document.getElementById('arItemName');
const kivicubeViewer = document.getElementById('kivicubeViewer');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const sceneIdInput = document.getElementById('sceneIdInput');
const collectionIdInput = document.getElementById('collectionIdInput');
const btnApplyScene = document.getElementById('btnApplyScene');
const btnApplyCollection = document.getElementById('btnApplyCollection');
const tableSelect = document.getElementById('tableSelect');

// 4. Render Menu Items
function renderMenu() {
    menuGrid.innerHTML = '';
    const items = menuData[currentCategory];
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        
        const badgesHtml = item.badges.map(badge => `<span class="badge">${badge}</span>`).join('');
        
        card.innerHTML = `
            <div class="menu-card-img-wrapper">
                <img src="${item.image}" alt="${item.name}" class="menu-card-img">
                <div class="menu-badges">${badgesHtml}</div>
            </div>
            <div class="menu-card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-card-footer">
                    <span class="price">RM ${item.price.toFixed(2)}</span>
                    <div class="menu-card-actions">
                        <button class="btn-ar" onclick="openAR('${item.name}', '${item.kivicubeId}', '${item.kivicubeType}')" title="View in AR/3D">
                            <i class="fa-solid fa-cube"></i>
                        </button>
                        <button class="btn-add-cart" onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}')" title="Add to Order">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// 5. Category Switching
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.getAttribute('data-category');
        renderMenu();
    });
});

// 6. Cart Logic
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    updateCartUI();
    
    // Tiny animation on cart icon
    cartToggleBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartToggleBtn.style.transform = 'scale(1)';
    }, 200);
}

function updateCartQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    // Badge count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <div class="empty-cart-icon"><i class="fa-solid fa-basket-shopping"></i></div>
                <p>Your order is empty.</p>
                <p style="font-size: 13px; margin-top: 8px;">Select a few items from the menu to start!</p>
            </div>
        `;
        cartSubtotalEl.textContent = 'RM 0.00';
        cartTaxEl.textContent = 'RM 0.00';
        cartTotalEl.textContent = 'RM 0.00';
        btnCheckout.disabled = true;
        btnCheckout.style.opacity = '0.5';
        return;
    }
    
    btnCheckout.disabled = false;
    btnCheckout.style.opacity = '1';
    
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">RM ${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="btn-qty" onclick="updateCartQuantity('${item.id}', -1)">-</button>
                <span style="font-weight: 600;">${item.quantity}</span>
                <button class="btn-qty" onclick="updateCartQuantity('${item.id}', 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });
    
    const tax = subtotal * 0.06; // 6% Service Tax
    const total = subtotal + tax;
    
    cartSubtotalEl.textContent = `RM ${subtotal.toFixed(2)}`;
    cartTaxEl.textContent = `RM ${tax.toFixed(2)}`;
    cartTotalEl.textContent = `RM ${total.toFixed(2)}`;
}

// 7. AR Viewer Iframe Management
function openAR(name, id, type) {
    arItemName.textContent = name;
    arDrawer.classList.add('open');
    
    // Set inputs for presenter convenience
    if (type === 'collection') {
        collectionIdInput.value = id;
        sceneIdInput.value = '';
    } else {
        sceneIdInput.value = id;
        collectionIdInput.value = '';
    }
    
    loadKivicube(type, id);
}

function loadKivicube(type, id) {
    let url = '';
    if (type === 'collection') {
        url = `https://www.kivicube.com/collections/${id}`;
    } else {
        url = `https://www.kivicube.com/scenes/${id}`;
    }
    
    updateStatus('loading', `Loading ${type}...`);
    kivicubeViewer.src = url;
}

function updateStatus(state, message) {
    if (statusDot && statusText) {
        statusDot.className = 'status-dot';
        statusText.textContent = message;
        
        if (state === 'ready') {
            statusDot.classList.add('active');
        } else if (state === 'error') {
            statusDot.classList.add('error');
        }
    }
}

// Listen to Iframe Load
kivicubeViewer.addEventListener('load', () => {
    updateStatus('ready', 'Kivicube Interactive Ready');
});

// Presenter Controls
btnApplyScene.addEventListener('click', () => {
    const id = sceneIdInput.value.trim();
    if (id) {
        loadKivicube('scene', id);
    } else {
        alert('Please enter a valid Kivicube Scene ID');
    }
});

btnApplyCollection.addEventListener('click', () => {
    const id = collectionIdInput.value.trim();
    if (id) {
        loadKivicube('collection', id);
    } else {
        alert('Please enter a valid Kivicube Collection ID');
    }
});

// 8. Event Listeners for Toggles/Drawers
cartToggleBtn.addEventListener('click', () => {
    cartDrawer.classList.add('open');
});

closeCartBtn.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
});

closeArBtn.addEventListener('click', () => {
    arDrawer.classList.remove('open');
    kivicubeViewer.src = ''; // Stop camera and audio
    updateStatus('idle', 'Viewer Idle');
});

// Dark/Light Theme Toggle
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    
    const icon = themeToggleBtn.querySelector('i');
    if (newTheme === 'dark') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
});

// Scroll Header effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainHeader.classList.add('scrolled');
    } else {
        mainHeader.classList.remove('scrolled');
    }
});

// Checkout Simulation
btnCheckout.addEventListener('click', () => {
    const table = tableSelect.value;
    alert(`Order Confirmed! (Prototype Demo Only)\n\nYour order has been simulated for Table ${table}.\n\nNote: This is a prototype demonstration. In a live system, this would transmit the order directly to the kitchen and sync with the table's AR interactive system.`);
    cart = [];
    updateCartUI();
    cartDrawer.classList.remove('open');
});

// Toggle Presenter Control Deck
const controlDeckTrigger = document.getElementById('controlDeckTrigger');
if (controlDeckTrigger) {
    controlDeckTrigger.addEventListener('click', () => {
        const deck = controlDeckTrigger.closest('.control-deck');
        if (deck) {
            deck.classList.toggle('open');
        }
    });
}

// 9. Initial Render
document.addEventListener('DOMContentLoaded', () => {
    // Detect system dark mode preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.setAttribute('data-theme', 'dark');
        const icon = themeToggleBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-sun';
    }

    renderMenu();
    updateCartUI();
});

