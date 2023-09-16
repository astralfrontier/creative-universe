import './App.sass'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './Home'
import Tag from './Tag'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:tag',
    element: <Tag />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
