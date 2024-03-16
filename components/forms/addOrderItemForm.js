import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';
import selectItem from './selectItem';

const addOrderItemForm = (uid, obj = {}) => {
  clearDom();
  const domString = `
  <form id = "${obj.firebaseKey ? `create-order-item-btn--${obj.firebaseKey}` : 'update-order-item-btn'}">
  <div class="form-group" id="select-item">
  </div>
<button type="submit" class="btn btn-primary">${obj.firebaseKey ? 'Update Item' : 'Submit Item'}
</button>
</form>`;

  renderToDOM('#form-container', domString);
  selectItem(uid, `${obj.name || ''}`);
};

export default addOrderItemForm;
