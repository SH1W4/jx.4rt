/**
 * JX.4RT - Body Canvas Configurator
 * 
 * TCP (Tattoo Composition Protocol) Integration
 * 
 * Allows user to:
 * 1. Select body area (CANVAS)
 * 2. Indicate position (POSITION)
 * 3. Adjust scale with cm estimation (SCALE)
 */

const BodyCanvas = {
    selectedArea: null,
    selectedPosition: null,
    scale: { width: 10, height: 5 }, // default in cm
    canvasElement: null,
    ctx: null,
    
    // Body areas with coordinates (simplified anatomy)
    bodyAreas: {
        head: { x: 50, y: 10, radius: 15, label: 'Head' },
        neck: { x: 50, y: 28, width: 12, height: 8, label: 'Neck' },
        chest: { x: 50, y: 40, width: 30, height: 20, label: 'Chest' },
        stomach: { x: 50, y: 62, width: 25, height: 18, label: 'Stomach' },
        leftArm: { x: 20, y: 45, width: 15, height: 40, label: 'Left Arm' },
        rightArm: { x: 80, y: 45, width: 15, height: 40, label: 'Right Arm' },
        leftForearm: { x: 15, y: 85, width: 12, height: 35, label: 'Left Forearm' },
        rightForearm: { x: 85, y: 85, width: 12, height: 35, label: 'Right Forearm' },
        leftHand: { x: 15, y: 120, width: 10, height: 12, label: 'Left Hand' },
        rightHand: { x: 85, y: 120, width: 10, height: 12, label: 'Right Hand' },
        leftThigh: { x: 35, y: 85, width: 18, height: 45, label: 'Left Thigh' },
        rightThigh: { x: 65, y: 85, width: 18, height: 45, label: 'Right Thigh' },
        leftCalf: { x: 38, y: 130, width: 14, height: 40, label: 'Left Calf' },
        rightCalf: { x: 62, y: 130, width: 14, height: 40, label: 'Right Calf' },
        leftFoot: { x: 38, y: 170, width: 12, height: 10, label: 'Left Foot' },
        rightFoot: { x: 62, y: 170, width: 12, height: 10, label: 'Right Foot' },
        back: { x: 50, y: 50, width: 35, height: 60, label: 'Back' }
    },
    
    init(canvasId) {
        this.canvasElement = document.getElementById(canvasId);
        if (!this.canvasElement) return;
        
        this.ctx = this.canvasElement.getContext('2d');
        this.setupCanvas();
        this.drawBody();
        this.setupEventListeners();
    },
    
    setupCanvas() {
        // Set canvas size
        const container = this.canvasElement.parentElement;
        const size = Math.min(container.offsetWidth, 500);
        this.canvasElement.width = size;
        this.canvasElement.height = size * 2; // 2:1 aspect ratio for body
    },
    
    drawBody() {
        const ctx = this.ctx;
        const canvas = this.canvasElement;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw body outline (simplified)
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 2;
        
        // Head
        ctx.beginPath();
        ctx.arc(canvas.width * 0.5, canvas.height * 0.1, canvas.width * 0.08, 0, Math.PI * 2);
        ctx.stroke();
        
        // Neck
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.5, canvas.height * 0.18);
        ctx.lineTo(canvas.width * 0.5, canvas.height * 0.25);
        ctx.stroke();
        
        // Torso
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.35, canvas.height * 0.25);
        ctx.lineTo(canvas.width * 0.65, canvas.height * 0.25);
        ctx.lineTo(canvas.width * 0.6, canvas.height * 0.55);
        ctx.lineTo(canvas.width * 0.4, canvas.height * 0.55);
        ctx.closePath();
        ctx.stroke();
        
        // Arms
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.35, canvas.height * 0.28);
        ctx.lineTo(canvas.width * 0.25, canvas.height * 0.55);
        ctx.lineTo(canvas.width * 0.2, canvas.height * 0.75);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.65, canvas.height * 0.28);
        ctx.lineTo(canvas.width * 0.75, canvas.height * 0.55);
        ctx.lineTo(canvas.width * 0.8, canvas.height * 0.75);
        ctx.stroke();
        
        // Legs
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.42, canvas.height * 0.55);
        ctx.lineTo(canvas.width * 0.38, canvas.height * 0.85);
        ctx.lineTo(canvas.width * 0.35, canvas.height * 0.95);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.58, canvas.height * 0.55);
        ctx.lineTo(canvas.width * 0.62, canvas.height * 0.85);
        ctx.lineTo(canvas.width * 0.65, canvas.height * 0.95);
        ctx.stroke();
        
        // Draw clickable areas
        this.drawAreas();
    },
    
    drawAreas() {
        const ctx = this.ctx;
        const canvas = this.canvasElement;
        
        Object.entries(this.bodyAreas).forEach(([key, area]) => {
            const x = (area.x / 100) * canvas.width;
            const y = (area.y / 100) * canvas.height;
            
            ctx.beginPath();
            
            if (area.radius) {
                ctx.arc(x, y, (area.radius / 100) * canvas.width, 0, Math.PI * 2);
            } else {
                ctx.rect(
                    x - ((area.width / 100) * canvas.width) / 2,
                    y - ((area.height / 100) * canvas.height) / 2,
                    (area.width / 100) * canvas.width,
                    (area.height / 100) * canvas.height
                );
            }
            
            // Style based on selection
            if (this.selectedArea === key) {
                ctx.fillStyle = 'rgba(245, 245, 245, 0.3)';
                ctx.strokeStyle = '#f5f5f5';
            } else {
                ctx.fillStyle = 'rgba(51, 51, 51, 0.1)';
                ctx.strokeStyle = '#333333';
            }
            
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Draw label
            ctx.fillStyle = '#a0a0a0';
            ctx.font = '10px JetBrains Mono';
            ctx.textAlign = 'center';
            ctx.fillText(area.label, x, y);
        });
    },
    
    setupEventListeners() {
        this.canvasElement.addEventListener('click', (e) => this.handleClick(e));
        this.canvasElement.addEventListener('mousemove', (e) => this.handleHover(e));
        this.canvasElement.addEventListener('mouseleave', () => this.drawBody());
        
        // Position marker button
        const positionBtn = document.getElementById('add-position-btn');
        if (positionBtn) {
            positionBtn.addEventListener('click', () => this.enablePositionMode());
        }
        
        // Scale sliders
        const widthSlider = document.getElementById('scale-width');
        const heightSlider = document.getElementById('scale-height');
        
        if (widthSlider) {
            widthSlider.addEventListener('input', (e) => {
                this.scale.width = parseInt(e.target.value);
                document.getElementById('scale-width-value').textContent = this.scale.width;
                this.updateScaleDisplay();
            });
        }
        
        if (heightSlider) {
            heightSlider.addEventListener('input', (e) => {
                this.scale.height = parseInt(e.target.value);
                document.getElementById('scale-height-value').textContent = this.scale.height;
                this.updateScaleDisplay();
            });
        }
    },
    
    handleClick(e) {
        const rect = this.canvasElement.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        // If in position mode, add position marker
        if (this.positionMode && this.selectedArea) {
            this.addPositionMarker(x, y);
            this.positionMode = false;
            this.canvasElement.style.cursor = 'default';
            const positionBtn = document.getElementById('add-position-btn');
            if (positionBtn) {
                positionBtn.textContent = 'Add Position Marker';
                positionBtn.style.background = 'transparent';
                positionBtn.style.color = 'var(--text-primary)';
            }
            return;
        }
        
        // Find clicked area
        for (const [key, area] of Object.entries(this.bodyAreas)) {
            if (this.isPointInArea(x, y, area)) {
                this.selectedArea = key;
                this.drawBody();
                this.updateDisplay();
                break;
            }
        }
    },
    
    enablePositionMode() {
        if (!this.selectedArea) {
            alert('Please select a body area first');
            return;
        }
        
        this.positionMode = true;
        this.canvasElement.style.cursor = 'crosshair';
        
        const positionBtn = document.getElementById('add-position-btn');
        if (positionBtn) {
            positionBtn.textContent = 'Click on canvas to place marker';
            positionBtn.style.background = 'var(--text-primary)';
            positionBtn.style.color = 'var(--bg)';
        }
    },
    
    handleHover(e) {
        const rect = this.canvasElement.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        let hovered = false;
        for (const [key, area] of Object.entries(this.bodyAreas)) {
            if (this.isPointInArea(x, y, area)) {
                this.canvasElement.style.cursor = 'pointer';
                hovered = true;
                break;
            }
        }
        
        if (!hovered) {
            this.canvasElement.style.cursor = 'default';
        }
    },
    
    isPointInArea(x, y, area) {
        if (area.radius) {
            const areaX = area.x;
            const areaY = area.y;
            const distance = Math.sqrt((x - areaX) ** 2 + (y - areaY) ** 2);
            return distance <= area.radius;
        } else {
            const halfWidth = area.width / 2;
            const halfHeight = area.height / 2;
            return x >= area.x - halfWidth && x <= area.x + halfWidth &&
                   y >= area.y - halfHeight && y <= area.y + halfHeight;
        }
    },
    
    updateDisplay() {
        const display = document.getElementById('body-canvas-display');
        if (display && this.selectedArea) {
            const area = this.bodyAreas[this.selectedArea];
            display.innerHTML = `
                <p class="canvas-label">Selected Area</p>
                <p class="canvas-value">${area.label}</p>
            `;
        }
    },
    
    // Position marker
    addPositionMarker(x, y) {
        this.selectedPosition = { x, y };
        this.drawBody();
        
        // Draw position marker
        const ctx = this.ctx;
        const canvas = this.canvasElement;
        const markerX = (x / 100) * canvas.width;
        const markerY = (y / 100) * canvas.height;
        
        ctx.beginPath();
        ctx.arc(markerX, markerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#f5f5f5';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(markerX, markerY, 10, 0, Math.PI * 2);
        ctx.strokeStyle = '#f5f5f5';
        ctx.lineWidth = 1;
        ctx.stroke();
    },
    
    // Scale adjustment
    setScale(width, height) {
        this.scale = { width, height };
        this.updateScaleDisplay();
    },
    
    updateScaleDisplay() {
        const display = document.getElementById('scale-display');
        if (display) {
            display.innerHTML = `
                <p class="canvas-label">Estimated Size</p>
                <p class="canvas-value">≈ ${this.scale.width} × ${this.scale.height} CM</p>
            `;
        }
    },
    
    // Get data for form submission
    getData() {
        return {
            area: this.selectedArea,
            position: this.selectedPosition,
            scale: this.scale
        };
    },
    
    // Reset
    reset() {
        this.selectedArea = null;
        this.selectedPosition = null;
        this.scale = { width: 10, height: 5 };
        this.drawBody();
        this.updateDisplay();
        this.updateScaleDisplay();
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('body-canvas')) {
            BodyCanvas.init('body-canvas');
        }
    });
} else {
    if (document.getElementById('body-canvas')) {
        BodyCanvas.init('body-canvas');
    }
}
