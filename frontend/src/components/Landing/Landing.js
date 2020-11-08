import styles from './Landing.module.css'
import React, { Component } from 'react';
import covid from '../../assests/covid19.png';
import analysis from '../../assests/hero-a.svg';
import mask from '../../assests/mask.svg';
import social from '../../assests/socialdis.svg';
import {
    Link
  } from "react-router-dom";



class Landing extends React.Component{
    constructor() {
        super();
      }
    render(){
        return (
       
        <div className={styles.mainCon}>
            
                <div className={`${styles.topBar} primary`}>
                    <div className={`${styles.title} white-text base-text pointer big-text`}>SafeOrg</div>
                    <div className={styles.actionItems} >
                        <div className="small-btn primary" style={{marginRight:"1.5rem", backgroundColor: "transparent"}}>
                            <Link to="/admin">
                            <div className="white-text base-text small-text">Log In</div>
                            </Link>
                        </div>
                        <div className="small-btn">
                            <Link to="/">
                            <div className="white-text base-text small-text">Sign Up</div>
                            </Link>
                        </div>
                    </div>
                </div>
                
            <div className={`${styles.introCon} primary`} >
                <div className={styles.heroLine} >
                   <div className={`white-text base-text big-text`}>SafeOrg monitors Covid safety compliance at your organisation.</div>
                   <div className={`white-text base-text medium-text`} style={{marginTop: "1rem"}}>SafeOrg's real-time video stream analysis helps you in keeping your organisation safe by giving you real-time notifcations and analysis reports.</div>
                </div>
                <div>
                    <img className={styles.mobileSize} src={covid} />
                </div>
            </div>
            <div className={styles.analysisCon}>
                <img className={styles.mobileSize}src={analysis}></img>
                <div className={styles.text}>
                <div className={`${styles.analysisText} black-text base-text big-text`} style={{fontWeight: "600"}} >Daily/Weekly Compliance Reports </div>
                <div className={`${styles.analysisText} black-text base-text `} style={{fontWeight: "480"}} >SafeOrg provides daily compliance reports with complete analysis and real-time alerts for dangerous events.  </div>
                </div>
            </div>
            <div className={styles.feat}>
                <div className={styles.socialText}>
                <div className={` black-text base-text big-text`} style={{fontWeight: "600"}} >Social distancing Real time analysis </div>
                <div className={` black-text base-text `} style={{fontWeight: "480"}} >SafeOrg provides reports with complete analysis and real-time alerts for dangerous events. Our advanced ML Model recognizes events and alerts the admin for it. </div>
                </div>
                <img className={styles.socialImg} src={social}></img>
                 
            </div>
            <div className={styles.analysisCon}>
                <img className={styles.maskCon}src={mask}></img>
                <div className={styles.text}>
                <div className={`${styles.maskText} black-text base-text big-text`} style={{fontWeight: "600"}} >Real time Mask Detection </div>
                <div className={`${styles.analysisText} black-text base-text `} style={{fontWeight: "480"}} >SafeOrg gives real time Mask Detection and alerts admin about the number of defaulties in a day and the trend during this week.  </div>
                </div>
            </div>
        </div>
        );
    }
}
export default Landing;