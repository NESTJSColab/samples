import { ChangeEvent, useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import themeBuilder from "../theme";
import Header from "../components/layout/header";
import { ThemeModeEnum } from "../theme/models";
import {
  UserSetting,
  UserSettingContext,
  useUserSettingContext,
} from "../contexts/user-settings.context";
import { LocalStorageHelper } from "../shared/helpers";
import { APP_PREFIX } from "../shared/models/globals";
import { Breadcrumb } from "../components/ui/breadcrumps";

interface MainAppProps {
  Component: any;
  pageProps;
}

const ExtendedApp: React.FC<MainAppProps> = ({
  Component,
  pageProps,
}): JSX.Element => {
  const [darkTheme, setDarkTheme] = useState(false);

  let userSettings = useUserSettingContext();

  const dynamicBreadcrumps = Breadcrumb();

  const handleThemeChange = (
    _event: ChangeEvent<HTMLInputElement>,
    _checked: boolean
  ) => {
    setDarkTheme(!darkTheme);

    LocalStorageHelper.instance().setKey<UserSetting>(APP_PREFIX, {
      ...userSettings,
      isDarkTheme: !darkTheme,
    });
  };

  useEffect(() => {
    //Remove the server-side injected CSS
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if (
      (userSettings = LocalStorageHelper.instance().getKey<UserSetting>(
        APP_PREFIX
      ))
    )
      setDarkTheme(userSettings.isDarkTheme);
  }, []);

  const currentTheme = darkTheme
    ? themeBuilder(ThemeModeEnum.Dark)
    : themeBuilder(ThemeModeEnum.Light);

  return (
    <UserSettingContext.Provider value={userSettings}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Header darkTheme={darkTheme} handleThemeChange={handleThemeChange} />
        <Component {...pageProps} />
      </ThemeProvider>
    </UserSettingContext.Provider>
  );
};

export default ExtendedApp;
