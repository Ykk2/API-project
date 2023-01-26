import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SpotPage from "./components/SpotPage";
import CreateSpotForm from "./components/SpotFormPage";
import UserBookings from "./components/Bookings/UserBookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="spacer"></div>
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <Spots />
          </Route>
          <Route path="/spots/:spotId">
            <SpotPage />
          </Route>
          <Route path="/host" >
            <CreateSpotForm />
          </Route>
          <Route path="/:username/bookings">
            <UserBookings />
          </Route>
        </Switch>
      )}

    </>
  );
}

export default App;
