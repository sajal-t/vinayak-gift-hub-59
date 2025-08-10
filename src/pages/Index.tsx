import heroImage from "@/assets/hero-market.jpg";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/catalog/ProductCard";

const placeholderProducts = [
  { id: "1", name: "Fresh Oranges (1kg)", price: 79, imageAlt: "Fresh oranges from Vinayak Supermarket" },
  { id: "2", name: "Basmati Rice (5kg)", price: 549, imageAlt: "Premium basmati rice bag" },
  { id: "3", name: "Organic Tomatoes (1kg)", price: 59, imageAlt: "Organic tomatoes" },
  { id: "4", name: "Whole Wheat Atta (10kg)", price: 489, imageAlt: "Whole wheat atta pack" },
  { id: "5", name: "Cold Pressed Oil (1L)", price: 299, imageAlt: "Cold pressed cooking oil" },
  { id: "6", name: "Green Tea (100 bags)", price: 199, imageAlt: "Green tea box" },
  { id: "7", name: "Milk (1L)", price: 64, imageAlt: "Fresh milk packet" },
  { id: "8", name: "Brown Bread", price: 45, imageAlt: "Fresh brown bread loaf" },
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Vinayak Supermarket Online Store – Surat Hazira</title>
        <meta name="description" content="Browse and shop fresh groceries and essentials from Vinayak Supermarket in Surat Hazira. Fast, local, and reliable." />
        <link rel="canonical" href="/" />
      </Helmet>
      <section className="bg-hero-gradient">
        <div className="container mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Vinayak Supermarket, Surat Hazira
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Your neighborhood store, now online. Fresh produce, daily essentials, and trusted brands delivered.
            </p>
            <div className="flex gap-3">
              <Button variant="hero" asChild>
                <Link to="#catalog">Explore catalog</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/about">About us</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Fresh produce and groceries at Vinayak Supermarket"
              loading="lazy"
              className="w-full h-auto rounded-lg shadow-elegant"
            />
          </div>
        </div>
      </section>

      <section id="catalog" className="container mx-auto px-4 py-12">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold">Product catalog</h2>
          <p className="text-muted-foreground">Placeholder items to get you started</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {placeholderProducts.map((p) => (
            <ProductCard key={p.id} name={p.name} price={p.price} imageAlt={p.imageAlt} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Index;
