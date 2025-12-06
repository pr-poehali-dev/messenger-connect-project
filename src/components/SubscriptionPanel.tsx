import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SubscriptionPanelProps {
  onClose: () => void;
  currentSubscription: 'free' | 'basic' | 'premium' | 'elite';
  onSubscriptionChange: (tier: 'free' | 'basic' | 'premium' | 'elite') => void;
}

const subscriptionTiers = [
  {
    id: 'free' as const,
    name: 'Бесплатный',
    price: 0,
    icon: '⚫',
    color: 'from-gray-500 to-gray-600',
    features: [
      'Обычные сообщения',
      'Голосовые звонки',
      'До 5 чатов',
      'Стандартные стикеры'
    ]
  },
  {
    id: 'basic' as const,
    name: 'Базовый',
    price: 199,
    icon: '💚',
    color: 'from-green-500 to-emerald-600',
    features: [
      'Всё из бесплатного',
      'Видеозвонки HD',
      'Неограниченные чаты',
      '50 кастомных стикеров',
      'Музыка в чатах'
    ]
  },
  {
    id: 'premium' as const,
    name: 'Премиум',
    price: 499,
    icon: '💎',
    color: 'from-blue-500 to-cyan-600',
    features: [
      'Всё из базового',
      'Видеозвонки 4K',
      '200 кастомных стикеров',
      'Эксклюзивные обои',
      'Без рекламы',
      'Приоритетная поддержка'
    ]
  },
  {
    id: 'elite' as const,
    name: 'Элитный',
    price: 999,
    icon: '🔥',
    color: 'from-red-500 to-orange-600',
    features: [
      'Всё из премиум',
      'Безлимитные стикеры',
      'Ранний доступ к функциям',
      'Персональный бейдж',
      'Эксклюзивные темы',
      'VIP статус'
    ]
  }
];

export default function SubscriptionPanel({ onClose, currentSubscription, onSubscriptionChange }: SubscriptionPanelProps) {
  const [selectedTier, setSelectedTier] = useState(currentSubscription);

  const handleSubscribe = () => {
    onSubscriptionChange(selectedTier);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-card border border-border rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
        <div className="p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/20 to-secondary/20">
          <div>
            <h2 className="text-3xl font-bold mb-1">Подписка Premium 👑</h2>
            <p className="text-muted-foreground">Выбери свой уровень и получи эксклюзивные возможности</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
            <Icon name="X" size={24} />
          </Button>
        </div>

        <ScrollArea className="h-[calc(90vh-120px)] p-6">
          <div className="grid grid-cols-2 gap-6">
            {subscriptionTiers.map((tier) => (
              <div
                key={tier.id}
                className={`p-6 border-2 rounded-3xl cursor-pointer transition-all hover:scale-105 ${
                  selectedTier === tier.id
                    ? 'border-primary bg-primary/10 shadow-xl'
                    : 'border-border bg-muted'
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center text-3xl animate-bounce-in`}>
                    {tier.icon}
                  </div>
                  {currentSubscription === tier.id && (
                    <Badge className="bg-primary">Текущий</Badge>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                
                {tier.price > 0 ? (
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{tier.price}₽</span>
                    <span className="text-muted-foreground">/месяц</span>
                  </div>
                ) : (
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-muted-foreground">Бесплатно</span>
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {selectedTier === tier.id && currentSubscription !== tier.id ? (
                  <Button className="w-full rounded-xl bg-primary hover:bg-primary/90">
                    {tier.price > 0 ? 'Оформить подписку' : 'Выбрать'}
                  </Button>
                ) : currentSubscription === tier.id ? (
                  <Button variant="outline" className="w-full rounded-xl" disabled>
                    Активна
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full rounded-xl">
                    Выбрать
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                <Icon name="Gift" size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Специальное предложение! 🎉</h4>
                <p className="text-muted-foreground mb-3">
                  Оформи годовую подписку и получи 2 месяца в подарок + эксклюзивную рамку для профиля!
                </p>
                <Button variant="outline" className="rounded-xl">
                  Узнать подробнее
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>

        {selectedTier !== currentSubscription && (
          <div className="p-4 border-t border-border flex gap-3">
            <Button className="flex-1 rounded-xl" onClick={handleSubscribe}>
              Подтвердить выбор
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
