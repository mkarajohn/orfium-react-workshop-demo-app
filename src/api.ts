export function post(url: string, data: { title: string; description: string; content: string }) {
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

export function get(url: string, signal: AbortSignal) {
  return fetch(url, { signal })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}
