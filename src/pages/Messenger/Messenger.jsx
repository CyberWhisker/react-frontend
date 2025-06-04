import {
    Box,
    Paper,
} from '@mui/material';
import Contacts from './components/Contacts';
import Messages from './components/Messages';
import { useState } from 'react';

const Messenger = () => {
    const [triggerContact, setTriggerContact] = useState(false)
    return (
        <Paper
            sx={{
                display: 'flex',
                height: '75vh'
            }}
        >
            <Box
                sx={{
                    width: 350,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Contacts triggerContact={triggerContact} />
            </Box>
            <Messages setTriggerContact={setTriggerContact} />
        </Paper>
    );
};

export default Messenger;