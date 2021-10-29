import {render, screen, waitFor} from '@testing-library/react'
import List from './List'
import axios from 'axios'

jest.mock('axios')

const data = [
  {
    "idx": 21,
    "newMember": "김영재",
    "targetMember": "강민철, 권윤하, 김민재, 이민우, 이세한, 이지선, 이형주, 최호정, 황순영",
    "createdAt": "2021-10-27T15:17:32.000Z",
    "resultMember": "이지선,이민우"
  },
  {
    "idx": 20,
    "newMember": "김영재",
    "targetMember": "강민철, 권윤하, 김민재, 이민우, 이세한, 이지선, 이형주, 최호정, 황순영",
    "createdAt": "2021-10-27T15:17:31.000Z",
    "resultMember": "이형주,김민재"
  }
]
test('List render 테스트', async () => {
  const { getByTestId, asFragment }= render(<List babList={data} />)
  const listNode = await waitFor(() => getByTestId("list"))
  expect(listNode.children).toHaveLength(data.length)
  expect(asFragment()).toMatchSnapshot()
  let targetEle = screen.getByText('같이 밥 먹은 팀원')
  expect(targetEle).toBeInTheDocument()
  targetEle = screen.getByText('신규입사자')
  expect(targetEle).toBeInTheDocument()
  targetEle = screen.getByText('밥 먹은 날')
  expect(targetEle).toBeInTheDocument()
  targetEle = screen.getAllByText('김영재')
  expect(targetEle).toHaveLength(2)
  targetEle = screen.getAllByText("강민철, 권윤하, 김민재, 이민우, 이세한, 이지선, 이형주, 최호정, 황순영")
  expect(targetEle).toHaveLength(2)
})
