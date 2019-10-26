import React from 'react';
import {Pie} from 'react-chartjs-2';

const data = {
	labels: [
		'Available',
		'Hold',
		'Conveyed'
	],
	datasets: [{
		data: [120, 50, 20],
		backgroundColor: [
			'#36A2EB',
			'#FFCE56',
			'#FF6384'
		],
		hoverBackgroundColor: [
			'#36A2EB',
			'#FFCE56',
			'#FF6384'
		]
	}]
};

const options ={
		title: {
		  display: true,
		  text: 'Bold projects by status'
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
