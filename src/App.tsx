import { Banner, Header, Templates } from './components'
import { Provider } from 'react-redux'
import { store } from './store'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Banner />
      <Templates />
    </Provider>
  )
}

export default App
