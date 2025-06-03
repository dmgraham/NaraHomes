using Backend.DTO;
using Backend.Services;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListingsController : ControllerBase
    {
        private readonly IPropertyListingService _propertyListingService;

        public ListingsController(IPropertyListingService propertyListingService)
        {
            _propertyListingService = propertyListingService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 9)
        {
            if (pageNumber < 1 || pageSize < 1 || pageSize > 100)
            {
                return BadRequest(new { error = "page and pageSize must be ≥ 1, and pageSize ≤ 100." });
            }
            var paginatedListings = _propertyListingService.GetPaginatedListings(pageNumber, pageSize);
            return Ok(paginatedListings); 
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id<0)
            {
                return BadRequest("Id Must be positive");
            }
            var listing = _propertyListingService.GetListingById(id);
            if (listing == null)
            {
                return NotFound();
            }
            return Ok(listing);
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] PropertySearchFilter searchFilter,
                             [FromQuery] int pageNumber = 1,
                             [FromQuery] int pageSize = 9)
        {
            if (searchFilter == null)
            {
                return BadRequest(new { error = "Search parameters required" });
            }

            if (pageNumber < 1 || pageSize < 1 || pageSize > 100)
            {
                return BadRequest(new { error = "page and pageSize must be ≥ 1, and pageSize ≤ 100." });
            }

            if (searchFilter.MinPrice.HasValue && searchFilter.MaxPrice.HasValue &&
                searchFilter.MaxPrice < searchFilter.MinPrice)
            {
                var errorMessage = $"maxPrice ({searchFilter.MaxPrice}) cannot be less than minPrice ({searchFilter.MinPrice}).";
                return BadRequest(new
                {
                    error = errorMessage,
                });
            }

            if (searchFilter.MinSqft.HasValue && searchFilter.MaxSqft.HasValue &&
                searchFilter.MaxSqft < searchFilter.MinSqft)
            {
                var errorMessage = $"maxSqft ({searchFilter.MaxSqft}) cannot be less than minSqft ({searchFilter.MinSqft}).";
                return BadRequest(new
                {
                    error = errorMessage,
                });
            }

            if (searchFilter.Bathrooms.HasValue && searchFilter.Bathrooms<0)
            {
                return BadRequest(new { error = "Bathrooms cannot be negative." });
            }

            if (searchFilter.Bedrooms.HasValue && searchFilter.Bedrooms < 0)
            {
                return BadRequest(new { error = "Bedrooms cannot be negative." });
            }


            var filteredListings = _propertyListingService.SearchListings(searchFilter, pageNumber, pageSize);
            return Ok(filteredListings);
        }
    }
}
