import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Welkom from './pages/Welcome';
import { PrivateRoute } from './components/route/PrivateRoute';


const initLogin = (username,password) => {
// TODO DATABASE QUERY
// if (valid login) {respond with return starting page}
// if (invalid login) {respond with return value "errors" -> display in loginscreen}

  console.log(`| Username:  ${username} | Password: ${password} | `)
}

const initRegister = (email,username,password,firstname, lastname) => {
  console.log(email,username,password,firstname,lastname)
   //USERNAME VALIDATION , MUST BE UNIQUE
   //EMAIL MUST BE UNIQUE
}

const loggedIn =() => {
  return localStorage.getItem("token");
} 

  

function App() {

  return (
    <Switch>
        <PrivateRoute
          path="/home"
          loggedIn={loggedIn()}
          component={Home}>
          </PrivateRoute>
        <PrivateRoute
          path="/welcome"
          loggedIn={!loggedIn()}
          component={Welkom}  >
        </PrivateRoute>
      <Route exact path="/login">
        <Login initLogin={initLogin} />
      </Route>
      <Route exact path="/register">
        <Register initRegister={initRegister}/>
      </Route>
  
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
   
  );
}

export default App;
