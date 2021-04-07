import React from 'react';
import { StyleProp, ViewStyle, ColorValue } from 'react-native';
import { ImageProps } from '../image/Image';
import { IconProps } from '../icons/Icon';
export declare type AccessoryProps = Partial<IconProps> & Partial<ImageProps> & {
    underlayColor?: ColorValue;
    style?: StyleProp<ViewStyle>;
};
declare const _default: React.FunctionComponent<Omit<Partial<IconProps> & Partial<ImageProps> & {
    underlayColor?: ColorValue;
    style?: StyleProp<ViewStyle>;
}, keyof import("../config/ThemeProvider").ThemeProps<T>>> | React.ForwardRefExoticComponent<Partial<IconProps> & Partial<ImageProps> & {
    underlayColor?: ColorValue;
    style?: StyleProp<ViewStyle>;
}>;
export default _default;
