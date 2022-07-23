import './stylesheets/App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route,Redirect ,BrowserRouter as Router} from 'react-router-dom';
import ScrollToTop from './components/functions/ScrollToTop';
import { AuthProvider} from './contexts/AuthProvider';
import { QuizesProvider } from './contexts/QuizProvider';
import PrivateRoute from "./components/route/PrivateRoute";
import {default as ApproveQuizes} from './pages/Quizes' ;
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Profile from "./pages/Profile";
import Create from "./pages/Create"
import Play from './pages/Play';
import NavMenu from './components/component/NavMenu';


function App() {
 return (
    <AuthProvider>
      <QuizesProvider>
        <ScrollToTop/>
        <Router>
        <NavMenu/>
          <Switch>
            <Route exact path="/">
              <Redirect to="/welcome"/>
            </Route> 

            <PrivateRoute path="/home" loggedIn={true} toIf="/login">
              <Home/>
            </PrivateRoute>
            <PrivateRoute path="/welcome" loggedIn={false} toIf="/home">
              <Welcome/>
            </PrivateRoute>
            <PrivateRoute path="/login" loggedIn={false} toIf="/home">
              <Login/>
            </PrivateRoute>
            <PrivateRoute path="/register" loggedIn={false} toIf="/home">
              <Register/>
              </PrivateRoute>
              <PrivateRoute path="/play" loggedIn={true} toIf="/login">
                <Play/>
              </PrivateRoute>
              <PrivateRoute path="/profile/:id" loggedIn={true} toIf = "/login">
                <Profile/>
              </PrivateRoute>
              <PrivateRoute path="/create" loggedIn={true} toIf = "/login">
                <Create />
              </PrivateRoute>
              <PrivateRoute path="/quizes/approve" role="admin" toIf="/home">
                <ApproveQuizes/>
              </PrivateRoute>

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