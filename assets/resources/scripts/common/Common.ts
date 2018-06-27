export default class Common {
    static addPrefabToScene(name) {
        cc.loader.loadRes(name, cc.Prefab,(err, res)=>{
            let node = cc.instantiate(res);
            node.parent = cc.director.getScene();
        });
    }
}