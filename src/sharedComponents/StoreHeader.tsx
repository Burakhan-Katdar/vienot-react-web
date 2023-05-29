import { Grid, Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import SvgAppleLogoEng from "../assets/svgs/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";
import SvgAppleLogoTr from "../assets/svgs/Download_on_the_App_Store_Badge_TR_RGB_blk_100217.svg";

export default function StoreHeader() {
  const playStoreImage = require("../assets/images/playstore-beyaz.png");
  const playStoreImageEng = require("../assets/images/get-on-google-play.png");

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1224px)",
  });
  const isFull = useMediaQuery({
    query: "(max-width: 750px)",
  });
  const changeDirection = useMediaQuery({
    query: "(min-width: 750px)",
  });
  
  const { t, i18n } = useTranslation();
  return (
    <Grid>
      {isDesktop && (
        <Grid
          item
          container
          style={{
            backgroundColor: "#5E40EB",
            height: "80px",
            alignItems: "center",
          }}
        >
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={8}
            container
            justifyContent={"space-between"}
            direction={"row"}
          >
            <Grid
              item
              xs={7}
              container
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                alignItems: "center",
              }}
            >
              {t("DownloadOurApp")}
            </Grid>
            <Grid
              item
              xs={5}
              container
              direction={"row"}
              style={{ justifyContent: "space-around" }}
            >
              <Grid
                item
                xs={6}
                style={{
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  display: "grid",
                }}
              >
                <a href="https://apps.apple.com/us/app/vienot/id1617149099" target={'_blank'}>
                  {i18n.language === "tr" && (
                    <img
                      alt=""
                      src={`${SvgAppleLogoTr}`}
                      style={{ width: "150px" }}
                    />
                  )}
                  {i18n.language !== "tr" && (
                    <img
                      alt=""
                      src={`${SvgAppleLogoEng}`}
                      style={{ width: "150px" }}
                    />
                  )}
                </a>
              </Grid>
              <Grid item xs={6}>
                <a href="https://play.google.com/store/apps/details?id=com.vienot.android" target={'_blank'}>
                  {i18n.language === "tr" && (
                    <img
                      alt=""
                      src={`${playStoreImage}`}
                      style={{ width: "150px" }}
                    />
                  )}
                  {i18n.language !== "tr" && (
                    <img
                      alt=""
                      src={`${playStoreImageEng}`}
                      style={{ width: "190px" }}
                    />
                  )}
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      )}

      {isTablet && (
        <Grid
        item
        container
        style={{
          backgroundColor: "#5E40EB",
          height: "100px",
          alignItems: "center",
        }}
        justifyContent={"space-between"}
        direction={"row"}
      >
        <Grid
          item
          xs={8}
          container
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            alignItems: "center",
            paddingLeft: "4%",
          }}
        >
          {t("DownloadOurApp")}
        </Grid>

        {isFull && (
          <Grid
            item
            xs={4}
            container
            direction={"column"}
            style={{ justifyContent: "space-around",  }}
          >
            <Grid item xs={6} style={{ alignItems: 'center', justifyContent: 'center', display: 'grid', marginTop:'10px' }}>
              <a href="https://apps.apple.com/us/app/vienot/id1617149099" target={'_blank'}>

                {i18n.language === "tr" && (<img alt="" src={SvgAppleLogoTr} style={{ width: "120px" }} />)}
                {i18n.language !== "tr" && (<img alt="" src={SvgAppleLogoEng} style={{ width: "100px" }} />)}
              </a>
            </Grid>
            <Grid item xs={6} style={{ alignItems: 'center', justifyContent: 'center', display: 'grid' }}>
              <a href="https://play.google.com/store/apps/details?id=com.vienot.android" target={'_blank'}>
                {i18n.language === "tr" && (<img alt="" src={playStoreImage} style={{ width: "130px" }} />)}
                {i18n.language !== "tr" && (<img alt="" src={playStoreImageEng} style={{ width: "120px" }} />)}
              </a>
            </Grid>
          </Grid>
        )}
        {changeDirection && (
          <Grid
            item
            xs={4}
            container
            direction={"row"}
            style={{ justifyContent: "space-around", }}
          >
            <Grid item xs={6} style={{ alignItems: 'center', justifyContent: 'center', display: 'grid', }}>
              <a href="https://apps.apple.com/us/app/vienot/id1617149099" target={'_blank'}>

                {i18n.language === "tr" && (<img alt="" src={SvgAppleLogoTr} style={{ width: "120px" }} />)}
                {i18n.language !== "tr" && (<img alt="" src={SvgAppleLogoEng} style={{ width: "120px" }} />)}
              </a>
            </Grid>
            <Grid item xs={6} style={{ alignItems: 'center', justifyContent: 'center', display: 'grid' }}>
              <a href="https://play.google.com/store/apps/details?id=com.vienot.android" target={'_blank'}>
                {i18n.language === "tr" && (<img alt="" src={playStoreImage} style={{ width: "130px" }} />)}
                {i18n.language !== "tr" && (<img alt="" src={playStoreImageEng} style={{ width: "150px" }} />)}
              </a>
            </Grid>
          </Grid>
        )}
      </Grid>
      )}
    </Grid>
  );
}
