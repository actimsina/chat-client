import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

function App() {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    socket.on('messageResponse', (data) => {
      console.log(data)
      setMessages([...messages, data])
    })
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      socket.emit('message', {
        text: message,
        id: `${Math.random()}`
      })
    }
    setMessage('')
  }
  return (
    <div>
      <p>World Simplest Chat App</p>

      <ul>
        {messages.map(msg => <li key={msg.id}>{msg.text}</li>)}
      </ul>

      <hr />

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>send</button>
      </form>
    </div>
  );
}

export default App;
