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

const speedTestSectionButton = document.getElementById('toggle-speed-test');
const speedTestContent = document.getElementById('speed-test-content');
const speedTestArrow = document.getElementById('speed-test-arrow');
const contractedSpeedInput = document.getElementById('contracted-speed');
const startSpeedTestButton = document.getElementById('start-speed-test-button');
const pingValue = document.getElementById('ping-value');
const jitterValue = document.getElementById('jitter-value');
const downloadValue = document.getElementById('download-value');
const uploadValue = document.getElementById('upload-value');
const progressMessage = document.getElementById('progress-message');
const percentageValue = document.getElementById('percentage-value');
const percentageResultArea = document.getElementById('percentage-result-area');

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

    // Define all collapsible sections and their controls
    const sections = [
        { id: 'concepts-content', content: conceptsContent, arrow: conceptsArrow, button: conceptsButton },
        { id: 'tools-content', content: toolsContent, arrow: toolsArrow, button: toolsButton },
        { id: 'speed-test-content', content: speedTestContent, arrow: speedTestArrow, button: speedTestSectionButton }
    ];

    if (isOpen) {
        // If the clicked section is already open, just close it
        contentElement.classList.remove('open');
        if (arrowElement) arrowElement.classList.remove('rotate-180');
    } else {
        // If the clicked section is closed, close all others and open the clicked one
        sections.forEach(section => {
            if (section.content && section.arrow) { // Ensure elements exist
                if (section.content === contentElement) {
                    section.content.classList.add('open');
                    section.arrow.classList.add('rotate-180');
                } else {
                    section.content.classList.remove('open');
                    section.arrow.classList.remove('rotate-180');
                }
            }
        });
    }
}

// Event listeners
if (conceptsButton) conceptsButton.addEventListener('click', () => toggleSection(conceptsContent, conceptsArrow));
if (toolsButton) toolsButton.addEventListener('click', () => toggleSection(toolsContent, toolsArrow));
if (speedTestSectionButton) speedTestSectionButton.addEventListener('click', () => toggleSection(speedTestContent, speedTestArrow));

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

// --- Speed Test Logic ---
let speedTest = null;

function initializeSpeedTest() {
    if (!window.Speedtest) {
        console.error("LibreSpeed Speedtest library não carregada.");
        if(progressMessage) progressMessage.textContent = "Erro: Biblioteca de teste não carregada.";
        return null;
    }

    speedTest = new Speedtest();

    // Configure endpoints relative to where speedtest.js is located (lib/librespeed/)
    speedTest.setParameter("download_endpoint", "garbage.txt");
    speedTest.setParameter("upload_endpoint", "empty.txt");
    speedTest.setParameter("ping_endpoint", "empty.txt");
    speedTest.setParameter("worker_script", "speedtest_worker.js");
    speedTest.setParameter("telemetry_level", "disabled"); // Disable telemetry

    // Define callbacks
    speedTest.onupdate = function(data) {
        if(pingValue) pingValue.textContent = data.pingStatus || "-";
        if(jitterValue) jitterValue.textContent = data.jitterStatus || "-";
        // Ensure download/upload are numbers and format to 2 decimal places
        if(downloadValue) downloadValue.textContent = data.dlStatus ? parseFloat(data.dlStatus).toFixed(2) : "-";
        if(uploadValue) uploadValue.textContent = data.ulStatus ? parseFloat(data.ulStatus).toFixed(2) : "-";

        let currentAction = "";
        if (data.testState === 1 && data.dlStatus !== "0.00") currentAction = "Testando Download...";
        else if (data.testState === 2 && data.ulStatus !== "0.00") currentAction = "Testando Upload...";
        else if (data.testState === 3 && data.pingStatus !== "0.00") currentAction = "Testando Ping...";
        else if (data.testState === 0 && !data.dlStatus) currentAction = "Preparando teste...";
        else if (data.testState === -1) currentAction = "Aguardando para iniciar...";
        else currentAction = "Processando...";

        if(progressMessage) progressMessage.textContent = currentAction;
    };

    speedTest.onend = function(aborted) {
        if(startSpeedTestButton) startSpeedTestButton.disabled = false;
        if(startSpeedTestButton) startSpeedTestButton.textContent = "Iniciar Teste";
        if (aborted) {
            if(progressMessage) progressMessage.textContent = "Teste abortado.";
            console.log("Teste abortado pelo usuário.");
        } else {
            if(progressMessage) progressMessage.textContent = "Teste Concluído!";
            calculateAndDisplayPercentage();
        }
    };
    return speedTest;
}

function handleStartSpeedTest() {
    if (!speedTest) {
        speedTest = initializeSpeedTest();
        if (!speedTest) { // Failed to initialize
             if(startSpeedTestButton) startSpeedTestButton.disabled = false;
             if(startSpeedTestButton) startSpeedTestButton.textContent = "Iniciar Teste";
            return;
        }
    }

    // Clear previous results
    if(pingValue) pingValue.textContent = "-";
    if(jitterValue) jitterValue.textContent = "-";
    if(downloadValue) downloadValue.textContent = "-";
    if(uploadValue) uploadValue.textContent = "-";
    if(percentageValue) percentageValue.textContent = "- %";
    if(progressMessage) progressMessage.textContent = "Iniciando teste...";
    if(percentageResultArea) percentageResultArea.classList.remove('animate-fadeIn');


    if(startSpeedTestButton) startSpeedTestButton.disabled = true;
    if(startSpeedTestButton) startSpeedTestButton.textContent = "Testando...";

    try {
        // Check if a test is already running, if so, abort and restart
        if (speedTest.getState() > 0 && speedTest.getState() < 4) { // States 1,2,3 are active test states
            speedTest.abort();
        }
        // Brief delay to ensure abort completes if it was called
        setTimeout(() => {
            speedTest.start();
        }, 100);
    } catch (e) {
        console.error("Erro ao iniciar o teste:", e);
        if(progressMessage) progressMessage.textContent = "Erro ao iniciar o teste.";
        if(startSpeedTestButton) startSpeedTestButton.disabled = false;
        if(startSpeedTestButton) startSpeedTestButton.textContent = "Iniciar Teste";
    }
}

function calculateAndDisplayPercentage() {
    const contracted = parseFloat(contractedSpeedInput ? contractedSpeedInput.value : "0");
    const downloadSpeedText = downloadValue ? downloadValue.textContent : "0";
    const downloadSpeed = parseFloat(downloadSpeedText);

    if (contracted > 0 && downloadSpeed > 0) {
        const percentage = (downloadSpeed / contracted) * 100;
        if(percentageValue) percentageValue.textContent = percentage.toFixed(2) + " %";
    } else {
        if(percentageValue) percentageValue.textContent = "N/A";
    }
    if(percentageResultArea) {
        percentageResultArea.classList.remove('animate-fadeIn'); // Remove to re-trigger animation
        void percentageResultArea.offsetWidth; // Trigger reflow
        percentageResultArea.classList.add('animate-fadeIn'); // Add animation
    }
}

// Add event listener to the start speed test button
if (startSpeedTestButton) {
    startSpeedTestButton.addEventListener('click', handleStartSpeedTest);
}

// --- End of Speed Test Logic ---

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