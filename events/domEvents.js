import { getAllItems } from '../api/itemsData';
import { deleteOrderAndOrderItems, getOrderDetails } from '../api/mergeCalls';
import { getAllOrders, getSingleOrder } from '../api/orderData';
import addOrderForm from '../components/forms/addOrderForm';
import viewItems from '../pages/menu';
import viewOrderDetails from '../pages/orderDetails';
import closeOrderForm from '../components/forms/closeOrderForm';
import viewOrders from '../pages/viewOrders';
import { createOrderItem, updateOrderItem } from '../api/orderItemsData';

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
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to delete this order?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteOrderAndOrderItems(firebaseKey).then(() => {
          getAllOrders(uid).then(viewOrders);
        });
      }
    }

    if (e.target.id.includes('order-details-btn')) {
      console.warn('order details btn pushed');
      const [, firebaseKey] = e.target.id.split('--');
      getOrderDetails(firebaseKey).then((obj) => viewOrderDetails(obj));
    }

    if (e.target.id.includes('add-order-item-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getAllItems(uid).then((items) => viewItems(items, firebaseKey));
    }

    if (e.target.id.includes('create-order-item-btn')) {
      const [, itemId, orderId] = e.target.id.split('..');
      const payload = {
        item_id: itemId,
        order_id: orderId
      };
      createOrderItem(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateOrderItem(patchPayload).then(() => {
          getOrderDetails(orderId).then(viewOrderDetails);
        });
      });
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
