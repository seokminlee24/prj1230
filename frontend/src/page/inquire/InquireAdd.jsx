import {
  Box,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { Field } from "../../components/ui/field.jsx";
import axios from "axios";
import { Button } from "../../components/ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
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
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
    >
      <Box
        w="100%"
        maxW="700px"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        bg="white"
      >
        <Heading size="lg" textAlign="center">
          문의 글 작성
        </Heading>
        <Stack gap={5} mt={4}>
          <Field>
            <Flex justify="space-between" align="center">
              <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
                문의 유형
              </Text>
              <select
                value={inquireCategory}
                onChange={(e) => setInquireCategory(e.target.value)}
                style={{
                  width: "150px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #CBD5E0",
                }}
              >
                <option value="">문의 유형 선택</option>
                <option value="declaration">신고</option>
                <option value="utilization">이용 안내</option>
                <option value="account">계정 문의</option>
                <option value="other">기타 문의</option>
              </select>
              <Text fontSize="sm" color="gray.500" ml={10} w={"400px"}>
                ※ 문의 유형을 선택 후 문의 내용을 작성해 주세요.
              </Text>
            </Flex>
          </Field>
          <Flex justify="space-between" align="center">
            <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
              문의 제목
            </Text>
            <Field>
              <Input
                value={inquireTitle}
                onChange={(e) => setInquireTitle(e.target.value)}
              />
            </Field>
          </Flex>
          <Flex justify="space-between" align="center">
            <Text fontSize="md" fontWeight="bold" width="23%" ml={3}>
              문의 내용
            </Text>
            <Field>
              <Textarea
                value={inquireContent}
                onChange={(e) => setInquireContent(e.target.value)}
              />
            </Field>
          </Flex>
          <Box textAlign="center">
            <Button
              w={"100%"}
              disabled={disabled}
              loading={progress}
              onClick={handleSaveClick}
            >
              저장
            </Button>
          </Box>
          <Box textAlign="end" mt={3}>
            <Link to="/inquire/inquireList">문의 글 리스트</Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
