/*
    所有数据都放这个类管理
 */

export class Email {
    private isRead: boolean = false;

}

export class DataManager {
    private static instance:DataManager = null;
    private constructor(){};
    public Instance() {
        if(DataManager.instance == null) {
            DataManager.instance = new DataManager;
        }
        return DataManager.instance;
    }

    private enableSound: boolean = true;
    private enableMusic: boolean = true;
    private isMale: boolean = true;

    private coinCount: number = 1900800;
    private diamondCount: number = 2100;

    private emails:Email[] = [];

    getCoinCount():number {
        return this.coinCount;
    }

    setCoinCount(count:number) {
        this.coinCount = count;
    }

    getDiamondCount():number {
        return this.diamondCount;
    }

    setDiamondCount(count:number) {
        this.diamondCount = count;        
    }

    getEnableSound():boolean {
        return this.enableSound;
    }

    setEnableSound(isEnable:boolean) {
        this.enableSound = isEnable;
    }

    getEnableMusic():boolean {
        return this.enableMusic;
    }

    setEnableMusic(isEnable:boolean) {
        this.enableMusic = isEnable;
    }

    //网络数据处理
    
}