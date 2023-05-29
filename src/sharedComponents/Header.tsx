import React, { useContext, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import vienotWhiteLogo from "../assets/images/vienot-white-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { SharedContext } from "../assets/lib/SharedContext";
import {
  ApiBaseResponseModel,
  GoogleLoginSuccessModel,
  SharedContextModel,
  SocialUserModel,
} from "../assets/lib/Models";
import { useTranslation } from "react-i18next";
import { GoogleLogin, GoogleLogout } from "react-google-login";
//dropdown menu import
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Cloud from "@mui/icons-material/Cloud";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { fontSize } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import zIndex from "@mui/material/styles/zIndex";
import { useMediaQuery } from "react-responsive";
import AppleLogin from "react-apple-login";
import DarkModeToggle from "react-dark-mode-toggle";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { appleClientId, links } from "../assets/lib/Constants";
import AlertModal from "./AlertModal";
import ApiBase from "../assets/lib/ApiBase";
import GlobalLoading from "./GlobalLoading";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useGoogleLogout } from "react-google-login";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Avatar from "@mui/material/Avatar";

import SvgFlagTurkiye from "../assets/svgs/SvgFlagTurkiye.svg";
import SvgFlagUSA from "../assets/svgs/SvgFlagUSA.svg";
import SvgAppleLogoEng from "../assets/svgs/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";
import SvgAppleLogoTr from "../assets/svgs/Download_on_the_App_Store_Badge_TR_RGB_blk_100217.svg";
import SocketBase from "../assets/lib/SocketBase";
import PartnerHeader from "./PartnerHeader";
import StoreHeader from "./StoreHeader";

type Anchor = "top" | "left" | "bottom" | "right";

const googleLogo = require("../assets/images/googlelogo.png");
const appleLogo = require("../assets/images/applelogo.png");
const burakhan = require("../assets/images/burakhan.png");
const partnerImage2 = require("../assets/images/fatih.png");
const playStoreImage = require("../assets/images/playstore-beyaz.png");
const appStoreImage = require("../assets/images/appstore-beyaz.png");
const playStoreImageEng = require("../assets/images/get-on-google-play.png");
const appStoreImageEng = require("../assets/images/appstore_logo_black.png");

