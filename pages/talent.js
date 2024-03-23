import { adminCheck } from '../utils/auth';
import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewTalent = (array, orderFirebaseKey = '', uid) => {
  clearDom();

  let domString = '';

  array.sort((a, b) => new Date(a.date) - new Date(b.date));

  array.forEach((item) => {
    domString += `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${item.bandName} </h5>
        <p class="description">Genre: ${item.genre}</p>
        <p class="description">${item.virtual} performance on: ${item.date}</p>
        ${orderFirebaseKey ? `<a href="#" class="card-link" id="create-talent-btn..${item.firebaseKey}..${orderFirebaseKey}">Create New Event</a>` : ''}
        ${adminCheck(uid) ? `
        <div>
          <button class="btn admin-edit admin-only-btn" id="admin-edit-talent-btn--${item.firebaseKey}">Edit</button>
          <button class="btn admin-delete admin-only-btn" id="admin-delete-talent-btn--${item.firebaseKey}">Delete</button>
        </div>
        ` : ''}
      </div>
    </div>`;
  });

  if (adminCheck(uid)) {
    let btnString = '';
    btnString = ` 
    <div> <button class="btn admin-add-btn create-order homescreen-btns" id="admin-create-talent"> New Talent Entry </button> </div> `;

    renderToDOM('#add-button', btnString);
  }

  renderToDOM('#orders', domString);
};

export default viewTalent;
