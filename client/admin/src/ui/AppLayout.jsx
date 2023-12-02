import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

function AppLayout() {
  // Config style for main app
  return (
    <div className="containe mx-auto p-5" style={{ background: "#e5e5e5" }}>
      <Navbar />

      <Outlet />

      {/* Footer */}
    </div>
  );
}

export default AppLayout;
