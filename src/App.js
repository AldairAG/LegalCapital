import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Admin from "./pages/Admin/Admin";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css"


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/pages/Admin/" component={Admin} />
          <Route path="/pages/Register/" component={Register} />
          <Route path="/pages/Dashboard/" component={Dashboard} />
          <Route path="/" component={Login}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;