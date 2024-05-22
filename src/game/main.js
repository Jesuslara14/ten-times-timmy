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
        this.currentNode.activateNode();
        this.newCycle();
    }

    newCycle(){
        this.tracker = setTimeout(this.cycle.bind(this), generateDelay(this.activityLevel));
    }
    
    cycle(){
        if(this.currentNode.nodeType == 'a'){
            let shouldNotAttack = this.attackControl();

            console.log(shouldNotAttack)
            if (!shouldNotAttack){
                return this.jumpscare();
            }else{
                this.currentNode.clearNode();
                this.currentNode = this.nodes[0];
                this.currentNode.activateNode();
            }
        } else {
            this.currentNode.clearNode();
            this.currentNode = this.getNextNode();
            this.currentNode.activateNode();
        }
        this.newCycle();
    }

    killAi(){
        clearTimeout(this.tracker);
    }

    getNextNode(){
        let randomNum = Math.random();
        let cumulativeWeight = 0;
        let nodeId = "";

        for (let node of this.currentNode.adjacentNodes) {
            cumulativeWeight += node.weight;
            if (randomNum < cumulativeWeight) {
                nodeId = node.nodeId;
                break;
            }
        }

        if (nodeId == ""){
            nodeId = this.currentNode.adjacentNodes[this.currentNode.adjacentNodes.length - 1].nodeId;
        }
        
        return this.nodes.find((node) => node.nodeId == nodeId);
    }

    jumpscare(){
        this.killGame();
    }
}

class Game {
    constructor(ai){
        this.ai = ai;
        this.emergencySounding = false;
        this.leftDoorClosed = false;
        this.rightDoorClosed = false;
    }

    start(){
        console.log('game started');
        for(let i in this.ai){
            this.ai[i].kill = this.kill.bind(this);
            this.ai[i].run(2);
            switch(this.ai[i].attack){
                case 'ld':
                    this.ai[i].attackCon = this.checkLeftDoor.bind(this);
                    break;
                case 'rd':
                    this.ai[i].attackCon = this.checkRightDoor.bind(this);
                    break;
                case 'vn':
                    this.ai[i].attackCon = this.checkEmergency.bind(this);
                    break;
            }
        }
        document.getElementById('leftDoor').addEventListener('click', this.toggleLeftDoor.bind(this));
        document.getElementById('rightDoor').addEventListener('click', this.toggleRightDoor.bind(this));
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

    checkLeftDoor(){
        return this.leftDoorClosed;
    }

    checkRightDoor(){
        return this.rightDoorClosed;
    }

    toggleEmergencyMeeting(){
        if(this.emergencySounding == false){
            this.emergencySounding = true;
            setTimeout(() => this.emergencySounding = false, 10000);
        }
    }

    toggleLeftDoor(){
        this.leftDoorClosed = !this.leftDoorClosed;
    }

    toggleRightDoor(){
        this.rightDoorClosed = !this.rightDoorClosed;
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
    let time = Math.ceil(((Math.random())*10)/level) * 500;
    return time;
}

document.getElementById('start').addEventListener('click', startGame);

/* AI Creation */

let nodeStrings = [
    [
        "rock",
        {id: 'rspr',type: 's',position: 'rpr',adjacent: [{nodeId: 'rih1',weight: 1}],image: 'rock.png'},
        {id: 'rih1',type: 'i',position: 'rh1',adjacent: [{nodeId: 'rih2',weight: 0.7}, {nodeId: 'risr',weight: 0.2}, {nodeId: 'rspr',weight: 0.1}],image: 'rock.png'},
        {id: 'rih2',type: 'i',position: 'rh2',adjacent: [{nodeId: 'rald',weight: 0.5}, {nodeId: 'risr',weight: 0.4}, {nodeId: 'rih1',weight: 0.1}],image: 'rock.png'},
        {id: 'risr',type: 'i',position: 'rsr',adjacent: [{nodeId: 'rih2',weight: 0.4}],image: 'rock.png'},
        {id: 'rald',type: 'a',position: 'rld',adjacent: [],image: 'rock.png'}
    ],
    [
        "timmy",
        { id: 'tspr', type: 's', position: 'tpr', adjacent: [{ nodeId: 'tih1', weight: 1 }], image: 'timmy.png' },
        { id: 'tih1', type: 'i', position: 'th1', adjacent: [{ nodeId: 'tih2', weight: 1 }], image: 'timmy.png' },
        { id: 'tih2', type: 'i', position: 'th2', adjacent: [{ nodeId: 'tard', weight: 1 }], image: 'timmy.png' },
        { id: 'tard', type: 'a', position: 'trd', adjacent: [], image: 'timmy.png' }
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

let rock = new Ai('rock', nodeList[0], 'ld');
let timmy = new Ai('timmy', nodeList[1], 'rd');