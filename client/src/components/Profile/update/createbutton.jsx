import React,{useContext} from "react";
import Link from "@material-ui/core/Link";
import Button from "@mui/material/Button";
import axios from "axios";
import { AuthContext } from "../../../Context/Authcontext";
import { useHistory } from "react-router-dom";

function CreateUpdateBtn(params) {
  const { user, isAdmin } = useContext(AuthContext);
  let history = useHistory();

  const handleDelete = async () => {
    const result = await axios
      .delete(
        "http://localhost:8080/api/user/" + user.username,
        {data:{ user: user, isAdmin: isAdmin }},
        { withCredentials: true }
      )
      .catch((err) => console.log(err));
    if(result){
      if(result.data.success){
        const result = await axios.get("http://localhost:8080/api/auth/logout",{withCredentials:true}).catch(Err => console.log(Err));
        if(result.data.success){
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("isAdmin");
          history.push("/");
          window.location.reload(); 
        }
      }else alert(result.data.messsage);
    }
  };
  return (
    <div>
      <Button className="btn" variant="outlined">
        <Link
          href="/upload"
          // style={{ color: "#22577A", marginLeft: "5px" }}
          underline="none"
        >
          Create Post
        </Link>
      </Button>
      <Button className="btn" variant="outlined">
        <Link
          href="/updateProfile"
          // style={{ color: "#22577A", marginLeft: "5px" }}
          underline="none"
        >
          Update Profile
        </Link>
      </Button>
      <Button style={{color:"red"}} className="btn" variant="outlined" onClick={handleDelete}>
        Delete Account
      </Button>
    </div>
  );
}
export default CreateUpdateBtn;
