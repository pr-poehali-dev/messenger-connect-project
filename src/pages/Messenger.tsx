import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import ProfileEditor from '@/components/ProfileEditor';
import VideoCall from '@/components/VideoCall';
import SubscriptionPanel from '@/components/SubscriptionPanel';
import StickerCreator from '@/components/StickerCreator';
import MusicPlayer from '@/components/MusicPlayer';
import WallpaperGallery from '@/components/WallpaperGallery';
import { getDragonRank } from '@/utils/ratingSystem';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
  rating?: number;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
  isVoice?: boolean;
  duration?: string;
}

const mockChats: Chat[] = [
  { id: 1, name: 'Игровая команда 🎮', lastMessage: 'Го в рейд вечером?', time: '15:42', unread: 3, online: true, avatar: '🎯', rating: 12500 },
  { id: 2, name: 'Мама', lastMessage: 'Не забудь поесть!', time: '14:20', unread: 0, online: true, avatar: '❤️', rating: 450 },
  { id: 3, name: 'Рабочий чат', lastMessage: 'Митинг в 16:00', time: '13:15', unread: 5, online: false, avatar: '💼', rating: 2800 },
  { id: 4, name: 'Лучший друг', lastMessage: 'Видел новый трейлер?', time: '12:08', unread: 1, online: true, avatar: '🤘', rating: 7500 },
  { id: 5, name: 'Киноклуб 🎬', lastMessage: 'Кто за хоррор в пятницу?', time: '11:30', unread: 0, online: false, avatar: '🍿', rating: 350 },
];

const mockMessages: Message[] = [
  { id: 1, text: 'Привет! Как дела?', sender: 'other', time: '15:30' },
  { id: 2, text: 'Отлично! Играл весь день 😄', sender: 'me', time: '15:32' },
  { id: 3, text: 'Во что играл?', sender: 'other', time: '15:33' },
  { id: 4, text: '', sender: 'me', time: '15:35', isVoice: true, duration: '0:23' },
  { id: 5, text: 'Звучит круто! Можно сегодня?', sender: 'other', time: '15:36' },
  { id: 6, text: 'Го в рейд вечером? 🎮', sender: 'other', time: '15:42' },
];

