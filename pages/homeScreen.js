import { adminCheck } from '../utils/auth';
import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const homeScreen = (uid) => {
  clearDom();

  const domString = `
  <div class="welcome" id="welcome-message">Welcome!</div>
  <div><button class="homescreen-btns" id="view-orders-btn">View Orders</button></div>
  <div><button class="homescreen-btns create-order" id="create-order-btn">Create an Order</button></div>
  <div><button class="homescreen-btns" id="view-revenue-btn">${adminCheck(uid) ? 'View Revenue' : 'View Receipts'}</button></div>
  `;

  renderToDOM('#homescreen-buttons', domString);
};

export default homeScreen;
