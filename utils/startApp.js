import domEvents from '../events/domEvents';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import homeScreen from '../pages/homeScreen';

const startApp = () => {
  domBuilder();
  homeScreen();
  navBar();
  logoutButton();
  domEvents();
};

export default startApp;
