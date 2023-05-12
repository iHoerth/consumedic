import { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

const DrawerComponent = ({ navLinksArray }) => {
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
          ))}
        </List>
      </Drawer>

      <IconButton size='large' onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{transform:'scale(1.2)', color:'white'}}></MenuIcon>
      </IconButton>
    </>
  );
};

export default DrawerComponent;
