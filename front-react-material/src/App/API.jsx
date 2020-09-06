import * as Config from '../Context/Constants'

export function sendFromHost(message, callback){
    let URL = Config.apiURL.SocketHost
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

export function sendFromParticipants(message, callback){
    let URL = Config.apiURL.SocketParticipant
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

export function sendFromPublisher(message, callback){
    let URL = Config.apiURL.Publisher
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

export function subSubscriber(message, callback){
    let URL = Config.apiURL.Subscriber

}