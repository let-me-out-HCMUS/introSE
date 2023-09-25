import { BrowserRouter, Route, Routes } from "react-router-dom";

import Error from "./pages/Error";
import Home from "./pages/Home";

import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Some route page that just use for admin */}
        </Route>

        {/* Another route add from here */}

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
