import React from "react";
import { Grid, Button } from "@mui/material";
import { SuccessModalProps } from '../assets/lib/Models'
import { useTranslation } from "react-i18next";
import SvgDoneTick from "../assets/svgs/SvgDoneTick.svg"

export default function SuccessModal(props: SuccessModalProps) {

  const { t } = useTranslation();

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
          
          width: "350px",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          borderRadius: "60px",
          border: '0.1px solid #c1c1c1'

        }}
      >

        <Grid item style={{ marginTop: "25px" }}>
          <img style={{width:'50px'}} src={SvgDoneTick}></img>
        </Grid>
        <Grid
          item
          style={{
            textAlign: "center",
            paddingLeft: "20px",
            paddingRight: "20px",
            marginTop:'20px',
            display:'flex'
          }}
        >
          {props.description}
        </Grid>

        <Grid container item justifyContent={'space-around'} style={{marginTop:'30px', marginBottom:'20px'}}>
        <Grid item>
          <Button
            onClick={() => props.onSuccess()}
            variant="text"
            style={{ marginBottom: "5px", color: "red" }}
          >
            {t("Close")}
          </Button>
        </Grid>
        
        </Grid>
        
      </Grid>

    </Grid>
  );
}
