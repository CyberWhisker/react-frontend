import { AttachFile, Send } from '@mui/icons-material'
import { Box, IconButton, Paper, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../../../context/AuthContext'
import { storeMessage } from '../../../api/messageApi'
import { toast } from 'react-toastify'
import { timeAgo } from '../../../../utils/timeAgo'

function MessageStoreForm({ setMessages, contact }) {
    const { id } = useParams()
    const { auth } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        conversationId: id,
        text: '',
        sender: auth._id,
        readBy: [auth._id],
    })

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('File uploaded:', file.name, file.type, file.size);

            const message = {
                id: Date.now(),
                text: `📎 ${file.name}`,
                sender: 'You',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: true,
                isFile: true,
                fileType: file.type,
            };

            setMessages(prev => [...prev, message]);

            // Reset file input
            event.target.value = '';
        }
    };

    const handleSubmit = async () => {
        const { data } = await storeMessage(formData)
        if (data) {
            const newData = {
                id: data._id,
                text: data.text,
                sender: data.sender == contact._id ? contact.name : 'Anonymous',
                timestamp: timeAgo(data.createdAt),
                isOwn: data.sender === auth._id,
            };
            setMessages(prev => [...prev, newData]);
            setFormData(prev => ({ ...prev, text: '' }))
            toast.success("Message Sent")
        }
    }

    return (
        <Paper sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <form>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <input
                        accept="*/*"
                        style={{ display: 'none' }}
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                    />
                    <label htmlFor="file-upload">
                        <IconButton component="span" color="primary">
                            <AttachFile />
                        </IconButton>
                    </label>

                    <TextField
                        fullWidth
                        size="small"
                        name='text'
                        placeholder="Type a message..."
                        value={formData.text}
                        onChange={handleChange}
                        sx={{ bgcolor: 'background.paper' }}
                    />

                    <IconButton
                        color="primary"
                        onClick={handleSubmit}
                        disabled={!formData.text.trim()}
                    >
                        <Send />
                    </IconButton>
                </Box>
            </form>
        </Paper>
    )
}

export default MessageStoreForm