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
    <Box background={"white"}>
      <Flex justify="center" flex="1" gap={3}>
        <Box
          padding="0.5rem"
          _hover={{ backgroundColor: "gray.100" }}
          onClick={() => navigate("/board/boardList")}
        >
          참여글 목록
        </Box>

        {/* 메뉴를 오른쪽 끝으로 밀기 */}
        <Box ml="auto">
          <MenuRoot>
            {/* 로그인 상태에서만 메뉴 표시 */}
            {authentication.login && (
              <Box>
                {/* Menu Trigger: 닉네임 표시 */}
                <MenuTrigger asChild>
                  <Box
                    cursor="pointer"
                    textAlign={"center"}
                    padding="0.5rem"
                    borderRadius="sd"
                    _hover={{ backgroundColor: "gray.100" }}
                  >
                    {authentication.nickname}
                  </Box>
                </MenuTrigger>

                {/* Menu Content: 드롭다운 메뉴 */}
                <MenuContent position="absolute" right="1" padding={0}>
                  <Box
                    onClick={() => {
                      navigate(`/member/${authentication.id}`);
                    }}
                    padding="0.5rem"
                    textAlign={"center"}
                    cursor="pointer"
                    _hover={{ backgroundColor: "red.100", color: "red.800" }}
                  >
                    정보보기
                  </Box>
                  <Box
                    onClick={() => {
                      navigate(`/board/boardJoinList`);
                    }}
                    padding="0.5rem"
                    textAlign={"center"}
                    cursor="pointer"
                    _hover={{ backgroundColor: "red.100", color: "red.800" }}
                  >
                    참여 목록
                  </Box>
                  <Box
                    onClick={() => {
                      navigate("/inquire/inquireList");
                    }}
                    padding="0.5rem"
                    cursor="pointer"
                    textAlign={"center"}
                    _hover={{ backgroundColor: "red.100", color: "red.800" }}
                  >
                    문의하기
                  </Box>
                  {authentication.isAdmin && (
                    <Box
                      onClick={() => navigate("/member/list")}
                      padding="0.5rem"
                      cursor="pointer"
                      textAlign={"center"}
                      _hover={{
                        backgroundColor: "blue.100",
                        color: "blue.800",
                      }}
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
                    textAlign={"center"}
                    _hover={{ backgroundColor: "red.100", color: "red.800" }}
                  >
                    로그아웃
                  </Box>
                </MenuContent>
              </Box>
            )}
          </MenuRoot>
        </Box>
      </Flex>
    </Box>
  );
}
