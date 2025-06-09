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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from "lucide-react";
import {
  useQueryState,
  parseAsInteger,
  parseAsArrayOf,
  parseAsBoolean,
} from "nuqs";
import { set } from "date-fns";

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

  const [isDrawerOpen, setIsDrawerOpen] = useQueryState(
    "drawerOpen",
    parseAsBoolean.withDefault(false)
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
    setIsDrawerOpen(false); // Close drawer after search
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

  // Count active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (minPrice[0] > 0) count++;
    if (maxPrice[0] < 2000000) count++;
    if (bedrooms !== "any") count++;
    if (bathrooms !== "any") count++;
    if (minSqft[0] > 500) count++;
    if (maxSqft[0] < 5000) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <>
      {/* Desktop View */}
      <Card className="w-full hidden md:block">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Properties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price Range */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Price Range</Label>
                <div className="space-y-4">
                  <div className="space-y-2">
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
                    <div className="text-sm text-muted-foreground">
                      {formatPrice(minPrice[0])}
                    </div>
                  </div>
                  <div className="space-y-2">
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
                    <div className="text-sm text-muted-foreground">
                      {formatPrice(maxPrice[0])}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Rooms</Label>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="bedrooms"
                      className="text-xs text-muted-foreground"
                    >
                      Bedrooms
                    </Label>
                    <Select value={bedrooms} onValueChange={setBedrooms}>
                      <SelectTrigger className="h-10 w-full">
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
                  <div className="space-y-2">
                    <Label
                      htmlFor="bathrooms"
                      className="text-xs text-muted-foreground"
                    >
                      Bathrooms
                    </Label>
                    <Select value={bathrooms} onValueChange={setBathrooms}>
                      <SelectTrigger className="h-10 w-full">
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
              </div>

              {/* Square Footage Range */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Square Footage</Label>
                <div className="space-y-4">
                  <div className="space-y-2">
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
                    <div className="text-sm text-muted-foreground">
                      {formatSqft(minSqft[0])}
                    </div>
                  </div>
                  <div className="space-y-2">
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
                    <div className="text-sm text-muted-foreground">
                      {formatSqft(maxSqft[0])}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button onClick={handleSearch} className="flex-1">
                <Search className="h-4 w-4 mr-2" />
                Search Properties
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="sm:w-auto"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile View */}
      <div className="md:hidden">
        <Card className="w-full">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Button onClick={handleSearch} className="flex-1" size="lg">
                <Search className="h-4 w-4 mr-2" />
                Search Properties
              </Button>

              <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="lg" className="relative px-4">
                    <SlidersHorizontal className="h-4 w-4" />
                    {activeFiltersCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full sm:w-[400px] overflow-y-auto p-6"
                >
                  <SheetHeader className="pb-6">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="flex items-center gap-2">
                        <SlidersHorizontal className="h-5 w-5" />
                        Search Filters
                      </SheetTitle>
                      <SheetClose asChild>
                        <Button variant="outline" size="lg">
                          <X className="h-4 w-4" />
                        </Button>
                      </SheetClose>
                    </div>
                  </SheetHeader>

                  {/* Mobile Filters Content */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      {/* Price Range */}
                      <div className="space-y-4">
                        <Label className="text-sm font-medium">
                          Price Range
                        </Label>
                        <div className="space-y-4">
                          <div className="space-y-2">
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
                            <div className="text-sm text-muted-foreground">
                              {formatPrice(minPrice[0])}
                            </div>
                          </div>
                          <div className="space-y-2">
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
                            <div className="text-sm text-muted-foreground">
                              {formatPrice(maxPrice[0])}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bedrooms & Bathrooms */}
                      <div className="space-y-4">
                        <Label className="text-sm font-medium">Rooms</Label>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="bedrooms"
                              className="text-xs text-muted-foreground"
                            >
                              Bedrooms
                            </Label>
                            <Select
                              value={bedrooms}
                              onValueChange={setBedrooms}
                            >
                              <SelectTrigger className="h-10 w-full">
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
                          <div className="space-y-2">
                            <Label
                              htmlFor="bathrooms"
                              className="text-xs text-muted-foreground"
                            >
                              Bathrooms
                            </Label>
                            <Select
                              value={bathrooms}
                              onValueChange={setBathrooms}
                            >
                              <SelectTrigger className="h-10 w-full">
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
                      </div>

                      {/* Square Footage Range */}
                      <div className="space-y-4">
                        <Label className="text-sm font-medium">
                          Square Footage
                        </Label>
                        <div className="space-y-4">
                          <div className="space-y-2">
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
                            <div className="text-sm text-muted-foreground">
                              {formatSqft(minSqft[0])}
                            </div>
                          </div>
                          <div className="space-y-2">
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
                            <div className="text-sm text-muted-foreground">
                              {formatSqft(maxSqft[0])}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 pt-6 border-t">
                      <Button onClick={handleSearch} size="lg">
                        <Search className="h-4 w-4 mr-2" />
                        Search Properties
                      </Button>
                      <Button variant="outline" onClick={handleReset} size="lg">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
