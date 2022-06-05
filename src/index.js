import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider} from "react-query";

import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient({
  retry: true,
  cacheConfig: {
    cacheTime: Infinity,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient} >
    <Router>
      <App />
      <ReactQueryDevtools />    
    </Router>
  </QueryClientProvider>
);
