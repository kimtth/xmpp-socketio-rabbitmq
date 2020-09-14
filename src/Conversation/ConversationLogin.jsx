import React from 'react';

function ConversationLogin(props) {
    const { socket, setId, setRoom } = props

    const handleSubmit = e => {
        e.preventDefault();
        const name = document.querySelector('#name').value.trim();
        const room_value = document.querySelector('#room').value.trim();

        if (!name) {
          return alert("Name can't be empty");
        }
        setId(name);
        setRoom(room_value);
        socket.emit("join", name,room_value);
    };

    return (
        <div style={{ textAlign: 'center', margin: '30vh auto', width: '70%' }}>
        <form onSubmit={event => handleSubmit(event)}>
            ID: <input id="name" required placeholder="What is your name .." /><br />
            Room: <input id="room" placeholder="What is your room .." /><br />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default ConversationLogin;
