document.addEventListener('DOMContentLoaded', function() {
    const tagsContainer = document.getElementById('tagsContainer');
    const reviewsDisplay = document.getElementById('reviewsDisplay');
    const reviewContainer = document.getElementById('reviewContainer');
    const tagTitle = document.getElementById('tagTitle');

    let reviewsData = [];

    // Load tags and reviews data
    fetch('scripts/allTags.json')
        .then(response => response.json())
        .then(tags => {
            tags.forEach(tag => {
                const tagButton = document.createElement('button');
                tagButton.textContent = tag;
                tagButton.onclick = () => showReviewsForTag(tag);
                tagsContainer.appendChild(tagButton);
            });
        })
        .catch(error => console.error('Failed to load tags:', error));

    fetch('scripts/reviews.json')
        .then(response => response.json())
        .then(data => {
            reviewsData = data.reviews;
            console.log("Reviews Data Loaded", reviewsData);
        })
        .catch(error => console.error('Failed to load reviews:', error));
        function showReviewsForTag(selectedTag) {
            const filteredReviews = reviewsData.filter(review => review.tags.includes(selectedTag));
            tagTitle.textContent = `Reviews for ${selectedTag}`;
            reviewContainer.innerHTML = filteredReviews.map(review => {
                let movieClass = '';
                let posterSrc = '';
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
        

        window.goBack = function() {
            tagsContainer.style.display = 'block';
            reviewsDisplay.style.display = 'none';
        }
});
