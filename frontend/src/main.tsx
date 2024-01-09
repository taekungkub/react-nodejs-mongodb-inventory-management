import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import "@mantine/core/styles.css"
import "./index.css"
import MantineProviders from "./providers/MantineProviders.tsx"
import router from "./router.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProviders>
    <RouterProvider router={router} />
  </MantineProviders>
)
