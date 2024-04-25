import React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Avatar } from '@mui/joy';
import Textarea from '@mui/joy/Textarea';
import { Button } from '@mui/material';
import Stack from '@mui/joy/Stack';
import { styled } from '@mui/joy/styles';


const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography['body-sm'],
    textAlign: 'center',
    fontWeight: theme.fontWeight.md,
    color: theme.vars.palette.text.secondary,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: theme.spacing(1),
    borderRadius: theme.radius.md,
  }));

  export default function CloseModal({ open, name, setOpen }) {
    const [modalOpen, setModalOpen] = React.useState(open);
    const [message, setMessage] = React.useState("");
    const [messageStack, setMessageStack] = React.useState([]);
  
    const pushMessage = () => {
      if (message.trim() !== "") {
        setMessageStack(prevStack => [...prevStack, message]);
        setMessage(""); // Clear the message input field after sending
      }
    }
  
    React.useEffect(() => {
      setModalOpen(open);
    }, [open]);
  
    return (
      <React.Fragment>
        <Modal
          aria-labelledby="close-modal-title"
          open={modalOpen}
          onClose={(_event) => {
            setModalOpen(false);
            setOpen(false);
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              minWidth: 1300,
              borderRadius: 'md',
              p: 3,
              minHeight: 700,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ModalClose variant="outlined" />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar alt={name} src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56 }} />
              <Typography variant="h6" sx={{ marginLeft: 2, fontSize: 18 }}>{name}</Typography>
            </div>
            <div style={{ flex: '1', marginBottom: '1rem' }}>
              <Stack direction="column" spacing={1}>
                {messageStack.map((message, index) => (
                  <Item key={index}>{message}</Item>
                ))}
              </Stack>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Textarea minRows={1} style={{ flex: '1' }} placeholder='Message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)} />
              <Button variant="contained"
                sx={{ marginLeft: '1rem' }}
                onClick={pushMessage}
              >Send</Button>
            </div>
          </Sheet>
        </Modal>
      </React.Fragment>
    );
  }
      