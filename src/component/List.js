import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material"
import dayjs from "dayjs"

function List({babList}) {
  return (
    <div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>신규입사자</TableCell>
            <TableCell align="right">같이 밥 먹은 팀원</TableCell>
            <TableCell align="right">출근한 팀원들</TableCell>
            <TableCell align="right">밥 먹은 날</TableCell>
          </TableRow>
        </TableHead>
        <TableBody data-testid={"list"}>
          {babList.map((bab) => (
            <TableRow
              className={'table-row'}
              key={bab.idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {bab.newMember}
              </TableCell>
              <TableCell align="right">{bab.resultMember}</TableCell>
              <TableCell align="right">{bab.targetMember}</TableCell>
              <TableCell align="right">{dayjs(bab.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default List
