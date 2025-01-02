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
  const [idCheck, setIdCheck] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
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
          description: message.text, // 여러 오류가 있을 경우 한 번에 표시
        });
        // TODO: login 으로 이동
        navigate("/");
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text, // 백엔드에서 반환된 오류 메시지 표시
        });
      })
      .finally(() => {
        console.log("성공,실패든 무조건 실행");
      });
  }

  const handleIdCheckClick = () => {
    axios
      .get("/api/member/check", {
        params: {
          memberId: memberId,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message; // 백엔드에서 반환된 메시지 사용
        toaster.create({
          type: message.type,
          description: message.text,
        });

        setIdCheck(data.available); // 사용 가능 여부 업데이트
      })
      .catch((error) => {
        // 에러 응답 처리
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const message = error.response.data.message; // 백엔드 에러 메시지
          toaster.create({
            type: message.type,
            description: message.text,
          });
        } else {
          toaster.create({
            type: "error",
            description: "아이디 중복 체크 중 알 수 없는 오류가 발생했습니다.",
          });
        }
      });
  };

  // 회원 가입 별명 중복 체크
  const handleNicknameCheckClick = () => {
    axios
      .get("/api/member/check", {
        params: {
          nickname: nickname,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message; // 백엔드에서 반환된 메시지 사용
        toaster.create({
          type: message.type,
          description: message.text,
        });

        setNicknameCheck(data.available); // 사용 가능 여부 업데이트
      })
      .catch((error) => {
        // 에러 응답 처리
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const message = error.response.data.message; // 백엔드 에러 메시지
          toaster.create({
            type: message.type,
            description: message.text,
          });
        } else {
          toaster.create({
            type: "error",
            description: "별명 중복 체크 중 알 수 없는 오류가 발생했습니다.",
          });
        }
      });
  };

  // 가입 버튼 비활성화 여부
  let disabled = true;
  if (idCheck && nicknameCheck && gender) {
    if (password === passwordCheck) {
      disabled = false;
    }
  }

  return (
    <Box>
      <Heading>회원 가입</Heading>
      <Stack gap={5}>
        <Field label={"아이디"}>
          <Group attached w={"100%"}>
            <Input
              value={memberId}
              onChange={(e) => {
                setIdCheck(false);
                setMemberId(e.target.value);
              }}
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
        <Field label={"비밀번호 확인"}>
          <Input
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </Field>
        <Field label={"별명"}>
          <Group attached w={"100%"}>
            <Input
              value={nickname}
              onChange={(e) => {
                setNicknameCheck(false);
                setNickname(e.target.value);
              }}
            />
            <Button onClick={handleNicknameCheckClick} variant={"outline"}>
              중복확인
            </Button>
          </Group>
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
          <Button disabled={disabled} onClick={handleSaveClick}>
            가입
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
