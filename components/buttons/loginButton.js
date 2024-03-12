import { signIn } from '../../utils/auth';

const loginButton = () => {
  const domString = '<button id="google-auth" class="btn btn-danger">Login</button>';
  document.querySelector('#app').innerHTML = domString;
  document.querySelector('#google-auth').addEventListener('click', signIn);
};

export default loginButton;
