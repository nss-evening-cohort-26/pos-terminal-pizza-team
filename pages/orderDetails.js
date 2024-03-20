import renderToDOM from '../utils/renderToDom';
import clearDom from '../utils/clearDom';
import { getRevenueByOrder } from '../api/revenueData';

const viewOrderDetails = async (obj) => {
  clearDom();

  let domString = '';
  const totalPrice = obj.items.reduce((accumulator, item) => accumulator + Number(item.price), 0);
  domString += `
    <h2 class="customer-name">${obj.customer_name}</h2>
    <h4>Subtotal: $${totalPrice.toFixed(2)}</h4>
  `;

  if (obj.items.length) {
    const [revenue] = await getRevenueByOrder(obj.firebaseKey);
    domString += `
      ${revenue ? `<h4>Tip: $${revenue.tip_amount.toFixed(2)}</h4><h3 class="total">Total: $${revenue.order_total}</h3>` : ''}
    `;

    obj.items.forEach((item) => {
      domString += `
      <div class="item-cards card w-90 mb-3">
        <div class="card-body item-card">
          <h5 class="card-title">${item.name}</h5>
          <h5 class="card-title">PRICE: $${item.price}</h5>
          ${obj.open ? `<a href="#" class="card-link delete-btn" id="delete-order-item-btn..${item.order_item_id}..${obj.firebaseKey}">Delete Item</a>` : ''}
        </div>
      </div>`;
    });
  } else {
    domString += '<h3>No Items In Order</h3>';
  }

  if (obj.open) {
    domString += `
      <button id="add-order-item-btn--${obj.firebaseKey}" type="button" class="add-item-btn btn btn-primary">Add Item</button>
      ${obj.items.length ? `<button id="go-to-payment-btn--${obj.firebaseKey}" type="button" class="payment-btn btn btn-success">Go to Payment</button>` : ''}
    `;
  }

  renderToDOM('#view', domString);
};

export default viewOrderDetails;
