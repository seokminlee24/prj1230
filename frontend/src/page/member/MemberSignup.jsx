import { useState } from "react";
import axios from "axios";
import { Box, Group, Heading, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Radio, RadioGroup } from "../../components/ui/radio.jsx";
import { Button } from "../../components/ui/button.jsx";
import { toaster } from "../../components/ui/toaster.jsx";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState(null);

  const navigate = useNavigate();

  // 회원 가입 저장 버튼
  function handleSaveClick() {
    axios
      .post("/api/member/signup", { memberId, password, nickname, gender })
      .then((res) => {
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        // TODO: login 으로 이동
        navigate("/");
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        console.log("성공,실패든 무조건 실행");
      });
  }

  // 회원 가입 아이디 중복 체크
  const handleIdCheckClick = () => {
    axios
      .get("/api/member/check", {
        params: {
          memberId: memberId,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  return (
    <Box>
      <Heading>회원 가입</Heading>
      <Stack gap={5}>
        <Field label={"아이디"}>
          <Group attached w={"100%"}>
            <Input
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
            <Button onClick={handleIdCheckClick} variant={"outline"}>
              중복확인
            </Button>
          </Group>
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
