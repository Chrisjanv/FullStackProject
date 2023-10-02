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

