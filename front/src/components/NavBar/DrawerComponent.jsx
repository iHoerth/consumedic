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
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
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

      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon></MenuIcon>
      </IconButton>
    </>
  );
};

export default DrawerComponent;
