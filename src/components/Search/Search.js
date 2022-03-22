import React from "react";
import { THEMES } from "../../styles/themes";

// Redux
import { useSelector } from "react-redux";

// Icons
import Icon from "react-native-vector-icons/Ionicons";

/* Styled Components */
import styled from "styled-components/native";

const ViewContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 8px;
  padding: 6px;
`;

const IconSearch = styled(Icon)`
  width: 5%;
`;

const CustomTextInput = styled.TextInput`
  width: 95%;
  color: ${(props) => props.theme.colors.font};
  font-size: 16px;
  border-radius: 60px;
  padding-left: 8px;
`;

function Search(props) {
  const { setText } = props;
  console.log("🚀 ~ setText", setText);

  const theme = useSelector((state) => state.theme);
  const themeStyles = THEMES[theme];
  return (
    <ViewContainer theme={themeStyles}>
      <IconSearch
        name="ios-search"
        size={22}
        color={themeStyles.colors.primary}
      />
      <CustomTextInput
        theme={themeStyles}
        placeholder={"Search"}
        placeholderTextColor={themeStyles.colors.fontPlaceholder}
        keyboardAppearance={theme === "light" ? "light" : "dark"}
        onChangeText={(text) => setText(text)}
      />
    </ViewContainer>
  );
}

export default Search;
