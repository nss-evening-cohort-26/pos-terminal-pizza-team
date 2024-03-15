import client from '../utils/client';

const endpoint = client.databaseURL;

const getAllRevenue = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/revenue.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleRevenue = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/revenue/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getRevenueByOrder = (orderFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/revenue.json?orderBy="order_id"&equalTo="${orderFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createRevenue = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/revenue.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateRevenue = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/revenue/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteRevenue = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/revenue/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getAllRevenue,
  getSingleRevenue,
  getRevenueByOrder,
  createRevenue,
  updateRevenue,
  deleteRevenue
};
