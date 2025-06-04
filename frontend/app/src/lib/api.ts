import axios from 'axios';


const apiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetcher = (url: string) => apiAxios.get(url).then(r => r.data);

export const post = (url: string, body: object) =>
  apiAxios.post(url, body, {
    headers: { 'Content-Type': 'application/json' },
  }).then(r => {
    return r.data;
  });


export const put = (url: string, body: object) =>
  apiAxios.put(url, body, {
    headers: { 'Content-Type': 'application/json' },
  }).then(r => {
    return r.data;
  });


export const deleteItem = (url: string) =>
  apiAxios.delete(url, {
    headers: { 'Content-Type': 'application/json' },
  }).then(r => {
    return r.data;
  });