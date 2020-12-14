import React, { useEffect, useReducer } from "react";
import Tweet from "./Tweet";
import { io } from 'socket.io-client';
import { Grid, Switch, Row } from 'antd';
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import { connect } from 'react-redux';
import { getData } from './../actions';

const DONALD='realDonaldTrump'
const HILLARY='HillaryClinton'

const TweetFeed = ({tweets,getArticle}) => {
  const [isWaiting, setisWaiting] = React.useState(true)
  const [isHillary, setisHillary] = React.useState(false)
  const [paginate,setPaginate] =React.useState(0);
  
  
  const streamTweets = async (paginate) => {
    getArticle(isHillary?HILLARY:DONALD)
    setisWaiting(false)
  };

  const waitingMessage = () => {
    const message = {
      title: "Still working",
      detail: "Waiting for new Tweets to be posted",
    };

    if (isWaiting) {
      return (
        <React.Fragment>
          <div>
            <ErrorMessage
              key={message.title}
              error={message}
              styleType="success"
            />
          </div>
          <Spinner />
        </React.Fragment>
      );
    }
  };

  useEffect(() => {
    streamTweets();
  }, [isHillary]);

  const onChange=(condition)=>{
    setisHillary(!condition);
  }

  const showTweets = () => {
    if (tweets && tweets.length > 0) {
      return (
        <React.Fragment>
          {tweets.map((tweet) => {
            
            return<Tweet key={tweet.id} json={tweet} />
    })}
        </React.Fragment>
      );
    }
  };

  return (
    <div>
       <Row justify="center" style={{marginVertical:8}}>
         <span style={{marginRight:8}}> Hillary </span> <Switch defaultChecked onChange={onChange} /> <span style={{marginLeft:8}}>Trump</span>
      </Row>
      {waitingMessage()}
      {showTweets()}
    </div>
  );
};

const mapStateToProps = (state) => (
  { tweets: state.articles }
)

const mapDispatchToProps = (dispatch) => (
  { getArticle: article => dispatch(getData(article))}
)

export default connect(mapStateToProps, mapDispatchToProps)(TweetFeed);
