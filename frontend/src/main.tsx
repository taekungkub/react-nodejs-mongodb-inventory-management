import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import "@mantine/core/styles.css"
import "./index.css"
import MantineProviders from "./providers/MantineProviders.tsx"
import router from "./router.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProviders>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </MantineProviders>
)
