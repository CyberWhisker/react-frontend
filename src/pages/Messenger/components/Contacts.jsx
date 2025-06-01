import { Delete, Search } from '@mui/icons-material';
import { Avatar, Badge, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, List, ListItemAvatar, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { fetchConversationByUserId } from '../../../api/conversationApi';
import { AuthContext } from '../../../context/AuthContext';
import { timeAgo } from '../../../../utils/timeAgo';
import { useNavigate, useParams } from 'react-router';

export default function Contacts() {
    const { id } = useParams();
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate();
    // Filter contacts based on search
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle functions
    const handleContactSelect = (contactId) => {
        setContacts(prev => prev.map(contact =>
            contact.id === contactId ? { ...contact, unread: 0 } : contact
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
            const formatData = filterData.map((item) => ({
                name: item.participant.name,
                email: item.participant.email,
                id: item._id,
                image: item.participant.picture,
                lastMessage: "Test",
                unread: 2,
                timestamp: timeAgo(item.createdAt)
            }))
            setContacts(formatData)
        }
    }

    useEffect(() => {
        handleGetData();
    }, [])
    return (
        <Box sx={{ height: '100%' }}>
            {/* Header */}
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Contacts
                </Typography>

                {/* Search */}
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search color="action" />
                            </InputAdornment>
                        ),
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
                                    {contact.unread > 0 && (
                                        <Chip
                                            label={contact.unread}
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
        </Box>
    )
}


