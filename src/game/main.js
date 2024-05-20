class PathNode {
    constructor(name, position, image, attackNode){
        this.name = name;
        this.position = position;
        this.image = image;
        this.attackNode = attackNode;
    }

    activateNode(){
        console.log(`${this.name} is now in ${this.position}`);
    }

    clearNode(){
        console.log(`${this.name} has left ${this.position}`);
    }
}

class Ai {
    constructor(name, nodes){
        this.name = name;
        this.nodes = nodes;
    }

    run(level){
        this.activityLevel = level;
    }

    kill(){
        clearInterval(this.tracker);
    }

    jumpscare(){
        console.log('Jumpscare logic ran');
        this.killGame();
    }

    set kill(kill){
        this.killGame = kill;
    }
}

class Game {
    constructor(AI){
        this.Ai = AI;
    }

    start(){
        console.log('game started');
        for(let i in this.Ai){
            this.Ai[i].kill = this.kill;
        }
        this.Ai[0].jumpscare();
    }

    kill(){
        console.log('game ended');
    }
}

function startGame(){
    let timmy = new Ai("timmy", []);

    const game = new Game([timmy]);
    game.start();
}

document.getElementById('start').addEventListener('click', startGame);