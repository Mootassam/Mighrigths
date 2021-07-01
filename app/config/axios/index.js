import Axios from "axios";

export const authAxios = Axios.create({
  baseURL: `http://172.16.224.150:8080/api`,
  timeout: 1800,
  headers: {
    "Content-Type": "application/json",
  },
});

// authAxios.interceptors.request.use(
//   async function (options) {
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2NiOTY1ZmUwOTE4MTY1ZTEyZDlmNSIsImlhdCI6MTYyMTU4NTMyNiwiZXhwIjoxNjIyMTkwMTI2fQ.Mj9-cNmM73FR-kpoB2juczv9tv1k57Ul8Rppb5jyOhM';

//     if (token) {
//       options.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return options;
//   },
//   function (error) {
//     console.log('Request error: ', error);
//     return Promise.reject(error);
//   },
// );
