import { useState, useContext } from 'react';
import { Context } from '../../context/ContextProvider';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

const DrawerComponent = ({ navLinksArray, scrolled, handleSessionClose }) => {
  
  const { session, setSession } = useContext(Context)[2];
  const [openDrawer, setOpenDrawer] = useState(false);
  const DRAWER_ANCHOR = 'right';

  return (
    <>
      <Drawer
        PaperProps={{ sx: { width: '200px' } }}
        anchor={DRAWER_ANCHOR}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {navLinksArray.map((link) => (
            <ListItemButton href={link.path}>
              <ListItemIcon>
                <ListItemText>{link.title}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))},
          {session.token? (
              <ListItemButton onClick={handleSessionClose}>Cerrar Sesion</ListItemButton>
            ):(<></>)}
        </List>
      </Drawer>

      <IconButton size='large' onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{transform:'scale(1.2)', color: scrolled ? 'white' : 'black' }}></MenuIcon>
      </IconButton>
    </>
  );
};

export default DrawerComponent;
