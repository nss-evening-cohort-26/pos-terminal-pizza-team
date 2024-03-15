import { getAllOrders } from '../api/orderData';
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
      console.warn('edit order btn pushed');
    }

    if (e.target.id.includes('delete-order-btn')) {
      console.warn('delete order btn pushed');
    }

    if (e.target.id.includes('order-details-btn')) {
      console.warn('order details btn pushed');
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
