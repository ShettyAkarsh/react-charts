import React, { useEffect, useState } from "react";
import records from "../Data.json";
import BarChart from "./Bar";
import BuildFilters from "./Filters";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


export default function App() {

    const [chartData, SetChartData] = useState([]);
    const [jiraStatus, setJiraStatus] = useState([]);
    const [jiraType, setJiraType] = useState([]);
    const [jiraPriority, setJiraPriority] = useState([]);
    let jiraUsers = [];
    const statusLabel = "Status";
    const typeLabel = "Type";
    const priorityLabel = "Priority";
    
    function TotalTickets(name, statuses,types,priorities) {
        let assigneeList;
        console.log(statuses);
        console.log(types);
        console.log(priorities);

        if (statuses != undefined && types != undefined && priorities != undefined) {   
         assigneeList = records.records.filter((jira) => jira.assignee === name && statuses.includes(jira.status) && 
                        types.includes(jira.issue_type) && priorities.includes(jira.priority));
        } else if (statuses != undefined && types != undefined){
         assigneeList = records.records.filter((jira) => jira.assignee === name && statuses.includes(jira.status) && 
                        types.includes(jira.issue_type));
        } else if (statuses != undefined && priorities != undefined) {
         assigneeList = records.records.filter((jira) => jira.assignee === name && statuses.includes(jira.status) && 
                        priorities.includes(jira.priority));
        } else if (types != undefined && priorities != undefined) {
         assigneeList = records.records.filter((jira) => jira.assignee === name && types.includes(jira.issue_type) && 
                        priorities.includes(jira.priority));
        } else if (statuses != undefined ) {
         assigneeList = records.records.filter((jira) => jira.assignee === name && statuses.includes(jira.status));
        } else if (types != undefined) {
         assigneeList = records.records.filter((jira) => jira.assignee === name && types.includes(jira.issue_type));   
        } else if (priorities != undefined) {
          assigneeList = records.records.filter((jira) => jira.assignee === name && priorities.includes(jira.priority));
        } else if (statuses == undefined && types == undefined && priorities == undefined) {
         assigneeList = records.records.filter((jira) => jira.assignee === name );
        }

        return assigneeList.length;
    }

    const filterData = (array, key) => {
        (jiraUsers.length > 0) ? jiraUsers = [] : undefined;
        jiraUsers = [...new Map(array.map((x) => [x[key], x])).values()];
    }

    const filterStatus = (array, key) => {
        setJiraStatus([...new Map(array.map((x) => [x[key], x])).values()]);
    }

    const filterType = (array, key) => {
        setJiraType([...new Map(array.map((x) => [x[key], x])).values()]);
    }

    const filterPriority = (array, key) => {
        setJiraPriority([...new Map(array.map((x) => [x[key], x])).values()]);
    }

    const populateFilters = () => {
        filterStatus(records.records, 'status');
        filterType(records.records, 'issue_type');
        filterPriority(records.records, 'priority');
    }
 
    const populateData = (statuses,types,priorities) => {
       filterData(records.records, 'assignee');
       SetChartData({
           labels: jiraUsers.map((jira) => jira.assignee),
           datasets: [{
               label: "Tickets",
               data: jiraUsers.map((jira) =>  TotalTickets(jira.assignee,statuses,types,priorities) )
           }]
       })
    }

    const handleFilters = () => {
       const statusValues = document.getElementById("demo-mutiple-checkbox-Status").value;
       const typeValues = document.getElementById("demo-mutiple-checkbox-Type").value;
       const priorityValues = document.getElementById("demo-mutiple-checkbox-Priority").value;
       
       if (statusValues != "" && typeValues != "" && priorityValues != "") {
          populateData(statusValues.split(','),typeValues.split(','),priorityValues.split(','));
       } else if (statusValues != "" && typeValues != "") {
          populateData(statusValues.split(','),typeValues.split(','), undefined);
       } else if (statusValues != "" && priorityValues != "") {
          populateData(statusValues.split(','),undefined, priorityValues.split(','));
       } else if (typeValues != "" && priorityValues != "") {
          populateData(undefined,typeValues.split(','),priorityValues.split(','));
       } else if(statusValues != "") {
          populateData(statusValues.split(','), undefined, undefined);
       } else if(typeValues != "") {
          populateData(undefined, typeValues.split(','), undefined);
       } else if(priorityValues != "") {
         populateData(undefined, undefined, priorityValues.split(','));
       } else {
          populateData();
       }
    }

    useEffect(() => {
        populateFilters();
        populateData();
    }, [])

    return (
        <div>    
          <BarChart chartData={chartData} />   
          <div style={{"marginLeft":"100px", "paddingTop":"10px", "display":"inline-block"}}>
            <label>Filters</label>
            <div>
              <BuildFilters filterValues={jiraStatus} filterName={statusLabel} />
            </div>
            <div style={{"display":"inline", "float":"right"}}>
               <BuildFilters filterValues={jiraType} filterName={typeLabel} />
            </div>
            <BuildFilters filterValues={jiraPriority} filterName={priorityLabel} />
            <Button variant="contained" color="primary" onClick={handleFilters}>
              Apply
            </Button>
          </div>  
        </div>
    )
}

