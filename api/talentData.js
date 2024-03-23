import { client } from '../utils/client';

const endpoint = client.databaseURL;

const getAllTalents = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/talent.json`, {
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

const getSingletalent = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/talent/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createTalent = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/talent.json`, {
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

const updateTalent = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/talent/${payload.firebaseKey}.json`, {
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

const deleteTalent = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/talent/${firebaseKey}.json`, {
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
  getAllTalents,
  updateTalent,
  getSingletalent,
  deleteTalent,
  createTalent
};
