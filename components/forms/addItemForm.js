import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';
import selectItem from './selectItem';

const addItemForm = (uid, obj = {}) => {
  clearDom();
  const domString = `
  <form id = "${obj.firebaseKey ? `add-item--${obj.firebaseKey}` : 'edit-item'}">
  <div class="form-group" id="select-item">
  </div>
<div class="form-group">
  <label for="itemPrice">Item Price</label>
  <input type="text" class="form-control" id="itemPrice"  value="${obj.price || ''}" required>
</div>
<button type="submit" class="btn btn-primary">${obj.firebaseKey ? 'Update Item' : 'Submit Item'}
</button>
</form>`;

  renderToDOM('#form-container', domString);
  selectItem(uid, `${obj.name || ''}`);
};

export default addItemForm;
