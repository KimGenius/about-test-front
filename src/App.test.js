import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

test('renders learn react link', async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        "idx": 1,
        "newMember": "a",
        "targetMember": "c,d,f,ef,,g,t,h,hj",
        "createdAt": "2021-10-27T05:18:27.000Z",
        "resultMember": "hj,g"
      }
    ],
  });
  const { getByTestId, asFragment }= render(<App />)
  const listNode = await waitFor(() => getByTestId("list"))
  expect(listNode.children).toHaveLength(1);
  expect(asFragment()).toMatchSnapshot();
  let targetEle = screen.getByText(/같이 밥 먹은 팀원/i);
  expect(targetEle).toBeInTheDocument();
  targetEle = screen.getByText(/신규입사자/i);
  expect(targetEle).toBeInTheDocument();
  // targetEle = screen.getByText(/퇴근한 팀원들/i);
  // expect(targetEle).toBeInTheDocument();
  targetEle = screen.getByText(/밥 머거/i);
  expect(targetEle).toBeInTheDocument();
});
