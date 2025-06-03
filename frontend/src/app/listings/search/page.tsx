import { Suspense } from "react";
import PropertySearch from "./PropertySearch";
import PropertyResultsLoading from "./PropertyResultsLoading";
import SearchResults from "./SearchResults";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Find Your Dream Home</h1>
        <p className="text-muted-foreground">
          Search through thousands of properties to find the perfect match
        </p>
      </div>

      <PropertySearch />
      <Suspense fallback={<PropertyResultsLoading />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
