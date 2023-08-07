"use client";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

const PostPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const cookieAccessToken = Cookie.get("accessToken");

  const url = "http://localhost:3001/getjobs";
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          authorization: `Bearer ${cookieAccessToken}`,
        },
      })
      .then((response) => {
        const data = response.data;
        if (!data.error) {
          setPosts(data);
        } else {
          router.push("/login");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [cookieAccessToken, router]);

  console.log(posts);

  return <div>PostPage</div>;
};

export default PostPage;
