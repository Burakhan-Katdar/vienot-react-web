import React from "react";
import { Grid, Button } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { QuestionModalProps } from "../assets/lib/Models";
import { useTranslation } from "react-i18next";
import SvgQuestion from "../assets/svgs/SvgQuestion.svg";

export default function QuestionModal(props: QuestionModalProps) {
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
          <img style={{width:'50px'}} src={SvgQuestion}></img>
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

        <Grid
          item
          container
          direction={"row"}
          style={{ justifyContent: "space-around", marginTop:'30px', marginBottom:'20px' }}
        >
          <Button
            onClick={() => { props.onDeny() }}
            variant="text"
            style={{ marginBottom: "5px", color: "red" }}
          >
            {t('CloseButton')}
          </Button>
          <Button
            onClick={() => { props.onSuccess() }}
            variant="text"
            style={{ marginBottom: "5px", color: "black" }}
          >
            {t('OkayButton')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
