import { Add, Search } from '@mui/icons-material';
import { Avatar, Badge, Box, Chip, Divider, IconButton, InputAdornment, List, ListItemAvatar, ListItemButton, ListItemText, Stack, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { fetchConversationByUserId } from '../../../api/conversationApi';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router';
import StoreContactForm from '../Forms/ContactStoreForm';
import { useNotification } from '../../../context/NotificationContext';

export default function Contacts({ triggerContact }) {
    const { messages } = useNotification()
    const { id } = useParams();
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [storeContactModal, setStoreContactModal] = useState(false)
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate();
    // Filter contacts based on search
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle functions
    const handleContactSelect = (contactId) => {
        setContacts(prev => prev.map(contact =>
            contact.id === contactId ? { ...contact, unread: false } : contact
        ));
        navigate(`/messenger/${contactId}`)
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    };

    const handleGetData = async () => {
        const { data } = await fetchConversationByUserId(auth._id);
        if (data) {
            const filterData = data.map((item) => {
                const otherParticipant = item.participants.find(
                    (participant) => participant._id !== auth._id
                );
                return {
                    ...item,
                    participant: otherParticipant,
                };
            });
            const formatData = filterData.map((item) => {
                const lastMessage = messages.find((messageData) => messageData.id == item._id)
                return ({
                    name: item.participant.name,
                    email: item.participant.email,
                    id: item._id,
                    image: item.participant.picture,
                    lastMessage: lastMessage?.message || 'No new message',
                    unread: lastMessage ? true : false,
                    timestamp: lastMessage?.timestamp
                })
            }
            )
            setContacts(formatData)
        }
    }

    useEffect(() => {
        handleGetData();
    }, [triggerContact, messages])
    return (
        <Box sx={{ height: '100%' }}>
            {/* Header */}
            <Box sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" mb={1}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Contacts
                    </Typography>
                    <IconButton color='primary' onClick={() => setStoreContactModal(true)}>
                        <Add />
                    </IconButton>
                </Stack>
                {/* Search */}
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search color="action" />
                                </InputAdornment>
                            ),
                        }
                    }}
                    sx={{ bgcolor: 'background.paper' }}
                />
            </Box>
            <Divider />
            {/* Contact List */}
            <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
                {filteredContacts.map((contact) => (
                    <ListItemButton
                        key={contact.id}
                        selected={id === contact.id}
                        onClick={() => handleContactSelect(contact.id)}
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            '&.Mui-selected': {
                                bgcolor: 'primary.50',
                            },
                        }}
                    >
                        <ListItemAvatar>
                            <Badge
                                color="success"
                                variant="dot"
                                invisible={!contact.online}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            >
                                <Avatar src={contact.image} alt={contact.name} sx={{ bgcolor: 'primary.main' }} />
                            </Badge>
                        </ListItemAvatar>

                        <ListItemText
                            primary={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                        {contact.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {contact.timestamp}
                                    </Typography>
                                </Box>
                            }
                            secondary={
                                <Typography component={'div'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                                    <Typography variant="body2" color="text.secondary" noWrap sx={{ flex: 1 }}>
                                        {contact.lastMessage}
                                    </Typography>
                                    {contact.unread && (
                                        <Chip
                                            // label={contact.unread}
                                            size="small"
                                            color="primary"
                                            sx={{ ml: 1, height: 20, fontSize: '0.75rem' }}
                                        />
                                    )}
                                </Typography>
                            }
                        />
                    </ListItemButton>
                ))}
            </List>
            <StoreContactForm open={storeContactModal} close={() => setStoreContactModal(false)} handleGetContact={handleGetData} />
        </Box>
    )
}


