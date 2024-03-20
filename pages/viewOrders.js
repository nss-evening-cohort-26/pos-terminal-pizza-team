import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const noOrders = () => {
  clearDom();

  const btnString = `<div class="d-grid gap-2 d-md-flex justify-content-md-center">
  <button class="btn btn-primary" id="view-orders-btn" type="button">View All</button>
  <button class="btn btn-primary" id="view-open-orders" type="button">View Open</button>
  <button class="btn btn-primary" id="view-closed-orders" type="button">View Closed</button>
  </div>`;
  renderToDOM('#add-button', btnString);

  const domString = "<h1>You ain't got no orders!</h1>";
  renderToDOM('#orders', domString);
};

const viewOrders = (array) => {
  clearDom();

  const btnString = `<div class="d-grid gap-2 d-md-flex justify-content-md-center">
  <button class="btn btn-primary" id="view-orders-btn" type="button">View All</button>
  <button class="btn btn-primary" id="view-open-orders" type="button">View Open</button>
  <button class="btn btn-primary" id="view-closed-orders" type="button">View Closed</button>
  </div>`;
  renderToDOM('#add-button', btnString);

  let domString = '';

  array.sort((a, b) => b.open - a.open);

  array.forEach((item) => {
    domString += `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${item.customer_name}</h5>
        <p class="card-text">Order Status: ${item.open ? 'Open' : 'Closed'}</p>
        <p class="card-text">Customer Phone Number: ${item.customer_phone}</p>
        <p class="card-text">Customer Email Address: ${item.customer_email}</p>
        <p class="card-text">Order Type: ${item.order_type}</p>
        <a href="#" class="card-link" id="order-details-btn--${item.firebaseKey}">Details</a>
        <a href="#" class="edit-btn card-link" id="edit-order-btn--${item.firebaseKey}">${item.open ? 'Edit' : ''}</a>
        <a href="#" class="delete-btn card-link" id="delete-order-btn--${item.firebaseKey}">${item.open ? 'Delete' : ''}</a>
      </div>
    </div>`;
  });
  renderToDOM('#orders', domString);
};

export { viewOrders, noOrders };
