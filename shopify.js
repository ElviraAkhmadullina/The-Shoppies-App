// keep track of nominated movies
const nomMovies = [];
var canNominate = true;


function search() { 
    let s = searchbar.value;
    // display string in results div
    if (s == '')
        searchLabel.innerText = 'Results';
    else
        searchLabel.innerText = 'Results for "' + s + '"';
    let url = 'https://omdbapi.com/?s=' + s + '&apikey=996cc6c2';
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.onload = function() {
        show_results(request.response);
        return request.response;
    }
    request.send();
}

function show_results(resp) {
    // erase old results
    results.innerHTML = '';
    let j = 10;
    for (let i = 0; i < j; i++) {
        // if wrong index, continue to the next one
        try {
            let movie = resp.Search[i];
            if (movie.Type != 'movie') 
                j++;
            else {
                let movieStr = movie.Title + ' (' + movie.Year + ')';
                // list elements will be id'd as their i index when nominated
                results.innerHTML += '<li><a id="' + i + '"> ' + movieStr + ' </a><button id="btn' + i + '" class="nominate_btn" onclick="nominate(\'' + movieStr + '\', this)">Nominate</button></li>';
                // prevent adding duplicates (after a new search)
                if (nominations.innerHTML != '' && nomMovies.includes(movieStr))
                    document.getElementById(i).parentNode.children[1].disabled = true;
            }
        } finally { continue; }
    }
}

function nominate(movieStr, btn) {
    if (canNominate) {
        nomMovies.push(movieStr);
        // delete li element on button click
        nominations.innerHTML += '<li>' + movieStr + ' <button onclick="remove(this, \'' + btn.id + '\')">Remove</button></li>';
        // disable button when nominated
        btn.disabled = true;

        // display banner when 5 nominated
        if (nomMovies.length == 5) {
            nominationsLabel.innerHTML = '<span style="color:rgb(231, 105, 130)">Your 5 nominations are selected!</span>';
            canNominate = false;
        }
    }
}

function remove(elem, btnID) {
    // once a movie is removed, nominations are < 5
    if (nomMovies.length == 5) {
        canNominate = true;
        // revert normal label
        nominationsLabel.innerHTML = 'Nominations';
    }
    // remove item from results
    elem.parentNode.outerHTML = '';
    // don't disable button if results are gone
    let btn;
    if (btn = document.getElementById(btnID)) {
        // enable button again
        btn.disabled = false;
    }
    // remove movie from nominations list
    nomMovies.splice(nomMovies.indexOf(elem.parentNode.innerText), 1);
}

  

  
 