import './stylesheets/App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route,Redirect ,BrowserRouter as Router} from 'react-router-dom';
import ScrollToTop from './components/functions/ScrollToTop';
import { AuthProvider} from './contexts/AuthProvider';
import { QuizesProvider } from './contexts/QuizProvider';
import PrivateRoute from "./components/route/PrivateRoute";

import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Profile from "./pages/Profile";
import Create from "./pages/Create"
import SelectQuiz from './pages/QuizSelect'; 
import PlayQuiz from "./pages/PlayQuiz";
import ApproveQuizes from './pages/ApproveQuizes';

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
              </PrivateRoute>
  
              <PrivateRoute exact path="/select" loggedIn={true} toIf="/login">
                <SelectQuiz/>
              </PrivateRoute>

              <PrivateRoute exact path="/play" loggedIn={true} toIf="/login">
                <PlayQuiz/>
              </PrivateRoute>

              <PrivateRoute exact path="/profile/:id" loggedIn={true} toIf = "/login">
                <Profile/>
              </PrivateRoute>

              <PrivateRoute exact path="/create" loggedIn={true} toIf = "/login">
                <Create />
              </PrivateRoute>

              <PrivateRoute exact path="/quizes/approve" role="admin" toIf="/home">
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