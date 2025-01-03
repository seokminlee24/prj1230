import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  MenuContent,
  MenuRoot,
  MenuTrigger,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationProvider.jsx";

export function Navbar() {
  const navigate = useNavigate();

  // step 2 : context 사용하기
  const authentication = useContext(AuthenticationContext);

  return (
    <Flex gap={3}>
      <Box onClick={() => navigate("/member/signup")}>가입</Box>
      <Box onClick={() => navigate("/member/login")}>로그인</Box>

      <MenuRoot>
        {/* 로그인 상태에서만 메뉴 표시 */}
        {authentication.login && (
          <Box>
            {/* Menu Trigger: 닉네임 표시 */}
            <MenuTrigger asChild>
              <Box
                cursor="pointer"
                padding="0.5rem"
                border="1px solid #ccc"
                borderRadius="md"
                _hover={{ backgroundColor: "gray.100" }}
              >
                {authentication.nickname}
              </Box>
            </MenuTrigger>

            {/* Menu Content: 드롭다운 메뉴 */}
            <MenuContent>
              <Box
                onClick={() => {
                  navigate(`/member/${authentication.id}`);
                }}
                padding="0.5rem"
                cursor="pointer"
                _hover={{ backgroundColor: "red.100", color: "red.800" }}
              >
                정보보기
              </Box>
              {authentication.isAdmin && (
                <Box
                  onClick={() => navigate("/member/list")}
                  padding="0.5rem"
                  cursor="pointer"
                  _hover={{ backgroundColor: "blue.100", color: "blue.800" }}
                >
                  회원 목록
                </Box>
              )}
              <Box
                onClick={() => {
                  authentication.logout();
                  navigate("/member/login");
                }}
                padding="0.5rem"
                cursor="pointer"
                _hover={{ backgroundColor: "red.100", color: "red.800" }}
              >
                로그아웃
              </Box>
            </MenuContent>
          </Box>
        )}
      </MenuRoot>
    </Flex>
  );
}
