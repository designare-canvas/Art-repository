import React from "react"
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CategoryIcon from '@mui/icons-material/Category';

function ApplyNow(){
    return (
        <div id="applynow" style={{textAlign:"center",margin:"2vw",width:"20vm"}}>


              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <CategoryIcon style={{ fontSize: "100px", color: "#22577A" }} />
                  <h3 style={{ fontSize: "25px", margin: "10px" }}>Upload your first shot</h3>
                  <h3>Apply Now and Become a Artist</h3>
                </CardContent>

                <Button variant="contained" style={{ marginBottom: "10px" }} >Apply Now</Button>

              </Card>
            </div>
    );
}
export default ApplyNow;