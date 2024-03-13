import client from '../utils/client';

const endpoint = client.databaseURL;

const getAllOrderItems = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderItems.json?orderBy="order_id"&equalTo="${firebaseKey}"`, {
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

const getSingleOrderItem = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderItems/${firebaseKey}.json`, {
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

const createOrderItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderItems.json`, {
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

const updateOrderItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderItems/${payload.firebaseKey}.json`, {
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

const deleteOrderItem = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderItems/${firebaseKey}.json`, {
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
  getAllOrderItems,
  getSingleOrderItem,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
};
