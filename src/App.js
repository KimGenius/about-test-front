import './App.css';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  let [boards, setBoards] = useState([])
  useEffect(() => {
    getBoards()
  }, [])

  // 통신 메서드
  async function getBoards() {
    const url = "http://localhost:5000/boards"
    const { data } = await axios.get(url)
    setBoards(data)
  }
  return (
    <div className="App">
      <Button>게시글 등록</Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell align="right">내용</TableCell>
            <TableCell align="right">작성일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {boards.map((board) => (
            <TableRow
              key={board._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {board.name}
              </TableCell>
              <TableCell align="right">{board.content}</TableCell>
              <TableCell align="right">{board.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
