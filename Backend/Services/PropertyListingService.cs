using Backend.DTO;
using Backend.Models;
using Backend.Services.Interfaces;
using Backend.Utils;

namespace Backend.Services
{
    public class PropertyListingService : IPropertyListingService
    {
        // In-memory store of property listings
        private static List<PropertyListing> _propertyListings = new List<PropertyListing>();

        public PropertyListingService()
        {
            // Initialize with 100 random listings
            _propertyListings = GenerateRandomListings(100);         
        }

        // Method to generate random listings 
        private static List<PropertyListing> GenerateRandomListings(int count)
        {
            var random = new Random();
            var listings = new List<PropertyListing>();

            var sampleAddressesCount = SampleHomeInfo.Addresses.Length;
            var sampleImagesCount = SampleHomeInfo.ImageUrls.Length;
            var sampleTitlesCount = SampleHomeInfo.Titles.Length;

            for (int i = 1; i <= count; i++)
            {
                var propertyListing = new PropertyListing()
                {
                    PropertyId = i,
                    Title = SampleHomeInfo.Titles[random.Next(sampleTitlesCount)],
                    Price = random.Next(100000, 2000000),  // Random price between 100k and 2M
                    Bedrooms = random.Next(1, 5),
                    Bathrooms = random.Next(1, 3),
                    SqFt = random.Next(500, 4000),
                    Description = $"This is a random description for property {i}.",
                    Address = SampleHomeInfo.Addresses[random.Next(sampleAddressesCount)],
                    ListingDate = DateTime.Now.AddDays(-random.Next(0, 30)),
                    PropertyType = (PropertyTypeEnum)random.Next(1, 10),
                    ImageUrl = SampleHomeInfo.ImageUrls[random.Next(sampleImagesCount)]
                };
                listings.Add(propertyListing);
            }
   
            return listings;           
        }

        public PropertyListing GetListingById(int propertyId)
        {
            return _propertyListings.FirstOrDefault(p => p.PropertyId == propertyId);
        }

        public PaginatedList<PropertyListing> GetPaginatedListings(int pageNumber, int pageSize)
        {
            var paginatedProperties = PaginatedList<PropertyListing>.CreatePaginatedList(_propertyListings, pageNumber, pageSize);
            return paginatedProperties;
        }

        public PaginatedList<PropertyListing> SearchListings(PropertySearchFilter searchFilter, int pageNumber, int pageSize)
        {

            if(searchFilter == null)
                return PaginatedList<PropertyListing>.CreatePaginatedList(_propertyListings, pageNumber, pageSize);

            var filteredListings = _propertyListings
                .Where(p =>
                    (!searchFilter.MinPrice.HasValue || p.Price >= searchFilter.MinPrice.Value) &&
                    (!searchFilter.MaxPrice.HasValue || p.Price <= searchFilter.MaxPrice.Value) &&
                    (!searchFilter.Bedrooms.HasValue || p.Bedrooms == searchFilter.Bedrooms.Value) &&
                    (!searchFilter.Bathrooms.HasValue || p.Bathrooms == searchFilter.Bathrooms.Value) &&
                    (!searchFilter.MinSqft.HasValue || p.SqFt >= searchFilter.MinSqft.Value) &&
                    (!searchFilter.MaxSqft.HasValue || p.SqFt <= searchFilter.MaxSqft.Value)
                ).ToList();

            var paginatedSearchListings = PaginatedList<PropertyListing>.CreatePaginatedList(filteredListings, pageNumber, pageSize);
            return paginatedSearchListings;
        }
    }
}
