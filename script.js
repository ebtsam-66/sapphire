// --- 1. NAVIGATION SYSTEM (Tabs) ---
function showPage(pageName) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the specific section
    const targetPage = document.getElementById('page-' + pageName);
    if(targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0); // Scroll to top
    }
}

// --- 2. CART SYSTEM ---
// 1. لما الصفحة تحمل، نجيب البيانات من الذاكرة (لو موجودة)
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// 2. دالة التحديث للرقم اللي فوق
function updateCartIcon() {
    let count = 0;
    cart.forEach(item => count += item.quantity);
    
    // نتأكد إن العنصر موجود
    let countElement = document.getElementById('cart-count');
    if(countElement) {
        countElement.innerText = "(" + count + ")";
    }
}

// 3. دالة الإضافة للسلة (تم تعديلها عشان تحفظ)
function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    // هنا بنحفظ البيانات في جهاز المستخدم
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    
    updateCartIcon();
    alert(name + " added to cart!");
}

// 4. عشان الرقم يظهر حالاً لما تفتح الصفحة (بعد التعريف)
window.onload = function() {
    updateCartIcon();
    // لو عندك دالة renderCart استدعيها هنا كمان عشان لو في صفحة سلة
};

// Update Cart Page View
function renderCart() {
    let container = document.getElementById('cart-items-container');
    let subtotal = 0;
    
    if (cart.length === 0) {
        container.innerHTML = `<div style="text-align: center; width: 100%; color: #888;"><p>Your cart is empty.</p></div>`;
        document.getElementById('cart-subtotal').innerText = "LE 0.00";
        document.getElementById('cart-total').innerText = "LE 50.00";
        return;
    }

    let html = '';
    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        html += `
        <div class="cart-item">
            <img src="images/3d3.png" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Price: LE ${item.price}</p>
            </div>
            <div class="item-price">LE ${itemTotal}</div>
        </div>
        `;
    });

    container.innerHTML = html;
    document.getElementById('cart-subtotal').innerText = "LE " + subtotal;
    document.getElementById('cart-total').innerText = "LE " + (subtotal + 50);
}

// Simple Quiz Logic
function nextStep(step) {
    document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));
    document.getElementById('step' + step).classList.add('active');
}
// script.js

// 1. دالة لجلب البيانات من الذاكرة
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// 2. دالة لحفظ البيانات في الذاكرة
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 3. دالة الإضافة للعربة (بتستقبل الاسم والسعر)
function addToCart(name, price) {
    let cart = getCart();
    cart.push({ name: name, price: price });
    saveCart(cart);
    updateCartCount(); // تحديث العداد فوراً
    alert(name + " added to cart!"); // رسالة تأكيد
}

// 4. دالة تحديث العداد اللي في الـ Header
function updateCartCount() {
    let cart = getCart();
    // بنجيب كل العناصر اللي ليها الـ ID ده (لأنه يتكرر في كل الصفحات)
    let countSpans = document.querySelectorAll('#cart-count');
    countSpans.forEach(span => {
        span.innerText = `(${cart.length})`;
    });
}

// 5. دالة الحذف (بتستخدم في صفحة الكارت)
function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1); // حذف العنصر
    saveCart(cart); // حفظ التعديل
    updateCartCount(); // تحديث العداد
    displayCart(); // إعادة رسم العناصر في الصفحة
}

// 6. دالة عرض العناصر والحساب (بتشتغل في صفحة الكارت بس)
function displayCart() {
    let cartItemsDiv = document.getElementById('cart-items-container');
    
    // لو مش في صفحة الكارت، الدية دي متشتغلش
    if (!cartItemsDiv) return; 

    let cart = getCart();
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is currently empty.</p>';
    } else {
        cartItemsDiv.innerHTML = '';
        cart.forEach((item, index) => {
            total += item.price;
            cartItemsDiv.innerHTML += `
                <div class="cart-item">
                    <img src="images/placeholder.png" alt="${item.name}" style="width:80px; height:80px; object-fit:cover;">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>LE ${item.price.toFixed(2)}</p>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                </div>
            `;
        });
    }

    // تحديث Tổng (Total)
    let subtotalSpan = document.getElementById('cart-subtotal');
    let totalSpan = document.getElementById('cart-total');
    
    if(subtotalSpan) subtotalSpan.innerText = `LE ${total.toFixed(2)}`;
    if(totalSpan) totalSpan.innerText = `LE ${total.toFixed(2)}`;
}

// عند تحميل أي صفحة
window.onload = function() {
    updateCartCount(); // تحديث العداد في الـ Header
    displayCart(); // لو احنا في صفحة الكارت، هتعرض البيانات
};