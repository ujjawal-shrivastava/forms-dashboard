import React, {lazy, Suspense} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.scss';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FormBuilder from './pages/FormBuilder/FormBuilder';

const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Forms = lazy(() => import('./pages/Forms/Forms'));
const Responses = lazy(() => import('./pages/Responses/Responses'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));


function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
    {(window.location.pathname==="/login"||window.location.pathname==="/register")?"":<Navbar/>}
      <Switch> 
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/" component={Dashboard} exact />
        <Route path="/forms" component={Forms} exact />
        <Route path="/responses" component={Responses} exact />
        <Route path="/settings" component={Settings} exact />
        <Route path="/add" component={FormBuilder} exact />
        <Route component={NotFound}/>
      </Switch>
      {(window.location.pathname==="/login"||window.location.pathname==="/register")?"":<Footer/>}
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
