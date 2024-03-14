import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import RegisterForm from './UI/RegisterForm';
import LoginForm from './UI/LoginForm';
import UserDashboard from './UI/UserDashboard';


const App = () => {
    return (

            <Router>
                <Switch>
                    <Route path="/adminlogin" component={AdminLogin} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/register" component={RegisterForm} />
                    <Route path="/userDashboard" component={UserDashboard} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
    );
};

export default App;
