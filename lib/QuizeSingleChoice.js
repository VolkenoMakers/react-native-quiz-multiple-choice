import React from "react";
import { View, Text, Dimensions, Animated } from "react-native";
import { AppButton, OppButton } from "./Buttons";
const { width } = Dimensions.get("window");

const QuizSingleChoice = ({
  containerStyle,
  questionTitleStyle,
  responseStyle,
  responseTextStyle,
  selectedResponseStyle,
  selectedResponseTextStyle,
  nextButtonText,
  nextButtonStyle,
  nextButtonTextStyle,
  endButtonText,
  endButtonStyle,
  endButtonTextStyle,
  prevButtonText,
  prevButtonStyle,
  prevButtonTextStyle,
  buttonsContainerStyle,
  responseRequired,
  onEnd,
  data,
}) => {
  const originalData = data;
  const [questions, setQuestions] = React.useState([
    ...originalData.sort((_) => Math.random() - 0.5),
  ]);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const animation = React.useRef(new Animated.Value(0)).current;

  const onAnswer = React.useCallback((_, response) => {
    const newQuestions = [...questions];
    const activeQuestion = { ...newQuestions[currentIndex] };
    activeQuestion.response = response;
    newQuestions[currentIndex] = activeQuestion;
    setQuestions(newQuestions);
  });
  const onNext = React.useCallback(() => {
    if (currentIndex === questions.length - 1) {
      handleEnd(questions);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, questions]);
  const onPrev = React.useCallback(() => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  }, [currentIndex]);
  const handleEnd = React.useCallback(
    (questions) => {
      let newData = [];
      for (let q of questions) {
        newData.push({
          question: q.question,
          response: q.response,
          isRight: q.answer === q.response,
          answer: q.answer,
        });
      }
      onEnd(newData);
    },
    [questions]
  );
  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: currentIndex,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);
  const translateX = animation.interpolate({
    inputRange: questions.map((_, index) => index),
    outputRange: questions.map((_, index) => -index * width),
  });
  const isLast = currentIndex === questions.length - 1;
  const isFirst = currentIndex === 0;
  let nextDisabled = responseRequired
    ? !!!questions[currentIndex]?.response
    : false;
  return (
    <View
      style={[
        { flex: 1, backgroundColor: "#FFF", paddingHorizontal: 15 },
        containerStyle,
      ]}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          width: questions.length * width,
          transform: [{ translateX }],
        }}
      >
        {questions.map((item, index) => (
          <View key={index} style={{ alignSelf: "center", width: width }}>
            <Question
              responseStyle={responseStyle}
              questionTitleStyle={questionTitleStyle}
              selectedResponseStyle={selectedResponseStyle}
              selectedResponseTextStyle={selectedResponseTextStyle}
              responseTextStyle={responseTextStyle}
              key={index}
              onAnswer={onAnswer}
              {...{ item }}
            />
          </View>
        ))}
      </Animated.View>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 15,
            alignSelf: "center",
            width: width - 50,
            justifyContent: "space-between",
          },
          buttonsContainerStyle,
        ]}
      >
        <OppButton
          onPress={() => {
            onPrev();
          }}
          disabled={isFirst}
          containerStyle={[
            { width: "40%", backgroundColor: "#F00" },
            prevButtonStyle,
          ]}
          title={prevButtonText}
          titleStyle={[{ color: "#FFF" }, prevButtonTextStyle]}
        />
        <OppButton
          onPress={() => {
            onNext();
          }}
          disabled={nextDisabled}
          containerStyle={[
            { width: "40%", backgroundColor: "#000" },
            isLast ? endButtonStyle : nextButtonStyle,
          ]}
          title={isLast ? endButtonText : nextButtonText}
          titleStyle={[
            { color: "#FFF" },
            isLast ? endButtonTextStyle : nextButtonTextStyle,
          ]}
        />
      </View>
    </View>
  );
};

export default QuizSingleChoice;
function getResposesKeys(item) {
  return Object.keys(item).filter(
    (key) => !["question", "answer", "response"].includes(key)
  );
}
function Question({
  item,
  onAnswer,
  questionTitleStyle,
  responseStyle,
  responseTextStyle,
  selectedResponseStyle,
  selectedResponseTextStyle,
}) {
  const responses = getResposesKeys(item);
  return (
    <View style={{ marginTop: 30, width: width - 50, alignItems: "center" }}>
      <Text
        style={[
          { textAlign: "center", fontWeight: "700", fontSize: 18 },
          questionTitleStyle,
        ]}
      >
        {item.question}
      </Text>
      <View style={{ marginVertical: 15, width: "100%" }}>
        {responses.map((r, i) => {
          let text = item[r];
          const select = item.response === text;
          return (
            <QuestionItem
              key={i}
              text={text}
              responseTextStyle={
                select ? selectedResponseTextStyle : responseTextStyle
              }
              responseStyle={select ? selectedResponseStyle : responseStyle}
              key={i}
              onPress={() => {
                onAnswer(item, text);
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

function QuestionItem({
  text,
  onPress,
  disabled,
  responseStyle,
  responseTextStyle,
}) {
  return (
    <View style={{ marginVertical: 15 }}>
      <AppButton
        title={text}
        disabled={disabled}
        containerStyle={[{ backgroundColor: "#000" }, responseStyle]}
        width={"100%"}
        onPress={onPress}
        titleStyle={{ textTransform: "capitalize", ...responseTextStyle }}
        backgroundColor={"#000"}
        titleColor={"#FFF"}
      />
    </View>
  );
}
