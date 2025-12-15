// orders
async function loadOrders() {
  try {
    const resp = await fetch('/api/orders');
    const orders = await resp.json();
    const tbody = document.querySelector('#orders-table tbody');
    tbody.innerHTML = '';

    orders.forEach(o => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${o.order_id}</td>
        <td>${o.customer ? o.customer.f_name + ' ' + o.customer.l_name : 'N/A'}</td>
        <td>${o.total != null ? '$' + o.total.toFixed(2) : '0.00'}</td>
        <td>
          <select class="order-status" data-id="${o.order_id}">
            <option value="PENDING" ${o.status === 'PENDING' ? 'selected' : ''}>Pending</option>
            <option value="COMPLETED" ${o.status === 'COMPLETED' ? 'selected' : ''}>Completed</option>
            <option value="CANCELLED" ${o.status === 'CANCELLED' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td>
          <button class="btn secondary delete-order" data-id="${o.order_id}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Failed to load orders', err);
  }
}




// menu
async function loadMenu() {
  try {
    const resp = await fetch('/api/menu');
    const menu = await resp.json();
    const tbody = document.querySelector('#menu-table tbody');
    tbody.innerHTML = '';

    menu.forEach(m => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${m.item_id}</td>
        <td>${m.item_name}</td>
        <td>${m.category}</td>
        <td>$${m.price.toFixed(2)}</td>
        <td>
          <select class="menu-availability" data-id="${m.item_id}">
            <option value="true" ${m.availability ? 'selected' : ''}>Yes</option>
            <option value="false" ${!m.availability ? 'selected' : ''}>No</option>
          </select>
        </td>
        <td>
          <button class="btn secondary delete-menu" data-id="${m.item_id}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Failed to load menu', err);
  }
}

// ---------------------------
// Add Menu Item
// ---------------------------
document.getElementById('add-menu-form').addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('new-name').value;
  const category = document.getElementById('new-category').value;
  const price = parseFloat(document.getElementById('new-price').value);
  const availability = document.getElementById('new-availability').value === 'true';

  await fetch('/api/menu', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_name: name, category, price, availability })
  });

  e.target.reset();
  loadMenu();
});




// edit
document.addEventListener('click', async e => {
  // Delete menu
  if (e.target.matches('.delete-menu')) {
    const id = e.target.dataset.id;
    await fetch(`/api/menu/${id}`, { method: 'DELETE' });
    loadMenu();
  }

  // Delete order
  if (e.target.matches('.delete-order')) {
    const id = e.target.dataset.id;
    await fetch(`/api/orders/${id}`, { method: 'DELETE' });
    loadOrders();
  }
});





// update
document.addEventListener('change', async e => {
  if (e.target.matches('.order-status')) {
    const id = e.target.dataset.id;
    const status = e.target.value;

    await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    loadOrders();
  }

  if (e.target.matches('.menu-availability')) {
    const id = e.target.dataset.id;
    const availability = e.target.value === 'true';

    await fetch(`/api/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ availability })
    });

    loadMenu();
  }
});




// logout
document.getElementById('logout-btn').addEventListener('click', () => {
  window.location.href = '/';
});





document.addEventListener('DOMContentLoaded', () => {
  loadOrders();
  loadMenu();
});
