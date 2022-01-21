import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { useContext } from "react";
import{
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { AuthContext } from "./context/authContext";
import Messanger from "./pages/messenger/Messenger";
function App() {
  const {user} = useContext(AuthContext)
  return (
    <Switch>
      <Route path = '/profile/:username'><Profile/></Route>
      <Route path = '/login'>{user ? <Redirect to = '/' /> :  <Login/>}</Route>
      <Route path = '/register'><Register/></Route>
      <Route path = '/messenger'><Messanger/></Route>
      <Route exact path = '/'>{user ? <Home/> :  <Register/>}</Route>
    </Switch>
  );
}

export default App;