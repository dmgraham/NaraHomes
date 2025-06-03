//Featured listening page

import { PropertyCard } from "@/components/PropertyCard";
import FeaturedListingsFooter from "./Footer";
import { PropertyListing } from "@/types/PropertyListing";

import { Search, MapPin, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

//Using a basic get to mock featured properties
export default async function Home() {
  const response = await fetch(
    "http://localhost:3000/api/listings?pageSize=9&pageNumber=2",
    {
      method: "GET",
      cache: "force-cache", // Keep featured listings cached for 24 hours
      next: { revalidate: 60 * 60 * 24 },
    }
  );
  let properties: PropertyListing[] = [];

  if (response.ok) {
    const responseData = await response.json();
    properties = responseData.data;
  }

  //I Made these up.
  const stats = [
    { icon: Users, label: "Properties Listed", value: "1,247" },
    { icon: TrendingUp, label: "Happy Clients", value: "3,892" },
    { icon: MapPin, label: "Properties Sold", value: "2,156" },
    { icon: Search, label: "Cities Covered", value: "45" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Featured Properties Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Featured Properties
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl">
                Handpicked properties that offer exceptional value and unique
                features. Each listing has been carefully selected for quality
                and location.
              </p>
            </div>
            <div className="flex gap-2 mt-6 md:mt-0">
              <Badge className="text-sm bg-sky-400 font-medium">
                {properties.length} Properties
              </Badge>
              <Badge
                variant="outline"
                className="text-sm border-gray-600 text-gray-300 hover:bg-white/5"
              >
                Updated Daily
              </Badge>
            </div>
          </div>

          {properties.length === 0 && (
            <p className="text-center text-gray-400 font-medium">
              There was an issue loading featured properties. Please try again
              later.
            </p>
          )}

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.propertyId} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-neutral-950 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center bg-black border-gray-800 "
              >
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-sky-400" />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FeaturedListingsFooter />
    </div>
  );
}
