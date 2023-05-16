import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from '@mui/material';
import { members } from '../../helpers/helpers';
import { useTheme } from '@emotion/react';

const AboutUs = () => {
  const theme = useTheme();
  return (
    <Box
      component="span"
      sx={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(Min(400px), 1fr))',
        placeItems: 'center',
        gap: '40px',
        padding: '60px',
      }}
    >
      {members.map((member) => (
        <Card>
          <CardHeader
            avatar={
              <Avatar
                src={member.img}
                sx={{ width: 200, height: 200, bgcolor: theme.palette.primary.light }}
                aria-label="recipe"
              >
                {member.name
                  .split(' ')
                  .map((ele) => ele[0])
                  .join('')}
              </Avatar>
            }
          />
          <CardContent>
            <Typography>{member.name}</Typography>
            <Typography>{member.role}</Typography>
            <Typography>{member.description}</Typography>
          </CardContent>
          <CardActions>
            <Link>{member.linkedin}</Link>
            <Link>{member.github}</Link>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default AboutUs;
