import domEvents from '../events/domEvents';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import homeScreen from '../pages/homeScreen';
import navEvents from '../events/navEvents';

const startApp = (uid) => {
  domBuilder();
  homeScreen();
  navBar();
  logoutButton();
  domEvents(uid);
  navEvents(uid);
};

export default startApp;
