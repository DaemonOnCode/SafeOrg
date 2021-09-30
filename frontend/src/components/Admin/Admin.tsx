import React, { Component } from "react";
import styles from "./Admin.module.css";
import ReportCard from "../ReportCard/ReportCard";
import Charts from "../Charts/Charts";
import FeedCon from "../FeedCon/FeedCon";
import { getData, getUrl } from "../../http";

class Admin extends Component {
  value = 1000;
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
    };
    this.setChartData = this.setChartData.bind(this);
    const targetUrl = getUrl("events/analysed_data");
    getData(targetUrl, this.setChartData);
  }

  setChartData(chartData) {
    console.log(chartData);
    this.setState({ chartData: chartData });
  }

  logout() {
    window.location.href = "/";
  }

  render() {
    return (
      <div className={styles.mainCon}>
        <div className={`${styles.topBar} primary`}>
          <div
            className={`${styles.title} white-text base-text pointer big-text`}
          >
            SafeOrg{" "}
          </div>
          <div className={styles.actionItems}>
            <div
              className="small-btn primary"
              style={{ marginRight: "1.5rem", backgroundColor: "transparent" }}
            >
              <div onClick={this.logout} className="small-btn pointer">
                <div className=" white-text base-text small-text">Log Out</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.reportCon}>
          <ReportCard type="0" timeline="0"></ReportCard>
          <ReportCard type="0" timeline=""></ReportCard>
          <ReportCard type="1" timeline="0"></ReportCard>
          <ReportCard type="1" timeline="1"></ReportCard>
        </div>
        <div className={styles.miscCon}>
          <div style={{ maxHeight: "30rem", overflowY: "scroll" }}>
            {" "}
            <FeedCon></FeedCon>{" "}
          </div>
          <div className={styles.chartCon}>
            <Charts type="0" chartData={this.state.chartData}></Charts>
            <Charts type="1" chartData={this.state.chartData}></Charts>
          </div>
        </div>
      </div>
    );
  }
}
export default Admin;
