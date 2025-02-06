import { Box, Stack } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/root/Navbar.jsx";
import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../components/context/AuthenticationProvider.jsx";

export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthenticationContext); // 로그인 상태 가져오기

  useEffect(() => {
    if (isAuthenticated) {
      if (location.pathname === "/member/login") {
        navigate("/board/boardList", { replace: true });
      }
    } else {
      if (location.pathname !== "/member/login") {
        navigate("/member/login", { replace: true });
      }
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <Stack>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Stack>
  );
}
