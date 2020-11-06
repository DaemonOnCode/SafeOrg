import React, { Component } from 'react';
import styles from './ReportCard.module.css';


class ReportCard extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props)
      }
    dailyVals(){
      // if(this.props.key==undefined)
      //   return null;
      console.log(this.props)
      return(<div>{this.props.data}</div>);
    }
      render(){
          return(
            <div className={styles.heroCard}>
                <div className={styles.container}>
                    <div className="black-text base-text medium-text"  style={{fontWeight: "600"}}>Daily Compliance Report</div>
                    <div  className={`${styles.subText} black-text base-text medium-text`} style={{fontWeight: "400"}} >Social distancing</div>
                    {this.dailyVals()}
                </div>
            </div>
          )
      }
    }
    export default ReportCard;