using Newtonsoft.Json;

namespace ClimaRes.Models
{
    public class Helper
    {
        HttpMessageHandler HandlerClima;
        public string Error { get; set; }
        string DirBase;
        string StatusCode = "";
        Clima DatosClima;
        List<DatosRequeridos> Lista = new List<DatosRequeridos>();

        public async Task<List<DatosRequeridos>> ComsumeAPIDatosClima(string Ciudad)
        {
            HandlerClima = new HttpClientHandler();
            DirBase = "https://api.openweathermap.org/data/2.5/";
            string SolicitudClienteURI = "weather?appid=b104c5417379e22e55d5b05d48aff82c&units=metric&lang=sp&q=" + Ciudad;
            try
            {
                using (var Cliente = new HttpClient(HandlerClima))
                {
                    Cliente.BaseAddress = new Uri(DirBase);
                    Cliente.DefaultRequestHeaders.Accept.Clear();
                    Cliente.DefaultRequestHeaders.Accept.Add(
                        new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue
                        ("application/Json"));

                    HttpResponseMessage respuesta = await Cliente.GetAsync($"{SolicitudClienteURI}");
                    StatusCode = respuesta.StatusCode.ToString();
                    respuesta.EnsureSuccessStatusCode();

                    if (respuesta.IsSuccessStatusCode)
                    {
                        var jsoncadena = await respuesta.Content.ReadAsStringAsync();
                        DatosClima = JsonConvert.DeserializeObject<Clima>(jsoncadena);

                        //Llenamos la lista, un solo elemento en la Lista
                        DatosRequeridos Dr = new DatosRequeridos
                        {
                            ClimaCiudad = DatosClima.name,
                            ClimaDescripcion = DatosClima.weather[0].description,
                            Temperatura = DatosClima.main.temp.ToString(),
                            Viento = DatosClima.wind.speed.ToString(),
                            PorcentajeNubes = DatosClima.clouds.all.ToString(),
                            PorcentajeHumedad = DatosClima.main.humidity.ToString(),
                            Imagen = "https://openweathermap.org/img/wn/" + DatosClima.weather[0].icon + "@2x.png",
                            Amanecer = DatosClima.sys.sunrise.ToString(),
                            Ocaso = DatosClima.sys.sunset.ToString()
                        };
                        Lista.Add(Dr);
                    }
                    else
                    {
                        Error = "Se ha producido un error al solicitar el Servicio Web";
                        throw new Exception();
                    }
                }
            }
            catch (Exception)
            {
                Error = StatusCode;
            }

            return (Lista);
        }
    }
}
