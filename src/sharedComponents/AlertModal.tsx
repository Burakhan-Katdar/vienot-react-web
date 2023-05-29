import React from "react";
import { Grid, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AlertModalProps } from '../assets/lib/Models'

export default function AlertModal(props: AlertModalProps) {

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
        
        zIndex: 11,
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
          <svg
            width="8"
            height="40"
            viewBox="0 0 8 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.00034 40C6.20948 40 8.00034 38.2091 8.00034 36C8.00034 33.7909 6.20948 32 4.00034 32C1.7912 32 0.000335693 33.7909 0.000335693 36C0.000335693 38.2091 1.7912 40 4.00034 40Z"
              fill="url(#paint0_linear_20_9)"
            />
            <path
              d="M6.047 29.3333H1.95367C1.22367 29.3333 0.627003 28.7533 0.610336 28.03L0.000335373 1.36333C-0.0163313 0.616667 0.590335 0 1.34367 0H6.657C7.41034 0 8.017 0.616667 8.00033 1.36333L7.39033 28.03C7.37367 28.7533 6.777 29.3333 6.047 29.3333Z"
              fill="url(#paint1_linear_20_9)"
            />
            <g opacity="0.2">
              <path
                opacity="0.2"
                d="M4.00034 33C5.65367 33 7.00034 34.3467 7.00034 36C7.00034 37.6533 5.65367 39 4.00034 39C2.347 39 1.00034 37.6533 1.00034 36C1.00034 34.3467 2.347 33 4.00034 33ZM4.00034 32C1.79034 32 0.000335693 33.79 0.000335693 36C0.000335693 38.21 1.79034 40 4.00034 40C6.21034 40 8.00034 38.21 8.00034 36C8.00034 33.79 6.21034 32 4.00034 32Z"
                fill="#424242"
              />
              <path
                opacity="0.2"
                d="M6.657 1C6.787 1 6.867 1.06667 6.907 1.10333C6.95034 1.15 7.00367 1.22667 7.00034 1.34L6.39033 28.0067C6.387 28.1867 6.23034 28.3333 6.047 28.3333H1.95367C1.767 28.3333 1.61367 28.1867 1.61034 28.0067L1.00034 1.34C0.997002 1.22667 1.05034 1.15 1.09367 1.10333C1.13367 1.06667 1.21367 1 1.34367 1H6.657ZM6.657 0H1.34367C0.590335 0 -0.0163313 0.616667 0.000335373 1.36333L0.610336 28.03C0.627003 28.7533 1.22367 29.3333 1.95367 29.3333H6.04367C6.77367 29.3333 7.37034 28.7533 7.387 28.03L7.997 1.36333C8.017 0.616667 7.41034 0 6.657 0Z"
                fill="#424242"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_20_9"
                x1="4.00034"
                y1="0.130834"
                x2="4.00034"
                y2="39.7767"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FF5252" />
                <stop offset="0.2061" stop-color="#FD4D4D" />
                <stop offset="0.4365" stop-color="#F64040" />
                <stop offset="0.6787" stop-color="#EA2A2A" />
                <stop offset="0.9274" stop-color="#DA0B0B" />
                <stop offset="1" stop-color="#D50000" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_20_9"
                x1="4.00034"
                y1="0.130833"
                x2="4.00034"
                y2="39.7767"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FF5252" />
                <stop offset="0.2061" stop-color="#FD4D4D" />
                <stop offset="0.4365" stop-color="#F64040" />
                <stop offset="0.6787" stop-color="#EA2A2A" />
                <stop offset="0.9274" stop-color="#DA0B0B" />
                <stop offset="1" stop-color="#D50000" />
              </linearGradient>
            </defs>
          </svg>
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
        {props.showRightButton &&
          <Grid item>
            <Button
              //@ts-ignore
              onClick={() => props.rightButtonOnSuccess()}
              variant="text"
              style={{ marginBottom: "5px", color: "blue" }}
            >
              {t("Connect")}
            </Button>
          </Grid>}
        </Grid>
        
      </Grid>

    </Grid>
  );
}
