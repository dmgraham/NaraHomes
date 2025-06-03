using Backend.DTO;
using Backend.Models;

namespace Backend.Services.Interfaces
{
    public interface IPropertyListingService
    {
        public PropertyListing GetListingById(int _propertyId);
        public PaginatedList<PropertyListing> GetPaginatedListings(int pageNumber, int pageSize);
        public PaginatedList<PropertyListing> SearchListings(PropertySearchFilter searchFilter, int pageNumber, int pageSize);
    }
}
