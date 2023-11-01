import React from 'react'
import { type TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";

interface Props extends TextInputProps {
  inputRef?: React.RefObject<TextInputProps>
}

export function Input({ inputRef, ...rest }: Props): React.JSX.Element {
  const { COLORS } = useTheme();

  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest} 
    />
  )
}