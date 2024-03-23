import { getAllItems, getSingleItem } from '../api/itemsData';
import { removeMenuItem, deleteOrderAndOrderItems, getOrderDetails } from '../api/mergeCalls';
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
import addItemForm from '../components/forms/addItemForm';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('view-revenue-btn')) {
      getAllRevenue(uid).then((revs) => viewRevenue(revs, uid));
    }

    if (e.target.id.includes('view-orders-btn')) {
      getAllOrders(uid).then(viewOrders);
    }

    if (e.target.id.includes('create-order-btn')) {
      addOrderForm(uid);
    }

    if (e.target.id.includes('edit-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey).then((order) => addOrderForm(uid, order));
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

    if (e.target.id.includes('update-revenue-range-btn')) {
      let startSelect = new Date(document.querySelector('#revenue-start').value).getTime();
      let endSelect = new Date(document.querySelector('#revenue-end').value).getTime();
      if (startSelect > endSelect) {
        const switchSelect = endSelect;
        endSelect = startSelect;
        startSelect = switchSelect;
      }
      if (endSelect > Date.now()) {
        const adjDate = Date.now() - new Date().getTimezoneOffset() * 60000;
        [endSelect] = new Date(adjDate).toISOString().split('T');
        console.warn(endSelect);
        endSelect = new Date(endSelect).getTime();
        if (startSelect > endSelect) {
          startSelect = endSelect;
        }
      }
      const startTime = startSelect + new Date(startSelect).getTimezoneOffset() * 60000;
      const endTime = endSelect + new Date(endSelect).getTimezoneOffset() * 60000 + 86399999;
      console.warn(startTime, endTime);
      getAllRevenue(uid).then((revenue) => viewRevenue(revenue, uid, startTime, endTime));
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
    // admin create menu item button
    if (e.target.id.includes('admin-create-item')) {
      addItemForm();
    }

    if (e.target.id.includes('admin-edit-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleItem(firebaseKey).then((item) => addItemForm(item));
    }

    if (e.target.id.includes('remove-item-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to remove this item from the menu?\n(This will remove item from any open orders)')) {
        const [, firebaseKey] = e.target.id.split('--');
        removeMenuItem(uid, firebaseKey).then(() => {
          getAllItems().then((items) => viewItems(items, '', uid));
        });
      }
    }
  });
};

export default domEvents;
