import React from "react";
import { ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native";
import { Button, ButtonProps } from "react-native-elements";

interface ButtonProps2 extends ButtonProps {
  width?: number | string;
  backgroundColor?: string;
  containerStyle: ViewStyle;
  titleColor?: string;
}
export const AppButton = ({
  width,
  titleStyle,
  containerStyle,
  ...rest
}: ButtonProps2) => {
  if (!rest.disabled) {
    rest.disabled = rest.loading;
  }
  return (
    <Button
      buttonStyle={{
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 50,
        backgroundColor: containerStyle?.backgroundColor,
      }}
      containerStyle={[
        {
          alignSelf: "center",
          width,
        },
        containerStyle,
      ]}
      TouchableComponent={TouchableOpacity}
      titleStyle={[
        {
          textTransform: "uppercase",
          fontSize: 18,
          fontWeight: "bold",
          backgroundColor: "transparent",
          letterSpacing: 1.5,
        },
        titleStyle,
      ]}
      {...rest}
    />
  );
};

export const OppButton = ({
  backgroundColor,
  titleStyle,
  containerStyle,
  ...rest
}: ButtonProps2) => {
  if (!rest.disabled) {
    rest.disabled = rest.loading;
  }
  return (
    <Button
      {...rest}
      buttonStyle={{
        backgroundColor,
        paddingVertical: 12,
        paddingHorizontal: 5,
      }}
      containerStyle={[
        {
          alignSelf: "center",
          backgroundColor,
          borderRadius: 10,
        },
        containerStyle,
      ]}
      TouchableComponent={TouchableOpacity}
      titleStyle={[
        {
          color: "#FFF",
          textTransform: "uppercase",
          fontSize: 12,
          fontWeight: "bold",
          marginLeft: 3,
          backgroundColor: "transparent",
          letterSpacing: 2,
        },
        titleStyle,
      ]}
    />
  );
};
