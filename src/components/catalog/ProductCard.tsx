import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  price: number;
  imageAlt: string;
}

const ProductCard = ({ name, price, imageAlt }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-elegant transition-smooth">
      <CardHeader className="p-0">
        <div className="aspect-[4/3] bg-muted/40" aria-label={imageAlt} />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="font-medium mb-1">{name}</div>
        <div className="text-sm text-muted-foreground">₹ {price}</div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">Add to cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
