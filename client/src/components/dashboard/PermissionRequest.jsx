import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from '@mui/material/Button';
import axios from "axios";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const handleReqChange = (prop) => async() => {
    console.log(prop);
      const result = await axios.post("http://localhost:8080/api/admin/changeReq",{type:prop.type, user:prop.user});
      console.log(result);

      if(result.data.success){
        setTimeout(() => {
          props.fetchData();
        }, 600);
      }
  } 

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.req.username}
        </TableCell>
        <TableCell align="center">{row.user[0].timestamp.split('T')[0]}</TableCell>
        <TableCell align="center">{row.req.current_status}</TableCell>
        <TableCell align="center">{row.req.permission_asked}</TableCell>
        <TableCell align="center"><Button variant="contained" onClick={handleReqChange({type:"accept",user:row.user[0]})} >Accept</Button></TableCell>
        <TableCell align="center"><Button variant="contained" onClick={handleReqChange({type:"decline",user:row.user[0]})} style={{backgroundColor: "#d9534f"}}>Decline</Button></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" style={{color:"#014988"}}>
                More Info
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{fontSize:"16px",color:"#014988"}}>First Name</TableCell>
                    <TableCell align="center" style={{fontSize:"16px",color:"#014988"}}>Last Name</TableCell>
                    <TableCell align="center" style={{fontSize:"16px",color:"#014988"}}>Country of Origin</TableCell>
                    <TableCell align="center" style={{fontSize:"16px",color:"#014988"}}>Date of Birth</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.user.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      
                      <TableCell align="center">
                        {historyRow.Fname}
                      </TableCell>
                      <TableCell align="center">{historyRow.Lname}</TableCell>
                      <TableCell align="center">{historyRow.country}</TableCell>
                      <TableCell align="center">
                        {historyRow.DOB.split('T')[0]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function PermissionRequest(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{fontSize:"18px",color:"#014988"}}>Username</TableCell>
            <TableCell align="center" style={{fontSize:"18px",color:"#014988" }}>User&nbsp;Since</TableCell>
            <TableCell align="center" style={{fontSize:"18px",color:"#014988"}}>Current&nbsp;Status</TableCell>
            <TableCell align="center" style={{fontSize:"18px",color:"#014988"}}>Permission&nbsp;Asked</TableCell>
            <TableCell align="center" style={{fontSize:"18px",color:"#014988"}}>Grant</TableCell>
            <TableCell align="center" style={{fontSize:"18px",color:"#014988"}}>Decline</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.requests.map((row) => (
            <Row key={row.name} fetchData={props.fetchData} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
