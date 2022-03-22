import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Keyboard, ScrollView, Alert } from "react-native";

// Utils
import { random, isIOS } from "../utils/basics";

// Themes
import { THEMES } from "../styles/themes";

// Context
// import { Context } from "../context/index";

// Components
import Item from "../components/Item/Item";

// Icons
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Functions
import { getTasks, addTask, removeTask, updateTask } from "../functions/tasks";

// Redux
import { useSelector } from "react-redux";

/* Styled Components */
import styled from "styled-components/native";
import Search from "../components/Search/Search";

const CONSTANT_STYLES = {
  horizontalPaddingPage: "15px",
  KeyboardSectionMargin: "20px",
};

const ViewScreen = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const ViewContentWrapper = styled.View`
  padding-top: 40px;
  padding-left: ${CONSTANT_STYLES.horizontalPaddingPage};
  padding-right: ${CONSTANT_STYLES.horizontalPaddingPage};
`;

const ViewItemsWrapper = styled.View`
  margin-top: 30px;
`;

const TextTitle = styled.Text`
  color: ${(props) => props.theme.colors.font};
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const TextNoTasks = styled.Text`
  color: ${(props) => props.theme.colors.font};
`;

const CustomKeyboardAvoidingView = styled.KeyboardAvoidingView`
  position: absolute;
  bottom: 0;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-left: ${CONSTANT_STYLES.horizontalPaddingPage};
  padding-right: ${CONSTANT_STYLES.horizontalPaddingPage};
`;

const CustomTextInput = styled.TextInput`
  margin-bottom: ${CONSTANT_STYLES.KeyboardSectionMargin};
  padding-left: 20px;
  color: ${(props) => props.theme.colors.font};
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 60px;
  border-color: ${(props) => props.theme.colors.primary};
  border-width: 1px;
  height: 50px;
  width: 70%;
`;

const AddItemTouchableOpacity = styled.TouchableOpacity`
  margin-bottom: ${CONSTANT_STYLES.KeyboardSectionMargin};
  width: 15%;
`;

function Home() {
  // const { tasks, addTask, updateTask, deleteTask } = useContext(Context);

  // Redux
  const theme = useSelector((state) => state.theme);
  const themeStyles = THEMES[theme];

  // States
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [totalTask, setTotalTask] = useState(0);

  // Reload Interruptor
  const [reloadCheck, setReloadCheck] = useState(false);

  useEffect(() => {
    (async () => {
      let res = await getTasks();
      setTotalTask(res.length);
      if (searchText) {
        res = res.filter((task) => task.text.includes(searchText));
      }
      setTasks(res);
    })();
  }, [reloadCheck, searchText]);

  /* ====== ITEMS FUNCTIONS ====== */

  function onReloadCheck() {
    setReloadCheck((prev) => !prev);
  }

  async function handleOnPress() {
    try {
      if (taskText.length > 0) {
        Keyboard.dismiss();
        await addTask({
          id: random(1, 1000),
          createAt: new Date(),
          text: taskText,
          done: false,
        });
        setTaskText("");
        onReloadCheck();
      }
    } catch (err) {
      console.error(err);
    }
  }

  function renderSearch() {
    return <Search setText={setSearchText} />;
  }

  function renderItems() {
    return tasks.length > 0 ? (
      tasks.map(({ id, text, done }, index) => {
        async function handleChangeTaskState() {
          await updateTask(id, { done: !done });
          onReloadCheck();
        }

        function handleRemoveTask() {
          Alert.alert(
            "Delete task",
            "Are you sure you want to delete this task?",
            [
              {
                text: "Cancel",
                // onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "YES",
                onPress: async () => {
                  await removeTask(id);
                  onReloadCheck();
                },
              },
            ]
          );
        }

        return (
          <Item
            key={index}
            id={id}
            text={text}
            done={done}
            onPressInCheckBox={handleChangeTaskState}
            onPressInRemoveIcon={handleRemoveTask}
          />
        );
      })
    ) : (
      <TextNoTasks theme={themeStyles}>
        You have no added tasks, create a new one! ✏
      </TextNoTasks>
    );
  }

  return (
    <ViewScreen theme={themeStyles}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        style={theme === "light" ? "dark" : "light"}
      />
      <ScrollView
        style={{
          marginBottom: 60,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <ViewContentWrapper>
          <TextTitle theme={themeStyles}>Your Tasks</TextTitle>
          {totalTask > 0 && renderSearch()}
          {/* Items List */}
          <ViewItemsWrapper>{renderItems()}</ViewItemsWrapper>
        </ViewContentWrapper>
      </ScrollView>

      {/* Write a Item */}
      <CustomKeyboardAvoidingView behavior={isIOS ? "padding" : "height"}>
        <CustomTextInput
          theme={themeStyles}
          placeholder={"Write a task"}
          placeholderTextColor={themeStyles.colors.fontPlaceholder}
          keyboardAppearance={theme === "light" ? "light" : "dark"}
          value={taskText}
          onChangeText={(taskText) => setTaskText(taskText)}
        />

        <AddItemTouchableOpacity
          disabled={taskText.length === 0}
          onPress={() => handleOnPress()}
        >
          <Icon
            style={{ opacity: taskText.length > 0 ? 1 : 0.3 }}
            name="plus-circle"
            size={50}
            color={themeStyles.colors.primary}
          />
        </AddItemTouchableOpacity>
      </CustomKeyboardAvoidingView>
    </ViewScreen>
  );
}

export default Home;
