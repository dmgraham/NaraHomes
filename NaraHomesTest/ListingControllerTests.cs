using Backend.Controllers;
using Backend.DTO;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace NaraHomesTest
{
    public class ListingControllerTests
    {
        [Fact]
        public void ListingController_Search_ReturnsBadRequestResult()
        {
            // Arrange
            var mockListingService = new PropertyListingService();
            var controller = new ListingsController(mockListingService);

            var mockSearchFilter = new PropertySearchFilter()
            {
                MinPrice = 500000,
                MaxPrice = 300000, // Invalid: maxPrice < minPrice
            };

            // Act
            var invalidPriceRangeResult = controller.Search(mockSearchFilter, 1, 9);

            // Reset prices for next test
            mockSearchFilter.MinPrice = null; 
            mockSearchFilter.MaxPrice = null; 

            var invalidPageNumberResult = controller.Search(mockSearchFilter, -1, 15);

            // Assert
            Assert.IsType<BadRequestObjectResult>(invalidPriceRangeResult);
            Assert.IsType<BadRequestObjectResult>(invalidPageNumberResult);
        }

    }
}