import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import AdminHome from "./pages/Admin/Home";
import { Analytics } from "@vercel/analytics/react";
import AddProject from "./pages/Admin/AddProject";
import EditProject from "./pages/Admin/EditProject";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/add-project" element={<AddProject />} />
        <Route path="/admin/edit-project/:slug" element={<EditProject />} />
      </Routes>

      <Analytics />
    </>
  );
}

export default App;