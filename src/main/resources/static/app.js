// app.js - shared functions for frontend
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
      else arr.push({...item, qty: 1});
      this.save(arr);
    },
    remove(itemId) {
      let arr = this.get().filter(i => i.item_id !== itemId);
      this.save(arr);
    },
    clear() {
      this.save([]);
    },
    total() {
      return this.get().reduce((s,i) => s + (i.price * (i.qty||1)), 0);
    }
  };
  
  function updateCartCount(){
    const n = window.cart.get().reduce((s,i)=> s + (i.qty||1), 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = n);
  }
  
  // UI helpers to render the cart modal
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
        node.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center">
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
  
  // API helpers
  window.api = {
    async loadMenuInto(selector) {
      try {
        const resp = await fetch('/api/menu');
        const menu = await resp.json();
        const container = document.querySelector(selector);
        container.innerHTML = '';
        menu.forEach(item => {
          const div = document.createElement('div');
          div.className = 'card menu-item';
          div.innerHTML = `<div><strong>${item.item_name}</strong></div>
                           <div>Category: ${item.category}</div>
                           <div>Price: $${item.price}</div>
                           <div>Available: ${item.availability ? 'Yes' : 'No'}</div>
                           <div><button class="btn add-btn" data-id="${item.item_id}">Add to cart</button></div>`;
          container.appendChild(div);
        });
  
        // attach add handlers
        container.querySelectorAll('.add-btn').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const id = Number(btn.dataset.id);
            const chosen = menu.find(m => m.item_id === id);
            if (!chosen) return;
            window.cart.add(chosen);
            window.cartUI.refreshCartView();
          });
        });
      } catch (err) {
        console.error('Failed to load menu', err);
        document.querySelector(selector).textContent = 'Failed to load menu';
      }
    }
  };
  
  // Cart modal controls (works on pages that include cart modal)
  document.addEventListener('click', (e) => {
    if (e.target && e.target.matches('#view-cart')) {
      document.getElementById('cart-modal').classList.remove('hidden');
      window.cartUI.refreshCartView();
    }
    if (e.target && e.target.matches('#close-cart')) {
      document.getElementById('cart-modal').classList.add('hidden');
    }
    if (e.target && e.target.matches('[data-remove]')) {
      const id = Number(e.target.getAttribute('data-remove'));
      window.cart.remove(id);
      window.cartUI.refreshCartView();
    }
  });
  
  // initial setup
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    window.cartUI.refreshCartView();
  });
  
