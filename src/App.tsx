import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import EventDetailPage from "./pages/EventDetailPage";
import MainEventsPage from "./pages/MainEventsPage";
import EventGroupPage from "./pages/EventGroupPage";
import Footer from "./sharedComponents/Footer";
import Header from "./sharedComponents/Header";
import Overlay from "./sharedComponents/Overlay";
import { Grid, Pagination } from "@mui/material";
import { SharedContext } from "./assets/lib/SharedContext";
import { SharedContextModel, SocialUserModel } from "./assets/lib/Models";
import AccountSettings from './pages/AccountSettings';
import { useMediaQuery } from "react-responsive";


function App(props: any) {
  //@ts-ignore
  const currentContext: SharedContextModel = useContext(SharedContext);
  const isDesktop = useMediaQuery({
    query: "(min-width: 1225px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1224px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 786px)",
  });
  return (
    <Grid container direction={'column'} style={{ justifyContent: 'space-between' }} >
      
        
        <Overlay />
      
      <Header />
      {isDesktop && (<Grid item container style={{ minHeight: '1200px', backgroundColor: currentContext.GetCurrentThemeObject().mainEventPageBackgroundColor }}>
        <Routes>
          <Route path="/" element={<MainEventsPage />} caseSensitive />
          <Route
            path="/EventGroup/:id/:page"
            element={<EventGroupPage />}
            caseSensitive
          />
          <Route
            path="/EventDetail/:id"
            element={<EventDetailPage />}
            caseSensitive
          />
          <Route
            path="/AccountSettings"
            element={<AccountSettings />}
            caseSensitive
          />
          <Route path="*" element={null} />
        </Routes>
      </Grid>)}
      {(isMobile  || isTablet) && (<Grid item container style={{width:'140%', minHeight: '1200px', backgroundColor: currentContext.GetCurrentThemeObject().mainEventPageBackgroundColor }}>
        <Routes>
          <Route path="/" element={<MainEventsPage />} caseSensitive />
          <Route
            path="/EventGroup/:id/:page"
            element={<EventGroupPage />}
            caseSensitive
          />
          <Route
            path="/EventDetail/:id"
            element={<EventDetailPage />}
            caseSensitive
          />
          <Route
            path="/AccountSettings"
            element={<AccountSettings />}
            caseSensitive
          />
          <Route path="*" element={null} />
        </Routes>
      </Grid>)}
      <Footer />


    </Grid>
  );
}

export default App;
