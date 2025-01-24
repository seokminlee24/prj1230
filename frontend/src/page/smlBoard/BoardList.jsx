import { Box, Heading, HStack, Input, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button.jsx";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination.jsx";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState({
    type: searchParams.get("st") ?? "all",
    keyword: searchParams.get("sk") ?? "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/board/boardList", {
        params: searchParams,
        signal: controller.signal,
      })
      .then((res) => res.data)
      .then((data) => {
        setBoardList(data.list);
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

  const handleGoBoardAdd = () => {
    navigate("/board/boardAdd");
  };

  function handleRowClick(boardId) {
    navigate(`/board/boardInfo/${boardId}`);
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
      <Heading>참여글 리스트</Heading>
      <Box>
        <Button onClick={handleGoBoardAdd}>참여글 작성</Button>
      </Box>
      <Table.Root interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader textAlign="center">번호</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">제목</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">작성자</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">작성일시</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {boardList.map((board) => (
            <Table.Row
              onClick={() => handleRowClick(board.boardId)}
              key={board.boardId}
            >
              <Table.Cell textAlign="center">{board.boardId}</Table.Cell>
              <Table.Cell textAlign="center">{board.boardTitle}</Table.Cell>
              <Table.Cell textAlign="center">{board.boardWriter}</Table.Cell>
              <Table.Cell textAlign="center">
                {board.inserted.replace("T", " ")}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <HStack>
        <Box>
          <select
            value={search.type}
            onChange={(e) => setSearch({ ...search, type: e.target.value })}
          >
            <option value={"all"}>전체</option>
            <option value={"boardTitle"}>제목</option>
            <option value={"boardContent"}>내용</option>
            <option value={"board"}>내용</option>
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
