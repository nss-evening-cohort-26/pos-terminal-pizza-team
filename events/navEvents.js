import { getAllItems } from '../api/itemsData';
import { getAllOrders } from '../api/orderData';
import addOrderForm from '../components/forms/addOrderForm';
import homeScreen from '../pages/homeScreen';
import viewItems from '../pages/menu';
import viewOrders from '../pages/viewOrders';

const navEvents = (uid) => {
  document.querySelector('#view-orders').addEventListener('click', () => {
    getAllOrders(uid).then(viewOrders);
  });

  document.querySelector('#create-an-order').addEventListener('click', () => {
    addOrderForm();
  });

  document.querySelector('#logo').addEventListener('click', () => {
    homeScreen();
  });

  document.querySelector('#view-menu').addEventListener('click', () => {
    getAllItems(uid).then(viewItems);
  });
};

export default navEvents;
