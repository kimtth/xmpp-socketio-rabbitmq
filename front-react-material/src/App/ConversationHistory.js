let OS = require('os')

//Kim: 
//This code is for saving the conversation history.
//Once, React rendering is triggered, all state in the component is going to be initialized, so that, it will lost. 
export let enJaTabEnConversation = '';
export let enJaTabJaConversation = '';
export let jaEnTabJaConversation = '';
export let jaEnTabEnConversation = '';

export function setEnJaTabEnConversation(value) {
    enJaTabEnConversation = concatValue(enJaTabEnConversation, value);
}
export function setEnJaTabJaConversation(value) {
    enJaTabJaConversation = concatValue(enJaTabJaConversation, value);;
}
export function setJaEnTabJaConversation(value) {
    jaEnTabJaConversation = concatValue(jaEnTabJaConversation, value);;
}
export function setJaEnTabEnConversation(value) {
    jaEnTabEnConversation = concatValue(jaEnTabEnConversation, value);;
}

export function setAlldefault(){
    enJaTabEnConversation = '';
    enJaTabJaConversation = '';
    jaEnTabJaConversation = '';
    jaEnTabEnConversation = '';
}

const concatValue = function(target, newValue){
    const timestampNow = Date().now;
    let timestamp = new Intl.DateTimeFormat('ja-JP', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestampNow)
    timestamp = timestamp + ' ';
    newValue = timestamp + newValue;

    //Kim - the \n is not working as a newline.
    if(target){
        return target + OS.EOL + newValue;
    }else{
        return newValue;
    }
}