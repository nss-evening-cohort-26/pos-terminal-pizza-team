import domEvents from '../events/domEvents';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import homeScreen from '../pages/homeScreen';
import navEvents from '../events/navEvents';
import formEvents from '../events/formEvents';

const startApp = (uid) => {
  domBuilder(uid);
  homeScreen(uid);
  navBar(uid);
  logoutButton();
  domEvents(uid);
  navEvents(uid);
  formEvents(uid);
};

export default startApp;
