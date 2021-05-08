$(document).ready(function () {
    var apikey = "3edea3a7";
  
    var result = "";
  
    $("#movieForm").submit(function (event) {
      event.preventDefault();
  
      var movie = $("#movie").val();
  
      var url = "https://www.omdbapi.com/?apikey=" + apikey;
  
      $.ajax({
        method: "GET",
        url: url + "&s=" + movie,
        success: function (data) {
          console.log("success", data);
          searchMovies(movie, data);
        },
      });
    });
  });
  
  function searchMovies(movie, data) {
    document.getElementById("result").innerHTML = "";
  
    var title = `<h4> results for '${movie}'</h4>`;
    $("#result").append(title);
  
    for (var i = 0; i < data.Search.length; i++) {
      result = `
      <div class = "item"> 
      <p>${data.Search[i].Title} (${data.Search[i].Year})</p>
      <button type="button" onClick="add(this.parentNode)" class="btn btn-outline-info">Nominate</button>
      </div>`;
      $("#result").append(result);
    }
  }

  function remove(element) {
    element.parentNode.removeChild(element);
  }
  
  function add(element) {
    console.log(element.children[0]);
    copyElement = `
    <div class = "item"> 
    ${element.children[0].innerHTML}
    <button type="button" onClick="remove(this.parentNode)" class="btn btn-outline-info">delete</button>
    </div>`;

  

      $("#nominations").append(copyElement);
  }
  
 