'use client';

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation"; // Updated for Next.js

export default function Navbar() {
  const router = useRouter(); // Updated for Next.js

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => router.push("/")}>
          BorrowBox
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => router.push("/")}>Dashboard</Button>
          <Button color="inherit" onClick={() => router.push("/items")}>Items</Button>
          <Button color="inherit" onClick={() => router.push("/add-item")}>Add Item</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}