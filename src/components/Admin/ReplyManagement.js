import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Box from '@mui/system/Box';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox'; 
import { pink } from '@mui/material/colors';
import AdminAxiosApi from '../../api/AdminAxiosApi';
import Functions from "../../util/Functions";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 60px 0px;
`;

const SearchContainer = styled.div`
  padding : 10px;
  margin-bottom: 20px;

  input {
    border: none;
    height: 40px;
    background-color: #fff;
    border: 1px solid var(--point-color);
    border-radius: 4px;
    padding: 15px 10px;
    width: 22%;
    margin-right: 4px;
  }
  .wrapper {
    display: flex;
    align-items: center;
  }
  `;

const Title = styled.h1`
  font-size: 1.6rem;
  padding : 40px 20px 30px;
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  color: var(--text-color);
  font-weight: normal;
  &:hover {
    text-decoration: underline;
  }
`;

const Table = styled.table`
  width: 100%;
  tbody :hover {
    background-color : #f5f5f5;
  }
  th,td {
    padding: 1px;
    border-bottom: 1px solid var(--line-color);
    text-align: center;
  }
  th {
    font-weight: bold;
    padding: 2px;
  }
`;

const Button = styled.button` 
  margin: 10px 0 0 10px;
  align-self: flex-start;
  line-height: 1.4rem;
  background-color: var(--line-color);
  border: 1px solid var(--hover-color);
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: var(--hover-color);
  }
`;


const ReplyManagement = () => {
  const [replies, setReplies] = useState([]);
  const [selectedreplies, setSelectedReplies] = useState([]); 
  const [selectAll, setSelectAll] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
  const getReplies = async () => {
    try {
      const response = await AdminAxiosApi.getAllReplies(token);
      setReplies(response.data);
    } catch (error) {
      await Functions.handleApiError(error);
      const newToken = Functions.getAccessToken();
      if (newToken !== token) {
        const response = await AdminAxiosApi.getAllReplies(newToken);
        setReplies(response.data);
      }
    }
  };
  getReplies();
}, [token]);

  const handleSearch = () => {
    // 검색 기능 구현 예정
  };

 
  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      const allReply = replies.map((reply) => reply.id);
      setSelectedReplies(allReply);
    } else {
      setSelectedReplies([]);
    }
  };

  const isReplieSelected = (id) => {
    return selectedreplies.includes(id);
  };

  // 체크박스 선택 
  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedReplies((prevSelected) => [...prevSelected, id]);
      console.log(selectedreplies);
    } else {
      setSelectedReplies((prevSelected) => prevSelected.filter((id) => id !== id));
    }
  };
  
  const handleDeleteReplies = async() => {
    try {
      if (selectedreplies.length === 0) {
        return;
      }
      await AdminAxiosApi.deleteReplies(selectedreplies, token);
      setSelectedReplies([]);

      const newToken = Functions.getAccessToken();
      const newResponse = await AdminAxiosApi.getAllReplies(newToken);
      setReplies(newResponse.data);
      alert('댓글이 삭제되었습니다.');
    } catch (error) {
      await Functions.handleApiError(error);
      console.log('댓글 삭제 실패:', error);
    }
  };

  return (
    <>
      <Container>
        <Title>댓글 관리</Title>
        <SearchContainer>
          <div className="wrapper">
            <input
              type="text"
              onKeyDown={handleSearch}
              placeholder="댓글 내용 / 작성자"
            />
            <Box sx={{ backgroundColor: '#FF62AD', borderRadius: '15%', padding: '3px' }}>
              <SearchIcon sx={{ color: '#FFFFFF', fontSize: 30 }} />
            </Box>
          </div>
        </SearchContainer>
        <Table>
          <thead>
            <tr>
              <th>
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  {...label} 
                  sx={{
                  color: pink[200],
                   '&.Mui-checked': {
                     color: pink[300],
                     },
                    }}
                />
              </th>
              <th>댓글 번호</th>
              <th>댓글 내용</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {replies.map((reply) => (
              <tr key={reply.id}>
                <td>
                <Checkbox
                checked={isReplieSelected(reply.id)}
                onChange={(event) => handleCheckboxChange(event, reply.id)}
                 {...label} 
                 sx={{
                 color: pink[200],
                  '&.Mui-checked': {
                    color: pink[300],
                    },
                   }}
                   />
                </td>
                <td>{reply.id}</td>
                <td>
                <TitleLink >
                      {reply.content}
                </TitleLink>
                </td>
                <td>{reply.nickname}</td>
                <td>{reply.writeDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={handleDeleteReplies}>
          삭제
        </Button>
      </Container>
    </>
  );
};  

export default ReplyManagement;
