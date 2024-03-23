import { Chart } from 'chart.js/auto';
import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

// TODO: Define manual start/end dates
// TODO: Display revenue data in chart
const viewRevenue = (revenueAll, startDate = 0, endDate = 0) => {
  clearDom();
  let revenueHTML = '';
  const revenue = revenueAll.filter((rev) => Number(rev.date) > startDate && Number(rev.date) < (endDate || Date.now()));

  const dates = revenue.map((rev) => parseInt(rev.date, 10));
  const milliStart = startDate || (dates.length ? Math.min(...dates) : Date.now());
  const milliEnd = endDate || Date.now();
  const localOffsetStart = new Date(milliStart).getTimezoneOffset() * 60000;
  const localOffsetEnd = new Date(milliEnd).getTimezoneOffset() * 60000;

  const cashData = revenue.filter((rev) => rev.payment_type === 'cash').length;
  const creditData = revenue.filter((rev) => rev.payment_type === 'credit').length;
  const debitData = revenue.filter((rev) => rev.payment_type === 'debit').length;
  const mobileData = revenue.filter((rev) => rev.payment_type === 'mobile').length;
  const checkData = revenue.filter((rev) => rev.payment_type === 'check').length;

  const dateHTML = `
    <h4>DATE RANGE:</h4>
    <p>${Intl.DateTimeFormat().formatRange(milliStart, milliEnd)}</p>
    <h6>Set Custom Date Range</h6>
    <div>
      <input id="revenue-start" type="date" value="${new Date(milliStart - localOffsetStart).toISOString().split('T')[0]}">
      <p>-</p>
      <input id="revenue-end" type="date" value="${new Date(milliEnd - localOffsetEnd).toISOString().split('T')[0]}">
      <a id="update-revenue-range-btn" href="#">Update</a>
    </div>
    <canvas id="myChart" style="width:100%;max-width:600px"></canvas>
  `;

  if (revenue.length) {
    revenueHTML += `
      <div>
        <div class="rev-text"><h1>REVENUE</h1></div>
        <div class="rev-text"><h2 class="rev-text">TOTAL REVENUE: $${revenue.reduce((tot, rev) => tot + Number(rev.order_total), 0).toFixed(2)}</h2></div>
        <div class="details">
          <h4 id='total-tips'>TOTAL TIPS: $${revenue.reduce((tot, rev) => tot + Number(rev.tip_amount), 0).toFixed(2)}</h4>
          <h4>TOTAL CALL-IN ORDERS: ${revenue.filter((rev) => rev.order_type === 'phone').length}</h4>
          <h4>TOTAL WALK-IN ORDERS: ${revenue.filter((rev) => rev.order_type === 'in-person').length}</h4>
        </div>
        <div class="details">
          <h4>PAYMENT TYPES:</h4>
          <h4>CASH - ${cashData}</h4>
          <h4>CREDIT - ${creditData}</h4>
          <h4>DEBIT - ${debitData}</h4>
          <h4>MOBILE - ${mobileData}</h4>
          <h4>CHECK - ${checkData}</h4>
        </div>
        <div class="rev-details">
        ${dateHTML}
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
  const ctx = document.getElementById('myChart');
  // eslint-disable-next-line no-new
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Cash', 'Credit', 'Debit', 'Mobile', 'Check'],
      datasets: [{
        label: '# of Transactions',
        data: [cashData, creditData, debitData, mobileData, checkData],
        borderWidth: 1,
        backgroundColor: [
          'rgba(69, 219, 67, 0.8)',
          'rgba(45, 136, 226, 0.8)',
          'rgba(234, 61, 0, 0.8)',
          'rgba(234, 210, 0, 0.8)',
          'rgba(147, 136, 226, 0.8)',
        ],
        hoverOffset: 4,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
        }
      }
    }
  });
};

export default viewRevenue;
