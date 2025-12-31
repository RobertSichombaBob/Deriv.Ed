/**
 * A+ Initiative Interactive Lessons
 * Advanced interactive learning tools for A-Level subjects
 */

class InteractiveLessons {
    constructor() {
        this.currentLesson = null;
        this.lessonProgress = {};
        this.interactiveTools = {};
        this.init();
    }

    init() {
        this.loadLessonProgress();
        this.initMathTools();
        this.initPhysicsTools();
        this.initCSTools();
        this.initStatisticsTools();
        this.setupInteractiveElements();
        this.setupLessonNavigation();
        this.renderInteractiveExamples();
    }

    loadLessonProgress() {
        const progress = localStorage.getItem('aplus_lesson_progress');
        if (progress) {
            this.lessonProgress = JSON.parse(progress);
        }
    }

    saveLessonProgress() {
        localStorage.setItem('aplus_lesson_progress', JSON.stringify(this.lessonProgress));
    }

    initMathTools() {
        // MathJax configuration
        if (window.MathJax) {
            window.MathJax = {
                tex: {
                    inlineMath: [['$', '$'], ['\\(', '\\)']],
                    displayMath: [['$$', '$$'], ['\\[', '\\]']],
                    processEscapes: true,
                    processEnvironments: true
                },
                options: {
                    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
                    ignoreHtmlClass: 'tex2jax_ignore',
                    processHtmlClass: 'tex2jax_process'
                },
                svg: {
                    fontCache: 'global'
                },
                startup: {
                    ready: () => {
                        MathJax.startup.defaultReady();
                        MathJax.startup.promise.then(() => {
                            console.log('MathJax loaded successfully');
                        });
                    }
                }
            };
        }

        // Graphing Calculator
        this.interactiveTools.graphingCalculator = {
            plot: (functionString, options = {}) => {
                return this.plotFunction(functionString, options);
            },
            plotMultiple: (functions, options = {}) => {
                return this.plotMultipleFunctions(functions, options);
            },
            solveEquation: (equation, variable = 'x') => {
                return this.solveMathEquation(equation, variable);
            }
        };
    }

    initPhysicsTools() {
        // Physics Simulations
        this.interactiveTools.physics = {
            projectileMotion: (initialVelocity, angle, gravity = 9.81) => {
                return this.simulateProjectile(initialVelocity, angle, gravity);
            },
            simpleHarmonicMotion: (amplitude, frequency, phase = 0) => {
                return this.simulateSHM(amplitude, frequency, phase);
            },
            circuitSimulator: (components) => {
                return this.simulateCircuit(components);
            }
        };
    }

    initCSTools() {
        // Code Editor and Runner
        this.interactiveTools.codeEditor = {
            languages: ['python', 'javascript', 'java', 'c++'],
            runCode: (code, language = 'python') => {
                return this.executeCode(code, language);
            },
            debugCode: (code, language = 'python') => {
                return this.debugCode(code, language);
            },
            visualizeAlgorithm: (algorithm, data) => {
                return this.visualizeAlgorithm(algorithm, data);
            }
        };
    }

    initStatisticsTools() {
        // Statistics Tools
        this.interactiveTools.statistics = {
            probabilityCalculator: (distribution, params) => {
                return this.calculateProbability(distribution, params);
            },
            hypothesisTest: (data1, data2, testType = 't-test') => {
                return this.performHypothesisTest(data1, data2, testType);
            },
            regressionAnalysis: (xData, yData, model = 'linear') => {
                return this.performRegression(xData, yData, model);
            },
            dataVisualizer: (data, chartType = 'histogram') => {
                return this.visualizeData(data, chartType);
            }
        };
    }

