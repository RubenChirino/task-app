import React from "react";
import { Text, TouchableOpacity } from "react-native";

// Icons
import Icon from "react-native-vector-icons/MaterialIcons";

// Basics
import { THEMES } from "../../styles/themes";

// Redux
import { useSelector } from "react-redux";

/* Styled Components */
import styled from "styled-components/native";

const ViewContainer = styled.View`
  background-color: ${(props) => props.theme.colors.card};
  padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const InfoView = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
`;

const TextItem = styled.Text`
  color: ${(props) => props.theme.colors.font};
  max-width: 80%;
`;

export default function Item(props) {
  const { text, done, onPressInCheckBox, onPressInRemoveIcon } = props;
  const theme = useSelector((state) => state.theme);
  const themeStyles = THEMES[theme];

  function handleOnPressInCheckBox() {
    onPressInCheckBox();
  }

  function handleOnPressInRemoveIcon() {
    onPressInRemoveIcon();
  }

  function renderItem() {
    return (
      <ViewContainer theme={themeStyles}>
        {/* Left Section */}
        <InfoView>
          <TouchableOpacity onPress={() => handleOnPressInCheckBox()}>
            <Icon
              style={{
                opacity: 0.4,
                marginRight: 15,
              }}
              name={done ? "check-box" : "check-box-outline-blank"}
              size={30}
              color={themeStyles.colors.primary}
            />
          </TouchableOpacity>
          <TextItem theme={themeStyles}>{text}</TextItem>
        </InfoView>
        {/* Right Section */}
        <Icon
          name="highlight-remove"
          size={25}
          color={themeStyles.colors.primary}
          onPress={() => handleOnPressInRemoveIcon()}
        />
      </ViewContainer>
    );
  }

  return renderItem();
}
