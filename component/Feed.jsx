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
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResult, setSearchedResult] = useState([]);

  const [searchText, setSearchText] = useState("");

  const filterPrompt = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPost.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompt(e.target.value);
        setSearchedResult(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompt(tagName);
    setSearchedResult(searchResult);
  };
  const fetchPost = async () => {
    const response = await fetch("/api/prompt");

    const data = await response.json();
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

      {searchText ? (
        <PromptCardList data={searchedResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPost} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
