import { getAllOrders } from '../../api/orderData';
import clearDom from '../../utils/clearDom';
import { adminUIDs } from '../../utils/client';
import renderToDOM from '../../utils/renderToDom';

const addOrderForm = async (uid, obj = {}) => {
  clearDom();

  const adminCheck = Object.values(adminUIDs).filter((admin) => admin === uid);
  let closeFirstKey = '';
  if (!adminCheck.length) {
    const customerOrders = await getAllOrders(uid);
    const [openCustomerOrders] = customerOrders.filter((order) => order.open);
    if (openCustomerOrders) { closeFirstKey = openCustomerOrders.firebaseKey; }
  }

  if (!closeFirstKey) {
    const domString = `
      <form id="${obj.firebaseKey ? `update-order-btn--${obj.firebaseKey}` : 'create-order-btn'}" class="mb-4">
        <div class="field-box form-group">
          <label for="customerName">Customer Name</label>
          <input type="text" class="form-control" id="customerName" value="${obj.customer_name || ''}" required>
        </div>
        <div class="field-box form-group">
          <label for="phoneNumber">Phone Number</label>
          <input type="tel" class="form-control" id="customerPhone" value="${obj.customer_phone || ''}" required>
        </div>
        <div class="field-box form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="customerEmail"  value="${obj.customer_email || ''}" required>
        </div>
        <div class="mb-3">
          <label for="orderType" class="form-label">Order Type</label>
          <select class="form-select" id="orderType" required>
            <option value disabled selected hidden>Select an Order Type</option>
            <option value="phone" ${obj.order_type === 'phone' ? 'selected' : ''}>Phone</option>
            <option value="in-person" ${obj.order_type === 'in-person' ? 'selected' : ''}>In-Person</option>
          </select>
        </div>
        <div class="submit-update-btn">
        <button type="submit" class="sub-up-btn btn btn-primary">${obj.firebaseKey ? 'Update Order' : 'Submit Order'}
        </button>
        </div>
      </form>`;
    renderToDOM('#form-container', domString);
  } else {
    const domString = `
      <h3>Current order must be closed or deleted before opening a new order.</h3>
      <button id="order-details-btn--${closeFirstKey}" class="sub-up-btn btn btn-primary">View Open Order</button>
    `;
    renderToDOM('#view', domString);
  }
};

export default addOrderForm;
