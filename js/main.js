/**
 * Main JavaScript file for the network diagnostic guide
 * Controls UI interactions and diagnostic flow
 */

// Current step in the diagnostic process
let currentStepId = 'start';

// DOM elements
const questionArea = document.getElementById('question-area');
const detailsArea = document.getElementById('details-area');
const optionsArea = document.getElementById('options-area');
const restartButton = document.getElementById('restart-button');

const conceptsButton = document.getElementById('toggle-concepts');
const conceptsContent = document.getElementById('concepts-content');
const conceptsArrow = document.getElementById('concepts-arrow');
const toolsButton = document.getElementById('toggle-tools');
const toolsContent = document.getElementById('tools-content');
const toolsArrow = document.getElementById('tools-arrow');

/**
 * Renders a diagnostic step based on its ID
 * @param {string} stepId - The ID of the step to render
 */
function renderStep(stepId) {
    const step = diagnosticTree[stepId];
    if (!step) {
        console.error('Passo não encontrado:', stepId);
        questionArea.textContent = 'Ocorreu um erro. Passo de diagnóstico não encontrado.';
        detailsArea.textContent = '';
        optionsArea.innerHTML = '';
        return;
    }

    // Set question and details text
    questionArea.innerHTML = step.text;
    detailsArea.innerHTML = step.details || '';
    
    // Clear previous options
    optionsArea.innerHTML = '';

    // Create option buttons with staggered animation
    if (step.options) {
        step.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.className = 'w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-4 rounded-lg shadow transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75';
            
            // Add animation delay attribute for CSS to use
            button.style.animationDelay = `${index * 0.1}s`;
            
            // Use smaller text for many long options
            if (step.options.length > 2 && option.text.length > 30) {
                button.classList.add('text-sm');
            }
            
            // Add click handler to navigate to next step
            button.addEventListener('click', () => {
                currentStepId = option.next_id;
                renderStep(currentStepId);
                // Scroll to top of diagnostic tool smoothly
                document.getElementById('diagnostic-tool').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            });
            
            optionsArea.appendChild(button);
        });
    }
}

/**
 * Toggles the visibility of a collapsible section
 * @param {HTMLElement} contentElement - The content element to toggle
 * @param {HTMLElement} arrowElement - The arrow element to rotate
 */
function toggleSection(contentElement, arrowElement) {
    const isOpen = contentElement.classList.contains('open');
    
    if (isOpen) {
        contentElement.classList.remove('open');
        arrowElement.classList.remove('rotate-180');
    } else {
        // Close other section if open
        if (contentElement.id === 'concepts-content' && toolsContent.classList.contains('open')) {
            toolsContent.classList.remove('open');
            toolsArrow.classList.remove('rotate-180');
        } else if (contentElement.id === 'tools-content' && conceptsContent.classList.contains('open')) {
            conceptsContent.classList.remove('open');
            conceptsArrow.classList.remove('rotate-180');
        }
        
        contentElement.classList.add('open');
        arrowElement.classList.add('rotate-180');
    }
}

// Event listeners
conceptsButton.addEventListener('click', () => toggleSection(conceptsContent, conceptsArrow));
toolsButton.addEventListener('click', () => toggleSection(toolsContent, toolsArrow));

restartButton.addEventListener('click', () => {
    currentStepId = 'start';
    renderStep(currentStepId);
    document.getElementById('diagnostic-tool').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
});

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Initialize the diagnostic tool
document.addEventListener('DOMContentLoaded', function() {
    renderStep(currentStepId);
    
    // Add fade-in animation to the main container
    document.querySelector('.max-w-2xl').classList.add('animate-fadeIn');
});

// Add service worker registration for PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}