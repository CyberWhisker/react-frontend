import { MoreVert } from '@mui/icons-material'
import { Avatar, Box, IconButton, Menu, MenuItem, Paper, styled, Typography } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import { fetchConversationById } from '../../../api/conversationApi';
import { useParams } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';
import { fetchMessageByConvoId, markMessageReadBy } from '../../../api/messageApi';
import { timeAgo } from '../../../../utils/timeAgo';
import MessageStoreForm from '../Forms/MessageStoreForm';
import ContactDeleteForm from '../Forms/ContactDeleteForm';
import socketApi from '../../../api/sockets/socketApi';
import { useNotification } from '../../../context/NotificationContext';

const MessagesBox = styled(Box)({
    flex: 1, padding: 16, overflowY: 'auto',
    display: 'flex', flexDirection: 'column', gap: 8
});

const MessageBubble = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'fromMe'
})(({ fromMe, theme }) => ({
    alignSelf: fromMe ? 'flex-end' : 'flex-start',
    backgroundColor: fromMe ? theme.palette.primary.main : theme.palette.action.hover,
    color: fromMe ? theme.palette.primary.contrastText : theme.palette.text.primary,
    padding: '8px 12px', borderRadius: 12, maxWidth: '60%'
}));

export default function Messages({ setTriggerContact }) {
    const { handleGetData: handleGetNotification } = useNotification()
    const { id } = useParams()
    const [contact, setContact] = useState(null);
    const { auth } = useContext(AuthContext)
    const [messages, setMessages] = useState([])
    const containerRef = useRef(null);

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
                    ...item,
                    senderName: item.sender === filterContact._id ? filterContact.name : 'Anonymous',
                    timestamp: timeAgo(item.createdAt),
                    fromMe: item.sender === auth._id,
                }));
                setMessages(formatData);
                markMessageReadBy(auth._id, convoData._id)
                handleGetNotification()
            }
        }
    };

    useEffect(() => {
        if (id && auth?._id) {
            handleGetData();
        } else {
            setContact(null)
        }

        socketApi.off('receive_message', handleReceiveMessage);
        socketApi.on('receive_message', handleReceiveMessage);

        return () => {
            socketApi.off('receive_message', handleReceiveMessage);
        };
    }, [id, auth?._id]);

    const handleReceiveMessage = (msg) => {
        setTriggerContact(prev => !prev)
        if (id === msg.conversationId) {
            setMessages((prev) => [...prev, { ...msg, fromMe: false }]);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);
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
                                <BasicMenu setTriggerContact={setTriggerContact} setContact={setContact} />
                            </Box>
                        </Paper>

                        {/* Messages Area */}
                        <MessagesBox ref={containerRef}>
                            {messages.map((msg, index) => (
                                <MessageBubble key={index} fromMe={msg.sender === auth._id}>
                                    {/* Render text if present */}
                                    {msg?.text && <div>{msg.text}</div>}
                                    {/* Render image if fileId exists */}
                                    {msg?.fileId && (
                                        <img
                                            src={`${import.meta.env.VITE_BACKEND_API}/file/${msg.fileId}`}
                                            alt={'attachment'}
                                            style={{ maxWidth: '100%', marginTop: '8px', borderRadius: '8px' }}
                                        />
                                    )}
                                </MessageBubble>
                            ))}
                        </MessagesBox>

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

function BasicMenu({ setTriggerContact, setContact }) {
    const [contactDeleteModal, setContactDeleteModal] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteModal = () => {
        handleClose()
        setContactDeleteModal(true)
    }

    return (
        <>
            <IconButton
                aria-label="more"
                id="basic-button"
                aria-controls={open ? 'menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVert />
            </IconButton>
            <Menu
                id="menu"
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleDeleteModal()}>
                    Delete Contact
                </MenuItem>
            </Menu>
            <ContactDeleteForm setContact={setContact} open={contactDeleteModal} onClose={() => setContactDeleteModal(false)} setTriggerContact={setTriggerContact} />
        </>
    );
}