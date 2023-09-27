import { Outlet } from "react-router-dom";

function AppLayout() {
  // Config style for main app
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AppLayout;
