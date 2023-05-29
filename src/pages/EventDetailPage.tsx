import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SharedContext } from "../assets/lib/SharedContext";
import {
  AdditionalCompetitionModel,
  ApiBaseResponseModel,
  CheckSocialMediaConnectionModel,
  CompetitionConditionModel,
  CompetitionModel,
  ConditionModel,
  DiscordInformationModel,
  SharedContextModel,
  SocialUserModel,
  TwitterInformationModel,
  TwitterMediaModel,
  WinnerModel,
  YoutubeInformationModel,
} from "../assets/lib/Models";
import GlobalLoading from "../sharedComponents/GlobalLoading";
import AlertModal from "../sharedComponents/AlertModal";
import ApiBase from "../assets/lib/ApiBase";
import {
  baseUrlForImageUploadEndpoint,
  baseUrlForJoinServerDiscordEndpoint,
  companyPhotoPreLink,
  eventPhotoPreLink,
  links,
} from "./../assets/lib/Constants";
import { Grid, Button } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { GetFirstThreeAtttenderPhoto } from "../sharedComponents/EventCard";
import SvgVienot from "../assets/svgs/SvgVienot.svg";
import SvgDoneTick from "../assets/svgs/SvgDoneTick.svg";
import SvgComment from "../assets/svgs/SvgComment.svg";
import SvgTweet from "../assets/svgs/SvgTweet.svg";
import SvgFollowAndSubscribe from "../assets/svgs/SvgFollowAndSubscribe.svg";
import SvgLikeTweet from "../assets/svgs/SvgLikeTweet.svg";
import SvgTagYourFriend from "../assets/svgs/SvgTagYourFriend.svg";
import SvgTweetWithPhoto from "../assets/svgs/SvgTweetWithPhoto.svg";
import SvgRetweet from "../assets/svgs/SvgRetweet.svg";
import SvgYoutubeLike from "../assets/svgs/SvgYoutubeLike.svg";
import SvgJoinDiscordChannel from "../assets/svgs/SvgJoinDiscordChannel.svg";
import SvgJoinDiscordChannelWhite from "../assets/svgs/SvgJoinDiscordChannelWhite.svg";
import { WhichTimezoneYouAreIn } from "../assets/lib/CalculateCountDown";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import Countdown from "react-countdown";
import { useMediaQuery } from "react-responsive";
import Firebase from "../assets/lib/Firebase";
import "./EventDetailPageStyle/EventDetailPage.css";
import { useNavigate } from "react-router-dom";
import SvgDoneTickWhite from "../assets/svgs/SvgDoneTickWhite.svg";
import SvgDiscordWhite from "../assets/svgs/SvgDiscordWhite.svg";
import SvgDiscord from "../assets/svgs/SvgDiscord.svg";
import SvgCommentWhite from "../assets/svgs/SvgCommentWhite.svg";
import SvgFollowAndSubscribeWhite from "../assets/svgs/SvgFollowAndSubscribeWhite.svg";
import SvgLikeTweetAndYoutubeWhite from "../assets/svgs/SvgLikeTweetWhite.svg";
import SvgRetweetWhite from "../assets/svgs/SvgRetweetWhite.svg";
import SvgTagAndCommentWhite from "../assets/svgs/SvgTagYourFriendWhite.svg";
import SvgTweetWithPhotoWhite from "../assets/svgs/SvgTweetWithPhotoWhite.svg";
import SvgTagYourFriendWhite from "../assets/svgs/SvgTagYourFriendWhite.svg";
import DynamicModal from "../sharedComponents/DynamicModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import UploadIcon from "@mui/icons-material/Upload";
import { shadows } from '@mui/system';
import { CopyToClipboardHelper } from "../assets/lib/CopyToClipboardHelper";
import SuccessModal from "../sharedComponents/SuccessModal";
import axios from "axios";
import SocketBase from "../assets/lib/SocketBase";
import useLongPress from "../assets/lib/UseLongPress";
import CloseIcon from '@mui/icons-material/Close';
let tempParticipantAmount: number = 0

