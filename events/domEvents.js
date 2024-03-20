import { getAllItems } from '../api/itemsData';
import { deleteOrderAndOrderItems, getOrderDetails } from '../api/mergeCalls';
import {
  getAllOrders, getClosedOrders, getOpenOrders, getSingleOrder
} from '../api/orderData';
import addOrderForm from '../components/forms/addOrderForm';
import viewItems from '../pages/menu';
import viewOrderDetails from '../pages/orderDetails';
import closeOrderForm from '../components/forms/closeOrderForm';
import { viewOrders, noOrders } from '../pages/viewOrders';
import { deleteOrderItem, createOrderItem, updateOrderItem } from '../api/orderItemsData';
import { getAllRevenue } from '../api/revenueData';
import viewRevenue from '../pages/revenue';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('view-revenue-btn')) {
      getAllRevenue(uid).then(viewRevenue);
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
      const [, orderItemFirebaseKey, orderFirebaseKey] = e.target.id.split('..');
      deleteOrderItem(orderItemFirebaseKey).then(() => {
        getOrderDetails(orderFirebaseKey).then((obj) => viewOrderDetails(obj));
      });
    }

    if (e.target.id.includes('go-to-payment-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      closeOrderForm(firebaseKey);
    }

    if (e.target.id.includes('view-open-orders')) {
      getOpenOrders(uid).then((response) => {
        if (response.length > 0) {
          viewOrders(response);
        } else {
          noOrders();
        }
      });
    }

    if (e.target.id.includes('view-closed-orders')) {
      getClosedOrders(uid).then(viewOrders);
    }
  });
};

export default domEvents;
