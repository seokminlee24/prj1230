import { useContext, useState } from "react";
import axios from "axios";
import { Box, Flex, Group, Heading, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { toaster } from "../../components/ui/toaster.jsx";
import { AuthenticationContext } from "../../components/context/AuthenticationProvider.jsx";
import { MdOutlineEmail } from "react-icons/md";
import { TbLock } from "react-icons/tb";

export function MemberLogin() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authentication = useContext(AuthenticationContext);

  function handleLoginClick() {
    setLoading(true);
    axios
      .post("/api/member/login", { memberId, password })
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        navigate("/");
        authentication.login(data.token);
      })
      .catch((e) => {
        const message = e.response?.data?.message || {
          type: "error",
          text: "로그인에 실패했습니다.",
        };
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <Flex height="100vh" align="center" justify="center" bg="white">
      <Box
        maxWidth="400px"
        width="100%"
        padding="6"
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <Heading size="lg" textAlign="center" mb="6">
          로그인
        </Heading>
        <Stack spacing="4">
          <Field>
            <Group attached w={"100%"}>
              <Button
                variant={"outline"}
                _hover={{ bg: "transparent" }}
                size={"xl"}
                cursor={"default"}
              >
                <MdOutlineEmail />
              </Button>

              <Input
                size={"xl"}
                placeholder="이메일"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              />
            </Group>
          </Field>
          <Group attached w={"100%"}>
            <Button
              variant={"outline"}
              _hover={{ bg: "transparent" }}
              size={"xl"}
              cursor={"default"}
              tabIndex={-1}
            >
              <TbLock />
            </Button>
            <Field>
              <Input
                size={"xl"}
                placeholder="이메일"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
          </Group>

          <Box display="flex" mt={5}>
            <Button w={"100%"} onClick={handleLoginClick} isLoading={loading}>
              로그인
            </Button>
          </Box>
          <Box textAlign="end" mt={3}>
            <Link to="/member/signup">회원가입</Link>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}
