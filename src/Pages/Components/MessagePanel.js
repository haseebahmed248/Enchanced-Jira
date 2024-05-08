import React, { useContext, useEffect } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Avatar } from '@mui/joy';
import Textarea from '@mui/joy/Textarea';
import { Button } from '@mui/material';
import Stack from '@mui/joy/Stack';
import { styled } from '@mui/joy/styles';
import { SocketContext } from '../Main/Home';
import { AccountContext } from './Security/AccountContext';
import { MessageContext } from '../../App';


const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography['body-sm'],
    textAlign: 'center',
    fontWeight: theme.fontWeight.md,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: theme.spacing(1),
    borderRadius: theme.radius.md,
  }));



  export default function CloseModal({ open, name, setOpen,recipientUserId,image }) {
    const [modalOpen, setModalOpen] = React.useState(open);
    const [message, setMessage] = React.useState("");
    const {messages,setMessages} = useContext(MessageContext)
    const {socket} = useContext(SocketContext);
  
    useEffect(()=>{
      // setMessages(prevStack => [...prevStack, messages])
    }, [messages])
    
    const pushMessage = () => {
      if (message.trim() !== "") {
        setMessages(prevStack => [...prevStack, message]);
        console.log("current socket: ",socket)
        console.log("recipientUserId: ",recipientUserId)
        console.log("current messages: ",message)
        socket.emit('private_dm',JSON.stringify({recipientUserId, message}),({errorMsg,done})=>{
          if(done){
              return;
          }
          alert(errorMsg);
      });
        setMessage(""); 
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
            setMessages([]);
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
              <Avatar alt={name} src={image} sx={{ width: 56, height: 56 }} />
              <Typography variant="h6" sx={{ marginLeft: 2, fontSize: 18 }}>{name}</Typography>
            </div>
            <div style={{ flex: '1', marginBottom: '1rem' }}>
              <Stack direction="column" spacing={1}>
                {(messages!= null)?messages.map((message, index) => (
                  <Item key={index}>{message}</Item>
                )):null} 
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
      