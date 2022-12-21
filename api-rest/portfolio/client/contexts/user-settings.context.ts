import { createContext, useContext } from "react";

export type UserSetting = {
  isDarkTheme: boolean;
};

export const UserSettingContext = createContext<UserSetting>({
  isDarkTheme: false,
});

export const useUserSettingContext = () => useContext(UserSettingContext);
