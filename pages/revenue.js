import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

// TODO: Define manual start/end dates
// TODO: Display revenue data in chart
const viewRevenue = (revenueAll, startDate = 0, endDate = 0) => {
  clearDom();
  let revenueHTML = '';
  const revenue = revenueAll.filter((rev) => rev.date > startDate && rev.date < (endDate || Date.now()));

  const dates = revenue.map((rev) => parseInt(rev.date, 10));
  const milliStart = startDate || (dates.length ? new Date(Math.min(...dates)) : 0);
  const milliEnd = endDate || Date.now();
  const dateHTML = `
    <h4>DATE RANGE:</h4>
    <p>${Intl.DateTimeFormat('en-US').formatRange(milliStart, milliEnd)}</p>
    <div>
      <input type="date" value="${milliStart}"
    </div>
  `;

  if (revenue.length) {
    revenueHTML += `
      <div>
        <div class="rev-text"><h1>REVENUE</h1></div>
        <div class="rev-text"><h2 class="rev-text">TOTAL REVENUE: $${revenue.reduce((tot, rev) => tot + Number(rev.order_total), 0).toFixed(2)}</h2></div>
        <div class="rev-details">
          ${dateHTML}
        </div>
        <div class="details">
          <h4 id='total-tips'>TOTAL TIPS: $${revenue.reduce((tot, rev) => tot + Number(rev.tip_amount), 0).toFixed(2)}</h4>
          <h4>TOTAL CALL-IN ORDERS: ${revenue.filter((rev) => rev.order_type === 'phone').length}</h4>
          <h4>TOTAL WALK-IN ORDERS: ${revenue.filter((rev) => rev.order_type === 'in-person').length}</h4>
        </div>
        <div class="details">
          <h4>PAYMENT TYPES:</h4>
          <h4>CASH - ${revenue.filter((rev) => rev.payment_type === 'cash').length}</h4>
          <h4>CREDIT - ${revenue.filter((rev) => rev.payment_type === 'credit').length}</h4>
          <h4>DEBIT - ${revenue.filter((rev) => rev.payment_type === 'debit').length}</h4>
          <h4>MOBILE - ${revenue.filter((rev) => rev.payment_type === 'mobile').length}</h4>
          <h4>CHECK - ${revenue.filter((rev) => rev.payment_type === 'check').length}</h4>
        </div>
        <h4></h4>
        <p></p>
      </div>
    `;
  } else {
    revenueHTML += `
      <div>
        <h1>REVENUE</h1>
        <h2>TOTAL REVENUE: $0.00</h2>
        <div class="rev-details">
          ${dateHTML}
        </div>
        <h4>(Only closed orders included in revenue)</h4>
      <div>`;
  }
  renderToDOM('#view', revenueHTML);
};

export default viewRevenue;
