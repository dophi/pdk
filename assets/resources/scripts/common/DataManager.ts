import { ItemType, CardType } from "../globals/Types";
import Common from "../common/Common";
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
    public constructor(type, count, priceType, price) {
        this.type = type;
        this.count = count;
        this.priceType = priceType;
        this.price = price;
    }

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
    public static Instance() {
        if (DataManager.instance == null) {
            DataManager.instance = new DataManager;
            DataManager.instance._initTestData();  //todo: 测试数据，要删掉
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

    ////// 提供假数据
    private _initTestData() {
        for(let idx=0;idx<20;idx++) {
            let buyItemType = Common.randomInt(1, ItemType.None - 1);
            let count = Common.randomInt(0,10);
            let priceType = Common.randomInt(1,2);
            let price = Common.randomInt(1,2);
            let newItem = new ShopItemData(buyItemType,count*100,priceType, price);
            this.shopItems.push(newItem);
        }
    }

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

    getShopItemArray():ShopItemData[] {
        return this.shopItems;
    }
    //网络数据处理

}