import './App.css';
import MainPage from './components/MainPage';
import SearchPage from './components/SearchPage';
import TopPage from './components/TopPage';
import SignUp from './components/SingUp';
import SignIn from './components/SingIn';
import {Route, Routes, BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<MainPage/>}></Route>
        <Route path='sign-up' element={<SignUp/>}></Route>
        <Route path='sign-in' element={<SignIn/>}></Route>
        <Route path='search' element={<SearchPage/>}></Route>
        <Route path='top' element={<TopPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
