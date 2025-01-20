import { Box, Heading, Input, Spinner, Stack } from "@chakra-ui/react";
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
    <Box>
      <Heading>회원 정보</Heading>
      <Stack gap={5}>
        <Field label={"아이디"}>
          <Input readOnly value={member.memberId} />
        </Field>
        <Field label={"암호"}>
          <Input readOnly value={member.password} />
        </Field>
        <Field label={"닉네임"}>
          <Input readOnly value={member.nickname} />
        </Field>
        <Field label={"성별"}>
          <Input readOnly value={genderText} />
        </Field>
        <Field label={"비밀번호"}>
          <Input type={"datetime-local"} readOnly value={member.inserted} />
        </Field>
        <Box>
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
  );
}
