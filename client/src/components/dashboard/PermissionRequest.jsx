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

function createData(name, calories, fat, carbs, protein, price,x) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,x,
    history: [
      {
        Fname:"Akash",
        Lname:"Singh",
        country:"India",
        dob: "2020-01-05",
      }
    ]
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
          {row.name}
        </TableCell>
        <TableCell align="center">{row.calories}</TableCell>
        <TableCell align="center">{row.fat}</TableCell>
        <TableCell align="center">{row.carbs}</TableCell>
        <TableCell align="center"><Button variant="contained">Accept</Button></TableCell>
        <TableCell align="center"><Button variant="contained" style={{backgroundColor: "#d9534f"}}>Decline</Button></TableCell>
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
                    {/* <TableCell>Discription</TableCell> */}
                    <TableCell align="center" style={{fontSize:"16px",color:"#014988"}}>Country of Origin</TableCell>
                    <TableCell align="center" style={{fontSize:"16px",color:"#014988"}}>Date of Birth</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      
                      <TableCell align="center">
                        {historyRow.Fname}
                      </TableCell>
                      <TableCell align="center">{historyRow.Lname}</TableCell>
                      <TableCell align="center">{historyRow.country}</TableCell>
                      <TableCell align="center">
                        {historyRow.dob}
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

const rows = [
  createData("Frozen yoghurt", "ghghghjgjhghghjgjhkjkhk", 6.0, 24, 4.0, 3.99,0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99,0),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79,0),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5,0),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5,0)
];

export default function PermissionRequest() {
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
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
