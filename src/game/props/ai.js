class Ai {
    constructor(name, nodes){
        this.activityLevel;
        this.name = name;
        this.nodes = nodes;
    }

    run(level){
        this.activityLevel = level;
    }
}

export default Ai