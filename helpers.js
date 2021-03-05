
class HealthBar {
    constructor(agent, game) {
        Object.assign(this, {agent, game});
    }

    update () {

    }

    draw(ctx) {
        if (!this.agent.dead && this.agent.hp < this.agent.maxHp) {
            var ratio = this.agent.hp / this.agent.maxHp;
            ctx.strokeStyle = "Black";
            ctx.fillStyle = ratio < 0.2 ? "Red" : ratio < 0.5 ? "Yellow" : "Green";
            var x = this.agent.BB.x - this.game.camera.x
            var y = this.agent.BB.y + this.agent.BB.height + 10
            ctx.fillRect(x, y, this.agent.BB.width * ratio, 10);
            ctx.strokeRect(x, y, this.agent.BB.width, 10);
        }
    }
}

class DamageText {
    constructor(game, x, y, damage, textColor) {
        Object.assign(this, { game, x, y, damage, textColor });

        this.velocity = -2 * 16;
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 1) this.removeFromWorld = true;

        this.y += this.game.clockTick * this.velocity * 3;
    };

    drawMinimap(ctx, mmX, mmY) {
    }

   draw(ctx) {
        ctx.font = '24px "Press Start 2P"';
        ctx.fillStyle = this.textColor;
        if (this.damage > 0) {
            ctx.fillText("+" + this.damage, this.x - this.game.camera.x, this.y);
        } else {
            ctx.fillText(this.damage, this.x - this.game.camera.x, this.y);
        }
    };
};
