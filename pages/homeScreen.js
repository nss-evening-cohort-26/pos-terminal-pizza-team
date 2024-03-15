import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const homeScreen = () => {
  clearDom();

  const domString = `
  <button id="view-orders-btn">View Orders</button>
  <button id="create-order-btn">Create Order</button>
  <button id="view-revenue-btn">View Revenue</button>`;

  renderToDOM('#homescreen-buttons', domString);
};

export default homeScreen;
