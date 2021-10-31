import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Welkom from './pages/Welcome';
import { PrivateRoute } from './components/route/PrivateRoute';



// TODO DATABASE QUERY
// if (valid login) {respond with return starting page}
// if (invalid login) {respond with return value "errors" -> display in loginscreen}


const initRegister = (email,username,password,firstname, lastname) => {
  console.log(email,username,password,firstname,lastname)
   //USERNAME VALIDATION , MUST BE UNIQUE
   //EMAIL MUST BE UNIQUE
}


const loggedIn = () => {

}
  

function App() {

 
  return (
    <Switch>
        <Route exact path="/">
          <Welkom/>
         </Route>

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
        <Login/>
      </Route>
      <Route exact path="/register">
        <Register/>
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
   
  );
}

export default App;