    setupInteractiveElements() {
        // Interactive buttons and inputs
        document.addEventListener('click', (e) => {
            // Check for interactive buttons
            const interactiveBtn = e.target.closest('[data-interactive]');
            if (interactiveBtn) {
                const action = interactiveBtn.dataset.interactive;
                this.handleInteractiveAction(action, interactiveBtn);
            }

            // Check for code run buttons
            const runCodeBtn = e.target.closest('[data-run-code]');
            if (runCodeBtn) {
                const codeId = runCodeBtn.dataset.runCode;
                this.runCodeFromElement(codeId);
            }

            // Check for graph plot buttons
            const plotBtn = e.target.closest('[data-plot-graph]');
            if (plotBtn) {
                const graphId = plotBtn.dataset.plotGraph;
                this.plotGraphFromElement(graphId);
            }
        });

        // Interactive inputs
        document.addEventListener('input', (e) => {
            const interactiveInput = e.target.closest('[data-live-update]');
            if (interactiveInput) {
                const updateTarget = interactiveInput.dataset.liveUpdate;
                this.updateLiveDisplay(updateTarget, interactiveInput.value);
            }
        });
    }

    setupLessonNavigation() {
        // Lesson navigation
        document.addEventListener('click', (e) => {
            const nextBtn = e.target.closest('[data-lesson-next]');
            if (nextBtn) {
                this.nextLesson();
            }

            const prevBtn = e.target.closest('[data-lesson-prev]');
            if (prevBtn) {
                this.previousLesson();
            }

            const completeBtn = e.target.closest('[data-lesson-complete]');
            if (completeBtn) {
                this.completeCurrentLesson();
            }
        });
    }

    renderInteractiveExamples() {
        // Render math examples
        this.renderMathExamples();
        
        // Render physics examples
        this.renderPhysicsExamples();
        
        // Render CS examples
        this.renderCSExamples();
        
        // Render statistics examples
        this.renderStatisticsExamples();
    }

    renderMathExamples() {
        const mathExamples = document.querySelectorAll('.math-example');
        mathExamples.forEach(example => {
            const type = example.dataset.type || 'function';
            
            switch (type) {
                case 'function':
                    this.renderFunctionExample(example);
                    break;
                case 'equation':
                    this.renderEquationExample(example);
                    break;
                case 'derivative':
                    this.renderDerivativeExample(example);
                    break;
                case 'integral':
                    this.renderIntegralExample(example);
                    break;
            }
        });
    }

    renderFunctionExample(container) {
        const functionStr = container.dataset.function || 'x^2';
        const canvasId = `graph-${Math.random().toString(36).substr(2, 9)}`;
        
        container.innerHTML = `
            <div class="mb-4">
                <h4 class="text-white font-bold mb-2">Function: f(x) = ${functionStr}</h4>
                <canvas id="${canvasId}" height="300" class="w-full bg-gray-900 rounded-lg"></canvas>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <input type="range" min="-10" max="10" value="1" step="0.1" 
                       class="slider" data-graph="${canvasId}" data-param="a">
                <div class="text-gray-300">Parameter A: <span id="value-a">1</span></div>
            </div>
        `;
        
        // Plot the graph
        setTimeout(() => {
            this.plotFunction(functionStr, { canvasId, color: '#d946ef' });
        }, 100);
    }

    plotFunction(functionString, options = {}) {
        const canvasId = options.canvasId || 'graph-canvas';
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const scale = options.scale || 20;
        const color = options.color || '#0ea5e9';
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid
        this.drawGrid(ctx, width, height, scale);
        
        // Draw axes
        this.drawAxes(ctx, width, height);
        
        // Plot function
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        const centerX = width / 2;
        const centerY = height / 2;
        
        for (let x = -10; x <= 10; x += 0.1) {
            try {
                // Simple function evaluation
                let y;
                const expr = functionString
                    .replace(/x\^2/g, `Math.pow(${x}, 2)`)
                    .replace(/x\^3/g, `Math.pow(${x}, 3)`)
                    .replace(/sin\(x\)/g, `Math.sin(${x})`)
                    .replace(/cos\(x\)/g, `Math.cos(${x})`)
                    .replace(/tan\(x\)/g, `Math.tan(${x})`)
                    .replace(/e\^x/g, `Math.exp(${x})`)
                    .replace(/ln\(x\)/g, `Math.log(${x})`)
                    .replace(/sqrt\(x\)/g, `Math.sqrt(${Math.abs(x)})`)
                    .replace(/x/g, x);
                
                // Evaluate expression
                y = eval(expr);
                
                // Handle invalid values
                if (!isFinite(y)) continue;
                
                const plotX = centerX + x * scale;
                const plotY = centerY - y * scale;
                
                if (x === -10) {
                    ctx.moveTo(plotX, plotY);
                } else {
                    ctx.lineTo(plotX, plotY);
                }
            } catch (error) {
                console.error('Error plotting function:', error);
                continue;
            }
        }
        
        ctx.stroke();
        
        return { success: true, function: functionString };
    }

