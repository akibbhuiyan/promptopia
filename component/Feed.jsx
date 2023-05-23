"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPost, setAllPost] = useState([]);
  console.log(allPost);

  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e) => {};
  const fetchPost = async () => {
    const response = await fetch("/api/prompt");

    const data = await response.json();
    console.log(data);
    setAllPost(data);
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={allPost} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;