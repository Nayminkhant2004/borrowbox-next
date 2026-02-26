'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid, Box, CircularProgress } from '@mui/material';
import Navbar from '@/components/Navbar';

export default function ItemsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setItems(data.data);
        }
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Navbar />
      <Container style={{ marginTop: '40px' }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 4 }}>Available Items</Typography>
        
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {items.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card sx={{ height: '100%', backgroundColor: '#f5f5f5' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary">{item.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {items.length === 0 && (
              <Typography sx={{ color: 'white', ml: 2 }}>No items found. Add some!</Typography>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
}