import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Input,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";

export function InquireEdit() {
  const [inquire, setInquire] = useState(null);
  const { inquireId } = useParams();

  useEffect(() => {
    axios.get(`/api/inquire/${inquireId}`).then((res) => setInquire(res.data));
  }, []);

  const handleSaveClick = () => {
    axios.put("/api/inquire/inquireUpdate", inquire);
  };

  if (inquire === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading>{inquireId}번 문의글 수정</Heading>
      <Stack gap={5}>
        <Field label={"문의 유형"}>
          <select
            value={inquire.inquireCategory}
            onChange={(e) => {
              setInquire({ ...inquire, inquireCategory: e.target.value });
            }}
            style={{
              marginLeft: "-9px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #CBD5E0",
            }}
          >
            <option value="all"> 문의 유형 선택</option>
            <option value="declaration"> 신고</option>
            <option value="utilization"> 이용 안내</option>
            <option value="account"> 계정 문의</option>
            <option value="Other"> 기타 문의</option>
          </select>
        </Field>
        <Field label={"제목"}>
          <Input
            value={inquire.inquireTitle}
            onChange={(e) =>
              setInquire({ ...inquire, inquireTitle: e.target.value })
            }
          />
        </Field>
        <Field label={"문의 내용"}>
          <Textarea
            value={inquire.inquireContent}
            onChange={(e) =>
              setInquire({ ...inquire, inquireContent: e.target.value })
            }
          />
        </Field>
        <Box>
          <Button onClick={handleSaveClick}>저장</Button>
        </Box>
      </Stack>
    </Box>
  );
}
