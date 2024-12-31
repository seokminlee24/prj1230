import { useState } from "react";
import axios from "axios";
import { Box, Heading, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Radio, RadioGroup } from "../../components/ui/radio.jsx";
import { Button } from "../../components/ui/button.jsx";

export function MemberSignup() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState(null);

  function handleSaveClick() {
    axios
      .post("/api/member/signup", { memberId, password, nickname, gender })
      .then((res) => {
        console.log("성공");
      })
      .catch((e) => {
        console.log("실패");
      })
      .finally(() => {
        console.log("성공,실패든 무조건 실행");
      });
  }

  return (
    <Box>
      <Heading>회원 가입</Heading>
      <Stack gap={5}>
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
        <Field label={"별명"}>
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Field>
        <Field label={"성별"}>
          <RadioGroup
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <Stack direction="row">
              <Radio value="M">남성</Radio>
              <Radio value="F">여성</Radio>
            </Stack>
          </RadioGroup>
        </Field>

        <Box>
          <Button onClick={handleSaveClick}>가입</Button>
        </Box>
      </Stack>
    </Box>
  );
}
