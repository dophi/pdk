import { ItemType, CardType } from "../globals/Types";

/*
    所有数据都放这个类管理
 */

export class EmailData {
    public isRead: boolean;
    public content: string;
    public itemType: ItemType;
    public itemCount: number;
}

export class ShopItemData {
    public type: ItemType;
    public count: number;
    public price: number;
    public priceType: ItemType;     //这里用来购买的item可以是任何ItemType类型的任何东西，这样更灵活
}

export class ItemData {
    public sid: number
    public type: ItemType;
    public count: number;
}

//这个暂时定为不由DataManager管理，由GameModel管理，因为是临时数据
export class CardData {
    public sid: number;
    public type: CardType;
    public point: number;
}

export class DataManager {
    private static instance: DataManager = null;
    private constructor() { };
    public Instance() {
        if (DataManager.instance == null) {
            DataManager.instance = new DataManager;
        }
        return DataManager.instance;
    }

    private enableSound: boolean = true;
    private enableMusic: boolean = true;
    private isMale: boolean = true;

    private coinCount: number = 1900800;
    private diamondCount: number = 2100;

    private emails: EmailData[] = [];
    private shopItems: ShopItemData[] = [];

    getCoinCount(): number {
        return this.coinCount;
    }

    setCoinCount(count: number) {
        this.coinCount = count;
    }

    getDiamondCount(): number {
        return this.diamondCount;
    }

    setDiamondCount(count: number) {
        this.diamondCount = count;
    }

    getEnableSound(): boolean {
        return this.enableSound;
    }

    setEnableSound(isEnable: boolean) {
        this.enableSound = isEnable;
    }

    getEnableMusic(): boolean {
        return this.enableMusic;
    }

    setEnableMusic(isEnable: boolean) {
        this.enableMusic = isEnable;
    }

    //网络数据处理

}