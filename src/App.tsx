import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from "./pages/Error page/ErrorPage.tsx";
import Home from "./pages/Home/Home.tsx";
import TodoList from "./pages/TodoList/Index.tsx";
import DetailTodo from "./pages/DetailTodo/Index.tsx";
function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>} errorElement={<ErrorPage/>}>
                  <Route path="/" element={<TodoList/>}/>
                  <Route path="/detail/:id" element={<DetailTodo/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
