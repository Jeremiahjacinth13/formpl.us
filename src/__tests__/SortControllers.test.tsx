import { render, fireEvent, cleanup } from '@testing-library/react'
import { SelectField } from '../components'


afterEach(cleanup)

test('select field displays default initial value', async () => {
  const names = ['jeremiah', 'ambrose', 'david', 'fuhad']

  const selectfield = render(
    <SelectField
      name="students"
      options={names}
      value="jeremiah"
      onChange={() => {}}
    />,
  )

  const selectfieldbutton = await selectfield.findByTestId('selectvalue')

  expect(selectfieldbutton.textContent).toEqual(names[0])
})

test('the select field shows options on click', async () => {
  const selectfield = render(
    <SelectField
      name="students"
      options={['jeremiah', 'ambrose', 'david', 'fuhad']}
      value="jeremiah"
      onChange={() => {}}
    />,
  )

  const selectContainer = await selectfield.findByTestId('selectcontainer');
  
  fireEvent.focus(selectContainer)
  
  const selectoptions = await selectfield.findByTestId('selectoptions')
  expect(selectoptions).toBeInTheDocument;
})

