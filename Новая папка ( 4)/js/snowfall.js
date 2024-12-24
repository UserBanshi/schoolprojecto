
document.addEventListener('DOMContentLoaded', () => {
    // Create and set up the canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1'; // Ensures it stays in the background
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Resize canvas to fit the window
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Load snowflake image
    const snowflakeImage = new Image();
    snowflakeImage.src = 'images/snowflake.png';

    // Create snowflakes array
    const snowflakes = [];

    class Snowflake {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 20 + 10; // Snowflake size
            this.speed = Math.random() * 1 + 0.5; // Falling speed
            this.opacity = Math.random() * 0.8 + 0.2; // Transparency
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.drawImage(snowflakeImage, this.x, this.y, this.size, this.size);
        }

        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.reset();
                this.y = -this.size;
            }
        }
    }

    // Animation loop
    const animateSnow = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowflakes.forEach((flake) => {
            flake.update();
            flake.draw();
        });
        requestAnimationFrame(animateSnow);
    };

    // Initialize snowflakes and start animation once the image is loaded
    snowflakeImage.onload = () => {
        for (let i = 0; i < 100; i++) {
            snowflakes.push(new Snowflake());
        }
        animateSnow();
    };
});
