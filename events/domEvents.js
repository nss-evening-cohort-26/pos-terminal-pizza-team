const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('view-order-btn')) {
      console.warn('pushed view order');
    }

    if (e.target.id.includes('create-order-btn')) {
      console.warn('order btn pushed');
    }

    if (e.target.id.includes('view-revenue-btn')) {
      console.warn('view revenue btn pushed');
    }
  });
};

export default domEvents;
