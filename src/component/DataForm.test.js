import {render, screen} from '@testing-library/react'
import DataForm from "./DataForm";
test('DataForm render 테스트', async () => {
  render(<DataForm />)
  let targetEle = screen.getByLabelText('신규 입사자')
  expect(targetEle).toBeInTheDocument()
  targetEle = screen.getByLabelText('출근자 리스트')
  expect(targetEle).toBeInTheDocument()
  targetEle = screen.getByText('밥 머거')
  expect(targetEle).toBeInTheDocument()
})
