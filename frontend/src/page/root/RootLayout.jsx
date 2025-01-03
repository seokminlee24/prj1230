import { Box, Stack } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../../components/root/Navbar.jsx";

export function RootLayout() {
  const location = useLocation();
  return (
    <Stack>
      <Box>
        {location.pathname === "/" ||
          location.pathname === "/member/signup" ||
          location.pathname === "/member/login" || <Navbar />}
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Stack>
  );
}
