'use client'
import { Container } from 'semantic-ui-react'
import Navbar from '../components/Navbar'
import 'semantic-ui-css/semantic.min.css'

const Layout = (props) => {
  return (
    <Container fluid={false}>
      <Navbar />
      {props.children}
    </Container>
  )
}

export default Layout;