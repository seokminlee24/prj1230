import {
  Box,
  Flex,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
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
import { toaster } from "../../components/ui/toaster.jsx";
import { AuthenticationContext } from "../../components/context/AuthenticationProvider.jsx";

export function MemberInfo() {
  const [member, setMember] = useState(null);
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const { memberId } = useParams();
  const { logout } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    //회원정보 열기
    axios.get(`/api/member/${memberId}`).then((res) => setMember(res.data));
  }, []);

  //회원 삭제
  function handleDeleteClick() {
    axios
      .delete("/api/member/remove", {
        data: { memberId, password },
      })
      .then((res) => {
        logout();
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        navigate("/member/signup");
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
        setPassword("");
      });
  }

  if (!member) {
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
          회원 정보
        </Heading>
        <Stack gap={5}>
          <Field>
            <Flex justify="space-between" align="center" w={"100%"}>
              <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
                아이디
              </Text>
              <Input readOnly value={member.memberId} />
            </Flex>
          </Field>
          <Field>
            <Flex justify="space-between" align="center" w={"100%"}>
              <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
                암호
              </Text>
              <Input readOnly value={member.password} />
            </Flex>
          </Field>
          <Field>
            <Flex justify="space-between" align="center" w={"100%"}>
              <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
                별명
              </Text>
              <Input readOnly value={member.nickname} />
            </Flex>
          </Field>
          <Field>
            <Flex justify="space-between" align="center" w={"100%"}>
              <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
                성별
              </Text>
              <Input readOnly value={genderText} />
            </Flex>
          </Field>
          <Field>
            <Flex justify="space-between" align="center" w={"100%"}>
              <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
                가입일
              </Text>
              <Input type={"datetime-local"} readOnly value={member.inserted} />
            </Flex>
          </Field>
          <Box display="flex" justifyContent="space-between">
            <Button onClick={() => navigate(`/member/edit/${memberId}`)}>
              수정
            </Button>
            <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
              <DialogTrigger asChild>
                <Button colorPalette={"red"}>탈퇴</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>탈퇴 확인</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <Stack gap={5}>
                    <Field label={"비밀번호"}>
                      <Input
                        placeholder={"비밀번호를 입력해주세요."}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Field>
                  </Stack>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger>
                    <Button variant={"outline"}>취소</Button>
                  </DialogActionTrigger>
                  <Button colorPalette={"red"} onClick={handleDeleteClick}>
                    탈퇴
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
