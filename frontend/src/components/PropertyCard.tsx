"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import type { PropertyListing } from "@/types/PropertyListing";
import {
  Bed,
  Bath,
  SquareIcon as SquareFoot,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Heart,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function PropertyCard({
  propertyId,
  title,
  price,
  bedrooms,
  bathrooms,
  sqFt,
  description,
  address,
  listingDate,
  imageUrl = "/placeholder.svg?height=300&width=400",
}: PropertyListing) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

  const listedTimeAgo = formatDistanceToNow(listingDate, { addSuffix: true });

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <Link href={`/listings/details/${propertyId}`}>
          <div className="aspect-[4/3] relative overflow-hidden">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              className=" w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm",
              isFavorite ? "text-rose-500" : "text-muted-foreground"
            )}
            onClick={toggleFavorite}
          >
            <Heart className={cn("h-5 w-5", isFavorite && "fill-rose-500")} />
            <span className="sr-only">Add to favorites</span>
          </Button>
          <Badge className="absolute top-2 left-2 bg-sky-400 hover:bg-sky-500 text-white">
            {formattedPrice}
          </Badge>
        </Link>
      </div>

      <CardContent className="p-4">
        <h3 className="text-xl font-semibold line-clamp-1 mb-1">{title}</h3>

        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span className="truncate">{address}</span>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {bedrooms} {bedrooms === 1 ? "bed" : "beds"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {bathrooms} {bathrooms === 1 ? "bath" : "baths"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <SquareFoot className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{sqFt.toLocaleString()} sq ft</span>
          </div>
        </div>

        {description && (
          <div className="mb-3">
            <p
              className={cn(
                "text-sm text-muted-foreground",
                !showFullDescription && "line-clamp-2"
              )}
            >
              {description}
            </p>
            {description.length > 100 && (
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground mt-1"
                onClick={toggleDescription}
              >
                {showFullDescription ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" /> Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" /> Read more
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 py-3 border-t flex items-center text-xs text-muted-foreground">
        <Calendar className="h-3.5 w-3.5 mr-1.5" />
        <span>Listed {listedTimeAgo}</span>
      </CardFooter>
    </Card>
  );
}
