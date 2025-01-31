import React from "react";
import Navbar from "./Navbar.tsx";

import {ComponentFooter} from "./Footer.tsx"
import { Outlet } from "react-router";
;


const App: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            {/* <Row>
                  <Col span={8}>
                    <SideIntro/>
                  </Col>
                  <Col span={8}> */}
            <div className="flex-1 p-6 md:px-12 lg:px-15">
                <Outlet />
            </div>
            {/* </Col>
                  <Col span={8}>
                  </Col>
                </Row> */}
            <ComponentFooter/> 
        </div>
    );
};

export default App;