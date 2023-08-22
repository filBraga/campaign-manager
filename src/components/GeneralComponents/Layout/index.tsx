import Head from 'next/head';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer } from '@/app/redux/slice/drawerSlice';
import { RootState } from '@/app/redux/store';

interface LayoutProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

// MENU ITENS
const menuListItens = [
    // { text: 'Home', path: '/home', icon: <HomeIcon /> },
    { text: 'Campanhas', path: '/', icon: <PeopleAltIcon /> },
    { text: 'On Construction', path: '/construction', icon: <ImportExportIcon /> },
    // { text: 'Fluxo de Caixa', path: '/cashFlow', icon: <ImportExportIcon /> },
];

export default function Layout({ title, description, children }: LayoutProps) {
    const dispatch = useDispatch();
    const isDrawerOpen: Boolean = useSelector((state: RootState) => state.drawer.open);

    const handleToggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        dispatch(toggleDrawer());
    };

    const list = () => (
        <Box sx={{ width: 250 }} role="presentation" onClick={handleToggleDrawer()} onKeyDown={handleToggleDrawer()}>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <MenuIcon />
                    </ListItemIcon>
                    <ListItemText primary="Menu" />
                </ListItem>
            </List>
            <List>
                {menuListItens.map((item) => (
                    <Link key={item.text} href={item.path} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => alert('Sign out')}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sair" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
    return (
        <Box>
            <Head>
                <title>{title}</title>
                {description && <meta name="description" content={description} />}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppBar position="sticky" sx={{ backgroundColor: '#1F2C4C', zIndex: 1 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => dispatch(toggleDrawer())}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Campaign Manager
                    </Typography>
                    {/* <Typography color='inherit'>Hello {user?.getUsername()}</Typography> */}
                </Toolbar>
            </AppBar>
            <Drawer open={isDrawerOpen ? true : false} onClose={handleToggleDrawer()}>
                {list()}
            </Drawer>{' '}
            <Box sx={{ margin: 'auto', maxWidth: '1200px' }}>{children}</Box>
        </Box>
    );
}
