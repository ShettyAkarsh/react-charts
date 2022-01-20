import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function BuildFilters(props) {
 
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const classes = useStyles();
const [filtersSelected, setFilters] = React.useState([]);
const handleChange = (event) => {
  setFilters(event.target.value);
};

const selectId = `demo-mutiple-checkbox-${props.filterName}`

const setFiltersMenu = (props) => {
    if (props.filterName === "Status") {
      return (props.filterValues.map((jira) => (
        <MenuItem key={jira.status} value={jira.status}>
          <Checkbox checked={filtersSelected.indexOf(jira.status) > -1} />
          <ListItemText primary={jira.status} />
        </MenuItem>
      )))
    } else if(props.filterName === "Type") {
      return (props.filterValues.map((jira) => (
        <MenuItem key={jira.issue_type} value={jira.issue_type}>
          <Checkbox checked={filtersSelected.indexOf(jira.issue_type) > -1} />
          <ListItemText primary={jira.issue_type} />
        </MenuItem>
      )))
    } else if(props.filterName === "Priority") {
      return (props.filterValues.map((jira) => (
        <MenuItem key={jira.priority} value={jira.priority}>
          <Checkbox checked={filtersSelected.indexOf(jira.priority) > -1} />
          <ListItemText primary={jira.priority} />
        </MenuItem>
      )))
    }
}

return (
    <div>  
        { (props.filterValues.length !=0) &&
           <FormControl className={classes.formControl}>
           <InputLabel id="demo-mutiple-checkbox-label">{props.filterName}</InputLabel>
           <Select
             labelId="demo-mutiple-checkbox-label"
             multiple
             value={filtersSelected}
             onChange={handleChange}
             input={<Input id={selectId}/>}
             renderValue={(selected) => selected.join(', ')}
             MenuProps={MenuProps}
           >
            {setFiltersMenu(props)}
           </Select>
         </FormControl>
        }
    </div>
 )
}