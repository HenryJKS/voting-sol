"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { web3 } from "../../components/ButtonWeb3";
import Layout from "../../components/Layout";
import voting from "@/ethereum/voting";
import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  TableHeaderCell,
  Button,
  Divider,
  Container
} from "semantic-ui-react";

const Case = ({ address }) => {
  const router = useRouter();
  const votingContract = voting(address);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingDeny, setLoadingDeny] = useState(false);
  const [loadingFinish, setLoadingFinish] = useState(false);
  const [nameCase, setNameCase] = useState("");
  const [descriptionCase, setDescriptionCase] = useState("");
  const [countAccept, setCountAccept] = useState("");
  const [countReject, setCountReject] = useState("");
  const [approve, setApprove] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const loadContractDetails = async () => {
      const details = await votingContract.methods.c().call();
      setNameCase(details[0]);
      setDescriptionCase(details[1]);
      setCountAccept(details[2]);
      setCountReject(details[3]);
      setApprove(details[4]);
      setFinished(details[5]);
    };
    loadContractDetails();
  }, [address]);

  async function onApprove() {
    const accounts = await web3.eth.getAccounts();
    setLoadingApprove(true);
    try {
      await votingContract.methods.votingAcceptCase().send({
        from: accounts[0],
      });
      setLoadingApprove(false);
      router.reload();
    } catch (error) {
      setLoadingApprove(false);
    }
  }

  async function onDeny() {
    const accounts = await web3.eth.getAccounts();
    setLoadingDeny(true);
    try {
      await votingContract.methods.votingDenyCase().send({
        from: accounts[0],
      });
      setLoadingDeny(false);
      router.reload();
    } catch (error) {
      setLoadingDeny(false);
    }
  }

  async function onFinishCase() {
    const accounts = await web3.eth.getAccounts();
    setLoadingFinish(true);
    try {
      await votingContract.methods.approveCase().send({
        from: accounts[0],
      });
      setLoadingFinish(false);
      router.push("/");
    } catch (error) {
      setLoadingFinish(false);
    }
  }

  return (
    <Layout>
      <Table celled padded>
        <TableHeader>
          <TableRow textAlign="center">
            <TableHeaderCell>Case Name</TableHeaderCell>
            <TableHeaderCell>Approve Count</TableHeaderCell>
            <TableHeaderCell>Reject Count</TableHeaderCell>
            <TableHeaderCell>Finished</TableHeaderCell>
            <TableHeaderCell>Approve</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow textAlign="center">
            <TableCell>{nameCase}</TableCell>
            <TableCell>{countAccept}</TableCell>
            <TableCell>{countReject}</TableCell>
            <TableCell>{finished ? "Yes" : "No"}</TableCell>
            <TableCell>{approve ? "Yes" : "No"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Divider horizontal>Description Case</Divider>
      <Container>
        <p>{descriptionCase}</p>
      </Container>
      <Divider horizontal>Voting</Divider>
      <Button
        color="green"
        onClick={onApprove}
        loading={loadingApprove}
        disabled={finished}
      >
        Approve
      </Button>
      <Button color="red" onClick={onDeny} loading={loadingDeny} disabled={finished}>
        Reject
      </Button>
      <Divider horizontal>Finish Case</Divider>
      <Button color="blue" onClick={onFinishCase} loading={loadingFinish} disabled={finished}>
        Finish Case
      </Button>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  return { props: { address: params.address } };
}

export default Case;
