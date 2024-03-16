import getOrderDetails from '../api/mergeCalls';
import { getAllOrders, getSingleOrder } from '../api/orderData';
import addOrderForm from '../components/forms/addOrderForm';
import viewOrderDetails from '../pages/orderDetails';
import closeOrderForm from '../components/forms/closeOrderForm';
import viewOrders from '../pages/viewOrders';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('view-revenue-btn')) {
      console.warn('view revenue btn pushed');
      console.warn(uid);
    }

    if (e.target.id.includes('view-orders-btn')) {
      getAllOrders(uid).then(viewOrders);
    }

    if (e.target.id.includes('create-order-btn')) {
      addOrderForm();
    }

    if (e.target.id.includes('edit-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey).then(addOrderForm);
    }

    if (e.target.id.includes('delete-order-btn')) {
      console.warn('delete order btn pushed');
    }

    if (e.target.id.includes('order-details-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getOrderDetails(firebaseKey).then((obj) => viewOrderDetails(obj));
    }

    if (e.target.id.includes('add-order-item-btn')) {
      console.warn('add order item btn pushed');
    }

    if (e.target.id.includes('edit-order-item-btn')) {
      console.warn('edit order item btn pushed');
    }

    if (e.target.id.includes('delete-order-item-btn')) {
      console.warn('delete order item btn pushed');
    }

    if (e.target.id.includes('go-to-payment-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      closeOrderForm(firebaseKey);
    }
  });
};

export default domEvents;
