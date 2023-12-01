import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";

import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import RankPage from "./pages/RankPage";
import PlayerPage from "./pages/PlayerPage";
import { Navbar } from "./features/navbar/Navbar";
import DossierRegistration from "./pages/DossierRegistration";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // cache will refresh for 60 seconds
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="container mx-auto p-5" style={{background: "#e5e5e5"}}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* Some route page that just use for admin */}
            </Route>

          <Route path="/" element={<Home />} />
          <Route path="/rank" element={<RankPage />} />
          <Route path="/register" element={<DossierRegistration />} />
          <Route path="/players" element={<PlayerPage />} />
            {/* Another route add from here */}

            {/* All invalid route will render PageNotFound page */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        {/* Use for notification */}
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;
