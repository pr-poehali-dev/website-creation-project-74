import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer, { CartItem } from '@/components/CartDrawer';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function Delivery() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(items =>
      items.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const deliveryOptions = [
    {
      icon: 'Truck',
      title: 'Курьерская доставка',
      description: 'По Москве — от 300 ₽, бесплатно при заказе от 5000 ₽',
      details: 'Доставка осуществляется в течение 1-2 рабочих дней. Курьер свяжется с вами за час до приезда.'
    },
    {
      icon: 'Package',
      title: 'Пункт выдачи',
      description: 'Бесплатно в любой пункт выдачи',
      details: 'Более 5000 пунктов выдачи по всей России. Срок доставки 2-5 рабочих дней.'
    },
    {
      icon: 'MapPin',
      title: 'Самовывоз',
      description: 'Бесплатно из наших магазинов',
      details: 'Забрать заказ можно в день оформления. Адреса магазинов: ул. Тверская, 1; пр-т Мира, 50.'
    }
  ];

  const paymentMethods = [
    {
      icon: 'CreditCard',
      title: 'Банковская карта',
      description: 'Visa, MasterCard, МИР',
      details: 'Безопасная оплата через защищенное соединение. Данные карты не сохраняются.'
    },
    {
      icon: 'Smartphone',
      title: 'Электронные кошельки',
      description: 'ЮMoney, QIWI, WebMoney',
      details: 'Моментальное зачисление платежа после оплаты.'
    },
    {
      icon: 'Banknote',
      title: 'Наличные',
      description: 'При получении заказа',
      details: 'Оплата наличными курьеру или в пункте выдачи при получении товара.'
    }
  ];

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

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold font-montserrat mb-4 animate-fade-in">
            Доставка и оплата
          </h1>
          <p className="text-lg text-muted-foreground mb-12 animate-fade-in">
            Мы предлагаем удобные способы доставки и оплаты для вашего комфорта
          </p>

          <section className="mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold font-montserrat mb-8">Способы доставки</h2>
            <div className="grid gap-6">
              {deliveryOptions.map((option, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon name={option.icon as any} size={24} className="text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold font-montserrat mb-2">
                          {option.title}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {option.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {option.details}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-3xl font-bold font-montserrat mb-8">Способы оплаты</h2>
            <div className="grid gap-6">
              {paymentMethods.map((method, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon name={method.icon as any} size={24} className="text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold font-montserrat mb-2">
                          {method.title}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {method.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {method.details}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-bold font-montserrat mb-8">Частые вопросы</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-semibold">
                  Можно ли примерить товар перед покупкой?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, при курьерской доставке вы можете осмотреть товар перед оплатой. Если товар не подошёл, курьер заберёт его обратно.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-semibold">
                  Как долго хранится заказ в пункте выдачи?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Заказ хранится в пункте выдачи бесплатно в течение 7 дней. После этого срока заказ возвращается отправителю.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-semibold">
                  Можно ли вернуть товар?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, вы можете вернуть товар надлежащего качества в течение 14 дней с момента получения. Товар должен сохранить товарный вид и упаковку.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-semibold">
                  Есть ли гарантия на товары?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Все товары имеют официальную гарантию производителя сроком от 1 года. Гарантийный талон вы получите вместе с товаром.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </main>
    </div>
  );
}
