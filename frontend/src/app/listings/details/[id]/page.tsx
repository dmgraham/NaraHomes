import PropertyDetailsClient from "./PropertyDetailsClient";
import { PropertyListing } from "@/types/PropertyListing";

async function fetchPropertyById(id: string): Promise<PropertyListing> {
  const response = await fetch(`http://localhost:3000/api/listings/${id}`, {
    cache: "force-cache",
    next: { revalidate: 60 * 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }

  return response.json();
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsObj = await params;
  const property = await fetchPropertyById(paramsObj.id);

  return <PropertyDetailsClient property={property} />;
}
