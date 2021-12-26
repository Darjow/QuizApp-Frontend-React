import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route,Redirect ,BrowserRouter as Router} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import ScrollToTop from './components/functions/ScrollToTop';
import { AuthProvider} from './contexts/AuthProvider';
import { QuizesProvider } from './contexts/QuizProvider';
import QuizList from './components/component/QuizList';
import NavMenu from './components/component/NavMenu';
import PrivateRoute from "./components/route/PrivateRoute";
import Quizes from './pages/Quizes';


function App() {
 return (
    <AuthProvider>
      <QuizesProvider>
        <ScrollToTop/>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/welcome"/>
            </Route>     
            <PrivateRoute exact path="/home" loggedIn={true} toIf="/login">
              <Home/>
            </PrivateRoute>
            <PrivateRoute exact path="/welcome" loggedIn={false} toIf="/home">
              <Welcome/>
            </PrivateRoute>
            <PrivateRoute exact path="/login" loggedIn={false} toIf="/home">
              <Login/>
            </PrivateRoute>
            <PrivateRoute exact path="/register" loggedIn={false} toIf="/home">
              <Register/>
              <PrivateRoute exact path="/quizes/approve" role="admin" toIf="/home">
                <Quizes/>
              </PrivateRoute>
            </PrivateRoute>
            <Route exact path="/test">
              <QuizList/>
            </Route>
            <Route path="*">
              <NotFound/>
            </Route>
      
          </Switch>
        </Router>    
     </QuizesProvider>
    </AuthProvider>
 )
}

export default App;