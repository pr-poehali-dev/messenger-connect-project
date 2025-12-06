export interface DragonRank {
  level: 'green' | 'blue' | 'yellow' | 'red';
  name: string;
  emoji: string;
  minRating: number;
  maxRating: number;
  color: string;
  gradient: string;
  description: string;
}

export const dragonRanks: DragonRank[] = [
  {
    level: 'green',
    name: 'Зелёный дракон',
    emoji: '🐲',
    minRating: 0,
    maxRating: 999,
    color: 'text-green-500',
    gradient: 'from-green-400 to-green-600',
    description: 'Начинающий воин'
  },
  {
    level: 'blue',
    name: 'Синий дракон',
    emoji: '🐉',
    minRating: 1000,
    maxRating: 4999,
    color: 'text-blue-500',
    gradient: 'from-blue-400 to-blue-600',
    description: 'Опытный боец'
  },
  {
    level: 'yellow',
    name: 'Жёлтый дракон',
    emoji: '🐲',
    minRating: 5000,
    maxRating: 9999,
    color: 'text-yellow-500',
    gradient: 'from-yellow-400 to-yellow-600',
    description: 'Мастер стихий'
  },
  {
    level: 'red',
    name: 'Огненный дракон',
    emoji: '🔥',
    minRating: 10000,
    maxRating: Infinity,
    color: 'text-red-500',
    gradient: 'from-red-500 to-orange-600',
    description: 'Легендарный воин'
  }
];

export function getDragonRank(rating: number): DragonRank {
  for (const rank of dragonRanks) {
    if (rating >= rank.minRating && rating <= rank.maxRating) {
      return rank;
    }
  }
  return dragonRanks[0];
}

export function calculateProgress(rating: number): number {
  const rank = getDragonRank(rating);
  if (rank.maxRating === Infinity) return 100;
  
  const progress = ((rating - rank.minRating) / (rank.maxRating - rank.minRating)) * 100;
  return Math.min(Math.max(progress, 0), 100);
}
