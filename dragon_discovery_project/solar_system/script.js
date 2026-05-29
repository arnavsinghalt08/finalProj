document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const planets = document.querySelectorAll('.planet');
    const infoBox = document.getElementById('info-box');
    const infoTitle = document.getElementById('info-title');
    const infoFact = document.getElementById('info-fact');

    // --- Planet Data ---
    const planetData = {
        mercury: {
            name: "Mercury",
            fact: "A year on Mercury is just 88 Earth days long, but a single day lasts for nearly 59 Earth days!"
        },
        venus: {
            name: "Venus",
            fact: "Venus is the hottest planet in our solar system, with surface temperatures hot enough to melt lead."
        },
        earth: {
            name: "Earth",
            fact: "Our home planet is the only place in the universe known to harbor life."
        },
        mars: {
            name: "Mars",
            fact: "Mars is home to Olympus Mons, the largest volcano in the solar system—it's three times the height of Mount Everest!"
        },
        jupiter: {
            name: "Jupiter",
            fact: "Jupiter is so big that all the other planets in the solar system could fit inside it."
        },
        saturn: {
            name: "Saturn",
            fact: "Saturn's beautiful rings are made of billions of pieces of ice, rock, and dust."
        },
        uranus: {
            name: "Uranus",
            fact: "Uranus rotates on its side, with its equator at nearly a right angle to its orbit."
        },
        neptune: {
            name: "Neptune",
            fact: "Neptune has the strongest winds in the solar system, which can reach up to 2,100 kilometers per hour!"
        }
    };
xu
    // Load Audiowide font and apply to info elements
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Audiowide&display=swap';
    document.head.appendChild(fontLink);

    infoTitle.style.fontFamily = "'Audiowide', sans-serif";
    infoFact.style.fontFamily = "'Audiowide', sans-serif";

    function showInfo(event){
        const planetId = event.target.dataset.planet;
        const data = planetData[planetId];
        
        if (data) {
            // Populate the info box
            infoTitle.textContent = data.name;
            infoFact.textContent = data.fact;
            
            // Show the info box
            infoBox.classList.remove('hidden');

            // Show the info box
            infoBox.classList.remove('hidden');
        }
    }

    function hideInfo(){
        infoBox.classList.add('hidden');
    }

    // --- Attach Event Listeners ---
    planets.forEach(planet => {
        planet.addEventListener('mouseenter', showInfo);
        planet.addEventListener('mouseleave', hideInfo);
    });
}); 

