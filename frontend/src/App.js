import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SpotPage from "./components/SpotPage";
import CreateSpotForm from "./components/SpotFormPage";
import UserBookings from "./components/Bookings/UserBookings";
import Listings from "./components/Listings";
import AboutSite from "./components/About";

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
          <Route exact={true} path='/'>
            <Spots />
          </Route>
          <Route exact={true} path="/spots/:spotId">
            <SpotPage />
          </Route>
          <Route exact={true} path="/host" >
            <CreateSpotForm />
          </Route>
          <Route path="/bookings/:username">
            <UserBookings />
          </Route>
          <Route exact={true} path="/listings/:username">
            <Listings />
          </Route>
          <Route exact={true} path="/about/bnb">
            <AboutSite />
          </Route>
        </Switch>
      )}

    </>
  );
}

export default App;
