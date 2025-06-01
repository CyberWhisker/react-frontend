import {
    Box,
    Paper,
    Button,
} from '@mui/material';
import {
    Add,
} from '@mui/icons-material';
import Contacts from './components/Contacts';
import Messages from './components/Messages';
import { useState } from 'react';
import StoreContactForm from './Forms/ContactStoreForm';

const Messenger = () => {
    const [selectedContact, setSelectedContact] = useState(null)
    const [storeContactModal, setStoreContactModal] = useState(false)

    return (
        <Paper sx={{ display: 'flex', height: "100%" }}>
            <Box sx={{
                width: 350,
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid',
                borderColor: 'divider',
            }}>
                <Contacts />
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={() => setStoreContactModal(true)}
                    >
                        Add Contact
                    </Button>
                </Box>
            </Box>
            <Messages />
            <StoreContactForm open={storeContactModal} close={() => setStoreContactModal(false)} />
        </Paper>
    );
};

export default Messenger;