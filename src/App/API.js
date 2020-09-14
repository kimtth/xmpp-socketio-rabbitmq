import * as Config from '../Context/Constants'

export function channelOpen(channel, cb){
  let URL = Config.apiURL + 'ch';
  let jsonObject = {
    channel: channel
  }
  fetch(URL, {
    method: 'post',
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify(jsonObject)
  })
  .then((response) => {
    if(!response.ok) throw new Error(response.status);
    else return response.json();
  })
  .then((data) => {
    let rtn = data;
    cb();
  })
  .catch((error) => {
    console.log('error: ' + error);
  });
}

export function channelClose(){
  let URL = Config.apiURL + 'exit';
  fetch(URL, {
    method: 'post',
    headers: {
        'Content-type': 'application/json',
    },
  })
  .then((response) => {
    if(!response.ok) throw new Error(response.status);
    else return response.json();
  })
  .then((data) => {
    let rtn = data;
  })
  .catch((error) => {
    console.log('error: ' + error);
  });
}

export function emitPub(channel, message, callback){
    let URL = Config.apiURL;
    let jsonObject = {
      channel: channel,
      message: message
    }

    fetch(URL, {
      method: 'post',
      headers: {
          'Content-type': 'application/json',
      },
      body: JSON.stringify(jsonObject)
    })
    .then((response) => {
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then((data) => {
      let rtn = data;
      callback();
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
}

export function receiveSub(channel, callback){
    let URL = Config.apiURL + channel;

    fetch(URL, {
      method: 'get',
    })
    .then((response) => {
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then((data) => {
      let rtn = data.message;
      if(rtn)
        callback(rtn);
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
}