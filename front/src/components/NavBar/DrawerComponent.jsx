import { useState } from 'react';
import {
  Drawer,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

const DrawerComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div style={{ border: '1px solid black' }}>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>Nav Item 1</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>Nav Item 2</ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
          <MenuIcon />
        </IconButton>
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
