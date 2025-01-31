import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Input,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
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
  DialogTrigger,
} from "../../components/ui/dialog.jsx";
import { toaster } from "../../components/ui/toaster.jsx";
import { AuthenticationContext } from "../../components/context/AuthenticationProvider.jsx";

export function InquireEdit() {
  const { id, isAdmin } = useContext(AuthenticationContext);
  const [inquire, setInquire] = useState(null);
  const [progress, setProgress] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { inquireId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/inquire/${inquireId}`).then((res) => setInquire(res.data));
  }, []);

  const handleSaveClick = () => {
    setProgress(true);
    axios
      .put("/api/inquire/inquireUpdate", inquire)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        navigate(`/inquire/${inquire.inquireId}`);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        setProgress(false);
        setDialogOpen(false);
      });
  };

  if (inquire === null) {
    return <Spinner />;
  }

  // 본인 또는 관리자 여부 확인
  const canEdit = isAdmin || id === inquire.memberId;

  // 제목이나 본문이 비어있는 지 확인
  const disabled = !(
    inquire.inquireTitle.trim().length > 0 &&
    inquire.inquireContent.trim().length > 0
  );

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
        {canEdit && (
          <Box>
            <DialogRoot
              open={dialogOpen}
              onOpenChange={(e) => setDialogOpen(e.open)}
            >
              <DialogTrigger asChild>
                <Button
                  disabled={disabled}
                  colorPalette={"cyan"}
                  variant={"outline"}
                >
                  저장
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>저장 확인</DialogHeader>
                <DialogBody>
                  <p>{inquireId}번 문의글 수정하시겠습니까?</p>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger>
                    <Button variant={"outline"}>취소</Button>
                  </DialogActionTrigger>
                  <Button
                    loading={progress}
                    colorPalette={"blue"}
                    onClick={handleSaveClick}
                  >
                    저장
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
