import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import Footer from "./components/Footer";
import taxi_bg from './images/taxi_bg.jpg'
import SearchCabs from "./components/SearchCabs";
import TrackerForm from "./components/TrackerForm";
import Tracker from "./components/Tracker";

function App() {
  return (
    <div className="flex flex-col bg-white min-h-screen ">
      <Navbar />

      <main className="flex flex-col p-4" >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/search" element={<SearchCabs />} />
          <Route path="/track" element={<Tracker />} />
        </Routes>
      </main>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default App;
