import logo from './logo.svg';
import './App.css';
import { Col, Row } from 'antd';
import TweetFeed from './components/TweetFeed';
import { Provider } from "react-redux";
import store from './store';

function App() {
  return (
    <div className="App">
      <Row>
        <Provider store={store}>
        <Col span={24}>
        Tweets
        <TweetFeed/>
      </Col>
        </Provider>
      
      </Row>
    </div>
  );
}

export default App;
