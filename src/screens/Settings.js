import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import React from "react";

// Icons
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";

// Themes
import { THEMES } from "../styles/themes";

// Actions
import { toggleTheme } from "../redux/actions";

// Redux
import { useDispatch, useSelector } from "react-redux";

/* Styled Components */
import styled from "styled-components/native";

const ViewScreen = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const ViewContentWrapper = styled.View`
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
`;

const TextTitle = styled.Text`
  color: ${(props) => props.theme.colors.font};
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ViewCard = styled.View`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 8px;
  padding: 6px 12px;
`;

const ViewUserContainer = styled(ViewCard)`
  width: 100%;
  flex-direction: row;
  margin-bottom: 30px;
`;

const IconUser = styled(IconFontAwesome)`
  width: 18%;
`;

const ViewUserContent = styled.View`
  width: 72%;
  padding-left: 15px;
  margin-top: 5px;
`;

const IconUserArrow = styled(IconMaterialIcons)`
  width: 10%;
  margin: auto;
`;

const TextUsername = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.font};
  margin-bottom: 2px;
`;

const TextUserInfo = styled.Text`
  color: ${(props) => props.theme.colors.font};
`;

const ViewOptionsContainer = styled(ViewCard)`
  padding-top: 0;
  padding-bottom: 0;
  height: auto;
  align-content: center;
  justify-content: center;
`;

const ViewOption = styled.View`
  width: 100%;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  padding: 5px 0;
`;

const IconOption = styled(IconFontAwesome)`
  width: 10%;
  align-content: center;
`;

const ViewOptionProperty = styled.View`
  height: 100%;
  width: 90%;
  flex-direction: row;
  align-content: center;
  padding-bottom: ${(props) => (props.showSeparetorLine ? "5px" : 0)};
  border-bottom-color: ${(props) => props.theme.colors.secondary};
  border-bottom-width: ${(props) => (props.showSeparetorLine ? "1px" : 0)};
`;

const TextOption = styled.Text`
  width: 83%;
  padding-top: 4.5px;
  font-size: 16px;
  align-content: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.font};
`;

const CustomSwitch = styled.Switch`
  width: 17%;
`;

function Settings() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const themeStyles = THEMES[theme];

  function handleSwitch() {
    dispatch(toggleTheme());
  }

  return (
    <ViewScreen theme={themeStyles}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        style={theme === "light" ? "dark" : "light"}
      />
      <ViewContentWrapper>
        <TextTitle theme={themeStyles}>Settings</TextTitle>

        {/* User Info Container */}

        <TouchableOpacity>
          <ViewUserContainer theme={themeStyles}>
            <IconUser
              name="user-circle"
              size={60}
              color={themeStyles.colors.secondary}
            />
            <ViewUserContent>
              <TextUsername theme={themeStyles}>User name</TextUsername>
              <TextUserInfo theme={themeStyles}>
                ID, Data & Personal info
              </TextUserInfo>
            </ViewUserContent>

            <IconUserArrow
              name="keyboard-arrow-right"
              size={35}
              color={themeStyles.colors.secondary}
            />
          </ViewUserContainer>
        </TouchableOpacity>

        {/* Options Container */}
        <ViewOptionsContainer theme={themeStyles}>
          <ViewOption>
            <IconOption
              name="moon-o"
              size={30}
              color={themeStyles.colors.primary}
            />

            <ViewOptionProperty theme={themeStyles} showSeparetorLine={false}>
              <TextOption theme={themeStyles}>Dark Mode</TextOption>
              <CustomSwitch
                trackColor={{
                  true: themeStyles.colors.primary,
                }}
                onValueChange={() => handleSwitch()}
                value={theme === "light" ? false : true}
              />
            </ViewOptionProperty>
          </ViewOption>
        </ViewOptionsContainer>
      </ViewContentWrapper>
    </ViewScreen>
  );
}

export default Settings;
