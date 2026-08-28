const searchForm = document.getElementById("search-form");

const searchInput = document.getElementById("search-input");

const searchResults = document.getElementById("search-results");

const searchMessage = document.getElementById("search-message");


searchForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const searchTerm = searchInput.value
        .trim()
        .toLowerCase();


    // Check if search is empty

    if (searchTerm === "") {

        searchMessage.textContent =
            "Please enter something to search.";

        searchResults.innerHTML = "";

        return;

    }


    // Search through wines

    const results = wines.filter(wine => {

        return (
            wine.name.toLowerCase().includes(searchTerm) ||

            wine.category.toLowerCase().includes(searchTerm) ||

            wine.origin.toLowerCase().includes(searchTerm) ||

            wine.description.toLowerCase().includes(searchTerm)
        );

    });


    // Display results

    displaySearchResults(results, searchTerm);

});

function displaySearchResults(results, searchTerm) {

    if (results.length === 0) {

        searchMessage.textContent =
            `No wines found for "${searchTerm}".`;


        searchResults.innerHTML = `

            <div class="search-empty">

                <h3>
                    No Results Found
                </h3>

                <p>
                    Try searching for another wine,
                    category or country.
                </p>

            </div>

        `;

        return;

    }


    searchMessage.textContent =
        `${results.length} wine(s) found for "${searchTerm}".`;


    searchResults.innerHTML = results
        .map(wine => {

            return `

                <div class="search-result-card">

                    <div class="search-result-image">

                        <img
                            src="${wine.image}"
                            alt="${wine.name}"
                        >

                    </div>


                    <div class="search-result-info">

                        <p class="search-result-category">

                            ${wine.category}

                        </p>


                        <h3 class="search-result-name">

                            ${wine.name}

                        </h3>


                        <span class="search-result-price">

                            ₦${wine.price.toLocaleString()}

                        </span>


                        <a
                            href="product.html?id=${wine.id}"
                            class="search-result-link"
                        >

                            View Product

                        </a>

                    </div>

                </div>

            `;

        })
        .join("");

}

