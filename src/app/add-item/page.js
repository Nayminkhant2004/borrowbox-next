'use client';

import { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function AddItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get the logged-in user from the browser memory
    const loggedInUser = JSON.parse(localStorage.getItem('borrowbox_user'));

    if (!loggedInUser) {
      setStatus({ type: 'error', msg: 'You must be logged in to add an item.' });
      return;
    }

    const itemData = {
      name,
      description,
      imageUrl: imageUrl || "https://via.placeholder.com/150",
      ownerName: loggedInUser.name, // Fixes Andrei's request to store owner
      ownerId: loggedInUser._id,    // Connects item to the user
      creditsRequired: 10           // Default cost for the credit system
    };

    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });

    if (res.ok) {
      setStatus({ type: 'success', msg: 'Item added successfully! Redirecting...' });
      setTimeout(() => router.push('/items'), 2000);
    } else {
      setStatus({ type: 'error', msg: 'Failed to add item to MongoDB.' });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#121212', pb: 4 }}>
      <Navbar />
      <Container maxWidth="sm" style={{ marginTop: '40px' }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 'bold' }}>
          List a New Item
        </Typography>

        {status.msg && <Alert severity={status.type} sx={{ mb: 3 }}>{status.msg}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Item Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1 }}
            required
          />
          <TextField
            fullWidth
            label="Image URL (Optional)"
            variant="filled"
            placeholder="Paste an image link here"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="filled"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3, backgroundColor: 'white', borderRadius: 1 }}
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            fullWidth 
            sx={{ py: 1.5, fontSize: '1.1rem' }}
          >
            Post Item to Campus Hub
          </Button>
        </form>
      </Container>
    </Box>
  );
}