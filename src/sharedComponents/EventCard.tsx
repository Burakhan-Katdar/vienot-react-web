import React, { useContext } from "react";
import { Grid } from "@mui/material";
import { CompetitionModel, SharedContextModel } from "../assets/lib/Models";
import {
  companyPhotoPreLink,
  eventPhotoPreLink,
} from "../assets/lib/Constants";
import SvgVienot from "../assets/svgs/SvgVienot.svg";
import CalculateCountDown from "../assets/lib/CalculateCountDown";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SharedContext } from "../assets/lib/SharedContext";
import './EventCardStyle/EventCard.css'
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

interface EventCardModel {
  data: CompetitionModel;
}

export const GetFirstThreeAtttenderPhoto = (data: CompetitionModel) => {
  let tempPhotoArray: string[] = [];

  data.competition_conditions[0].user_competition_conditions
    .slice(0, 3)
    .map((item) => {
      let { google_user, twitter_user, social_user_profile_photo } =
        item.user.social_user;
      if (twitter_user) {
        tempPhotoArray.push(twitter_user.twitter_photo_url);
      } else if (google_user) {
        tempPhotoArray.push(google_user.google_photo);
      } else {
        tempPhotoArray.push(social_user_profile_photo);
      }
    });
  return tempPhotoArray;
};

