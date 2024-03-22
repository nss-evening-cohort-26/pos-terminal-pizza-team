import { adminCheck } from '../utils/auth';
import { client } from '../utils/client';

const endpoint = client.databaseURL;

const getAllOrders = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order.json${adminCheck(uid) ? '' : `?orderBy="uid"&equalTo="${uid}"`}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
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

const getSingleOrder = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order.json`, {
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

const updateOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order/${payload.firebaseKey}.json`, {
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

const deleteOrder = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getOpenOrders = async (uid) => {
  const order = await getAllOrders(uid);
  const openOprders = await order.filter((obj) => obj.open);
  return openOprders;
};

const getClosedOrders = async (uid) => {
  const order = await getAllOrders(uid);
  const closedorders = await order.filter((obj) => !obj.open);
  return closedorders;
};

export {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOpenOrders,
  getClosedOrders
};
