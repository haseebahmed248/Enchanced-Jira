import React, { useContext, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Button, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SocketContext } from '../Main/Home';
import { MessageContext } from '../../App';
import SendIcon from '@mui/icons-material/Send';



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(1),
  width:'10%',
  maxWidth: '30%',
  wordBreak:'break-word'
}));

const SenderItem = styled(Item)({
  textAlign: 'right', 
  wordBreak:'break-word',
  backgroundColor: 'lightblue',
  fontSize:15
});

const ReceiverItem = styled(Item)({
  textAlign: 'left', 
  wordBreak:'break-word',
  fontSize:15
});

export default function CloseModal({ open, name, setOpen, recipientUserId, image }) {
  const [modalOpen, setModalOpen] = React.useState(open);
  const [message, setMessage] = React.useState("");
  const { messages, setMessages } = useContext(MessageContext)
  const { socket } = useContext(SocketContext);
  const {userID} = useContext(MessageContext);

  const pushMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        text:message,
        isCurrentUser:true,
      }
      setMessages(prevStack => [...prevStack, newMessage]);
      console.log("current socket: ",socket)
      console.log("recipientUserId: ",recipientUserId)
      console.log("current messages: ",messages)
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
    <Modal
      open={modalOpen}
      onClose={() => {
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
      <Paper
        sx={{
          width: { xs: '90%', md: '50%' },
          p: 3,
          minHeight: 500,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
        }}
      >
      <Stack direction="row" alignItems="center" spacing={2} mb={4}>
  <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
  
  <Avatar alt={name} src={image} />
    <Typography variant="h5" sx={{ marginLeft: 1 }}>{name}</Typography>
  </Box>
  <IconButton
    edge="end"
    color="inherit"
    onClick={() => {
      setMessages([]);
      setModalOpen(false);
      setOpen(false);
    }}
  >
    <CloseIcon />
  </IconButton>
</Stack>
        <Stack direction="column" spacing={1} sx={{ overflow: 'auto', flexGrow: 1, p: 1 }}>
  {(messages!= null)?messages.map((message, index) => (
    message.isCurrentUser ? 
      <SenderItem key={index} style={{ marginLeft: '85%' }}>{message.text}</SenderItem> :
      <ReceiverItem key={index} style={{ marginLeft: '0' }}>{message}</ReceiverItem>
  )):<p>No message</p>} 
</Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
  <TextField
    style={{ flex: '1' }}
    placeholder='Message...'
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />
  <IconButton color="secondary" onClick={pushMessage}>
    <SendIcon />
  </IconButton>
</Stack>
      </Paper>
    </Modal>
  );
}