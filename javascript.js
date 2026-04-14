document.addEventListener("DOMContentLoaded", function() {
    var dropdown = document.getElementById("supplementDropdown");
    var button = document.querySelector(".dropbtn");

    dropdown.style.display = "none";

    window.toggleDropdown = function() {
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        } else {
            dropdown.style.display = "block";
        }
    };

    var navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var targetId = link.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }

            dropdown.style.display = "none";
        });
    });

    window.addEventListener("click", function(event) {
        if (!dropdown.contains(event.target) && !event.target.closest('.dropbtn')) {
            dropdown.style.display = "none";
        }
    });
});

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.onload = function() {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
};