export default function Messenger() {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'profile' | 'settings' | 'notifications' | 'gallery'>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat>(mockChats[0]);
  const [messages] = useState<Message[]>(mockMessages);
  const [messageInput, setMessageInput] = useState('');
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'gaming' | 'chinese' | 'american'>('gaming');
  const [callState, setCallState] = useState<{ active: boolean; isVideo: boolean } | null>(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<'free' | 'basic' | 'premium' | 'elite'>('premium');
  const [showStickers, setShowStickers] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [isMusicMinimized, setIsMusicMinimized] = useState(false);
  const [showWallpapers, setShowWallpapers] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState(1);
  const [userRating] = useState(12500);

  const userDragonRank = getDragonRank(userRating);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-chinese', 'theme-american');
    if (currentTheme !== 'gaming') {
      root.classList.add(`theme-${currentTheme}`);
    }
  }, [currentTheme]);

  const handleThemeChange = (theme: 'gaming' | 'chinese' | 'american') => {
    setCurrentTheme(theme);
  };

  const startCall = (isVideo: boolean) => {
    setCallState({ active: true, isVideo });
  };

  const endCall = () => {
    setCallState(null);
  };

  const handleWallpaperChange = (wallpaperId: number) => {
    setCurrentWallpaper(wallpaperId);
  };

  const selectedWallpaper = [1, 2, 3, 4, 5, 6, 7, 8, 9].find(id => id === currentWallpaper) || 1;
  const wallpaperGradients = [
    'from-slate-900 via-slate-800 to-slate-900',
    'from-orange-900 via-red-800 to-purple-900',
    'from-green-900 via-emerald-800 to-teal-900',
    'from-red-900 via-amber-800 to-orange-900',
    'from-pink-900 via-rose-800 to-purple-900',
    'from-blue-900 via-indigo-800 to-purple-900',
    'from-yellow-900 via-orange-800 to-red-900',
    'from-indigo-950 via-blue-900 to-slate-900',
    'from-gray-800 via-slate-700 to-zinc-800'
  ];

  const tabs = [
    { id: 'chats' as const, icon: 'MessageCircle', label: 'Чаты' },
    { id: 'contacts' as const, icon: 'Users', label: 'Контакты' },
    { id: 'gallery' as const, icon: 'Images', label: 'Галерея' },
    { id: 'notifications' as const, icon: 'Bell', label: 'Уведомления' },
    { id: 'profile' as const, icon: 'User', label: 'Профиль' },
    { id: 'settings' as const, icon: 'Settings', label: 'Настройки' },
  ];

  return (
    <div className={`flex h-screen bg-gradient-to-br ${wallpaperGradients[selectedWallpaper - 1]}`}>
      <div className="w-20 bg-card border-r border-border flex flex-col items-center py-6 gap-6">
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center animate-pulse-glow">
          <span className="text-2xl">🚀</span>
        </div>
        
        <div className="flex-1 flex flex-col gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'text-muted-foreground hover:bg-muted'
              }`}
              title={tab.label}
            >
              <Icon name={tab.icon} size={24} />
            </button>
          ))}
        </div>

        <div className="relative">
          <div 
            className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setShowProfileEditor(true)}
          >
            <span className="text-xl">😎</span>
          </div>
          <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${userDragonRank.gradient} flex items-center justify-center border-2 border-card animate-pulse-glow`}>
            <span className="text-xs">{userDragonRank.emoji}</span>
          </div>
        </div>
      </div>

      <div className="w-80 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Icon name="MessageCircle" size={24} className="text-primary" />
            Чаты
          </h2>
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Поиск чатов..." 
              className="pl-10 bg-muted border-none"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {mockChats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-border cursor-pointer transition-all duration-300 hover:bg-muted animate-slide-in-left ${
                selectedChat.id === chat.id ? 'bg-muted' : ''
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl animate-bounce-in">
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-card animate-pulse-glow" />
                  )}
                  {chat.rating && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center">
                      <span className="text-xs">{getDragonRank(chat.rating).emoji}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
                
                {chat.unread > 0 && (
                  <Badge className="bg-primary animate-bounce-in">{chat.unread}</Badge>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl">
                {selectedChat.avatar}
              </div>
              {selectedChat.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-card animate-pulse" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{selectedChat.name}</h3>
                {selectedChat.rating && (
                  <div className={`flex items-center gap-1 text-xs ${getDragonRank(selectedChat.rating).color}`}>
                    <span>{getDragonRank(selectedChat.rating).emoji}</span>
                    <span className="font-semibold">{selectedChat.rating}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedChat.online ? '🟢 онлайн' : 'был(а) недавно'}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-muted rounded-xl" onClick={() => setShowMusicPlayer(!showMusicPlayer)}>
              <Icon name="Music" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted rounded-xl" onClick={() => setShowStickers(true)}>
              <Icon name="Sticker" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted rounded-xl" onClick={() => setShowWallpapers(true)}>
              <Icon name="Palette" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted rounded-xl" onClick={() => startCall(false)}>
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted rounded-xl" onClick={() => startCall(true)}>
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted rounded-xl" onClick={() => setShowSubscription(true)}>
              <Icon name="Crown" size={20} className="text-yellow-500" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} animate-bounce-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {message.isVoice ? (
                  <div className={`max-w-xs px-4 py-3 rounded-2xl flex items-center gap-3 ${
                    message.sender === 'me' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="w-8 h-8 rounded-full hover:bg-white/20"
                    >
                      <Icon name="Play" size={16} />
                    </Button>
                    <div className="flex-1 flex items-center gap-1">
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1 bg-current rounded-full animate-wiggle"
                          style={{ 
                            height: `${Math.random() * 20 + 10}px`,
                            animationDelay: `${i * 50}ms`
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs opacity-70">{message.duration}</span>
                  </div>
                ) : (
                  <div className={`max-w-xs px-4 py-3 rounded-2xl ${
                    message.sender === 'me' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">{message.time}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted">
              <Icon name="Smile" size={22} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted">
              <Icon name="Paperclip" size={22} />
            </Button>
            
            <Input 
              placeholder="Напиши сообщение..." 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 bg-muted border-none rounded-xl"
            />
            
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted animate-pulse-glow">
              <Icon name="Mic" size={22} className="text-primary" />
            </Button>
            <Button size="icon" className="rounded-xl bg-primary hover:bg-primary/90">
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>

      {showProfileEditor && (
        <ProfileEditor 
          onClose={() => setShowProfileEditor(false)}
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
        />
      )}

      {callState?.active && (
        <VideoCall
          onClose={endCall}
          contactName={selectedChat.name}
          contactAvatar={selectedChat.avatar}
          isVideo={callState.isVideo}
        />
      )}

      {showSubscription && (
        <SubscriptionPanel
          onClose={() => setShowSubscription(false)}
          currentSubscription={subscriptionTier}
          onSubscriptionChange={(tier) => {
            setSubscriptionTier(tier);
            setShowSubscription(false);
          }}
        />
      )}

      {showStickers && (
        <StickerCreator
          onClose={() => setShowStickers(false)}
          subscriptionTier={subscriptionTier}
        />
      )}

      {showWallpapers && (
        <WallpaperGallery
          onClose={() => setShowWallpapers(false)}
          currentWallpaper={currentWallpaper}
          onWallpaperChange={handleWallpaperChange}
          subscriptionTier={subscriptionTier}
        />
      )}

      {showMusicPlayer && (
        <MusicPlayer
          isMinimized={isMusicMinimized}
          onToggleMinimize={() => setIsMusicMinimized(!isMusicMinimized)}
          subscriptionTier={subscriptionTier}
        />
      )}
    </div>
  );
}