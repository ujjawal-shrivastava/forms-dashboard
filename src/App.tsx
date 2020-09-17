import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Switch, useLocation, matchPath, Redirect } from 'react-router-dom'
import './App.scss';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { UserProvider, UserContext } from './UserContext'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { history } from './index'
import Loading from './components/Loading/Loading';
import ForgotRequest from './pages/Forgot/ForgotRequest';
import { toast as superToast } from 'bulma-toast'

const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Forms = lazy(() => import('./pages/Forms/Forms'));
const Responses = lazy(() => import('./pages/Responses/Responses'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const FormBuilder = lazy(() => import('./pages/FormBuilder/FormBuilder'));
const FormPage = lazy(() => import('./pages/PreviewPage/FormPage'));
const Forgot = lazy(() => import('./pages/Forgot/Forgot'));


const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URL,
  credentials: 'include'
});


const errorLink = onError(({ response, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === "Login is required") {
        sessionStorage.clear()
        localStorage.clear()
        superToast({
          message: `Session Invalid! You need to login again....`,
          type: "is-black",
          position: "top-center",
          duration: 2000,
          animate: { in: 'fadeIn', out: 'fadeOut' },
          dismissible: true,
          pauseOnHover: true
        });
        history.push("/login")
      }
    }
    )
  }
  if (networkError) {
    if (response) { response.errors = [] }
    history.push("/500")
  }
}
)


const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: { errorPolicy: 'ignore' },
  },
});

function App() {
  const [navHidden, setNavHidden] = useState(false)
  const [fullPage, setFullPage] = useState(false)
  const location = useLocation();
  const [state, setState] = useState(() => {
    const currentUser = localStorage.getItem("user")
    if (currentUser) {
      sessionStorage.setItem('user', currentUser)
      return (JSON.parse(currentUser))
    }

    const user = sessionStorage.getItem("user")
    if (user) {
      return JSON.parse(user)
    }
    else {
      return { auth: false, long: false, email: "", name: "" }
    }
  }
  )

  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      setState({
        email: "",
        token: "",
        name: "",
        auth: false,
        long: ""
      })
    }
  }, [sessionStorage.getItem("user")])

  var prevScrollpos = window.pageYOffset;
  window.onscroll = () => {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      setNavHidden(false)
    } else {
      setNavHidden(true)
    }
    prevScrollpos = currentScrollPos;
  }

  useEffect(() => {
    (location.pathname === "/login" || matchPath(location.pathname, { path: '/forgot' }) || location.pathname === "/register" || location.pathname === "/preview" || location.pathname === "/500") ? setFullPage(true) : setFullPage(false)
  }, [location])

  document.body.className = fullPage ? "" : "has-navbar-fixed-top";
  return (
    <UserProvider value={[state, setState]}>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Suspense fallback={<Loading />}>
            {fullPage ? <div></div> : <Navbar hidden={navHidden} />}
            <Switch>
              <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
              <Route path="/login" component={Login} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/forgot" component={ForgotRequest} exact />
              <Route path="/forgot/:id(.{16,})" component={Forgot} exact />
              <Route path="/" component={Dashboard} exact />
              <Route path="/forms" component={Forms} exact />
              <Route path="/responses/:id([a-zA-Z0-9]{6})" component={Responses} exact />
              <Route path="/settings" component={Settings} exact />
              <Route path="/preview" component={FormPage} exact />
              <Route path="/500" exact >
                <h1>Oops! We are facing and issue :(</h1>
              </Route>
              <Route path="/create" exact >
                <FormBuilder navHidden={navHidden} />
              </Route>
              <Route path="/edit/:id([a-zA-Z0-9]{6})" exact >
                <FormBuilder navHidden={navHidden} />
              </Route>
              <Route component={NotFound} />
            </Switch>
            {fullPage ? "" : <Footer />}
          </Suspense>
        </ApolloHooksProvider>
      </ApolloProvider>
    </UserProvider>
  );
}

export default App;
