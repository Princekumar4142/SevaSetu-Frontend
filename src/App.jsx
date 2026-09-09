import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { fetchCurrentUser } from "./store/slices/authSlice";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";
import { SocketProvider } from "./context/SocketContext";
import { VoiceAgentProvider } from "./context/VoiceAgentContext";
import IncomingOrderModal from "./components/IncomingOrderModal";
import GlobalVoiceAssistant from "./components/GlobalVoiceAssistant";

export default function App() {
  const { dispatch, token, currentUser } = useAuth();

  // On first load, if a token is stored but we don't have the user in memory
  // yet (fresh page load / refresh), restore the session by calling /auth/me.
  useEffect(() => {
    if (token && !currentUser) {
      dispatch(fetchCurrentUser());
    }
  }, [token, currentUser, dispatch]);

  return (
    <BrowserRouter>
      <VoiceAgentProvider>
        <SocketProvider>
          <ScrollToTop />
          <AppRoutes />
          <IncomingOrderModal />
          <GlobalVoiceAssistant />
        </SocketProvider>
      </VoiceAgentProvider>
    </BrowserRouter>
  );
}

