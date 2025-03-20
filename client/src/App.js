import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import Signup from "./components/Signup";
import Chat from "./components/Chat";
import Profile from "./components/Profile";

import CompanyDashboard from "./components/CompanyComponents/CompanyDashboard";
import  CompanyServices from "./components/CompanyComponents/CompanyServices";
import CompanyCreateService from "./components/CompanyComponents/CompanyCreateService";
import CompanyManageServices from "./components/CompanyComponents/CompanyManageServices";
import  CompanyUpdateService from "./components/CompanyComponents/CompanyUpdateService";
import ServiceDetails from "./components/ServiceDetails";

// Client Components
import ClientDashboard from "./components/ClientComponents/ClientDashboard";
import ClientCompany from "./components/ClientComponents/ClientCompany";
import ClientOrders from "./components/ClientComponents/ClientOrders";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Company Routes */}
          <Route path="/dashboard/company/:id">
            <Route index element={<CompanyDashboard />} />
            <Route path="services">
              <Route index element={<CompanyServices />} />
              <Route path="create" element={<CompanyCreateService />} />
              <Route path="manage" element={<CompanyManageServices />} />
              <Route path="update/:serviceId" element={<CompanyUpdateService />} />
              <Route path="show/:serviceId" element={<ServiceDetails type="1" />} />
            </Route>
            <Route path="chat" element={<Chat type="company" />} />
            <Route path="profile" element={<Profile type="1" />} />
          </Route>

          {/* Client Routes */}
          <Route path="/dashboard/client/:id">
            <Route index element={<ClientDashboard />} />
            <Route path="services" element={<ClientCompany />} />
            <Route path="services/show/:serviceId" element={<ServiceDetails type="2" />} />
            <Route path="orders" element={<ClientOrders />} />
            <Route path="order/show/:serviceId" element={<ServiceDetails type="3" />} />
            <Route path="chat" element={<Chat type="2" />} />
            <Route path="profile" element={<Profile type="2" />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

