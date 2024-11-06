using ClimaRes.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Diagnostics;

namespace ClimaRes.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly Helper _helper;

        public HomeController(ILogger<HomeController> logger, Helper helper)
        {
            _logger = logger;
            _helper = helper;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public async Task<List<DatosRequeridos>> AlmacenaDatosClima(string Ciudad)
        {
            List<DatosRequeridos> Lista = new List<DatosRequeridos>();
            Lista = await _helper.ComsumeAPIDatosClima(Ciudad);
            return Lista;
        }
    }
}
