import { getAllItems } from '../api/itemsData';
import { getAllOrders } from '../api/orderData';
import addOrderForm from '../components/forms/addOrderForm';
import homeScreen from '../pages/homeScreen';
import viewItems from '../pages/menu';
import { viewOrders } from '../pages/viewOrders';
import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import { searchOrders } from '../api/mergeCalls';

const navEvents = (uid) => {
  document.querySelector('#view-orders').addEventListener('click', () => {
    getAllOrders(uid).then(viewOrders);
  });

  document.querySelector('#create-an-order').addEventListener('click', () => {
    addOrderForm(uid);
  });

  document.querySelector('#logo').addEventListener('click', () => {
    homeScreen();
  });

  document.querySelector('#view-menu').addEventListener('click', () => {
    getAllItems(uid).then(viewItems);
  });

  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();

    if (e.keyCode === 13) {
      searchOrders(uid, searchValue).then((orders) => {
        if (orders.length > 0) {
          viewOrders(orders);
        } else {
          clearDom();
          const domString = '<h1>No Results</h1>';
          renderToDOM('#orders', domString);
        }
      });
      document.querySelector('#search').value = '';
    }
  });
};

export default navEvents;
