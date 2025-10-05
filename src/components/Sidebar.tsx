import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import TableViewIcon from '@mui/icons-material/TableView';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import ColorSchemeToggle from './ColorSchemeToggle.tsx';
import { closeSidebar } from '../utils';

function Toggler({
                     defaultExpanded = false,
                     renderToggle,
                     children,
                 }: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }) => React.ReactNode;
}) {
    const [open, setOpen] = React.useState(defaultExpanded);
    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <Box
                sx={[
                    {
                        display: 'grid',
                        transition: '0.2s ease',
                        '& > *': {
                            overflow: 'hidden',
                        },
                    },
                    open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
                ]}
            >
                {children}
            </Box>
        </React.Fragment>
    );
}

export default function Sidebar() {
    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 10000,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '240px',
                        },
                    },
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography level="title-lg">PolyNa</Typography>
                <ColorSchemeToggle sx={{ ml: 'auto' }} />
            </Box>
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5,
                    },
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <HomeRoundedIcon />
                            <ListItemContent>
                                <Typography level="title-sm">Главная</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton>
                            <DashboardRoundedIcon />
                            <ListItemContent>
                                <Typography level="title-sm">Дэшборды</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <TableViewIcon />
                                    <ListItemContent>
                                        <Typography level="title-sm">Таблицы</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={[
                                            open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                                        ]}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton>ChangePlan</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Review</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>SelectAuditory</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>SiteStat</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>StartWay</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>UserId</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>
                    <ListItem nested>
                        <Toggler
                            defaultExpanded
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <GroupRoundedIcon />
                                    <ListItemContent>
                                        <Typography level="title-sm">Пользователи</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon
                                        sx={[
                                            open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                                        ]}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton selected>Мой профиль</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Все пользователи</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>Права и разрешения</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>
                </List>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar
                    variant="outlined"
                    size="sm"
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="title-sm">Placeholder Name</Typography>
                    <Typography level="body-xs">Placeholder login</Typography>
                </Box>
                <IconButton size="sm" variant="plain" color="neutral">
                    <LogoutRoundedIcon />
                </IconButton>
            </Box>
        </Sheet>
    );
}