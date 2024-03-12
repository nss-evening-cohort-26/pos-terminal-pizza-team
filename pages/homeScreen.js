import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const homeScreen = () => {
  clearDom();

  const domString = `
  <button id="view-order-btn">view order</button>
  <button id="create-order-btn">Create Order</button>
  <button id="view-revenue-btn">View Revenue</button>`;

  renderToDOM('#main-container', domString);
};

export default homeScreen;
