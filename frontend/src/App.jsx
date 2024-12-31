// Axios 인터셉터 설정
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./page/root/RootLayout.jsx";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{}],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
