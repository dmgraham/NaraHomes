namespace Backend.Models
{
    public class PropertyListing
    {
        public int PropertyId { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public int SqFt { get; set; }
        public string? Description { get; set; }
        public string Address { get; set; }
        public DateTime ListingDate { get; set; }

        // property type (e.g., House, Condo, Apartment)
        public PropertyTypeEnum PropertyType { get; set; }
        public string? ImageUrl { get; set; }
    }
}