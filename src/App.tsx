import './App.sass'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './HomePage'
import TagPage from './TagPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/:tag',
    element: <TagPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
