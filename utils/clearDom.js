const clearDom = () => {
  document.querySelector('#orders').innerHTML = '';
  document.querySelector('#add-button').innerHTML = '';
  document.querySelector('#form-container').innerHTML = '';
  document.querySelector('#view').innerHTML = '';
  document.querySelector('#homescreen-buttons').innerHTML = '';
};

export default clearDom;
