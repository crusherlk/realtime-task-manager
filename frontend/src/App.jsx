import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/home/home";
import Auth from "./pages/auth/auth";
import Layout from "./layout/layout";
import TaskProvider from "./context/taskContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Auth />} />
      </Route>
    )
  );

  return (
    <>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </>
  );
}

export default App;
