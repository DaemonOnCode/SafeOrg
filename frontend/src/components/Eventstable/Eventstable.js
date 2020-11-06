import React, { Component } from 'react';
import styles from './Eventstable.module.css';

class Eventstable extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props)
      }
      render(){
            return(
                <div className={styles.tableCon}>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>EVENT</th>
                            <th>TIMESTAMP</th>
                            <th>VIDEO_ID</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            )
      }
    }
    export default Eventstable;