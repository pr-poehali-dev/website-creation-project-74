import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard, { Product } from '@/components/ProductCard';
import CartDrawer, { CartItem } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const products: Product[] = [
  {
    id: 1,
    name: 'Беспроводные наушники',
    price: 12990,
    image: 'https://cdn.poehali.dev/projects/f657592e-c11b-40d1-8d85-557397943ee3/files/c0727d58-5bbf-438f-91b6-be76ca5a38c8.jpg',
    description: 'Премиальное звучание с активным шумоподавлением'
  },
  {
    id: 2,
    name: 'Умные часы',
    price: 24990,
    image: 'https://cdn.poehali.dev/projects/f657592e-c11b-40d1-8d85-557397943ee3/files/bcd1a690-e665-435d-96ce-0a47b6021b2d.jpg',
    description: 'Отслеживание активности и здоровья 24/7'
  },
  {
    id: 3,
    name: 'Ноутбук Pro',
    price: 89990,
    image: 'https://cdn.poehali.dev/projects/f657592e-c11b-40d1-8d85-557397943ee3/files/ce9c75ae-caee-4ea0-870a-08cea447cc42.jpg',
    description: 'Мощный процессор для работы и творчества'
  }
];

export default function Index() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });

    toast({
      title: 'Добавлено в корзину',
      description: product.name,
      duration: 2000
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(items =>
      items.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: 'Товар удалён',
      description: 'Товар успешно удалён из корзины',
      duration: 2000
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold font-montserrat mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Минимализм в каждой детали
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              Премиальные гаджеты для тех, кто ценит качество и стиль
            </p>
            <Button size="lg" className="group text-lg px-8 py-6">
              Смотреть каталог
              <Icon
                name="ArrowDown"
                size={20}
                className="ml-2 transition-transform group-hover:translate-y-1"
              />
            </Button>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12 animate-fade-in">
          <div>
            <h2 className="text-4xl font-bold font-montserrat mb-2">Популярные товары</h2>
            <p className="text-muted-foreground">Лучшие предложения этого месяца</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary/10 via-background to-purple-500/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold font-montserrat text-center mb-16 animate-fade-in">
              Почему выбирают нас
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: 'Shield',
                  title: 'Гарантия качества',
                  description: 'Официальная гарантия на все товары от 1 года'
                },
                {
                  icon: 'Truck',
                  title: 'Быстрая доставка',
                  description: 'Доставка по Москве за 1-2 дня, по России за 2-5 дней'
                },
                {
                  icon: 'HeadphonesIcon',
                  title: 'Поддержка 24/7',
                  description: 'Ответим на все вопросы в любое время суток'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={feature.icon as any} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold font-montserrat mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold font-montserrat text-lg mb-4">ShopMinimal</h3>
              <p className="text-sm text-muted-foreground">
                Премиальные гаджеты для современной жизни
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Как заказать</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Оплата</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Доставка</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Вакансии</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (495) 123-45-67</li>
                <li>info@shopminimal.ru</li>
                <li>Москва, ул. Тверская, 1</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            © 2024 ShopMinimal. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
