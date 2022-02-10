import { render } from '@testing-library/react'
import { TextInput } from '../components'

test('input field renders correctly and has the correct value', async () => {

  const input = render(<TextInput value="jeremiah" onChange={() => {}} />)

  const htmlinput: any = await input.findByTestId('inputelement');

  expect(htmlinput).toBeInTheDocument;
  expect(htmlinput.value).toEqual('jeremiah')
})


