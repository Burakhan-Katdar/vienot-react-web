import React from "react";
import { Grid, Button } from "@mui/material";
import VienotLogoWhite from "../assets/images/vienot-white-logo.png";
import SvgTwitterWhite from "../assets/svgs/SvgTwitterWhite.svg";
import SvgDiscordWhite from "../assets/svgs/SvgDiscordWhite.svg";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

export default function Footer() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1225px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1224px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 786px)",
  });
  const { t, i18n } = useTranslation();
  return (
    <>
    <ScopedCssBaseline>
      {isDesktop && (
        <Grid
          container
          style={{
            background: "linear-gradient(to right, #7648FB, #1A8CE8 )",
            height: "17vh",
            width: "100%",
            position: "absolute",
            marginTop: "auto",
          }}
        >
          <Grid item xs={2}></Grid>
          <Grid
            item
            container
            direction={"row"}
            style={{ justifyContent: "space-between", color: "white" }}
            xs={8}
          >
            <Grid
              item
              container
              direction={"row"}
              xs={4}
              style={{
                justifyContent: "center",

                alignItems: "center",
              }}
            >
              <Grid item>
                <Button>
                  <a href="https://twitter.com/VienotApp" target={'_blank'}>
                    <img style={{ width: "60px" }} src={SvgTwitterWhite}></img>
                  </a>
                </Button>
              </Grid>
              <Grid item>
                <Button>
                  <a href="https://discord.com/invite/NDbETtCdZu" target={'_blank'}>
                    <img style={{ width: "60px" }} src={SvgDiscordWhite}></img>
                  </a>
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={4}
              style={{
                justifyContent: "center",
                display: "grid",
                alignItems: "center",
                fontSize: 20,
              }}
            >
              <Grid item style={{ justifyContent: "center", display: "grid" }}>
                <img style={{ width: "10vw" }} src={VienotLogoWhite}></img>
              </Grid>
              <Grid item style={{ textAlign: "center" }}>
                Vienot © 2022. Closed Beta v0.1
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={4}
              style={{
                justifyContent: "center",
                display: "grid",
                alignItems: "center",
                textAlign: "center",
                fontSize: 18,
              }}
            >
              <p>
                <a
                  target={"_blank"}
                  style={{ textDecoration: "none", color: "white" }}
                  href="https://tr.litepaper.vienot.app/yardim/kullanici-soezlesmesi"
                >
                  {t("UserAgreement")} &nbsp;
                </a>
                <a
                  target={"_blank"}
                  style={{ textDecoration: "none", color: "white" }}
                  href="https://tr.litepaper.vienot.app/yardim/gizlilik-politikasi"
                >
                  - {t("PrivacyPolicy")} -
                </a>
                <a
                  target={"_blank"}
                  style={{ textDecoration: "none", color: "white" }}
                  href="https://tr.litepaper.vienot.app/yardim/cerez-politikasi"
                >
                  &nbsp; {t("CookiePolicy")}
                </a>
              </p>
            </Grid>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      )}

      {(isTablet || isMobile) && (
        <Grid
          container
          style={{
            background: "linear-gradient(to right, #7648FB, #1A8CE8 )",
            height: "70%",
            width: "140%",
            position: "absolute",
            marginTop: "auto",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Grid
            item
            container
            direction={"column"}
            style={{ justifyContent: "space-between", color: "white" }}
          >
            <Grid
              item
              container
              direction={"row"}
              style={{
                justifyContent: "center",
                marginTop: "20px",
                alignItems: "center",
              }}
            >
              <Grid item>
                <Button>
                  <a href="https://twitter.com/VienotApp" target={'_blank'}>
                    <img style={{ width: "60px" }} src={SvgTwitterWhite}></img>
                  </a>
                </Button>
              </Grid>
              <Grid item>
                <Button>
                  <a href="https://discord.com/invite/NDbETtCdZu" target={'_blank'}>
                    <img style={{ width: "60px" }} src={SvgDiscordWhite}></img>
                  </a>
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              container
              style={{
                justifyContent: "center",
                display: "grid",
                alignItems: "center",
                fontSize: 20,
              }}
            >
              <Grid item style={{ justifyContent: "center", display: "grid" }}>
                <img style={{ width: "250px" }} src={VienotLogoWhite}></img>
              </Grid>
              <Grid item style={{ textAlign: "center", marginBottom: "20px" }}>
                Vienot © 2022. Closed Beta v0.1
              </Grid>
            </Grid>
            <Grid
              item
              container
              style={{
                justifyContent: "center",
                display: "grid",
                alignItems: "center",
                textAlign: "center",
                fontSize: 18,
                marginBottom: "20px",
              }}
            >
              <p>
                <a
                  target={"_blank"}
                  style={{ textDecoration: "none", color: "white" }}
                  href="https://tr.litepaper.vienot.app/yardim/kullanici-soezlesmesi"
                >
                  {t("UserAgreement")} &nbsp;
                </a>
                <a
                  target={"_blank"}
                  style={{ textDecoration: "none", color: "white" }}
                  href="https://tr.litepaper.vienot.app/yardim/gizlilik-politikasi"
                >
                  - {t("PrivacyPolicy")} -
                </a>
                <a
                  target={"_blank"}
                  style={{ textDecoration: "none", color: "white" }}
                  href="https://tr.litepaper.vienot.app/yardim/cerez-politikasi"
                >
                  &nbsp; {t("CookiePolicy")}
                </a>
              </p>
            </Grid>
          </Grid>
        </Grid>
      )}
      
      </ScopedCssBaseline>
    </>
  );
}
