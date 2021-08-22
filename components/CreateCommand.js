import styled from 'styled-components';
import Image from 'next/image';

import {
  TextField,
  Button,
  FormGroup,
  FormControl,
  FormControlLabel,
  Select,
  InputLabel,
  Typography,
  Switch,
} from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import useFetch from 'use-http';
import { useState, useEffect } from 'react';
import remove from '../public/remove.png';
import CreateCommandDialog from './CreateCommandDialog';

const Container = styled.div`
  /* padding: 20px; */
  /* border: 2px solid black;
  margin: 20px; */
`;

const ChoiceContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function CreateCommand({ token, addCommandOption, command }) {
  // const [token, setToken] = useState(false);
  const [commandName, setCommandName] = useState('');
  const [editMode, setEdit] = useState(false);
  const [commandDesc, setDesc] = useState('');
  const [guild, setGuild] = useState(false);
  const [guildId, setGuildId] = useState('');
  const [options, setOptions] = useState([]);

  const { loading, error, post } = useFetch('/api/discord/commands', {
    body: {
      token,
    },
  });

  useEffect(() => {
    if (!command) return;
    setEdit(true);
    setCommandName(command.name);
    setDesc(command.description);
    if (command.guild) {
      setGuild(command.guild);
      setGuildId(command.guildId);
    }

    setOptions(command.options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function createCommand() {
    console.log('CREATING COMMAND');

    const payload = {
      // TODO: filter commandoptions so that options with required==true are first on the array dc requires this
      // TODO: if guild == false then dont send guildId or guild
      token,
      guild,
      action: 'CREATE',
      guildId,
      commands: [
        {
          name: commandName,
          description: commandDesc,
          options,
        },
      ],
    };

    post(payload);

    console.log(payload);

    if (command) {
      command.close();
    }
  }

  function newOption(option) {
    const _options = [...options];
    _options.push(option);
    setOptions(_options);
  }

  if (!token) console.log('Errorri: ei tokenia', token);

  return (
    <Container>
      <Typography style={{ padding: '8px 4px' }}>
        {editMode && (
          <>
            In edit mode changing name is not enabled at the moment <br />{' '}
          </>
        )}
        Command name must be lowercase. Max 32 letters
      </Typography>
      <TextField
        disabled={editMode}
        value={commandName}
        maxLength="32"
        size="small"
        onChange={(e) => setCommandName(e.target.value.toLowerCase())}
        label="Command name"
        style={{ margin: 5 }}
      />
      <TextField
        value={commandDesc}
        maxLength="100"
        size="small"
        onChange={(e) => setDesc(e.target.value)}
        label="Description"
        style={{ margin: 5 }}
      />
      <Typography style={{ padding: '8px 4px' }}>
        Guild command is for specific guild (server). Handy in development{' '}
        <br />
        because global commands take 1-2 hours to update and to be visible.
      </Typography>
      <div style={{ display: 'flex', gap: '10px' }}>
        <FormGroup style={{ margin: 5 }}>
          <FormControlLabel
            control={
              <Switch
                style={{ height: 'fit-content' }}
                checked={guild}
                onChange={(e) => setGuild(e.target.checked)}
              />
            }
            label="Guild command"
          />
        </FormGroup>

        {guild && (
          <TextField
            size="small"
            value={guildId}
            onChange={(e) => setGuildId(e.target.value)}
            label="Guild id"
            helperText="Or list seperated by comma (,)"
            style={{ margin: 5 }}
          />
        )}
      </div>
      <CreateCommandDialog newOption={newOption} />
      {/*
      <Dialog
        cancelButton="Cancel"
        confirmButton="Confirm"
        onConfirm={addCommandOption}
        content={

        }
        header="Option"
        trigger={<Button variant="contained">Add option</Button>}
      /> */}

      {options.map((param, i) => (
        <div key={i}>
          {/* <h1>{param.name}</h1> */}
          <Typography variant="h4">{param.name}</Typography>
          <Typography>{param.description}</Typography>
          <Typography>Required {param.required ? 'true' : 'false'}</Typography>
        </div>
      ))}

      <LoadingButton
        style={{ marginTop: 10 }}
        variant="contained"
        onClick={createCommand}
        loading={loading || undefined}
        loadingPosition="start"
      >
        {!editMode ? 'Create' : 'Edit'} command
      </LoadingButton>
    </Container>
  );
}
