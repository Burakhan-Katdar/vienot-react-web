import React, { useContext } from "react";
import { Grid, Button } from "@mui/material";
import { fontSize } from "@mui/system";
import "./NoLoginComponentsStyle/NoLoginComponents.css";
import { useTranslation } from "react-i18next";
import { SharedContext } from "../assets/lib/SharedContext";
import { SharedContextModel } from "../assets/lib/Models";
import { useNavigate } from "react-router-dom";

export default function NoLoginComponent() {
  //@ts-ignore
  const currentContext: SharedContextModel = useContext(SharedContext);

  const { t } = useTranslation();
  let navigate = useNavigate();
  return (
    <>
      <Grid container style={{ height: "800px" }}>
        <Grid item xs={2}></Grid>
        <Grid item container direction={"column"} xs={8}>
          <Grid item xs={2}></Grid>
          <Grid
            item
            container
            style={{ alignItems: "center" }}
            direction={"column"}
            xs={8}
          >
            <Grid
              item
              className="logoutMessage"
              style={{
                color:
                  currentContext.GetCurrentThemeObject()
                    .noLoginComponentPageTextColor,
              }}
            >
              {t("LoggedOut")}
            </Grid>
            <Grid item>
              <a
                className="turnHomePage"
                onClick={() => {
                  navigate("/");
                }}
                style={{
                  color:
                    currentContext.GetCurrentThemeObject()
                      .noLoginComponentPageTextColor,
                }}
              >
                {t("BackToMainPage")}
              </a>
            </Grid>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}
