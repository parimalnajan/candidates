import React, { useContext } from "react";
import "./Auth.css";
import "./GoogleButton.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const setUserContext = (user) => {
    console.log(user);
    console.log(user.displayName);
    setUserData(user);
    navigate("/candidates");

    sessionStorage.setItem("isAuth", "true");
    var isAuth = sessionStorage.getItem("isAuth")
    console.log("auth page",{isAuth})

  };

  const googleLoginHandler = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUserContext(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="login-wrapper">
      <div className="form-wrapper">
        <div className="login">Login</div>
        <div className="login2">Login to your account</div>

        <div className="subtext">Username</div>
        <input className="input1" placeholder="Email or Phone Number"></input>
        <div className="subtext">Password</div>
        <input className="input2" placeholder="Password"></input>

        <div className="checkbox-wrapper">
          <div className="checkbox-wrapper-2">
            <input type="checkbox" id="check"></input>
            <div className="remberme">Remember me</div>
          </div>
        </div>

        <button className="form-button" style={{ marginBottom: "4px" }}>
          Sign in
        </button>

        {/* <div className="login2">Don't Have an account yet? <a onClick={redirToRegister}>Join EasyShop</a> Or:</div> */}
        <div className="mx-auto subtext mt-1 max-sm:mx-0">OR</div>

        <button
          type="button"
          className="login-with-google-btn"
          onClick={googleLoginHandler}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
