import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import "./QuoraBox.css";

export default function QuorBox() {
  // const user = useSelector(selectUser);

  return (
    <div className="quoraBox">
      <div className="quoraBox__info">
        <Avatar
          src={
            "http://tinygraphs.com/labs/isogrids/hexa16/tinygraphs?theme=heatwave&numcolors=4&size=220&fmt=svg"
          }
          className="quoraBox__infoAvatar"
        />
        {/* <h5>{user?.displayName ? user?.displayName : user?.email}</h5> */}
      </div>
      <div className="quoraBox__quora">
        <p>What is your question or link?</p>
      </div>
    </div>
  );
}
