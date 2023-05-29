import React, { useContext, useState } from "react";
import { Grid, Button } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import "./AccountSettingsStyle/AccountSettings.css";
import SvgTwitter from "../assets/svgs/SvgTwitter.svg";
import SvgTwitterWhite from "../assets/svgs/SvgTwitterWhite.svg";
import SvgDiscord from "../assets/svgs/SvgDiscord.svg";
import SvgDiscordWhite from "../assets/svgs/SvgDiscordWhite.svg";
import SvgYoutube from "../assets/svgs/SvgYoutube.svg";
import SvgYoutubeWhite from "../assets/svgs/SvgYoutubeWhite.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";
import { SharedContext } from "../assets/lib/SharedContext";
import { ApiBaseResponseModel, SharedContextModel, SocialUserModel, TwitterQueryParamsModel, QueryParamsModel, DiscordQueryParamsModel } from "../assets/lib/Models";
import { useTranslation } from "react-i18next";
import NoLoginComponent from "../sharedComponents/NoLoginComponent";
import SvgOnOffIcon from "../assets/svgs/SvgOnOffIcon.svg";
import ApiBase from "../assets/lib/ApiBase";
import { links } from "../assets/lib/Constants";
import GlobalLoading from "../sharedComponents/GlobalLoading";
import AlertModal from "../sharedComponents/AlertModal";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import QuestionModal from "../sharedComponents/QuestionModal";
import { useGoogleLogout } from 'react-google-login'


