// cart
window.cart = {
  get() {
    return JSON.parse(localStorage.getItem('coffee_cart') || '[]');
  },
  save(arr) {
    localStorage.setItem('coffee_cart', JSON.stringify(arr));
    updateCartCount();
  },
  add(item) {
    const arr = this.get();
    const found = arr.find(i => i.item_id === item.item_id);
    if (found) found.qty++;
    else arr.push({ ...item, qty: 1 });
    this.save(arr);
  },
  remove(itemId) {
    this.save(this.get().filter(i => i.item_id !== itemId));
  },
  clear() {
    this.save([]);
  },
  total() {
    return this.get().reduce((s, i) => s + (i.price * (i.qty || 1)), 0);
  }
};

function updateCartCount() {
  const n = window.cart.get().reduce((s, i) => s + (i.qty || 1), 0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = n);
}

window.cartUI = {
  refreshCartView() {
    const items = window.cart.get();
    const el = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (!el) return;
    el.innerHTML = '';
    if (!items.length) el.innerHTML = '<div class="card">Cart is empty</div>';
    items.forEach(it => {
      const node = document.createElement('div');
      node.className = 'card';
      node.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div><strong>${it.item_name}</strong></div>
            <div>${it.category} · $${it.price} · qty: ${it.qty}</div>
          </div>
          <div>
            <button class="btn secondary" data-remove="${it.item_id}">Remove</button>
          </div>
        </div>`;
      el.appendChild(node);
    });
    if (totalEl) totalEl.textContent = window.cart.total().toFixed(2);
    updateCartCount();
  }
};

// menu
async function loadMenu() {
  try {
    const resp = await fetch('/api/menu');
    const menu = await resp.json();

    const sections = {
      coffee: document.getElementById('coffee-section'),
      refresher: document.getElementById('refreshers-section'),
      food: document.getElementById('food-section')
    };

    Object.values(sections).forEach(sec => sec.innerHTML = '');

    menu.forEach(item => {
      const section = sections[item.category.toLowerCase()];
      if (!section) return;

      const div = document.createElement('div');
      div.className = 'card menu-item';
      div.innerHTML = `
        <strong>${item.item_name}</strong>
        <div>$${Number(item.price).toFixed(2)}</div>
        <div>${item.availability ? '' : 'Unavailable'}</div>
        <button class="btn add-btn" ${!item.availability ? 'disabled' : ''}>
          Add to Cart
        </button>
      `;
      section.appendChild(div);

      div.querySelector('.add-btn').addEventListener('click', () => {
        window.cart.add(item);
        window.cartUI.refreshCartView();
      });
    });
  } catch (err) {
    console.error('Failed to load menu', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('coffee-section')) loadMenu();

  document.addEventListener('click', e => {
    if (e.target.matches('#view-cart')) {
      document.getElementById('cart-modal').classList.remove('hidden');
      window.cartUI.refreshCartView();
    }
    if (e.target.matches('#close-cart')) {
      document.getElementById('cart-modal').classList.add('hidden');
    }
    if (e.target.matches('[data-remove]')) {
      window.cart.remove(Number(e.target.getAttribute('data-remove')));
      window.cartUI.refreshCartView();
    }
  });

  // checkout
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', async () => {
      const cartItems = window.cart.get();
      if (!cartItems.length) return alert('Cart is empty');

      const customer = JSON.parse(localStorage.getItem('customer'));
      if (!customer) return alert('You must be logged in to place an order');

      try {
        const resp = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customer_id: customer.user_id, items: cartItems })
        });

        if (resp.ok) {
          alert('Order placed successfully!');
          window.cart.clear();
          document.getElementById('cart-modal').classList.add('hidden');
        } else {
          alert('Failed to place order');
        }
      } catch (err) {
        console.error(err);
        alert('Server error');
      }
    });
  }

  // logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('coffee_cart');
      localStorage.removeItem('customer');
      window.location.href = '/login.html';
    });
  }

  // login
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      try {
        const resp = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await resp.json();

        if (data.status === 'success') {
          if (data.role === 'admin') {
            window.location.href = '/admin.html';
          } else {
            localStorage.setItem('customer', JSON.stringify(data.customer));
            window.location.href = '/menu.html';
          }
        } else {
          alert('Login failed: wrong email or password');
        }
      } catch (err) {
        console.error(err);
        alert('Login failed: server error');
      }
    });
  }

  // signup
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async e => {
      e.preventDefault();
      const body = {
        f_name: document.getElementById('f_name').value.trim(),
        l_name: document.getElementById('l_name').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim()
      };
      try {
        const resp = await fetch('/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        if (resp.ok) {
          alert('Account created! Please log in.');
          window.location.href = '/login.html';
        } else {
          alert('Account creation failed');
        }
      } catch (err) {
        console.error(err);
        alert('Account creation failed: server error');
      }
    });
  }
});
