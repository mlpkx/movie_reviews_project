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
            console.log("Reviews Data Loaded", reviewsData);
        });

        function showReviewsForTag(selectedTag) {
            console.log("Selected Tag: ", selectedTag);  // Log the selected tag for debugging
        
            // Filter reviews that include the selected tag
            const filteredReviews = reviewsData.filter(review => review.tags.includes(selectedTag));
            console.log("Filtered Reviews: ", filteredReviews);  // Log the filtered reviews for debugging
        
            // Update the title to show which tag is being displayed
            tagTitle.textContent = `Reviews for ${selectedTag}`;
        
            // Generate HTML for each review and update the inner HTML of the reviewContainer
            reviewContainer.innerHTML = filteredReviews.map(review => `
                <div class="review">
                    <h3>${review.title}</h3>
                    <p><strong>Username:</strong> ${review.username}</p>
                    <p><strong>Date:</strong> ${review.date}</p>
                    <p>${review.reviewText}</p>
                    <a href="${review.link}" target="_blank">Read more</a>
                </div>
            `).join('');
        
            // Hide the tags container and show the reviews display
            tagsContainer.style.display = 'none';
            reviewsDisplay.style.display = 'block';
        }
        
        // Function to go back to the tags display from the reviews
        window.goBack = function() {
            tagsContainer.style.display = 'block';
            reviewsDisplay.style.display = 'none';
        }
        
});
