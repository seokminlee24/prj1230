import { Box, Heading, Input, Spinner, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";

export function InquireInfo() {
  const { inquireId } = useParams();
  const [inquire, setInquire] = useState(null);

  useEffect(() => {
    axios.get(`/api/inquire/${inquireId}`).then((res) => {
      setInquire(res.data);
      console.log(res.data);
    });
  }, []);

  if (inquire == null) {
    return <Spinner />;
  }

  // 카테고리 매핑 설정
  const categoryMap = {
    all: "문의 유형 선택",
    declaration: "신고",
    utilization: "이용 안내",
    account: "계정 문의",
    Other: "기타 문의",
  };

  return (
    <Box>
      <Heading>{inquireId}번 게시물</Heading>
      <Stack gap={5}>
        <Field label="문의 유형" readOnly>
          <Input value={categoryMap[inquire.inquireCategory]} width="100px" />
        </Field>
        <Field label="제목" readOnly>
          <Input value={inquire.inquireTitle} />
        </Field>
        <Field label="문의 내용" readOnly>
          <Input value={inquire.inquireContent} />
        </Field>
        <Field label="작성자" readOnly>
          <Input value={inquire.inquireWriter} />
        </Field>
        <Field label="작성일시" readOnly>
          <Input value={inquire.inserted} type={"datetime-local"} />
        </Field>
      </Stack>
    </Box>
  );
}
