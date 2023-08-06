"use client";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const cookieAccessToken = Cookie.get("accessToken");

  useEffect(() => {
    fetch("http://localhost:3001/getjobs", {
      method: "GET",
      headers: {
        authorization: `Bearer ${cookieAccessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  console.log(posts);

  return <div>PostPage</div>;
};

export default PostPage;
