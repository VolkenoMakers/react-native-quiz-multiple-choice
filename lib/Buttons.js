import React from "react";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
export const AppButton = ({ width, titleStyle, containerStyle, ...rest }) => {
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
}) => {
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
