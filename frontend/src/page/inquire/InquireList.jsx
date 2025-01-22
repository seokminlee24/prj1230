import { useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Heading,
  HStack,
  Input,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState({
    type: searchParams.get("st") ?? "all",
    keyword: searchParams.get("sk") ?? "",
  });
  const navigate = useNavigate();

  // 카테고리 매핑 설정
  const categoryMap = {
    all: "문의 유형 선택",
    declaration: "신고",
    utilization: "이용 안내",
    account: "계정 문의",
    Other: "기타 문의",
  };

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

  useEffect(() => {
    const nextSearch = { ...search };
    if (searchParams.get("st")) {
      nextSearch.type = searchParams.get("st");
    } else {
      nextSearch.type = "all";
    }
    if (searchParams.get("sk")) {
      nextSearch.keyword = searchParams.get("sk");
    } else {
      nextSearch.keyword = "";
    }
    setSearch(nextSearch);
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

  function handleSearchClick() {
    if (search.keyword.trim().length > 0) {
      // 검색
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.set("st", search.type);
      nextSearchParam.set("sk", search.keyword);
      nextSearchParam.set("page", 1);
      setSearchParams(nextSearchParam);
    } else {
      // 검색 안함
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.delete("st");
      nextSearchParam.delete("sk");
      setSearchParams(nextSearchParam);
    }
  }

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
          {inquireList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} textAlign="center">
                문의 글이 없거나 검색조회시 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            inquireList.map((inquire) => (
              <TableRow
                onClick={() => handleRowClick(inquire.inquireId)}
                key={inquire.inquireId}
              >
                <TableCell textAlign="center">{inquire.inquireId}</TableCell>
                <TableCell textAlign="center">{inquire.inquireTitle}</TableCell>
                <TableCell textAlign="center">
                  {inquire.inquireWriter}
                </TableCell>
                <TableCell textAlign="center">
                  {categoryMap[inquire.inquireCategory]}
                </TableCell>
                <TableCell textAlign="center">
                  {inquire.inserted.replace("T", " ")}
                </TableCell>
                <TableCell textAlign="center">
                  {inquire.inquireCountComment > 0 ? (
                    <Badge variant={"subtle"} colorScheme={"green"}>
                      <FaCommentDots />
                      답변 완료
                    </Badge>
                  ) : (
                    <Badge variant={"subtle"} colorScheme={"red"}>
                      <FaCommentDots />
                      답변 대기
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </TableRoot>
      <HStack>
        <Box>
          <select
            value={search.type}
            onChange={(e) => setSearch({ ...search, type: e.target.value })}
          >
            <option value={"all"}>전체</option>
            <option value={"inquireTitle"}>제목</option>
            <option value={"inquireContent"}>내용</option>
          </select>
        </Box>
        <Input
          value={search.keyword}
          placeholder="검색어를 입력해 주세요."
          onChange={(e) =>
            setSearch({ ...search, keyword: e.target.value.trim() })
          }
        />
        <Button onClick={handleSearchClick}>검색</Button>
      </HStack>
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        {count > 0 && (
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
        )}
      </Box>
    </Box>
  );
}
