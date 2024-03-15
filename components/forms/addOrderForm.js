import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';

const addOrderForm = (obj = {}) => {
  clearDom();
  const domString = `
    <form id="${obj.firebaseKey ? `update-order-btn--${obj.firebaseKey}` : 'create-order-btn'}" class="mb-4">
      <div class="form-group">
        <label for="customerName">Customer Name</label>
        <input type="text" class="form-control" id="customerName" value="${obj.customer_name || ''}" required>
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input type="tel" class="form-control" id="customerPhone" value="${obj.customer_phone || ''}" required>
      </div>
      <div class="form-group">
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
      <button type="submit" class="btn btn-primary">${obj.firebaseKey ? 'Update Order' : 'Submit Order'}
      </button>
    </form>`;

  renderToDOM('#form-container', domString);
};

export default addOrderForm;