export default function AccountSettings(props: any) {
  const stringifiedSocialUserData = localStorage.getItem('SocialUser');
  let currentSocialUser: SocialUserModel
  if (stringifiedSocialUserData) {
    currentSocialUser = JSON.parse(stringifiedSocialUserData)
  }

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1224px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 786px)",
  });

  const { t, i18n } = useTranslation();

  //@ts-ignore
  const currentContext: SharedContextModel = useContext(SharedContext);

  const { socialUser } = currentContext

  const [searchParams, setSearchParams] = useSearchParams();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false)

  //@ts-ignore
  const { signOut } = useGoogleLogout({})

  React.useEffect(() => {
    if (searchParams.get("data")) {
      //@ts-ignore
      let searchParamsData: QueryParamsModel = JSON.parse(searchParams.get("data"))
      switch (searchParamsData.type) {
        case 'twitter':
          return TwitterSocialIntegration(searchParamsData.data)
        case 'discord':
          return DiscordSocialIntegration(searchParamsData.data)
        case 'youtube':
          console.log('youtube buldu parametrede')
          return YoutubeSocialIntegration(searchParamsData.data)
        default:
          break;
      }
    }


  }, [searchParams.get("data")])

  React.useEffect(() => {
    stringifiedSocialUserData && GetRecentSocialUserData()
  }, [])

  async function GetRecentSocialUserData() {
    currentContext.setShowOverlay(true)
    setShowLoading(true)
    ApiBase.Get({
      place: 'AccountSettings-web - GetRecentSocialUserData',
      url: links.getRecentSocialUserData + "?social_user_id=" + socialUser.socialUserId,
      body: {},
      successFunction: (res: ApiBaseResponseModel) => {
        let tempSocialUser = socialUser
        currentContext.setShowOverlay(false)
        setShowLoading(false)
        //Eğer dbde twitterı bağlı ama web localinde bu veri yoksa
        if (res.data.twitter_user && !socialUser.isTwitterConnected) {

          tempSocialUser.isTwitterConnected = 1
          UpdateSocialUser(tempSocialUser)
        }

        //Eğer dbde twitter bağlı değil ama locailnde bağlı görünüyorsa
        else if (!res.data.twitter_user && socialUser.isTwitterConnected) {
          tempSocialUser.isTwitterConnected = 0
          UpdateSocialUser(tempSocialUser)
        }

        //Eğer dbde dc bağlı ama web localinde bu veri yoksa
        else if (res.data.discord_user && !socialUser.isDiscordConnected) {
          tempSocialUser.isDiscordConnected = 1
          UpdateSocialUser(tempSocialUser)
        }

        //Eğer dbde dc bağlı değil ama locainde bağlı görünüyorsa
        else if (!res.data.discord_user && socialUser.isDiscordConnected) {
          tempSocialUser.isDiscordConnected = 0
          UpdateSocialUser(tempSocialUser)
        }

        //Eğer dbde youtube bağlı ama web localde bu veri yoksa
        else if (res.data.youtube_user && !socialUser.isYoutubeConnected) {
          tempSocialUser.isYoutubeConnected = 1
          UpdateSocialUser(tempSocialUser)
        }

        //Eğer dbde youtube bağlı değil ama localinde bağlı görünüyorsa
        else if (!res.data.youtube_user && socialUser.isYoutubeConnected) {
          tempSocialUser.isYoutubeConnected = 0
          UpdateSocialUser(tempSocialUser)
        }

      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false)
        setAlertMessage(res.message);
        setShowAlertModal(true);
      },
      exceptionFunction: (res: any) => {
        setShowLoading(false)
        setAlertMessage("GetRecentSocialUserData " + t('AnErrorOccuredTryAgain'));
        setShowAlertModal(true);
      },
    });
  }


  const UpdateSocialUser = (tempSocialUser: SocialUserModel) => {
    localStorage.removeItem("SocialUser")
    currentContext.setSocialUser(tempSocialUser)
    localStorage.setItem('SocialUser', JSON.stringify(tempSocialUser))
  }

  async function OnTwitterConnectPressed() {
    currentContext.setShowOverlay(true)
    setShowLoading(true)
    ApiBase.Get({
      place: 'AccountSettings-web - OnTwitterConnectPressed',
      url: links.authenticateSocialUserAtMobileForTwitter + "?isWeb=true",
      body: {},

      successFunction: (res: ApiBaseResponseModel) => {
        window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${res.data.oauth_token}`;
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false)
        setAlertMessage(res.message);
        setShowAlertModal(true);
      },
      exceptionFunction: (res: any) => {
        setShowLoading(false)
        setAlertMessage("OnTwitterConnectPressed " + t('AnErrorOccuredTryAgain'));
        setShowAlertModal(true);
      },
    });
  }

  async function OnYoutubeButtonPressed() {
    currentContext.setShowOverlay(true)
    setShowLoading(true)
    fetch('https://nodejs.vienotapp.com/api/social-medias/youtube/auth', {
      method: "GET",
      body: null
    })
      .then(response => response.json())
      .then(realResp => {
        window.location.href = realResp.data
      })
      .catch((err) => {
        console.log('err: ', err)
      })
  }

  async function OnDiscordButtonPressed() {
    currentContext.setShowOverlay(true)
    setShowLoading(true)
    ApiBase.Get({
      place: 'AccountSettings-web - OnDiscordButtonPressed',
      url: links.authenticateDiscordSocialUserAtMobile + "?isWeb=true",
      body: {},
      successFunction: (res: ApiBaseResponseModel) => {
        window.location.href = res.data
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false)
        setAlertMessage(res.message);
        setShowAlertModal(true);
      },
      exceptionFunction: (res: any) => {
        setShowLoading(false)
        setAlertMessage("onDiscordButtonPressed " + t('AnErrorOccuredTryAgain'));
        setShowAlertModal(true);
      },
    });
  }

  const TwitterSocialIntegration = (searchParamsData: TwitterQueryParamsModel) => {
    let tempSocialId: number = currentSocialUser ? currentSocialUser.socialUserId : currentContext.socialUser.socialUserId
    ApiBase.Post({
      place: 'AccountSettings-web  - TwitterSocialIntegration',
      url: links.socialIntegration,
      body: {
        loginType: 'twitter',
        twitterUserId: searchParamsData.user_id,
        twitterUserName: searchParamsData.screen_name,
        authToken: searchParamsData.oauth_token,
        authTokenSecret: searchParamsData.oauth_token_secret,
        push_token: '',
        language: i18n.language,
        referral_code: '',
        social_user_id: tempSocialId
      },
      successFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false)
        let newSocialUser: SocialUserModel = res.data
        newSocialUser.profilePhoto = socialUser.profilePhoto
        UpdateSocialUser(newSocialUser)
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false)
        setAlertMessage(t(res.message_translate));
        setShowAlertModal(true);
      },
      exceptionFunction: (res: any) => {
        setShowLoading(false)
        setAlertMessage("TwitterSocialIntegration-web " + t('AnErrorOccuredTryAgain'));
        setShowAlertModal(true);
      },
    });
  }

  const DiscordSocialIntegration = (searchParamsData: DiscordQueryParamsModel) => {
    let tempSocialId: number = currentSocialUser ? currentSocialUser.socialUserId : currentContext.socialUser.socialUserId
    ApiBase.Post({
      place: 'AccountSettings-web  - DiscordSocialIntegration',
      url: links.socialIntegration,
      body: {
        loginType: 'discord',
        access_token: searchParamsData.access_token,
        refresh_token: searchParamsData.refresh_token,
        social_user_id: tempSocialId
      },
      successFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false)
        let newSocialUser: SocialUserModel = res.data
        newSocialUser.profilePhoto = socialUser.profilePhoto
        UpdateSocialUser(newSocialUser)
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false)
        setAlertMessage(t(res.message_translate));
        setShowAlertModal(true);
      },
      exceptionFunction: (res: any) => {
        setShowLoading(false)
        setAlertMessage("TwitterSocialIntegration-web " + t('AnErrorOccuredTryAgain'));
        setShowAlertModal(true);
      },
    });
  }

  const YoutubeSocialIntegration = (searchParamsData: DiscordQueryParamsModel) => {
    let tempSocialId: number = currentSocialUser ? currentSocialUser.socialUserId : currentContext.socialUser.socialUserId
    console.log('searchParamsData: ', searchParamsData)
    ApiBase.Post({
      place: 'AccountSettings-web  - YoutubeSocialIntegration',
      url: links.socialIntegration,
      body: {
        loginType: 'youtube',
        access_token: searchParamsData.access_token,
        refresh_token: searchParamsData.refresh_token,
        social_user_id: tempSocialId
      },
      successFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false)
        console.log('eklendi : !')
        let newSocialUser: SocialUserModel = res.data
        newSocialUser.profilePhoto = socialUser.profilePhoto
        UpdateSocialUser(newSocialUser)
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false)
        setAlertMessage(t(res.message_translate));
        setShowAlertModal(true);
      },
      exceptionFunction: (res: any) => {
        setShowLoading(false)
        setAlertMessage("TwitterSocialIntegration-web " + t('AnErrorOccuredTryAgain'));
        setShowAlertModal(true);
      },
    });
  }

  const OnLogOut = () => {
    localStorage.clear()
    signOut()
    //@ts-ignore
    currentContext.setSocialUser(null)
    window.location.reload()
  }

  const DeleteAccount = () => {
    setShowQuestionModal(false)
    setShowLoading(true)
    ApiBase.Post({
      place: 'AccountSettings-web - deleteAccount',
      url: links.deleteAccount,
      body: {
        social_user_id: socialUser.socialUserId
      },
      successFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false)
        currentContext.setShowOverlay(false)
        OnLogOut()
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false)
        setAlertMessage(res.message)
        setShowAlertModal(true)
      },
      exceptionFunction: (res: any) => {
        setShowLoading(false)
        setAlertMessage("deleteAccount " + t('AnErrorOccuredTryAgain'))
        setShowAlertModal(true)
      }
    });
  }

  const DisconnectSocialAccount = (socialMediaTypeToDisconnect: string) => {
    // burada account_type parametresi aşağıdaki değerleri alabilir.
    // 18 Mayıs 2022 Parametreler Emrecan Tarafından Güncellendi.
    /*
    * twitter
    * discord
    * youtube
    * twitch
    */
    currentContext.setShowOverlay(true)
    setShowLoading(true)
    ApiBase.Post({
      place: 'AccountSettings-web  - DisconnectSocialAccount',
      url: links.disconnectSocialAccount,
      body: {
        social_user_id: socialUser.socialUserId,
        account_type: socialMediaTypeToDisconnect
      },
      successFunction: (res: ApiBaseResponseModel) => {
        SetSocialUserAfterDisconnectingSocialMediaAccount(socialMediaTypeToDisconnect)
        setShowLoading(false)
        currentContext.setShowOverlay(false)
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false)
        setAlertMessage(res.message)
        setShowAlertModal(true)
      },
      exceptionFunction: (res: any) => {
        setShowLoading(false)
        setAlertMessage("DisconnectSocialAccount " + t('AnErrorOccuredTryAgain'))
        setShowAlertModal(true)
      }
    });
  }

  const SetSocialUserAfterDisconnectingSocialMediaAccount = (accountType: string) => {
    let tempSocialUser = socialUser

    switch (accountType) {
      case 'twitter':
        tempSocialUser.isTwitterConnected = 0
        UpdateSocialUser(tempSocialUser)
        break
      case 'youtube':
        tempSocialUser.isYoutubeConnected = 0
        UpdateSocialUser(tempSocialUser)
        break
      case 'discord':
        tempSocialUser.isDiscordConnected = 0
        UpdateSocialUser(tempSocialUser)
        break
      default:
        break
    }
  }

  if (stringifiedSocialUserData) {
    return (
      <>
        {showLoading && <GlobalLoading />}
        {showAlertModal && (
          <AlertModal
            description={alertMessage}
            onSuccess={() => {
              setShowAlertModal(false);
              currentContext.setShowOverlay(false);
            }}
          />
        )}
        {showQuestionModal &&
          <QuestionModal
            description={t('DeleteAccount')}
            onDeny={() => { currentContext.setShowOverlay(false); setShowQuestionModal(false) }}
            onSuccess={() => { DeleteAccount() }}
          />}
        {isDesktop && (
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item container xs={8} className="test" >
              <Grid
                item
                container
                direction={"row"}
                style={{ marginTop: "5vh", paddingLeft: "5vw", paddingRight: '5vw', alignItems: 'center', }}
                className="accountsGroup"
              >
                <Grid item container direction={"row"} style={{
                  backgroundColor: currentContext.GetCurrentThemeObject().accountSettingsSectionBackgroundColor,

                  border: `1px solid ${currentContext.GetCurrentThemeObject().accountSettingsSectionBorderColor}`
                }} className="accountItem">
                  <Grid
                    item
                    container
                    xs={10}
                    style={{ alignItems: "center", fontSize: 25 }}
                  >
                    <Grid item>
                      <img src={currentContext.isDarkMode ? (SvgTwitterWhite) : (SvgTwitter)} alt="" className="icon" />
                    </Grid>

                    <Grid
                      item
                      style={{
                        color:
                          currentContext.GetCurrentThemeObject()
                            .accountSettingsTextColor,
                      }}
                    >
                      {currentContext.socialUser && currentContext.socialUser.isTwitterConnected ? (
                        <Grid> {t("ConnectedAccount")} </Grid>
                      ) : (
                        <Grid>{t("ConnectTwitterAccount")}</Grid>
                      )}
                    </Grid>
                  </Grid>

                  <Grid item xs={2}>
                    {currentContext.socialUser && currentContext.socialUser.isTwitterConnected ? (
                      <Button style={{ borderRadius: '20px' }} id="twitterButton" className="desktopButton" onClick={() => { DisconnectSocialAccount('twitter') }}>
                        <img
                          style={{ height: "30px", width: "30px" }}
                          src={`${SvgOnOffIcon}`}
                        />
                      </Button>
                    ) :
                      (<Button style={{ borderRadius: '20px' }} id="twitterButton" className="desktopButton" onClick={() => { OnTwitterConnectPressed() }}>
                        <LinkIcon style={{ color: "white", fontSize: 40 }} />
                      </Button>)
                    }
                  </Grid>

                </Grid>




                <Grid item container direction={"row"}
                  style={{
                    backgroundColor: currentContext.GetCurrentThemeObject().accountSettingsSectionBackgroundColor,

                    border: `1px solid ${currentContext.GetCurrentThemeObject().accountSettingsSectionBorderColor}`
                  }}
                  className="accountItem">
                  <Grid
                    item
                    container
                    xs={10}
                    style={{ alignItems: "center", fontSize: 25 }}
                  >
                    <Grid item>
                      <img src={currentContext.isDarkMode ? (SvgYoutubeWhite) : (SvgYoutube)} alt="" className="icon" />
                    </Grid>

                    <Grid
                      item
                      style={{
                        color:
                          currentContext.GetCurrentThemeObject()
                            .accountSettingsTextColor,
                      }}
                    >
                      {currentContext.socialUser && currentContext.socialUser.isYoutubeConnected ? (
                        <Grid> {t("ConnectedAccount")} </Grid>
                      ) : (
                        <Grid>{t("ConnectYoutubeAccount")}</Grid>
                      )}
                    </Grid>
                  </Grid>

                  <Grid item xs={2}>
                    {currentContext.socialUser && currentContext.socialUser.isYoutubeConnected ? (
                      <Button style={{ borderRadius: '20px' }} id="youtubeButton" className="desktopButton" onClick={() => { DisconnectSocialAccount('youtube') }}>
                        <img
                          style={{ height: "30px", width: "30px" }}
                          src={`${SvgOnOffIcon}`}
                        />
                      </Button>
                    ) :
                      (<Button style={{ borderRadius: '20px' }} id="youtubeButton" className="desktopButton" onClick={() => { OnYoutubeButtonPressed() }}>
                        <LinkIcon style={{ color: "white", fontSize: 40 }} />
                      </Button>)
                    }
                  </Grid>
                </Grid>


                <Grid item container direction={"row"}
                  style={{
                    backgroundColor: currentContext.GetCurrentThemeObject().accountSettingsSectionBackgroundColor,

                    border: `1px solid ${currentContext.GetCurrentThemeObject().accountSettingsSectionBorderColor}`
                  }}
                  className="accountItem">
                  <Grid
                    item
                    container
                    xs={10}
                    style={{ alignItems: "center", fontSize: 25 }}
                  >
                    <Grid item>
                      <img src={currentContext.isDarkMode ? (SvgDiscordWhite) : (SvgDiscord)} alt="" className="icon" />
                    </Grid>

                    <Grid
                      item
                      style={{
                        color:
                          currentContext.GetCurrentThemeObject()
                            .accountSettingsTextColor,
                      }}
                    >
                      {currentContext.socialUser && currentContext.socialUser.isDiscordConnected ? (
                        <Grid> {t("ConnectedAccount")} </Grid>
                      ) : (
                        <Grid>{t("ConnectDiscordAccount")}</Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={2} >
                    {currentContext.socialUser && currentContext.socialUser.isDiscordConnected ? (
                      <Button style={{ borderRadius: '20px' }} id="discordButton" className="desktopButton" onClick={() => { DisconnectSocialAccount('discord') }} >
                        <img
                          style={{ height: "30px", width: "30px" }}
                          src={`${SvgOnOffIcon}`}
                        />
                      </Button>
                    ) :
                      (<Button style={{ borderRadius: '20px' }} id="discordButton" className="desktopButton" onClick={() => { OnDiscordButtonPressed() }}>
                        <LinkIcon style={{ color: "white", fontSize: 40 }} />
                      </Button>)
                    }
                  </Grid>
                </Grid>
                {/* <hr style={{height:2, backgroundColor:currentContext.GetCurrentThemeObject().hrTagBackgroundColor, border:'none', width:'10%', marginLeft:'35%'}}/> */}

                <Grid item container direction={"row"}


                  className="accountItem">
                  <Grid
                    item
                    container

                    style={{ alignItems: "center", fontSize: 18, flexWrap: 'nowrap' }}
                  >
                    <Grid item>
                      <Button className="desktopButton" onClick={() => { currentContext.setShowOverlay(true); setShowQuestionModal(true) }}>
                        <DeleteIcon
                          style={{
                            fontSize: 30,
                            color: currentContext.isDarkMode ? "white" : "#ff0000",
                            marginRight: "1vw",
                          }}
                        />
                      </Button>
                    </Grid>

                    <Grid
                      item
                      style={{
                        marginLeft: "2vw",
                        color:
                          currentContext.GetCurrentThemeObject()
                            .accountSettingsTextColor,
                      }}
                    >
                      {" "}
                      {t("DeleteAccount")}{" "}
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        )}

        {isTablet && (
          <Grid container>
            <Grid
              item
              container
              direction={"column"}
              style={{ marginTop: "5vh", paddingRight: '5vw', paddingLeft: "5vw" }}
              className="accountsGroup"
            >
              <Grid item container direction={"row"}
                style={{
                  backgroundColor: currentContext.GetCurrentThemeObject().accountSettingsSectionBackgroundColor,

                  border: `1px solid ${currentContext.GetCurrentThemeObject().accountSettingsSectionBorderColor}`
                }}
                className="accountItem">
                <Grid
                  item
                  container
                  xs={10}
                  style={{ alignItems: "center", fontSize: 17 }}
                >
                  <Grid item>
                    <img src={currentContext.isDarkMode ? (SvgTwitterWhite) : (SvgTwitter)} alt="" className="icon" />
                  </Grid>

                  <Grid
                    item
                    style={{
                      color:
                        currentContext.GetCurrentThemeObject()
                          .accountSettingsTextColor,
                    }}
                  >
                    {currentContext.socialUser && currentContext.socialUser.isTwitterConnected ? (
                      <Grid> {t("ConnectedAccount")} </Grid>
                    ) : (
                      <Grid>{t("ConnectTwitterAccount")}</Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={2} >
                  {currentContext.socialUser && currentContext.socialUser.isTwitterConnected ? (
                    <Button style={{ borderRadius: '20px' }} id="twitterButton" className="desktopButton" onClick={() => { DisconnectSocialAccount('twitter') }}>
                      <img
                        style={{ height: "30px", width: "30px" }}
                        src={`${SvgOnOffIcon}`}
                      />
                    </Button>
                  ) :
                    (<Button style={{ borderRadius: '20px' }} id="twitterButton" className="desktopButton" onClick={() => { OnTwitterConnectPressed() }}>
                      <LinkIcon style={{ color: "white", fontSize: 40 }} />
                    </Button>)
                  }
                </Grid>
              </Grid>

              <Grid item container direction={"row"}

                style={{
                  backgroundColor: currentContext.GetCurrentThemeObject().accountSettingsSectionBackgroundColor,

                  border: `1px solid ${currentContext.GetCurrentThemeObject().accountSettingsSectionBorderColor}`
                }}

                className="accountItem">
                <Grid
                  item
                  container
                  xs={10}
                  style={{ alignItems: "center", fontSize: 17 }}
                >
                  <Grid item>
                    <img src={currentContext.isDarkMode ? (SvgYoutubeWhite) : (SvgYoutube)} alt="" className="icon" />
                  </Grid>

                  <Grid
                    item
                    style={{
                      color:
                        currentContext.GetCurrentThemeObject()
                          .accountSettingsTextColor,
                    }}
                  >
                    {currentContext.socialUser && currentContext.socialUser.isYoutubeConnected ? (
                      <Grid> {t("ConnectedAccount")} </Grid>
                    ) : (
                      <Grid>{t("ConnectYoutubeAccount")}</Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  {currentContext.socialUser && currentContext.socialUser.isYoutubeConnected ? (
                    <Button style={{ borderRadius: '20px' }} id="youtubeButton" className="desktopButton" onClick={() => { DisconnectSocialAccount('youtube') }}>
                      <img
                        style={{ height: "30px", width: "30px" }}
                        src={`${SvgOnOffIcon}`}
                      />
                    </Button>
                  ) :
                    (<Button style={{ borderRadius: '20px' }} id="youtubeButton" className="desktopButton" onClick={() => { OnYoutubeButtonPressed() }}>
                      <LinkIcon style={{ color: "white", fontSize: 40 }} />
                    </Button>)
                  }
                </Grid>
              </Grid>

              <Grid item container direction={"row"}
                style={{
                  backgroundColor: currentContext.GetCurrentThemeObject().accountSettingsSectionBackgroundColor,

                  border: `1px solid ${currentContext.GetCurrentThemeObject().accountSettingsSectionBorderColor}`
                }}
                className="accountItem">
                <Grid
                  item
                  container
                  xs={10}
                  style={{ alignItems: "center", fontSize: 17 }}
                >
                  <Grid item>
                    <img src={currentContext.isDarkMode ? (SvgDiscordWhite) : (SvgDiscord)} alt="" className="icon" />
                  </Grid>

                  <Grid
                    item
                    style={{
                      color:
                        currentContext.GetCurrentThemeObject()
                          .accountSettingsTextColor,
                    }}
                  >
                    {currentContext.socialUser && currentContext.socialUser.isDiscordConnected ? (
                      <Grid> {t("ConnectedAccount")} </Grid>
                    ) : (
                      <Grid>{t("ConnectDiscordAccount")}</Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  {currentContext.socialUser && currentContext.socialUser.isDiscordConnected ? (
                    <Button style={{ borderRadius: '20px' }} id="discordButton" className="desktopButton" onClick={() => { DisconnectSocialAccount('discord') }}>
                      <img
                        style={{ height: "30px", width: "30px" }}
                        src={`${SvgOnOffIcon}`}
                      />
                    </Button>
                  ) :
                    (<Button style={{ borderRadius: '20px' }} id="discordButton" className="desktopButton" onClick={() => { OnDiscordButtonPressed() }}>
                      <LinkIcon style={{ color: "white", fontSize: 40 }} />
                    </Button>)
                  }
                </Grid>
              </Grid>

              <Grid item container direction={"row"} className="accountItem">
                <Grid
                  item
                  container
                  xs={8}
                  style={{ alignItems: "center", fontSize: 14 }}
                >
                  <Grid item>
                    <Button className="desktopButton" onClick={() => { currentContext.setShowOverlay(true); setShowQuestionModal(true) }}>
                      <DeleteIcon
                        style={{
                          fontSize: 40,
                          color: currentContext.isDarkMode ? "white" : "#ff0000",
                          marginRight: "1vw",
                        }}
                      />
                    </Button>
                  </Grid>

                  <Grid
                    item
                    style={{
                      color:
                        currentContext.GetCurrentThemeObject()
                          .accountSettingsTextColor,
                    }}
                  >
                    {t('DeleteAccount')}
                  </Grid>
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </>
    );
  } else {
    return <NoLoginComponent />;
  }
}
