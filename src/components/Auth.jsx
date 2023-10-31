import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/firebaseConfig';

const Auth = ({ setIsAuth }) => {
  //When you click on the login button.events we want to happen
  const handleClick = () => {
    /*
   * It opens a window for the user to select their Google account,
     and when the user selects the account, if it is not in the database,
     it adds it and updates the login date if it exists.
     returns us a response containing information about the user as a result
     */
    signInWithPopup(auth, provider).then((res) => {
   // saving the token to localstorage containing proof that the user is logged in
      localStorage.setItem('token', res.user.refreshToken);

      //verifying authorization.
      setIsAuth(true);
    });
  };

  return (
    <div className="auth">
      <h1>Chat Room</h1>
      <p>Sign In To Continue</p>
      <button  onClick={handleClick}>
        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default Auth;