// Sidebar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";

import getNavigation from "./Navigation";

interface SidebarProps {
  session: any;
  isOpen: boolean;
}

interface INavigationItem {
  title: string;
  segment?: string;
  icon: React.ReactNode;
  isOpen: boolean;
  action?: string;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const navigation = getNavigation();

  return (
    <Box sx={{ width: isOpen ? 250 : 72, height: "100%", overflowY: "auto", bgcolor: "background.paper" }}>
      <List component="nav" sx={{ p: 0 }}>
        {navigation.map((item, index) => renderItem(item, index, isOpen))}
      </List>
    </Box>
  );
}

function renderItem(item: any, index: number, isOpen: boolean) {
  switch (item.kind) {
    case "header":
      return isOpen ? <BaseText key={index} text={item.title} sx={{ px: 2, py: 1, fontSize: "0.7rem", color: "text.secondary" }} /> : null;
    case "divider":
      return <Divider key={index} />;
    case "group":
      return <NavigationGroup key={index} group={item} isOpen={isOpen} />;
    case "item":
    default:
      return <NavigationItem key={index} {...item} isOpen={isOpen} />;
  }
}

function NavigationGroup({ group, isOpen }: { group: any; isOpen: boolean }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={toggle} sx={{ px: 2, justifyContent: isOpen ? "initial" : "center" }}>
          <ListItemIcon sx={{ minWidth: 0, mr: isOpen ? 2 : "auto", justifyContent: "center" }}>{group.icon}</ListItemIcon>
          {isOpen && (
            <>
              <ListItemText primary={<BaseText text={group.title} sx={{ fontSize: "0.8rem" }} />} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </>
          )}
        </ListItemButton>
      </ListItem>

      <Collapse in={open && isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {group.children.map((child: any, idx: number) => renderItem(child, idx, isOpen))}
        </List>
      </Collapse>
    </>
  );
}

function NavigationItem({ title, segment, icon, isOpen, action }: INavigationItem) {
  const handleClick = () => {
    if (action === "logout") {
      signOut({ callbackUrl: "/login" });
      return;
    }
  };

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        component={segment && action !== "logout" ? Link : "button"}
        href={segment}
        onClick={handleClick}
        sx={{ minHeight: 48, justifyContent: isOpen ? "initial" : "center", px: 2 }}>
        <ListItemIcon sx={{ minWidth: 0, mr: isOpen ? 2 : "auto", justifyContent: "center" }}>{icon}</ListItemIcon>
        {isOpen && <ListItemText primary={<BaseText sx={{ fontSize: "0.8rem" }} text={title} />} />}
      </ListItemButton>
    </ListItem>
  );
}
