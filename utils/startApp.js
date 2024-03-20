import domEvents from '../events/domEvents';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import homeScreen from '../pages/homeScreen';
import navEvents from '../events/navEvents';
import formEvents from '../events/formEvents';
// import { adminUIDs } from './client';

const startApp = (uid) => {
  domBuilder(uid);
  homeScreen(uid);
  navBar();
  logoutButton();
  domEvents(uid);
  navEvents(uid);
  formEvents(uid);
  // const adminOne = adminUIDs;
};

export default startApp;
