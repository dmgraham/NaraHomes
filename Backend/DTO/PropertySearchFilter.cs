namespace Backend.DTO
{
    public class PropertySearchFilter
    {
        public decimal? MinPrice { get; set; }   
        public decimal? MaxPrice { get; set; }      
        public int? Bedrooms { get; set; }   
        public int? Bathrooms { get; set; }   
        public int? MinSqft { get; set; }        
        public int? MaxSqft { get; set; }        
        public PropertyTypeEnum PropertyType { get; set; } 
    }
}
