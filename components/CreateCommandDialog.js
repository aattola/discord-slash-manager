import React, { useState } from 'react';
import s from 'styled-components';
// import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Image from 'next/image';
import {
  TextField,
  Button,
  FormGroup,
  FormControl,
  FormControlLabel,
  Select,
  InputLabel,
  MenuItem,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Divider,
} from '@material-ui/core';
import remove from '../public/remove.png';

const ChoiceContainer = s.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0px;
`;

export default function CreateCommandDialog({ newOption }) {
  const [open, setOpen] = React.useState(false);
  // const [commandName, setCommandName] = useState('');
  // const [commandDesc, setDesc] = useState('');
  // const [guild, setGuild] = useState(false);
  // const [guildId, setGuildId] = useState('');
  // const [options, setOptions] = useState([]);
  const [choices, setChoices] = useState([]);
  const [commandOptions, setCOptions] = useState([]);
  const [optionSettings, setOptionSettings] = useState({
    name: '',
    type: 'STRING',
    description: '',
    required: false,
    choices: [],
    choicesToggle: false,
    options: [],
    commandOptionsToggle: false,
  });

  const optionTypes = [
    'STRING',
    'INTEGER',
    'NUMBER',
    'BOOLEAN',
    'USER',
    'CHANNEL',
    'ROLE',
    'MENTIONABLE',
    // 'SUB_COMMAND', // TODO: GET WORKING
    // 'SUB_COMMAND_GROUP',
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (save = false) => {
    const { name, type, description, required, choicesToggle } = optionSettings;
    if (!name || !type || !description) {
      if (save !== true) {
        return setOpen(false);
      }
      // TODO: show error
      return console.log('unohit jotai');
    }

    if (save) {
      setOpen(false);
    }
    const newOptioni = {
      name,
      type,
      description,
      required,
      choices,
      choicesToggle,
    };
    newOption(newOptioni);
    setOptionSettings({
      name: '',
      type: 'STRING',
      description: '',
      required: false,
      choices: [],
      choicesToggle: false,
    });
    setChoices([]);
  };

  function newChoice() {
    const valinnat = [...choices];
    if (valinnat.length === 24 || valinnat.length > 24) {
      // 25 is max choices
      console.log('25 is max');
      return;
    }
    valinnat.push({ name: '', value: '' });
    setChoices(valinnat);
  }

  return (
    <div>
      <Button
        variant="outlined"
        style={{ marginTop: 10 }}
        onClick={handleClickOpen}
      >
        Create parameter
      </Button>
      <Dialog
        onClose={handleClose}
        sx={{
          borderRadius: '8px',
          '& .MuiDialog-paper': {
            borderRadius: '8px',
          },
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add parameter
        </DialogTitle>
        <DialogContent dividers>
          <Typography style={{ padding: '8px 4px' }}>
            Names must be lowercase. Max 25 letters
          </Typography>

          <div>
            <ChoiceContainer>
              <TextField
                size="small"
                value={optionSettings.name}
                onChange={(e) =>
                  setOptionSettings({
                    ...optionSettings,
                    name: e.target.value.toLowerCase(),
                  })
                }
                fullWidth
                label="Name"
              />
              <TextField
                size="small"
                value={optionSettings.description}
                onChange={(e) =>
                  setOptionSettings({
                    ...optionSettings,
                    description: e.target.value,
                  })
                }
                fullWidth
                label="Description"
              />
            </ChoiceContainer>

            <FormControl fullWidth style={{ marginBottom: 10 }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={optionSettings.type}
                label="Type"
                onChange={(e) => {
                  setOptionSettings({
                    ...optionSettings,
                    type: e.target.value,
                  });
                }}
              >
                {optionTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormGroup>
              <ChoiceContainer
                style={{ margin: 0, display: 'flex', justifyContent: 'center' }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={optionSettings.choicesToggle}
                      onChange={(e) =>
                        setOptionSettings({
                          ...optionSettings,
                          choicesToggle: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Choices"
                />
                {/* <FormControlLabel
                  control={
                    <Switch
                      checked={optionSettings.commandOptionsToggle}
                      onChange={(e) =>
                        setOptionSettings({
                          ...optionSettings,
                          commandOptionsToggle: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Options"
                /> */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={optionSettings.required}
                      onChange={(e) =>
                        setOptionSettings({
                          ...optionSettings,
                          required: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Required option"
                />
              </ChoiceContainer>
            </FormGroup>

            {optionSettings.choicesToggle && (
              <div style={{ marginTop: 10 }}>
                {choices.map((choice, i) => (
                  <ChoiceContainer key={i}>
                    <TextField
                      size="small"
                      value={choice.name}
                      maxLength="100"
                      onChange={(e) => {
                        const _choices = [...choices];
                        _choices[i].name = e.target.value.toLowerCase();
                        setChoices(_choices);
                      }}
                      label="Name"
                    />
                    <TextField
                      size="small"
                      value={choice.value}
                      maxLength="100"
                      onChange={(e) => {
                        const _choices = [...choices];
                        _choices[i].value = e.target.value.toLowerCase();
                        setChoices(_choices);
                      }}
                      label="Value"
                    />

                    <IconButton
                      onClick={() => {
                        const _choices = [...choices];
                        delete _choices[i];
                        const choicesFiltered = _choices.filter(
                          (a, _i) => _i !== i
                        );
                        console.log(choicesFiltered, _choices);
                        setChoices(choicesFiltered);
                      }}
                      circular
                    >
                      <Image src={remove} alt="remove" />
                    </IconButton>
                  </ChoiceContainer>
                ))}
                <Button
                  variant="contained"
                  onClick={newChoice}
                  alt="New Choice"
                >
                  New Choice
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleClose(true)}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
