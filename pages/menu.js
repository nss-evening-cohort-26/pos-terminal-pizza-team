import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewItems = (array, orderFirebaseKey = '') => {
  clearDom();

  let domString = '';
  array.forEach((item) => {
    domString += `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">Price: $${item.price}</p>
        ${orderFirebaseKey ? `<a href="#" class="card-link" id="create-order-item-btn..${item.firebaseKey}..${orderFirebaseKey}">Add Item To Order</a>` : ''}
      </div>
    </div>`;
  });
  renderToDOM('#orders', domString);
};

export default viewItems;
