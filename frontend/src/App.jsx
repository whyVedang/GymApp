import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Gymexe from './gymexe'
import WorkoutForm from './components/Form'



function App() {
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Navbar/>}>
      <Route index element={<Gymexe/>} />
      <Route path='addworkout' element={<WorkoutForm/>}/>
    </Route>
  ))

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
