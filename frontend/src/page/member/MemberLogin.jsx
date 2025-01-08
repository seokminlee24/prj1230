import { useContext, useState } from "react";
import axios from "axios";
import { Box, Heading, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { toaster } from "../../components/ui/toaster.jsx";
import { AuthenticationContext } from "../../components/context/AuthenticationProvider.jsx";

export function MemberLogin() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authentication = useContext(AuthenticationContext);

  function handleLoginClick() {
    axios
      .post("/api/member/login", { memberId, password })
      .then((res) => res.data)
      .then((data) => {
        // 토스트 띄우고
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        // "/"로 이동
        navigate("/");
        // login
        authentication.login(data.token);
      })
      .catch((e) => {
        const message = e.response.data.message;
        // 토스트 띄우고
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally();
  }

  return (
    <Box>
      <Heading>로그인</Heading>
      <Stack>
        <Field label={"아이디"}>
          <Input
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          />
        </Field>
        <Field label={"비밀번호"}>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Box>
          <Button onClick={handleLoginClick}>로그인</Button>
        </Box>
      </Stack>
    </Box>
  );
}
