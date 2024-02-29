'use client';
import { useState } from 'react';
import factoryVoting from '../ethereum/factoryVoting';
import { Form, FormField, Button, Modal } from 'semantic-ui-react';
import { web3 } from '../components/ButtonWeb3';
import Layout from '../components/Layout';

export default function CreateCase() {
  const [nameCase, setNameCase] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [messageSuccess, setMessageSuccess] = useState('');

  async function createCase() {
    const accounts = await web3.eth.getAccounts();

    setLoading(true);
    setMessageError('');
    setMessageSuccess('');
    try {
      await factoryVoting.methods.createVoting(nameCase).send({
        from: accounts[0]
      });
      setLoading(false);
      setMessageSuccess('Case created successfully');
      setNameCase('');
    } catch (error) {
      setMessageError(error.message);
      setLoading(false);
      setNameCase('');
    }
  }

  return (
      <Layout>
        <Form onSubmit={createCase}>
          <FormField>
            <label>Case Name</label>
            <input
              value={nameCase}
              onChange={event => setNameCase(event.target.value)}
              type='text'
              required={true}
            />
          </FormField>
          <Button color='green' loading={loading}>Create Case</Button>
          <Modal
            open={!!messageError}
            header='Error'
            content={messageError}
            actions={[{ key: 'ok', content: 'OK', positive: false }]}
            onClose={() => setMessageError('')}
            size='small'
          />
          <Modal
            open={!!messageSuccess}
            header='Success'
            content={messageSuccess}
            actions={[{ key: 'ok', content: 'OK', positive: true }]}
            onClose={() => setMessageSuccess('')}
            size='small'
          />
        </Form>
      </Layout>
  );
}
