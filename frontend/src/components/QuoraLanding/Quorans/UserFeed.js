import React, { useEffect, useState } from "react";
// import QuorBox from "./QuorBox";
import "../Feed.css";
import Post from "./UserPost";
import axios from "axios";
import { token } from "../../../Utils/decodedToken";
import {useSelector} from 'react-redux'

function UserFeed() {
  const [posts, setPosts] = useState([]);
  const userLogin = useSelector((state) => state.userLogin)

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    if (token !== "") {
      axios.get(`/api/questions/${userLogin?.userInfo?.userId}`, config).then((res) => {
        setPosts(res.data.reverse());
        console.log(res.data);
      });
    }
  }, [userLogin]);
  return (
    <div className="feed">
        {
            posts.length ? <h2 style = {{
                margin: "10px 0"
            }}>My Feed</h2> : (<><h3 style = {{
              margin: "10px 30px"
          }}>Alas! Stomach empty</h3>
          <img style = {{
        //   padding: '20px',
        margin: "10px 30px",
          borderRadius: "10px",
          boxShadow: '2px 2px 12px lightgray'
      }} width = {600} src = 'https://image.freepik.com/free-vector/empty-concept-illustration_114360-1188.jpg' alt = 'no question' />
          </>)
        }
      {posts.map((_post) => (
        <Post
          key={_post._id}
          questionId={_post._id}
          question={_post.questionName}
          imageUrl={_post.questionUrl}
          timestamp={_post.createdAt}
          users={_post.userDetails[0]}
          answers={_post.allAnswers}
          length = {posts.length}
        />
      ))}
    </div>
  );
}

export default UserFeed;
