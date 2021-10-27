import './App.css'
import {Button, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material"
import {useEffect, useState} from "react"
import axios from "axios"
import dayjs from "dayjs"

function App() {
  let [name, setName] = useState([])
  let [content, setContent] = useState([])
  let [boards, setBoards] = useState([])
  useEffect(() => {
    getBoards()
  }, [])

  async function getBoards() {
    const url = "http://localhost:5000/boards"
    const { data } = await axios.get(url)
    setBoards(data)
  }

  async function createBoard() {
    const url = "http://localhost:5000/boards"
    await axios.post(url, {
      name, content
    })
    getBoards()
  }
  return (
    <div className="App">
      <TextField id="standard-basic" label="이름" value={name} onChange={e => setName(e.target.value)}/>
      <TextField id="standard-basic" label="내용" value={content} onChange={e => setContent(e.target.value)} />
      <Button onClick={() => createBoard()}>게시글 등록</Button>
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
              <TableCell align="right">{dayjs(board.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default App
