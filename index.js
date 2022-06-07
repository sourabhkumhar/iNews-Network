console.log("Welcome to iNews");

// Initialize the news api parameters
let apiKey = '0341080f799a4e5b9438cb005d2e049c';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const source = urlParams.get('sources');

// grab the news container
let newsAccordion = document.getElementById('newsAccordion');

// create an ajax get request
const xhr = new XMLHttpRequest();

xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);

// What to do when reponse is ready
xhr.onload = function () {
    if (this.status === 200/*error code*/) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);

        let newsHtml = "";
        articles.forEach(function(element, index) {

            let author = document.getElementById('publishBy');
            author.innerHTML = "by " + element['author'];
           
            let news = `<div class="card rounded-0">
            <div class="card-header border-0 p-3" id="heading${index}">
                <h6 class="">
                    <button class="collapsed btn btn-link text-decoration-none text-black" data-bs-toggle="collapse" href="#collapse${index}" type="button" aria-expanded="false" aria-controls="collapse${index}"><kbd class="bg-danger">Breaking News ${index + 1}:</kbd> &nbsp; ${element['title']}</button>
                </h6>
            </div>
            
            <div id="collapse${index}" class="collapse" aria-labelledbye="heading${index}">
                <div class="card card-body border-0">${element['description']}. <a target="_blank" href="${element['url']}">Read more here</a></div>
                </div>
            </div>`;
            newsHtml += news;    
    });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log('Some error occur');
    }
}

xhr.send();