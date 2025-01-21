import { Box, Stack } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../../components/root/Navbar.jsx";
import { useContext } from "react";
import { AuthenticationContext } from "../../components/context/AuthenticationProvider.jsx";

export function RootLayout() {
  const location = useLocation();
  const { login } = useContext(AuthenticationContext);
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
