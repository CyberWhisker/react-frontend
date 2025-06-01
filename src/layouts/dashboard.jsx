import * as React from 'react';
import { Outlet } from 'react-router';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Account, AccountPreview } from '@toolpad/core';
import { Divider, Stack } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import CustomToast from '../components/CustomToast';
import NotificationBadge from '../components/NotificationBadge';

export default function Layout() {
    return (
        <DashboardLayout
            slots={{
                toolbarAccount: () => null,
                sidebarFooter: SidebarFooterAccount,
                toolbarActions: ToolbarActionsWrapper
            }}
        >
            <PageContainer>
                <Outlet />
                <CustomToast />
            </PageContainer>
        </DashboardLayout>
    );
}

function AccountSidebarPreview(props) {
    const { handleClick, open, mini } = props;
    return (
        <Stack direction="column" p={0}>
            <Divider />
            <AccountPreview
                variant={mini ? 'condensed' : 'expanded'}
                handleClick={handleClick}
                open={open}
            />
        </Stack>
    );
}

const createPreviewComponent = (mini) => {
    function PreviewComponent(props) {
        return <AccountSidebarPreview {...props} mini={mini} />
    }
    return PreviewComponent;
};

function SidebarFooterAccount({ mini }) {
    const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
    const { logout } = React.useContext(AuthContext);

    return (
        <Account
            slots={{
                preview: PreviewComponent,
            }}
            slotProps={{
                popover: {
                    transformOrigin: { horizontal: 'left', vertical: 'bottom' },
                    anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
                    disableAutoFocus: true,
                    slotProps: {
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: (theme) =>
                                    `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                                mt: 1,
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    bottom: 10,
                                    left: 0,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translate(-50%, -50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    },
                },
                signOutButton: {
                    color: 'error',
                    onClick: () => logout(),
                    startIcon: <Logout />,
                },
            }}
        />
    )
}

function ToolbarActionsWrapper() {
    return (
        <>
            <NotificationBadge />
            <ThemeSwitcher />
        </>
    )
}
