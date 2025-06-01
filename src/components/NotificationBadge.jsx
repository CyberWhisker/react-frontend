import { useState } from 'react';
import {
    Badge,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    ListItemText,
    ListItemIcon,
    Box
} from '@mui/material';
import {
    Notifications,
    NotificationsNone,
    Circle,
} from '@mui/icons-material';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router';

export default function NotificationBadge({
    max = 99,
    color = 'error',
    variant = 'standard',
    showZero = false,
    icon: CustomIcon,
    size = 'medium',
    emptyMessage = "No new notifications",
    maxHeight = 400,
    ...props
}) {
    const { total, messages } = useNotification()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const IconComponent = CustomIcon || Notifications;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationClick = (notification) => {
        navigate(`/messenger/${notification.sender}`)
        handleClose();
    };

    return (
        <>
            <Badge
                badgeContent={total}
                max={max}
                color={color}
                variant={variant}
                showZero={showZero}
                {...props}
            >
                <IconButton
                    onClick={handleClick}
                    size={size}
                    aria-label={`${total} notifications`}
                    aria-controls={open ? 'notification-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <IconComponent />
                </IconButton>
            </Badge>

            <Menu
                id="notification-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: maxHeight,
                        width: '320px',
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {/* Header */}
                <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                        Notifications
                    </Typography>
                </Box>

                {/* Notifications list */}
                {messages.length === 0 ? (
                    <MenuItem disabled>
                        <ListItemIcon>
                            <NotificationsNone fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={emptyMessage} />
                    </MenuItem>
                ) : (
                    messages.map((notification, index) => (
                        <MenuItem
                            key={notification.id || index}
                            onClick={() => handleNotificationClick(notification)}
                            sx={{
                                py: 1.5,
                                px: 2,
                                borderBottom: index < messages.length - 1 ? 1 : 0,
                                borderColor: 'divider',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                {notification.unread && (
                                    <Circle sx={{ fontSize: 8, color: 'primary.main' }} />
                                )}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: notification.unread ? 600 : 400,
                                            lineHeight: 1.4
                                        }}
                                    >
                                        {notification.title}
                                    </Typography>
                                }
                                secondary={
                                    <Typography component={'div'}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} noWrap>
                                            {notification.message}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                            {notification.timestamp}
                                        </Typography>
                                    </Typography>
                                }
                            />
                        </MenuItem>
                    ))
                )}
            </Menu>
        </>
    );
};

