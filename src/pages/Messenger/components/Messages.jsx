import { AttachFile, Image, InsertDriveFile, MoreVert, Send } from '@mui/icons-material'
import { Avatar, Badge, Box, Card, CardContent, Dialog, DialogTitle, IconButton, Paper, TextField, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { fetchConversationById } from '../../../api/conversationApi';
import { useParams } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';
import { fetchMessageByConvoId, storeMessage } from '../../../api/messageApi';
import { toast } from 'react-toastify';
import { timeAgo } from '../../../../utils/timeAgo';
import MessageStoreForm from '../Forms/MessageStoreForm';

export default function Messages() {
    const { id } = useParams()
    const [contact, setContact] = useState(null);
    const { auth } = useContext(AuthContext)
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([])

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

    const handleGetData = async () => {
        const [
            { data: convoData },
            { data: messageData }
        ] = await Promise.all([
            fetchConversationById(id),
            fetchMessageByConvoId(id)
        ]);

        if (convoData) {
            const filterContact = convoData.participants.find(
                (item) => item._id !== auth._id
            );
            setContact(filterContact); // still update state

            if (messageData) {
                const formatData = messageData.map((item) => ({
                    id: item._id,
                    text: item.text,
                    sender: item.sender === filterContact._id ? filterContact.name : 'Anonymous',
                    timestamp: timeAgo(item.createdAt),
                    isOwn: item.sender === auth._id,
                }));
                setMessages(formatData);
            }
        }
    };

    useEffect(() => {
        if (id && auth?._id) {
            handleGetData();
        } else {
            setContact(null)
        }
    }, [id, auth?._id]);
    return (
        <>
            {/* Main Chat Area */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {contact ? (
                    <>
                        {/* Chat Header */}
                        <Paper sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src={contact.picture} alt={contact.name} sx={{ bgcolor: 'primary.main', mr: 2 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {contact.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {contact.online ? 'Online' : 'Offline'}
                                    </Typography>
                                </Box>
                                <IconButton onClick={(e) => handleMenuOpen(e, contact.id)}>
                                    <MoreVert />
                                </IconButton>
                            </Box>
                        </Paper>

                        {/* Messages Area */}
                        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                            {messages.map((message) => (
                                <Box
                                    key={message.id}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: message.isOwn ? 'flex-end' : 'flex-start',
                                        mb: 2,
                                    }}
                                >
                                    <Card
                                        sx={{
                                            maxWidth: '70%',
                                            bgcolor: message.isOwn ? 'primary.main' : 'background.paper',
                                            color: message.isOwn ? 'primary.contrastText' : 'text.primary',
                                        }}
                                    >
                                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                            <Typography variant="body2">
                                                {message.isFile && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                                        {message.fileType?.startsWith('image/') ? <Image sx={{ mr: 1 }} /> : <InsertDriveFile sx={{ mr: 1 }} />}
                                                    </Box>
                                                )}
                                                {message.text}
                                            </Typography>
                                            <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.8 }}>
                                                {message.timestamp}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))}
                        </Box>

                        {/* Message Input */}
                        <MessageStoreForm setMessages={setMessages} contact={contact} />
                    </>
                ) : (
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Typography variant="h6" color="text.secondary">
                            Select a conversation to start messaging
                        </Typography>
                    </Box>
                )}
            </Box>
        </>
    )
}