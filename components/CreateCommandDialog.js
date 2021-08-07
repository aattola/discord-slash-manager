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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);

    const { name, type, description, required, choicesToggle } = optionSettings;
    if (!name || !type || !description) {
      return console.log('unohit jotai');
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
      <Button variant="outlined" onClick={handleClickOpen}>
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
          <Typography gutterBottom style={{ padding: '16px 4px' }}>
            Huutista tämmöselle roskalle joka ei edes toimi ja on
            ikuisuusprojekti
          </Typography>

          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value="STRING"
                label="Type"
                onChange={(e) => {
                  setOptionSettings({
                    ...optionSettings,
                    type: e.target.value,
                  });
                }}
              >
                {optionTypes.map((type) => (
                  <MenuItem value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <ChoiceContainer>
              <TextField
                size="small"
                value={optionSettings.name}
                onChange={(e) =>
                  setOptionSettings({ ...optionSettings, name: e.target.value })
                }
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
                label="Description"
              />
            </ChoiceContainer>

            <FormGroup>
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
                    defaultChecked
                  />
                }
                label="Required"
              />
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
            </FormGroup>

            {/* <Switch
              onChange={(e, checked) =>
                setOptionSettings({
                  ...optionSettings,
                  choicesToggle: checked.checked,
                })
              }
              checked={optionSettings.choicesToggle}
              label="Choices"
              toggle
            /> */}

            {optionSettings.choicesToggle && (
              <div>
                {/* <Typography style={{ padding: '16px 4px' }}>Toggle</Typography> */}
                {/* <Input
              value={optionSettings.description}
              maxLength="100"
              onChange={(e) =>
                setOptionSettings({
                  ...optionSettings,
                  description: e.target.value,
                })
              }
              label="name"
            /> */}

                {choices.map((choice, i) => (
                  <ChoiceContainer key={i}>
                    <TextField
                      size="small"
                      value={choice.name}
                      maxLength="100"
                      onChange={(e) => {
                        const _choices = [...choices];
                        _choices[i].name = e.target.value;
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
                        _choices[i].value = e.target.value;
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
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
