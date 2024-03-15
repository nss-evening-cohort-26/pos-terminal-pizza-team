import getOrderDetails from '../api/mergeCalls';
import { getAllOrders, getSingleOrder } from '../api/orderData';
import addOrderForm from '../components/forms/addOrderForm';
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
      console.warn('create order btn pushed');
    }

    if (e.target.id.includes('edit-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey).then(addOrderForm);
    }

    if (e.target.id.includes('delete-order-btn')) {
      console.warn('delete order btn pushed');
    }

    if (e.target.id.includes('order-details-btn')) {
      console.warn('order details btn pushed');
      const [, firebaseKey] = e.target.id.split('--');
      getOrderDetails(firebaseKey).then(console.warn);
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
      console.warn('go to payment btn pushed');
    }
  });
};

export default domEvents;
