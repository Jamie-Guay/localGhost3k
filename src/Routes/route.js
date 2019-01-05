import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loginForm from '../components/login/loginForm';
import Landing from '../components/Landing/landing';
import signUpFrom from '../components/login/signUpForm';
import GhostInfoCard from '../components/ghostInfo/ghostInfoCard';
import Collapseable from '../components/Collapseable';
import hauntingForm from '../components/addHaunting/hauntingForm';
import Contactform from '../components/contact/contactus';
// import Appliedroute from '../components/nonAPI/appliedroute';
import Header from '../components/navbar/HeaderNav';
class AppContainer extends React.Component {
  render() {
    return (
      <Switch>
        <div>
          <Header />
          <Route path="/Login" exact component={loginForm} />
          <Route exact path="/" component={Landing} />
          <Route path="/Register" exact component={signUpFrom} />
          <Route path="/addHaunting" component={hauntingForm} />
          <Route path={`/Collapseable/:id`} component={Collapseable} />
          <Route path={`/ghostInfo/:id`} component={GhostInfoCard} />
          <Route path="/contact" exact component={Contactform} />
          {/* <PrivateRoute path="/protected" component={Protected} /> */}
          {/* <Route path= "*" component={NotFound} /> */}
        </div>
      </Switch>
    );
  }
}

export default AppContainer;
