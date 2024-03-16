import { getOrderDetails } from '../api/mergeCalls';
import { createOrder, getAllOrders, updateOrder } from '../api/orderData';
import { createRevenue, updateRevenue } from '../api/revenueData';
import viewOrderDetails from '../pages/orderDetails';
import viewOrders from '../pages/viewOrders';

const formEvents = (uid) => {
  document.querySelector('#form-container').addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target.id.includes('create-order-btn')) {
      const payload = {
        customer_name: document.querySelector('#customerName').value,
        customer_phone: document.querySelector('#customerPhone').value,
        customer_email: document.querySelector('#customerEmail').value,
        order_type: document.querySelector('#orderType').value,
        open: true,
        uid,
      };

      createOrder(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateOrder(patchPayload).then(() => {
          getAllOrders(uid).then(viewOrders);
        });
      });
    }

    if (e.target.id.includes('update-order')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        customer_name: document.querySelector('#customerName').value,
        customer_phone: document.querySelector('#customerPhone').value,
        customer_email: document.querySelector('#customerEmail').value,
        order_type: document.querySelector('#orderType').value,
        uid,
        firebaseKey
      };
      updateOrder(payload).then(() => {
        getAllOrders(uid).then(viewOrders);
      });
    }

    if (e.target.id.includes('create-item-btn')) {
      console.warn('Item created!');
    }

    if (e.target.id.includes('update-item-btn')) {
      console.warn('Item updated!');
    }

    if (e.target.id.includes('create-order-item-btn')) {
      console.warn('Order item created!');
    }

    if (e.target.id.includes('update-order-item-btn')) {
      console.warn('Order item updated!');
    }

    if (e.target.id.includes('close-order-btn')) {
      console.warn('Order closed!');
      const [, orderFirebaseKey] = e.target.id.split('--');
      getOrderDetails(orderFirebaseKey).then((order) => {
        const tip = Number(document.querySelector('#tipAmount').value);
        const payload = {
          payment_type: document.querySelector('#paymentType').value,
          tip_amount: tip,
          order_id: orderFirebaseKey,
          order_type: order.order_type,
          // Calculate order total, adding tip from form
          order_total: (order.items.reduce((tot, item) => tot + Number(item.price), 0) + tip).toFixed(2),
          date: Date.now(),
          uid
        };
        console.warn(payload);
        createRevenue(payload).then(({ name }) => {
          const revenuePatchPayload = { firebaseKey: name };
          updateRevenue(revenuePatchPayload);
          // Change order status to closed
          const orderPatchPayload = { open: false, firebaseKey: orderFirebaseKey };
          updateOrder(orderPatchPayload).then(
            getOrderDetails(orderFirebaseKey).then(viewOrderDetails)
          );
        });
      });
    }
  });
};

export default formEvents;
