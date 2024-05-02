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
        });

    fetch('scripts/reviews.json')
        .then(response => response.json())
        .then(data => {
            reviewsData = data.reviews;
        });

    function showReviewsForTag(selectedTag) {
        const filteredReviews = reviewsData.filter(review => review.tags.includes(selectedTag));
        tagTitle.textContent = `Reviews for ${selectedTag}`;
        reviewContainer.innerHTML = filteredReviews.map(review => `
            <div class="review">
                <h3>${review.title}</h3>
                <p><strong>Username:</strong> ${review.username}</p>
                <p><strong>Date:</strong> ${review.date}</p>
                <p>${review.reviewText}</p>
                <a href="${review.link}" target="_blank">Read more</a>
            </div>
        `).join('');
        tagsContainer.style.display = 'none';
        reviewsDisplay.style.display = 'block';
    }

    window.goBack = function() {
        tagsContainer.style.display = 'block';
        reviewsDisplay.style.display = 'none';
    }
});
