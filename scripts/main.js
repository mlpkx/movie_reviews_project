document.addEventListener('DOMContentLoaded', function() {
    const tagsContainer = document.getElementById('tagsContainer');
    const reviewsDisplay = document.getElementById('reviewsDisplay');
    const reviewContainer = document.getElementById('reviewContainer');
    const tagTitle = document.getElementById('tagTitle');

    let reviewsData = [];
    let tagsLoaded = false;

    // Function to load tags if not already loaded
    function loadTags() {
        if (!tagsLoaded) {
            fetch('scripts/allTags.json')
                .then(response => response.json())
                .then(tags => {
                    tags.forEach(tag => {
                        const tagButton = document.createElement('button');
                        tagButton.textContent = tag;
                        tagButton.className = 'tag';  // Ensure CSS class is applied
                        tagButton.onclick = () => showReviewsForTag(tag);
                        tagsContainer.appendChild(tagButton);
                    });
                    tagsLoaded = true;
                })
                .catch(error => console.error('Failed to load tags:', error));
        }
    }

    // Fetch and store reviews data, then load tags
    fetch('scripts/reviews.json')
        .then(response => response.json())
        .then(data => {
            reviewsData = data.reviews;
            console.log("Reviews Data Loaded", reviewsData);
            loadTags(); // Load tags after ensuring reviews are loaded
        })
        .catch(error => console.error('Failed to load reviews:', error));

    // Function to display reviews for a selected tag
    function showReviewsForTag(selectedTag) {
        const introText = document.getElementById('introText');  
        introText.style.display = 'none';  // Hide the h2 intro element

        const filteredReviews = reviewsData.filter(review => review.tags.includes(selectedTag));
        tagTitle.textContent = `Reviews for ${selectedTag}`;
        reviewContainer.innerHTML = filteredReviews.map(review => {
            let movieClass = '';
            let posterSrc = '';
            // Handle different cases based on the movie title
            switch (review.movie) {
                case 'Double Happiness':
                    movieClass = 'double-happiness';
                    posterSrc = 'assets/doubleh.jpg';
                    break;
                case 'Saving Face':
                    movieClass = 'saving-face';
                    posterSrc = 'assets/savingf.jpg';
                    break;
                case 'Halving the Bones':
                    movieClass = 'halving-the-bones';
                    posterSrc = 'assets/halvingtheb.jpg';
                    break;
                case 'Picture Bride':
                    movieClass = 'picture-bride';
                    posterSrc = 'assets/pictureb.jpg';
                    break;
                case 'In Between Days':
                    movieClass = 'in-between-days';
                    posterSrc = 'assets/inbedays.jpg';
                    break;
            }
            return `
                <div class="review ${movieClass}">
                    <div class="review-header">
                        <h3>${review.title}</h3>
                        <img src="${posterSrc}" alt="${review.movie} Poster" class="review-poster">
                    </div>
                    <p><strong>Username:</strong> ${review.username}</p>
                    <p><strong>Date:</strong> ${review.date}</p>
                    <p>${review.reviewText}</p>
                    <a href="${review.link}" target="_blank">Read more</a>
                </div>
            `;
        }).join('');
        tagsContainer.style.display = 'none';
        reviewsDisplay.style.display = 'block';
    }

    // Function to navigate back to the tags display
    window.goBack = function() {
        tagsContainer.style.display = 'block';
        reviewsDisplay.style.display = 'none';
    }
});