export default function EventCard(props: EventCardModel) {
  const { data } = props;

  //@ts-ignore
  const currentContext: SharedContextModel = useContext(SharedContext);
  const { t } = useTranslation();
  let navigate = useNavigate();

  let currentData = {
    company_name: data.user.company.company_name,
    company_photo: data.user.company.company_photo
      ? companyPhotoPreLink + data.user.company.company_photo
      : SvgVienot,
    competition_photo: data.competition_photo
      ? eventPhotoPreLink + data.competition_photo
      : eventPhotoPreLink + "default-event.png",
    participantAmount:
      data.competition_conditions[0].user_competition_conditions.length,
    competition_name: data.competition_name,
    //@ts-ignore
    competition_end_date: CalculateCountDown(data.competition_end_date).text,
    first_three_attender_photo: GetFirstThreeAtttenderPhoto(data),
  };

  const HandleNavigateToEventDetail = () => {
    navigate("/EventDetail/" + props.data.id);
  };

  return (
    <Grid
      className="EventCardMain"
      style={{
        width: "320px",
        height: "210px",
        justifyContent: "space-between",
       marginLeft:'20px'
      }}
      direction={"row"}
      container
    >
      <Grid
        container
        item
        direction={"row"}
        style={{
          justifyContent: "space-between",
          marginBottom: "10px",
          flexWrap: "nowrap",
          marginLeft:'8px'
        }}
      >
        <Grid
          item
          container
          className="EventCardHeader"
          style={{
            width:'100%',
           marginBottom:'10px',
            color: currentContext.GetCurrentThemeObject().eventCardTextColor,
          }}
          direction={"row"}
        >
          <img
            alt=""
            src={currentData.company_photo}
            className='companyPhoto'
            style={{
              
              borderColor: currentContext.GetCurrentThemeObject().eventCardImageBorderColor
            }}
          ></img>
          {currentData.company_name}
        </Grid>
        <Grid
          item
          className="competitionEndDate"
          style={{
            width:'150px',
            color: currentContext.GetCurrentThemeObject().eventCardTextColor,
          }}
        >
          {currentData.competition_end_date}
        </Grid>
      </Grid>

       
      <button
        style={{
          backgroundColor:
            currentContext.GetCurrentThemeObject().eventCardBackgroundColor,
          border: "none",
        
          
        }}
        onClick={() => {
          HandleNavigateToEventDetail();
        }}
      >
        <Grid
          container
          direction={"column"}
          className='competitionPhoto'
          style={{
           width:'320px',
           height:'210px',
           
            backgroundImage: `url(${currentData.competition_photo})`,
            borderColor: currentContext.GetCurrentThemeObject().eventCardBorderColor
          }}
        >
         
          <Grid item></Grid>

          <Grid
            container
            item
            direction={"row"}
            className='eventAttendersInfo'
            
          >
            <Grid
              item
              className="attendersNumber"
              style={{alignItems:'center'}}
            >
              {/* <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ paddingRight: "8px", marginTop: "5px" }}
              >
                <path
                  d="M3.19184 15.533L1.02183 13.1982C0.82593 12.9875 0.733413 12.7335 0.744284 12.4363C0.755154 12.1391 0.865979 11.8926 1.07676 11.6966L8.08111 5.18662L8.44278 5.57575C8.54073 5.68114 8.66401 5.73656 8.8126 5.74199C8.9612 5.74743 9.08819 5.70117 9.19358 5.60322C9.29897 5.50526 9.35438 5.38199 9.35982 5.2334C9.36525 5.0848 9.319 4.95781 9.22104 4.85242L8.85938 4.46329L11.9724 1.56994C12.1832 1.37404 12.4372 1.28152 12.7344 1.29239C13.0316 1.30326 13.2781 1.41409 13.474 1.62487L15.644 3.95965C15.2144 4.35899 14.9888 4.85195 14.9673 5.43851C14.9459 6.02507 15.1348 6.53318 15.5342 6.96285C15.9335 7.39251 16.4265 7.61807 17.013 7.63953C17.5996 7.66098 18.1077 7.47204 18.5374 7.0727L20.7074 9.40748C20.9033 9.61826 20.9958 9.87225 20.9849 10.1694C20.9741 10.4666 20.8632 10.7132 20.6525 10.9091L17.5394 13.8024L17.1777 13.4133C17.0798 13.3079 16.9565 13.2525 16.8079 13.2471C16.6593 13.2416 16.5323 13.2879 16.4269 13.3858C16.3216 13.4838 16.2661 13.6071 16.2607 13.7557C16.2553 13.9042 16.3015 14.0312 16.3995 14.1366L16.7611 14.5258L9.75679 21.0358C9.54601 21.2317 9.29203 21.3242 8.99484 21.3133C8.69764 21.3025 8.4511 21.1916 8.25519 20.9809L6.08519 18.6461C6.51485 18.2467 6.74041 17.7538 6.76187 17.1672C6.78332 16.5807 6.59438 16.0725 6.19504 15.6429C5.7957 15.2132 5.30274 14.9877 4.71618 14.9662C4.12962 14.9447 3.62151 15.1337 3.19184 15.533ZM14.9528 12.5801C15.0508 12.6855 15.174 12.7409 15.3226 12.7463C15.4712 12.7518 15.5982 12.7055 15.7036 12.6076C15.809 12.5096 15.8644 12.3863 15.8698 12.2377C15.8753 12.0892 15.829 11.9622 15.7311 11.8568L15.0077 11.0785C14.9098 10.9731 14.7865 10.9177 14.6379 10.9123C14.4893 10.9068 14.3623 10.9531 14.2569 11.051C14.1515 11.149 14.0961 11.2723 14.0907 11.4209C14.0853 11.5695 14.1315 11.6965 14.2295 11.8018L14.9528 12.5801ZM12.7828 10.2453C12.8808 10.3507 13.004 10.4061 13.1526 10.4116C13.3012 10.417 13.4282 10.3707 13.5336 10.2728C13.639 10.1748 13.6944 10.0516 13.6998 9.90296C13.7053 9.75437 13.659 9.62738 13.5611 9.52199L12.8377 8.74373C12.7398 8.63834 12.6165 8.58292 12.4679 8.57749C12.3193 8.57205 12.1923 8.61831 12.0869 8.71626C11.9815 8.81421 11.9261 8.93749 11.9207 9.08608C11.9153 9.23468 11.9615 9.36167 12.0595 9.46706L12.7828 10.2453ZM10.6128 7.91054C10.7107 8.01593 10.834 8.07134 10.9826 8.07678C11.1312 8.08221 11.2582 8.03595 11.3636 7.938C11.469 7.84005 11.5244 7.71678 11.5298 7.56818C11.5353 7.41958 11.489 7.29259 11.3911 7.1872L10.6677 6.40894C10.5698 6.30355 10.4465 6.24814 10.2979 6.2427C10.1493 6.23727 10.0223 6.28353 9.91692 6.38148C9.81153 6.47943 9.75612 6.6027 9.75068 6.7513C9.74524 6.89989 9.7915 7.02689 9.88945 7.13228L10.6128 7.91054Z"
                  fill="white"
                />
              </svg> */}
              <ConfirmationNumberIcon
                          style={{
                            color:'white',
                            fontSize:20,
                            marginRight:'8px'
                          }}
                        />
              {currentData.participantAmount} {t("PeopleAttended")}
            </Grid>

            <Grid
              item
              className="attendersPhoto"
              style={{
                
                marginLeft: "30px",
                
              }}
              direction={"row-reverse"}
            >
              <Grid>
                {currentData.first_three_attender_photo.map((item, index) => (
                  <img
                    key={index.toString()}
                    alt=""
                    src={item}
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      border: "1px solid",
                      borderColor: "white",
                      marginRight: "5px",
                      float: "right",
                    }}
                  ></img>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          className="competitionName"
          style={{
            width: "240px",
            
           
            color: currentContext.GetCurrentThemeObject().eventCardTextColor
          }}
        >
          {currentData.competition_name}
        </Grid>
      </button>
    </Grid>
  );
}
