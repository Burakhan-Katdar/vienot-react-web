import React from "react";
import { Grid, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function InformationModal() {
  const { t } = useTranslation();
  //Sayfa ortasında olmalı
  //zindex 4 olacak (sadece alert 5)
  //flex yapıda olmalı, bazen text uzun gelecektir vs,
  //pink rengi görmek için yaptım
  //tasarım mobildekiyle aynı olmalı, içindeki veriler şimdilik statik olsun
  
  return (
    <Grid
      style={{
        position: "fixed",
        left: "40%",
        top: "25%",
        overflowX: "hidden",
        overflowY: "hidden",
        bottom: 0,
        right: 0,
        width: "100%",
        height: "200%",
        zIndex: 4,
      }}
    >
      <Grid
        container
        direction={"column"}
        style={{
          height: "15%",
          width: "15%",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: "40px",
          border: "0.1px solid #c1c1c1",

          flexWrap: "nowrap",
        }}
      >
        <Grid item xs={3} style={{ marginTop: "11px" }}>
          <svg
            width="14"
            height="50"
            viewBox="0 0 14 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3604 16.9778L0.769483 18.5558L0.318633 20.6451L2.79282 21.1015C4.40929 21.4864 4.72819 22.0692 4.3763 23.6801L0.318633 42.7479C-0.748018 47.6798 0.895944 50 4.76118 50C7.75769 50 11.2381 48.6145 12.816 46.7121L13.2999 44.4248C12.2002 45.3925 10.5948 45.7774 9.52811 45.7774C8.01611 45.7774 7.46629 44.7162 7.85666 42.8469L13.3604 16.9778Z"
              fill="#EB0000"
            />
            <path
              d="M8.2473 10.9964C11.2839 10.9964 13.7455 8.53477 13.7455 5.4982C13.7455 2.46163 11.2839 0 8.2473 0C5.21073 0 2.7491 2.46163 2.7491 5.4982C2.7491 8.53477 5.21073 10.9964 8.2473 10.9964Z"
              fill="#EB0000"
            />
          </svg>
        </Grid>
        <Grid
          item
          xs={1}
          style={{
            textAlign: "center",
            paddingLeft: "5px",
            paddingRight: "5px",
            fontWeight: "bold",
          }}
        >
          Bilgi
        </Grid>
        <Grid
          item
          container
          direction={"row"}
          style={{ justifyContent: "space-around" }}
        >
          <Button
            onClick={() => console.log("InformationModal Kapatıldı")}
            variant="text"
            style={{ marginBottom: "5px", color: "red" }}
          >
            {t('CloseButton')}
          </Button>
          <Button
            variant="text"
            style={{ marginBottom: "5px", color: "black" }}
            onClick={() => console.log("InformationModal Onaylandı")}
          >
            {t('OkayButton')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
