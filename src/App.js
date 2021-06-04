import './App.css';
import {ListUsers} from './components/ListUsers/ListUsers';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={ListUsers}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
