import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

interface VideoCallProps {
  onClose: () => void;
  contactName: string;
  contactAvatar: string;
  isVideo: boolean;
}

export default function VideoCall({ onClose, contactName, contactAvatar, isVideo }: VideoCallProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(isVideo);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/20 z-50 flex flex-col animate-fade-in">
      {isVideo && isVideoOn ? (
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-8xl mb-4 animate-pulse-glow">
                {contactAvatar}
              </div>
              <h2 className="text-3xl font-bold mb-2">{contactName}</h2>
              {isConnected ? (
                <p className="text-xl text-muted-foreground">{formatDuration(callDuration)}</p>
              ) : (
                <p className="text-xl text-muted-foreground animate-pulse">Соединение...</p>
              )}
            </div>
          </div>

          <div className="absolute top-6 right-6 w-40 h-52 bg-muted rounded-3xl overflow-hidden border-2 border-primary shadow-2xl animate-bounce-in">
            <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-6xl">
              😎
            </div>
          </div>

          <div className="absolute top-6 left-6 flex flex-col gap-3">
            <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-2xl">
              <p className="text-sm font-semibold">🔒 Зашифровано</p>
            </div>
            {isConnected && (
              <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-2xl animate-bounce-in">
                <p className="text-sm">⏱️ {formatDuration(callDuration)}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-8xl mb-8 animate-pulse-glow mx-auto">
              {contactAvatar}
            </div>
            <h2 className="text-4xl font-bold mb-4">{contactName}</h2>
            {isConnected ? (
              <>
                <p className="text-2xl text-green-500 mb-2">🟢 На связи</p>
                <p className="text-xl text-muted-foreground">{formatDuration(callDuration)}</p>
              </>
            ) : (
              <p className="text-2xl text-muted-foreground animate-pulse">Вызов... 📞</p>
            )}
          </div>
        </div>
      )}

      <div className="p-8 flex justify-center gap-6">
        <Button
          variant={isMuted ? "destructive" : "secondary"}
          size="lg"
          className="w-16 h-16 rounded-full"
          onClick={() => setIsMuted(!isMuted)}
        >
          <Icon name={isMuted ? "MicOff" : "Mic"} size={24} />
        </Button>

        {isVideo && (
          <Button
            variant={isVideoOn ? "secondary" : "destructive"}
            size="lg"
            className="w-16 h-16 rounded-full"
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            <Icon name={isVideoOn ? "Video" : "VideoOff"} size={24} />
          </Button>
        )}

        <Button
          variant={isSpeakerOn ? "secondary" : "outline"}
          size="lg"
          className="w-16 h-16 rounded-full"
          onClick={() => setIsSpeakerOn(!isSpeakerOn)}
        >
          <Icon name={isSpeakerOn ? "Volume2" : "VolumeX"} size={24} />
        </Button>

        <Button
          variant="destructive"
          size="lg"
          className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 animate-pulse-glow"
          onClick={handleEndCall}
        >
          <Icon name="PhoneOff" size={28} />
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="w-16 h-16 rounded-full"
        >
          <Icon name="MoreVertical" size={24} />
        </Button>
      </div>
    </div>
  );
}
