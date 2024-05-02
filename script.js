document.addEventListener("DOMContentLoaded", function() {
    const tags = ["Family Dynamics", "Cultural Identity", "Urban Life", "Marriage", "Historical Context", "Women In Focus"];
    const tagsContainer = document.getElementById('tags-container');

    tags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagElement.addEventListener('click', () => loadReviews(tag));
        tagsContainer.appendChild(tagElement);
    });
});

function loadReviews(tag) {
    // Dummy function to simulate loading reviews based on the tag
    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = `<p>Loading reviews for "${tag}"...</p>`;
    // Here you would typically make an API call or filter data based on the tag
}
