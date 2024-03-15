import { getAllOrders } from '../api/orderData';
import addOrderForm from '../components/forms/addOrderForm';
import homeScreen from '../pages/homeScreen';
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
};

export default navEvents;
