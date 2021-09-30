import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import './index.css';
import Login from './components/Login';
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import reportWebVitals from './reportWebVitals';
import './components/Styles.css'
import userReducer from './components/store/reducer/user'
import workoutsReducer from './components/store/reducer/workouts'
import {combineReducers, createStore} from 'redux'
import {Provider} from 'react-redux'
import WorkoutPlan from './components/WorkoutPlan';
import BaseLayoutDash from './components/BaseLayoutDash';
import StopWatchPage from './components/StopWatchPage';

const rootReducer=combineReducers({
  userReducer:userReducer,
  workoutsReducer:workoutsReducer
})

const store=createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <BaseLayoutDash>
          <Route path='/dashboard' component={Dashboard}></Route>
          <Route path='/workouts' component={WorkoutPlan}></Route>
          <Route path='/stopwatch' component={StopWatchPage}></Route>
        </BaseLayoutDash>
      </Switch>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
