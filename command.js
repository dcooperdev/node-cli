const FileSystem = require('./fileSystem');

class Path {
    constructor() {
        this.fileSystem = new FileSystem();
        this.pathPosition = this.fileSystem.insert('home', null);
    }

    cd(dirName) {
        if (this.pathPosition && this.pathPosition.father !== null && dirName === '..') {
            this.pathPosition = this.fileSystem.findByName(this.pathPosition.father)
        } else if (this.pathPosition && this.pathPosition.father === null && dirName === '..') {
            return;
        } else if (this.pathPosition && this.pathPosition.childs.length > 0) {
            const childName = this.pathPosition.childs.find(child => child === dirName);
            const child = this.fileSystem.findByName(childName);
            this.pathPosition = child;
        }
        return 'Directory not found';
    }

    mkdir(name) {
        if (name.length > 100) {
            return 'Invalid folder name'
        }
        const result = this.fileSystem.insert(name, this.pathPosition.name)
        if (result === 'Directory already exists') {
            console.log('Directory already exists');
        }
    }

    pwd() {
        console.log(this.fileSystem.showPath(this.pathPosition.name));
    }
    
    ls() {
        this.pathPosition.childs.forEach(el => {
            console.log(el);
        })
    }
}
class CommandLine {
    constructor() {
        this.path = new Path;
        this.validCommands = ['quit', 'pwd', 'ls', 'mkdir', 'cd', 'touch']
        this.command = null;
    }
    
    onCommand(comm) {
        this.params = [];
        const parsedCommand = comm.split(' ');
        if (this.validCommands.includes(parsedCommand[0])) {
            this.command = parsedCommand[0];
        } else {
            console.log(`Unrecognized command, the availables commandas are: ${this.validCommands}`);
        }

        parsedCommand.forEach(param => {
            if(param !== this.command) {
                this.params.push(param);
            }
        })

        this.executeCommand();
    }

    executeCommand() {
        if (this.command === 'mkdir') {
            this.path.mkdir(this.params[0]);
        } else if (this.command === 'cd') {
            this.path.cd(this.params[0]);
        } else if (this.command === 'pwd') {
            this.path.pwd();
        } else if (this.command === 'ls') {
            this.path.ls();
        } else if (this.command === 'quit') {
            process.exit(0);
        }
    }
}

module.exports = CommandLine
