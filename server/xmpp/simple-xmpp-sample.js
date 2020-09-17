//https://github.com/simple-xmpp/node-simple-xmpp.git

import * as xmpp from 'simple-xmpp';

//for xmpp
xmpp.on('online', function (data) {
    console.log('Connected with JID: ' + data.jid.user);
    console.log('Yes, I\'m connected!');
});

xmpp.on('chat', (from, message) => {
    xmpp.send(from, message)
    setMessages(draft => {
        draft.push([from, message])
    })
}
);

xmpp.on('error', function (err) {
    console.error(err);
});

xmpp.on('subscribe', function (account) {
    if (account !== `guest@${Config.XMPPdomain}`) {
        xmpp.acceptSubscription(account);
    }
});

//not working??
xmpp.connect({
    jid: `guest@${Config.XMPPdomain}`, //for testing id:guest pass:guest
    password: 'guest',
    host: '127.0.0.1',
    port: 5443
});