// import { createItem, updateItem } from '../api/itemsData';
import { createOrder, getAllOrders, updateOrder } from '../api/orderData';
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

    if (e.target.id.includes('edit-item')) {
      console.warn('hey');
    }

    if (e.target.id.includes('update-item-btn')) {
      console.warn('Item updated!');
    }

    if (e.target.id.includes('update-order-item-btn')) {
      console.warn('Order item updated!');
    }

    if (e.target.id.includes('close-order-btn')) {
      console.warn('Order closed!');
    }
  });
};

export default formEvents;
