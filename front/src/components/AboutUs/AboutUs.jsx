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
      component="div"
      sx={{
        minHeight: theme.heights.homeSection,
        width: '100%',
        p: 4,
        flexWrap: 'wrap',
        display: {
          mobile: 'flex',
          tablet: 'grid',
          laptop: 'grid',
          desktop: 'grid',
        },
        gap: {
          mobile: '40px 20px',
          tablet: '40px 20px',
          laptop: '40px 20px',
          desktop: '40px 20px',
        },
        gridTemplateColumns: {
          mobile: 'repeat(2, minmax(Min(320px), 1fr))',
          tablet: 'repeat(2, minmax(Min(320px), 1fr))',
          laptop: 'repeat(2, minmax(Min(340px), 1fr))',
          desktop: 'repeat(3, minmax(Min(340px), 1fr))',
        },
        placeItems: 'center',
      }}
    >
      {members.map((member) => (
        <Card
          key={member.id}
          sx={{
            maxWidth: '100%',
            minWidth: {
              mobile: '100%',
              tablet: '100%',
              laptop: '360px',
              desktop: '360px',
            },
            padding: 2,
            height: 'auto',
          }}
        >
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
                <Typography sx={{ display: 'flex', width: '20px' }} variant="h6">
                  {member.name}
                </Typography>
                <Typography variant="h7">{member.role}</Typography>
              </>
            }
          />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Typography sx={{ width: 200, h: 200, fontSize: 14 }}>{member.description}</Typography>
          </CardContent>
          <CardActions
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Link href={member.linkedin} sx={{ fontSize: 12, textAlign: 'start' }}>
              <Typography>LINKEDIN</Typography>
            </Link>
            <Link href={member.github} sx={{ fontSize: 12, textAlign: 'start' }}>
              <Typography>GITHUB</Typography>
            </Link>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default AboutUs;
