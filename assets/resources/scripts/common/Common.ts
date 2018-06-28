export default class Common {
    static async loadPrefab(name):Promise<cc.Node> {
        let promise = new Promise<cc.Node>((resolve)=>{
            cc.loader.loadRes(name, cc.Prefab, (err, res) => {
                let node: cc.Node = cc.instantiate(res);
                resolve(node);
            });
        });

        return promise;
    } 
    static async addPrefabToScene(name) {
        let node = await this.loadPrefab(name);
        node.parent = cc.director.getScene();
    }
}