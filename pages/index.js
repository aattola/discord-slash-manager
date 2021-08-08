import styled from 'styled-components';
import useFetch from 'use-http';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button, Typography } from '@material-ui/core';
import CreateCommand from '../components/CreateCommand';
import EditCommandDialog from '../components/EditCommandDialog';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

const CreateContainer = styled.div`
  padding: 20px;
  border: 2px solid black;
  margin: 20px;
  border-radius: 8px;
`;

const CommandsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  grid-gap: 20px;
  margin-top: 10px;

  margin: 20px;
  padding: 20px;
  border: 2px solid black;
  border-radius: 8px;
`;

const CommandContainer = styled.div`
  border-radius: 8px;
  /* border: 1.5px solid rgba(189, 103, 84, 0.5); */
  padding: 10px;
  display: grid;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    /* border: 1.5px solid black; */
    /* filter: blur(24px); */
    box-shadow: 0 4px 8px 2px rgb(0 0 0 / 8%);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

function Home() {
  const [token, setToken] = useState('');
  const [editState, setEdit] = useState({
    editing: false,
    command: {},
  });
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

  function editCommand(command) {
    // TODO: command editing to work
    console.log(command);
    setEdit({ editing: true, command });
  }

  if (error) console.log('Errorri: ', error);

  console.log(data, loading, error);

  return (
    <>
      <CreateContainer>
        <CreateCommand token={token} addCommandOption={addCommandOption} />
      </CreateContainer>

      <Button loading={loading} onClick={() => post()}>
        Get guild commands ((Dev))
      </Button>
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
      >
        Fetch commands
      </Button>
      <Button loading={loading} onClick={() => del()}>
        Del command ((dev))
      </Button>
      <input
        value={token}
        onChange={(e) => setToken(e.target.value)}
        label="bot token"
      />
      <EditCommandDialog
        state={editState}
        token={token}
        close={() => {
          setEdit({ ...editState, editing: false });
        }}
      />
      {!error && (
        <CommandsContainer>
          {data &&
            data.data &&
            data.data.commands.map((command) => {
              console.log(command);
              return (
                <CommandContainer key={command.id}>
                  <Typography>{command.name}</Typography>
                  <Typography>{command.description}</Typography>

                  <ButtonContainer>
                    <Button
                      loading={loading}
                      size="small"
                      onClick={() =>
                        del({
                          token,
                          guild: !!command.guild,
                          guildId: command.guildId,
                          commands: [command.id],
                        })
                      }
                    >
                      Delete
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => editCommand(command)}
                    >
                      Edit
                    </Button>
                  </ButtonContainer>
                </CommandContainer>
              );
            })}
        </CommandsContainer>
      )}
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
