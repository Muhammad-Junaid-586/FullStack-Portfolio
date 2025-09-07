"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import AddProjectFormAdmin from "./AddProjectFormAdmin";
import LatestProjects from "../LatestProject";

export default function MainContent() {
  const [activeTab, setActiveTab] = useState("addProject");

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="flex-1 p-6 bg-gray-100">
        {activeTab === "addProject" && <AddProjectFormAdmin />}
        {activeTab === "projectList" && <LatestProjects />}
      </div>
    </div>
  );
}