const MaterialUISwitchMobil = styled(Switch)(({ theme }) => ({
  width: 48,
  height: 27,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,


      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 24,
    height: 24,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 64,
  height: 35,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 0,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,


      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 35,
    height: 35,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function Header() {
  //@ts-ignore
  const currentContext: SharedContextModel = useContext(SharedContext);
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();

  let socketInstance = SocketBase.GetSocketInstance();

  const [showloading, setShowLoading] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const ChangeLanguageToTr = () => {
    localStorage.setItem("SelectedLanguage", "tr");
    i18n.changeLanguage("tr");
  };

  const ChangeLanguageToEn = () => {
    localStorage.setItem("SelectedLanguage", "en");
    i18n.changeLanguage("en");
  };

  React.useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // dark mode
      currentContext.setIsDarkMode(true);
    }
  }, []);

  React.useEffect(() => {
    let socUser;
    if (localStorage.getItem("SocialUser")) {
      //@ts-ignore
      socUser = JSON.parse(localStorage.getItem("SocialUser"));
    }
  }, []);

  //FOR RESPONSIVE
  const isDesktop = useMediaQuery({
    query: "(min-width: 1225px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1224px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 786px)",
  });
  const isFull = useMediaQuery({
    query: "(max-width: 750px)",
  });
  const changeDirection = useMediaQuery({
    query: "(min-width: 750px)",
  });

  //FOR HAMBURGERMENU
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //FOR RIGHTSIDEBAR
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      style={{ background: "linear-gradient(to right, #7648FB, #1A8CE8 )" }}
    >
      <List style={{ color: "white" }}>
        <ListItem disablePadding>
          <ListItemButton onClick={toggleDrawer(anchor, false)}>
            <ListItemIcon>
              <CloseIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Kapat"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {/* <DarkModeToggle
                onChange={() =>
                  currentContext.setIsDarkMode(!currentContext.isDarkMode)
                }
                checked={currentContext.isDarkMode}
                speed={1}
                size={40}
              /> */}
              <MaterialUISwitchMobil
                onChange={() =>
                  currentContext.setIsDarkMode(!currentContext.isDarkMode)
                }
                checked={currentContext.isDarkMode}
              />
            </ListItemIcon>
            <ListItemText primary={"Tema"} />
          </ListItemButton>
        </ListItem>

      </List>
      <Divider style={{ backgroundColor: "white" }} />
      <List style={{ color: "white" }}>
        <ListItem disablePadding>
          <GoogleLogin
            clientId={
              "255606979904-tqkc1nfh22hbpqrhh58603gsqnsrrov0.apps.googleusercontent.com"
            }
            render={(renderProps) => (
              <ListItemButton
                onClick={() => {
                  renderProps.onClick();
                }}
              >
                <ListItemIcon>
                  <GoogleIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={t("SigninWithGoogle")} />
              </ListItemButton>
            )}
            buttonText="Login"
            //@ts-ignore
            onSuccess={OnSuccessGoogleLogin}
            onFailure={OnFailGoogleLogin}
            cookiePolicy={"single_host_origin"}
            isSignedIn={false}
            autoLoad={false}
          />
        </ListItem>

        {/* <ListItem disablePadding>
          <AppleLogin
            clientId="com.react.apple.login"
            render={(renderProps) => (
              <ListItemButton onClick={renderProps.onClick}>
                <ListItemIcon>
                  <AppleIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={t("SigninWithApple")} />
              </ListItemButton>
            )}
            redirectURI="https://redirectUrl.com"
          />
        </ListItem> */}

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              ChangeLanguageToTr();
            }}
          >
            <ListItemIcon>
              <img
                src={`${SvgFlagTurkiye}`}
                style={{ height: "30px", width: "30px" }}
                alt=""
              />
            </ListItemIcon>
            <ListItemText primary="Türkçe" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              ChangeLanguageToEn();
            }}
          >
            <ListItemIcon>
              <img
                src={`${SvgFlagUSA}`}
                style={{ height: "30px", width: "30px" }}
                alt=""
              />
            </ListItemIcon>
            <ListItemText primary="English" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const listLogin = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      style={{ background: "linear-gradient(to right, #7648FB, #1A8CE8 )" }}
    >
      <List style={{ color: "white" }}>
        <ListItem disablePadding>
          <ListItemButton onClick={toggleDrawer(anchor, false)}>
            <ListItemIcon>
              <CloseIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={t("Close")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {/* <DarkModeToggle
                onChange={() =>
                  currentContext.setIsDarkMode(!currentContext.isDarkMode)
                }
                checked={currentContext.isDarkMode}
                speed={1}
                size={40}
              /> */}
              <MaterialUISwitchMobil
                onChange={() =>
                  currentContext.setIsDarkMode(!currentContext.isDarkMode)
                }
                checked={currentContext.isDarkMode}
              />
            </ListItemIcon>
            <ListItemText primary={t("Theme")} />
          </ListItemButton>
        </ListItem>

      </List>
      <Divider style={{ backgroundColor: "white" }} />
      <List style={{ color: "white" }}>
        <ListItem disablePadding>
          {currentContext.socialUser.profilePhoto && (
            <img
              style={{
                width: "20%",
                border: "2px solid white",
                borderRadius: "50%",
                marginLeft: "15px",
                marginRight: "10px",
                marginBottom: "5px",
              }}
              src={`${currentContext.socialUser.profilePhoto}`}
            ></img>
          )}
          <ListItemText primary={currentContext.socialUser.displayName} />
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/AccountSettings");
              currentContext.setShowDropDown(false);
            }}
          >
            <ListItemIcon>
              <ManageAccountsIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={t("AccountSettings")} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              ChangeLanguageToTr();
            }}
          >
            <ListItemIcon>
              <img
                src={`${SvgFlagTurkiye}`}
                style={{ height: "30px", width: "30px" }}
                alt=""
              />
            </ListItemIcon>
            <ListItemText primary="Türkçe" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              ChangeLanguageToEn();
            }}
          >
            <ListItemIcon>
              <img
                src={`${SvgFlagUSA}`}
                style={{ height: "30px", width: "30px" }}
                alt=""
              />
            </ListItemIcon>
            <ListItemText primary="English" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <GoogleLogout
            clientId={
              "255606979904-tqkc1nfh22hbpqrhh58603gsqnsrrov0.apps.googleusercontent.com"
            }
            buttonText="Logout"
            onLogoutSuccess={OnSuccessGoogleLogout}
            onFailure={OnFailGoogleLogout}
            render={(renderProps) => (
              <ListItemButton onClick={renderProps.onClick}>
                <ListItemIcon>
                  <LogoutIcon style={{ color: "white" }} />
                </ListItemIcon>

                <ListItemText>{t("Logout")}</ListItemText>
              </ListItemButton>
            )}
          />
        </ListItem>
      </List>
    </Box>
  );

  const OnSuccessGoogleLogin = (response: GoogleLoginSuccessModel) => {
    currentContext.setShowOverlay(true);
    setShowLoading(true);

    const stringifiedSocialUserData = localStorage.getItem("SocialUser");

    if (stringifiedSocialUserData) {
      //@ts-ignore
      const socialUserDataAsObjectAgain = JSON.parse(stringifiedSocialUserData);
      currentContext.setSocialUser(socialUserDataAsObjectAgain);
      currentContext.setShowOverlay(false);
      setShowLoading(false);
    } else {
      let dataToBackend: object = {
        loginType: "google",
        google_access_token: "",
        google_id_token: "",
        google_email: response.profileObj.email,
        family_name: response.profileObj.familyName,
        given_name: response.profileObj.givenName,
        google_user_id: response.profileObj.googleId,
        google_full_name: response.profileObj.name,
        google_photo: response.profileObj.imageUrl,
        language: i18n.language,
        referral_code: "android",
      };
      LoginSocial(dataToBackend);
    }
  };

  const OnFailGoogleLogin = (response: any) => {
    currentContext.setShowOverlay(true);
    setAlertMessage(response.error);
    setShowAlertModal(true);
  };

  const OnSuccessGoogleLogout = () => {
    //@ts-ignore
    currentContext.setSocialUser(null);
    localStorage.removeItem("SocialUser");
    localStorage.clear();
    currentContext.setShowDropDown(false);
    if (window.location.pathname == "/") {
      window.location.reload();
    } else {
      window.location.href = "/";
    }
  };

  const OnFailGoogleLogout = () => {
    currentContext.setShowOverlay(true);
    setAlertMessage(t("AnErrorOccuredDuringLogout"));
    setShowAlertModal(true);
  };

  const LoginSocial = (data: object) => {
    ApiBase.Post({
      place: "Header - LoginSocial",
      url: links.socialLogin,
      body: data,
      successFunction: (res: ApiBaseResponseModel) => {
        localStorage.removeItem("SocialUser");
        localStorage.setItem("SocialUser", JSON.stringify(res.data));
        currentContext.setSocialUser(res.data);
        setShowLoading(false);
        currentContext.setShowOverlay(false);
        setShowLoading(false);
        currentContext.setShowDropDown(false);
        window.location.reload();
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false);
        setAlertMessage(t("TryAgain"));
        setShowAlertModal(true);
      },
      exceptionFunction: (res: any) => {
        setShowLoading(false);
        setAlertMessage("LoginSocial " + t("AnErrorOccuredTryAgain"));
        setShowAlertModal(true);
      },
    });
  };

  const GetDynamicDropDown = () => {
    if (currentContext.socialUser) {
      return (
        <Grid
          container
          style={{ display: currentContext.showDropDown ? "" : "none" }}
        >
          <Grid item xs={2}></Grid>
          <Grid item container xs={8} direction={"row-reverse"}>
            <Grid
              item
              style={{
                color: "black",
                zIndex: 3,
                position: "absolute",
              }}
            >
              <Paper
                sx={{
                  width: 320,
                  maxWidth: "100%",
                  background: "linear-gradient(to right, #7648FB, #1A8CE8 )",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                <MenuList style={{ color: "white" }}>
                  <MenuItem
                    onClick={() => {
                      navigate("/AccountSettings");
                      currentContext.setShowDropDown(false);
                    }}
                  >
                    {/* <ListItemIcon>
                        <ContentCut fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Cut</ListItemText> */}

                    <ListItemText>{t("AccountSettings")}</ListItemText>
                  </MenuItem>

                  <Divider />
                  <GoogleLogout
                    clientId={
                      "255606979904-tqkc1nfh22hbpqrhh58603gsqnsrrov0.apps.googleusercontent.com"
                    }
                    buttonText="Logout"
                    onLogoutSuccess={OnSuccessGoogleLogout}
                    onFailure={OnFailGoogleLogout}
                    render={(renderProps) => (
                      <MenuItem onClick={renderProps.onClick}>
                        <LogoutIcon />
                        <ListItemText>{t("Logout")}</ListItemText>
                      </MenuItem>
                    )}
                  />
                </MenuList>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      );
    }
    //login değilse
    else {
      return (
        <Grid
          container
          style={{ display: currentContext.showDropDown ? "" : "none" }}
        >
          <Grid item xs={2}></Grid>
          <Grid item container xs={8} direction={"row-reverse"}>
            <Grid
              item
              style={{
                color: "black",
                zIndex: 3,
                position: "absolute",
              }}
            >
              <Paper
                sx={{
                  width: 320,
                  maxWidth: "100%",
                  background: "linear-gradient(to right, #7648FB, #1A8CE8 )",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                <MenuList>
                  <MenuItem>
                    {/* <ListItemIcon>
                        <ContentCut fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Cut</ListItemText> */}
                    <GoogleLogin
                      clientId={
                        "255606979904-tqkc1nfh22hbpqrhh58603gsqnsrrov0.apps.googleusercontent.com"
                      }
                      render={(renderProps) => (
                        <Button
                          style={{
                            color: "black",
                            backgroundColor: "white",
                            width: "100%",
                            borderRadius: "40px",
                            textTransform: "none",
                          }}
                          onClick={() => {
                            renderProps.onClick();
                          }}
                        >
                          <Grid
                            container
                            style={{
                              alignItems: "center",
                              justifyContent: "space-between",
                              fontWeight: "bold",
                              paddingRight: "40px",
                              paddingLeft: "50px",
                            }}
                          >
                            <Grid item>
                              <img
                                src={googleLogo}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  marginRight: "10px",
                                }}
                              />
                            </Grid>
                            <Grid item>{t("SigninWithGoogle")}</Grid>
                          </Grid>
                        </Button>
                      )}
                      buttonText="Login"
                      //@ts-ignore
                      onSuccess={OnSuccessGoogleLogin}
                      onFailure={OnFailGoogleLogin}
                      cookiePolicy={"single_host_origin"}
                      isSignedIn={false}
                      autoLoad={false}
                    />
                  </MenuItem>
                  {/* <MenuItem>
                    <AppleLogin
                      clientId={appleClientId}
                      render={(renderProps) => (
                        <Button
                          style={{
                            color: "black",
                            backgroundColor: "white",
                            width: "100%",
                            borderRadius: "40px",
                            textTransform: "none",
                          }}
                          onClick={renderProps.onClick}
                        >
                          <Grid
                            container
                            style={{
                              alignItems: "center",
                              justifyContent: "space-between",
                              fontWeight: "bold",
                              paddingRight: "50px",
                              paddingLeft: "50px",
                            }}
                          >
                            <Grid item>
                              <img
                                src={appleLogo}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  marginRight: "10px",
                                }}
                              />
                            </Grid>
                            <Grid item> {t("SigninWithApple")}</Grid>
                          </Grid>
                        </Button>
                      )}
                      redirectURI="http://localhost:3000"
                    />
                  </MenuItem> */}

                  {/* <Divider />
                    <MenuItem>
                      <ListItemIcon>
                        <Cloud fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Web Clipboard</ListItemText>
                    </MenuItem> */}
                </MenuList>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      );
    }
  };

  React.useEffect(() => {
    if (currentContext.socialUser) {
      currentContext.setShowOverlay(true);
      setShowLoading(true);
      ApiBase.Get({
        place: "Header-web- CheckIfUserIsStillExist",
        url:
          links.checkIfUserIsStillExist +
          "?social_user_id=" +
          currentContext.socialUser.socialUserId,
        body: {},
        successFunction: (res: ApiBaseResponseModel) => {
          if (res.data) {
            currentContext.setShowOverlay(false);
            setShowLoading(false);
          } else {
            setAlertMessage(t("DeletedAccountDetectedWarning"));
            setShowLoading(false);
            setShowAlertModal(true);
            setTimeout(() => {
              OnLogOut();
            }, 1500);
          }
        },
        errorFunction: (res: ApiBaseResponseModel) => {
          setAlertMessage(res.message);
          setShowLoading(false);
          setShowAlertModal(true);
        },
        exceptionFunction: (res: any) => {
          setAlertMessage(res.message);
          setShowLoading(false);
          setShowAlertModal(true);
        },
      });
    }
  }, [currentContext.socialUser]);

  React.useEffect(() => {
    // Links.ts dosyasındaki socket linkine dikkat et çalışmaya başlamadan önce
    const stringifiedSocialUserData = localStorage.getItem("SocialUser");
    let currentSocialUser: SocialUserModel;
    console.log("socket useeffect : ", socketInstance);

    if (stringifiedSocialUserData) {
      currentSocialUser = JSON.parse(stringifiedSocialUserData);
      let tempSocialId: number = currentSocialUser.socialUserId;

      // socketInstance.on('twitterConnected', (data) => {
      //   console.log("twitterConnected");
      //   console.log("data : ", data);
      //   console.log('soc user : ', currentSocialUser);
      //   if (data.data.social_user_id == tempSocialId) {
      //     let tempSocialUser = currentSocialUser
      //     tempSocialUser.isTwitterConnected = 1
      //     tempSocialUser.twitter_user = data.data.twitter_user
      //     UpdateSocialUser(tempSocialUser)
      //   }
      // })
      // socketInstance.on('youtubeConnected', (data) => {
      //   console.log('youtubeConnected: ', data)
      //   console.log('soc user : ', currentSocialUser);
      //   if (data.data.social_user_id == tempSocialId) {
      //     let tempSocialUser = currentSocialUser
      //     tempSocialUser.isYoutubeConnected = 1
      //     tempSocialUser.youtube_user = data.data.youtube_user
      //     UpdateSocialUser(tempSocialUser)
      //   }
      // })
      // socketInstance.on('discordConnected', (data) => {
      //   console.log("discordConnected");
      //   if (data.data.social_user_id == tempSocialId) {
      //     let tempSocialUser = currentSocialUser
      //     tempSocialUser.isDiscordConnected = 1
      //     tempSocialUser.discord_user = data.data.discord_user
      //     UpdateSocialUser(tempSocialUser)
      //   }
      // })

      // socketInstance.on('twitterDisconnected', (data) => {
      //   console.log("twitterDisconnected");
      //   console.log("data : ", data);
      //   console.log('soc user : ', currentSocialUser);
      //   if (data.data.social_user_id == tempSocialId) {
      //     let tempSocialUser = currentSocialUser
      //     tempSocialUser.isTwitterConnected = 0
      //     UpdateSocialUser(tempSocialUser)
      //   }
      // })
      // socketInstance.on('youtubeDisconnected', (data) => {
      //   console.log('youtubeDisconnected data : ', data)
      //   console.log('soc user : ', currentSocialUser);
      //   if (data.data.social_user_id == tempSocialId) {
      //     let tempSocialUser = currentSocialUser
      //     tempSocialUser.isYoutubeConnected = 0
      //     UpdateSocialUser(tempSocialUser)
      //   }
      // })
      // socketInstance.on('discordDisconnected', (data) => {
      //   console.log("discordDisconnected");
      //   console.log("data.data.social_user_id : ", data.data.social_user_id);
      //   console.log("currentSocialUser.socialUserId : ", tempSocialId);
      //   if (data.data.social_user_id == tempSocialId) {
      //     let tempSocialUser = currentSocialUser
      //     tempSocialUser.isDiscordConnected = 0
      //     UpdateSocialUser(tempSocialUser)
      //   }
      // })

      socketInstance.on("accountDeleted", (data) => {
        if (data.data.social_user_id == tempSocialId) {
          OnLogOut();
        }
      });
    }
    /*
        Diğer socket id lerini buraya yazıyorum. Bunları sadece dinleyeceksin.
        Sakın emit etme client tarafında. Sadece server verileri gönderecek.

        attenderCount -> Katılımcı sayısı
        competitionAttended -> Katıl butonuna tıklandığı an
        twitterFollow -> Follow şartı gerçekleşince
        twitterRetweet -> Retweet şartı gerçekleşince
        twitterTweet -> Tweet At şartı gerçekleşince
        twitterComment -> Comment At şartı gerçekleşince
        youtubeSubscribe -> Youtube Subscribe şartı gerçekleşince
        youtubeLike -> Youtube Like şartı gerçekleşince
        discordJoin -> Discord Join şartı gerçekleşince

    */
  }, [socketInstance]);

  const UpdateSocialUser = (tempSocialUser: SocialUserModel) => {
    currentContext.setSocialUser(tempSocialUser);
    localStorage.setItem("SocialUser", JSON.stringify(tempSocialUser));
    if (window.location.pathname == "/AccountSettings") {
      window.location.reload();
    }
  };

  const OnLogOut = () => {
    localStorage.clear();
    //@ts-ignore
    currentContext.setSocialUser(null);
    setTimeout(() => {
      if (window.location.pathname == "/") {
        window.location.reload();
      } else {
        window.location.href = "/";
      }
    }, 2500);


  };

  return (
    <>
      {isDesktop && (
        <Grid container direction={"column"}>
          {showAlertModal && (
            <AlertModal
              description={alertMessage}
              onSuccess={() => {
                setShowAlertModal(false);
                currentContext.setShowOverlay(false);
              }}
            />
          )}

          {showloading && <GlobalLoading />}
          {/* ÜSt HEader*/}
          <Grid
            container
            item
            style={{
              background: "linear-gradient(to right, #7648FB, #1A8CE8 )",
              height: "80px",
            }}
          >
            <Grid item xs={2}></Grid>
            <Grid
              item
              xs={8}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                onClick={() => {
                  navigate("/");
                }}
              >
                <Grid
                  container
                  className="slogan"
                  style={{
                    alignItems: "center",
                    flexWrap: "nowrap",
                    width: "500px",
                    color: "white",
                    fontSize: 30,
                  }}
                >
                  <img
                    src={`${vienotWhiteLogo}`}
                    alt=""
                    style={{ width: "30%", marginRight: "15px" }}
                  />
                  {t("VienotSlogan")}
                </Grid>
              </div>
              <Grid
                direction={"row-reverse"}
                container
                style={{
                  alignItems: "center",
                  flexWrap: "nowrap",
                  width: "300px",
                  color: "white",
                  fontSize: 15,
                  marginRight: "10px",
                }}
              >
                {/* <TextField
                  id="input-with-icon-textfield"
                  style={{ color: "white" }}
                  inputProps={{ style: { color: "white" } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon style={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                /> */}
                {currentContext.socialUser ? (
                  // Kullanıcı login olduktan sonra görünecek kısım
                  <Grid>
                    <Button
                      onClick={() => {
                        currentContext.setShowDropDown(
                          !currentContext.showDropDown
                        );
                      }}
                    >
                      {currentContext.socialUser.profilePhoto && (
                        <img
                          style={{
                            height: "50px",
                            width: "50px",
                            border: "2px solid white",
                            borderRadius: "50%",
                          }}
                          src={`${currentContext.socialUser.profilePhoto}`}
                        ></img>
                      )}
                    </Button>
                  </Grid>
                ) : (
                  // Kullanıcı login değilse görünecek kısım
                  <Button
                    style={{
                      color: "white",
                      textTransform: "none",
                      fontSize: 15,
                      width: "100px",
                    }}
                    variant="text"
                    onClick={() => {
                      currentContext.setShowDropDown(
                        !currentContext.showDropDown
                      );
                    }}
                  >
                    {t("Login")}
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid item container xs={2} style={{ alignItems: "center" }}>
              {/* <DarkModeToggle
                onChange={() =>
                  currentContext.setIsDarkMode(!currentContext.isDarkMode)
                }
                checked={currentContext.isDarkMode}
                speed={1}
                size={60}
              /> */}
              {/*yorum satırıdır*/}
              <MaterialUISwitch
                onChange={() =>
                  currentContext.setIsDarkMode(!currentContext.isDarkMode)
                }
                checked={currentContext.isDarkMode}
              />
              <Grid>
                <React.Fragment>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Tooltip title="">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        {i18n.language == "tr" && (
                          // <img
                          //   style={{ height: "40px", width: "40px" }}
                          //   src={`${SvgFlagTurkiye}`}
                          // />
                          <Grid style={{ color: "white" }}>TR</Grid>
                        )}
                        {i18n.language != "tr" && (
                          // <img
                          //   style={{ height: "40px", width: "40px" }}
                          //   src={`${SvgFlagUSA}`}
                          // />
                          <Grid style={{ color: "white" }}>EN</Grid>
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={() => {
                        ChangeLanguageToTr();
                      }}
                    >
                      <ListItemIcon>
                        <img
                          style={{ height: "30px", width: "30px" }}
                          src={`${SvgFlagTurkiye}`}
                        />
                      </ListItemIcon>
                      Türkçe
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        ChangeLanguageToEn();
                      }}
                    >
                      <ListItemIcon>
                        <img
                          style={{ height: "30px", width: "30px" }}
                          src={`${SvgFlagUSA}`}
                        />
                      </ListItemIcon>
                      English
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              </Grid>
            </Grid>
          </Grid>

          {GetDynamicDropDown()}
          {/* Alt HEader*/}
          <StoreHeader />

          {/* Partner Section */}
          <PartnerHeader />
        </Grid>
      )}

      {(isTablet || isMobile) && (
        <Grid container direction={"column"} style={{ width: "140%" }}>
          <Grid
            item
            container
            style={{
              background: "linear-gradient(to right, #7648FB, #1A8CE8 )",
              height: "80px",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <Grid item xs={2}></Grid>
            <Grid
              item
              xs={8}
              style={{
                alignItems: "center",
                float: "left",
                justifyContent: "center",
                display: "grid",
              }}
            >
              <div
                onClick={() => {
                  navigate("/");
                }}
              >
                <Grid
                  container
                  className="slogan"
                  style={{
                    alignItems: "center",
                    flexWrap: "nowrap",
                    width: "500px",
                    color: "white",
                    fontSize: 25,
                  }}
                >
                  <img
                    src={`${vienotWhiteLogo}`}
                    alt=""
                    style={{ width: "30%", marginRight: "10px" }}
                  />
                  {t("VienotSlogan")}
                </Grid>
              </div>
            </Grid>
            <Grid item xs={2} style={{ float: "right" }}>
              {!currentContext.socialUser
                ? (["right"] as const).map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                      <MenuIcon style={{ color: "white" }} />
                    </Button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))
                : (["right"] as const).map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                      <MenuIcon style={{ color: "white" }} />
                    </Button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {listLogin(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
            </Grid>
          </Grid>

          <StoreHeader />
          <PartnerHeader />
        </Grid>
      )}
      
    </>
  );
}
