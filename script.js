// js/script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        mobileToggle.innerHTML = navLinks.classList.contains('show') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Park data
    const parks = [
        {
            id: 1,
            name: "Central Park",
            location: "New York City, NY",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80",
            description: "Iconic urban park with lakes, trails, and recreational facilities.",
            amenities: ["Hiking", "Dog Friendly", "Picnic Area"],
            tags: ["hiking", "dog"]
        },
        {
            id: 2,
            name: "Forest Glen",
            location: "Portland, OR",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1768&q=80",
            description: "Lush forest park with waterfalls, wildlife, and camping facilities.",
            amenities: ["Camping", "Swimming", "Biking"],
            tags: ["hiking"]
        },
        {
            id: 3,
            name: "Riverside Park",
            location: "Austin, TX",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
            description: "Beautiful riverfront park with kayaking, fishing, and scenic trails.",
            amenities: ["Fishing", "Boating", "Playground"],
            tags: ["playground"]
        }
    ];

    // Testimonial data
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Nature Enthusiast",
            initials: "SJ",
            content: "ParkFinder helped me discover amazing parks I never knew existed right in my neighborhood. The reviews are honest and the photos are super helpful!"
        },
        {
            name: "Michael Rodriguez",
            role: "Father of Two",
            initials: "MR",
            content: "As a parent, it's so helpful to know which parks have the best playgrounds and restrooms. This app has saved me countless weekend mornings!"
        },
        {
            name: "Emily Parker",
            role: "ParkFinder Contributor",
            initials: "EP",
            content: "I love contributing to ParkFinder by adding new parks and updating information. It feels great to help build this community resource!"
        }
    ];

    // Load parks
    const parksContainer = document.getElementById('parksContainer');
    parks.forEach(park => {
        const parkCard = createParkCard(park);
        parksContainer.appendChild(parkCard);
    });

    // Load testimonials
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    testimonials.forEach(testimonial => {
        const testimonialCard = createTestimonialCard(testimonial);
        testimonialsContainer.appendChild(testimonialCard);
    });

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter parks
            const filter = this.dataset.filter;
            filterParks(filter);
        });
    });
    
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.querySelector('.search-container input');
    
    searchBtn.addEventListener('click', function() {
        performSearch(searchInput.value.trim());
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            performSearch(this.value.trim());
        }
    });
    
    // Park card click
    document.addEventListener('click', function(e) {
        if (e.target.closest('.park-card')) {
            const parkCard = e.target.closest('.park-card');
            const parkName = parkCard.querySelector('.park-title').textContent;
            alert(`Showing details for ${parkName}`);
        }
    });
});

// Create park card element
function createParkCard(park) {
    const parkCard = document.createElement('div');
    parkCard.className = 'park-card';
    
    const amenitiesHtml = park.amenities.map(amenity => 
        `<span class="amenity">${amenity}</span>`
    ).join('');
    
    parkCard.innerHTML = `
        <div class="park-img" style="background-image: url('${park.image}')"></div>
        <div class="park-content">
            <div class="park-header">
                <h3 class="park-title">${park.name}</h3>
                <div class="park-rating">
                    <i class="fas fa-star"></i> ${park.rating}
                </div>
            </div>
            <div class="park-location">
                <i class="fas fa-map-marker-alt"></i> ${park.location}
            </div>
            <p>${park.description}</p>
            <div class="park-amenities">
                ${amenitiesHtml}
            </div>
            <button class="btn btn-outline">View Details</button>
        </div>
    `;
    
    return parkCard;
}

// Create testimonial card element
function createTestimonialCard(testimonial) {
    const testimonialCard = document.createElement('div');
    testimonialCard.className = 'testimonial-card';
    
    testimonialCard.innerHTML = `
        <div class="testimonial-content">
            ${testimonial.content}
        </div>
        <div class="testimonial-author">
            <div class="author-img">${testimonial.initials}</div>
            <div class="author-info">
                <h4>${testimonial.name}</h4>
                <p>${testimonial.role}</p>
            </div>
        </div>
    `;
    
    return testimonialCard;
}

// Filter parks based on selected filter
function filterParks(filter) {
    const parksContainer = document.getElementById('parksContainer');
    parksContainer.innerHTML = '';
    
    const filteredParks = filter === 'all' 
        ? parks 
        : parks.filter(park => park.tags.includes(filter));
    
    filteredParks.forEach(park => {
        const parkCard = createParkCard(park);
        parksContainer.appendChild(parkCard);
    });
}

// Perform search functionality
function performSearch(query) {
    if (query !== '') {
        alert(`Searching for parks related to: "${query}"`);
        // In a real app, this would filter parks based on the query
    }
}