/* Classes */

class PathNode {
    constructor(character, nodeId, nodeType, position, adjacentNodes, image){
        this.character = character;
        this.nodeId = nodeId;
        this.nodeType = nodeType;
        this.adjacentNodes = adjacentNodes;
        this.position = position;
        this.image = image;
    }

    activateNode(){
        console.log(`${this.character} is now in ${this.position}`);
    }

    clearNode(){
        console.log(`${this.character} has left ${this.position}`);
    }
}

class Ai {
    constructor(character, nodes){
        this.character = character;
        this.nodes = nodes;
    }

    set kill(kill){
        this.killGame = kill;
    }

    run(level){
        this.activityLevel = level;
        this.currentNode = this.nodes[0];
        this.newCycle();
    }

    newCycle(){
        this.tracker = setTimeout(this.cycle.bind(this), generateDelay(this.activityLevel));
    }
    
    cycle(){
        if(this.currentNode.nodeType == 'a'){

        } else {
            
        }
        this.newCycle();
    }

    killAi(){
        clearTimeout(this.tracker);
    }

    jumpscare(){
        console.log('Jumpscare logic ran');
        this.killGame();
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
            this.Ai[i].run(2);
        }
    }

    kill(){
        for(let i in this.Ai){
            this.Ai[i].killAi();
        }
        console.log('game ended');
    }
}

/* Utility Functions */

function startGame(){
    const game = new Game([timmy]);
    game.start();
    document.getElementById('killGame').addEventListener('click', game.kill.bind(game));
}

function generateDelay(level){
    if(level == 0){
        return 100000000000000;
    }
    let time = Math.ceil(((Math.random())*10)/level) * 1000;
    return time;
}

document.getElementById('start').addEventListener('click', startGame);


/* AI Creation */

let nodeStrings = [
    [
        "timmy",
        {id: 'tspr',type: 's',position: 'tpr',adjacent: ['tih1'],image: 'timmy.png'},
        {id: 'tih1',type: 'i',position: 'th1',adjacent: ['tih2', 'tisr'] ,image: 'timmy.png'},
        {id: 'tih2',type: 'i',position: 'th2',adjacent: ['tao', 'tisr'],image: 'timmy.png'},
        {id: 'tisr',type: 'i',position: 'tsr',adjacent: ['tih2'],image: 'timmy.png'},
        {id: 'tao',type: 'a',position: 'to',adjacent: [],image: 'timmy.png'}
    ]
]

let nodeList = []

for(let i in nodeStrings){
    let nodeSet = [];
    for(let j = 1; j < nodeStrings[i].length; j++){
        let tempNode = new PathNode(nodeStrings[i][0], nodeStrings[i][j].id, nodeStrings[i][j].type, nodeStrings[i][j].position, nodeStrings[i][j].adjacent, nodeStrings[i][j].image)
        nodeSet.push(tempNode)
    }
    nodeList.push(nodeSet)
}

let timmy = new Ai('timmy', nodeList[0])