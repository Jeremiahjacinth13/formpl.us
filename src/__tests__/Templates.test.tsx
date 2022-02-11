import { render } from '@testing-library/react'
import { Templates } from '../components'
import { Provider } from 'react-redux'
import { store } from '../store'

test('loader shows up immediately we the templates component renders', async () => {

  const templates = render(
    <Provider store={store}>
      <Templates />
    </Provider>,
  )
  const loader = await templates.findByTestId('loader')

  expect(loader).toBeInTheDocument
});