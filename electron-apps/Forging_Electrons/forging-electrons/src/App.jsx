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
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import CloseIcon from "@mui/icons-material/Close";
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
      }}
    >
      {/* Sidebar using Drawer */}
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "transparent",
            border: "none",
            width: 300,
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: "3px",
              height: "100%",
              background: `linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.1) 30%,
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0.1) 70%,
                rgba(255, 255, 255, 0) 100%
                )`,
            },
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
        >
          <List sx={{ gap: 2 }}>
            <ListItem
              button="true"
              sx={{
                width: "297px",
                height: "50px",
                borderRadius: "8px",
                backgroundColor: "transparent",
                mb: 2,
                mt: 2,
                "& .MuiListItemText-primary": {
                  //   color: "rgba(255,255,255,0.7)",
                },
                "&:hover ": {
                  backgroundColor: "rgba(75, 34, 189, 0.61)",
                  "& .MuiListItemText-primary": {
                    color: "#fff",
                    fontWeight: 500,
                  },
                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemIcon>
                <PlayArrowIcon />
              </ListItemIcon>
              <ListItemText primary=" Start Three" sx={{ fontWeight: 700 }} />
            </ListItem>

            <ListItem
              button="true"
              sx={{
                width: "297px",
                height: "50px",
                borderRadius: "8px",
                backgroundColor: "transparent",
                mb: 2,
                mt: 2,
                "& .MuiListItemText-primary": {
                  //   color: "rgba(255,255,255,0.7)",
                },
                "&:hover ": {
                  backgroundColor: "rgba(75, 34, 189, 0.61)",
                  "& .MuiListItemText-primary": {
                    color: "#fff",
                    fontWeight: 500,
                  },
                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemIcon>
                <RotateRightIcon />
              </ListItemIcon>
              <ListItemText primary=" Rotate Right" sx={{ fontWeight: 700 }} />
            </ListItem>

            <ListItem
              button="true"
              sx={{
                width: "297px",
                height: "50px",
                borderRadius: "8px",
                backgroundColor: "transparent",
                mb: 2,
                mt: 2,
                "& .MuiListItemText-primary": {
                  //   color: "rgba(255,255,255,0.7)",
                },
                "&:hover ": {
                  backgroundColor: "rgba(75, 34, 189, 0.61)",
                  "& .MuiListItemText-primary": {
                    color: "#fff",
                    fontWeight: 500,
                  },
                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemIcon>
                <RotateLeftIcon />
              </ListItemIcon>
              <ListItemText primary=" Rotate Left" sx={{ fontWeight: 700 }} />
            </ListItem>

            <ListItem
              button="true"
              sx={{
                width: "297px",
                height: "50px",
                borderRadius: "8px",
                backgroundColor: "transparent",
                mb: 2,
                mt: 2,
                "& .MuiListItemText-primary": {
                  //   color: "rgba(255,255,255,0.7)",
                },
                "&:hover ": {
                  backgroundColor: "rgba(75, 34, 189, 0.61)",
                  "& .MuiListItemText-primary": {
                    color: "#fff",
                    fontWeight: 500,
                  },
                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemIcon>
                <CloseIcon />
              </ListItemIcon>
              <ListItemText primary="Stop Three" sx={{ fontWeight: 700 }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content area */}
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
          overflow: "hidden",
        }}
      >
        {/* Three.js Scene */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MonitorScene />
        </Box>
      </Box>
    </Box>
  );
}
