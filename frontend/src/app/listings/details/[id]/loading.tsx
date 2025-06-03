import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PropertyDetailLoading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-white/5"
          disabled
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Listings
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Property Image */}
          <Skeleton className="h-[300px] md:h-[400px] w-full rounded-lg mb-8 bg-gray-800" />

          {/* Property Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-6 w-24 bg-gray-800" />
              <Skeleton className="h-8 w-20 bg-gray-800" />
            </div>

            <Skeleton className="h-10 w-3/4 mb-2 bg-gray-800" />
            <Skeleton className="h-6 w-1/2 mb-4 bg-gray-800" />

            <div className="flex flex-wrap items-center gap-6 mb-6">
              <Skeleton className="h-10 w-32 bg-gray-800" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-20 bg-gray-800" />
                <Skeleton className="h-8 w-20 bg-gray-800" />
                <Skeleton className="h-8 w-20 bg-gray-800" />
              </div>
            </div>

            <Skeleton className="h-5 w-40 bg-gray-800" />
          </div>

          {/* Property Description */}
          <Skeleton className="h-64 w-full rounded-lg mb-8 bg-gray-800" />

          {/* Property Details */}
          <Skeleton className="h-80 w-full rounded-lg mb-8 bg-gray-800" />

          {/* Contact Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-12 w-full bg-gray-800" />
            <Skeleton className="h-12 w-full bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
