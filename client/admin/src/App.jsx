import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";

import AppLayout from "./ui/AppLayout";
import RankPage from "./pages/RankPage";
import PlayerPage from "./pages/PlayerPage";
import DossierRegistration from "./pages/DossierRegistration";
import ClubPage from "./pages/ClubPage";
import PlayerDetails from "./features/players/PlayerDetails";
import ChangeRule from "./pages/ChangeRule";

import MatchResult from "./pages/MatchResult";

import MatchSchedule from "./pages/MatchSchedule";


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

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/rank" element={<RankPage />} />
            <Route path="/register" element={<DossierRegistration />} />
            <Route path="/players" element={<PlayerPage />} />
            <Route path="/players/:id" element={<PlayerDetails />} />
            <Route path="/clubs" element={<ClubPage />} />
            <Route path="/change-rule" element={<ChangeRule />} />
            <Route path="/schedules" element={<MatchSchedule />} />
            <Route path="/match-result/:id" element={<MatchResult/>} />

            {/* Another route add from here */}
            {/* <Route path = "matches" element={<MatchResult id={1}/>} /> */}
            {/* All invalid route will render PageNotFound page */}
            <Route path="*" element={<PageNotFound />} />
          </Route>
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
    </QueryClientProvider>
  );
}

export default App;
