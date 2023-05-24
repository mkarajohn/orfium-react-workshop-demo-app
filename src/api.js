export function post(url, data) {
  return fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function get(url, signal) {
  return fetch(url, { signal })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}
