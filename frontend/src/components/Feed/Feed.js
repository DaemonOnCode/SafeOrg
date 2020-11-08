import React, { Component } from 'react';
import styles from './Feed.module.css';
import 'semantic-ui-css/semantic.min.css'
import { Feed, FeedLabel, FeedSummary } from 'semantic-ui-react'

class Feeds extends React.Component{
    imgSrc= "";
    stmt="";
    constructor(props){
        super(props);
        console.log(props)
        this.imgSrc = (this.props.data.type == 0)? "https://www.flaticon.com/svg/static/icons/svg/3182/3182079.svg":"https://www.flaticon.com/svg/static/icons/svg/2949/2949689.svg";
        this.stmt = `A ${(this.props.data.type == 0)? "mask":"social distancing"} event occured, near camera no: ${(this.props.data.CAMID == null)? "NA": this.props.data.CAMID}`
        this.openVideo = this.openVideo.bind(this);
    }
    openVideo(){
        if(this.props.data.PATHURL == null)
            return;
        window.open(this.props.data.PATHURL, '_blank');
    }
    render(){
        return(
            <Feed className="pointer" onClick={this.openVideo}>
                <Feed.Event>
                    <Feed.Label image={this.imgSrc} />

                    <Feed.Content content={this.stmt} />
                    {/* <div style={{visibility: (this.props.data.PATHURL== null)? "hidden":"visible"}} onClick={this.openVideo(this.props.data.PATHURL)} className="link">Click Here</div> */}
                </Feed.Event>
            </Feed>
        )
    }
}
  
  export default Feeds;
  