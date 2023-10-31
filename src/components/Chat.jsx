import {
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    where,
    orderBy,
  } from 'firebase/firestore';
  import { useEffect, useState } from 'react';
  import { db, auth } from '../firebase/firebaseConfig';
  
  const Chat = ({ room }) => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
  
   // collection() takes two parameters.the reference of the firestore and the collection we want to reference
    const messagesDb = collection(db, 'messages');
  

    const handleSubmit = (e) => {
      e.preventDefault();
  
      // adding a new document to firestore's messages collection
 
       // * 1- reference of the collection to be added
       // * 2- content to be added
      addDoc(messagesDb, {
        text,
        user: auth.currentUser.displayName,
        room,
        createdAt: serverTimestamp(),
      });
  
      setText('');
    };
  
 
    useEffect(() => {
      // filter
      const queryMessage = query(
        messagesDb,
        where('room', '==', room),
        orderBy('createdAt')
      );
  
      //collection change
      onSnapshot(queryMessage, (snapshot) => {
        let comingMessages = [];
       // After returning to the final version of the collection and accessing the documents in it, we transferred the data to the array
        snapshot.forEach((doc) => {
          comingMessages.push(doc.data());
        });
  
        setMessages(comingMessages);
      });
    }, []);
  
    console.log(messages);
    return (
      <div className="chat">
        <div className="chat-info">
          <p>{auth.currentUser.displayName}</p>
          <p>{room}</p>
          <a href="/">Different Room</a>
        </div>
        <div className="messages">
          {messages.map((message) => (
            <>
              {/*What to do if the person who logged in is the same person who sent the message. */}
              {auth.currentUser.displayName === message.user ? (
                <p className="user-message">{message.text}</p>
              ) : (
                <p className="sender-message">
                  <span>{message.user}</span>
                  <span>{message.text}</span>
                </p>
              )}
            </>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your message..."
            type="text"
          />
          <button>Send</button>
        </form>
      </div>
    );
  };
  
  export default Chat;