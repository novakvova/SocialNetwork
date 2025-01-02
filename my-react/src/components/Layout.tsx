import React from "react";
import Navbar from "./Navbar.tsx";
import { Outlet } from "react-router";

const App: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-1 p-6 md:px-12 lg:px-20">
                <Outlet />
            </div>
        </div>
    );
};

export default App;