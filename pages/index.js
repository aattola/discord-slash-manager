import styled from 'styled-components';
import { Button, Input } from '@fluentui/react-northstar';
import useFetch from 'use-http';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import CreateCommand from '../components/CreateCommand';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

function Home() {
  const [token, setToken] = useState('');
  // const [create, setCreate] = useState({});
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

  function addCommandOption(option) {
    console.log('addCommandOption, ', option);
  }

  if (error) console.log('Errorri: ', error);

  console.log(data, loading, error);

  return (
    <>
      <CreateCommand token={token} addCommandOption={addCommandOption} />

      <Button loading={loading} onClick={() => post()} content="authenticate" />
      <Button
        loading={loading}
        onClick={() =>
          post({
            token,
            guild: true,
            guildId: '279272653834027008',
            action: 'GET',
          })
        }
        content="fetch"
      />
      <Button loading={loading} onClick={() => del()} content="delete" />
      <Input
        value={token}
        onChange={(e) => setToken(e.target.value)}
        label="bot token"
      />
      {!error && (
        <div>
          {data &&
            data.data &&
            data.data.commands.map((command) => {
              console.log(command);
              return (
                <div key={command.id}>
                  <h1>{command.name}</h1>
                  <h2>{command.description}</h2>
                  <Button
                    loading={loading}
                    onClick={() =>
                      del({
                        token,
                        guild: !!command.guild,
                        guildId: command.guildId,
                        commands: [command.id],
                      })
                    }
                    content="delete"
                  />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
