import { PropertyListing } from "@/types/PropertyListing";
import { PropertyCard } from "@/components/PropertyCard";
import { Card } from "@/components/ui/card";
import { Home } from "lucide-react";

interface PropertyListingSearchResults {
  count: number;
  data: PropertyListing[];
}
export const dynamic = "force-dynamic";

async function fetchProperties(searchParams: {
  [key: string]: string | string[] | undefined;
}): Promise<PropertyListingSearchResults> {
  const baseUrl = "http://localhost:3000/api/listings/search";

  if (!searchParams || Object.keys(searchParams).length === 0) {
    const emptysearchResponse = await fetch(baseUrl);
    return emptysearchResponse.json();
  }

  const queryString = new URLSearchParams(searchParams).toString();
  const url = `${baseUrl}?${queryString}`;

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  return response.json();
}

export default async function PropertyResults({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const data = await fetchProperties(params);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <div className="text-muted-foreground">
          {data?.count ?? 0} properties found
        </div>
      </div>

      {data?.data?.length > 0 ? (
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
