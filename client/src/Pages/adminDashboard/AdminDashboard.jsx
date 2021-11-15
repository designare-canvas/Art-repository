import React,{useState, useEffect} from 'react'
import Navbar from "../../components/navbar/Navbar";
import Dashboard from "../../components/dashboard/dashboardmain";
import axios from 'axios';

function Dashboardpage() {

    const [requests,setRequests] = useState([]);
    const [users,setUsers] = useState({});

    const fetchData = async () => {
        const result1 = await axios.get("http://localhost:8080/api/admin/allusers",{withCredentials:true});
        console.log(result1);

        if (result1.data.success) {
            setRequests(result1.data.data);
          }

        const result2 =  await axios.get("http://localhost:8080/api/admin/requests",{withCredentials:true});
        console.log(result2);

        if (result2.data.success) {
            setUsers(result2.data.data);
          }
    }

    useEffect(() => {
       fetchData();
    }, []);

    return (
        <div >
        
            <Navbar />
           <Dashboard requests={requests} users={users} />
        </div>
    )
}

export default Dashboardpage
