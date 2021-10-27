import './App.css'
import {Button, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material"
import {useEffect, useState} from "react"
import axios from "axios"
import dayjs from "dayjs"

function App() {
  let [newMember, setNewMember] = useState('')
  let [targetMember, setTargetMember] = useState('')
  let [babList, setBabList] = useState([])
  useEffect(() => {
    getBabHistory()
  }, [])

  async function getBabHistory() {
    const url = "http://localhost:5000/bab"
    const { data } = await axios.get(url)
    setBabList(data)
  }

  async function babWithNewMember() {
    const url = "http://localhost:5000/bab"
    try {
      const result = await axios.post(url, {
        newMember, targetMember
      })
      console.log(result)
      getBabHistory()
    } catch (e) {
      alert(e.response.data.message)
    }
  }
  return (
    <div className="App">
      <TextField id="standard-basic" label="신규 입사자" value={newMember} onChange={e => setNewMember(e.target.value)}/>
      <TextField id="standard-basic" label="출근자 리스트" value={targetMember} onChange={e => setTargetMember(e.target.value)} />
      <Button onClick={() => babWithNewMember()}>밥 머거</Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>신규입사자</TableCell>
            <TableCell align="right">같이 밥 먹은 팀원</TableCell>
            <TableCell align="right">밥 먹은 날</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {babList.map((bab) => (
            <TableRow
              key={bab._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {bab.newMember}
              </TableCell>
              <TableCell align="right">{bab.targetMember}</TableCell>
              <TableCell align="right">{dayjs(bab.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default App
