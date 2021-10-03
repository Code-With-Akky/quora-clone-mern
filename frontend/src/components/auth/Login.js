import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Login.css";
import { login, register } from "../../Action/User";
import {auth, provider} from '../../firebase'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false)

  const dispatch = useDispatch();

  const signIn = () => {
    auth.signInWithPopup(provider).then((auth) => {
      console.log(auth)
    })
  };

  const handleControlUser = (e) => {
    e.preventDefault()
    if(user){
      registerSignIn(e)
    } else {
      handleSignIn(e)
    }
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatch(login(email, password));
    }
  };

  const registerSignIn = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatch(register(email, password));
    } else {
      alert("fill out all details");
    }
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
            alt=""
          />
        </div>
        <div className="login__desc">
          <p>A Place to Share knowledge and better understand the world</p>
          <p style={{ color: "royalblue", fontSize: "25px" }}>
            HandCrafted with ❤️ by{" "}
          </p>
          <h3>Code With Akky</h3>
        </div>
        <div className="login__auth">
          <div className="login__authOptions">
            <div className="login__authOption">
              {/* <img
                className="login__googleAuth"
                src="https://www.pngjoy.com/pngm/880/10354340_google-icon-google-icon-svg-white-transparent-png.png"
                alt=""
              /> */}
              <img
                alt=""
                src="https://img.icons8.com/color/48/000000/google-logo.png"
              />
              <p onClick={signIn}>Continue With Google</p>
            </div>
            <div className="login__authOption">
              {/* <FacebookIcon /> */}
              <img
                alt="facebook"
                src="https://img.icons8.com/color/48/000000/facebook-new.png"
              />
              <span>Continue With Facebook</span>
            </div>
            <div className="login__authDesc">
              <p>
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Sign Up With Email
                </span>
                . By continuing you indicate that you have read and agree to
                QAS's
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Terms of Service{" "}
                </span>
                and{" "}
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
          <div className="login__emailPass">
            <h4>Authetication</h4>
            <div className="login__inputFields">
              <div className="login__inputField">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login__forgButt">
              <small>Forgot Password?</small>
              <button onClick={handleControlUser}>{user ? 'Register' : 'Login'}</button>
            </div>
            <p style ={{
              fontSize: "13px",
              color: "#777",
              cursor: "pointer"
            }} onClick = {() => setUser(!user)}>{!user ? 'New user | Register' : 'Already registered | Login'}</p>
            {/* <button onClick={registerSignIn}>Register</button> */}
          </div>
        </div>
        {/* <div className="login__lang">
          <p>हिन्दी</p>
          <ArrowForwardIosIcon fontSize="small" />
        </div> */}
        {/* <div className="login__footer">
          <p>About</p>
          <p>Languages</p>
          <p>Careers</p>
          <p>Businesses</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact</p>
          <p>&copy; Quora Fake Inc. 2021</p>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
