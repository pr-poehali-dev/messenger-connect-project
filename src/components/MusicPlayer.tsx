import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  emoji: string;
}

const playlist: Track[] = [
  { id: 1, title: 'Neon Nights', artist: 'Cyber Dreams', duration: '3:45', emoji: '🌃' },
  { id: 2, title: 'Dragon Spirit', artist: 'Eastern Vibes', duration: '4:12', emoji: '🐉' },
  { id: 3, title: 'Tokyo Drift', artist: 'Speed Racing', duration: '3:28', emoji: '🏎️' },
  { id: 4, title: 'Cherry Blossom', artist: 'Sakura Flow', duration: '4:55', emoji: '🌸' },
  { id: 5, title: 'Mountain Echo', artist: 'Nature Sounds', duration: '5:20', emoji: '⛰️' },
  { id: 6, title: 'Game Over', artist: 'Pixel Beats', duration: '3:15', emoji: '🎮' },
];

interface MusicPlayerProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
  subscriptionTier: 'free' | 'basic' | 'premium' | 'elite';
}

export default function MusicPlayer({ isMinimized, onToggleMinimize, subscriptionTier }: MusicPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState<Track>(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);

  const canUseMusic = subscriptionTier !== 'free';

  useEffect(() => {
    if (!isPlaying || !canUseMusic) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= 100) {
          const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
          const nextTrack = playlist[(currentIndex + 1) % playlist.length];
          setCurrentTrack(nextTrack);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, canUseMusic]);

  const handlePlayPause = () => {
    if (!canUseMusic) return;
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track: Track) => {
    if (!canUseMusic) return;
    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 w-80 bg-card border border-border rounded-2xl shadow-2xl z-40 animate-slide-in-left">
        <div className="p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl animate-pulse-glow">
            {currentTrack.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate text-sm">{currentTrack.title}</p>
            <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePlayPause}
            className="rounded-xl flex-shrink-0"
            disabled={!canUseMusic}
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleMinimize}
            className="rounded-xl flex-shrink-0"
          >
            <Icon name="ChevronUp" size={20} />
          </Button>
        </div>
        {canUseMusic && (
          <div className="px-4 pb-3">
            <Slider
              value={[currentTime]}
              max={100}
              step={1}
              className="cursor-pointer"
              onValueChange={(value) => setCurrentTime(value[0])}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-card border border-border rounded-3xl shadow-2xl z-40 animate-slide-in-left overflow-hidden">
      {!canUseMusic && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex items-center justify-center flex-col gap-4 p-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl animate-bounce-in">
            🔒
          </div>
          <h3 className="text-xl font-bold text-center">Музыка недоступна</h3>
          <p className="text-sm text-muted-foreground text-center">
            Оформи подписку Базовый или выше, чтобы слушать музыку в чате!
          </p>
          <Button className="rounded-xl">
            <Icon name="Crown" size={18} className="mr-2" />
            Оформить подписку
          </Button>
        </div>
      )}

      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="Music" size={20} />
          </div>
          <h3 className="font-bold">Музыка</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onToggleMinimize} className="rounded-xl">
          <Icon name="ChevronDown" size={20} />
        </Button>
      </div>

      <div className="p-6 border-b border-border">
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-6xl mx-auto mb-4 animate-pulse-glow">
          {currentTrack.emoji}
        </div>
        <h4 className="text-lg font-bold text-center mb-1">{currentTrack.title}</h4>
        <p className="text-sm text-muted-foreground text-center mb-4">{currentTrack.artist}</p>

        <Slider
          value={[currentTime]}
          max={100}
          step={1}
          className="mb-2 cursor-pointer"
          onValueChange={(value) => setCurrentTime(value[0])}
          disabled={!canUseMusic}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{Math.floor(currentTime / 4)}:{String(Math.floor((currentTime % 4) * 15)).padStart(2, '0')}</span>
          <span>{currentTrack.duration}</span>
        </div>
      </div>

      <div className="p-4 flex items-center justify-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl" disabled={!canUseMusic}>
          <Icon name="SkipBack" size={20} />
        </Button>
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90"
          onClick={handlePlayPause}
          disabled={!canUseMusic}
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl" disabled={!canUseMusic}>
          <Icon name="SkipForward" size={20} />
        </Button>
      </div>

      <div className="px-6 pb-4 flex items-center gap-3">
        <Icon name="Volume2" size={18} className="text-muted-foreground" />
        <Slider
          value={[volume]}
          max={100}
          step={1}
          className="flex-1 cursor-pointer"
          onValueChange={(value) => setVolume(value[0])}
          disabled={!canUseMusic}
        />
        <span className="text-xs text-muted-foreground w-8 text-right">{volume}%</span>
      </div>

      <ScrollArea className="max-h-48 border-t border-border">
        <div className="p-4 space-y-2">
          {playlist.map((track) => (
            <div
              key={track.id}
              onClick={() => handleTrackSelect(track)}
              className={`p-3 rounded-xl cursor-pointer transition-all hover:bg-muted flex items-center gap-3 ${
                currentTrack.id === track.id ? 'bg-primary/10 border border-primary/20' : ''
              } ${!canUseMusic ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-xl">
                {track.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{track.title}</p>
                <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
              </div>
              <span className="text-xs text-muted-foreground">{track.duration}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
