import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Group,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog.jsx";
import { Button } from "../../components/ui/button.jsx";
import { toaster } from "../../components/ui/toaster.jsx";

export function MemberEdit() {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/member/${memberId}`).then((res) => {
      setMember(res.data);
      setPassword(res.data.password);
      setNickname(res.data.nickname);
    });
  }, []);

  function handleSaveClick() {
    axios
      .put("/api/member/update", {
        memberId: member.memberId,
        password,
        nickname,
        oldPassword,
      })
      .then((res) => {
        const message = res.data.message;

        toaster.create({
          type: message.type,
          description: message.text,
        });
        navigate(`/member/${memberId}`);
      })
      .catch((e) => {
        const message = e.response.data.message;

        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        setOpen(false);
        setOldPassword("");
      });
  }

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

  if (member === null) {
    return <Spinner />;
  }

  const genderText = member.gender === "M" ? "남자" : "여자";

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box width="500px" p={5} boxShadow="lg" borderRadius="md" bg="white">
        <Heading textAlign="center" mb={4}>
          회원 정보 수정
        </Heading>
        <Stack gap={5}>
          <Field readOnly>
            <Flex justify="space-between" align="center" w={"100%"}>
              <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
                아이디
              </Text>
              <Input defaultValue={member.memberId} />
            </Flex>
          </Field>
          <Field>
            <Flex justify="space-between" align="center" w={"100%"}>
              <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
                암호
              </Text>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Flex>
          </Field>
          <Field>
            <Flex justify="space-between" align="center" w={"100%"}>
              <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
                별명
              </Text>
              <Group attached w={"100%"}>
                <Input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <Button onClick={handleNicknameCheckClick} variant={"outline"}>
                  중복확인
                </Button>
              </Group>
            </Flex>
          </Field>
          <Field>
            <Flex justify="space-between" align="center" w={"100%"}>
              <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
                성별
              </Text>
              <Input value={genderText} />
            </Flex>
          </Field>
          <Box textAlign="center">
            <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
              <DialogTrigger asChild>
                <Button w={"100%"} colorPalette={"blue"}>
                  저장
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>회원 정보 변경 확인</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <Stack gap={5}>
                    <Field label={"기존 암호"}>
                      <Input
                        placeholder={"기존 암호를 입력해주세요."}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </Field>
                  </Stack>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger>
                    <Button variant={"outline"}>취소</Button>
                  </DialogActionTrigger>
                  <Button colorPalette={"blue"} onClick={handleSaveClick}>
                    저장
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
