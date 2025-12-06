import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Frame {
  id: number;
  name: string;
  price: number;
  gradient: string;
  icon: string;
  isPremium: boolean;
}

const frames: Frame[] = [
  { id: 1, name: 'Стандарт', price: 0, gradient: 'from-gray-500 to-gray-600', icon: '⚫', isPremium: false },
  { id: 2, name: 'Золото', price: 100, gradient: 'from-yellow-400 to-yellow-600', icon: '🌟', isPremium: true },
  { id: 3, name: 'Алмаз', price: 500, gradient: 'from-cyan-400 to-blue-600', icon: '💎', isPremium: true },
  { id: 4, name: 'Огонь', price: 300, gradient: 'from-red-500 to-orange-600', icon: '🔥', isPremium: true },
  { id: 5, name: 'Космос', price: 800, gradient: 'from-purple-600 to-pink-600', icon: '🌌', isPremium: true },
  { id: 6, name: 'Радуга', price: 600, gradient: 'from-red-500 via-yellow-500 to-green-500', icon: '🌈', isPremium: true },
];

interface NFT {
  id: number;
  name: string;
  image: string;
  rarity: string;
}

const mockNFTs: NFT[] = [
  { id: 1, name: 'Cyber Punk #1234', image: '🤖', rarity: 'Rare' },
  { id: 2, name: 'Space Monkey #567', image: '🐵', rarity: 'Epic' },
  { id: 3, name: 'Dragon Soul #89', image: '🐉', rarity: 'Legendary' },
  { id: 4, name: 'Neon Cat #2345', image: '😺', rarity: 'Rare' },
];

interface ProfileEditorProps {
  onClose: () => void;
  currentTheme: 'gaming' | 'chinese' | 'american';
  onThemeChange: (theme: 'gaming' | 'chinese' | 'american') => void;
}

