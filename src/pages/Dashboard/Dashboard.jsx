import React from "react";
import Sidebarv2 from "../../components/Sidebar/Sidebarv2"
import "./Dashboard.css"
import MainDiv from "../../components/Memberships/MainDiv";
import Common from "../../components/js/Common";
import { log } from "three/examples/jsm/nodes/Nodes.js";
import { useState, useEffect } from 'react';


const Dashboard = () => {
    const [userData, setUserData] = useState([]);
    const common=new Common(setUserData)

    useEffect(() => {
        common.getUserData()
      }, []); 
    
    return (
        <div className="layout">
            <div className="content1">
                <Sidebarv2/>
            </div>
            <div className="content2">
                <MainDiv userData={userData}/>
            </div>
        </div>
    )
    
}

export default Dashboard;