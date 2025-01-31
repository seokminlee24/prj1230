import { useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Heading,
  HStack,
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRoot,
  TableRow,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button.jsx";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination.jsx";
import { FaCommentDots } from "react-icons/fa6";

export function InquireList() {
  const [inquireList, setInquireList] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/inquire/inquireList", {
        params: searchParams,
        signal: controller.signal,
      })
      .then((res) => res.data)
      .then((data) => {
        setInquireList(data.inquireList);
        setCount(data.count);
      });

    return () => {
      controller.abort();
    };
  }, [searchParams]);

  // page 번호
  const pageParam = searchParams.get("page") ? searchParams.get("page") : "1";
  const page = Number(pageParam);

  const handleGoInquireAdd = () => {
    navigate("/inquire/inquireAdd");
  };

  function handleRowClick(inquireId) {
    navigate(`/inquire/${inquireId}`);
  }

  function handlePageChange(e) {
    console.log(e.page);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", e.page);
    setSearchParams(nextSearchParams);
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
      <Heading>문의글 목록</Heading>
      <Button onClick={handleGoInquireAdd}>문의글 작성</Button>
      <TableRoot interactive>
        <TableHeader>
          <TableRow>
            <TableColumnHeader textAlign="center">번호</TableColumnHeader>
            <TableColumnHeader textAlign="center">제목</TableColumnHeader>
            <TableColumnHeader textAlign="center">작성자</TableColumnHeader>
            <TableColumnHeader textAlign="center">문의유형</TableColumnHeader>
            <TableColumnHeader textAlign="center">작성일시</TableColumnHeader>
            <TableColumnHeader textAlign="center">상태</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquireList.map((inquire) => (
            <TableRow
              onClick={() => handleRowClick(inquire.inquireId)}
              key={inquire.inquireId}
            >
              <TableCell textAlign="center">{inquire.inquireId}</TableCell>
              <TableCell textAlign="center">{inquire.inquireTitle}</TableCell>
              <TableCell textAlign="center">{inquire.inquireWriter}</TableCell>
              <TableCell textAlign="center">
                {categoryMap[inquire.inquireCategory]}
              </TableCell>
              <Table.Cell textAlign="center">
                {inquire.inserted.replace("T", " ")}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {inquire.inquireCountComment > 0 ? (
                  <Badge variant={"subtle"} colorPalette={"green"}>
                    <FaCommentDots />
                    답변 완료
                  </Badge>
                ) : (
                  <Badge variant={"subtle"} colorPalette={"red"}>
                    <FaCommentDots />
                    답변 대기
                  </Badge>
                )}
              </Table.Cell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <PaginationRoot
          onPageChange={handlePageChange}
          count={count}
          pageSize={10}
          page={page}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Box>
    </Box>
  );
}
