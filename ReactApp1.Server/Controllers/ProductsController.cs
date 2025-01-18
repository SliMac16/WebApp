using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public ProductsController(AppDbContext dbContext) { _dbContext = dbContext; }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _dbContext.Products.ToList();
        }

        [HttpPost]
        public ActionResult<Product> AddProduct([FromBody] Product newProduct) 
        {
             _dbContext.Products.Add(newProduct);

            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = newProduct.Id }, newProduct);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteProduct(int id)
        {
            var product = _dbContext.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            _dbContext.Products.Remove(product);
            _dbContext.SaveChanges();
            return NoContent();
        }

        [HttpPut("{id}")]
        public ActionResult<Product> UpdateProduct(int id, [FromBody] Product updatedProduct)
        {
            if (id != updatedProduct.Id)
            {
                return BadRequest();
            }
            var product = _dbContext.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            product.Description = updatedProduct.Description;
            product.Image = updatedProduct.Image;
            _dbContext.SaveChanges();
            return NoContent();
        }
    }
}
