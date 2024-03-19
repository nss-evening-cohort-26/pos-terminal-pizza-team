import { signIn } from '../../utils/auth';

const loginButton = () => {
  const domString = '<img src="https://i.imgur.com/tFue7oz.png"" alt-"hip hop pizza and wings logo" width="500"><div><button id="google-auth" class="login-btn btn btn-danger">Login to Get Started</button></div>';
  document.querySelector('#app').innerHTML = domString;
  document.querySelector('#google-auth').addEventListener('click', signIn);
};

export default loginButton;
