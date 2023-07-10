document.addEventListener("DOMContentLoaded", () => {
  const apiURL = "https://goweather.herokuapp.com/weather/";
  const searchBox = document.querySelector(".search input");
  const searchBtn = document.getElementById("subBtn");
  const svgContainer = document.getElementById("svgContainer");

  async function fetchData(city) {
    try {
      // Show shimmer effect
      showShimmer();

      const response = await fetch(apiURL + city);
      const data = await response.json();
      console.log(data);

      // Remove shimmer effect
      hideShimmer();

      let imgsrc = "";
      if (
        data.description === "Light rain shower" ||
        data.description === "Light rain" ||
        data.description === "Light drizzle"
      ) {
        imgsrc = "../images/drizzle.png";
      } else if (data.description === "Clear" || data.description === "Sunny") {
        imgsrc = "../images/clear.png";
      } else if (data.description === "Partly cloudy") {
        imgsrc = "../images/clouds.png";
      } else if (data.description === "") {
        svgContainer.innerHTML = "No Data Found";
      }

      const cardContent = `
          <div id="weatherCard">
            <h2 class="city">${city}</h2>
            <p class="temp">${data.temperature}</p>
            <p class="wind">${data.wind}</p>
            <p class="desc">${data.description}</p>
            <img class="cardImg" src="${imgsrc}"/>
          </div>
        `;

      svgContainer.innerHTML = cardContent;
      searchBox.value = "";
    } catch (error) {
      console.error(error);
    }
  }

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetchData(searchBox.value);
  });

  function showShimmer() {
    svgContainer.innerHTML = ""; // Remove existing content
    svgContainer.classList.add("shimmer-card");
  }

  function hideShimmer() {
    svgContainer.classList.remove("shimmer-card");
  }
});
