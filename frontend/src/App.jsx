// Axios 인터셉터 설정
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./page/root/RootLayout.jsx";
import { MemberSignup } from "./page/member/MemberSignup.jsx";
import { MemberList } from "./page/member/MemberList.jsx";
import { MemberInfo } from "./page/member/MemberInfo.jsx";
import { MemberEdit } from "./page/member/MemberEdit.jsx";
import { MemberLogin } from "./page/member/MemberLogin.jsx";

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
    children: [
      {
        path: "/member/signup",
        element: <MemberSignup />,
      },
      {
        path: "/member/list",
        element: <MemberList />,
      },
      {
        path: "/member/:memberId",
        element: <MemberInfo />,
      },
      {
        path: "member/edit/:memberId",
        element: <MemberEdit />,
      },
      {
        path: "member/login",
        element: <MemberLogin />,
      },
    ],
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
