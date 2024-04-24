import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Admin from "./pages/Admin/Admin";
import Packs from "./pages/Packs/Packs";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css"


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Admin" component={Admin} />
          <Route path="/Register/:r?" component={Register} />
          <Route path="/Dashboard" component={UserRoutes} />
          <Route path="/" component={Login}/>
        </Switch>
      </div>
    </Router>

  );

  function UserRoutes() {
    return (
      <Dashboard/>
    );
  }
}

export default App;