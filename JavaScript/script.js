
// KOD FÖR SIDORNA

const homeImage = document.getElementById("home-image")
const prevButton = document.getElementById("previous-picture")
const nextButton = document.getElementById("next-picture")
const getStartedButton = document.getElementById("getstarted")

// Home page bilder
const images = [
    "../images/home-picture1.jpg",
    "../images/home-picture2.jpg",
    "../images/home-picture3.jpg",
]
let currentIndex = 0

// Körs bara om next-knappen och bilden finns på sidan
if (nextButton && homeImage) {
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length
        homeImage.src = images[currentIndex]
    })
}

// Körs bara om previous-knappen och bilden finns
if (prevButton && homeImage) {
    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length
        homeImage.src = images[currentIndex]
    })
}

// Körs bara om Get Started knappen finns
if (getStartedButton) {
    getStartedButton.onclick = function () {
        window.location.href = "getstarted.html"
    }
}

// Tar emot kontakt email
function handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    alert("Thank you! Your message has been sent. We will contact you at " + email + " as soon as possible.");
    event.target.reset();
}

/* Login för get started */

function initLogin() {
    const currentLoginForm = document.getElementById("login-form");
    
    if (currentLoginForm) {
        currentLoginForm.addEventListener("submit", function(event) {
            event.preventDefault(); 
            
            const nameInput = document.getElementById("display-name");
            const currentLoginSection = document.getElementById("login-section");
            const currentEventSection = document.getElementById("event-section");
            const currentSubtitle = document.getElementById("page-subtitle");

            if (nameInput) {
                const displayName = nameInput.value;
                if (currentLoginSection) currentLoginSection.style.display = "none";
                if (currentEventSection) currentEventSection.style.display = "flex";
                if (currentSubtitle) currentSubtitle.textContent = "Welcome, " + displayName + "! Select your type of event";
            }
        });
    }

    // Aktivera val av event och skicka vidare till location.html
    const selectButtons = document.querySelectorAll(".select-btn");
    if (selectButtons) {
        selectButtons.forEach(button => {
            button.addEventListener("click", function() {
                const selectedEvent = this.getAttribute("data-event");
                
                // Spara valet tillfälligt i webbläsaren så location.html kan läsa det
                sessionStorage.setItem("chosenEvent", selectedEvent);
                
                // Skicka användaren till den nya sidan
                window.location.href = "location.html";
            });
        });
    }
}

// Säkerställ att skriptet väntar tills HTML är inläst ordentligt
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLogin);
} else {
    initLogin();
}

// Säkerställer att skriptet väntar tills HTML är inläst ordentligt
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLogin);
} else {
    initLogin();
}


document.addEventListener("DOMContentLoaded", function() {
    // Hämtar vilket event som valdes på förra sidan
    const chosenEvent = sessionStorage.getItem("chosenEvent") || "Event";
    document.getElementById("location-subtitle").textContent = "Select a venue in Täby for your " + chosenEvent;

    // Skapa kartan centrerad över Täby
    const map = L.map('map').setView([59.4439, 18.0687], 13);

    // Laddar in kartritningar
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Lokaler i Täby. Är nog lite fel kanske. Använde AI för att komma på dessa.
    const venues = [
        {
            name: "Täby Galopp-paviljongen",
            desc: "En enorm, öppen och modern lokal med industriell känsla. Perfekt för storslagna festivaler, mässor eller galor där du behöver maximalt med utrymme och högt i tak.",
            coords: [59.4475, 18.0610]
        },
        {
            name: "Tibble Arenasal",
            desc: "En modern arena utrustad med det absolut senaste inom ljud- och ljusteknik. Det självklara valet för konserter, företagsevent och presentationer där kvaliteten är i fokus.",
            coords: [59.4410, 18.0655]
        },
        {
            name: "Näsby Slottsträdgård",
            desc: "En fantastisk och exklusiv miljö precis intill vattnet. Perfekt för lyxiga födelsedagsfester, galamiddagar och privata tillställningar under bar himmel eller i eleganta tält.",
            coords: [59.4322, 18.0850]
        }
    ];

    let selectedVenueName = "";

    // Placera ut markörer
    venues.forEach(venue => {
        const marker = L.marker(venue.coords).addTo(map);
        
        // När man klickar på en markör uppdateras textrutan bredvid
        marker.on('click', function() {
            selectedVenueName = venue.name;
            
            // Göm instruktionstexten och visa detaljerna
            document.getElementById("venue-instructions").style.display = "none";
            const detailsDiv = document.getElementById("venue-details");
            detailsDiv.style.display = "block";
            
            // Sätt texterna i info-boxen
            document.getElementById("venue-name").textContent = venue.name;
            document.getElementById("venue-desc").textContent = venue.desc;
        });
    });

    // När man klickar på "Book this venue"
    document.getElementById("confirm-venue-btn").addEventListener("click", function() {
        alert(`Excellent! You have chosen ${selectedVenueName} for your ${chosenEvent}. Head over to the 'Contact' tab to finalize your booking!`);
        window.location.href = "contacts.html";
    });
});