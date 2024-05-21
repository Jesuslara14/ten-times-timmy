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
    constructor(character, nodes, attack){
        this.character = character;
        this.nodes = nodes;
        this.attack = attack;
    }

    set kill(kill){
        this.killGame = kill;
    }

    set attackCon(control){
        this.attackControl = control;
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
            let shouldAttack = !this.attackControl();
            if (shouldAttack){
                this.jumpscare;
            }else{
                this.currentNode.clearNode();
                this.currentNode = this.nodes[0];
            }
        } else {
            
        }
        this.newCycle();
    }

    killAi(){
        clearTimeout(this.tracker);
    }

    findNode(nodeId){
        return this.nodes.find(e => e.nodeId == nodeId);
    }

    jumpscare(){
        console.log('Jumpscare logic ran');
        this.killGame();
    }
}

class Game {
    constructor(ai){
        this.ai = ai;
        this.emergencySounding = false;
        this.doorClosed = false;
    }

    start(){
        console.log('game started');
        for(let i in this.ai){
            this.ai[i].kill = this.kill;
            this.ai[i].attackCon = this.ai[i].attack == 'd' ? this.checkDoor : this.checkEmergency;
            this.ai[i].run(2);
        }
        console.log(this.ai);
    }

    kill(){
        for(let i in this.ai){
            this.ai[i].killAi();
        }
        console.log('game ended');
    }

    checkEmergency(){
        return this.emergencySounding;
    }

    checkDoor(){
        return this.doorClosed;
    }

    toggleEmergencyMeeting(){
        if(this.emergencySounding == false){
            this.emergencySounding = true;
            setTimeout(() => this.emergencySounding = false, 10000);
        }
    }

    toggleDoor(){
        this.doorClosed = !this.doorClosed;
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
];

let nodeList = [];

for(let i in nodeStrings){
    let nodeSet = [];
    for(let j = 1; j < nodeStrings[i].length; j++){
        let tempNode = new PathNode(nodeStrings[i][0], nodeStrings[i][j].id, nodeStrings[i][j].type, nodeStrings[i][j].position, nodeStrings[i][j].adjacent, nodeStrings[i][j].image);
        nodeSet.push(tempNode);
    }
    nodeList.push(nodeSet);
}

let timmy = new Ai('timmy', nodeList[0], 'd');