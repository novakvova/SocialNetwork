import React from "react";
import NewsFeed from "../components/NewsFeed";
import { Col, Row } from "antd"
import SideIntro from "../components/SideIntro";


const Home: React.FC = () => {
    return (
        <div>
            <Row>
                  <Col span={8}>
                    <SideIntro/>
                  </Col>
                  <Col span={8}>
            <NewsFeed /> 
            </Col>
                  <Col span={8}>
                  </Col>
                </Row>
        </div>
        
    );
};

export default Home;
