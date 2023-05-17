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
        width: '1340px',
        mt: 20,
        mb: 20,
        height: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(Min(400px), 1fr))',
        placeItems: 'center',
        gap: '80px 0px',
      }}
    >
      {members.map((member) => (
        <Card sx={{padding:'20px', margin:'0'}}>
          <CardHeader
            avatar={
              <Avatar
                src={member.img}
                sx={{ width: 160, height: 160, bgcolor: theme.palette.primary.light }}
                aria-label="recipe"
              >
                {member.name
                  .split(' ')
                  .map((ele) => ele[0])
                  .join('')}
              </Avatar>
            }
            title={
              <>
                <Typography variant="h5">{member.name}</Typography>
                <Typography variant='h7'>{member.role}</Typography>
              </>
            }
          />
          <CardContent>
            <Typography sx={{width:400, h:400, fontSize: 14,}}>{member.description}</Typography>
          </CardContent>
          <CardActions sx={{display:'flex', flexDirection:'column'}}>
            <Link sx={{fontSize: 16}}>{member.linkedin}</Link>
            <Link sx={{fontSize: 16}}>{member.github}</Link>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default AboutUs;
