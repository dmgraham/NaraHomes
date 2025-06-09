"use client";

import { useState, useEffect } from "react";
import { PropertyListing } from "@/types/PropertyListing";
import { PropertyCard } from "@/components/PropertyCard";
import { Card } from "@/components/ui/card";
import { Home } from "lucide-react";
import PropertyResultsLoading from "./PropertyResultsLoading";

interface PropertyListingSearchResults {
  count: number;
  data: PropertyListing[];
}

export default function PropertyResults({
  searchUrlParams,
}: {
  searchUrlParams: string;
}) {
  const [data, setData] = useState<PropertyListingSearchResults | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProperties = async () => {
      try {
        setData(null);

        const baseUrl = "http://localhost:3000/api/listings/search?";
        const url = `${baseUrl}${searchUrlParams}`;
        const response = await fetch(url, {
          cache: "no-store",
          signal,
        });

        if (!response.ok) {
          setData({ count: 0, data: [] }); // Fallback
          return;
        }

        const responseDataJson = await response.json();
        setData(responseDataJson);
      } catch (error) {
        if ((error as any).name === "AbortError") {
          // Request was aborted
          return;
        }
        console.error("Error fetching properties:", error);
        setData({ count: 0, data: [] }); // Fallback
      }
    };

    fetchProperties();

    return () => {
      controller.abort();
    };
  }, [searchUrlParams]);

  if (!data) return <PropertyResultsLoading />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <div className="text-muted-foreground">
          {data.count ?? 0} properties found
        </div>
      </div>

      {data.data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((property: PropertyListing) => (
            <PropertyCard key={property.propertyId} {...property} />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No properties found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria to find more properties.
          </p>
        </Card>
      )}
    </div>
  );
}
