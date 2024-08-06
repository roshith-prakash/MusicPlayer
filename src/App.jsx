import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import { AuthProvider } from "./context/authContext";

// Creating a Query Client for Tanstack query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
