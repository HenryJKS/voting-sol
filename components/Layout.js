import React from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../components/Navbar";
import WalletButton from "../components/ButtonWeb3";

export default function RootLayout({ children }) {
    return (
        <Container fluid={false}>
            <Navbar />
            <WalletButton />
            {children}
        </Container>
    );
}
