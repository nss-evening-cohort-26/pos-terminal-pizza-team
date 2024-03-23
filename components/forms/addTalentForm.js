import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';

const addTalentForm = (obj = {}) => {
  clearDom();

  const domString = `
<form id="${obj.firebaseKey ? `update-talent-btn--${obj.firebaseKey}` : 'create-talent-btn'}" class="mb-4">
        <div class="field-box form-group">
          <label for="talentname">Talent Name</label>
          <input type="text" class="form-control" id="talentName" value="${obj.bandName || ''}" required>
        </div>
        <div class="field-box form-group">
          <label for="genre">Genre</label>
          <input type="string" class="form-control" id="genre" value="${obj.genre || ''}" required>
        </div>
        <div class="field-box form-group">
          <label for="date">Date</label>
          <input type="date" class="form-control" id="dateOfPreformance"  value="${obj.date || ''}" required>
        </div>
        <div class="mb-3">
          <label for="orderType" class="form-label">Venue</label>
          <select class="form-select" id="venueLocation" required>
            <option value disabled selected hidden>Select a Venue</option>
            <option value="Live" ${obj.virtual === 'Live' ? 'selected' : ''}>Live</option>
            <option value="Virtual" ${obj.virtual === 'Virtual' ? 'selected' : ''}>Virtual</option>
          </select>
        </div>
        <div class="submit-update-btn">
        <button type="submit" class="sub-up-btn btn btn-primary">${obj.firebaseKey ? 'Update Event' : 'Make New Event'}
        </button>
        </div>
      </form>`;

  renderToDOM('#form-container', domString);
};

export default addTalentForm;
