import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import SearchIcon from "@material-ui/icons/Search";
// import logo from "./img/QAS logo.png";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CloseIcon from "@material-ui/icons/Close";

import "./QHeader.css";
import { Avatar, Button, Input } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
// import db, { auth } from "../firebase";
import { ExpandMore, Link } from "@material-ui/icons";
import firebase from "firebase";
import { logout } from "../../Action/User";
import axios from "axios";
import { token } from "../../Utils/decodedToken";
import { successModal } from "../../Utils/AlertModal";

function QHeader() {
  // const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const userLogin = useSelector((state) => state.userLogin);

  // console.log(userLogin?.userInfo?.userId);

  const Close = (
    <CloseIcon
      style={{
        color: "red",
        border: " 2px solid lightgray",
        borderRadius: "3px",
      }}
    />
  );

  const handleQuestion = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    if (input !== "") {
      const body = {
        questionName: input,
        questionUrl: inputUrl,
        userId: userLogin?.userInfo?.userId
      };
      await axios
        .post("/api/questions", body, config)
        .then((res) => {
          console.log(res.data);
          console.log("question added successfully");
          setIsModalOpen(false);
          successModal('Question added successfully')
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setInput("");
    setInputUrl("");
  };

  const handleLogout = () => {
    
      dispatch(logout());
      //alert("Logged out successfully");
  };

  return (
    <div className="qHeader">
      <div className="qHeader-content">
        <div className="qHeader__logo">
          <img
            src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
            alt="logo"
          />
        </div>
        <div className="qHeader__icons">
          <div onClick = {() => window.location.href = '/'} className="active qHeader__icon">
            <HomeIcon />
          </div>
          <div onClick = {() => window.location.href = '/allSpaces'} className="qHeader__icon">
            <FeaturedPlayListOutlinedIcon />
          </div>
          <div onClick = {() => window.location.href = '/myQuestions'} className="qHeader__icon">
            <AssignmentTurnedInOutlinedIcon />
          </div>
          <div onClick = {() => window.location.href = '/allUsers'} className="qHeader__icon">
            <PeopleAltOutlinedIcon />
          </div>
          <div onClick = {() => window.location.href = '/notifications'} className="qHeader__icon">
            <NotificationsOutlinedIcon />
          </div>
        </div>
        <div className="qHeader__input">
          <SearchIcon />
          <input type="text" placeholder="Search Quora" />
        </div>
        <div className="qHeader__Rem">
          <div
            style={{
              border: "1px solid lightgray",
              borderRadius: "50%",
            }}
            className="qHeader__avatar"
          >
            <Avatar
              onClick={handleLogout}
              className="Avatar"
              src={
                "http://tinygraphs.com/labs/isogrids/hexa16/tinygraphs?theme=heatwave&numcolors=4&size=220&fmt=svg"
              }
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
          <Modal
            open={IsmodalOpen}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            closeIcon={Close}
            closeOnOverlayClick={false}
            center
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className="modal__title">
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className="modal__info">
              <Avatar
                className="avatar"
                src={
                  "http://tinygraphs.com/labs/isogrids/hexa16/tinygraphs?theme=heatwave&numcolors=4&size=220&fmt=svg"
                }
              />
              {/* <img src="http://tinygraphs.com/squares/helloworld" /> */}
              {/* <p>{user?.disPlayName ? user?.disPlayName : user?.email} asked</p> */}
              <div className="modal__scope">
                <PeopleAltOutlinedIcon />
                <p>Public</p>
                <ExpandMore />
              </div>
            </div>
            <div className="modal__Field">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Start your question with 'What', 'How', 'Why', etc. "
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                className="modal__fieldLink"
              >
                {/* <Link /> */}
                <input
                  style={{
                    width: "100%",
                    margin: "5px 0",
                    border: "1px solid lightgray",
                    padding: "10px",
                    outline: "2px solid #000",
                  }}
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  type="text"
                  placeholder="Optional: inclue a link that gives context"
                ></input>
                {inputUrl !== "" && (
                  <img style={{
                    height: "40vh",
                    objectFit: "contain"
                  }} src={inputUrl} alt=""></img>
                )}
              </div>
            </div>
            <div className="modal__buttons">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="sumbit" onClick={handleQuestion} className="add">
                Add Question
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default QHeader;
