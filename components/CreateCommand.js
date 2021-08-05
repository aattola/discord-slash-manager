import styled from 'styled-components';
import { Button, Input, Checkbox, Dialog } from '@fluentui/react-northstar';
import useFetch from 'use-http';
import { useState } from 'react';

const Container = styled.div`
  padding: 20px;
  border: 2px solid black;
  margin: 20px;
`;

export default function CreateCommand({ token }) {
  // const [token, setToken] = useState(false);
  const [commandName, setCommandName] = useState('');
  const [guild, setGuild] = useState(false);
  const [guildId, setGuildId] = useState('');
  const { loading, error, data, post, del } = useFetch(
    '/api/discord/commands',
    {
      body: {
        token,
        guild: true,
        // action: 'GET',
        guildId: '279272653834027008',
        commands: ['872954297820794930'],
        // commands: [
        //   {
        //     name: 'testff',
        //     description: 'Replies with your input!',
        //     options: [
        //       {
        //         name: 'input',
        //         type: 'STRING',
        //         description: 'The input to echo back',
        //         required: true,
        //       },
        //     ],
        //   },
        // ],
      },
    }
  );

  if (!token) console.log('Errorri: ei tokenia', token);

  return (
    <Container>
      <Input
        value={commandName}
        onChange={(e) => setCommandName(e.target.value)}
        label="command name"
      />

      <Checkbox
        onChange={(e, checked) => setGuild(checked.checked)}
        checked={guild}
        label="guild command"
        toggle
      />

      {guild && (
        <Input
          value={guildId}
          onChange={(e) => setGuildId(e.target.value)}
          label="guild id"
        />
      )}

      <Dialog
        cancelButton="Cancel"
        confirmButton="Confirm"
        content={<h1>moro</h1>}
        header="Add command"
        trigger={<Button content="Open a dialog" />}
      />
    </Container>
  );
}
