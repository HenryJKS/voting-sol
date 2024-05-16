'use client'
import { useState, useEffect } from 'react'
import { web3 } from '../../components/ButtonWeb3'
import Layout from "../../components/Layout";
import voting from "@/ethereum/voting"
import { Table, TableRow, TableHeader, TableCell, TableBody, TableHeaderCell, Button, Divider } from 'semantic-ui-react';

const Case = ({address}) => {

    const votingContract = voting(address);
    const [nameCase, setNameCase] = useState('');
    const [countAccept, setCountAccept] = useState('');
    const [countReject, setCountReject] = useState('');
    const [approve, setApprove] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const loadContractDetails = async () => {
            const details = await votingContract.methods.c(0).call();
            setNameCase(details[0]);
            setCountAccept(details[1]);
            setCountReject(details[2]);
            setApprove(details[3]);
            setFinished(details[4]);
        };
        loadContractDetails();
    }, [address]);
    
    async function onApprove() {
        const accounts = await web3.eth.getAccounts();
        await votingContract.methods.votingAcceptCase(0).send({
            from: accounts[0]
        });
    }

    async function onDeny() {
        const accounts = await web3.eth.getAccounts();
        await votingContract.methods.votingDenyCase(0).send({
            from: accounts[0]
        });
    }

    async function onFinishCase() {
        const accounts = await web3.eth.getAccounts();
        await votingContract.methods.approveCase(0).send({
            from: accounts[0]
        });
    }
    
    return (
        <Layout>
            <Table celled padded>
                <TableHeader>
                    <TableRow textAlign='center'>
                        <TableHeaderCell>Case Name</TableHeaderCell>
                        <TableHeaderCell>Approve Count</TableHeaderCell>
                        <TableHeaderCell>Reject Count</TableHeaderCell>
                        <TableHeaderCell>Finished</TableHeaderCell>
                        <TableHeaderCell>Approve</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow textAlign='center'>
                        <TableCell>{nameCase}</TableCell>
                        <TableCell>{countAccept}</TableCell>
                        <TableCell>{countReject}</TableCell>
                        <TableCell>{finished ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{approve ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Divider horizontal>Voting</Divider>
            <Button color='green' onClick={onApprove}>Approve</Button>
            <Button color='red' onClick={onDeny}>Reject</Button>
            <Divider horizontal>Finish Case</Divider>
            <Button color='blue' onClick={onFinishCase} disabled={finished}>Finish Case</Button>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    return { props: { address: params.address } };
}

export default Case;