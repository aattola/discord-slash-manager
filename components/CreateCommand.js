import styled from 'styled-components';
import Image from 'next/image';
import { Checkbox, Dialog, Dropdown } from '@fluentui/react-northstar';

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
import useFetch from 'use-http';
import { useState } from 'react';
import remove from '../public/remove.png';
import CreateCommandDialog from './CreateCommandDialog';

const Container = styled.div`
  padding: 20px;
  border: 2px solid black;
  margin: 20px;
`;

const ChoiceContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function CreateCommand({ token, addCommandOption }) {
  // const [token, setToken] = useState(false);
  const [commandName, setCommandName] = useState('');
  const [commandDesc, setDesc] = useState('');
  const [guild, setGuild] = useState(false);
  const [guildId, setGuildId] = useState('');
  const [options, setOptions] = useState([]);
  const [choices, setChoices] = useState([]);
  const [optionSettings, setOptionSettings] = useState({
    name: '',
    type: 'STRING',
    description: '',
    required: false,
    choices: [],
    choicesToggle: false,
  });

  const optionTypes = [
    'SUB_COMMAND',
    'SUB_COMMAND_GROUP',
    'STRING',
    'INTEGER',
    'Number',
    'BOOLEAN',
    'USER',
    'CHANNEL',
    'ROLE',
    'MENTIONABLE',
  ];

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

  function newOption(option) {
    const _options = [...options];
    _options.push(option);
    setOptions(_options);
    setCommandName('');
    setDesc('');
    setGuild(false);
    setGuildId('');
    setChoices([]);
  }

  if (!token) console.log('Errorri: ei tokenia', token);

  return (
    <Container>
      <Typography style={{ padding: '8px 4px' }}>
        Command name must be lowercase. Max 32 letters
      </Typography>
      <TextField
        value={commandName}
        maxLength="32"
        size="small"
        onChange={(e) => setCommandName(e.target.value.toLowerCase())}
        helperText="Max 32 letters must be lowercase"
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
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
    </Container>
  );
}
