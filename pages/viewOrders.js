import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewOrders = (array) => {
  clearDom();

  let domString = '';
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

export default viewOrders;
