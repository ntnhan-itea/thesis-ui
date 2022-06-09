import axios from "axios";

export async function getUser() {
  return new Promise((resolve, reject) => {
    axios
      .get("/users")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getAllPendingRegistrations() {
  return new Promise((resolve, reject) => {
    axios.get(`/registrations/pending`)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export async function getMembersByTeam(teamId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/members/?team=${teamId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function makeRegistration(registrationRequest) {
  return axios({
    method: 'POST',
    url: '/registrations',
    data: JSON.stringify(registrationRequest),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}


export async function cancelRegistration(registrationId) {
  return axios({
    method: 'DELETE',
    url: '/registrations/' + registrationId + "/cancel",
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

export async function rejectRegistration(id, reason) {
  return new Promise((resolve, reject) => {
    axios.delete(`/registrations/${id}?reason=${encodeURIComponent(reason)}`).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    })
  })
}

export async function approveRegistration(id) {
  return new Promise((resolve, reject) => {
    axios.patch(`/registrations/${id}`).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    })
  })
}

export async function searchRegistration(validAt, membersId = []) {
  let membersparams = "";
  let url = ""
  membersId.forEach((member) => {
    membersparams += "&account=" + encodeURIComponent(member.account);
  });
  url = "/registrations?validAt=" +
    encodeURIComponent(JSON.stringify(validAt)) +
    membersparams;

  return axios({
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

export async function checkOverlap(validAt, accountList = []) {
  let accountsParams = "";
  let url = ""
  accountList.forEach((account) => {
    accountsParams += "&account=" + encodeURIComponent(account);
  });
  url = "/registrations/checkOverlap?validAt=" +
    encodeURIComponent(JSON.stringify(validAt)) +
    accountsParams;

  return axios({
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

export async function getRegistrationById(registrationId, isEncrypted) {
  let url = `registrations/${registrationId}`;
  if (isEncrypted === true) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'encrypted-id': 'true',
        }
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export async function getAllEntries() {
  let url = '/users/getAll';
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