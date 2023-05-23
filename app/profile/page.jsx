"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@component/profile";
const MyProfile = () => {
  const [myPost, setMyPost] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);

      const data = await response.json();
      setMyPost(data);
    };
    if (session?.user.id) {
      fetchPost();
    }
  }, [session?.user.id]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filterPosts = myPost.filter((p) => p._id !== post._id);
        setMyPost(filterPosts);
      } catch (error) {}
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized page "
      data={myPost}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
