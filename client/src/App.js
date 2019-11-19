import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ListScroll from "./components/list-scroll";

const App = () => {
  return (
    <Router>
      <div className="container"> 
			<Switch>
				<Route exact path="/" component={ListScroll} />
				<Route path="*" component={() => "404 NOT FOUND"}/>>
			</Switch>     
      </div>
    </Router>
  );
}

export default App;
