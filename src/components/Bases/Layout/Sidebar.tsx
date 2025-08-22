"use client";

import Link from "next/link";
import { JSX, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";

import getNavigation from "./Navigation";

type NavigationItemType = {
  kind: "item";
  title: string;
  segment: string;
  icon: React.ReactNode;
};

type NavigationGroupType = {
  kind: "group";
  title: string;
  icon: React.ReactNode;
  children: NavigationType[];
};

type NavigationHeaderType = {
  kind: "header";
  title: string;
};

type NavigationDividerType = {
  kind: "divider";
};

type NavigationType = NavigationItemType | NavigationGroupType | NavigationHeaderType | NavigationDividerType;

export default function Sidebar({ session, isOpen }: { session: any; isOpen: boolean }) {
  const navigation = getNavigation(session.user);

  return (
    <Box sx={{ maxHeight: "100vh", overflowY: "auto", overflowX: "hidden", pr: 1 }}>
      <List component="nav">{navigation.map((item, index) => render(item, index, isOpen))}</List>
    </Box>
  );
}

function render(item: NavigationType, index: number, isOpen: boolean): JSX.Element | null {
  switch (item.kind) {
    case "header":
      return isOpen ? <BaseText key={index} text={item.title} sx={{ p: 1, color: "text.secondary", fontSize: "0.7rem" }} /> : null;

    case "divider":
      return <Divider key={index} sx={{ mt: 1 }} />;

    case "group":
      return <NavigationGroup key={index} group={item} isOpen={isOpen} />;

    case "item":
    default:
      return <NavigationItem key={index} title={item.title} segment={item.segment} icon={item.icon} isOpen={isOpen} />;
  }
}

function NavigationGroup({ group, isOpen }: { group: NavigationGroupType; isOpen: boolean }) {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <Box>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton onClick={handleToggle} sx={{ minHeight: 48, justifyContent: isOpen ? "initial" : "center", px: 2 }}>
          <ListItemIcon sx={{ minWidth: 0, mr: isOpen ? 3 : "auto", justifyContent: "center" }}>{group.icon}</ListItemIcon>
          {isOpen && (
            <>
              <ListItemText primary={<BaseText sx={{ fontSize: "0.75rem" }} text={group.title} />} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </>
          )}
        </ListItemButton>
      </ListItem>

      <Collapse in={open && isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {group.children.map((child, index) => render(child, index, isOpen))}
        </List>
      </Collapse>
    </Box>
  );
}

function NavigationItem({ title, segment, icon, isOpen }: { title: string; segment: string; icon: React.ReactNode; isOpen: boolean }) {
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton component={Link} href={segment} sx={{ minHeight: 48, justifyContent: isOpen ? "initial" : "center", px: 2 }}>
        <ListItemIcon sx={{ minWidth: 0, mr: isOpen ? 2 : "auto", justifyContent: "center" }}>{icon}</ListItemIcon>
        {isOpen && <ListItemText primary={<BaseText sx={{ fontSize: "0.8rem" }} text={title} />} />}
      </ListItemButton>
    </ListItem>
  );
}
