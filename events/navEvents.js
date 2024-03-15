import addOrderForm from '../components/forms/addOrderForm';
import homeScreen from '../pages/homeScreen';

const navEvents = (uid) => {
  document.querySelector('#view-orders').addEventListener('click', () => {
    console.warn('View orders clicked!');
    console.warn(uid);
  });

  document.querySelector('#create-an-order').addEventListener('click', () => {
    addOrderForm();
  });

  document.querySelector('#logo').addEventListener('click', () => {
    homeScreen();
  });
};

export default navEvents;
