import ShopItem from "../views/ShopItem";

export enum ItemType {
    Money = 0,              //钱
    Coin,                   //金币
    Diamond,                //钻石
    CardRecord,             //记牌器
    Speaker,                //喇叭
    None
}

export enum ShopItemType {
    Item,
    Price
}

export function getItemTypeName(type:ItemType, shopItemType:ShopItemType) {
    let type2prefix = {};
    type2prefix[ItemType.Money] = "cash";
    type2prefix[ItemType.Coin] = "coin_";
    type2prefix[ItemType.Diamond] = "jewe_";
    type2prefix[ItemType.CardRecord] = "record_";
    type2prefix[ItemType.Speaker] = "amplifier";
    
    let itemName = "record_";
    if(shopItemType == ShopItemType.Item) {
        itemName += "b";
    }else if(shopItemType == ShopItemType.Price) {
        itemName += "s";
    }
    return itemName; 
}

export enum CardType {
    Spades,                 //黑桃
    Hearts,                 //红桃
    Clubs,                  //梅花
    Diamonds,               //方块
    Other,                  //大王，小王
    None
}

