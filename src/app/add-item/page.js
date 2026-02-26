'use client';

import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function AddItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // This is the "Wiring" that sends data to your MongoDB
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });

    if (res.ok) {
      alert('Item added successfully!');
      router.push('/');
    } else {
      alert('Failed to add item.');
    }
  };

  return (
    <Box>
      <Navbar />
      <Container style={{ marginTop: '40px' }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 4 }}>Add New Item</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Item Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1 }}
          />
          <Button type="submit" variant="contained" size="large">
            Save Item
          </Button>
        </form>
      </Container>
    </Box>
  );
}