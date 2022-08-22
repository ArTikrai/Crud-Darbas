import * as React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import Image from './image';
import TypographyLimited from './typography-limited';

const MovieCard = ({
  title,
  img,
  description,
  category,
  price,
  onDelete,
  onEdit,
}) => (
  <Card sx={{
    display: 'flex', flexDirection: 'column', position: 'relative', height: '100%', minHeight: '545px',
  }}
  >
    <Box sx={{ position: 'relative', width: '100%', pt: '95%' }}>
      <Image src={img} sx={{ position: 'absolute', top: 0, left: 0 }} />
    </Box>

    <CardContent sx={{ p: 2, flexGrow: 1 }}>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      >
        <Typography variant="h5" component="div">{title}</Typography>
        <Typography variant="h6" component="div" color="primary.main">{`${price} €`}</Typography>
      </Box>
      <Typography variant="subtitle" component="div" sx={{ mb: 2 }}>{category}</Typography>
      <TypographyLimited variant="body2" color="text.secondary">{description}</TypographyLimited>
    </CardContent>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        size="small"
        onClick={onEdit}
        sx={{ color: 'warning.main' }}
      >
        Edit
      </Button>
      <Button
        size="small"
        onClick={onDelete}
        sx={{ color: 'error.main' }}
      >
        Delete
      </Button>
    </Box>
  </Card>
);

export default MovieCard;
