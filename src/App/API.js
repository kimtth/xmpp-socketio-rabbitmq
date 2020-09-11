import * as Config from '../Context/Constants'

export function emitMessage(channel, message, callback){
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
      console.log(rtn);
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
}

export function receiveMessage(channel, callback){
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