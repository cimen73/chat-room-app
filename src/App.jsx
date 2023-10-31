import { useState, useRef } from 'react';
import Auth from './components/Auth';
import Chat from './components/Chat';

function App() {
  /*
   * local storage'ı kontrol ediyoruz
   * eğerki daha önce kaydolduğuna dair token
   * varsa > isAuth true oluyor ve sohbet ekranına yönleniyor
   * yoksa > isAuth undefined oluyor ve giriş yapma ekranına yönleniyor
   */
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token'));
  const [room, setRoom] = useState(null);

  // Watching what is written to input.
  const inputRef = useRef();

  // It works when you click on logout
  const handleLogout = () => {
    //removes the information that the user is logged in from local storage.
    localStorage.removeItem('token');
   // We set isAuth to false to redirect to the login page
    setIsAuth(false);
  };

 // If it is not authorized, redirect to the login page
  if (!isAuth) {
    return (
      <div className="container">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  // If the user has permission, the screen is printed
  return (
    <div className="container">
      {room ? (
        // Redirect to chat screen if there is a room
        <Chat room={room} />
      ) : (
        // If there is no room, prompt to select a room.
        <div className="room-container">
          <h1>Chat Room</h1>
          <p>Which Chat Room Will You Enter ? </p>
          <input ref={inputRef} type="text" />
          <button
            onClick={() => setRoom(inputRef.current.value)}
            id="enter"
          >
          Enter the Room
          </button>
          <button id="leave" onClick={handleLogout}>
          Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default App;