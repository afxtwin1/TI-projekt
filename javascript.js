document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                let users = JSON.parse(localStorage.getItem('users')) || [];
                users.push({ email, password });
                localStorage.setItem('users', JSON.stringify(users));

                console.log("Dodano użytkownika:", { email, password });
                console.log("Lista użytkowników:", users);

                loginForm.reset();
                window.location.href = 'index_post.html';
            }
        });
    }

    // 📌 AUTOMATYCZNE WYŚWIETLANIE UŻYTKOWNIKÓW W KONSOLI
    let savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (savedUsers.length > 0) {
        console.log("📌 Lista zapisanych użytkowników:");
        console.table(savedUsers);  // Ładne wyświetlanie w tabeli
    } else {
        console.log("📌 Brak zapisanych użytkowników.");
    }
});



// Funkcja dodająca produkt do koszyka
function addToCart(productName, productImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, image: productImage });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} dodano do koszyka!`);
}

// Funkcja wyświetlająca koszyk na stronie koszyk.html
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cart-items');

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <p>Tu pojawią się usługi dodane do koszyka</p>
            </div>
        `;
        return;
    }

    cartContainer.innerHTML = `
        <h2>Usługi:</h2>
        <div class="cart-grid">
            ${cart
                .map(
                    (item, index) => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-image">
                        <p>${item.name}</p>
                        <button class="remove-btn" onclick="removeFromCart(${index})">Usuń</button>
                    </div>
                `
                )
                .join('')}
        </div>
        <div class="checkout-container">
            <button class="checkout-btn" onclick="checkout()">Zapłać</button>
        </div>
    `;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function checkout() {
    alert('Dziękujemy za zakupy!');
    localStorage.removeItem('cart');
    displayCart();
}
