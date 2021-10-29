import './App.css'
import {useEffect, useState} from "react"
import axios from "axios"
import DataForm from "./component/DataForm"
import List from "./component/List"

function App() {
  let [babList, setBabList] = useState([])
  useEffect(() => {
    getBabHistory()
  }, [])

  async function getBabHistory() {
    const url = "http://localhost:4000/bab"
    const {data} = await axios.get(url)
    setBabList(data)
  }

  return (
    <div className="App">
      <DataForm getBabHistory={getBabHistory}/>
      <List babList={babList}/>
    </div>
  )
}

export default App
