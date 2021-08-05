import { FC } from 'react'
import Navbar from './Navbar'
import Wrapper, { WrapperVariant } from './Wrapper'

interface LayoutProps {
  variant?: WrapperVariant
}

const Layout: FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  )
}

export default Layout
