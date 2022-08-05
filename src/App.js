import './stylesheets/App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route ,BrowserRouter as Router} from 'react-router-dom';
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
import Create from "./pages/CreateQuiz"
import SelectQuiz from './pages/SelectQuiz'; 
import PlayQuiz from "./pages/PlayQuiz";
import ApproveQuizes from './pages/ApproveQuizes';

import NavMenu from './components/component/NavMenu';
import { GamesProvider } from './contexts/GamesProvider';
import RedirectRoute from './components/route/RedirectRoute';
import GuestRoute from './components/route/GuestRoute';



function App() {
 return (
    <AuthProvider>
      <QuizesProvider>
        <GamesProvider>
        <ScrollToTop/>
        <Router>
        <NavMenu/>
          <Switch>
            <Route exact path="/">
              <RedirectRoute/>
            </Route> 

            <PrivateRoute exact path="/home">
              <Home/>
            </PrivateRoute>

            <GuestRoute exact path="/welcome">
              <Welcome/>
            </GuestRoute>

            <GuestRoute exact path="/login">
              <Login/>
            </GuestRoute>

            <GuestRoute exact path="/register">
              <Register/>
            </GuestRoute>
  
            <PrivateRoute exact path="/select">
              <SelectQuiz/>
            </PrivateRoute>

            <PrivateRoute exact path="/play">
              <PlayQuiz/>
            </PrivateRoute>

            <PrivateRoute exact path="/profile/:id">
              <Profile/>
            </PrivateRoute>

            <PrivateRoute exact path="/create">
              <Create />
            </PrivateRoute>

            <PrivateRoute exact path="/quizes/approve" role="admin" toIf={"/"}>
              <ApproveQuizes/>
            </PrivateRoute>
          
            <Route path="*">
              <NotFound/>
            </Route>
      
          </Switch>
        </Router>    
        </GamesProvider>
     </QuizesProvider>
    </AuthProvider>
 )
}

export default App;