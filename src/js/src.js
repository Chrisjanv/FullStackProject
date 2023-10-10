// Navbar functionality
document.addEventListener("DOMContentLoaded", function () {
    const navbarLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("section");

    // Function to show the home section and hide other sections
    function showHome() {
        sections.forEach(function (section) {
            section.style.display = "none";
        });
        document.getElementById("home").style.display = "block";
    }

    // Add event listener for the "Home" button
    const homeButton = document.getElementById("home-link");
    homeButton.addEventListener("click", function (event) {
        event.preventDefault();
        showHome();
    });

    // Add event listeners to other navbar links
    navbarLinks.forEach(function (link) {
        const targetId = link.getAttribute("href").substring(1);
        link.addEventListener("click", function (event) {
            event.preventDefault();
            sections.forEach(function (section) {
                section.style.display = "none";
            });
            document.getElementById(targetId).style.display = "block";
        });
    });

    // Show the default home section when the page loads
    showHome();
});



// Contact Form 
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const feedbackDiv = document.getElementById("feedback");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        fetch("src/php/contact.php", {
            method: "POST",
            body: new FormData(contactForm),
        })
            .then(response => response.text())
            .then(data => {
                feedbackDiv.innerHTML = data;
            })
            .catch(error => {
                feedbackDiv.innerHTML = "An error occurred while processing your request.";
            });
    });
});

// Gallery

// Make an AJAX request to get image paths from the server
fetch('src/php/get_images.php')
    .then(response => response.json())
    .then(data => {
        // Extract image paths from the response
        const imagePaths = data.imagePaths;

        // Display images in the gallery section
        const gallery = document.getElementById('gallery');
        imagePaths.forEach(path => {
            const image = document.createElement('img');
            image.src = path;
            gallery.appendChild(image);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
