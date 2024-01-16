import { Link, Text } from '@chakra-ui/react'
import React, { FC } from 'react'

interface NavigationItemProps {
  children: React.ReactNode
  isLast?: boolean
  to?: string
}

export const NavigationItem:FC<NavigationItemProps> = ({ children, isLast, to = "/", ...rest }) => {
   return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  )
}
