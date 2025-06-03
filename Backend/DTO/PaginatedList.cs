namespace Backend.DTO
{
    public class PaginatedList<T>
    {
        /// <summary>
        /// Total Number of items 
        /// </summary>
        public int Count { get; set; }
        public List<T> Data { get; set; } = new List<T>();

        public PaginatedList(List<T> data, int count)
        {
            this.Count = count;
            this.Data = data;
        }

        public static PaginatedList<T> CreatePaginatedList(IEnumerable<T> source, int pageNumber, int pageSize)
        {
            var totalItems = source.Count();

            var paginatedData = source
                        .Skip((pageNumber - 1) * pageSize)
                        .Take(pageSize)
                        .ToList();

            var paginatedList = new PaginatedList<T>(paginatedData, totalItems);
            return paginatedList;

        }

    }




}
