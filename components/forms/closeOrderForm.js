import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';

const closeOrderForm = (orderFirebaseKey) => {
  clearDom();
  const domString = `
    <form id="close-order-btn--${orderFirebaseKey}" class="mb-4">
      <div class="mb-3">
        <label for="paymentType" class="form-label">Payment Type</label>
        <select class="form-select" id="paymentType" required>
          <option value disabled selected hidden>Select a Payment Type</option>
          <option value="cash">Cash</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
          <option value="mobile">Mobile</option>
          <option value="check">Check</option>
        </select>
      </div>
      <div class="form-group">
        <label for="tipAmount">Tip Amount</label>
        <input type="number" min="0.00" max="10000.00" step="0.01" class="form-control" id="tipAmount" required>
      </div>
      <button type="submit" class="btn btn-primary">Close Order</button>
    </form>`;

  renderToDOM('#form-container', domString);
};

export default closeOrderForm;
