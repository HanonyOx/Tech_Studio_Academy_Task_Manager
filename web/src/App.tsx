import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Cover from "./pages/Cover";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyTasks from "./pages/MyTask";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <Navbar />
      <Routes>
        {/* Public pages: accessible only when logged out */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Cover />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected pages: accessible only when logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/tasks" element={<MyTasks />} />
          <Route path="/new-task" element={<NewTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
