'use client';
import WalletButton from "../components/ButtonWeb3";
import Navbar from "../components/Navbar";
import { Container } from "semantic-ui-react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Container fluid={false}>
        <Navbar/>
        <WalletButton/>
        {children}
        </Container>
        </body>
    </html>
  );
}
