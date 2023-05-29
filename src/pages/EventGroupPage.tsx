import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ApiBaseResponseModel,
  CompetitionModel,
  SharedContextModel,
} from "../assets/lib/Models";
import { SharedContext } from "../assets/lib/SharedContext";
import { useTranslation } from "react-i18next";
import GlobalLoading from "../sharedComponents/GlobalLoading";
import ApiBase from "../assets/lib/ApiBase";
import { links } from "../assets/lib/Constants";
import { Grid, Pagination } from "@mui/material";
import EventCard from "../sharedComponents/EventCard";
import AlertModal from "../sharedComponents/AlertModal";

import "./EventGroupPageStyle/EventGroupPage.css";

enum PageGroupType {
  finished,
  started,
  aboutToStart,
}

export default function EventGroupPage() {
  const [showloading, setShowLoading] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [events, setEvents] = useState<CompetitionModel[]>();
  const [currentPage, setCurrentPage] = useState<number>();
  const [lastPage, setLastPage] = useState<number>(1);

  //@ts-ignore
  const currentContext: SharedContextModel = useContext(SharedContext);
  const { t } = useTranslation();
  let navigate = useNavigate();

  let params = useParams();
  const { id, page } = params;

  useEffect(() => {
    window.scrollTo(0,0)
    GetCompetitionsByType();
  }, []);

  const GetCompetitionsByType = () => {
    setShowLoading(true);
    currentContext.setShowOverlay(true);

    ApiBase.Get({
      place: "EventGroupPage - GetCompetitionsByType",
      url: links.getCompetitionsByGroup + "?id=" + id + "&page=" + page,
      body: {},
      successFunction: (res: any) => {
        setShowLoading(false);
        currentContext.setShowOverlay(false);
        setCurrentPage(res.data.current_page);
        setLastPage(res.data.last_page);
        setEvents(res.data.data);
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false);
        setAlertMessage(res.message);
        currentContext.setShowOverlay(true);
        setShowAlertModal(true);
      },
      exceptionFunction: (res: any) => {
        setShowLoading(false);
        currentContext.setShowOverlay(true);
        setShowAlertModal(true);
      },
    });
  };

  const HandlePageChange = (currentPaginationPage: number) => {
    window.location.href="/EventGroup/" + id + "/" +currentPaginationPage
  };

  const GetTitle = () => {
    let text = "";

    switch (id) {
      case "0":
        text = t("FinishedCompetitions");
        break;
      case "1":
        text = t("StartedCompetitions");
        break;
      case "2":
        text = t("CompetitionsAboutToStart");
        break;
      default:
        text = ".";
        break;
    }
    return (
      <p
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color:
            currentContext.GetCurrentThemeObject().eventGroupPageTitleColor,
        }}
      >
        {text}
      </p>
    );
  };
  {/* Sayfa Olduğu Gibi Responsivedir */}
  return (
    
    <Grid
      container
      className="eventGroupPage"
      style={{ minHeight: window.innerHeight }}
    >
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

      {GetTitle()}

      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid
          item
          container
          xs={8}
          className="eventGroupMain"
          // style={{ justifyContent: "space-evenly", marginBottom: "5%" }}
        >
          {events?.map((item) => (
            <Grid>
              <EventCard key={item.id.toString()} data={item} />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>

      {currentPage && (
        <Grid
        className="paginationGrid"
        style={{alignItems:'end'}}
        >
          <Pagination
            size="large"
            count={lastPage}
            color={"secondary"}
            shape="rounded"
            onChange={(event, val) => {
              HandlePageChange(val);
            }}
            page={currentPage}
            
          />
        </Grid>
      )}
    </Grid>
  );
}
