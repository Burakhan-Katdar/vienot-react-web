import React, { createContext, useState } from 'react';
import { darkModeCss, lightModeCss } from './Constants';
import { SocialUserModel, ThemeModel } from './Models';

export const SharedContextProvider = (props: any) => {

    const AssingIfThereIsCookieForSocialUser = (): SocialUserModel => {
        if (localStorage.getItem('SocialUser')) {
            //@ts-ignore
            return JSON.parse(localStorage.getItem('SocialUser'))
        }
        //@ts-ignore
        return null
    }
    
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [socialUser, setSocialUser] = useState<SocialUserModel>(AssingIfThereIsCookieForSocialUser());
    const [showDropDown, setShowDropDown] = React.useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const GetCurrentThemeObject = (): ThemeModel => {
        if (isDarkMode) {
            return darkModeCss
        } else {
            return lightModeCss
        }
    }
    return (
        <SharedContext.Provider
            value={{
                showOverlay,
                setShowOverlay,
                socialUser,
                setSocialUser,
                showDropDown,
                setShowDropDown,
                isDarkMode,
                setIsDarkMode,
                GetCurrentThemeObject
            }}>
            {props.children}
        </SharedContext.Provider>
    );

};

export const SharedContext = createContext({});
