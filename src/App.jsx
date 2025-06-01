import { useContext, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DashboardOutlined, Event, Message, Person, Settings, Web } from '@mui/icons-material';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { AuthContext } from './context/AuthContext';
import messageSocket from './api/sockets/messageSocket';
import { useNotification } from './context/NotificationContext';

// Navigation Configurations
const NAVIGATION_CONFIG = {
  admin: [
    { kind: 'header', title: 'Main items' },
    { title: 'Dashboard', segment: 'dashboard', icon: <DashboardOutlined /> },
    { title: 'Users', segment: 'user', icon: <Person /> },
    {
      title: 'Messenger',
      segment: 'messenger',
      pattern: 'messenger/:id',
      icon: <Message />,
      action: <BadgeMessageCount />
    },
    { kind: 'header', title: 'Maintenance' },
    { title: 'Projects', segment: 'projects', icon: <Web /> },
    { title: 'Experience', segment: 'experience', icon: <Event /> },
    { title: 'Tech Stack', segment: 'techStack', icon: <Settings /> },
  ],
};

// Branding Configurations
const BRANDING_CONFIG = {
  admin: { title: 'CyberWhiskers', homeUrl: '/' },
  ecommerce: { title: 'Ecommerce', homeUrl: '/' },
};

// Helper function to get current navigation and branding
const getConfig = (pathname) => {
  if (pathname.startsWith('/ecommerce')) {
    return { navigation: NAVIGATION_CONFIG.ecommerce, branding: BRANDING_CONFIG.ecommerce };
  }
  return { navigation: NAVIGATION_CONFIG.admin, branding: BRANDING_CONFIG.admin };
};

function App() {
  const location = useLocation();
  const { auth, isLoading } = useContext(AuthContext);
  const [session, setSession] = useState(null);

  // Get navigation and branding dynamically
  const { navigation, branding } = useMemo(() => getConfig(location.pathname), [location.pathname]);

  // Set session when auth changes
  useEffect(() => {
    if (auth) {
      setSession({
        user: { name: auth.name, email: auth.email, image: auth.picture },
      });
    }
  }, [auth]);

  // Authentication handlers
  const authentication = useMemo(() => ({
    signIn: () => setSession(auth),
    signOut: () => setSession(null),
  }), [auth]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <ReactRouterAppProvider
      navigation={navigation}
      branding={branding}
      authentication={authentication}
      session={session}
    >
      <SocketWrapperNotification>
        <Outlet />
      </SocketWrapperNotification>
    </ReactRouterAppProvider>
  );
}

export default App;


function SocketWrapperNotification({ children }) {
  const { auth } = useContext(AuthContext);
  const { handleGetData } = useNotification();
  useEffect(() => {
    if (!auth?._id) return;

    const handleReceiveMessage = (msg) => {
      if (msg.sender !== auth._id) {
        handleGetData()
        toast.info(`💬 New message from ${msg.senderName}`, {
          position: 'bottom-left',
          autoClose: 3000,
        });
      }
    };

    messageSocket.on('receive_message', handleReceiveMessage);

    return () => {
      messageSocket.off('receive_message', handleReceiveMessage);
    };
  }, [auth]);
  return <>{children}</>;
}

function BadgeMessageCount() {
  const { total } = useNotification();
  if (total !== 0) {
    return (
      <Chip label={total} color="error" size="small" />
    )
  }
  return
}