const formEvents = (uid) => {
  document.querySelector('#form-container').addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target.id.includes('create-order-btn')) {
      console.warn('Order created!');
      console.warn(uid);
    }

    if (e.target.id.includes('update-order-btn')) {
      console.warn('Order updated!');
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
    }
  });
};

export default formEvents;
