'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Button, Grid, Box, CircularProgress } from '@mui/material';
import Navbar from '@/components/Navbar';

export default function BorrowRequests() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setItems(data.data);
        setLoading(false);
      });
  }, []);

  const handleBorrow = (itemName) => {
    alert(`Request sent to borrow: ${itemName}`);
  };

  return (
    <Box>
      <Navbar />
      <Container style={{ marginTop: '40px' }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 4 }}>Borrow Requests</Typography>
        
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {items.map((item) => (
              <Grid item xs={12} key={item._id}>
                <Card sx={{ backgroundColor: '#fffde7' }}>
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h6" color="black">{item.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                    </Box>
                    <Button variant="contained" color="secondary" onClick={() => handleBorrow(item.name)}>
                      Request to Borrow
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}