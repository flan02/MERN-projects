
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Home page</h1>} />
          <Route path='/login' element={<h1>Login</h1>} />
          <Route path='/register' element={<h1>Register</h1>} />
          <Route path='/tasks' element={<h1>Task page</h1>} />
          <Route path='/addTask' element={<h1>new Task</h1>} />
          <Route path='/tasks/:id' element={<h1>update Task</h1>} />
          <Route path='/profile' element={<h1>profile</h1>} />
        </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
