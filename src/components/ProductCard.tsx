import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in">
      <div className="relative overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold font-montserrat mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          {product.description}
        </p>
        <p className="text-2xl font-bold font-montserrat">
          {product.price.toLocaleString('ru-RU')} ₽
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full group/btn"
          size="lg"
        >
          <Icon name="ShoppingCart" size={18} className="mr-2" />
          В корзину
          <Icon
            name="ArrowRight"
            size={18}
            className="ml-2 transition-transform group-hover/btn:translate-x-1"
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
