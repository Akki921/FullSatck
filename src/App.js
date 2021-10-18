import Addproduct from "./components/Addproduct";
import Products from "./components/Products";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Editproduct from "./components/Editproduct";

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/">
            <Addproduct />
          </Route>
          <Route exact path="/add">
            <Products />
          </Route>
          <Route exact path="/edit/:id">
            <Editproduct />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
