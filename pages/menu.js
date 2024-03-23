import { adminCheck } from '../utils/auth';
import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewItems = (array, orderFirebaseKey = '', uid) => {
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
        ${adminCheck(uid) ? `
        <div>
          <button class="btn admin-edit admin-only-btn" id="admin-edit-btn--${item.firebaseKey}">Edit</button>
          <button class="btn admin-delete admin-only-btn" id="remove-item-btn--${item.firebaseKey}">Remove</button>
        </div>
        ` : ''}
      </div>
    </div>`;
  });

  if (adminCheck(uid)) {
    let btnString = '';
    btnString = ` 
    <div> <button class="btn admin-add-btn create-order" id="admin-create-item"> create a new item </button> </div> `;

    renderToDOM('#add-button', btnString);
  }

  renderToDOM('#orders', domString);
};

export default viewItems;
