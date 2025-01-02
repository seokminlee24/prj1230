import { useState } from "react";
import axios from "axios";
import { Box, Heading, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";

export function MemberLogin() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

  function handleLoginClick() {
    axios
      .post("/api/member/login", { memberId, password })
      .then()
      .catch()
      .finally();
  }

  return (
    <Box>
      <Heading>로그인</Heading>
      <Stack>
        <Field label={"아이디"}>
          <Input value={id} onChange={(e) => setMemberId(e.target.value)} />
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
