import * as Config from '../Context/Constants'

export function emitPub(message, callback){
    let URL = Config.apiURL;
    let arrOfObj = []

    fetch(URL, {
      method: 'post',
      headers: {
          'Content-type': 'application/json',
      },
      body: JSON.stringify(arrOfObj)
    })
    .then((response) => {
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then((data) => {
      let rtn = data;
      callback(rtn);
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
}

export function receiveSub(message, callback){
    let URL = Config.apiURL;
    let arrOfObj = []

    fetch(URL, {
      method: 'get',
      headers: {
          'Content-type': 'application/json',
      },
      body: JSON.stringify(arrOfObj)
    })
    .then((response) => {
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then((data) => {
      let rtn = data;
      callback(rtn);
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
}