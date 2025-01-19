import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import SecurityIcon from "@mui/icons-material/Security";
import SaveIcon from "@mui/icons-material/Save";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import FolderIcon from "@mui/icons-material/Folder";
import AssistantIcon from "@mui/icons-material/Assistant";
import MonitorScene from "./MonitorScene";

export default function App() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(to bottom right, #6a00f4, #b44ac0)",
        color: "#fff",
      }}
    >
      {/* Sidebar using Drawer (anchor=left) */}
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "transparent",
            border: "none",
            width: 200,
          },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        ></Box>

        <List sx={{ gap: 2 }}>
          <ListItem
            button
            sx={{
              borderRadius: "8px",
              backgroundColor: "rgba(255,255,255,0.3)",
              mb: 2,
              mt: 2,
            }}
          >
            <ListItemIcon sx={{ color: "#DAC8E4" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Smart Care" sx={{ color: "#fff" }} />
          </ListItem>

          <ListItem
            button
            sx={{
              mb: 2,
              mt: 2,
            }}
          >
            <ListItemIcon sx={{ color: "#DAC8E4" }}>
              <SaveIcon />
            </ListItemIcon>
            <ListItemText primary="Cleanup" sx={{ color: "#fff" }} />
          </ListItem>

          <ListItem
            button
            sx={{
              mb: 2,
              mt: 2,
            }}
          >
            <ListItemIcon sx={{ color: "#DAC8E4" }}>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="Protection" sx={{ color: "#fff" }} />
          </ListItem>

          <ListItem
            button
            sx={{
              mb: 2,
              mt: 2,
            }}
          >
            <ListItemIcon sx={{ color: "#DAC8E4" }}>
              <BoltIcon />
            </ListItemIcon>
            <ListItemText primary="Performance" sx={{ color: "#fff" }} />
          </ListItem>

          <ListItem
            button
            sx={{
              mb: 2,
              mt: 2,
            }}
          >
            <ListItemIcon sx={{ color: "#DAC8E4" }}>
              <LocalGroceryStoreIcon />
            </ListItemIcon>
            <ListItemText primary="Applications" sx={{ color: "#fff" }} />
          </ListItem>

          <ListItem
            button
            sx={{
              mb: 2,
              mt: 2,
            }}
          >
            <ListItemIcon sx={{ color: "#DAC8E4" }}>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="My Clutter" sx={{ color: "#fff" }} />
          </ListItem>
        </List>

        <Box sx={{ flexGrow: 1 }} />
        {/* Assistant icon at bottom */}
        <Box
          sx={{ display: "flex", justifyContent: "left", mb: 2, m: 2, gap: 3 }}
        >
          <AssistantIcon sx={{ fontSize: 32, color: "#fff" }} />
          <Typography variant="body2">Assistant</Typography>
        </Box>
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          position: "relative",
          flexGrow: 1,
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 3, // to avoid top bar overlap
          overflow: "hidden",
        }}
      >
        {/* Hero Image (placeholder) */}
        <Box />
        <Box
          sx={{
            mb: 4,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MonitorScene />
        </Box>

        {/* Welcome text */}
        <Typography variant="h4" sx={{ fontWeight: "400", mb: 1 }}>
          Welcome back!
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Keep your system clean and optimized with just a click.
        </Typography>

        {/* Circular CTA button */}
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "0px",
            transform: "translateX(-50%)",
            border: "1px #fff solid",
            borderRadius: "50%",
            width: 120,
            height: 120,
            fontSize: "1rem",
            background: "linear-gradient(to right, #ff0080, #ff8c00)",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.6)",
            "&:hover": {
              background: "linear-gradient(to right, #ff0080, #ff8c00)",
            },
          }}
        >
          Scan
        </Button>
      </Box>
    </Box>
  );
}
