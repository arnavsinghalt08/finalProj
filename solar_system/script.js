document.addEventListener('DOMContentLoaded', () => {
    const planets = document.querySelectorAll('.planet');
    const sun = document.querySelector('.sun');
    const infoBox = document.getElementById('info-box');
    const infoTitle = document.getElementById('info-title');
    const infoStats = document.getElementById('info-stats');
    const infoFact = document.getElementById('info-fact');

    const planetData = {
        sun: {
            name: "The Sun",
            stats: [
                { label: "Type", value: "Yellow Dwarf" },
                { label: "Diameter", value: "1,392,700 km" },
                { label: "Surface Temp", value: "~5,500°C" },
                { label: "Core Temp", value: "~15M °C" },
                { label: "Age", value: "4.6 billion yrs" },
                { label: "Mass (solar)", value: "99.86% of system" },
            ],
            fact: "Light leaving the Sun takes about 8 minutes 20 seconds to reach Earth. The Sun fuses ~620 million metric tons of hydrogen every second."
        },
        mercury: {
            name: "Mercury",
            stats: [
                { label: "Distance from Sun", value: "57.9M km" },
                { label: "Orbital Period", value: "88 Earth days" },
                { label: "Diameter", value: "4,879 km" },
                { label: "Moons", value: "0" },
                { label: "Temperature", value: "-180°C to 430°C" },
            ],
            fact: "Despite being closest to the Sun, Mercury is not the hottest planet — it has no atmosphere to retain heat, causing extreme temperature swings of over 600°C between day and night."
        },
        venus: {
            name: "Venus",
            stats: [
                { label: "Distance from Sun", value: "108.2M km" },
                { label: "Orbital Period", value: "225 Earth days" },
                { label: "Day Length", value: "243 Earth days" },
                { label: "Diameter", value: "12,104 km" },
                { label: "Moons", value: "0" },
                { label: "Temperature", value: "465°C (avg)" },
            ],
            fact: "A day on Venus (243 Earth days) is longer than its year (225 Earth days). Venus also rotates backwards — the Sun rises in the west and sets in the east."
        },
        earth: {
            name: "Earth",
            stats: [
                { label: "Distance from Sun", value: "149.6M km" },
                { label: "Orbital Period", value: "365.25 days" },
                { label: "Diameter", value: "12,742 km" },
                { label: "Moons", value: "1" },
                { label: "Temperature", value: "-88°C to 58°C" },
            ],
            fact: "Earth is the densest planet in the solar system and the only confirmed world with liquid water on its surface, plate tectonics, and life."
        },
        mars: {
            name: "Mars",
            stats: [
                { label: "Distance from Sun", value: "227.9M km" },
                { label: "Orbital Period", value: "687 Earth days" },
                { label: "Diameter", value: "6,779 km" },
                { label: "Moons", value: "2 (Phobos & Deimos)" },
                { label: "Temperature", value: "-125°C to 20°C" },
            ],
            fact: "Mars hosts Olympus Mons, the tallest volcano in the solar system at 21.9 km — nearly 3× the height of Mount Everest. A Martian day (sol) is 24 hours 37 minutes."
        },
        jupiter: {
            name: "Jupiter",
            stats: [
                { label: "Distance from Sun", value: "778.5M km" },
                { label: "Orbital Period", value: "11.86 Earth years" },
                { label: "Diameter", value: "139,820 km" },
                { label: "Moons", value: "95 known" },
                { label: "Temperature", value: "-108°C (clouds)" },
            ],
            fact: "Jupiter's Great Red Spot is a storm larger than Earth that has raged for over 350 years. Jupiter's gravity acts as a shield, deflecting comets from the inner solar system."
        },
        saturn: {
            name: "Saturn",
            stats: [
                { label: "Distance from Sun", value: "1.43B km" },
                { label: "Orbital Period", value: "29.46 Earth years" },
                { label: "Diameter", value: "116,460 km" },
                { label: "Moons", value: "146 known" },
                { label: "Ring Span", value: "up to 282,000 km" },
                { label: "Temperature", value: "-178°C (clouds)" },
            ],
            fact: "Saturn's rings span 282,000 km but average only ~10 meters thick. Saturn is the least dense planet — it would float in water if you could find an ocean large enough."
        },
        uranus: {
            name: "Uranus",
            stats: [
                { label: "Distance from Sun", value: "2.87B km" },
                { label: "Orbital Period", value: "84 Earth years" },
                { label: "Diameter", value: "50,724 km" },
                { label: "Moons", value: "27 known" },
                { label: "Axial Tilt", value: "97.77°" },
                { label: "Temperature", value: "-224°C (min)" },
            ],
            fact: "Uranus rotates almost completely on its side (97.77° tilt), likely from a massive collision billions of years ago. It has the coldest planetary atmosphere in the solar system."
        },
        neptune: {
            name: "Neptune",
            stats: [
                { label: "Distance from Sun", value: "4.5B km" },
                { label: "Orbital Period", value: "164.8 Earth years" },
                { label: "Diameter", value: "49,244 km" },
                { label: "Moons", value: "16 known" },
                { label: "Wind Speed", value: "up to 2,100 km/h" },
                { label: "Temperature", value: "-218°C (avg)" },
            ],
            fact: "Neptune was predicted by mathematics before it was ever observed. It has the strongest winds in the solar system — faster than the speed of sound on Earth."
        }
    };

    infoTitle.style.fontFamily = "'Audiowide', sans-serif";
    infoFact.style.fontFamily = "'Audiowide', sans-serif";

    function showInfo(event) {
        const el = event.currentTarget;
        const planetId = el.dataset.planet;
        const data = planetData[planetId];

        if (data) {
            infoTitle.textContent = data.name;

            infoStats.innerHTML = data.stats.map(s =>
                `<div class="stat-item"><span class="stat-label">${s.label}</span><span class="stat-value">${s.value}</span></div>`
            ).join('');

            infoFact.textContent = data.fact;
            infoBox.classList.remove('hidden');
        }
    }

    function hideInfo() {
        infoBox.classList.add('hidden');
    }

    planets.forEach(planet => {
        planet.addEventListener('mouseenter', showInfo);
        planet.addEventListener('mouseleave', hideInfo);
    });

    sun.addEventListener('mouseenter', showInfo);
    sun.addEventListener('mouseleave', hideInfo);
});
