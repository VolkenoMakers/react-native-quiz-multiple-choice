# react-native-quiz-single-choice

![Single select](https://raw.githubusercontent.com/VolkenoMakers/react-native-quiz-single-choice/main/demo.gif)

## Add it to your project

- Using NPM
  `npm install react-native-quiz-single-choice`
- or:
- Using Yarn
  `yarn add react-native-quiz-single-choice`

## Usage

```javascript
import React from "react";

import QuizeSingleChoice from "react-native-quiz-single-choice";

const QuizSingleChoiceApp = () => {
  const data = [
    {
      question:
        "Pendant la préhistoire, quelle période a suivi l’age de la pierre taillée ?",
      optionA: "l’âge de la pierre polie",
      optionB: "l’âge du fer",
      optionC: "l’âge du bronze",
      optionD: "l’âge de la pierre ponce",
      answer: "l’âge de la pierre polie",
    },
    {
      question: "Une personne qui parle couramment le français est :",
      optionA: "Francilienne",
      optionB: "Francophone",
      optionC: "Tchatcheuse",
      optionD: "Francophile",
      answer: "Francophone",
    },
    {
      question: "Quel petit signe place-t-on parfois sous la lettre C ?",
      optionA: "Une virgule",
      optionB: "Une cédille",
      optionC: "Une apostrophe",
      optionD: "Un petit cygne",
      answer: "Une cédille",
    },
  ];
  return (
    <QuizeSingleChoice
      containerStyle={{ backgroundColor: "#61dafb", paddingTop: 30 }}
      questionTitleStyle={{ fontSize: 22, color: "#FFF" }}
      responseStyle={{
        borderRadius: 15,
      }}
      responseTextStyle={{ fontSize: 12, fontWeight: "normal" }}
      selectedResponseStyle={{
        borderRadius: 15,
        backgroundColor: "#fa5541",
      }}
      selectedResponseTextStyle={{
        fontSize: 14,
        fontWeight: "normal",
      }}
      responseRequired={true}
      nextButtonText={"Next"}
      nextButtonStyle={{ backgroundColor: "#06d755" }}
      nextButtonTextStyle={{ color: "#FFF" }}
      prevButtonText={"Prev"}
      prevButtonStyle={{ backgroundColor: "#fa5541" }}
      prevButtonTextStyle={{ color: "#FFF" }}
      endButtonText={"Done"}
      endButtonStyle={{ backgroundColor: "#000" }}
      endButtonTextStyle={{ color: "#FFF" }}
      buttonsContainerStyle={{ marginTop: "auto" }}
      onEnd={(results) => {
        console.log(results);
      }}
      data={data}
    />
  );
};

export default QuizSingleChoiceApp;
```

## Properties

| Property name| Type| Description| ------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------- |
| **containerStyle**| _Object_ | Custom style for the screen container|
| **questionTitleStyle**| _Object_ | custom style for the title of the question|
| **responseStyle**| _Object_ | custom style for the container of each response|
| **responseTextStyle**| _Object_ | custom style for the text of each response|
| **selectedResponseStyle**| _Object_ | custom style for the container of the selected response|
| **selectedResponseTextStyle**| _Object_ | custom style for the text of selected response|
| **responseRequired**| _Boolean_ | make the answer mandatory if true. default to false|
| **nextButtonText**| _String_ | the text of the next button|
| **nextButtonStyle**| _Object_ | Custom for the next button|
| **nextButtonTextStyle**| _Object_ | Custom for the title of the next button|
| **prevButtonText**| _String_ | the text of the prev button|
| **prevButtonStyle**| _Object_ | Custom for the prev button|
| **prevButtonTextStyle**| _Object_ | Custom for the title of the prev button|
| **endButtonText**| _String_ | the text of the end button|
| **endButtonStyle**| _Object_ | Custom for the end button|
| **endButtonTextStyle**| _Object_ | Custom for the title of the end button|
| **buttonsContainerStyle**| _Object_ | Custom for the container of the next and prev buttons|
| **onEnd**| _Function_ | Function to handle the end of the quiz|

**ISC Licensed**
