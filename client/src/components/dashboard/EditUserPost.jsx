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
import {Link} from "react-router-dom";

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
        <Link to={`/profile/${row.user.username}`} >
          {row.user.username}
        </Link>
        </TableCell>
        <TableCell align="center">{row.posts.length}</TableCell>
        <TableCell align="center">{row.user.timestamp.split('T')[0]}</TableCell>
        <TableCell align="center">{row.country}</TableCell>
        
        {/* <TableCell align="center"><Button variant="contained">Decline</Button></TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" style={{color:"#014988"}}>
                Posts
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{fontSize:"16px",color:"#014988"}}>Title</TableCell>
                    <TableCell align="center" style={{fontSize:"16px",color:"#014988"}}>Discription</TableCell>
                    {/* <TableCell>Discription</TableCell> */}
                    <TableCell align="center" style={{fontSize:"16px",color:"#014988"}}>View Post</TableCell>
                    {/* <TableCell align="right">Country of Origin</TableCell>
                    <TableCell align="right">Date of Birth</TableCell> */}
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.posts.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      
                      <TableCell align="center">
                        {historyRow.title}
                      </TableCell>
                      <TableCell align="center">{historyRow.description}</TableCell>
                      <TableCell align="center"><Link to={`/Post/${historyRow.id}`}> <Button variant="contained">View Post</Button></Link></TableCell>
                     
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

export default function EditUserPost(props) {
  console.log(props.users);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{fontSize:"18px",color:"#014988"}}>Username</TableCell>
            <TableCell align="center" style={{fontSize:"18px",color:"#014988"}}>No.&nbsp;of&nbsp;Post</TableCell>
            <TableCell align="center" style={{fontSize:"18px",color:"#014988"}}>User&nbsp;Since</TableCell>
            <TableCell align="center" style={{fontSize:"18px",color:"#014988"}}>Country&nbsp;of&nbsp;Origin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
