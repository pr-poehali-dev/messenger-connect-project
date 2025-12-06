import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Wallpaper {
  id: number;
  name: string;
  gradient: string;
  emoji: string;
  isPremium: boolean;
  description: string;
}

const wallpapers: Wallpaper[] = [
  {
    id: 1,
    name: 'Тёмная ночь',
    gradient: 'from-slate-900 via-slate-800 to-slate-900',
    emoji: '🌙',
    isPremium: false,
    description: 'Классический тёмный фон'
  },
  {
    id: 2,
    name: 'Горы на рассвете',
    gradient: 'from-orange-900 via-red-800 to-purple-900',
    emoji: '⛰️',
    isPremium: true,
    description: 'Китайские горы на восходе'
  },
  {
    id: 3,
    name: 'Бамбуковый лес',
    gradient: 'from-green-900 via-emerald-800 to-teal-900',
    emoji: '🎋',
    isPremium: true,
    description: 'Умиротворяющий бамбук'
  },
  {
    id: 4,
    name: 'Храм в горах',
    gradient: 'from-red-900 via-amber-800 to-orange-900',
    emoji: '⛩️',
    isPremium: true,
    description: 'Древний китайский храм'
  },
  {
    id: 5,
    name: 'Сакура',
    gradient: 'from-pink-900 via-rose-800 to-purple-900',
    emoji: '🌸',
    isPremium: true,
    description: 'Цветущая вишня весной'
  },
  {
    id: 6,
    name: 'Дракон в облаках',
    gradient: 'from-blue-900 via-indigo-800 to-purple-900',
    emoji: '🐉',
    isPremium: true,
    description: 'Мистический восточный дракон'
  },
  {
    id: 7,
    name: 'Золотой закат',
    gradient: 'from-yellow-900 via-orange-800 to-red-900',
    emoji: '🌅',
    isPremium: true,
    description: 'Закат над горами'
  },
  {
    id: 8,
    name: 'Лунная ночь',
    gradient: 'from-indigo-950 via-blue-900 to-slate-900',
    emoji: '🌕',
    isPremium: true,
    description: 'Полная луна над вершинами'
  },
  {
    id: 9,
    name: 'Туман в горах',
    gradient: 'from-gray-800 via-slate-700 to-zinc-800',
    emoji: '🌫️',
    isPremium: true,
    description: 'Мистический туман'
  },
];

interface WallpaperGalleryProps {
  onClose: () => void;
  currentWallpaper: number;
  onWallpaperChange: (wallpaperId: number) => void;
  subscriptionTier: 'free' | 'basic' | 'premium' | 'elite';
}

export default function WallpaperGallery({ 
  onClose, 
  currentWallpaper, 
  onWallpaperChange,
  subscriptionTier 
}: WallpaperGalleryProps) {
  const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper);
  const canUsePremiumWallpapers = subscriptionTier === 'premium' || subscriptionTier === 'elite';

  const handleSelect = (wallpaper: Wallpaper) => {
    if (wallpaper.isPremium && !canUsePremiumWallpapers) {
      return;
    }
    setSelectedWallpaper(wallpaper.id);
  };

  const handleApply = () => {
    onWallpaperChange(selectedWallpaper);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-card border border-border rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Обои для чата 🖼️</h2>
            <p className="text-sm text-muted-foreground">
              Китайские пейзажи и горы
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
            <Icon name="X" size={24} />
          </Button>
        </div>

        <ScrollArea className="h-[calc(90vh-180px)] p-6">
          <div className="grid grid-cols-3 gap-6">
            {wallpapers.map((wallpaper) => {
              const isLocked = wallpaper.isPremium && !canUsePremiumWallpapers;
              const isSelected = selectedWallpaper === wallpaper.id;
              const isCurrent = currentWallpaper === wallpaper.id;

              return (
                <div
                  key={wallpaper.id}
                  onClick={() => handleSelect(wallpaper)}
                  className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all hover:scale-105 ${
                    isSelected ? 'ring-4 ring-primary' : ''
                  } ${isLocked ? 'opacity-60' : ''}`}
                >
                  <div className={`aspect-[9/16] bg-gradient-to-br ${wallpaper.gradient} p-6 flex flex-col justify-between`}>
                    {isLocked && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center flex-col gap-2 z-10">
                        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-3xl">
                          🔒
                        </div>
                        <Badge className="bg-primary">Premium</Badge>
                      </div>
                    )}

                    <div className="text-center">
                      <div className="text-6xl mb-3">{wallpaper.emoji}</div>
                      <h3 className="font-bold text-lg mb-1">{wallpaper.name}</h3>
                      <p className="text-xs text-white/70">{wallpaper.description}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center px-3 gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-sm">
                          😎
                        </div>
                        <div className="flex-1 h-3 bg-white/20 rounded-full" />
                      </div>
                      <div className="h-8 bg-white/10 backdrop-blur-sm rounded-xl" />
                    </div>

                    {isCurrent && (
                      <Badge className="absolute top-3 right-3 bg-green-500">
                        Текущий
                      </Badge>
                    )}

                    {isSelected && !isCurrent && (
                      <Badge className="absolute top-3 right-3 bg-primary">
                        Выбран
                      </Badge>
                    )}

                    {wallpaper.isPremium && !isLocked && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500">
                        <Icon name="Crown" size={12} className="mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!canUsePremiumWallpapers && (
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/20 rounded-3xl">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 text-3xl">
                  💎
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2">Открой премиум обои!</h4>
                  <p className="text-muted-foreground mb-4">
                    Оформи подписку Премиум или Элитный и получи доступ к эксклюзивной коллекции китайских пейзажей и горных видов.
                  </p>
                  <Button className="rounded-xl">
                    <Icon name="Crown" size={18} className="mr-2" />
                    Оформить Премиум
                  </Button>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        {selectedWallpaper !== currentWallpaper && (
          <div className="p-4 border-t border-border flex gap-3">
            <Button className="flex-1 rounded-xl" onClick={handleApply}>
              Применить обои
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={onClose}>
              Отмена
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