export default function EventDetailPage() {
  let params = useParams();
  const { id } = params;
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();
  let socketInstance = SocketBase.GetSocketInstance()
  const onLongPress = useLongPress();

  const [showloading, setShowLoading] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [event, setEvent] = useState<CompetitionModel>();
  const [additionalEventData, setAdditionalEventData] =
    useState<AdditionalCompetitionModel>();
  const [competitionConditions, setCompetitionConditions] =
    useState<CompetitionConditionModel[]>();
  const [showSecondAlertModalButton, setShowSecondAlertModalButton] =
    useState<boolean>(false);
  const [dynamicContent, setDynamicContent] = useState<string>('');
  const [photo, setPhoto] = React.useState<any>()
  const [conditionIdForDynamicModal, setConditionIdForDynamicModal] = useState<number>();
  const [competitionConditionIdForDynamicModal, setCompetitionConditionIdForDynamicModal] = useState<number>();
  const [competitionConditionValueForDynamicModal, setCompetitionConditionValueForDynamicModal] = useState<string>('');
  const [dynamicModalTitle, setDynamicModalTitle] = useState<string>('');
  const [dynamicModalPlaceHolder, setDynamicModalPlaceHolder] = useState<string>('');
  const [indexForDynamicModal, setIndexForDynamicModal] = useState<number>(0);
  const [showDynamicModal, setShowDynamicModal] = useState<boolean>(false);
  const [allowDeactivatingOverlay, setAllowDeactivatingOverlay] = useState<boolean>(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
  const [successAlertMessage, setSuccessAlertMessage] = useState<string>('')
  const [allowToRunOnClick, setAllowToRunOnClick] = useState<boolean>(true)
  const [showlongPressTwitterModal, setShowlongPressTwitterModal] = useState<boolean>(false)
  const [showLongPressTwitterFollowModal, setShowLongPressTwitterFollowModal] = useState<boolean>(false)
  const [showLongPressYoutubeModal, setShowLongPressYoutubeModal] = useState<boolean>(false)
  const [showLongPressDiscordModal, setShowLongPressDiscordModal] = useState<boolean>(false)
  const [showLongPressVienotModal, setShowLongPressVienotModal] = useState<boolean>(false)
  const [twitterInformations, setTwitterInformations] = useState<TwitterInformationModel[]>()
  const [twitterPhoto, setTwitterPhoto] = useState<string>()
  const [twitterDisplayName, setTwitterDisplayName] = useState<string>()
  const [twitterContent, setTwitterContent] = useState<string>()
  const [twitterFollowingCount, setTwitterFollowingCount] = useState<number>()
  const [twitterFollowerCount, setTwitterFollowerCount] = useState<number>()
  const [twitterMedia, setTwitterMedia] = useState<TwitterMediaModel[]>()
  const [youtubeInformations, setYoutubeInformations] = useState<YoutubeInformationModel[]>()
  const [youtubeTitle, setYoutubeTitle] = useState<string>()
  const [youtubePhoto, setYoutubePhoto] = useState<string>()
  const [youtubeIsChannel, setYoutubeIsChannel] = useState<boolean>(false)
  const [youtubeSubsCount, setYoutubeSubsCount] = useState<number>()
  const [youtubeChannelViewCount, setyoutubeChannelViewCount] = useState<number>()
  const [youtubeVideoLikeCount, setYoutubeVideoLikeCount] = useState<number>()
  const [youtubeVideoViewCount, setYoutubeVideoViewCount] = useState<number>()
  const [discordInformations, setDiscordInformations] = useState<DiscordInformationModel[]>()
  const [discordServerPhoto, setDiscordServerPhoto] = useState<string>()
  const [discordServerName, setDiscordServerName] = useState<string>()
  const [inviteText, setInviteText] = useState<string>('')
  const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false)
  const [showAnimationAndDisableGetWinnerFunc, setshowAnimationAndDisableGetWinnerFunc] = useState<boolean>(false)

  //@ts-ignore
  const currentContext: SharedContextModel = useContext(SharedContext);
  const vienotLogo = require("../assets/images/amblem2-01.png");
  //FOR RESPONSIVE
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1224px)",
  });
  const isNotMobile = useMediaQuery({
    query: "(min-width: 786px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 786px)",
  });

  const isWrap = useMediaQuery({
    query: "(max-width: 1480px)",
  });
  const isNotWrap = useMediaQuery({
    query: "(min-width: 1480px)",
  });

  useEffect(() => {
    if (showDynamicModal) {
      currentContext.setShowOverlay(true)
    }
    else {
      currentContext.setShowOverlay(false)
      setAllowDeactivatingOverlay(true)
    }
  }, [showDynamicModal])

  useEffect(() => {
    if (showAlertModal) {
      currentContext.setShowOverlay(true)
    }
    else if (!showAlertModal && allowDeactivatingOverlay) {
      currentContext.setShowOverlay(false)
    }
  }, [showAlertModal])

  useEffect(() => {
    if (!allowToRunOnClick) {
      setTimeout(() => {
        setAllowToRunOnClick(true);
      }, 500)
    }
  }, [allowToRunOnClick])

  useEffect(() => {
    if (showWinnerModal) {
      currentContext.setShowOverlay(true)
    }
    else {
      currentContext.setShowOverlay(false)
    }
  }, [showWinnerModal])


  React.useEffect(() => {
    // Links.ts dosyasındaki socket linkine dikkat et çalışmaya başlamadan önce 
    const stringifiedSocialUserData = localStorage.getItem('SocialUser');
    let currentSocialUser: SocialUserModel

    if (stringifiedSocialUserData) {
      currentSocialUser = JSON.parse(stringifiedSocialUserData)
      let tempSocialId: number = currentSocialUser.socialUserId

      socketInstance.on('attenderCount', (data) => {
        //@ts-ignore
        if (event.id == data.data.competition_id) {
          tempParticipantAmount = data.data.attender_count
        }
      })

      socketInstance.on('twitterLike', (data) => {
        if (data.data.social_user_id == tempSocialId) {
          ChangeConditionStatuBySocket(data.data.competition_condition_id)
        }
      })

      socketInstance.on('twitterFollow', (data) => {
        if (data.data.social_user_id == tempSocialId) {
          ChangeConditionStatuBySocket(data.data.competition_condition_id)
        }
      })

      socketInstance.on('twitterRetweet', (data) => {
        if (data.data.social_user_id == tempSocialId) {
          ChangeConditionStatuBySocket(data.data.competition_condition_id)
        }
      })

      socketInstance.on('twitterTweet', (data) => {
        if (data.data.social_user_id == tempSocialId) {
          ChangeConditionStatuBySocket(data.data.competition_condition_id)
        }
      })

      socketInstance.on('twitterComment', (data) => {
        if (data.data.social_user_id == tempSocialId) {
          ChangeConditionStatuBySocket(data.data.competition_condition_id)
        }
      })

      socketInstance.on('youtubeSubscribe', (data) => {
        if (data.data.social_user_id == tempSocialId) {
          ChangeConditionStatuBySocket(data.data.competition_condition_id)
        }
      })

      socketInstance.on('youtubeLike', (data) => {
        if (data.data.social_user_id == tempSocialId) {
          ChangeConditionStatuBySocket(data.data.competition_condition_id)
        }
      })

      socketInstance.on('discordJoin', (data) => {
        ChangeConditionStatuBySocket(data.data.competition_condition_id)
      })

    }
    /*
        Diğer socket id lerini buraya yazıyorum. Bunları sadece dinleyeceksin.
        Sakın emit etme client tarafında. Sadece server verileri gönderecek.

        attenderCount -> Katılımcı sayısı

    */

  }, [socketInstance])

  const GetWinner = () => {
    // if (showAnimationAndDisableGetWinnerFunc) {
    //   setAlertMessage(t('WINNER_REQUEST_RIGHT_ZERO'))
    //   setShowAlertModal(true)
    // }
    // else {
    setShowLoading(true)
    currentContext.setShowOverlay(true)
    ApiBase.Post({
      place: 'EventDetail - GetWinner',
      url: links.getWinner,
      body: {
        competition_id: event?.id
      },
      successFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false)
        currentContext.setShowOverlay(false)
        if (res.data.competition_winners.length == 0) {
          setShowSecondAlertModalButton(false)
          setAlertMessage(t('NO_WINNER'))
          setShowAlertModal(true)
          setshowAnimationAndDisableGetWinnerFunc(true)
        }
        else {
          let tempData = event
          if (tempData) {
            tempData.winners = res.data.competition_winners
          }
          setEvent(tempData)
          setShowWinnerModal(true)
        }

      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false)
        setAlertMessage(res.message)
        setShowAlertModal(true)
        setShowSecondAlertModalButton(false)
      },
      exceptionFunction: (res: any) => {
        setShowLoading(false)
        setAlertMessage("EventDetail - GetWinner " + t('AnErrorOccuredTryAgain'))
        setShowAlertModal(true)
        setShowSecondAlertModalButton(false)
      }
    })
    //}

  }

  const GetWinnerPhoto = () => {
    let currentPerson = event && event.winners.find(winner => winner.winner_place === 1 && winner.is_winner === 1)
    // ?.
    //   competition_result.user.social_user.twitter_user.twitter_photo_url
    //twitter,google,social
    if (currentPerson?.competition_result.user.social_user.twitter_user !== null) {
      return currentPerson?.competition_result.user.social_user.twitter_user.twitter_photo_url
    }
    else if (currentPerson?.competition_result.user.social_user.google_user !== null) {
      return currentPerson?.competition_result.user.social_user.google_user.google_photo
    }
    else {
      return currentPerson?.competition_result.user.social_user.social_user_profile_photo
    }
  }

  const GetWinnerUserName = (winner: WinnerModel) => {
    let currentPerson = winner

    if (currentPerson.competition_result.user.social_user.twitter_user !== null) {
      return currentPerson.competition_result.user.social_user.twitter_user.twitter_username
    }
    else if (currentPerson.competition_result.user.social_user.google_user !== null) {
      return currentPerson.competition_result.user.social_user.google_user.google_full_name
    }
    else if (currentPerson.competition_result.user.social_user.apple_user !== null) {
      return currentPerson.competition_result.user.social_user.apple_user.given_name + " "
        + currentPerson.competition_result.user.social_user.apple_user.family_name
    } else {
      return "** **"
    }
  }

  const GetCompetitionById = (allowToSetConditions: boolean) => {
    setShowLoading(true);
    currentContext.setShowOverlay(true);

    ApiBase.Post({
      place: "EventDetailPage-web - GetCompetitionById",
      url: links.getCompetitionBy,
      body: { id },
      successFunction: (res: any) => {
        setShowLoading(false);
        currentContext.setShowOverlay(false);
        let tempEvent: CompetitionModel = res.data;

        tempEvent.user.company.company_photo = tempEvent.user.company
          .company_photo
          ? companyPhotoPreLink + tempEvent.user.company.company_photo
          : SvgVienot;

        tempEvent.competition_photo = tempEvent.competition_photo
          ? eventPhotoPreLink + tempEvent.competition_photo
          : eventPhotoPreLink + "default-event.png";

        let tempAdditionalEventData: AdditionalCompetitionModel = {
          participantAmount: tempEvent.competition_conditions[0].user_competition_conditions
            .length,
          first_three_attender_photo: GetFirstThreeAtttenderPhoto(tempEvent),
        };
        tempEvent.winners = res.data.competition_winners
        setEvent(tempEvent);
        if (allowToSetConditions) {
          setCompetitionConditions(tempEvent.competition_conditions);
        }
        setAdditionalEventData(tempAdditionalEventData);
        tempParticipantAmount = tempEvent.competition_conditions[0].user_competition_conditions.length
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setShowLoading(false);
        setAlertMessage(res.message);
        currentContext.setShowOverlay(true);
        setShowAlertModal(true);
      },
      exceptionFunction: (res: any) => {
        setShowLoading(false);
        currentContext.setShowOverlay(true);
        setShowAlertModal(true);
      },
    });
  };

  const GetUserCompetitionConditions = () => {
    ApiBase.Post({
      place: "EventDetailPage-web - getUserCompetitionConditions",
      url: links.getUserCompetitionConditions,
      body: {
        competition_id: id,
        social_user_id: currentContext.socialUser.socialUserId,
      },

      successFunction: (res: ApiBaseResponseModel) => {
        setTwitterInformations(JSON.parse(res.data[0].competition.twitter_informations))
        setYoutubeInformations(JSON.parse(res.data[0].competition.youtube_informations))
        setDiscordInformations(JSON.parse(res.data[0].competition.discord_informations))
        setShowLoading(false);
        currentContext.setShowOverlay(false);
        setCompetitionConditions(res.data);
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setAlertMessage(res.message);
        setShowLoading(false);
        setShowAlertModal(true);
      },
      exceptionFunction: (res: any) => {
        setAlertMessage(JSON.stringify(res.message));
        setShowLoading(false);
        setShowAlertModal(true);
      },
    });
  };

  const FindTheRightInfoModal = (conditionItem: CompetitionConditionModel) => {
    switch (conditionItem.condition.social_media_id) {
      case 1:
        return RenderDynamicVienotModal(conditionItem)
      case 2:
        return RenderDynamicTwitterModal(conditionItem)
      case 4:
        return RenderDynamicYoutubeModal(conditionItem)
      case 5:
        return RenderDynamicDiscordModal(conditionItem)
      default:
        return
    }
  }

  const RenderDynamicTwitterModal = (conditionItem: CompetitionConditionModel) => {
    // If the condition is not about tweeting
    if (conditionItem.condition_id !== 11 && conditionItem.condition_id !== 12) {
      currentContext.setShowOverlay(true)
      let tempData = twitterInformations?.find((item => item.competition_condition_id == conditionItem.user_competition_conditions[0].competition_condition_id))
      setTwitterDisplayName(tempData?.informations.username)
      setTwitterPhoto(tempData?.informations.profile_image_url)
      setTwitterContent(tempData?.informations.tweet_content)
      if (tempData?.condition_id == 6) {
        // Then it is a follow condition
        setShowLongPressTwitterFollowModal(true)
      }
      else {
        setTwitterMedia(tempData?.informations.tweet_medias)
        setShowlongPressTwitterModal(true)
      }
    }
  }

  const RenderDynamicYoutubeModal = (conditionItem: CompetitionConditionModel) => {
    currentContext.setShowOverlay(true)
    let tempData = youtubeInformations?.find((item => item.competition_condition_id == conditionItem.user_competition_conditions[0].competition_condition_id))
    setYoutubeTitle(tempData?.informations.channel_name)
    //@ts-ignore
    if (tempData.informations.profile_image_url) {
      // Then it is a channel
      setYoutubePhoto(tempData?.informations.profile_image_url)
      setYoutubeIsChannel(true)
      setYoutubeSubsCount(tempData?.informations.subscriber_count)
      setyoutubeChannelViewCount(tempData?.informations.view_count)
    } else {
      // Then it is a video
      setYoutubePhoto(tempData?.informations.thumbnail_url)
      setYoutubeIsChannel(false)
      setYoutubeVideoLikeCount(tempData?.informations.like_count)
      setYoutubeVideoViewCount(tempData?.informations.view_count)
    }
    setShowLongPressYoutubeModal(true)

  }

  const RenderDynamicDiscordModal = (conditionItem: CompetitionConditionModel) => {
    currentContext.setShowOverlay(true)
    let tempData = discordInformations?.find((item => item.competition_condition_id == conditionItem.user_competition_conditions[0].competition_condition_id))
    setDiscordServerName(tempData?.informations.server_name)
    if (tempData?.informations.server_photo_url) {
      setDiscordServerPhoto(tempData?.informations.server_photo_url + '.png')
    }
    setShowLongPressDiscordModal(true)
  }

  const RenderDynamicVienotModal = (conditionItem: CompetitionConditionModel) => {
    currentContext.setShowOverlay(true)
    ApiBase.Post({
      place: 'EventDetailPage-web - RenderDynamicVienotModal',
      url: links.inviteFriend,
      body: {
        social_user_id: currentContext.socialUser.socialUserId,
        competition_condition_id: conditionItem.id,
      },
      successFunction: (res: ApiBaseResponseModel) => {
        Firebase.FirestoreFeatureChecker().then((configs) => {
          setInviteText(i18n.language.includes("tr")
            //@ts-ignore
            ? res.data
            //@ts-ignore
            : res.data)
          setShowLongPressVienotModal(true)
        })
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setAlertMessage(t(res.message_translate))
        currentContext.setShowOverlay(false)
        setShowLoading(false)
        setShowAlertModal(true)
      },
      exceptionFunction: (res: any) => {
        setAlertMessage(JSON.stringify(res.message))
        currentContext.setShowOverlay(false)
        setShowLoading(false)
        setShowAlertModal(true)
      }
    });
  }

  const MakeCompetitionReadyForUser = () => {
    setShowLoading(true);
    currentContext.setShowOverlay(true);
    ApiBase.Post({
      place: "EventDetailPage-web - MakeCompetitionReadyForUser",
      url: links.makeCompetitionReadyForUser,
      body: {
        competition_id: id,
        social_user_id: currentContext.socialUser.socialUserId,
      },
      successFunction: (res: ApiBaseResponseModel) => {
        GetUserCompetitionConditions();
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setAlertMessage(res.message);
        setShowLoading(false);
        setShowAlertModal(true);
      },
      exceptionFunction: (res: any) => {
        setAlertMessage(MakeCompetitionReadyForUser + JSON.stringify(res.message));
        setShowLoading(false);
        setShowAlertModal(true);
      },
    });
  };

  const GetProperLanguageForCondition = (condition: ConditionModel) => {
    if (i18n.language === "en") {
      return condition.condition_name_en;
    } else {
      return condition.condition_name;
    }
  };

  const GetProperSocialMediaIconForCondition = (condition: ConditionModel) => {
    if (currentContext.isDarkMode) {
      switch (condition.social_media_id) {
        case 2:
          return <TwitterIcon style={{ color: "white", fontSize: 40 }} />;
        case 4:
          return <YouTubeIcon style={{ color: "white", fontSize: 40 }} />;
        case 5:
          return <img style={{ width: "40px" }} src={`${SvgDiscordWhite}`} />;
        default:
          return <img style={{ width: "40px" }} src={`${vienotLogo}`} />;
      }
    }

    if (!currentContext.isDarkMode) {
      switch (condition.social_media_id) {
        case 2:
          return <TwitterIcon style={{ color: "#1C9BF1", fontSize: 40 }} />;
        case 4:
          return <YouTubeIcon style={{ color: "ff0000", fontSize: 40 }} />;
        case 5:
          return <img style={{ width: "40px" }} src={`${SvgDiscord}`} />;
        default:
          return <img style={{ width: "50px" }} src={`${vienotLogo}`} />;
      }
    }
  };

  const ChangeConditionStatuBySocket = (competition_condition_id: number) => {
    // if (competitionConditions) {
    //   let tempCompCond = competitionConditions
    //   console.log("öncesi : ", tempCompCond.find(item => item.id == competition_condition_id));
    //   let tempItem = tempCompCond.find(item => item.id == competition_condition_id)
    //   //@ts-ignore
    //   tempItem.user_competition_conditions[0].state = 1
    //   console.log("sonrası : ", tempCompCond.find(item => item.id == competition_condition_id));

    // }else{
    //   //@ts-ignore
    //   console.log("comp yok length : ", competitionConditions.length);
    // }
    window.location.reload()

  }

  const GetProperConditionIcon = (item: CompetitionConditionModel) => {
    //// condition_id: 1 --- Retweet Et
    //// condition_id: 3 --- Tweet'i Favorile
    //// condition_id: 6 --- Twitter Hesabını Takip Et
    //// condition_id: 7 --- Tweet'e Yorum At
    //// condition_id: 9 --- Twitter'da Arkadaşını Etiketle
    //// condition_id: 11 --- Tweet At
    //// condition_id: 12 --- Fotoğraflı Tweet At
    //// condition_id: 13 --- Tweet'e Fotoğraflı Yorum At

    //// condition_id: 15 --- Youtube Kanala Abone Ol
    //// condition_id: 16 --- Youtube Videosunu Beğen
    //// condition_id: 17 --- Youtube Videosuna Yorum At

    //// condition_id: 18 --- Discord Kanalına Gir

    if (
      currentContext.socialUser &&
      item.user_competition_conditions.length > 0 &&
      item.user_competition_conditions[0].state === 1
    ) {
      return currentContext.isDarkMode ? SvgDoneTickWhite : SvgDoneTick;
    }
    if (currentContext.isDarkMode) {
      switch (item.condition_id) {
        case 1:
          return SvgRetweetWhite;
        case 3:
          return SvgLikeTweetAndYoutubeWhite;
        case 6:
          return SvgFollowAndSubscribeWhite;
        case 7:
          return SvgCommentWhite;
        case 9:
          return SvgTagYourFriendWhite;
        case 11:
          return SvgTagAndCommentWhite;
        case 12:
          return SvgTweetWithPhotoWhite;
        case 13:
          return SvgTweetWithPhotoWhite;
        case 15:
          return SvgFollowAndSubscribeWhite;
        case 16:
          return SvgLikeTweetAndYoutubeWhite;
        case 17:
          return SvgComment;
        case 18:
          return SvgJoinDiscordChannelWhite;
        default:
          return SvgVienot;
      }
    }
    if (!currentContext.isDarkMode) {
      switch (item.condition_id) {
        case 1:
          return SvgRetweet;
        case 3:
          return SvgLikeTweet;
        case 6:
          return SvgFollowAndSubscribe;
        case 7:
          return SvgComment;
        case 9:
          return SvgTagYourFriend;
        case 11:
          return SvgTweet;
        case 12:
          return SvgTweet;
        case 13:
          return SvgTweetWithPhoto;
        case 15:
          return SvgFollowAndSubscribe;
        case 16:
          return SvgYoutubeLike;
        case 17:
          return SvgComment;
        case 18:
          return SvgJoinDiscordChannel;
        default:
          return SvgVienot;
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    if (currentContext.socialUser) {
      GetCompetitionById(false);
      MakeCompetitionReadyForUser()
    } else {
      GetCompetitionById(true);
    }
  }, []);

  useEffect(() => {
    if (currentContext.socialUser) {
      GetUserCompetitionConditions();
    }
  }, [currentContext.socialUser]);

  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const OnCompetitionConditionPress = (
    currentItem: CompetitionConditionModel,
    index: number
  ) => {

    if (currentItem.user_competition_conditions[0].state === 1) {
      return;
    }

    currentContext.setShowOverlay(true);
    setShowLoading(true);

    Firebase.GetMaintenanceInfo().then(({ booleanValue, message }) => {
      //Maintenance mode on
      if (booleanValue) {
        setAlertMessage(message);
        currentContext.setShowOverlay(true);
        setShowAlertModal(true);
      }
      //Maintenace mode off
      else {
        CheckSocialMediaConnections(currentItem, index);
      }
    });
  };

  const CheckSocialMediaConnections = (
    currentItem: CompetitionConditionModel,
    index: number
  ) => {
    ApiBase.Post({
      place: "EventDetail-web - CheckSocialMediaConnections",
      url: links.checkCompetitionConditionsAreCompatibleForUser,
      body: {
        competition_id: currentItem.competition_id,
        social_user_id: currentContext.socialUser.socialUserId,
      },
      successFunction: (res: ApiBaseResponseModel) => {
        let tempData: CheckSocialMediaConnectionModel = res.data;

        //Twitter
        if (currentItem.condition.social_media_id == 2) {
          //Şartlarda twitter ile alakalı bir şey var ama kullanınıcın twitter hesabı bağlı değilse
          if (tempData.twitterVarMi && !tempData.twitterConnected) {
            setShowLoading(false);
            setAlertMessage(t("TWITTER_CONNECT_ERROR"));
            setShowAlertModal(true);
            return setShowSecondAlertModalButton(true);
          }
        }
        //Youtube
        else if (currentItem.condition.social_media_id == 4) {
          //Şartlarda youtube ile alakalı bir şey var ama kullanıcının youtube hesabı bağlı değilse
          if (tempData.youtubeVarMi && !tempData.youtubeConnected) {
            setShowLoading(false);
            setAlertMessage(t("YOUTUBE_CONNECT_ERROR"));
            setShowAlertModal(true);
            return setShowSecondAlertModalButton(true);
          }
        }
        //Discord
        else if (currentItem.condition.social_media_id == 5) {
          //Şartlarda discord ile alakalı bir şey var ama kullanınıcın dc hesabı bağlı değilse
          if (tempData.discordVarMi && !tempData.discordConnected) {
            setShowLoading(false);
            setAlertMessage(t("DISCORD_CONNECT_ERROR"));
            setShowAlertModal(true);
            return setShowSecondAlertModalButton(true);
          }
        }

        //Sosyal medya hesaplarında hiçbir sorun yoksa
        return FindSocialMediaTypeForConditionAndCallItsFunction(currentItem, index)
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setAlertMessage(res.message);
        setShowLoading(false);
        setShowAlertModal(true);
      },
      exceptionFunction: (res: any) => {
        setAlertMessage(JSON.stringify(res.message));
        setShowLoading(false);
        setShowAlertModal(true);
      },
    });
  };

  const FindSocialMediaTypeForConditionAndCallItsFunction = (currentItem: CompetitionConditionModel, index: number) => {
    setShowLoading(true)
    currentContext.setShowOverlay(true)
    switch (currentItem.condition.social_media_id) {
      case 1:
        return OnVienotConditionPressed(currentItem, index)
      case 2:
        return OnTwitterConditionPressed(currentItem, index)
      case 4:
        return OnYoutubeConditionPressed(currentItem, index)
      case 5:
        return OnDiscordConditionPressed(currentItem, index)
      default:
        break;
    }
  }

  const OnVienotConditionPressed = (currentItem: CompetitionConditionModel, index: number) => {
    currentContext.setShowOverlay(true)
    setShowLoading(true)
    ApiBase.Post({
      place: 'EventDetail-web -- inviteFriend',
      url: links.inviteFriend,
      body: {
        social_user_id: currentContext.socialUser.socialUserId,
        competition_condition_id: currentItem.id,
      },
      successFunction: (res: ApiBaseResponseModel) => {
        currentContext.setShowOverlay(false)
        setShowLoading(false)
        Firebase.FirestoreFeatureChecker().then((configs) => {
          if (i18n.language.includes("tr")) {
            CopyToClipboardHelper(configs.invite_share_text_tr.stringValue
              //@ts-ignore
              .replace('{competition_name}', res.competition_name)
              .replace('{referral_link}', 'https://vienot.app/r/' + res.data)
              .replace('{referral_code}', res.data))
          } else {
            CopyToClipboardHelper(configs.invite_share_text_en.stringValue
              //@ts-ignore
              .replace('{competition_name}', res.competition_name)
              .replace('{referral_link}', 'https://vienot.app/r/' + res.data)
              .replace('{referral_code}', res.data))
          }
        }).then(() => {
          setSuccessAlertMessage(t('COPIED'))
          currentContext.setShowOverlay(true)
          setShowSuccessAlert(true)
        })
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setAlertMessage(t(res.message_translate))
        currentContext.setShowOverlay(false)
        setShowLoading(false)
        setShowAlertModal(true)
      },
      exceptionFunction: (res: any) => {
        setAlertMessage(JSON.stringify(res.message))
        currentContext.setShowOverlay(false)
        setShowLoading(false)
        setShowAlertModal(true)
      }
    });
  }

  const OnTwitterConditionPressed = (currentItem: CompetitionConditionModel, index: number) => {

    /*
     condition_id: 1 --- Retweet Et
     condition_id: 3 --- Tweet'i Favorile
     condition_id: 6 --- Twitter Hesabını Takip Et
     condition_id: 7 --- Tweet'e Yorum At
     condition_id: 9 --- Twitter'da Arkadaşını Etiketle
     condition_id: 11 --- Tweet At
     condition_id: 12 --- Fotoğraflı Tweet At
     condition_id: 13 --- Tweet'e Fotoğraflı Yorum At
   */
    switch (currentItem.condition_id) {
      case 7:
        setConditionIdForDynamicModal(7)
        setCompetitionConditionIdForDynamicModal(currentItem.id)
        setCompetitionConditionIdForDynamicModal(currentItem.id)
        setCompetitionConditionValueForDynamicModal(currentItem.competition_condition_value)
        setIndexForDynamicModal(index)
        setDynamicModalTitle(t('TypeYourComment'))
        setDynamicModalPlaceHolder(t('YourComment'))
        setShowDynamicModal(true)
        setShowLoading(false)
        break;
      case 9:
        setConditionIdForDynamicModal(9)
        setCompetitionConditionIdForDynamicModal(currentItem.id)
        setCompetitionConditionIdForDynamicModal(currentItem.id)
        setCompetitionConditionValueForDynamicModal(currentItem.competition_condition_value)
        setIndexForDynamicModal(index)
        setDynamicModalTitle(t('TagYourFriendOrFriends'))
        setDynamicModalPlaceHolder(t('TagedFriendExample'))
        setShowDynamicModal(true)
        setShowLoading(false)
        break;
      case 11:
        setConditionIdForDynamicModal(11)
        setCompetitionConditionIdForDynamicModal(currentItem.id)
        setCompetitionConditionIdForDynamicModal(currentItem.id)
        setCompetitionConditionValueForDynamicModal(currentItem.competition_condition_value)
        setIndexForDynamicModal(index)
        //@ts-ignore
        setDynamicModalTitle("#" + competitionConditions[index].competition_condition_value + t('HashtagInfo'))
        //@ts-ignore
        setDynamicModalPlaceHolder("#" + competitionConditions[index].competition_condition_value)
        //@ts-ignore
        setDynamicContent("#" + competitionConditions[index].competition_condition_value)
        setShowDynamicModal(true)
        setShowLoading(false)
        break;
      case 12:
        setConditionIdForDynamicModal(12)
        setCompetitionConditionIdForDynamicModal(currentItem.id)
        setCompetitionConditionIdForDynamicModal(currentItem.id)
        setCompetitionConditionValueForDynamicModal(currentItem.competition_condition_value)
        setIndexForDynamicModal(index)
        setDynamicModalTitle(t('SendTweetWithPhoto'))
        //@ts-ignore
        setDynamicModalPlaceHolder("#" + competitionConditions[index].competition_condition_value)
        //@ts-ignore
        setDynamicContent("#" + competitionConditions[index].competition_condition_value)
        setShowDynamicModal(true)
        setShowLoading(false)
        break;
      case 13:
        setConditionIdForDynamicModal(13)
        setCompetitionConditionIdForDynamicModal(currentItem.id)
        setCompetitionConditionIdForDynamicModal(currentItem.id)
        setCompetitionConditionValueForDynamicModal(currentItem.competition_condition_value)
        setIndexForDynamicModal(index)
        setDynamicModalTitle(t('TweetCommentWithPhoto'))
        setDynamicModalPlaceHolder(t('YourComment'))
        setShowDynamicModal(true)
        setShowLoading(false)
        break;
      default:
        return SendTwitterAction(currentItem, index)
    }
  }

  const SendTwitterAction = (currentItem: CompetitionConditionModel, index: number) => {
    /*
      condition_id: 1 --- Retweet Et
      condition_id: 3 --- Tweet'i Favorile
      condition_id: 6 --- Twitter Hesabını Takip Et
      condition_id: 7 --- Tweet'e Yorum At
      condition_id: 9 --- Twitter'da Arkadaşını Etiketle
      condition_id: 11 --- Tweet At
      condition_id: 12 --- Fotoğraflı Tweet At
      condition_id: 13 --- Tweet'e Fotoğraflı Yorum At
    */

    if (currentItem.condition_id === 1) {
      setShowLoading(true)
      ApiBase.Post({
        place: 'SendTwitterAction-web - reTweet',
        url: links.reTweet,
        body: {
          tweet_id: currentItem.competition_condition_value.split('/status/')[1],
          social_user_id: currentContext.socialUser.socialUserId,
          competition_condition_id: currentItem.id,
        },
        successFunction: (res: ApiBaseResponseModel) => {
          UpdateDoneIcons(index)
        },
        errorFunction: (res: ApiBaseResponseModel) => {
          setAlertMessage(t(res.message_translate))
          currentContext.setShowOverlay(false)
          setShowLoading(false)
          setShowAlertModal(true)
        },
        exceptionFunction: (res: any) => {
          setAlertMessage(JSON.stringify(res.message))
          currentContext.setShowOverlay(false)
          setShowLoading(false)
          setShowAlertModal(true)
        }
      });
    }
    else if (currentItem.condition_id === 3) {
      setShowLoading(true)
      ApiBase.Post({
        place: 'SendTwitterAction-web - twitterLike',
        url: links.twitterLike,
        body: {
          tweet_id: currentItem.competition_condition_value.split('/status/')[1],
          social_user_id: currentContext.socialUser.socialUserId,
          competition_condition_id: currentItem.id,
        },
        successFunction: (res: ApiBaseResponseModel) => {
          UpdateDoneIcons(index)
        },
        errorFunction: (res: ApiBaseResponseModel) => {
          setAlertMessage(t(res.message_translate))
          currentContext.setShowOverlay(false)
          setShowLoading(false)
          setShowAlertModal(true)
        },
        exceptionFunction: (res: any) => {
          setAlertMessage(JSON.stringify(res.message))
          currentContext.setShowOverlay(false)
          setShowLoading(false)
          setShowAlertModal(true)
        }
      });
    }
    else if (currentItem.condition_id === 6) {
      setShowLoading(true)
      ApiBase.Post({
        place: 'SendTwitterAction-web - twitterFollow',
        url: links.twitterFollow,
        body: {
          twitter_username: currentItem.competition_condition_value,
          social_user_id: currentContext.socialUser.socialUserId,
          competition_condition_id: currentItem.id,
        },
        successFunction: (res: ApiBaseResponseModel) => {
          UpdateDoneIcons(index)
        },
        errorFunction: (res: ApiBaseResponseModel) => {
          setAlertMessage(t(res.message_translate))
          currentContext.setShowOverlay(false)
          setShowLoading(false)
          setShowAlertModal(true)
        },
        exceptionFunction: (res: any) => {
          setAlertMessage(JSON.stringify(res.message))
          currentContext.setShowOverlay(false)
          setShowLoading(false)
          setShowAlertModal(true)
        }
      });
    }
    else if (currentItem.condition_id === 7) {
      if (CheckIfTheTextInputHasMinimumAndMaximumLength()) {
        setShowDynamicModal(false)
        setShowLoading(true)
        ApiBase.Post({
          place: 'SendTwitterAction-web - sendTwitterComment',
          url: links.twitterComment,
          body: {
            tweet_content: dynamicContent,
            social_user_id: currentContext.socialUser.socialUserId,
            competition_condition_id: currentItem.id,
          },
          successFunction: (res: ApiBaseResponseModel) => {
            UpdateDoneIcons(index)
            setDynamicContent('')
          },
          errorFunction: (res: ApiBaseResponseModel) => {
            setAlertMessage(t(res.message_translate))
            currentContext.setShowOverlay(false)
            setShowLoading(false)
            setShowAlertModal(true)
            setDynamicContent('')
          },
          exceptionFunction: (res: any) => {
            setAlertMessage(JSON.stringify(res.message))
            currentContext.setShowOverlay(false)
            setShowLoading(false)
            setShowAlertModal(true)
            setDynamicContent('')
          }
        });
      }
    }
    else if (currentItem.condition_id === 9) {
      let inputContainsTags = CheckIfTheTextInputContainsTags();
      if (inputContainsTags.status) {
        setShowDynamicModal(false)
        setShowLoading(true)
        ApiBase.Post({
          place: 'SendTwitterAction-web - tagYourFriend',
          url: links.twitterComment,
          body: {
            tweet_content: inputContainsTags.text,
            social_user_id: currentContext.socialUser.socialUserId,
            competition_condition_id: currentItem.id,
          },

          successFunction: (res: ApiBaseResponseModel) => {
            UpdateDoneIcons(index)
            setDynamicContent('')
          },
          errorFunction: (res: ApiBaseResponseModel) => {
            setAlertMessage(t(res.message_translate))
            currentContext.setShowOverlay(false)
            setShowLoading(false)
            setShowAlertModal(true)
            setDynamicContent('')
          },
          exceptionFunction: (res: any) => {
            setAlertMessage(JSON.stringify(res.message))
            currentContext.setShowOverlay(false)
            setShowLoading(false)
            setShowAlertModal(true)
            setDynamicContent('')
          }
        });
      }
    }
    else if (currentItem.condition_id === 11) {
      if (CheckIfTheTextInputHasMinimumAndMaximumLength() && CheckIfTheTextInputContainsHashtag(currentItem.competition_condition_value)) {
        setShowDynamicModal(false)
        setShowLoading(true)
        ApiBase.Post({
          place: 'SendTwitterAction-web  - hashtagliTweet',
          url: links.twitterSendTweet,
          body: {
            tweet_content: dynamicContent,
            social_user_id: currentContext.socialUser.socialUserId,
            competition_condition_id: currentItem.id,
          },
          successFunction: (res: ApiBaseResponseModel) => {
            UpdateDoneIcons(index)
            setDynamicContent('')
          },
          errorFunction: (res: ApiBaseResponseModel) => {
            setAlertMessage(t(res.message_translate))
            currentContext.setShowOverlay(false)
            setShowLoading(false)
            setShowAlertModal(true)
            setDynamicContent('')
          },
          exceptionFunction: (res: any) => {
            setAlertMessage(JSON.stringify(res.message))
            currentContext.setShowOverlay(false)
            setShowLoading(false)
            setShowAlertModal(true)
            setDynamicContent('')
          }
        });
      }
    }
    else if (currentItem.condition_id === 12) {
      if (CheckIfPhotoNull() && CheckIfTheTextInputHasMinimumAndMaximumLength() && CheckIfTheTextInputContainsHashtag(currentItem.competition_condition_value)) {
        currentContext.setShowOverlay(true)
        setShowDynamicModal(false)
        setShowLoading(true)

        ApiBase.Post({
          place: 'SendTwitterAction-web - Fotoğraflı Tweet At',
          url: links.laravelUserPhotoUpload,
          body: {
            social_user_id: currentContext.socialUser.socialUserId,
            photo: photo,
          },
          successFunction: (res: ApiBaseResponseModel) => {
            SendTweetWithPhoto(index, res.data, currentItem.id)
          },
          errorFunction: (res: ApiBaseResponseModel) => {
            setAlertMessage(t(res.message_translate))
            currentContext.setShowOverlay(false)
            setShowLoading(false)
            setShowAlertModal(true)
            setDynamicContent('')
          },
          exceptionFunction: (res: any) => {
            Firebase.FirestoreErrorLogPusher('SendTwitterAction-web  - cond 12',
              res);
            setAlertMessage(JSON.stringify(res.message))
            currentContext.setShowOverlay(false)
            setShowLoading(false)
            setShowAlertModal(true)
            setDynamicContent('')
          }
        }, 'multipart/form-data');

      }
    }
    else if (currentItem.condition_id === 13) {
      if (CheckIfPhotoNull() && CheckIfTheTextInputHasMinimumAndMaximumLength()) {
        currentContext.setShowOverlay(true)
        setShowDynamicModal(false)
        setShowLoading(true)

        ApiBase.Post({
          place: 'SendTwitterAction-web - fotoluYorumAtma',
          url: links.laravelUserPhotoUpload,
          body: {
            social_user_id: currentContext.socialUser.socialUserId,
            photo: photo,
          },
          successFunction: (res: ApiBaseResponseModel) => {
            SendTweetWithPhoto(index, res.data, currentItem.id)
          },
          errorFunction: (res: ApiBaseResponseModel) => {
            setAlertMessage(t(res.message_translate))
            currentContext.setShowOverlay(false)
            setShowLoading(false)
            setShowAlertModal(true)
            setDynamicContent('')
          },
          exceptionFunction: (res: any) => {
            Firebase.FirestoreErrorLogPusher('SendTwitterAction-web  - cond 12',
              res);
            setAlertMessage(JSON.stringify(res.message))
            currentContext.setShowOverlay(false)
            setShowLoading(false)
            setShowAlertModal(true)
            setDynamicContent('')
          }
        }, 'multipart/form-data');
      }
    }
  }

  const SendTweetWithPhoto = (index: number, file_name: string, competitionConditionId: number) => {
    setShowLoading(true)
    currentContext.setShowOverlay(true)
    ApiBase.Post({
      place: 'EventDetailPage-web  - SendTweetWithPhoto',
      url: links.twitterSendTweet,
      body: {
        tweet_content: dynamicContent,
        file_name: file_name,
        social_user_id: currentContext.socialUser.socialUserId,
        competition_condition_id: competitionConditionId
      },
      successFunction: (res: ApiBaseResponseModel) => {
        UpdateDoneIcons(index)
        setDynamicContent('')
        setPhoto(null)
        setShowLoading(false)
        currentContext.setShowOverlay(false)
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setAlertMessage(t(res.message_translate))
        currentContext.setShowOverlay(false)
        setShowLoading(false)
        setShowAlertModal(true)
        setDynamicContent('')
      },
      exceptionFunction: (res: any) => {
        setAlertMessage(JSON.stringify(res.message))
        currentContext.setShowOverlay(false)
        setShowLoading(false)
        setShowAlertModal(true)
        setDynamicContent('')
      }
    });
  }

  const OnYoutubeConditionPressed = (currentItem: CompetitionConditionModel, index: number) => {
    /*
    condition_id: 15 --- Youtube Kanala Abone Ol
    condition_id: 16 --- Youtube Videosunu Beğen
    condition_id: 17 --- Youtube Videosuna Yorum At
  */

    if (currentItem.condition_id == 17) {
      setConditionIdForDynamicModal(17)
      setCompetitionConditionIdForDynamicModal(currentItem.id)
      setCompetitionConditionIdForDynamicModal(currentItem.id)
      setCompetitionConditionValueForDynamicModal(currentItem.competition_condition_value)
      setIndexForDynamicModal(index)
      setDynamicModalTitle(t('COMMENT_A_YOUTUBE_VIDEO_TITLE'))
      setDynamicModalPlaceHolder(t('YOUR_COMMENT'))
      setShowDynamicModal(true)
    }
    else {
      SendYoutubeAction(currentItem, index)
    }

  }

  const SendYoutubeAction = (currentItem: CompetitionConditionModel, index: number) => {
    /*
      condition_id: 15 --- Youtube Kanala Abone Ol
      condition_id: 16 --- Youtube Videosunu Beğen
      condition_id: 17 --- Youtube Videosuna Yorum At
    */

    if (currentItem.condition_id === 15) {
      currentContext.setShowOverlay(true)
      setShowLoading(true)
      ApiBase.Post({
        place: 'EventDetail-web - Subscribe',
        url: links.subscribeAChannel,
        body: {
          social_user_id: currentContext.socialUser.socialUserId,
          competition_condition_id: currentItem.id,
          competition_condition_value: currentItem.competition_condition_value,
        },
        successFunction: (res: ApiBaseResponseModel) => {
          UpdateDoneIcons(index)
        },
        errorFunction: (res: ApiBaseResponseModel) => {
          setAlertMessage(t(res.message_translate))
          currentContext.setShowOverlay(false)
          setShowLoading(false)
          setShowAlertModal(true)
        },
        exceptionFunction: (res: any) => {
          setAlertMessage(JSON.stringify(res.message))
          currentContext.setShowOverlay(false)
          setShowLoading(false)
          setShowAlertModal(true)
        }
      });
    } else if (currentItem.condition_id === 16) {
      currentContext.setShowOverlay(true)
      setShowLoading(true)
      ApiBase.Post({
        place: 'EventDetail-web - Like a Video',
        url: links.likeAYoutubeVideo,
        body: {
          social_user_id: currentContext.socialUser.socialUserId,
          competition_condition_id: currentItem.id,
          competition_condition_value: currentItem.competition_condition_value,
        },
        successFunction: (res: ApiBaseResponseModel) => {
          UpdateDoneIcons(index)
        },
        errorFunction: (res: ApiBaseResponseModel) => {
          setAlertMessage(t(res.message_translate))
          currentContext.setShowOverlay(false)
          setShowLoading(false)
          setShowAlertModal(true)
        },
        exceptionFunction: (res: any) => {
          setAlertMessage(JSON.stringify(res.message))
          currentContext.setShowOverlay(false)
          setShowLoading(false)
          setShowAlertModal(true)
        }
      });
    } else if (currentItem.condition_id === 17) {
      setShowDynamicModal(false)
      currentContext.setShowOverlay(true)
      setShowLoading(true)
      ApiBase.Post({
        place: 'EventDetail-web - Comment a Video',
        url: links.commentAYoutubeVideo,
        body: {
          social_user_id: currentContext.socialUser.socialUserId,
          competition_condition_id: currentItem.id,
          competition_condition_value: currentItem.competition_condition_value,
          video_comment: dynamicContent
        },
        successFunction: (res: ApiBaseResponseModel) => {
          UpdateDoneIcons(index)
        },
        errorFunction: (res: ApiBaseResponseModel) => {
          setAlertMessage(t(res.message_translate))
          currentContext.setShowOverlay(false)
          setShowLoading(false)
          setShowAlertModal(true)
        },
        exceptionFunction: (res: any) => {
          setAlertMessage(JSON.stringify(res.message))
          currentContext.setShowOverlay(false)
          setShowLoading(false)
          setShowAlertModal(true)
        }
      });
    }
  }

  const OnDiscordConditionPressed = async (currentItem: CompetitionConditionModel, index: number) => {
    currentContext.setShowOverlay(true)
    setShowLoading(true)

    ApiBase.JoinServerOnDiscordWithNodeJS({
      place: 'EventDetailPage-web - Discord Join Server',
      url: 'null', //refactor edilecek
      body: {
        social_user_id: currentContext.socialUser.socialUserId,
        competition_condition_id: currentItem.condition_id,
        competition_condition_value: currentItem.competition_condition_value
      },
      successFunction: (res: ApiBaseResponseModel) => {
        UpdateDoneIcons(index)
      },
      errorFunction: (res: ApiBaseResponseModel) => {
        setAlertMessage(t(res.message_translate))
        currentContext.setShowOverlay(false)
        setShowLoading(false)
        setShowAlertModal(true)
        setDynamicContent('')
      },
      exceptionFunction: (res: any) => {
        setAlertMessage(JSON.stringify(res.message))
        currentContext.setShowOverlay(false)
        setShowLoading(false)
        setShowAlertModal(true)
      }
    });

  }

  const CheckIfTheTextInputHasMinimumAndMaximumLength = (optionalText?: string) => {
    if (optionalText) {
      if (optionalText.length == 0) {
        setAlertMessage(t('TextCannotBeEmpty'))
        setAllowDeactivatingOverlay(false)
        return setShowAlertModal(true)
      }
      else if (optionalText.length > 280) {
        setAlertMessage(t('TextOverFlow'))
        setAllowDeactivatingOverlay(false)
        return setShowAlertModal(true)
      }
    }
    else {
      if (dynamicContent.length == 0) {
        setAlertMessage(t('TextCannotBeEmpty'))
        setAllowDeactivatingOverlay(false)
        return setShowAlertModal(true)
      }
      else if (dynamicContent.length > 280) {
        setAlertMessage(t('TextOverFlow'))
        setAllowDeactivatingOverlay(false)
        return setShowAlertModal(true)
      }
    }
    return true
  }

  const CheckIfTheTextInputContainsTags = () => {
    let tweetIncludeTag = dynamicContent.includes('@')
    if (tweetIncludeTag) {
      //eğer tweet tag içeriyorsa 2. kontrole geç
      //tagli kelimeleri ayır ve bir arraye koy.
      let endArray: Array<string> = [];
      let tagCount = 0; // bu data ileride işimize yarayabilir.
      dynamicContent.split('@').map((string) => {
        if (string !== "") {
          let arr = string.split(" ");
          let firstWord = arr[0];
          tagCount++;
          let theRest = '';
          for (let i = 1; i < arr.length; i++) {
            if (arr.length - 1 === i) {
              //son kelime ise boşluk ekleme sona
              theRest += arr[i];
            } else {
              //kelimeleri arka arkaya yerleştirip kalan cümleyi bul
              theRest += arr[i] + ' ';
            }
          }
          endArray.push('@' + firstWord)
          //son harf kontrolü
          if (theRest.slice(-1) === ' ') {
            if (theRest !== ' ') {
              //son harf olan gereksiz boşluğu silerek kaydetme
              //aynı zamanda replace kodu multiple spaceleri tek space ile yer değiştiren regex kodudur.
              endArray.push(theRest.slice(0, -1).replace(/ +(?= )/g, ''))
            }
          } else {
            endArray.push(theRest.replace(/ +(?= )/g, ''))
          }
        }
      });
      let endText = '';
      endArray.map((text) => {
        endText += text + ' ';
      });
      if (CheckIfTheTextInputHasMinimumAndMaximumLength(endText)) {
        // başarılı son hal
        setDynamicContent(endText.replace(/ +(?= )/g, ''))
        return {
          status: true,
          text: endText,
          tagCount
        };
      }
      else {
        setAlertMessage(t('IncorrectText'))
        setAllowDeactivatingOverlay(false)
        setShowAlertModal(true)
        return {
          status: false,
          text: null,
          tagCount: 0
        };
      }
    }
    else {
      //tweet tag bile içermiyor
      setAlertMessage(t('TagFriendWarning'))
      setAllowDeactivatingOverlay(false)
      setShowAlertModal(true)
      return {
        status: false,
        text: null,
        tagCount: 0
      };
    }
  }

  const CheckIfTheTextInputContainsHashtag = (competitionConditionValue: string) => {
    if (!dynamicContent.includes("#" + competitionConditionValue)) {
      setAlertMessage(t('HashtagIsAbsent'))
      setAllowDeactivatingOverlay(false)
      return setShowAlertModal(true)
    }
    return true
  }

  const CheckIfPhotoNull = () => {
    if (photo !== undefined) {
      if (photo === null) {
        //setShowPhotoIsNullAlert(true)
        return false;
      } else {
        return true
      }
    } else {
      //setShowPhotoIsNullAlert(true)
      return false
    }
  }

  const UpdateDoneIcons = async (index: number) => {
    let oldData = competitionConditions
    //@ts-ignore
    oldData[index].user_competition_conditions[0].state = 1
    setCompetitionConditions(oldData)

    setTimeout(() => {
      currentContext.setShowOverlay(false)
      setShowLoading(false)
      setShowDynamicModal(false)
    }, 500);
  }

  function CalculateCountDown(tempCompetitionEndDate: string) {
    let hourDifference = WhichTimezoneYouAreIn(new Date().getTimezoneOffset());
    let dateNow = new Date(new Date().setHours(new Date().getHours()));
    let dateObjectCompetitionEndDate = new Date(tempCompetitionEndDate);

    let differenceInTimeStamp =
      dateObjectCompetitionEndDate.getTime() +
      -hourDifference * 60 * 60 * 1000 -
      dateNow.getTime();
    let differenceInDays = Math.ceil(
      differenceInTimeStamp / (1000 * 3600 * 24)
    );
    let differenceInHours = Math.ceil(differenceInTimeStamp / (1000 * 3600));
    let differenceInMinutes = Math.ceil(
      (differenceInTimeStamp / (1000 * 3600)) * 60
    );

    if (differenceInDays > 2) {
      return {
        text: differenceInDays.toString() + " " + t("DaysLeft"),
        timestamp: differenceInTimeStamp,
      };
    } else if (differenceInHours > 2) {
      return {
        text: differenceInHours.toString() + " " + t("HoursLeft"),
        timestamp: differenceInTimeStamp,
      };
    } else if (differenceInMinutes > 0) {
      return {
        text: differenceInMinutes.toString() + " " + t("MinutesLeft"),
        timestamp: differenceInTimeStamp,
      };
    } else {
      return {
        text: t("Expired"),
        timestamp: differenceInTimeStamp,
      };
    }
  }
  const isNull = null;
  //@ts-ignore

  //@ts-ignore
  const onImageChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  //@ts-ignore
  if (event) {
    return (
      <>
        <DynamicModal show={showLongPressVienotModal}>
          <Grid item style={{ width: '90%', marginTop: '20px' }}>
            <Button
              style={{ float: 'right' }}
              onClick={() => {
                currentContext.setShowOverlay(false)
                setShowLongPressVienotModal(false)
              }}>
              <CloseIcon style={{ color: 'red', fontSize: 35 }} />
            </Button></Grid>

          <Grid item>
            <img
              src={vienotLogo}
              style={{
                height: '150px',
                width: '150px',
                border: '3px solid #1C9BF1',
                borderRadius: '50%'
              }}
            ></img>
          </Grid>

          {/* <ModalInfoIcon /> */}
          <h2>{t('Info')}</h2>
          <Grid style={{ marginBottom: '10px', textAlign: 'center' }}>{t('ReferalCodePageTitle') + ': ' + inviteText}</Grid>
          <Grid style={{ marginBottom: '10px', textAlign: 'center' }}>  {t('VIENOT_INVITE_FRIEND_MODAL_INFO')}</Grid>


        </DynamicModal>

        <DynamicModal show={showLongPressDiscordModal}>

          <Grid style={{ width: '90%', marginTop: '20px' }}>
            <Button
              style={{ float: 'right' }}
              onClick={() => {
                currentContext.setShowOverlay(false)
                setShowLongPressDiscordModal(false)
              }}>
              <CloseIcon style={{ color: 'red', fontSize: 35 }} />
            </Button></Grid>
          <Grid style={{ alignItems: 'center' }}>
            <img style={{ width: '70px' }} src={SvgDiscord} />
          </Grid>
          <Grid style={{ marginTop: '20px' }}>
            {discordServerPhoto ?

              <img
                src={`${discordServerPhoto}`}

                style={{
                  width: '150px',
                  height: '150px',
                  border: '3px solid #5865F2',
                  borderRadius: '50%'
                }}
              />
              :
              <img style={{
                width: '150px',
                height: '150px',
                border: '3px solid #5865F2',
                borderRadius: '50%'
              }} src={SvgDiscord} />

            }
          </Grid>

          <Grid style={{ fontSize: 20, marginTop: '25px', marginBottom: '30px' }}>{discordServerName}</Grid>
        </DynamicModal>

        <DynamicModal show={showLongPressYoutubeModal} >
          <Grid style={{ width: '90%', marginTop: '20px' }}>
            <Button
              style={{ float: 'right' }}
              onClick={() => {
                currentContext.setShowOverlay(false)
                setShowLongPressYoutubeModal(false)
              }}>
              <CloseIcon style={{ color: 'red', fontSize: 35 }} />
            </Button>
          </Grid>
          {youtubeIsChannel ? (
            <>
              <Grid style={{ marginTop: '10px' }}>
                <img
                  src={youtubePhoto}
                  alt=""
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    border: '3px solid red'
                  }}
                />
              </Grid>
              <Grid style={{ textAlign: 'center', alignItems: 'center', padding: '10px' }}>
                <h2>{youtubeTitle}</h2>
                <p><b>{youtubeSubsCount}</b> {t('Subscribe')}</p>
                <p> <b>{youtubeChannelViewCount}</b>  {t('View')}</p>
              </Grid>

            </>
          ) : (
            <>
              <Grid style={{ marginTop: '10px' }}>
                <img
                  src={youtubePhoto}
                  alt=""
                  style={{
                    width: "300px",
                    height: "200px",
                    borderRadius: "20px",
                    border: '3px solid red'
                  }}
                />
              </Grid>
              <Grid style={{ textAlign: 'center', alignItems: 'center', padding: '10px' }}>
                <h2>{youtubeTitle}</h2>
                <p> <b>{youtubeVideoLikeCount}</b>  {t('Like')}</p>
                <p> <b>{youtubeVideoViewCount}</b>  {t('View')}</p>
              </Grid>

            </>
          )}

          {/*
          <View style={{ alignItems: 'center' }}>
            <SvgYoutubeIconAndText />
          </View>
          {youtubeIsChannel ?
            <>
              <View style={styles.youtubeLongPressChannelPhotoSection}>
                <Image
                  source={{ uri: youtubePhoto }}
                  resizeMode={'contain'}
                  style={{ flex: 1, borderRadius: 999 }}
                />
              </View>
              <Text style={styles.youtubeLongPressChannelNameText}>{youtubeTitle}</Text>
              <Text style={styles.youtubeLongPressSubsCountText}>
                <Text style={{ fontWeight: '800' }}>{youtubeSubsCount} </Text>
                {I18n.t('Subscribe')}
              </Text>
              <Text style={styles.youtubeLongPressViewCountText}>
                <Text style={{ fontWeight: '800' }}>{youtubeChannelViewCount} </Text>
                {I18n.t('View')}
              </Text>
            </>
            :
            <>
              <View style={styles.youtubeLongPressVideoPhotoSection}>
                <Image
                  source={{ uri: youtubePhoto }}
                  resizeMode={'cover'}
                  style={{ flex: 1 }}
                />
              </View>
              <Text style={styles.youtubeLongPressChannelNameText}>{youtubeTitle}</Text>
              <Text style={styles.youtubeLongPressSubsCountText}>
                <Text style={{ fontWeight: '800' }}>{youtubeVideoLikeCount} </Text>
                {I18n.t('Like')}
              </Text>
              <Text style={styles.youtubeLongPressViewCountText}>
                <Text style={{ fontWeight: '800' }}>{youtubeVideoViewCount} </Text>
                {I18n.t('View')}
              </Text>
            </>}
          <Text style={styles.youtubeLongPressModalTypeText}>{dynamicModalTitle}</Text> */}

        </DynamicModal>

        <DynamicModal show={showLongPressTwitterFollowModal} >
          <Grid style={{ width: '90%', marginTop: '20px' }}>
            <Button
              style={{ float: 'right' }}
              onClick={() => {
                currentContext.setShowOverlay(false)
                setShowLongPressTwitterFollowModal(false)
              }}>
              <CloseIcon style={{ color: 'red', fontSize: 35 }} />
            </Button>
          </Grid>

          <Grid style={{ alignItems: 'center' }}>
            <TwitterIcon style={{ fontSize: 50, color: '#1C9BF1' }} />
          </Grid>
          <Grid>
            <img
              src={twitterPhoto}
              style={{
                height: '150px',
                width: '150px',
                border: '3px solid #1C9BF1',
                borderRadius: '50%'
              }}
            ></img>
          </Grid>
          {twitterFollowerCount &&
            <Grid style={{ fontSize: 20, marginTop: '20px' }}>
              <b>{twitterFollowerCount}</b> &nbsp; {t('Follower')}
            </Grid>

          }
          {twitterFollowerCount == null &&
            <Grid style={{ fontSize: 20, marginTop: '20px' }}>
              <b>Null</b> &nbsp; {t('Follower')}
            </Grid>

          }
          {twitterFollowingCount &&
            <Grid style={{ fontSize: 20, marginTop: '20px', marginBottom: '20px' }}>
              <b>{twitterFollowingCount} </b> &nbsp; {t('Following')}
            </Grid>

          }
          {twitterFollowingCount == null &&
            <Grid style={{ fontSize: 20, marginTop: '20px', marginBottom: '20px' }}>
              <b>Null</b> &nbsp; {t('Following')}

            </Grid>

          }
          {/* <TouchableOpacity
            key={'44'}
            style={styles.longPressXButton}
            onPress={() => {
              currentContext.setShowOverlay(false)
              setShowlongPressTwitterModal(false)
            }}>
            <SvgX />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <SvgTwitter />
          </View>
          <View style={styles.twitterLongPressChannelPhotoSection}>
            <Image
              source={{ uri: twitterPhoto }}
              resizeMode={'center'}
              style={{ flex: 1, borderRadius: 999 }}
            />
          </View>
          <Text style={StyleSheet.flatten([styles.twitterLongPressUserNameText, styles.twitterLongPressFollowSpecialTextStyle])}>{twitterDisplayName}</Text>
          {twitterFollowerCount &&
            <Text style={styles.youtubeLongPressSubsCountText}>
              <Text style={{ fontWeight: '800' }}>{twitterFollowerCount} </Text>
              {I18n.t('Follower')}
            </Text>}
          {twitterFollowingCount &&
            <Text style={styles.youtubeLongPressViewCountText}>
              <Text style={{ fontWeight: '800' }}>{twitterFollowingCount} </Text>
              {I18n.t('Following')}
            </Text>
          } */}

        </DynamicModal>

        <DynamicModal show={showlongPressTwitterModal}>
          <Grid style={{ width: '90%', marginTop: '20px' }}>
            <Button
              style={{ float: 'right' }}
              onClick={() => {
                currentContext.setShowOverlay(false)
                setShowlongPressTwitterModal(false)
              }}>
              <CloseIcon style={{ color: 'red', fontSize: 35 }} />
            </Button>
          </Grid>
          <Grid style={{ alignItems: 'center' }}>
            <TwitterIcon style={{ fontSize: 50, color: '#1C9BF1' }} />
          </Grid>
          <Grid style={{ textAlign: 'center', paddingLeft: '10px', paddingRight: '10px' }}>
            <h3>{twitterDisplayName}</h3>
            <Grid style={{ marginBottom: '10px', marginTop: '10px', padding: '10px' }}>{twitterContent}</Grid>

          </Grid>
          <Grid style={{ marginBottom: '30px' }}>
            <img
              src={twitterPhoto}
              style={{
                height: '200px',
                width: '300px',
                border: '3px solid #1C9BF1',
                borderRadius: '20px'
              }}
            ></img>
            {twitterMedia && (
              <Grid style={{ display: 'none' }}>
                <img
                  src={twitterMedia.filter(item => item.type === 'photo')[0].url}
                  key={twitterMedia.filter(item => item.type === 'photo')[0].media_key}
                />
              </Grid>
            )}
          </Grid>


          {/*
              <View style={styles.twitterLongPressFotoAndUserNameSection}>
                <View style={styles.twitterLongPressFotoSection}>
                  <Image
                    source={{ uri: twitterPhoto }}
                    style={styles.twitterLongPressFoto}
                    resizeMode={'contain'}
                  />
                </View>
                <Text style={styles.twitterLongPressUserNameText}>{twitterDisplayName}</Text>
              </View>
              <Text style={styles.twitterLongPressDesc}>{twitterContent}</Text>

              {twitterMedia &&
                <View style={
                  { display: 'none' }
                  // styles.twitterMediaSection
                }>
                
                  <Image
                    source={{ uri: twitterMedia.filter(item => item.type === 'photo')[0].url }}
                    key={twitterMedia.filter(item => item.type === 'photo')[0].media_key}
                    style={styles.twitterMediaPhoto}
                    resizeMode={'contain'}
                  />
                </View>} */}

        </DynamicModal>

        <DynamicModal show={showWinnerModal}>
          <Grid style={{ width: '90%', marginTop: '20px', }}>
            <Button
              style={{ float: 'right' }}
              onClick={() => {
                currentContext.setShowOverlay(false)
                setShowWinnerModal(false)
              }}>
              <CloseIcon style={{ color: 'red', fontSize: 35 }} />
            </Button>
          </Grid>

          {event.winners.find(winner => winner.winner_place === 1 && winner.is_winner === 1) &&
            <img
              src={GetWinnerPhoto()}
              style={{
                height: '200px',
                width: '300px',
                border: '5px solid #C29E16',
                borderRadius: '20px'
              }}
            ></img>
          }
          <h2>{t('Winner')}</h2>
          {event.winners.filter(item => item.is_winner === 1).map((winner, key) => {
            return (
              <Grid style={{ marginBottom: '10px' }}>

                <Button
                  style={{ color: '#C29E16', fontWeight: 'bold', fontSize: '20px' }}
                  onClick={() => {
                    CopyToClipboardHelper(GetWinnerUserName(winner))
                  }}>
                  {winner.winner_place + '. ' + t('Winner') + ': ' + GetWinnerUserName(winner)}
                </Button>
              </Grid>

            )
          })}
          <h2>{t('Alternative')}</h2>
          {event.winners.filter(item => item.is_backup === 1).map((winner, key) => {
            return (
              <Grid style={{ marginBottom: '10px' }}>
                <Button
                  style={{ color: 'grey', fontWeight: 'bold', fontSize: '15px' }}
                  onClick={() => {
                    CopyToClipboardHelper(GetWinnerUserName(winner))
                  }}>
                  {winner.winner_place + '. ' + t('Alternative') + ': ' + GetWinnerUserName(winner)}
                </Button>

              </Grid>
            )
          })}

        </DynamicModal>
        {isDesktop && (
          <Grid container className="desktopEventDetailPage" style={{ maxHeight: '1600px' }}>
            {showloading && <GlobalLoading />}
            {showAlertModal && (
              <AlertModal
                description={alertMessage}
                onSuccess={() => {
                  setShowAlertModal(false);
                }}
                showRightButton={showSecondAlertModalButton}
                rightButtonOnSuccess={() => {
                  currentContext.setShowOverlay(false);
                  navigate("/AccountSettings");
                }}
              />
            )}

            {showSuccessAlert &&
              <SuccessModal description={successAlertMessage} onSuccess={() => { currentContext.setShowOverlay(false); setShowSuccessAlert(false) }} />}

            {showDynamicModal && (

              <DynamicModal>
                <Grid
                  item
                  style={{
                    fontSize: "20px",
                    marginBottom: "10px",
                    justifyContent: "center",
                    display: "grid",
                  }}
                >
                  {dynamicModalTitle + conditionIdForDynamicModal}
                </Grid>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {(conditionIdForDynamicModal == 12 || conditionIdForDynamicModal == 13) && (
                    <Grid
                      container
                      direction={"column"}
                      style={{
                        justifyContent: "space-between",
                        flexWrap: "nowrap",
                      }}
                    >
                      <Grid
                        item
                        container
                        direction={"column"}
                        flexWrap={"nowrap"}
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        {photo && <Grid item>
                          <img
                            src={URL.createObjectURL(photo)}
                            alt=""
                            style={{
                              width: "15vw",
                              height: "20vh",
                              borderRadius: "20px",
                            }}
                          />
                        </Grid>}
                        <Grid
                          item
                          style={{ justifyContent: "center", display: "grid" }}
                        >
                          {!photo &&
                            <Button variant="contained" component="label">
                              <UploadIcon
                                style={{ fontSize: "20px", marginRight: "5px" }}
                              />
                              {t("UploadImage")}
                              <input
                                type="file"
                                onChange={onImageChange}
                                hidden
                              />
                            </Button>}
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                  <Grid
                    item
                    style={{ justifyContent: "center", display: "grid" }}
                  >
                    <TextField
                      id="outlined-multiline-static"
                      multiline
                      rows={4}
                      placeholder={dynamicModalPlaceHolder}
                      onChange={(e) => { setDynamicContent(e.target.value) }}
                    />
                  </Grid>

                </Box>

                <Grid
                  container
                  justifyContent={"space-evenly"}
                  style={{ marginTop: "20px" }}
                >
                  <Grid item>
                    <Button
                      style={{ color: "red" }}
                      variant="text"
                      onClick={() => {
                        setShowDynamicModal(false);
                        currentContext.setShowOverlay(false)
                        setPhoto(null)
                        setDynamicContent('')
                      }}
                    >
                      {t("CloseButton")}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        backgroundColor: "#1D9AF1",
                        borderRadius: "15px",
                      }}
                      variant="contained"
                      onClick={() => {
                        //Youtube comment
                        if (conditionIdForDynamicModal == 17) {
                          console.log("youtube comment")
                        } else {
                          //@ts-ignore
                          SendTwitterAction(competitionConditions[indexForDynamicModal], indexForDynamicModal)
                        }
                      }}
                    >
                      {t("SendButton")}
                    </Button>
                  </Grid>
                </Grid>
              </DynamicModal>
            )}

            <Grid item xs={1}></Grid>
            <Grid
              item
              xs={10}
              container
              style={{ justifyContent: "space-between" }}
            >
              <Grid item container direction={"column"} xs={7}>
                {/* Event Header */}
                <Grid
                  item
                  className="desktopEventHeader"
                  style={{
                    marginBottom: "25px",
                    color:
                      currentContext.GetCurrentThemeObject()
                        .eventDetailPageTextColor,
                  }}
                >
                  {event.competition_name}
                </Grid>

                {/* Resim ve Tarih bilgileri */}
                {isNotWrap && (<Grid item container direction={"row"}>
                  <Grid
                    item

                    container
                    direction={"row"}
                    className="d-CompetitionPhoto"
                    style={{
                      backgroundImage: `url(${event.competition_photo})`,
                      width: '504px',
                      height: '336px',
                      borderColor:
                        currentContext.GetCurrentThemeObject()
                          .eventCardBorderColor,
                    }}
                  >
                    <Countdown
                      date={event.competition_end_date}
                      renderer={({ minutes, seconds, hours, days }) => {
                        if (days < 1) {
                          return (
                            <Grid
                              container
                              item
                              style={{
                                padding: "10px",
                                marginTop: "25px",
                                fontSize: 20,
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                height: "45px",
                                width: "150px",
                                borderTopRightRadius: "20px",
                                borderBottomRightRadius: "20px",
                                alignItems: "center",
                              }}
                            >
                              {
                                <AccessTimeOutlinedIcon
                                  style={{ marginRight: "5%" }}
                                />
                              }
                              {hours}:{minutes}:{seconds}
                            </Grid>
                          );
                        }
                      }}
                    />
                  </Grid>

                  <Grid
                    item

                    container
                    direction={"column"}
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 4
                    }}
                  >
                    <Grid style={{ marginLeft: '10px', marginRight: '10px' }}>
                      {CalculateCountDown(event.competition_start_date).timestamp < 0 ?
                        //Bitişe bak
                        (CalculateCountDown(event.competition_end_date)
                          .timestamp > 0 ? (
                          <Button
                            disabled
                            variant="contained"
                            style={{ backgroundColor: "green", color: "white" }}
                          >
                            <Grid container>
                              <Grid item style={{ marginRight: "3px" }}>
                                {
                                  CalculateCountDown(event.competition_end_date)
                                    .text
                                }
                              </Grid>
                              <RocketLaunchIcon />
                            </Grid>
                          </Button>
                        ) : (
                          <Button
                            disabled
                            variant="contained"
                            style={{ backgroundColor: "red", color: "white", width: '150px', textAlign: 'center', alignItems: 'center', justifyContent: 'center', display: 'grid' }}
                          >
                            <>
                              <Grid container style={{ textAlign: 'center' }}>

                                {
                                  CalculateCountDown(event.competition_end_date)
                                    .text
                                }

                                <svg
                                  width="14"
                                  height="18"
                                  viewBox="0 0 14 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ marginLeft: '10px' }}
                                >
                                  <path
                                    d="M12.6562 2.25C13.1222 2.25 13.5 1.87225 13.5 1.40625V0.84375C13.5 0.377754 13.1222 0 12.6562 0H0.84375C0.377754 0 0 0.377754 0 0.84375V1.40625C0 1.87225 0.377754 2.25 0.84375 2.25C0.84375 5.44799 2.63728 8.1469 5.0921 9C2.63728 9.8531 0.84375 12.552 0.84375 15.75C0.377754 15.75 0 16.1278 0 16.5938V17.1562C0 17.6222 0.377754 18 0.84375 18H12.6562C13.1222 18 13.5 17.6222 13.5 17.1562V16.5938C13.5 16.1278 13.1222 15.75 12.6562 15.75C12.6562 12.552 10.8627 9.8531 8.4079 9C10.8627 8.1469 12.6562 5.44799 12.6562 2.25ZM6.75 7.3125C4.71843 7.3125 3.09375 4.97398 3.09375 2.25H10.4062C10.4062 4.99025 8.77113 7.3125 6.75 7.3125Z"
                                    fill="white"
                                  />
                                </svg>
                              </Grid>
                            </>
                          </Button>
                        ))
                        :
                        //Başlangıca bak
                        //Tablet moduna da uygulanacak
                        (<Button
                          disabled
                          variant="contained"
                          style={{ backgroundColor: "#1C8BE9", color: "white" }}
                        >
                          <Grid container>
                            <Grid item style={{ marginRight: "3px" }}>
                              {t('AboutToStart')} {
                                CalculateCountDown(event.competition_start_date)
                                  .text
                              }

                            </Grid>
                          </Grid>
                        </Button>)}


                    </Grid>
                    <Grid
                      item
                      container
                      direction={"column"}
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        color:
                          currentContext.GetCurrentThemeObject()
                            .eventDetailPageTextColor,
                      }}
                    >
                      <Grid item style={{ fontWeight: "bold" }}>
                        {t("EventBeginning")}
                      </Grid>
                      <Grid item style={{ fontSize: 18 }}>
                        {event.competition_start_date.split(" ")[0]}
                      </Grid>
                      <Grid item style={{ fontSize: 20 }}>
                        {event.competition_start_date.split(" ")[1]}
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      direction={"column"}
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        color:
                          currentContext.GetCurrentThemeObject()
                            .eventDetailPageTextColor,
                      }}
                    >
                      <Grid item style={{ fontWeight: "bold" }}>
                        {t("EventEnd")}
                      </Grid>
                      <Grid item style={{ fontSize: 18 }}>
                        {event.competition_end_date.split(" ")[0]}
                      </Grid>
                      <Grid item style={{ fontSize: 20 }}>
                        {event.competition_end_date.split(" ")[1]}
                      </Grid>
                    </Grid>
                  </Grid>



                </Grid>)}

                {isWrap && (<Grid item container direction={"row"}>
                  <Grid
                    item

                    container
                    direction={"row"}
                    className="d-CompetitionPhoto"
                    style={{
                      backgroundImage: `url(${event.competition_photo})`,
                      width: '390px',
                      height: '260px',

                      borderColor:
                        currentContext.GetCurrentThemeObject()
                          .eventCardBorderColor,
                    }}
                  >
                    <Countdown
                      date={event.competition_end_date}
                      renderer={({ minutes, seconds, hours, days }) => {
                        if (days < 1) {
                          return (
                            <Grid
                              container
                              item
                              style={{
                                padding: "10px",
                                marginTop: "25px",
                                fontSize: 16,
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                height: "45px",
                                width: "120px",
                                borderTopRightRadius: "20px",
                                borderBottomRightRadius: "20px",
                                alignItems: "center",
                              }}
                            >
                              {
                                <AccessTimeOutlinedIcon
                                  style={{ marginRight: "5%" }}
                                />
                              }
                              {hours}:{minutes}:{seconds}
                            </Grid>
                          );
                        }
                      }}
                    />
                  </Grid>

                  <Grid
                    item

                    container
                    direction={"column"}
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 4
                    }}
                  >
                    <Grid style={{ marginLeft: '10px', marginRight: '10px' }}>
                      {CalculateCountDown(event.competition_start_date).timestamp < 0 ?
                        //Bitişe bak
                        (CalculateCountDown(event.competition_end_date)
                          .timestamp > 0 ? (
                          <Button
                            disabled
                            variant="contained"
                            style={{ backgroundColor: "green", color: "white" }}
                          >
                            <Grid container>
                              <Grid item style={{ marginRight: "3px" }}>
                                {
                                  CalculateCountDown(event.competition_end_date)
                                    .text
                                }
                              </Grid>
                              <RocketLaunchIcon />
                            </Grid>
                          </Button>
                        ) : (
                          <Button
                            disabled
                            variant="contained"
                            style={{ backgroundColor: "red", color: "white", width: '150px', textAlign: 'center', alignItems: 'center', justifyContent: 'center', display: 'grid' }}
                          >
                            <>
                              <Grid container style={{ textAlign: 'center' }}>

                                {
                                  CalculateCountDown(event.competition_end_date)
                                    .text
                                }

                                <svg
                                  width="14"
                                  height="18"
                                  viewBox="0 0 14 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ marginLeft: '10px' }}
                                >
                                  <path
                                    d="M12.6562 2.25C13.1222 2.25 13.5 1.87225 13.5 1.40625V0.84375C13.5 0.377754 13.1222 0 12.6562 0H0.84375C0.377754 0 0 0.377754 0 0.84375V1.40625C0 1.87225 0.377754 2.25 0.84375 2.25C0.84375 5.44799 2.63728 8.1469 5.0921 9C2.63728 9.8531 0.84375 12.552 0.84375 15.75C0.377754 15.75 0 16.1278 0 16.5938V17.1562C0 17.6222 0.377754 18 0.84375 18H12.6562C13.1222 18 13.5 17.6222 13.5 17.1562V16.5938C13.5 16.1278 13.1222 15.75 12.6562 15.75C12.6562 12.552 10.8627 9.8531 8.4079 9C10.8627 8.1469 12.6562 5.44799 12.6562 2.25ZM6.75 7.3125C4.71843 7.3125 3.09375 4.97398 3.09375 2.25H10.4062C10.4062 4.99025 8.77113 7.3125 6.75 7.3125Z"
                                    fill="white"
                                  />
                                </svg>
                              </Grid>
                            </>
                          </Button>
                        ))
                        :
                        //Başlangıca bak
                        //Tablet moduna da uygulanacak
                        (<Button
                          disabled
                          variant="contained"
                          style={{ backgroundColor: "#1C8BE9", color: "white" }}
                        >
                          <Grid container>
                            <Grid item style={{ marginRight: "3px", }}>
                              {t('AboutToStart')}
                              <br />
                              {
                                CalculateCountDown(event.competition_start_date)
                                  .text
                              }

                            </Grid>
                          </Grid>
                        </Button>)}
                    </Grid>
                    <Grid
                      item
                      container
                      direction={"column"}
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        color:
                          currentContext.GetCurrentThemeObject()
                            .eventDetailPageTextColor,
                      }}
                    >
                      <Grid item style={{ fontWeight: "bold" }}>
                        {t("EventBeginning")}
                      </Grid>
                      <Grid item style={{ fontSize: 15 }}>
                        {event.competition_start_date.split(" ")[0]}
                      </Grid>
                      <Grid item style={{ fontSize: 18 }}>
                        {event.competition_start_date.split(" ")[1]}
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      direction={"column"}
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        color:
                          currentContext.GetCurrentThemeObject()
                            .eventDetailPageTextColor,
                      }}
                    >
                      <Grid item style={{ fontWeight: "bold" }}>
                        {t("EventEnd")}
                      </Grid>
                      <Grid item style={{ fontSize: 15 }}>
                        {event.competition_end_date.split(" ")[0]}
                      </Grid>
                      <Grid item style={{ fontSize: 18 }}>
                        {event.competition_end_date.split(" ")[1]}
                      </Grid>
                    </Grid>
                  </Grid>



                </Grid>)}


                {/* Katılan Sayısı, Partner ve Hakkında */}
                <Grid
                  container
                  direction={"column"}
                  item
                  style={{ marginTop: "20px" }}
                >
                  <Grid
                    item
                    container
                    style={{ marginBottom: "20px", marginTop: "20px" }}
                  >
                    <Grid
                      item
                      container
                      xs={4}
                      style={{
                        alignItems: "center", color: currentContext.GetCurrentThemeObject()
                          .eventDetailPageTextColor, fontSize: 18
                      }}
                    >

                      <ConfirmationNumberIcon
                        style={{
                          marginRight: '5px',
                          color:
                            currentContext.GetCurrentThemeObject()
                              .eventDetailPageTextColor,
                        }}
                      />
                      {tempParticipantAmount}{" "}
                      {t("PeopleAttended")}

                      {/* <Grid
                        item
                        style={{
                          fontSize: 18,
                          marginRight: "30px",
                          color:
                            currentContext.GetCurrentThemeObject()
                              .eventDetailPageTextColor,
                        }}
                      >
                        
                      </Grid> */}
                    </Grid>

                    <Grid
                      item
                      container
                      xs={8}
                      style={{
                        alignItems: "center",
                        color:
                          currentContext.GetCurrentThemeObject()
                            .eventDetailPageTextColor,
                      }}
                    >
                      <Grid item>
                        {additionalEventData?.first_three_attender_photo.map(
                          (item, index) => (
                            <img
                              key={index.toString()}
                              alt=""
                              src={item}
                              className="d-AttendersPhoto"
                            ></img>
                          )
                        )}
                      </Grid>
                      <Grid item style={{ fontSize: 20 }}>
                        +
                        {additionalEventData &&
                          tempParticipantAmount -
                          additionalEventData.first_three_attender_photo
                            .length}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item container direction={"row"} >
                    <Grid item container direction={"column"} xs={4}>
                      <Grid
                        item
                        className="d-AttendersTitle"
                        style={{
                          color:
                            currentContext.GetCurrentThemeObject()
                              .eventDetailPageTextColor,

                        }}
                      >
                        Partner
                      </Grid>
                      <Grid item container style={{ alignItems: "center", flexWrap: 'nowrap', marginRight: '5px', marginTop: '10px' }}>
                        <Grid item>
                          <img
                            alt=""
                            src={`${event.user.company.company_photo}`}
                            style={{
                              width: "35px",
                              height: "35px",
                              borderRadius: "50%",
                              border: "3px solid #c1c1c1",
                              marginRight: "5px",
                              float: "right",
                            }}
                          ></img>
                        </Grid>
                        <Grid
                          item
                          style={{
                            fontSize: 18,
                            marginLeft: "10px",
                            color:
                              currentContext.GetCurrentThemeObject()
                                .eventDetailPageTextColor,
                          }}
                        >
                          {event.user.company.company_name}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      direction={"column"}
                      xs={8}
                      style={{ paddingRight: "30px" }}
                    >
                      <Grid
                        item
                        className="d-AttendersTitle"
                        style={{
                          fontSize: 20,
                          color:
                            currentContext.GetCurrentThemeObject()
                              .eventDetailPageTextColor,
                          fontWeight: "bold",
                          marginBottom: "15px",
                        }}
                      >
                        {t("About")}
                      </Grid>
                      <Grid
                        item
                        style={{
                          color:
                            currentContext.GetCurrentThemeObject()
                              .eventDetailPageTextColor,
                        }}
                      >
                        {event.competition_description}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/*ŞARTLAR */}
                {/* <Grid item container direction={"column"} justifyContent={'space-between'} style={{ height: '350px', marginTop: '25px', width: '50%' }}>
                <Grid item container style={{ alignItems: 'center' }} justifyContent={'space-evenly'}>
                  <Grid item style={{ marginRight: "5px" }}>
                    <TwitterIcon style={{ color: '#1C9BF1', fontSize: 40 }} />
                  </Grid>
                  <Grid item>Conditions</Grid>
                </Grid>
                <Grid item container style={{ alignItems: 'center' }} justifyContent={'space-evenly'}>
                  <Grid item style={{ marginRight: "5px" }}>
                    <YouTubeIcon style={{ color: 'ff0000', fontSize: 40 }} />
                  </Grid>
                  <Grid item>Conditions</Grid>
                </Grid>
                <Grid item container direction={'row'} style={{ alignItems: 'center' }} justifyContent={'space-evenly'}>
                  <Grid item style={{ marginRight: "5px" }}>
                    <img style={{ width: '50px' }} src={`${discordLogo}`} />

                  </Grid>
                  <Grid item >Conditions</Grid>
                </Grid>
                <Grid item container style={{ alignItems: 'center' }} justifyContent={'space-evenly'}>
                  <Grid item style={{ marginRight: "5px" }}>
                    <img style={{ width: '50px', }} src={`${vienotLogo}`} />
                  </Grid>
                  <Grid item>Conditions</Grid>
                </Grid>
              </Grid> */}
              </Grid>


              <Grid
                item
                boxShadow={2}
                xs={5}
                container
                direction={"column"}
                className="d-Conditions"
                style={{
                  border: "2px solid #ccc",
                  borderRadius: "45px",
                  minWidth: "10%",
                  minHeight: "50vh",
                  marginBottom: "50vh",
                  backgroundColor: currentContext.socialUser
                    ? currentContext.GetCurrentThemeObject()
                      .eventDetailBackgroundColorLogin
                    : currentContext.GetCurrentThemeObject()
                      .eventDetailBackgroundColorNotLogin,
                }}
              >

                {!currentContext.socialUser && (
                  <Grid
                    style={{
                      marginTop: "5%",

                      alignSelf: "center",
                    }}
                  >
                    <Button
                      className="d-LoginToAttend"
                      style={{
                        color: "white",
                        width: '18vw',
                        borderRadius: "20px",
                      }}
                      onClick={() => {
                        currentContext.setShowDropDown(
                          !currentContext.showDropDown
                        );
                      }}
                    >
                      {t("LoginToAttend")}
                    </Button>
                  </Grid>
                )}

                {currentContext.socialUser && CalculateCountDown(event.competition_end_date).timestamp < 0 && (
                  <Grid
                    style={{
                      marginTop: "5%",

                      alignSelf: "center",
                    }}
                  >
                    <Button
                      className="d-LoginToAttend"
                      style={{
                        color: "white",
                        width: '18vw',
                        borderRadius: "20px",
                      }}
                      onClick={() => {
                        GetWinner()
                      }}
                    >
                      {event.winners && event.winners.length > 0 ? t("ShowWinner") : t('ResultsWaiting')}
                    </Button>
                  </Grid>
                )}

                {competitionConditions &&
                  competitionConditions.map((item, index) => (
                    <Grid
                      className="d-CompetitionConditions"
                      key={index.toString()}
                      container
                      style={{
                        paddingLeft: "8%",
                        paddingRight: "8%",
                        paddingTop: "5%",
                      }}
                    >
                      <Button
                        {...onLongPress(() => {
                          FindTheRightInfoModal(item)
                          setAllowToRunOnClick(false)
                        })}
                        onClick={() => {
                          if (allowToRunOnClick) {
                            OnCompetitionConditionPress(item, index);
                          }
                        }}
                        disabled={
                          !currentContext.socialUser ||
                          (CalculateCountDown(event.competition_end_date).timestamp < 0) ||
                          (CalculateCountDown(event.competition_start_date).timestamp > 0)
                        }
                        className="d-CompetitionConditionsButton"
                        style={{
                          backgroundColor: currentContext.socialUser
                            ? currentContext.GetCurrentThemeObject()
                              .eventDetailConditionLoginButtonColor
                            : currentContext.GetCurrentThemeObject()
                              .eventDetailBackgroundColorNotLogin,
                          borderRadius: "40px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          flex: 1,
                          justifyContent: "space-between",
                          color:
                            currentContext.GetCurrentThemeObject()
                              .eventDetailConditionTextColor,
                          border: "1px solid #c1c1c1",
                        }}
                      >
                        <Grid item>
                          {GetProperSocialMediaIconForCondition(item.condition)}
                        </Grid>
                        <Grid item style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                          {GetProperLanguageForCondition(item.condition)}
                        </Grid>
                        <Grid item>
                          <img
                            key={index.toString()}
                            src={GetProperConditionIcon(item)}
                            alt=""
                          />
                        </Grid>
                      </Button>
                    </Grid>
                  ))}
              </Grid>
            </Grid>

            <Grid item xs={1}></Grid>
          </Grid>
        )}

        {isTablet && (
          <Grid container className="tabletEventDetailPage">
            {showloading && <GlobalLoading />}
            {showAlertModal && (
              <AlertModal
                description={alertMessage}
                onSuccess={() => {
                  setShowAlertModal(false);
                }}
                showRightButton={showSecondAlertModalButton}
                rightButtonOnSuccess={() => {
                  currentContext.setShowOverlay(false);
                  navigate("/AccountSettings");
                }}
              />
            )}
            {showSuccessAlert &&
              <SuccessModal description={successAlertMessage} onSuccess={() => { currentContext.setShowOverlay(false); setShowSuccessAlert(false) }} />}
            <Grid item container style={{ justifyContent: "space-between" }}>
              <Grid
                item
                container
                direction={"column"}
                style={{ alignItems: "center" }}
              >
                {/* Event Header */}
                <Grid
                  item
                  className="tabletEventHeader"
                  style={{
                    marginLeft: "10px",
                    marginBottom: "20px",
                    color:
                      currentContext.GetCurrentThemeObject()
                        .eventDetailPageTextColor,
                  }}
                >
                  {event.competition_name}
                </Grid>
                <Grid style={{ alignItems: "center", marginBottom: "40px" }}>
                  {CalculateCountDown(event.competition_start_date).timestamp < 0 ?
                    //Bitişe bak
                    (CalculateCountDown(event.competition_end_date)
                      .timestamp > 0 ? (
                      <Button
                        disabled
                        variant="contained"
                        style={{ backgroundColor: "green", color: "white" }}
                      >
                        <Grid container>
                          <Grid item style={{ marginRight: "3px" }}>
                            {
                              CalculateCountDown(event.competition_end_date)
                                .text
                            }
                          </Grid>
                          <RocketLaunchIcon />
                        </Grid>
                      </Button>
                    ) : (
                      <Button
                        disabled
                        variant="contained"
                        style={{ backgroundColor: "red", color: "white", width: '150px', textAlign: 'center', alignItems: 'center', justifyContent: 'center', display: 'grid' }}
                      >
                        <>
                          <Grid container style={{ textAlign: 'center' }}>

                            {
                              CalculateCountDown(event.competition_end_date)
                                .text
                            }

                            <svg
                              width="14"
                              height="18"
                              viewBox="0 0 14 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ marginLeft: '10px' }}
                            >
                              <path
                                d="M12.6562 2.25C13.1222 2.25 13.5 1.87225 13.5 1.40625V0.84375C13.5 0.377754 13.1222 0 12.6562 0H0.84375C0.377754 0 0 0.377754 0 0.84375V1.40625C0 1.87225 0.377754 2.25 0.84375 2.25C0.84375 5.44799 2.63728 8.1469 5.0921 9C2.63728 9.8531 0.84375 12.552 0.84375 15.75C0.377754 15.75 0 16.1278 0 16.5938V17.1562C0 17.6222 0.377754 18 0.84375 18H12.6562C13.1222 18 13.5 17.6222 13.5 17.1562V16.5938C13.5 16.1278 13.1222 15.75 12.6562 15.75C12.6562 12.552 10.8627 9.8531 8.4079 9C10.8627 8.1469 12.6562 5.44799 12.6562 2.25ZM6.75 7.3125C4.71843 7.3125 3.09375 4.97398 3.09375 2.25H10.4062C10.4062 4.99025 8.77113 7.3125 6.75 7.3125Z"
                                fill="white"
                              />
                            </svg>
                          </Grid>
                        </>
                      </Button>
                    ))
                    :
                    //Başlangıca bak
                    //Tablet moduna da uygulanacak
                    (<Button
                      disabled
                      variant="contained"
                      style={{ backgroundColor: "#1C8BE9", color: "white" }}
                    >
                      <Grid container>
                        <Grid item style={{ marginRight: "3px" }}>
                          {t('AboutToStart')} {
                            CalculateCountDown(event.competition_start_date)
                              .text
                          }

                        </Grid>
                      </Grid>
                    </Button>)}
                </Grid>

                {/* Resim ve Tarih bilgileri */}
                {isNotMobile && (<Grid
                  item
                  container
                  direction={"row"}
                  style={{
                    justifyContent: "center",
                    color:
                      currentContext.GetCurrentThemeObject()
                        .eventDetailPageTextColor,
                  }}
                >
                  <Grid
                    item
                    container
                    direction={"row"}
                    className="t-CompetitionPhoto"
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",

                      height: "480px",
                      width: "720px",
                      backgroundImage: `url(${event.competition_photo})`,

                      borderColor:
                        currentContext.GetCurrentThemeObject()
                          .eventCardImageBorderColor,
                    }}
                  >
                    <Countdown
                      date={event.competition_end_date}
                      renderer={({ minutes, seconds, hours, days }) => {
                        if (days < 5) {
                          return (
                            <Grid
                              container
                              item
                              style={{
                                padding: "10px",
                                marginTop: "25px",
                                fontSize: 20,
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                height: "45px",
                                width: "150px",
                                borderTopRightRadius: "20px",
                                borderBottomRightRadius: "20px",
                                alignItems: "center",
                              }}
                            >
                              {
                                <AccessTimeOutlinedIcon
                                  style={{ marginRight: "5%" }}
                                />
                              }
                              {hours}:{minutes}:{seconds}
                            </Grid>
                          );
                        }
                      }}
                    />
                  </Grid>

                  <Grid
                    item
                    container
                    direction={"row"}
                    style={{
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Grid
                      item
                      xs={6}
                      container
                      direction={"column"}
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <Grid item style={{ fontWeight: "bold" }}>
                        {t("EventBeginning")}
                      </Grid>
                      <Grid item style={{ fontSize: 18 }}>
                        {event.competition_start_date.split(" ")[0]}
                      </Grid>
                      <Grid item style={{ fontSize: 20 }}>
                        {event.competition_start_date.split(" ")[1]}
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      container
                      direction={"column"}
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Grid item style={{ fontWeight: "bold" }}>
                        {t("EventEnd")}
                      </Grid>
                      <Grid item style={{ fontSize: 18 }}>
                        {event.competition_end_date.split(" ")[0]}
                      </Grid>
                      <Grid item style={{ fontSize: 20 }}>
                        {event.competition_end_date.split(" ")[1]}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>)}

                {isMobile && (<Grid
                  item
                  container
                  direction={"row"}
                  style={{
                    justifyContent: "center",
                    color:
                      currentContext.GetCurrentThemeObject()
                        .eventDetailPageTextColor,
                  }}
                >
                  <Grid
                    item
                    container
                    direction={"row"}
                    className="t-CompetitionPhoto"
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",

                      height: "320px",
                      width: "480px",
                      backgroundImage: `url(${event.competition_photo})`,

                      borderColor:
                        currentContext.GetCurrentThemeObject()
                          .eventCardImageBorderColor,
                    }}
                  >
                    <Countdown
                      date={event.competition_end_date}
                      renderer={({ minutes, seconds, hours, days }) => {
                        if (days < 5) {
                          return (
                            <Grid
                              container
                              item
                              style={{
                                padding: "10px",
                                marginTop: "25px",
                                fontSize: 20,
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                height: "45px",
                                width: "150px",
                                borderTopRightRadius: "20px",
                                borderBottomRightRadius: "20px",
                                alignItems: "center",
                              }}
                            >
                              {
                                <AccessTimeOutlinedIcon
                                  style={{ marginRight: "5%" }}
                                />
                              }
                              {hours}:{minutes}:{seconds}
                            </Grid>
                          );
                        }
                      }}
                    />
                  </Grid>

                  <Grid
                    item
                    container
                    direction={"row"}
                    style={{
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Grid
                      item
                      xs={6}
                      container
                      direction={"column"}
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <Grid item style={{ fontWeight: "bold" }}>
                        {t("EventBeginning")}
                      </Grid>
                      <Grid item style={{ fontSize: 18 }}>
                        {event.competition_start_date.split(" ")[0]}
                      </Grid>
                      <Grid item style={{ fontSize: 20 }}>
                        {event.competition_start_date.split(" ")[1]}
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      container
                      direction={"column"}
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Grid item style={{ fontWeight: "bold" }}>
                        {t("EventEnd")}
                      </Grid>
                      <Grid item style={{ fontSize: 18 }}>
                        {event.competition_end_date.split(" ")[0]}
                      </Grid>
                      <Grid item style={{ fontSize: 20 }}>
                        {event.competition_end_date.split(" ")[1]}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>)}

                {/* Katılan Sayısı, Partner ve Hakkında */}

                <Grid
                  item
                  container
                  direction={"row"}
                  className="m-AttendersGroup"
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    justifyContent: "center",
                    color:
                      currentContext.GetCurrentThemeObject()
                        .eventDetailPageTextColor,
                  }}
                >
                  <Grid item xs={1}></Grid>
                  <Grid
                    item
                    direction={"row"}
                    container
                    style={{ justifyContent: "center" }}
                    xs={10}
                  >
                    <Grid
                      item
                      direction={"row"}
                      xs={12}
                      style={{
                        justifyContent: "center",
                        display: "grid",
                        marginBottom: "20px",
                      }}
                    >
                      <Grid
                        item
                        container

                        style={{
                          alignItems: "center", color: currentContext.GetCurrentThemeObject()
                            .eventDetailPageTextColor, fontSize: 18
                        }}
                      >

                        <ConfirmationNumberIcon
                          style={{
                            marginRight: '5px',
                            color:
                              currentContext.GetCurrentThemeObject()
                                .eventDetailPageTextColor,
                          }}
                        />
                        {tempParticipantAmount}{" "}
                        {t("PeopleAttended")}

                        {/* <Grid
                        item
                        style={{
                          fontSize: 18,
                          marginRight: "30px",
                          color:
                            currentContext.GetCurrentThemeObject()
                              .eventDetailPageTextColor,
                        }}
                      >
                        
                      </Grid> */}
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      style={{
                        alignItems: "center",
                        flexWrap: "nowrap",
                        justifyContent: "center",
                      }}
                    >
                      <Grid item>
                        {additionalEventData?.first_three_attender_photo.map(
                          (item, index) => (
                            <img
                              key={index.toString()}
                              alt=""
                              src={item}
                              className="m-AttendersPhoto"
                            ></img>
                          )
                        )}
                      </Grid>
                      <Grid item style={{ fontSize: 20 }}>
                        +
                        {additionalEventData &&
                          tempParticipantAmount -
                          additionalEventData.first_three_attender_photo
                            .length}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              direction={"column"}
              className="m-Conditions"
              style={{
                backgroundColor: currentContext.socialUser
                  ? currentContext.GetCurrentThemeObject()
                    .eventDetailBackgroundColorLogin
                  : currentContext.GetCurrentThemeObject()
                    .eventDetailBackgroundColorNotLogin,
                margin: "5%",
                minHeight: "50vh",
              }}
            >
              {!currentContext.socialUser && (
                <Grid
                  style={{
                    marginTop: "5%",

                    alignSelf: "center",
                  }}
                >
                  <Button
                    className="m-LoginToAttend"
                    style={{
                      color: "white",
                      width: '40vw',
                      borderRadius: "20px",
                    }}
                    onClick={() => {
                      currentContext.setShowDropDown(
                        !currentContext.showDropDown
                      );
                    }}
                  >
                    {t("LoginToAttend")}
                  </Button>
                </Grid>
              )}

              {currentContext.socialUser && CalculateCountDown(event.competition_end_date).timestamp < 0 && (
                <Grid
                  style={{
                    marginTop: "5%",

                    alignSelf: "center",
                  }}
                >
                  <Button
                    className="d-LoginToAttend"
                    style={{
                      color: "white",
                      width: '18vw',
                      borderRadius: "20px",
                    }}
                    onClick={() => {
                      GetWinner()
                    }}
                  >
                    {t("ShowWinner")}
                  </Button>
                </Grid>
              )}
              {competitionConditions && competitionConditions.map((item, index) => (
                <Grid
                  key={index.toString()}
                  container
                  className="m-CompetitionConditions"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: "20px",
                    paddingLeft: "8%",
                    paddingRight: "8%",
                    paddingTop: "5%",
                    flexWrap: "nowrap",
                  }}
                >
                  <Button
                    {...onLongPress(() => {
                      FindTheRightInfoModal(item)
                      setAllowToRunOnClick(false)
                    })}
                    onClick={() => {
                      if (allowToRunOnClick) {
                        OnCompetitionConditionPress(item, index);
                      }
                    }}
                    disabled={
                      !currentContext.socialUser ||
                      (CalculateCountDown(event.competition_end_date).timestamp < 0) ||
                      (CalculateCountDown(event.competition_start_date).timestamp > 0)
                    }
                    className="m-CompetitionConditionsButton"
                    style={{
                      backgroundColor: currentContext.socialUser
                        ? currentContext.GetCurrentThemeObject()
                          .eventDetailConditionLoginButtonColor
                        : currentContext.GetCurrentThemeObject()
                          .eventDetailBackgroundColorNotLogin,
                      borderRadius: "40px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      flex: 1,
                      justifyContent: "space-between",
                      color:
                        currentContext.GetCurrentThemeObject()
                          .eventDetailConditionTextColor,
                      border: "1px solid #c1c1c1",
                    }}
                  >
                    <Grid item>
                      {GetProperSocialMediaIconForCondition(item.condition)}
                    </Grid>
                    <Grid item style={{ padding: '10px' }}>
                      {GetProperLanguageForCondition(item.condition)}
                    </Grid>
                    <Grid item>
                      <img
                        key={index.toString()}
                        src={GetProperConditionIcon(item)}
                        alt=""
                      />
                    </Grid>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </>
    );
  } else {
    return (
      <Grid container style={{ minHeight: window.innerHeight }}>
      </Grid>
    );
  }
}
