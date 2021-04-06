const particles = []

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)

    const particlesLength = Math.floor(window.innerWidth / 10)

    for(let i = 0; i < particlesLength; i++) {
        particles.push(new Particle())
    }
}

function draw() {
    background(40, 44, 53)

    particles.forEach((particle, index) => {
        particle.update()
        particle.draw()
        particle.checkParticles(particles.slice(index))
    })
}

class Particle {
    constructor() {
        this.position = createVector(random(width), random(height))
        this.velocity = createVector(random(-2, 2), random(-2, 2))
        this.size = Math.floor(random(5, 8))
    }

    update() {
        this.position.add(this.velocity)
        this.edges()
    }

    draw() {
        noStroke()
        fill('rgba(190, 253, 255, 0.5)')
        circle(this.position.x, this.position.y, this.size)
    }

    edges() {
        if(this.position.x < 0 || this.position.x > width) {
            this.velocity.x *= -1
        }

        if(this.position.y < 0 || this.position.y > height) {
            this.velocity.y *= -1
        }
    }

    checkParticles(particles) {
        particles.forEach(particle => {
            const distance = dist(this.position.x, this.position.y, particle.position.x, particle.position.y)

            if(distance < 150) {
                stroke('rgba(190, 253, 255, 0.1)')
                line(this.position.x, this.position.y, particle.position.x, particle.position.y)
            }
        })
    }
}