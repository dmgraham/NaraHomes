import { Button } from "@/components/ui/button";

export default function FeaturedListingsFooter() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold mb-4">
          Ready to Find Your Perfect Home?
        </h3>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Get personalized recommendations and exclusive access to new listings
          before they hit the market.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-sky-400 hover:bg-sky-500">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
}
