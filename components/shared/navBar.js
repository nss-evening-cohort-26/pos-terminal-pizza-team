import renderToDOM from '../../utils/renderToDom';
import { adminCheck } from '../../utils/auth';

const navBar = (uid) => {
  const domString = `
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark mb-5">
    <div class="container-fluid">
        <a class="navbar-brand title" id="logo" href="#"><img src="https://i.imgur.com/tFue7oz.png" alt="hip hop pizza and wings logo" width="60"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#" id="view-orders">
                View Orders <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" id="create-an-order">Create an Order</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" id="view-menu">Menu</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" id="view-revenue">${adminCheck(uid) ? 'View Revenue' : 'View Receipts'}</a>
            </li>
          </ul>
          <span class="navbar-text">
          <input
              class="form-control"
              id="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div id="logout-button"></div>
          </span>
        </div>
        </div>
      </nav>`;

  renderToDOM('#navigation', domString);
};

export default navBar;
