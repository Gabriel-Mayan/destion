import { Message } from "@components/Chat/ChatMessageList";

export function formatLastActivity(timestamp: string | Date) {
  const last = new Date(timestamp).getTime();
  const now = Date.now();
  const diff = now - last;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours}h${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes}m${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
}

export const formatMessageData = (message: Message) => {
  const dateUtc = new Date(message.deletedAt || message.createdAt);
  const createdDateUtc = new Date(message.createdAt);

  const time = dateUtc.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const createdAt = createdDateUtc.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const content = message.deletedAt ? `This message was deleted at ${time}` : message.content;

  return { ...message, content, createdAt };
};
