"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import factoryVoting from "../ethereum/factoryVoting";
import { Button, Form, FormField, Modal } from "semantic-ui-react";
import { web3 } from "../components/ButtonWeb3";
import Layout from "../components/Layout";

export default function CreateCase() {
  const router = useRouter();
  const [nameCase, setNameCase] = useState("");
  const [descriptionCase, setDescriptionCase] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  async function createCase() {
    const accounts = await web3.eth.getAccounts();

    setLoading(true);
    setMessageError("");
    setMessageSuccess("");
    try {
      await factoryVoting.methods.createVoting(nameCase, descriptionCase).send({
        from: accounts[0],
      });
      setLoading(false);
      router.push("/");
      setMessageSuccess("Case created successfully");
      setNameCase("");
      setDescriptionCase("");
    } catch (error) {
      setMessageError(error.message);
      setLoading(false);
      setNameCase("");
      setDescriptionCase("");
    }
  }

  return (
    <Layout>
      <Form onSubmit={createCase}>
        <FormField>
          <label>Case Name</label>
          <input
            value={nameCase}
            onChange={(event) => setNameCase(event.target.value)}
            type="text"
            required={true}
          />
        </FormField>

        <FormField>
          <label>Case Description</label>
          <textarea
            value={descriptionCase}
            onChange={(event) => setDescriptionCase(event.target.value)}
            required={true}
          />
        </FormField>

        <Button color="green" loading={loading}>
          Create Case
        </Button>

        <Modal
          open={!!messageError}
          header="Error"
          content={messageError}
          actions={[{ key: "ok", content: "OK", positive: false }]}
          onClose={() => setMessageError("")}
          size="small"
        />
        <Modal
          open={!!messageSuccess}
          header="Success"
          content={messageSuccess}
          actions={[{ key: "ok", content: "OK", positive: true }]}
          onClose={() => setMessageSuccess("")}
          size="small"
        />
      </Form>
    </Layout>
  );
}
