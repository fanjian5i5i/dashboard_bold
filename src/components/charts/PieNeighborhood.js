import React from 'react';
import {Pie} from 'react-chartjs-2';

const data = {
	labels: ["South End", "Dorchester", "Downtown", "Allston", "East Boston"],
	datasets: [{
	  label: "Population",
	  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
	  data: [14,100,23,15,60]
	}]
  }

const options ={
		title: {
		  display: true,
		  text: 'Bold projects by neighborhoods'
		},
		layout: {
            padding: {
                left: 0,
                right: 0,
                top: 10,
                bottom: 0
            }
		},
		legend: {
            display: true,
            labels: {
                // fontColor: 'rgb(255, 99, 132)'
			},
			position:'left'
        }
}

function PieChart(props){
    return (
        
        <Pie data={data} options={options}/>
      
    )
}
export default PieChart;
