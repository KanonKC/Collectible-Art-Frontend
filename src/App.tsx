import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from './Router'
import { Provider } from 'react-redux'
import { store } from './stores'

function App() {

  return (
    <div>
        <Provider store={store}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </Provider>
    </div>
  )
}

export default App
