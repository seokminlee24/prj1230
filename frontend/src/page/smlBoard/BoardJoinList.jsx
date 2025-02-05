import { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Box, Table, Text } from "@chakra-ui/react";
import { FaCommentDots } from "react-icons/fa6";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination.jsx";
import { useNavigate } from "react-router-dom";

export function BoardJoinList() {
  const [boardJoinList, setBoardJoinList] = useState([]);
  const [count, setCount] = useState(0);
  const pageParam =
    new URLSearchParams(window.location.search).get("page") || "1";
  const page = Number(pageParam);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/board/boardJoinList", {
        params: { page },
        signal: controller.signal,
      })
      .then((res) => res.data)
      .then((data) => {
        setBoardJoinList(data.list);
        setCount(data.count);
      });
    return () => {
      controller.abort();
    };
  }, [page]);

  const handlePageChange = (e) => {
    const nextSearchParams = new URLSearchParams(window.location.search);
    nextSearchParams.set("page", e.page);
    window.history.pushState({}, "", `?${nextSearchParams.toString()}`);
    setCount(e.page); // 페이지 업데이트
  };

  // 게시물 클릭 시 해당 게시물로 네비게이트
  function handleRowClick(boardId) {
    navigate(`/board/boardInfo/${boardId}`);
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <Box width="100%" maxWidth="900px">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          참여 목록
        </Text>
        <Table.Root interactive>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader textAlign="center">번호</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">제목</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">작성자</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                작성일시
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">참여자</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {boardJoinList.map((board) => (
              <Table.Row
                key={board.boardId}
                onClick={() => handleRowClick(board.boardId)}
              >
                <Table.Cell textAlign="center">{board.boardId}</Table.Cell>
                <Table.Cell textAlign="center">
                  {board.boardTitle}
                  {board.boardCountComment > 0 && (
                    <Badge variant="subtle" colorScheme="green">
                      <FaCommentDots />
                      {board.boardCountComment}
                    </Badge>
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">{board.boardWriter}</Table.Cell>
                <Table.Cell textAlign="center">
                  {board.inserted.replace("T", " ")}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {board.boardCountJoin > 0 ? board.boardCountJoin : "0"}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          {count > 0 && (
            <PaginationRoot
              onPageChange={handlePageChange}
              count={count}
              pageSize={10}
              page={page}
            >
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </PaginationRoot>
          )}
        </Box>
      </Box>
    </Box>
  );
}
