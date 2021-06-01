import React from "react";
import { ReactElement } from "react";
import { TextStyle } from "react-native";
import { ViewStyle } from "react-native";
import { View, Text, Dimensions, Animated } from "react-native";
import { AppButton, OppButton } from "./Buttons";
const { width } = Dimensions.get("window");

type QuizeMultipleChoiceProps = {
  containerStyle?: ViewStyle;
  questionTitleStyle?: TextStyle;
  responseStyle?: ViewStyle;
  responseTextStyle?: TextStyle;
  selectedResponseStyle?: ViewStyle;
  selectedResponseTextStyle?: TextStyle;
  nextButtonText?: string;
  nextButtonStyle?: ViewStyle;
  nextButtonTextStyle?: TextStyle;
  endButtonText?: string;
  endButtonStyle?: ViewStyle;
  endButtonTextStyle?: TextStyle;
  prevButtonText?: string;
  prevButtonStyle?: ViewStyle;
  prevButtonTextStyle?: TextStyle;
  buttonsContainerStyle?: ViewStyle;
  responseRequired?: boolean;
  onEnd: (results: any) => any;
  data: Array<any>;
  renderResponse?: (
    item: any,
    select: boolean,
    onSelect: Function
  ) => ReactElement;
};
const QuizeMultipleChoice = ({
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
  renderResponse,
  onEnd,
  data,
}: QuizeMultipleChoiceProps) => {
  const originalData = data;
  const [questions, setQuestions] = React.useState([
    ...originalData
      .sort((_) => Math.random() - 0.5)
      .map((r) => {
        return {
          ...r,
          selecteds: [],
        };
      }),
  ]);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const animation = React.useRef(new Animated.Value(0)).current;

  const onAnswer = React.useCallback(
    (_, response) => {
      const newQuestions = [...questions];
      const activeQuestion = { ...newQuestions[currentIndex] };
      if (activeQuestion.selecteds.includes(response)) {
        activeQuestion.selecteds = activeQuestion.selecteds.filter(
          (f) => f !== response
        );
      } else {
        activeQuestion.selecteds.push(response);
      }
      newQuestions[currentIndex] = activeQuestion;
      setQuestions(newQuestions);
    },
    [questions, currentIndex]
  );
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
          answers: q.answers,
          responses: q.selecteds,
          isRight: isRight(q),
        });
      }
      onEnd(newData);
    },
    [questions]
  );
  const isRight = React.useCallback((item) => {
    const { answers, selecteds } = item;
    let ok = true;
    for (let i of answers) {
      if (!selecteds.includes(i)) {
        ok = false;
        break;
      }
    }
    for (let i of selecteds) {
      if (!answers.includes(i)) {
        ok = false;
        break;
      }
    }
    return ok;
  }, []);
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
    ? questions[currentIndex]?.selecteds.length <= 0
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
              renderResponse={renderResponse}
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
          containerStyle={{
            width: "40%",
            backgroundColor: "#F00",
            ...prevButtonStyle,
          }}
          title={prevButtonText}
          titleStyle={[{ color: "#FFF" }, prevButtonTextStyle]}
        />
        <OppButton
          onPress={() => {
            onNext();
          }}
          disabled={nextDisabled}
          containerStyle={{
            width: "40%",
            backgroundColor: "#000",
            ...(isLast ? endButtonStyle : nextButtonStyle),
          }}
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

export default QuizeMultipleChoice;

type QuestionProps = {
  item: any;
  onAnswer: Function;
  questionTitleStyle: TextStyle;
  responseStyle: ViewStyle;
  responseTextStyle: TextStyle;
  selectedResponseStyle: ViewStyle;
  selectedResponseTextStyle: TextStyle;
  renderResponse: (
    item: any,
    select: boolean,
    onSelect: Function
  ) => ReactElement;
};
function Question({
  item,
  onAnswer,
  questionTitleStyle,
  responseStyle,
  responseTextStyle,
  selectedResponseStyle,
  selectedResponseTextStyle,
  renderResponse,
}: QuestionProps) {
  const responses = item.responses;
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
          const select = item.selecteds.includes(r);
          if (renderResponse) {
            const elem = renderResponse(r, select, () => onAnswer(item, r));
            return React.cloneElement(elem, { key: i });
          }
          return (
            <QuestionItem
              key={i}
              text={r}
              responseTextStyle={
                select ? selectedResponseTextStyle : responseTextStyle
              }
              responseStyle={select ? selectedResponseStyle : responseStyle}
              onPress={() => {
                onAnswer(item, r);
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

type QuestionItemProps = {
  text: string;
  onPress: (e: any) => any;
  disabled?: boolean;
  responseStyle: ViewStyle;
  responseTextStyle: TextStyle;
};

function QuestionItem({
  text,
  onPress,
  disabled,
  responseStyle,
  responseTextStyle,
}: QuestionItemProps) {
  return (
    <View style={{ marginVertical: 15 }}>
      <AppButton
        title={text}
        disabled={disabled}
        containerStyle={{ backgroundColor: "#000", ...responseStyle }}
        width={"100%"}
        onPress={onPress}
        titleStyle={{ textTransform: "capitalize", ...responseTextStyle }}
        backgroundColor={"#000"}
        titleColor={"#FFF"}
      />
    </View>
  );
}
