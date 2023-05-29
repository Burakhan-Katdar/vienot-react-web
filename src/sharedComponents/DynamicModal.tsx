import React from "react";
import { Grid, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DynamicModalProps {
  show?: boolean;
  children: any
}


export default function DynamicModal(props: DynamicModalProps) {
  const { t } = useTranslation();
  if (props.show) {
    return (
      <Grid
        style={{
          position: "fixed",
          justifyContent:'center',
          display:'grid',
          top: "20%",
          
          right: 0,
          overflowX:'hidden',
          overflowY:'hidden',
          width: "100%",
          
          zIndex: 10,
        }}
      >
        <Grid
          container
          direction={"column"}
          style={{
            flexWrap: 'nowrap',
           textAlign:'center',
           width: "350px",
           backgroundColor: "white",
           display: "flex",
           alignItems: "center",
           justifyContent: "space-evenly",
           borderRadius: "60px",
           border: '0.1px solid #c1c1c1',
           
          }}
        >
          {props.children}
        </Grid>
      </Grid>
    );
  }
  else {
    return null
  }

}
