import React from 'react';
import { type TouchableOpacityProps } from 'react-native'

import { type ButtonTypeStyleProps, Container, Title } from './styles'

type Props = TouchableOpacityProps & {
  title: string
  type?: ButtonTypeStyleProps
}

export function Button ({ title, type = 'PRIMARY', ...rest }: Props): React.JSX.Element {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
