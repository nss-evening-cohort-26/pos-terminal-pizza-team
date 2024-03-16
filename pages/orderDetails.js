import renderToDOM from '../utils/renderToDom';
import clearDom from '../utils/clearDom';
// TODO: get order name
// TODO: get order total (function)
// TODO: array.forEach loop for order item cards

const viewOrderDetails = (obj) => {
  clearDom();
  const totalPrice = obj.items.reduce((accumulator, item) => accumulator + Number(item.price), 0);

  let domString = '';
  domString = `<h2>${obj.customer_name}</h2>
  <h2>Total: $${totalPrice}</h2>
  `;

  obj.items.forEach((item) => {
    domString += `
    <div class="card w-90 mb-3">
      <div class="card-body item-card">
        <h5 class="card-title">${item.name}</h5>
        <h5 class="card-title">PRICE: ${item.price}</h5>
        <a href="#" class="card-link" id="edit-order-item-btn--${item.firebaseKey}">edit</a>
        <a href="#" class="card-link" id="delete-order-item-btn--${item.firebaseKey}">delete</a>
      </div>
    </div>`;
  });

  domString += `
  <button id="add-order-item-btn" type="button" class="btn btn-primary">Add Item</button> 
  <button id="go-to-payment-btn" type="button" class="btn btn-success">Go to Payment</button>`;

  renderToDOM('#view', domString);
};

export default viewOrderDetails;
