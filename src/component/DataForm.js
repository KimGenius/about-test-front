import {Button, TextField} from "@mui/material"
import {useState} from "react"
import axios from "axios"

function DataForm({getBabHistory}) {
  let [newMember, setNewMember] = useState('')
  let [targetMember, setTargetMember] = useState('')
  async function babWithNewMember() {
    const url = "http://localhost:4000/bab"
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
    <div>
      <TextField size={'small'} id="standard-basic" label="신규 입사자" value={newMember} onChange={e => setNewMember(e.target.value)}/>
      <TextField size={'small'} id="standard-basic" label="출근자 리스트" value={targetMember} onChange={e => setTargetMember(e.target.value)} style={{
        width: '60vw'
      }}/>
      <Button onClick={() => babWithNewMember()}>밥 머거</Button>
    </div>
  )
}

export default DataForm
