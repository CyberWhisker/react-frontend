import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    IconButton,
    Divider,
    ListItem,
    Typography,
    ListItemText,
    TextField,
} from '@mui/material';
import {
    Add,
} from '@mui/icons-material';
import { fetchUserData } from '../../../api/userApi';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { storeConversation } from '../../../api/conversationApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function StoreContactForm({ open, close, handleGetContact }) {
    const [userData, setUserData] = useState([])
    const [oldData, setOldData] = useState([])
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleGetData = async () => {
        const { data } = await fetchUserData()
        if (data) {
            const filteredData = data.filter((item) => item._id !== auth._id)
            setOldData(filteredData)
            setUserData(filteredData)
        }
    }

    const handleAddContact = async (id) => {
        const formData = {
            participants: [auth._id, id]
        }
        const { data } = await storeConversation(formData)
        if (data) {
            handleGetContact()
            toast.success("Contact Added")
            navigate(`/messenger/${data._id}`)
            close()
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        if (!value) {
            setUserData(oldData);
            return;
        }
        const filtered = oldData.filter(user =>
            user.name?.toLowerCase().includes(value) ||
            user.email?.toLowerCase().includes(value)
        );
        setUserData(filtered);

    }

    useEffect(() => {
        handleGetData();
    }, [])
    return (
        <Dialog open={open} onClose={close} maxWidth='xs' fullWidth>
            <DialogTitle>Add Contacts</DialogTitle>
            <Divider />
            <DialogContent>
                <TextField size='small' label='Search User' fullWidth onChange={handleSearch} />
                <List>
                    {userData.map((item, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton aria-label="Add Contact" onClick={() => handleAddContact(item._id)}>
                                    <Add />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton onClick={() => handleAddContact(item._id)}>
                                <ListItemAvatar>
                                    <Avatar src={item.picture} alt='' />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography>{item.name}</Typography>
                                    }
                                    secondary={
                                        <Typography variant='caption'>{item.email}</Typography>
                                    } />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    )
}

export default StoreContactForm