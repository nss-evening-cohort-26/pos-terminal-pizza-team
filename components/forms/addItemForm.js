import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';

const addItemForm = (obj = {}) => {
  clearDom();

  const domString = `
      <form id="${obj.firebaseKey ? `update-item-btn--${obj.firebaseKey}` : 'create-item-btn'}" class="mb-4">
        <div class="field-box form-group">
          <label for="itemName">Item Name</label>
          <input type="text" class="form-control" id="itemName" value="${obj.name || ''}" required>
        </div>
        <div class="field-box form-group">
          <label for="itemPrice">Item Price</label>
          <input type="number" min="0.00" max="10000.00" step="0.01" class="form-control" id="itemPrice" value="${obj.price || ''}" required>
        </div>
        <div class="field-box form-group">
          <label for="photo">img</label>
          <input type="url" class="form-control" id="itemImage"  value="${obj.image || ''}" required>
        </div>
        <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" placeholder="Item Description" id="itemDescription" style="height: 100px">${obj.description || ''}</textarea>
      </div>
        <div class="form-check">
        <input type="checkbox" class="form-check-input" id="itemSale" ${obj.sale ? 'checked' : ''}>
        <label class="form-check-label" for="sale">On Sale?</label>
      </div>
        <div class="submit-update-btn">
        <button type="submit" class="sub-up-btn btn btn-primary">${obj.firebaseKey ? 'Update Order' : 'Make New Item'}
        </button>
        </div>
      </form>`;

  renderToDOM('#form-container', domString);
};

export default addItemForm;
