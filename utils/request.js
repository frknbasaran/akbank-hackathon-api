import request from 'request';

async function get(uri) {
  return await request({uri, json:true, method: 'GET' });
};

async function post(uri, body) {
  return await request({uri, json:true, method: 'POST', body})
};

export {
  get,
  post
};