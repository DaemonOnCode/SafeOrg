import React, { Component } from 'react';
import styles from './Admin.module.css';
import ReportCard from './../ReportCard/ReportCard';
import Charts from './../Charts/Charts';
import Eventstable from './../Eventstable/Eventstable';

class Admin extends React.Component{
  value = 1000; 
    constructor(props) {
        super(props);
      }
      
      render(){
        
        return(
          <div className={styles.mainCon}>
              <div className={`${styles.topBar} primary`}>
                <div className={`${styles.title} white-text base-text pointer big-text`}>SafeOrg</div>
                <div className={styles.actionItems} >
                <div className="small-btn primary" style={{marginRight:"1.5rem", backgroundColor: "transparent"}}>
                  <div className="small-btn">
                    <div className="white-text base-text small-text">Log Out</div>
                  </div>
                </div>
                </div>
              </div>
              <div className={styles.reportCon}>
              <ReportCard data={this.value}>
                    
              </ReportCard>
              <ReportCard>

              </ReportCard>
              <ReportCard>

              </ReportCard>
              <ReportCard>

              </ReportCard>
              </div>
              <div className={styles.chartMain}>
                <div><Eventstable></Eventstable></div>
                <div>
                  <Charts></Charts>
                  <Charts></Charts>
                </div>
                
              </div>
          </div>
        )
      }
    }
    export default Admin;