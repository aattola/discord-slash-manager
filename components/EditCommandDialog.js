import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Typography from '@material-ui/core/Typography';

import CreateCommand from './CreateCommand';

export default function CustomizedDialogs({ state, close, token }) {
  return (
    <Dialog
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={state.editing}
    >
      <DialogTitle id="customized-dialog-title" onClose={close}>
        Edit command
      </DialogTitle>
      <div style={{ padding: '0px 20px', marginBottom: 20 }}>
        <CreateCommand token={token} command={{ ...state.command, close }} />
      </div>

      {/* <DialogActions>
        <Button autoFocus onClick={close}>
          Save changes
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}