    drawGrid(ctx, width, height, scale) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x <= width; x += scale) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= height; y += scale) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }

    drawAxes(ctx, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        
        // X-axis
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        ctx.stroke();
        
        // Axis labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        // X-axis labels
        for (let x = -5; x <= 5; x++) {
            if (x === 0) continue;
            const labelX = centerX + x * 20;
            ctx.fillText(x.toString(), labelX, centerY + 5);
        }
        
        // Y-axis labels
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let y = -5; y <= 5; y++) {
            if (y === 0) continue;
            const labelY = centerY - y * 20;
            ctx.fillText(y.toString(), centerX - 5, labelY);
        }
        
        // Origin label
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.fillText('0', centerX - 5, centerY + 5);
    }

    renderPhysicsExamples() {
        const physicsExamples = document.querySelectorAll('.physics-example');
        physicsExamples.forEach(example => {
            const type = example.dataset.type || 'projectile';
            
            switch (type) {
                case 'projectile':
                    this.renderProjectileExample(example);
                    break;
                case 'pendulum':
                    this.renderPendulumExample(example);
                    break;
                case 'circuit':
                    this.renderCircuitExample(example);
                    break;
            }
        });
    }

    renderProjectileExample(container) {
        container.innerHTML = `
            <div class="mb-4">
                <h4 class="text-white font-bold mb-2">Projectile Motion Simulator</h4>
                <canvas id="projectile-canvas" height="300" class="w-full bg-gray-900 rounded-lg"></canvas>
            </div>
            <div class="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label class="block text-gray-300 mb-2">Initial Velocity (m/s)</label>
                    <input type="range" min="1" max="50" value="20" 
                           class="w-full" id="velocity-slider">
                    <div class="text-center text-primary" id="velocity-value">20</div>
                </div>
                <div>
                    <label class="block text-gray-300 mb-2">Angle (degrees)</label>
                    <input type="range" min="0" max="90" value="45" 
                           class="w-full" id="angle-slider">
                    <div class="text-center text-primary" id="angle-value">45</div>
                </div>
                <div>
                    <label class="block text-gray-300 mb-2">Gravity (m/s²)</label>
                    <input type="range" min="1" max="20" value="9.8" step="0.1"
                           class="w-full" id="gravity-slider">
                    <div class="text-center text-primary" id="gravity-value">9.8</div>
                </div>
            </div>
            <button class="w-full py-3 rounded-lg bg-primary hover:bg-primary/80 text-white font-semibold"
                    onclick="interactiveLessons.simulateProjectileMotion()">
                <i class="fas fa-play mr-2"></i> Simulate
            </button>
        `;
    }

    simulateProjectileMotion() {
        const velocity = parseFloat(document.getElementById('velocity-value').textContent);
        const angle = parseFloat(document.getElementById('angle-value').textContent);
        const gravity = parseFloat(document.getElementById('gravity-value').textContent);
        
        const canvas = document.getElementById('projectile-canvas');
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Convert angle to radians
        const angleRad = (angle * Math.PI) / 180;
        
        // Calculate initial velocities
        const vx = velocity * Math.cos(angleRad);
        const vy = velocity * Math.sin(angleRad);
        
        // Calculate time of flight
        const timeOfFlight = (2 * vy) / gravity;
        
        // Calculate range
        const range = vx * timeOfFlight;
        
        // Calculate max height
        const maxHeight = (vy * vy) / (2 * gravity);
        
        // Draw ground
        ctx.fillStyle = '#4b5563';
        ctx.fillRect(0, height - 50, width, 50);
        
        // Draw trajectory
        ctx.strokeStyle = '#0ea5e9';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        const scaleX = width / range;
        const scaleY = (height - 100) / maxHeight;
        
        for (let t = 0; t <= timeOfFlight; t += 0.1) {
            const x = vx * t;
            const y = vy * t - 0.5 * gravity * t * t;
            
            const plotX = x * scaleX;
            const plotY = height - 50 - (y * scaleY);
            
            if (t === 0) {
                ctx.moveTo(plotX, plotY);
            } else {
                ctx.lineTo(plotX, plotY);
            }
        }
        
        ctx.stroke();
        
        // Display calculations
        const results = `
            <div class="mt-4 grid grid-cols-3 gap-4">
                <div class="text-center">
                    <div class="text-gray-400 text-sm">Range</div>
                    <div class="text-white font-bold">${range.toFixed(2)} m</div>
                </div>
                <div class="text-center">
                    <div class="text-gray-400 text-sm">Max Height</div>
                    <div class="text-white font-bold">${maxHeight.toFixed(2)} m</div>
                </div>
                <div class="text-center">
                    <div class="text-gray-400 text-sm">Time of Flight</div>
                    <div class="text-white font-bold">${timeOfFlight.toFixed(2)} s</div>
                </div>
            </div>
        `;
        
        document.getElementById('projectile-results')?.remove();
        const resultsDiv = document.createElement('div');
        resultsDiv.id = 'projectile-results';
        resultsDiv.innerHTML = results;
        canvas.parentNode.appendChild(resultsDiv);
    }

    renderCSExamples() {
        const csExamples = document.querySelectorAll('.cs-example');
        csExamples.forEach(example => {
            const type = example.dataset.type || 'code';
            
            switch (type) {
                case 'code':
                    this.renderCodeExample(example);
                    break;
                case 'algorithm':
                    this.renderAlgorithmExample(example);
                    break;
                case 'data-structure':
                    this.renderDataStructureExample(example);
                    break;
            }
        });
    }

    renderCodeExample(container) {
        const language = container.dataset.language || 'python';
        const code = container.dataset.code || 
            (language === 'python' ? 'print("Hello, World!")' : 'console.log("Hello, World!");');
        
        container.innerHTML = `
            <div class="mb-4">
                <h4 class="text-white font-bold mb-2">${language.charAt(0).toUpperCase() + language.slice(1)} Code Editor</h4>
                <div class="flex justify-between items-center mb-2">
                    <span class="text-gray-400 text-sm">${language}</span>
                    <button class="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm"
                            onclick="interactiveLessons.runCode('${language}', this)">
                        <i class="fas fa-play mr-2"></i> Run Code
                    </button>
                </div>
                <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto"><code class="language-${language}">${this.escapeHtml(code)}</code></pre>
            </div>
            <div class="output-area bg-gray-900 rounded-lg p-4 hidden">
                <h5 class="text-white font-bold mb-2">Output:</h5>
                <pre class="text-gray-300" id="code-output"></pre>
            </div>
        `;
        
        // Apply syntax highlighting
        this.highlightSyntax(container.querySelector('code'), language);
    }

    runCode(language, button) {
        const container = button.closest('.cs-example');
        const codeElement = container.querySelector('code');
        const outputArea = container.querySelector('.output-area');
        const outputElement = container.querySelector('#code-output');
        
        if (!codeElement || !outputArea || !outputElement) return;
        
        const code = codeElement.textContent;
        
        // Show loading
        outputElement.textContent = 'Running...';
        outputArea.classList.remove('hidden');
        
        // Simulate code execution (in real app, this would call a backend)
        setTimeout(() => {
            try {
                let output = '';
                
                switch (language) {
                    case 'python':
                        // Simulated Python output
                        output = this.simulatePythonExecution(code);
                        break;
                    case 'javascript':
                        // Actually execute JavaScript (carefully)
                        output = this.executeJavaScript(code);
                        break;
                    case 'java':
                        output = 'Simulated Java output\nHello, World!';
                        break;
                    case 'c++':
                        output = 'Simulated C++ output\nHello, World!';
                        break;
                    default:
                        output = 'Language not supported in demo';
                }
                
                outputElement.textContent = output;
            } catch (error) {
                outputElement.textContent = `Error: ${error.message}`;
            }
        }, 1000);
    }

    simulatePythonExecution(code) {
        // Simple Python simulation
        if (code.includes('print(')) {
            const match = code.match(/print\(["'](.+)["']\)/);
            if (match) {
                return match[1];
            }
        }
        
        if (code.includes('for') && code.includes('range')) {
            return '0\n1\n2\n3\n4';
        }
        
        if (code.includes('def')) {
            return 'Function defined successfully';
        }
        
        return 'Code executed successfully';
    }

    executeJavaScript(code) {
        try {
            // Create a safe execution environment
            const originalLog = console.log;
            let output = [];
            
            console.log = (...args) => {
                output.push(args.join(' '));
            };
            
            // Execute code
            eval(code);
            
            // Restore console.log
            console.log = originalLog;
            
            return output.join('\n') || 'Code executed (no output)';
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }

    highlightSyntax(codeElement, language) {
        // Simple syntax highlighting
        const code = codeElement.textContent;
        let highlighted = code;
        
        if (language === 'python') {
            highlighted = highlighted
                .replace(/\b(def|class|if|else|elif|for|while|return|import|from|as)\b/g, 
                    '<span class="text-purple-400">$1</span>')
                .replace(/\b(print|range|len|str|int|float)\b/g, 
                    '<span class="text-yellow-400">$1</span>')
                .replace(/["'][^"']*["']/g, 
                    '<span class="text-green-400">$&</span>')
                .replace(/#.*$/gm, 
                    '<span class="text-gray-500">$&</span>');
        } else if (language === 'javascript') {
            highlighted = highlighted
                .replace(/\b(function|const|let|var|if|else|for|while|return)\b/g, 
                    '<span class="text-purple-400">$1</span>')
                .replace(/\b(console|log|Math|Date|Array|Object)\b/g, 
                    '<span class="text-yellow-400">$1</span>')
                .replace(/["'][^"']*["']/g, 
                    '<span class="text-green-400">$&</span>')
                .replace(/\/\/.*$/gm, 
                    '<span class="text-gray-500">$&</span>');
        }
        
        codeElement.innerHTML = highlighted;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    renderStatisticsExamples() {
        const statsExamples = document.querySelectorAll('.stats-example');
        statsExamples.forEach(example => {
            const type = example.dataset.type || 'probability';
            
            switch (type) {
                case 'probability':
                    this.renderProbabilityExample(example);
                    break;
                case 'distribution':
                    this.renderDistributionExample(example);
                    break;
                case 'regression':
                    this.renderRegressionExample(example);
                    break;
            }
        });
    }

    renderProbabilityExample(container) {
        container.innerHTML = `
            <div class="mb-4">
                <h4 class="text-white font-bold mb-2">Probability Calculator</h4>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-gray-300 mb-2">Distribution</label>
                        <select class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white" 
                                id="distribution-select">
                            <option value="normal">Normal Distribution</option>
                            <option value="binomial">Binomial Distribution</option>
                            <option value="poisson">Poisson Distribution</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-300 mb-2">Parameter 1</label>
                        <input type="number" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white" 
                               id="param1" value="0" step="0.1">
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-gray-300 mb-2">Parameter 2</label>
                        <input type="number" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white" 
                               id="param2" value="1" step="0.1">
                    </div>
                    <div>
                        <label class="block text-gray-300 mb-2">X Value</label>
                        <input type="number" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white" 
                               id="x-value" value="0" step="0.1">
                    </div>
                </div>
                <button class="w-full py-3 rounded-lg bg-stats hover:bg-stats/80 text-white font-semibold"
                        onclick="interactiveLessons.calculateProbability()">
                    <i class="fas fa-calculator mr-2"></i> Calculate Probability
                </button>
            </div>
            <div class="result-area bg-gray-900 rounded-lg p-4 hidden">
                <h5 class="text-white font-bold mb-2">Result:</h5>
                <div class="text-gray-300" id="probability-result"></div>
            </div>
        `;
    }

    calculateProbability() {
        const distribution = document.getElementById('distribution-select').value;
        const param1 = parseFloat(document.getElementById('param1').value);
        const param2 = parseFloat(document.getElementById('param2').value);
        const x = parseFloat(document.getElementById('x-value').value);
        
        let result = '';
        
        switch (distribution) {
            case 'normal':
                // Simple normal distribution calculation
                const z = (x - param1) / param2;
                const probability = 0.5 * (1 + this.erf(z / Math.sqrt(2)));
                result = `P(X ≤ ${x}) = ${probability.toFixed(4)} (${(probability * 100).toFixed(2)}%)`;
                break;
            case 'binomial':
                // Binomial distribution
                const n = param1;
                const p = param2;
                const prob = this.binomialProbability(n, p, x);
                result = `P(X = ${x}) = ${prob.toFixed(6)}`;
                break;
            case 'poisson':
                // Poisson distribution
                const lambda = param1;
                const poissonProb = this.poissonProbability(lambda, x);
                result = `P(X = ${x}) = ${poissonProb.toFixed(6)}`;
                break;
        }
        
        document.getElementById('probability-result').textContent = result;
        document.querySelector('.result-area').classList.remove('hidden');
    }

    erf(x) {
        // Approximation of error function
        const a1 =  0.254829592;
        const a2 = -0.284496736;
        const a3 =  1.421413741;
        const a4 = -1.453152027;
        const a5 =  1.061405429;
        const p  =  0.3275911;

        const sign = x < 0 ? -1 : 1;
        x = Math.abs(x);

        const t = 1.0 / (1.0 + p * x);
        const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

        return sign * y;
    }

    binomialProbability(n, p, k) {
        // Calculate binomial coefficient
        const coeff = this.binomialCoefficient(n, k);
        return coeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
    }

    binomialCoefficient(n, k) {
        if (k < 0 || k > n) return 0;
        if (k === 0 || k === n) return 1;
        
        k = Math.min(k, n - k);
        let result = 1;
        for (let i = 1; i <= k; i++) {
            result *= (n - k + i) / i;
        }
        return Math.round(result);
    }

    poissonProbability(lambda, k) {
        return (Math.pow(lambda, k) * Math.exp(-lambda)) / this.factorial(k);
    }

    factorial(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    handleInteractiveAction(action, element) {
        switch (action) {
            case 'plot':
                this.handlePlotAction(element);
                break;
            case 'calculate':
                this.handleCalculateAction(element);
                break;
            case 'simulate':
                this.handleSimulateAction(element);
                break;
            case 'visualize':
                this.handleVisualizeAction(element);
                break;
        }
    }

    completeCurrentLesson() {
        if (!this.currentLesson) return;
        
        const lessonId = this.currentLesson.id;
        this.lessonProgress[lessonId] = {
            completed: true,
            completedAt: new Date().toISOString(),
            score: 100
        };
        
        this.saveLessonProgress();
        this.showToast('Lesson completed successfully! 🎉', 'success');
        
        // Update course progress
        if (window.courseManager) {
            window.courseManager.updateCourseProgress(this.currentLesson.courseId);
        }
    }

    nextLesson() {
        // Navigate to next lesson
        this.showToast('Moving to next lesson...', 'info');
        // Implementation depends on lesson structure
    }

    previousLesson() {
        // Navigate to previous lesson
        this.showToast('Moving to previous lesson...', 'info');
    }

    showToast(message, type = 'info') {
        if (window.aplusPlatform?.showToast) {
            window.aplusPlatform.showToast(message, type);
        }
    }

    // Export methods for global access
    exportMethods() {
        return {
            plotFunction: (func, options) => this.plotFunction(func, options),
            runCode: (language, button) => this.runCode(language, button),
            simulateProjectileMotion: () => this.simulateProjectileMotion(),
            calculateProbability: () => this.calculateProbability(),
            completeLesson: () => this.completeCurrentLesson()
        };
    }
}

// Initialize Interactive Lessons
const interactiveLessons = new InteractiveLessons();
window.interactiveLessons = interactiveLessons;

// Make methods globally available
window.plotFunction = interactiveLessons.plotFunction.bind(interactiveLessons);
window.runCode = interactiveLessons.runCode.bind(interactiveLessons);
window.simulateProjectileMotion = interactiveLessons.simulateProjectileMotion.bind(interactiveLessons);
window.calculateProbability = interactiveLessons.calculateProbability.bind(interactiveLessons);

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { InteractiveLessons };
}