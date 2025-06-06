"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from "lucide-react";
import { useQueryState, parseAsInteger, parseAsArrayOf } from "nuqs";

export default function PropertySearchBar({
  setSearchUrl,
}: {
  setSearchUrl: (url: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State for form values
  const [minPrice, setMinPrice] = useQueryState(
    "minPrice",
    parseAsArrayOf(parseAsInteger).withDefault([0])
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    "maxPrice",
    parseAsArrayOf(parseAsInteger).withDefault([2000000])
  );
  const [bedrooms, setBedrooms] = useQueryState("bedrooms", {
    defaultValue: "any",
  });
  const [bathrooms, setBathrooms] = useQueryState("bathrooms", {
    defaultValue: "any",
  });
  const [minSqft, setMinSqft] = useQueryState(
    "minSqft",
    parseAsArrayOf(parseAsInteger).withDefault([500])
  );
  const [maxSqft, setMaxSqft] = useQueryState(
    "maxSqft",
    parseAsArrayOf(parseAsInteger).withDefault([5000])
  );

  // Handle search submission
  const handleSearch = () => {
    const updates = {
      minPrice: minPrice[0] > 0 ? minPrice[0].toString() : null,
      maxPrice: maxPrice[0] < 2000000 ? maxPrice[0].toString() : null,
      bedrooms: bedrooms !== "any" ? bedrooms : null,
      bathrooms: bathrooms !== "any" ? bathrooms : null,
      minSqft: minSqft[0] > 500 ? minSqft[0].toString() : null,
      maxSqft: maxSqft[0] < 5000 ? maxSqft[0].toString() : null,
    };

    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "0") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    router.push(pathname + (queryString ? "?" + queryString : ""), {
      scroll: false, // Prevent scrolling to top on search
    });
    setSearchUrl(queryString);
  };

  // Handle reset
  const handleReset = () => {
    setMinPrice([0]);
    setMaxPrice([2000000]);
    setBedrooms("any");
    setBathrooms("any");
    setMinSqft([500]);
    setMaxSqft([5000]);
    router.replace(pathname);
  };

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price.toLocaleString()}`;
  };

  // Format square footage for display
  const formatSqft = (sqft: number) => {
    return `${sqft.toLocaleString()} sq ft`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Properties
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Price Range */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Price Range</Label>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Min Price
                </Label>
                <Slider
                  value={minPrice}
                  onValueChange={setMinPrice}
                  max={2000000}
                  min={0}
                  step={25000}
                  className="mt-2"
                />
                <div className="text-sm text-muted-foreground mt-1">
                  {formatPrice(minPrice[0])}
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Max Price
                </Label>
                <Slider
                  value={maxPrice}
                  onValueChange={setMaxPrice}
                  max={2000000}
                  min={0}
                  step={25000}
                  className="mt-2"
                />
                <div className="text-sm text-muted-foreground mt-1">
                  {formatPrice(maxPrice[0])}
                </div>
              </div>
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="bedrooms" className="text-sm font-medium">
                Bedrooms
              </Label>
              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bathrooms" className="text-sm font-medium">
                Bathrooms
              </Label>
              <Select value={bathrooms} onValueChange={setBathrooms}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Square Footage Range */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Square Footage</Label>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Min Sq Ft
                </Label>
                <Slider
                  value={minSqft}
                  onValueChange={setMinSqft}
                  max={5000}
                  min={500}
                  step={100}
                  className="mt-2"
                />
                <div className="text-sm text-muted-foreground mt-1">
                  {formatSqft(minSqft[0])}
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Max Sq Ft
                </Label>
                <Slider
                  value={maxSqft}
                  onValueChange={setMaxSqft}
                  max={5000}
                  min={500}
                  step={100}
                  className="mt-2"
                />
                <div className="text-sm text-muted-foreground mt-1">
                  {formatSqft(maxSqft[0])}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={handleSearch} className="flex-1">
            <Search className="h-4 w-4 mr-2" />
            Search Properties
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