export default function ProfileEditor({ onClose, currentTheme, onThemeChange }: ProfileEditorProps) {
  const [selectedFrame, setSelectedFrame] = useState<Frame>(frames[0]);
  const [username, setUsername] = useState('Игрок#1337');
  const [status, setStatus] = useState('В игре 🎮');
  const [coins, setCoins] = useState(1500);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  const buyFrame = (frame: Frame) => {
    if (frame.price === 0 || coins >= frame.price) {
      setCoins(coins - frame.price);
      setSelectedFrame(frame);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-card border border-border rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedFrame.gradient} flex items-center justify-center p-1`}>
              <div className="w-full h-full rounded-xl bg-card flex items-center justify-center text-2xl">
                😎
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Профиль</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Coins" size={16} className="text-yellow-500" />
                <span className="font-semibold text-yellow-500">{coins}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
            <Icon name="X" size={24} />
          </Button>
        </div>

        <ScrollArea className="h-[calc(90vh-100px)]">
          <div className="p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="profile">Профиль</TabsTrigger>
                <TabsTrigger value="frames">Рамки</TabsTrigger>
                <TabsTrigger value="nft">NFT</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${selectedFrame.gradient} flex items-center justify-center p-2 animate-pulse-glow`}>
                    <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center text-6xl">
                      😎
                    </div>
                  </div>
                  <Badge className="bg-primary">{selectedFrame.name} {selectedFrame.icon}</Badge>
                  <Button variant="outline" className="rounded-xl">
                    <Icon name="Upload" size={18} className="mr-2" />
                    Загрузить фото
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Имя пользователя</Label>
                    <Input 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mt-2 bg-muted border-none rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Статус</Label>
                    <Input 
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="mt-2 bg-muted border-none rounded-xl"
                    />
                  </div>
                </div>

                {selectedNFT && (
                  <div className="p-4 bg-muted rounded-2xl">
                    <Label className="mb-2 block">Активный NFT аватар</Label>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl">
                        {selectedNFT.image}
                      </div>
                      <div>
                        <p className="font-semibold">{selectedNFT.name}</p>
                        <Badge variant="outline">{selectedNFT.rarity}</Badge>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedNFT(null)}
                        className="ml-auto"
                      >
                        Снять
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="frames" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Магазин рамок</h3>
                  <div className="flex items-center gap-2">
                    <Icon name="Coins" size={20} className="text-yellow-500" />
                    <span className="font-bold text-yellow-500">{coins}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {frames.map((frame) => (
                    <div 
                      key={frame.id}
                      className={`p-4 border-2 rounded-2xl cursor-pointer transition-all hover:scale-105 ${
                        selectedFrame.id === frame.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border bg-muted'
                      }`}
                      onClick={() => frame.price === 0 || selectedFrame.id === frame.id ? setSelectedFrame(frame) : null}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${frame.gradient} flex items-center justify-center p-1 animate-bounce-in`}>
                          <div className="w-full h-full rounded-xl bg-card flex items-center justify-center text-2xl">
                            {frame.icon}
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">{frame.name}</p>
                          {frame.isPremium && (
                            <div className="flex items-center justify-center gap-1 mt-1">
                              <Icon name="Coins" size={14} className="text-yellow-500" />
                              <span className="text-sm text-yellow-500">{frame.price}</span>
                            </div>
                          )}
                        </div>
                        {selectedFrame.id === frame.id ? (
                          <Badge className="bg-primary">Активна</Badge>
                        ) : frame.price > 0 ? (
                          <Button 
                            size="sm" 
                            className="w-full rounded-xl"
                            onClick={() => buyFrame(frame)}
                            disabled={coins < frame.price}
                          >
                            {coins < frame.price ? 'Недостаточно' : 'Купить'}
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="w-full rounded-xl">
                            Выбрать
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="nft" className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Моя NFT коллекция</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {mockNFTs.map((nft) => (
                    <div 
                      key={nft.id}
                      className={`p-4 border-2 rounded-2xl cursor-pointer transition-all hover:scale-105 ${
                        selectedNFT?.id === nft.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border bg-muted'
                      }`}
                      onClick={() => setSelectedNFT(nft)}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl animate-bounce-in">
                          {nft.image}
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-sm">{nft.name}</p>
                          <Badge variant="outline" className="mt-1">{nft.rarity}</Badge>
                        </div>
                        {selectedNFT?.id === nft.id && (
                          <Badge className="bg-primary">Активен</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-muted rounded-2xl mt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="Info" size={20} className="text-primary" />
                    <p className="font-semibold">Что такое NFT аватары?</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Используй свои NFT как уникальные аватары! Они будут видны всем в чатах и придадут твоему профилю эксклюзивность.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Темы оформления</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => onThemeChange('gaming')}
                      className={`p-4 border-2 rounded-2xl transition-all hover:scale-105 ${
                        currentTheme === 'gaming' ? 'border-primary bg-primary/10' : 'border-border bg-muted'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-3xl">
                          🎮
                        </div>
                        <p className="font-semibold">Игровой</p>
                        <p className="text-xs text-muted-foreground">Неоновый стиль</p>
                      </div>
                    </button>

                    <button
                      onClick={() => onThemeChange('chinese')}
                      className={`p-4 border-2 rounded-2xl transition-all hover:scale-105 ${
                        currentTheme === 'chinese' ? 'border-primary bg-primary/10' : 'border-border bg-muted'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl flex items-center justify-center text-3xl">
                          🏮
                        </div>
                        <p className="font-semibold">Китайский</p>
                        <p className="text-xs text-muted-foreground">Традиционный</p>
                      </div>
                    </button>

                    <button
                      onClick={() => onThemeChange('american')}
                      className={`p-4 border-2 rounded-2xl transition-all hover:scale-105 ${
                        currentTheme === 'american' ? 'border-primary bg-primary/10' : 'border-border bg-muted'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-red-500 rounded-2xl flex items-center justify-center text-3xl">
                          🗽
                        </div>
                        <p className="font-semibold">Американский</p>
                        <p className="text-xs text-muted-foreground">Современный</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-4">Приватность и анонимность</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Icon name="EyeOff" size={24} className="text-primary" />
                        <div>
                          <p className="font-semibold">Скрытый статус</p>
                          <p className="text-xs text-muted-foreground">Никто не увидит когда ты онлайн</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-muted-foreground rounded-full peer peer-checked:bg-primary transition-all"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Icon name="ShieldCheck" size={24} className="text-primary" />
                        <div>
                          <p className="font-semibold">Анонимный режим</p>
                          <p className="text-xs text-muted-foreground">Скрыть имя и аватар в группах</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-muted-foreground rounded-full peer peer-checked:bg-primary transition-all"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Icon name="Lock" size={24} className="text-primary" />
                        <div>
                          <p className="font-semibold">Шифрование сообщений</p>
                          <p className="text-xs text-muted-foreground">End-to-end encryption</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500">Включено</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Icon name="UserX" size={24} className="text-primary" />
                        <div>
                          <p className="font-semibold">Кто может писать</p>
                          <p className="text-xs text-muted-foreground">Только контакты</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        Изменить
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Zap" size={20} className="text-yellow-500" />
                    Дополнительно
                  </h3>
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Icon name="Bell" size={18} className="mr-2" />
                      Уведомления
                    </Button>
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Icon name="Moon" size={18} className="mr-2" />
                      Тёмная тема
                    </Button>
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Icon name="Globe" size={18} className="mr-2" />
                      Язык интерфейса
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex gap-3">
              <Button className="flex-1 rounded-xl" onClick={onClose}>
                Сохранить изменения
              </Button>
              <Button variant="outline" className="rounded-xl" onClick={onClose}>
                Отмена
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
