"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@component/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);

      const data = await response.json();
      setUserPost(data);
    };
    if (params.id) {
      fetchPost();
    }
  }, [params.id]);
  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized page Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPost}
    />
  );
};

export default UserProfile;
