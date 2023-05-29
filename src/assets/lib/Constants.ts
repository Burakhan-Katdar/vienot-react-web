import { ThemeModel } from "./Models"

// export const baseUrlForEndpoint = 'https://api.vienotapp.com'

// export const baseUrlForImageUploadEndpoint = 'https://nodejs.vienotapp.com/api/upload'

// export const baseUrlForJoinServerDiscordEndpoint = 'https://nodejs.vienotapp.com/api/social-medias/join-a-server-discord'

// export const companyPhotoPreLink = 'https://api.vienotapp.com/uploads/profile-photos/'

// export const eventPhotoPreLink = 'https://api.vienotapp.com/uploads/event-photos/'


//Test
export const baseUrlForEndpoint = 'https://dragon.vienotapp.com'

export const baseUrlForImageUploadEndpoint = 'https://testnodejs.vienotapp.com/api/upload'

export const baseUrlForJoinServerDiscordEndpoint = 'https://testnodejs.vienotapp.com/api/social-medias/join-a-server-discord'

export const companyPhotoPreLink = 'https://dragon.vienotapp.com/uploads/profile-photos/'

export const eventPhotoPreLink = 'https://dragon.vienotapp.com/uploads/event-photos/'



//Bunları ellemiyoruz. Hem test hem canlı için ortak linkler
export const baseUrlForMainSite = 'https://vienot.app'

export const baseUrlForMainSiteReferralLink = 'https://vienot.app/r'

export const socketLinkServer = 'https://nodejs.vienotapp.com/'

export const links = {
    getCompetitions: '/api/competitions/web',
    getCompetitionsByGroup: '/api/competitions/web/by-type',
    getCompetitionBy: "/api/competitions/get-competition-by-id-for-notification",
    socialLogin: '/api/auth/social-login',
    getUserCompetitionConditions: '/api/competitions/get-user-competition-conditions',
    checkCompetitionConditionsAreCompatibleForUser: '/api/competitions/check-competition-conditions-are-compatible-for-user',
    authenticateSocialUserAtMobileForTwitter: "/api/social-medias/authenticate-social-user-at-mobile",
    socialIntegration: '/api/auth/social-integration',
    authenticateYoutubeSocialUserAtMobile: "/api/social-medias/authenticate-youtube-social-user-at-mobile",
    authenticateDiscordSocialUserAtMobile: "/api/social-medias/authenticate-discord-social-user-at-mobile",
    deleteAccount: '/api/users/delete-account',
    disconnectSocialAccount: '/api/social-medias/disconnect-social-account',
    reTweet: '/api/social-medias/re-tweet',
    twitterLike: '/api/social-medias/twitter-like',
    twitterFollow: '/api/social-medias/twitter-follow',
    twitterComment: '/api/social-medias/twitter-comment',
    twitterSendTweet: '/api/social-medias/send-tweet',
    subscribeAChannel: '/api/social-medias/subscribe-a-channel',
    likeAYoutubeVideo: '/api/social-medias/like-a-youtube-video',
    commentAYoutubeVideo: '/api/social-medias/comment-a-youtube-video',
    inviteFriend: '/api/social-medias/invite-friend',
    getRecentSocialUserData: '/api/users/get-social-user',
    makeCompetitionReadyForUser: '/api/competitions/make-competition-ready-for-user',
    checkIfUserIsStillExist: '/api/users/is-account-exists',
    uploadMedia: "/api/social-medias/upload-media",
    laravelUserPhotoUpload: "/api/users/upload-media",
    getWinner: '/api/competitions/get-winners',
}

export const dimensions = {
    screenHeight: window.innerHeight,
    screenWidth: window.innerWidth
}

export const darkModeCss: ThemeModel = {
    mainEventPageBackgroundColor: '#331E97',
    mainEventPageTitleColor: 'white',
    eventCardBackgroundColor: '#331E97',
    eventCardTextColor: 'white',
    eventCardBorderColor: 'white',
    eventCardImageBorderColor: 'white',
    eventDetailPageTextColor: 'white',
    eventGroupPageTitleColor: 'white',
    accountSettingsTextColor: 'white',
    eventDetailBackgroundColorLogin: '#4D32CF',
    eventDetailBackgroundColorNotLogin: '#331E97',
    eventDetailConditionLoginButtonColor: '#6A4CF6',
    eventDetailConditionNotLoginButtonColor: '#331E97',
    eventDetailConditionTextColor: 'white',
    noLoginComponentPageTextColor: 'white',
    hrTagBackgroundColor:'#6A4CF6',
    accountSettingsSectionBackgroundColor: '#4D32CF',
    accountSettingsSectionBorderColor:'white',
    
}

export const lightModeCss: ThemeModel = {
    mainEventPageBackgroundColor: 'white',
    mainEventPageTitleColor: 'black',
    eventCardBackgroundColor: 'white',
    eventCardTextColor: 'black',
    eventCardBorderColor: 'grey',
    eventCardImageBorderColor: 'black',
    eventDetailPageTextColor: 'black',
    eventGroupPageTitleColor: 'black',
    accountSettingsTextColor: 'black',
    eventDetailBackgroundColorLogin: 'white',
    eventDetailBackgroundColorNotLogin: '#e0e0e0',
    eventDetailConditionLoginButtonColor: 'white',
    eventDetailConditionNotLoginButtonColor: '#e0e0e0',
    eventDetailConditionTextColor: 'black',
    noLoginComponentPageTextColor: 'black',
    hrTagBackgroundColor:'grey',
    accountSettingsSectionBackgroundColor: '#E9E8EF',
    accountSettingsSectionBorderColor:'grey',
  


}

export const googleClientId = '255606979904-tqkc1nfh22hbpqrhh58603gsqnsrrov0.apps.googleusercontent.com'
export const appleClientId = 'com.vienot.ios'