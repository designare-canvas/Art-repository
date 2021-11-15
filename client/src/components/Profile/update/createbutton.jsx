import React from "react";
import Link from "@material-ui/core/Link";
import Button from "@mui/material/Button";

function CreateUpdateBtn(params){
return(
    <div>
        <Button className="btn" variant="outlined"><Link
                href="/upload"
                // style={{ color: "#22577A", marginLeft: "5px" }}
                underline="none"
              >
                Create Post
              </Link></Button>
              <Button className="btn" variant="outlined"><Link
                href="/updateProfile"
                // style={{ color: "#22577A", marginLeft: "5px" }}
                underline="none"
              >
                Update Profile
              </Link></Button>
    </div>
);
}
export default CreateUpdateBtn;