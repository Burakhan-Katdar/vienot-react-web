import { Grid, Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

export default function PartnerHeader() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1224px)",
  });

  const is500 = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const { t, i18n } = useTranslation();
  return (
    <Grid>
      {isDesktop && (
        <Grid
          container
          direction={"row"}
          style={{
            justifyContent: "space-between",
            color: "white",
            backgroundColor: "#482CCD",
            alignItems: "center",
            height: "100px",
            border: "2px solid #4D32CF",
          }}
        >
          <Grid
            item
            container
            direction={"row"}
            xs={3}
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              fontSize: 25,
            }}
          >
            <Grid item>{t("OurPartners")}</Grid>
            <Grid
              item
              style={{ height: "60px", width: "2px", backgroundColor: "white" }}
            ></Grid>
          </Grid>
          <Grid
            item
            container
            direction={"row"}
            xs={3}
            style={{ justifyContent: "center", alignItems: "center",  }}
          >
            <Grid item style={{ marginRight: "10px", marginTop:'8px' }}>
              <img
                src={"https://avatars.githubusercontent.com/u/48150054?v=4"}
                style={{
                  height: "75px",
                  width: "75px",
                  borderRadius: "10px",
                  border: "2px solid white",
                }}
              />
            </Grid>
            <Grid item style={{ fontSize: 20 }}>
              Burakhan Katdar
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={3}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid item style={{ marginRight: "10px", marginTop:'8px' }}>
              <img
                src={"https://avatars.githubusercontent.com/u/48150054?v=4"}
                style={{
                  height: "75px",
                  width: "75px",
                  borderRadius: "10px",
                  border: "2px solid white",
                }}
              />
            </Grid>
            <Grid item style={{ fontSize: 20 }}>
              Fatih Hazır
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={3}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid item style={{ marginRight: "10px", marginTop:'8px' }}>
              <img
                src={"https://avatars.githubusercontent.com/u/48150054?v=4"}
                style={{
                  height: "75px",
                  width: "75px",
                  borderRadius: "10px",
                  border: "2px solid white",
                }}
              />
            </Grid>
            <Grid item style={{ fontSize: 20 }}>
              Burakhan Dairedar
            </Grid>
          </Grid>
        </Grid>
      )}

      {isTablet && (
        <>
          <Grid
            container
            direction={"row"}
            style={{
              justifyContent: "space-around",
              color: "white",
              backgroundColor: "#482CCD",
              alignItems: "center",
              height: "100px",
              border: "2px solid #4D32CF",
            }}
          >
            <Grid
              item
              container
              direction={"row"}
              xs={3}
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                fontSize: 18,
              }}
            >
              <Grid item style={{ fontSize: 15 }}>
                {t("OurPartners")}
              </Grid>
              <Grid
                item
                style={{
                  height: "60px",
                  width: "2px",
                  backgroundColor: "white",
                }}
              ></Grid>
            </Grid>

            {/*PARTNERLER */}
            <Grid
              item
              container
              direction={"row"}
              xs={3}
              style={{ justifyContent: "center", alignItems: "center", }}
            >
              <Grid
                item
                style={{
                  marginRight: "12px",
                  fontSize: 14,
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  display: "grid",
                  alignContent: "center",
                }}
              >
                <img
                  src={"https://avatars.githubusercontent.com/u/48150054?v=4"}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "10px",
                    border: "1px solid white",
                    
                  }}
                />
                {/* Burakhan Katdar */}
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction={"row"}
              xs={3}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Grid
                item
                style={{
                  marginRight: "12px",
                  fontSize: 14,
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  display: "grid",
                  alignContent: "center",
                }}
              >
                <img
                  src={"https://avatars.githubusercontent.com/u/48150054?v=4"}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "10px",
                    border: "1px solid white",
                  }}
                />
                {/* Burakhan Katdar */}
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction={"row"}
              xs={3}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Grid
                item
                style={{
                  marginRight: "12px",
                  fontSize: 14,
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  display: "grid",
                  alignContent: "center",
                }}
              >
                <img
                  src={"https://avatars.githubusercontent.com/u/48150054?v=4"}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "10px",
                    border: "1px solid white",
                  }}
                />
                {/* Burakhan Katdar */}
              </Grid>
            </Grid>
            {/* 
            <Grid
              item
              container
              direction={"row"}
              xs={3}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Grid item style={{ marginRight: "12px" }}>
                <img
                  src={"https://avatars.githubusercontent.com/u/48150054?v=4"}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "10px",
                    border: "1px solid white",
                  }}
                />
              </Grid>
              <Grid item style={{ fontSize: 14, width: "20px" }}>
                Burakhan Katdar
              </Grid>
            </Grid> */}
          </Grid>
        </>
      )}
    </Grid>
  );
}
