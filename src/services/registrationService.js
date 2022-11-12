import axios from 'axios';

export function getAllEntries() {
  let url = '/employee/';
  return axios({
    method: 'GET',
    url: url,
  });
}

export function login(user) {
  let url = '/user/login';

  return axios({
    method: 'POST',
    url: url,
    data: JSON.stringify(user),
  });
}

export function getAllUsers() {
  let url = '/user/get-all';

  return axios({
    method: 'GET',
    url: url,
  });
}

export async function createEntity() {
  let url = '/employee/';
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: url,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
