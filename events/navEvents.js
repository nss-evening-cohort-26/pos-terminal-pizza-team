const navEvents = (uid) => {
  document.querySelector('#view-orders').addEventListener('click', () => {
    console.warn('View orders clicked!');
    console.warn(uid);
  });

  document.querySelector('#create-an-order').addEventListener('click', () => {
    console.warn('Create order clicked!');
  });

  document.querySelector('#logo').addEventListener('click', () => {
    console.warn('Logo clicked!');
  });
};

export default navEvents;
