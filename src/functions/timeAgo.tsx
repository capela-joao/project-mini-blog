import type { FirestoreTimestamp } from '../types/TimeTypes';

export function timeAgo(timestamp: FirestoreTimestamp) {
  const date = new Date(timestamp.seconds * 1000);
  const diff = (Date.now() - date.getTime()) / 1000;

  if (diff < 60) return 'agora mesmo';

  const minutes = diff / 60;
  if (minutes < 60)
    return `há ${Math.floor(minutes)} minutos`;

  const hours = minutes / 60;
  if (hours < 24) return `há ${Math.floor(hours)} horas`;

  const days = hours / 24;
  return `há ${Math.floor(days)} dias`;
}
