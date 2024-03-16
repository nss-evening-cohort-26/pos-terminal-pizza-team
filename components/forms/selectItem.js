import { getAllItems } from '../../api/itemsData';
import renderToDOM from '../../utils/renderToDom';

const selectItem = (uid, itemId) => {
  let domString = `
  <label for="item">Select an Item</label>
  <select class="form-control" id="itemId" required>
  <option value=""> Select an Item</option>`;

  getAllItems(uid).then((itemsArray) => {
    itemsArray.forEach((item) => {
      domString += `
        <option
          value="${item.firebaseKey}"
          ${itemId === item.firebaseKey ? 'selected' : ''}>
            ${item.name}
            </option>`;
    });
    domString += '</select>';

    renderToDOM('#select-item', domString);
  });
};

export default selectItem;
