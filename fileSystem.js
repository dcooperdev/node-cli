class Node {
    constructor(data){
        this.name = data.name
        this.father = data.father
        this.childs = data.childs
    }
}
  
class FileSystem {
    constructor(){
        this.path = []
    }
    
    insert(name, fatherName){
        const exist = this.path.find(el => el.name === name)
        if (exist) {
            return 'Directory already exists';
        }

        const node = new Node({ name, father: fatherName, childs: [] })
        if(this.path.length === 0){
            this.path.push(node);
        }
        this.path.forEach(element => {
            if (fatherName === element.name) {
                node.father = element.name;
                element.childs.push(node.name)
                this.path.push(node);
                return;
            }
        })
        return node;
    }
    completePath(name) {
        let node = {};
        const cPath = [];
        cPath.push(this.findByName(name));
        while (node) {
            node = this.findByName(cPath[cPath.length - 1].father);
            if(typeof node !== 'undefined') {
                cPath.push(node);
            }
        }
        return cPath;
    }
    findByName(name) {
        const node = this.path.find((element) => {
            if (name === element.name) return element;
        });
        return node;
    }
    showPath(name) {
        let str = '';
        const nodesArray = this.completePath(name).reverse();
        nodesArray.forEach(node => {
            str += `${node.name}/`;
        })
        return str;
    }
}

module.exports = FileSystem;
