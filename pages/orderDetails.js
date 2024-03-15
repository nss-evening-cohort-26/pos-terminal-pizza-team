import renderToDOM from '../utils/renderToDom';
import clearDom from '../utils/clearDom';
// TODO: get order name
// TODO: get order total (function)
// TODO: array.forEach loop for order item cards

const viewOrderDetails = (obj) => {
  clearDom();
  let domString = '';
  domString = `<h2>${obj.customer_name}</h2>
  `;
  renderToDOM('#view', domString);
};

export default viewOrderDetails;
