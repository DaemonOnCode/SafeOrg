import React, { Component } from "react";
import styles from "./ReportCard.module.css";
import AnimatedNumber from "animated-number-react";
import { getData, getUrl } from "../../http";

class ReportCard extends Component {
  heading_subpt1 = "";
  heading_subpt2 = "";
  heading = "";
  trendVal = 22;
  diffPc = -6;
  pathCount = "";
  pathDiff = "";
  constructor(props: { type: string; timeline: string }) {
    super(props);
    console.log(this.props);
    if (this.props.type === "0") this.heading_subpt2 = "Mask Tally";
    else this.heading_subpt2 = "Social Distancing Tally";
    if (this.props.timeline === "0") this.heading_subpt1 = "Daily";
    else this.heading_subpt1 = "Weekly";
    this.heading = this.heading_subpt1 + " " + this.heading_subpt2;
    this.trendVal = Math.random() * 100;
    this.diffPc += Math.random() * 10;
    this.dangerMark = false;
    this.positiveTrend = false;
    if (this.trendVal > 20) this.dangerMark = true;
    if (this.diffPc > 0) this.positiveTrend = true;
    this.state = {
      trendVal: 0,
      dangerMark: false,
      diffPc: 0,
      positiveTrend: false,
    };
    if (this.props.type == "0") {
      this.pathCount = "events/weekly_events?type=mask";
      this.pathDiff = "events/daily_increment?type=mask";
    } else {
      this.pathCount = "events/weekly_events?type=social_distancing";
      this.pathDiff = "events/daily_increment?type=social_distancing";
    }
    this.setCount = this.setCount.bind(this);
    let targetUrl = getUrl(this.pathCount);
    getData(targetUrl, this.setCount);

    this.setDiff = this.setDiff.bind(this);
    targetUrl = getUrl(this.pathDiff);
    getData(targetUrl, this.setDiff);
  }

  setCount(response) {
    this.setState({
      trendVal: response.data.length,
      dangerMark: response.data.length > 20,
    });
  }

  setDiff(response) {
    this.setState({ diffPc: response.data, positiveTrend: response.data > 0 });
  }

  dailyVals() {
    // if(this.props.key==undefined)
    //   return null;
    console.log(this.props);
    return <div>{this.props.data}</div>;
  }
  formatValue = (value) => {
    //console.log(value)
    // if(value> 20)
    //   this.setState({dangerMark: true});
    return value.toFixed(0);
  };

  render() {
    return (
      <div className={styles.heroCard}>
        <div className={styles.cardItemsContainer}>
          <div
            className="black-text base-text medium-text"
            style={{ marginTop: "1rem" }}
          >
            {this.heading}
          </div>
          <AnimatedNumber
            className={
              this.state.dangerMark
                ? `${styles.animatedNum} black-text base-text big-text danger`
                : `${styles.animatedNum} black-text base-text big-text safe`
            }
            duration="1500"
            value={this.state.trendVal}
            formatValue={this.formatValue}
          ></AnimatedNumber>
          <div className="black-text base-text small-text">
            Occurences of potentially risky event(s)
          </div>
          <div
            className="secondary base-text small-text heavy"
            style={{ marginTop: "2rem" }}
          >
            <AnimatedNumber
              className={
                this.state.positiveTrend
                  ? `medium-text heavy danger`
                  : ` medium-text heavy safe`
              }
              duration="2000"
              value={this.state.diffPc}
              formatValue={this.formatValue}
            ></AnimatedNumber>
            {`${
              this.state.positiveTrend ? " increased cases" : " decreased cases"
            }`}
          </div>
        </div>
      </div>
    );
  }
}
export default ReportCard;
