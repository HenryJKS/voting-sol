import { useState, useEffect } from "react";
import Link from "next/link";
import factoryVoting from "../ethereum/factoryVoting";
import Voting from "../ethereum/voting";
import { Card, Button, Container } from "semantic-ui-react";
import Layout from "../components/Layout";

const Home = ({ cases }) => {
    const [descriptionCases, setDescriptionCases] = useState([]);

    useEffect(() => {
        const loadContractDetails = async () => {
            const details = await Promise.all(cases.map(async address => {
                const voting = Voting(address);
                const details = await voting.methods.c(0).call();
                return {
                    address,
                    description: details[0],
                    finished: details[4],
                };
            }));
            setDescriptionCases(details);
        };
        loadContractDetails();
    }, [cases]);

    console.log(descriptionCases)
    const renderCases = () => {
        const items = descriptionCases.map(({ address, description, finished }) => {
            return {
                header: address,
                description: (
                    <Container>
                        <p>Case: {description}</p>
                        {finished ? "This Case is Finished !" : "This Case is Open, Vote Now !"}
                        <Container>
                            <Link legacyBehavior href={`/cases/${address}`}>
                                <a>View Case</a>
                            </Link>
                        </Container>
                    </Container>
                ),
                fluid: true
            };
        });

        return <Card.Group items={items}/>;
    }

    return (
        <Layout>
            <h3>Open Cases</h3>
            {renderCases()}
        </Layout>
    );
}

export async function getServerSideProps() {
    const cases = await factoryVoting.methods.getVotingDeployed().call();

    return { props: { cases } };
}

export default Home;
