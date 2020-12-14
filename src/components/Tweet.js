import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

const Tweet = ({ json }) => {
  const { id_str } = json;

  const options = {
    cards: "hidden",
    align: "center",
    width: "550",
    conversation: "none",
  };

  return <TwitterTweetEmbed options={options} tweetId={id_str} placeholder="Loading the tweet"  />;
};

export default Tweet;