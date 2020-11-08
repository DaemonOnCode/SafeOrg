import React, { Component } from 'react';
import styles from './Charts.module.css';
import {Line} from 'react-chartjs-2';


class Charts extends React.Component{
    data ={}
    type = 0
    constructor(props) {
        super(props);
        console.log(this.props)
        this.type = parseInt(this.props.type);
        this.data = {
          labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
          datasets: [
            {
              label: (this.type == 0)? "Masks event trend over days":"SD trend over days",
              fill: false,
              lineTension: 0.5,
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: [86,114,106,106,107,111,133,221,783,2478]
            }
          ]
        }

         
      }
      render(){
          return(
            <div className={styles.chartCon}>
                <Line
                  data={this.data}
                  options={{
                    title:{
                      display:true,
                      text:(this.type == 0)? "Masks event trend over days":"SD trend over days",
                      fontSize:20
                    },
                    legend:{
                      display:true,
                      position:'right'
                    }
                  }}
                />
            </div>
          )

      }
    }
    export default Charts;