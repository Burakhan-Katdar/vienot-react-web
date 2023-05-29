export interface SharedContextModel {
    showOverlay: boolean;
    setShowOverlay: (arg: boolean) => Function;
    socialUser: SocialUserModel;
    setSocialUser: (arg0: SocialUserModel) => Function;
    showDropDown: boolean;
    setShowDropDown: (arg: boolean) => Function;
    isDarkMode: boolean;
    setIsDarkMode: (arg: boolean) => Function;
    GetCurrentThemeObject: () => ThemeModel
}

export interface YoutubeInformationModel {
    informations: {
        profile_image_url: string,
        thumbnail_url: string,
        channel_name: string,
        subscriber_count: number,
        like_count: number,
        view_count: number
    }
    condition_id: number,
    competition_condition_id: number

}

export interface DiscordInformationModel {
    informations: {
        server_name: string,
        server_photo_url: string
    }
    condition_id: number,
    competition_condition_id: number
}

export interface TwitterInformationModel {
    informations: {
        profile_image_url: string,
        username: string,
        display_name: string,
        tweet_content: string,
        tweet_medias: TwitterMediaModel[]
    }
    condition_id: number,
    competition_condition_id: number
}

export interface TwitterMediaModel {
    media_key: string,
    type: string,
    url: string
}

export interface YoutubeInformationModel {
    informations: {
        profile_image_url: string,
        thumbnail_url: string,
        channel_name: string,
        subscriber_count: number,
        like_count: number,
        view_count: number
    }
    condition_id: number,
    competition_condition_id: number

}

export interface ThemeModel {
    mainEventPageBackgroundColor: string,
    mainEventPageTitleColor: string,
    eventCardBackgroundColor: string,
    eventCardTextColor: string,
    eventCardBorderColor: string,
    eventCardImageBorderColor: string,
    eventDetailPageTextColor: string,
    eventGroupPageTitleColor: string,
    accountSettingsTextColor: string,
    accountSettingsSectionBackgroundColor: string,
    accountSettingsSectionBorderColor: string,
    eventDetailBackgroundColorLogin: string,
    eventDetailBackgroundColorNotLogin: string,
    eventDetailConditionLoginButtonColor: string,
    eventDetailConditionNotLoginButtonColor: string,
    eventDetailConditionTextColor: string,
    noLoginComponentPageTextColor: string,
    hrTagBackgroundColor: string,


}

export interface ApiBaseResponseModel {
    code: string,
    data: any,
    message: string,
    message_translate: string
}

export interface CompetitionModel {
    id: number,
    competition_end_date: string,
    competition_photo: string,
    competition_second_photo: string,
    competition_third_photo: string,
    competition_start_date: string,
    competition_name: string,
    competition_description: string,
    user: {
        company: {
            company_name: string,
            company_photo: string
        }
    },
    competition_conditions: CompetitionConditionModel[],
    winners: Array<WinnerModel>,
}

export interface CompetitionConditionModel {
    id: number,
    competition_id: number,
    condition_id: number,
    competition_condition_value: string,
    condition: ConditionModel,
    user_competition_conditions: {
        user: {
            social_user: {
                twitter_user: {
                    twitter_photo_url: string
                },
                google_user: {
                    google_photo: string
                },
                social_user_profile_photo: string
            }
        },
        state: number,
        competition_condition_id: number
    }[]
}

export interface ConditionModel {
    id: number,
    condition_name: string,
    condition_name_en: string,
    social_media_id: number,
    social_media_name: string,
}

export interface SocialUserModel {
    socialUserId: number;
    socialUserBiography: string;
    profilePhoto: string,
    displayName: string,
    twitter_user: TwitterUserModel,
    youtube_user: YoutubeUserModel,
    discord_user: DiscordUserModel,
    apple_user: AppleUserModel
    google_user: GoogleUserModel
    isTwitchConnected: number,
    isTwitterConnected: number,
    isGoogleConnected: number,
    isAppleConnected: number,
    isYoutubeConnected: number,
    isDiscordConnected: number,
    social_user_profile_photo: string
}

export interface AppleUserModel {
    id: number;
    social_user_id: number;
    family_name: string;
    given_name: string;
}

export interface GoogleUserModel {
    id: number;
    social_user_id: number;
    google_full_name: string;
    google_photo: string;
}

export interface TwitterUserModel {
    id: number;
    social_user_id: number;
    twitter_user_id: number;
    twitter_username: string;
    twitter_display_name: string;
    twitter_photo_url: string;
}

export interface YoutubeUserModel {
    id: number;
    social_user_id: number;
    channel_name: string;
    channel_profile_photo: string;
    channel_subscriber_count: number;
    channel_view_count: number;
}

export interface DiscordUserModel {
    id: number;
    social_user_id: number;
    discord_username: string;
    discord_discriminator: string;
    discord_profile_photo: string;
}

export interface AdditionalCompetitionModel {
    participantAmount: number,
    first_three_attender_photo: string[]
}

export interface BaseModalProps {
    description: string,
    onSuccess: () => void
}

export interface AlertModalProps extends BaseModalProps {
    showRightButton?: boolean
    rightButtonOnSuccess?: () => void
}

export interface SuccessModalProps extends BaseModalProps { }

export interface QuestionModalProps extends BaseModalProps {
    onDeny: () => void
}

export interface GoogleLoginSuccessModel {
    tokenId: string,
    accessToken: string,
    profileObj: {
        googleId: string,
        imageUrl: string,
        email: string,
        name: string,
        givenName: string,
        familyName: string
    }
}

export interface MaintenanceModeDataModel {
    maintain_mode_message_tr: {
        stringValue: string
    },
    maintain_mode_message_en: {
        stringValue: string
    },
    maintain_mode: {
        booleanValue: boolean
    }

}

export interface UploadFileRequestModel {
    successFunction: Function,
    errorFunction: Function,
    exceptionFunction: (e: any) => void,
    body: any
    place: string
}

export interface InviteDataModel {
    invite_share_text_tr: {
        stringValue: string
    },
    invite_share_text_en: {
        stringValue: string
    }
}

export interface CheckSocialMediaConnectionModel {
    twitterConnected: boolean,
    youtubeConnected: boolean,
    discordConnected: boolean,
    twitterVarMi: boolean,
    youtubeVarMi: boolean,
    discordVarMi: boolean,
}

export interface QueryParamsModel {
    type: string,
    data: any
}

export interface TwitterQueryParamsModel {
    oauth_token: string,
    oauth_token_secret: string,
    user_id: string,
    screen_name: string
}

export interface DiscordQueryParamsModel {
    access_token: string,
    refresh_token: string
}

export interface UserModel {
    id: number,
    social_user: SocialUserModel
}

export interface CompetitionResultModel {
    id: number;
    competition_id: number;
    user: UserModel;
}

export interface WinnerModel {
    competition_result: CompetitionResultModel;
    is_backup: number;
    is_winner: number;
    winner_place: number;
}


