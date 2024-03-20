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
        <div><img src="${item.image}" alt="Image of ${item.name}" width="100"></div>
        <p class="description">${item.description}</p>
        <p class="card-text">${item.sale ? `<span class="badge bg-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span><p>Price: $${item.price}</p>` : `Price: $${item.price}`}</p>
        ${orderFirebaseKey ? `<a href="#" class="card-link" id="create-order-item-btn..${item.firebaseKey}..${orderFirebaseKey}">Add Item To Order</a>` : ''}
      </div>
    </div>`;
  });
  renderToDOM('#orders', domString);
};

export default viewItems;
