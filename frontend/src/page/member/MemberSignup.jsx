import { useState } from "react";
import axios from "axios";
import { Box, Group, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Radio, RadioGroup } from "../../components/ui/radio.jsx";
import { Button } from "../../components/ui/button.jsx";
import { toaster } from "../../components/ui/toaster.jsx";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { TbLock, TbLockCheck } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";

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
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Stack gap={5}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          justifyContent="center"
          display="flex"
          mb={8}
        >
          회원가입
        </Text>
        <Field>
          <Group attached w={"100%"}>
            <Button
              variant={"outline"}
              _hover={{ bg: "transparent" }}
              size={"xl"}
              cursor={"default"}
              tabIndex={-1}
            >
              <MdOutlineEmail />
            </Button>
            <Input
              size={"xl"}
              placeholder={"아이디 입력을 하세요."}
              value={memberId}
              onChange={(e) => {
                setIdCheck(false);
                setMemberId(e.target.value);
              }}
            />
            <Button
              size={"xl"}
              onClick={handleIdCheckClick}
              variant={"outline"}
            >
              중복확인
            </Button>
          </Group>
        </Field>
        <Field>
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
            <Input
              size={"xl"}
              placeholder={"비밀번호를 입력해주세요."}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Group>
        </Field>
        <Field>
          <Group attached w={"100%"}>
            <Button
              variant={"outline"}
              _hover={{ bg: "transparent" }}
              size={"xl"}
              cursor={"default"}
              tabIndex={-1}
            >
              <TbLockCheck />
            </Button>
            <Input
              size={"xl"}
              placeholder={"비밀번호를 재입력해주세요."}
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </Group>
        </Field>
        <Field>
          <Group attached w={"100%"}>
            <Button
              variant={"outline"}
              _hover={{ bg: "transparent" }}
              size={"xl"}
              cursor={"default"}
              tabIndex={-1}
            >
              <FaRegUser />
            </Button>
            <Input
              size={"xl"}
              placeholder={"별명를 입력해주세요."}
              value={nickname}
              onChange={(e) => {
                setNicknameCheck(false);
                setNickname(e.target.value);
              }}
            />
            <Button
              size={"xl"}
              onClick={handleNicknameCheckClick}
              variant={"outline"}
            >
              중복확인
            </Button>
          </Group>
        </Field>
        <Field>
          <Stack direction="row" spacing={4} align="center" w={"100%"}>
            <Text>성별 : </Text>
            <RadioGroup
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <Stack direction="row" spacing={4}>
                {" "}
                {/* spacing 추가 */}
                <Radio value="M">남성</Radio>
                <Radio value="F">여성</Radio>
              </Stack>
            </RadioGroup>
            {!gender && ( // 성별이 선택되지 않았을 때 메시지 표시
              <Box color="green.500" fontSize={"sm"}>
                성별을 선택해야 합니다.
              </Box>
            )}
          </Stack>
        </Field>

        <Box>
          <Button w={"100%"} disabled={disabled} onClick={handleSaveClick}>
            가입
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
