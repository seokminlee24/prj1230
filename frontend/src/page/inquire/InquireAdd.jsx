import { Box, Heading, Input, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { Field } from "../../components/ui/field.jsx";
import axios from "axios";
import { Button } from "../../components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { toaster } from "../../components/ui/toaster.jsx";

export function InquireAdd() {
  const [inquireCategory, setInquireCategory] = useState("");
  const [inquireTitle, setInquireTitle] = useState("");
  const [inquireContent, setInquireContent] = useState("");
  const [inquireWriter, setInquireWriter] = useState("");
  const [progress, setProgress] = useState(false);
  const navigate = useNavigate();

  const handleSaveClick = () => {
    setProgress(true);
    axios
      .post("/api/inquire/inquireAdd", {
        inquireCategory: inquireCategory,
        inquireTitle: inquireTitle,
        inquireContent: inquireContent,
        inquireWriter: inquireWriter,
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message;
        toaster.create({
          description: message.text,
          type: message.type,
        });
        navigate(`/inquire/${data.data.inquireId}`);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({
          description: message.text,
          type: message.type,
        });
      })
      .finally(() => {
        setProgress(false);
      });
  };

  const disabled = !(
    inquireTitle.trim().length > 0 && inquireContent.trim().length > 0
  );

  return (
    <Box>
      <Heading>문의 글 작성</Heading>
      <Stack gap={5}>
        <Field label={"문의 유형"}>
          <select
            value={inquireCategory}
            onChange={(e) => setInquireCategory(e.target.value)}
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
            value={inquireTitle}
            onChange={(e) => setInquireTitle(e.target.value)}
          />
        </Field>
        <Field label={"문의 내용"}>
          <Textarea
            value={inquireContent}
            onChange={(e) => setInquireContent(e.target.value)}
          />
        </Field>
        <Field label={"작성자"}>
          <Input
            value={inquireWriter}
            onChange={(e) => setInquireWriter(e.target.value)}
          />
        </Field>
        <Box>
          <Button
            disabled={disabled}
            loading={progress}
            onClick={handleSaveClick}
          >
            저장
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
