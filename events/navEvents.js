import { getAllItems } from '../api/itemsData';
import { getAllOrders } from '../api/orderData';
import addOrderForm from '../components/forms/addOrderForm';
import homeScreen from '../pages/homeScreen';
import viewItems from '../pages/menu';
import { viewOrders } from '../pages/viewOrders';
import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import { searchOrders } from '../api/mergeCalls';
import viewTalent from '../pages/talent';
import { getAllTalents } from '../api/talentData';
import viewRevenue from '../pages/revenue';
import { getAllRevenue } from '../api/revenueData';

const navEvents = (uid) => {
  document.querySelector('#view-orders').addEventListener('click', () => {
    getAllOrders(uid).then(viewOrders);
  });

  document.querySelector('#create-an-order').addEventListener('click', () => {
    addOrderForm(uid);
  });

  document.querySelector('#logo').addEventListener('click', () => {
    homeScreen(uid);
  });

  document.querySelector('#view-menu').addEventListener('click', () => {
    getAllItems().then((items) => viewItems(items, '', uid));
  });

  document.querySelector('#view-revenue').addEventListener('click', () => {
    getAllRevenue(uid).then((revs) => viewRevenue(revs, uid));
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

  document.querySelector('#view-event').addEventListener('click', () => {
    getAllTalents().then((items) => viewTalent(items, '', uid));
  });
};
export default navEvents;
