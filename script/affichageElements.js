// Sample SVG data - replace with your own SVGs
const svgData = [
    {
        id: 1,
        title: "Bezi Curve",
        svg: "",
        svgPath: "svg/explications/displayV1.svg",
        creator: "Created by Claude"
    },
    {
        id: 2,
        title: "Bezi Curve Revised",
        svg: "",
        svgPath: "svg/explications/displayV2.svg",
        creator: "Created by Me + Claude"
    },
    {
        id: 3,
        title: "Circle Pattern",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="#f06" opacity="0.8"/>
                <circle cx="70" cy="80" r="40" fill="#60f" opacity="0.8"/>
                <circle cx="130" cy="120" r="40" fill="#0cf" opacity="0.8"/>
             </svg>`,
        creator: "Created by Claude"
    },
    {
        id: 4,
        title: "Abstract Shapes",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <rect x="40" y="40" width="120" height="120" fill="#ffd700" rx="15" ry="15"/>
                <polygon points="100,30 150,100 100,170 50,100" fill="#3cb371" opacity="0.8"/>
                <circle cx="100" cy="100" r="40" fill="#4169e1" opacity="0.6"/>
             </svg>`,
        creator: "Created by Claude"
    },
    {
        id: 3,
        title: "Simple Icon",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path d="M60,40 L140,40 L160,80 L100,160 L40,80 Z" fill="#ff7f50" stroke="#333" stroke-width="4"/>
                <circle cx="100" cy="80" r="20" fill="#fff"/>
             </svg>`,
        creator: "Created by Claude"
    },
    {
        id: 4,
        title: "Geometric Pattern",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <rect x="25" y="25" width="150" height="150" fill="none" stroke="#333" stroke-width="3"/>
                <circle cx="100" cy="100" r="50" fill="none" stroke="#f06" stroke-width="3"/>
                <line x1="25" y1="25" x2="175" y2="175" stroke="#60f" stroke-width="3"/>
                <line x1="175" y1="25" x2="25" y2="175" stroke="#60f" stroke-width="3"/>
             </svg>`,
        creator: "Created by Claude"
    }
];


const gallery = document.getElementById('gallery');
const modal = document.getElementById('codeModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalSvgContainer = document.getElementById('modalSvgContainer');
const svgCode = document.getElementById('svgCode');
const copyButton = document.getElementById('copyButton');

// Function to load SVG from file
async function loadSvgFromFile(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load SVG: ${response.status} ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error loading SVG:', error);
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <text x="50" y="100" fill="red">Error loading SVG</text>
        </svg>`;
    }
}

// Generate cards for each SVG
async function generateGallery() {
    for (const item of svgData) {
        // If SVG should be loaded from file
        if (item.svgPath) {
            item.svg = await loadSvgFromFile(item.svgPath);
        }

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="svg-container">
                ${item.svg}
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
            </div>
            <div class="card-content">
                <h4 class="card-title">${item.creator}</h4>
            </div>
            
        `;

        // Add click event to show modal with SVG code
        card.addEventListener('click', () => {
            modalTitle.textContent = item.title;
            modalSvgContainer.innerHTML = item.svg;

            // Format and display the SVG code
            const formattedCode = item.svg
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            svgCode.innerHTML = formattedCode;

            modal.style.display = 'block';
        });

        gallery.appendChild(card);
    }
}

// Initialize the gallery
generateGallery();

// Close modal when clicking on X
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Copy SVG code to clipboard
copyButton.addEventListener('click', () => {
    const selectedItem = svgData.find(item => item.title === modalTitle.textContent);
    if (selectedItem) {
        navigator.clipboard.writeText(selectedItem.svg)
            .then(() => {
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy SVG Code';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }
});
