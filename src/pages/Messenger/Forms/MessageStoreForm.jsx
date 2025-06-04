import { AttachFile, Send, UploadFile } from '@mui/icons-material'
import { Box, IconButton, Input, Paper, styled, TextField, Tooltip } from '@mui/material'
import { useContext, useState } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../../../context/AuthContext'
import { storeMessage } from '../../../api/messageApi'
import { toast } from 'react-toastify'
import { timeAgo } from '../../../../utils/timeAgo'
import socketApi from '../../../api/sockets/socketApi'

const InputContainer = styled(Box)(({ theme }) => ({
    padding: 16, borderTop: `1px solid ${theme.palette.divider}`,
    display: 'flex', alignItems: 'center'
}));

function MessageStoreForm({ setMessages, contact }) {
    const { id } = useParams()
    const { auth } = useContext(AuthContext)
    const [input, setInput] = useState('')

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {

            const newMessage = {
                conversationId: id,
                file: file,
                sender: auth._id,
                readBy: [auth._id],
            };

            const { data } = await storeMessage(newMessage)

            if (data) {
                const newData = {
                    id: data._id,
                    fileId: data.fileId,
                    sender: auth._id,
                    senderName: data.sender == contact._id ? contact.name : 'Anonymous',
                    timestamp: timeAgo(data.createdAt),
                };
                handleSendSocket(newData)
                setMessages(prev => [...prev, newData]);
                toast.success("Message Sent")
            }

            event.target.value = '';
        }
    };

    const handleTextSubmit = async () => {
        if (!input.trim()) return;

        const newMessage = {
            conversationId: id,
            text: input,
            sender: auth._id,
            readBy: [auth._id],
        };

        const { data } = await storeMessage(newMessage)

        if (data) {
            const newData = {
                id: data._id,
                text: data.text,
                sender: auth._id,
                senderName: data.sender == contact._id ? contact.name : 'Anonymous',
                timestamp: timeAgo(data.createdAt),
            };
            handleSendSocket(data)
            setMessages(prev => [...prev, newData]);
            toast.success("Message Sent")
        }
    }

    const handleSendSocket = async (data) => {

        const messageData = {
            id: data._id,
            conversationId: data.conversationId,
            receiverId: contact._id,
            sender: auth._id,
            senderName: auth.name,
            text: data.text || 'Sent an Image',
        };

        socketApi.emit('send_message', messageData);
    }

    return (
        <Paper>
            <InputContainer>
                <Tooltip title="Upload File">
                    <IconButton component="label">
                        <UploadFile />
                        <Input
                            type="file"
                            onChange={handleFileUpload}
                            sx={{ display: 'none' }}
                        />
                    </IconButton>
                </Tooltip>
                <TextField
                    fullWidth size="small"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
                />
                <IconButton color="primary" onClick={handleTextSubmit}>
                    <Send />
                </IconButton>
            </InputContainer>
        </Paper>
    )
}

export default MessageStoreForm