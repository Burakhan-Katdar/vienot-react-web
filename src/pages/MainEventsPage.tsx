import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "./../sharedComponents/EventCard";
import { links } from "../assets/lib/Constants";
import {
  ApiBaseResponseModel,
  CompetitionModel,
  SharedContextModel,
} from "../assets/lib/Models";
import ApiBase from "../assets/lib/ApiBase";
import { SharedContext } from "../assets/lib/SharedContext";
import { Grid } from "@mui/material";
import GlobalLoading from "../sharedComponents/GlobalLoading";
import { useTranslation } from "react-i18next";
import AlertModal from "../sharedComponents/AlertModal";
import "./MainEventPageStyle/MainEventPage.css";
import { useMediaQuery } from "react-responsive";

export default function MainEventsPage() {
  const [showloading, setShowLoading] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [startedEvents, setStartedEvents] = useState<CompetitionModel[]>();
  const [finishedEvents, setFinishedEvents] = useState<CompetitionModel[]>();
  const [willStartEvents, setWillStartEvents] = useState<CompetitionModel[]>();

  const { t } = useTranslation();
  //@ts-ignore
  const currentContext: SharedContextModel | any = useContext(SharedContext);

  // FOR RESPONSIVE
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1224px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 786px)",
  });

  useEffect(() => {
    GetCompetitions();
  }, []);

  const GetCompetitions = () => {
    setShowLoading(true);
    currentContext.setShowOverlay(true);

    ApiBase.Get({
      place: "MainEventsPage - GetCompetitions",
      url: links.getCompetitions,
      body: {},
      successFunction: (res: any) => {
        setShowLoading(false);
        currentContext.setShowOverlay(false);
        setStartedEvents(res.data.started_events);
        setFinishedEvents(res.data.finished_events);
        setWillStartEvents(res.data.will_start_events);
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false);
        setAlertMessage(res.message);
        currentContext.setShowOverlay(true);
        setShowAlertModal(true);
      },
      exceptionFunction: (res: any) => {
        console.log("res: ", res.response.request.response);
        setShowLoading(false);
        currentContext.setShowOverlay(true);
        setShowAlertModal(true);
      },
    });
  };

  return (
    <>
      <Grid container>
        {showloading && <GlobalLoading />}
        {showAlertModal && (
          <AlertModal
            description={alertMessage}
            onSuccess={() => {
              setShowAlertModal(false);
              currentContext.setShowOverlay(false);
            }}
          />
        )}

        <Grid item xs={2}>
          {" "}
        </Grid>

        <Grid item xs={8} style={{ minHeight: window.innerHeight }}>
          {startedEvents && startedEvents.length > 0 && (
            <>
              <p
                className="eventTitle"
                style={{
                  color:
                    currentContext.GetCurrentThemeObject()
                      .mainEventPageTitleColor,
                }}
              >
                {t("StartedCompetitions")}
              </p>
              <Grid direction={"row-reverse"} container>
                <Grid container direction={"row"} className="eventsGroup">
                  {startedEvents?.map((item) => (
                    <EventCard key={item.id.toString()} data={item} />
                  ))}
                </Grid>

                <Grid className="showMoreGrid">
                  <Link
                    className="showMoreLink"
                    style={{
                      color:
                        currentContext.GetCurrentThemeObject()
                          .mainEventPageTitleColor,
                    }}
                    to={"/EventGroup/" + 1 + "/" + 1}
                  >
                     <b>{t("ShowMore")}</b>
                  </Link>
                </Grid>
              </Grid>
              <hr
                style={{
                  height: 1,
                  backgroundColor:
                    currentContext.GetCurrentThemeObject().hrTagBackgroundColor,
                  border: "none",
                  width: "10vw",
                }}
              />
              <br />
            </>
          )}

          {willStartEvents && willStartEvents.length > 0 && (
            <>
              <p
                className="eventTitle"
                style={{
                  color:
                    currentContext.GetCurrentThemeObject()
                      .mainEventPageTitleColor,
                }}
              >
                {t("CompetitionsAboutToStart")}
              </p>
              <Grid direction={"row-reverse"} container>
                <Grid container direction={"row"} className="eventsGroup">
                  {willStartEvents?.map((item) => (
                    <EventCard key={item.id.toString()} data={item} />
                  ))}
                </Grid>
                <Grid className="showMoreGrid">
                  <Link
                    className="showMoreLink"
                    style={{
                      color:
                        currentContext.GetCurrentThemeObject()
                          .mainEventPageTitleColor,
                    }}
                    to={"/EventGroup/" + 2 + "/" + 1}
                  >
                    <b>{t("ShowMore")}</b>
                  </Link>
                </Grid>
              </Grid>
              <hr
                style={{
                  height: 1,
                  backgroundColor:
                    currentContext.GetCurrentThemeObject().hrTagBackgroundColor,
                  border: "none",
                  width: "10vw",
                }}
              />
              <br />
            </>
          )}

          {finishedEvents && finishedEvents.length > 0 && (
            <>
              <p
                className="eventTitle"
                style={{
                  color:
                    currentContext.GetCurrentThemeObject()
                      .mainEventPageTitleColor,
                }}
              >
                {t("FinishedCompetitions")}
              </p>
              <Grid direction={"row-reverse"} container>
                <Grid container direction={"row"} className="eventsGroup">
                  {finishedEvents?.map((item) => (
                    <EventCard key={item.id.toString()} data={item} />
                  ))}
                </Grid>

                <Grid className="showMoreGrid">
                  <Link
                    className="showMoreLink"
                    style={{
                      color:
                        currentContext.GetCurrentThemeObject()
                          .mainEventPageTitleColor,
                    }}
                    to={"/EventGroup/" + 0 + "/" + 1}
                  >
                    <b>{t("ShowMore")}</b>
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}
