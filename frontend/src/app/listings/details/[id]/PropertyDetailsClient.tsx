"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  ArrowLeft,
  Bed,
  Bath,
  SquareIcon,
  MapPin,
  Calendar,
  Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PropertyListing } from "@/types/PropertyListing";
import { PropertyTypeEnum } from "@/types/enums/PropertyTypeEnum";

// Helper function to get property type name
const getPropertyTypeName = (type: PropertyTypeEnum): string => {
  return PropertyTypeEnum[type];
};

export default function PropertyDetailPage({
  property,
}: {
  property: PropertyListing;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  const formattedListingDate = format(property.listingDate, "MMMM d, yyyy");

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-white/5"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Listings
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Property Image */}
          <div className="relative bg-gray-900 mb-8 rounded-lg overflow-hidden">
            <div className="relative h-[300px] md:h-[400px] w-full">
              <img
                src={
                  property.imageUrl || "/placeholder.svg?height=600&width=800"
                }
                alt={property.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>
            </div>
          </div>

          {/* Property Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-sky-400 text-black hover:bg-sky-500 font-semibold text-sm py-1">
                {getPropertyTypeName(property.propertyType)}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className={`border-gray-700 ${
                  isFavorite
                    ? "text-red-500 hover:text-red-400"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={toggleFavorite}
              >
                <Heart
                  className={`h-4 w-4 mr-1 ${isFavorite ? "fill-red-500" : ""}`}
                />
                {isFavorite ? "Saved" : "Save"}
              </Button>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-gray-400 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.address}</span>
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="text-3xl md:text-4xl font-bold text-sky-400">
                {formattedPrice}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-white">
                    {property.bedrooms}{" "}
                    <span className="text-gray-400 text-sm">beds</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-white">
                    {property.bathrooms}{" "}
                    <span className="text-gray-400 text-sm">baths</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <SquareIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-white">
                    {property.sqFt.toLocaleString()}{" "}
                    <span className="text-gray-400 text-sm">sq ft</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center text-gray-400 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Listed on {formattedListingDate}</span>
            </div>
          </div>

          {/* Property Description */}
          <Card className="bg-gray-900 border-gray-800 p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              Property Description
            </h2>
            {property.description ? (
              <div className="text-gray-300 space-y-4">
                {property.description.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">No description available.</p>
            )}
          </Card>

          {/* Property Details */}
          <Card className="bg-gray-900 border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Property Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Price</span>
                <span className="text-white">{formattedPrice}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Property Type</span>
                <span className="text-white">
                  {getPropertyTypeName(property.propertyType)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Bedrooms</span>
                <span className="text-white">{property.bedrooms}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Bathrooms</span>
                <span className="text-white">{property.bathrooms}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Square Footage</span>
                <span className="text-white">
                  {property.sqFt.toLocaleString()} sq ft
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Listing Date</span>
                <span className="text-white">{formattedListingDate}</span>
              </div>
            </div>
          </Card>

          {/* Contact Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button className="bg-sky-400 hover:bg-sky-500 text-black font-semibold flex-1">
              Request a Viewing
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-white hover:bg-white/5 flex-1"
            >
              Contact Agent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
