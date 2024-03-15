import renderToDOM from '../../utils/renderToDom';

const domBuilder = () => {
  const domString = `
  <div id="navigation"></div>
  <div id="main-container">
    <div id="homescreen-buttons"></div>
    <div id="add-button"></div>
    <div id="form-container"></div>
    <div id="orders"></div>
    <div id="view"></div>
  </div>`;

  renderToDOM('#app', domString);
};

export default domBuilder;
