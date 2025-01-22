import { Box, HStack, Input, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination.jsx";
import { Button } from "../../components/ui/button.jsx";

export function MemberList() {
  const [memberList, setMemberList] = useState([]);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState({
    type: searchParams.get("st") ?? "all",
    keyword: searchParams.get("sk") ?? "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    // 회원목록 요청
    axios
      .get("/api/member/list", {
        params: searchParams,
        signal: controller.signal,
      })
      .then((res) => res.data)
      .then((data) => {
        setMemberList(data.list);
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

  function handleRowClick(memberId) {
    navigate(`/member/${memberId}`);
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
      <h3>회원 목록</h3>

      <Table.Root interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader textAlign="center">ID</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">닉네임</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">비밀번호</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">
              가입 날짜
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {memberList.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={4} textAlign="center">
                회원 가입자 및 조회된 결과가 없습니다.
              </Table.Cell>
            </Table.Row>
          ) : (
            memberList.map((member) => (
              <Table.Row
                onClick={() => handleRowClick(member.memberId)}
                key={member.memberId}
              >
                <Table.Cell textAlign="center">{member.memberId}</Table.Cell>
                <Table.Cell textAlign="center">{member.nickname}</Table.Cell>
                <Table.Cell textAlign="center">{member.password}</Table.Cell>
                <Table.Cell textAlign="center">
                  {member.inserted.replace("T", " ")}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
      <HStack>
        <Box>
          <select
            value={search.type}
            onChange={(e) => setSearch({ ...search, type: e.target.value })}
          >
            <option value={"all"}>전체</option>
            <option value={"memberId"}>아이디</option>
            <option value={"nickname"}>별명</option>
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
