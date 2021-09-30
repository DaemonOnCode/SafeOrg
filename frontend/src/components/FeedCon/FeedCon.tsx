import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import Feeds from "../Feed/Feed";
import { getData, getUrl } from "../../http";

class FeedCon extends Component {
  constructor(props) {
    super(props);
    //create the array here;
    this.state = {
      data: null,
    };
    this.setListState = this.setListState.bind(this);
    const targetUrl = getUrl("events/daily_feed");
    getData(targetUrl, this.setListState);
  }
  setListState(data) {
    console.log(data);
    this.setState({ data: data });
  }
  fetchFeed() {
    let finalJsx = [];
    if (this.state.data != null) {
      console.log(this.state.data.data);
      const feedData = this.state.data.data.reverse();
      feedData.forEach((element) => {
        console.log(element);
        finalJsx.push(<Feeds data={element}></Feeds>);
        console.log(finalJsx);
      });
      const jsx = <div>{finalJsx}</div>;
      return jsx;
    }
    return "<div></div>";
  }
  createList() {
    return this.fetchFeed();
  }
  render() {
    return this.createList();
  }
}
export default FeedCon;
