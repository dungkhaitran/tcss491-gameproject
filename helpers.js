class HealthBar {
    constructor(agent, game) {
        Object.assign(this, {agent, game});
    }

    update () {

    }

    draw(ctx) {
        if (this.agent.hp < this.agent.maxHp) {
            var ratio = this.agent.hp / this.agent.maxHp;
            ctx.strokeStyle = "Black";
            ctx.fillStyle = ratio < 0.2 ? "Red" : ratio < 0.5 ? "Yellow" : "Green";
            ctx.fillRect(this.agent.x - this.game.camera.x, this.agent.y + this.agent.height + 10, this.agent.width * ratio, 10);
            ctx.strokeRect(this.agent.x - this.game.camera.x, this.agent.y + this.agent.height + 10, this.agent.width, 10);
        }
    }
}