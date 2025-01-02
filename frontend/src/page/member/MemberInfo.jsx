import { Box, Heading, Input, Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";

export function MemberInfo() {
  const [member, setMember] = useState(null);
  const { memberId } = useParams();

  useEffect(() => {
    //회원정보 열기
    axios.get(`/api/member/${memberId}`).then((res) => setMember(res.data));
  }, []);

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
        <Field label={"암호"}>
          <Input type={"datetime-local"} readOnly value={member.inserted} />
        </Field>
      </Stack>
    </Box>
  );
}
