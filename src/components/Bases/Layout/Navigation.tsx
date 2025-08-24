import { Chat, Group, Logout, People, Person, Settings } from "@mui/icons-material";

export default function getNavigation() {
  const navigation = [];

  // Seções principais do app
  const main = [
    { kind: "header", title: "Main" },
    { title: "Chats", segment: "/profile/chats", icon: <Chat /> },
    { title: "Contacts", segment: "/profile/contacts", icon: <People /> },
    { title: "Groups", segment: "/profile/groups", icon: <Group /> },
  ];

  // Configurações e perfil
  const profileSettings = [
    { kind: "divider" },
    { kind: "header", title: "Profile & Settings" },
    { title: "Profile", segment: "/profile/settings/profile", icon: <Person /> },
    { title: "Settings", segment: "/profile/settings", icon: <Settings /> },
    { title: "Logout", segment: "/home", icon: <Logout /> },
  ];

  navigation.push(...main);
  navigation.push(...profileSettings);

  return navigation;
}
