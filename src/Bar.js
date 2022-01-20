import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart({chartData}) {
   return (
       <div>
         {(chartData.length != 0)
         ?
         <Bar
           data= {chartData}
           options={{
            plugins: {
              title: {
                display: true,
                text: "Jira Tasks"
              },
              legend: {
                display: true,
                position: "left"
             }
            }
          }}
         />
         :
         <div>Loading Bar Chart Data..</div> }
       </div>
   )
}