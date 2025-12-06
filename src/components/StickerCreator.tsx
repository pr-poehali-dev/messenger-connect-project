import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Sticker {
  id: number;
  emoji: string;
  name: string;
  isCustom: boolean;
}

const defaultStickers: Sticker[] = [
  { id: 1, emoji: '😂', name: 'Смех', isCustom: false },
  { id: 2, emoji: '❤️', name: 'Сердце', isCustom: false },
  { id: 3, emoji: '👍', name: 'Лайк', isCustom: false },
  { id: 4, emoji: '🔥', name: 'Огонь', isCustom: false },
  { id: 5, emoji: '🎮', name: 'Геймер', isCustom: false },
  { id: 6, emoji: '💎', name: 'Алмаз', isCustom: false },
  { id: 7, emoji: '🚀', name: 'Ракета', isCustom: false },
  { id: 8, emoji: '⭐', name: 'Звезда', isCustom: false },
];

interface StickerCreatorProps {
  onClose: () => void;
  subscriptionTier: 'free' | 'basic' | 'premium' | 'elite';
}

export default function StickerCreator({ onClose, subscriptionTier }: StickerCreatorProps) {
  const [customStickers, setCustomStickers] = useState<Sticker[]>([
    { id: 101, emoji: '🐉', name: 'Мой дракон', isCustom: true },
    { id: 102, emoji: '⚔️', name: 'Битва', isCustom: true },
  ]);
  const [newStickerEmoji, setNewStickerEmoji] = useState('');
  const [newStickerName, setNewStickerName] = useState('');

  const stickerLimits = {
    free: 0,
    basic: 50,
    premium: 200,
    elite: 999999
  };

  const maxStickers = stickerLimits[subscriptionTier];
  const canCreateMore = customStickers.length < maxStickers;

  const createSticker = () => {
    if (!newStickerEmoji || !newStickerName || !canCreateMore) return;

    const newSticker: Sticker = {
      id: Date.now(),
      emoji: newStickerEmoji,
      name: newStickerName,
      isCustom: true
    };

    setCustomStickers([...customStickers, newSticker]);
    setNewStickerEmoji('');
    setNewStickerName('');
  };

  const deleteSticker = (id: number) => {
    setCustomStickers(customStickers.filter(s => s.id !== id));
  };

  const allStickers = [...defaultStickers, ...customStickers];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-card border border-border rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Стикеры 🎨</h2>
            <p className="text-sm text-muted-foreground">
              Создано: {customStickers.length} / {maxStickers === 999999 ? '∞' : maxStickers}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
            <Icon name="X" size={24} />
          </Button>
        </div>

        <ScrollArea className="h-[calc(90vh-180px)]">
          <div className="p-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all">Все стикеры</TabsTrigger>
                <TabsTrigger value="custom">Мои стикеры</TabsTrigger>
                <TabsTrigger value="create">Создать</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-6 gap-4">
                  {allStickers.map((sticker) => (
                    <div
                      key={sticker.id}
                      className="p-4 border border-border rounded-2xl hover:border-primary transition-all hover:scale-110 cursor-pointer group relative"
                    >
                      <div className="text-5xl mb-2 text-center">{sticker.emoji}</div>
                      <p className="text-xs text-center text-muted-foreground truncate">{sticker.name}</p>
                      {sticker.isCustom && (
                        <Badge className="absolute top-2 right-2 scale-75">Custom</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-4">
                {subscriptionTier === 'free' ? (
                  <div className="text-center p-12">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-5xl mb-4 mx-auto animate-bounce-in">
                      🔒
                    </div>
                    <h3 className="text-xl font-bold mb-2">Кастомные стикеры недоступны</h3>
                    <p className="text-muted-foreground mb-6">
                      Оформи подписку, чтобы создавать свои уникальные стикеры!
                    </p>
                    <Button className="rounded-xl">
                      <Icon name="Crown" size={18} className="mr-2" />
                      Оформить подписку
                    </Button>
                  </div>
                ) : customStickers.length === 0 ? (
                  <div className="text-center p-12">
                    <div className="text-6xl mb-4">🎨</div>
                    <h3 className="text-xl font-bold mb-2">У вас пока нет стикеров</h3>
                    <p className="text-muted-foreground">Создайте свой первый кастомный стикер!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-6 gap-4">
                    {customStickers.map((sticker) => (
                      <div
                        key={sticker.id}
                        className="p-4 border border-border rounded-2xl hover:border-primary transition-all group relative"
                      >
                        <button
                          onClick={() => deleteSticker(sticker.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Icon name="X" size={14} />
                        </button>
                        <div className="text-5xl mb-2 text-center">{sticker.emoji}</div>
                        <p className="text-xs text-center text-muted-foreground truncate">{sticker.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="create" className="space-y-6">
                {subscriptionTier === 'free' ? (
                  <div className="text-center p-12">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-5xl mb-4 mx-auto animate-bounce-in">
                      🔒
                    </div>
                    <h3 className="text-xl font-bold mb-2">Создание стикеров недоступно</h3>
                    <p className="text-muted-foreground mb-6">
                      Оформи подписку Базовый, Премиум или Элитный для создания своих стикеров!
                    </p>
                    <Button className="rounded-xl">
                      <Icon name="Crown" size={18} className="mr-2" />
                      Выбрать подписку
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="p-6 bg-muted rounded-2xl">
                      <h3 className="text-lg font-bold mb-4">Создать новый стикер</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Эмодзи (или текст)</label>
                          <Input
                            value={newStickerEmoji}
                            onChange={(e) => setNewStickerEmoji(e.target.value.slice(0, 5))}
                            placeholder="🐉 или любой символ"
                            className="text-3xl h-16 text-center bg-background border-none"
                            maxLength={5}
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Название стикера</label>
                          <Input
                            value={newStickerName}
                            onChange={(e) => setNewStickerName(e.target.value)}
                            placeholder="Например: Крутой дракон"
                            className="bg-background border-none"
                          />
                        </div>

                        <Button
                          className="w-full rounded-xl"
                          onClick={createSticker}
                          disabled={!newStickerEmoji || !newStickerName || !canCreateMore}
                        >
                          <Icon name="Plus" size={18} className="mr-2" />
                          {canCreateMore ? 'Создать стикер' : 'Достигнут лимит'}
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl">
                      <div className="flex items-start gap-3">
                        <Icon name="Info" size={20} className="text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold mb-1">Подсказки по созданию:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Используй любые эмодзи или комбинации</li>
                            <li>• Можно вводить текст (до 5 символов)</li>
                            <li>• Создавай уникальные стикеры для своего стиля</li>
                            <li>• Лимит: {maxStickers === 999999 ? 'неограничен' : `${maxStickers} стикеров`}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {subscriptionTier === 'basic' && (
                      <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/20 rounded-2xl">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                            💎
                          </div>
                          <div>
                            <p className="font-semibold mb-1">Хочешь больше стикеров?</p>
                            <p className="text-sm text-muted-foreground mb-2">
                              Перейди на Премиум (200 стикеров) или Элитный (без ограничений)!
                            </p>
                            <Button size="sm" variant="outline" className="rounded-xl">
                              Улучшить подписку
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
