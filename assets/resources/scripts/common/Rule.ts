import { CardType } from "../globals/Types";
import { CardData } from "./DataManager";

enum CardSetType {
    Single,                 //单       5
    SingleStraight,         //单顺     56789 最少5张

    Double,                 //对子      55      
    DoubleStraight,         //对子顺    5566  至少两个连着的对子

    ThreeStraight,          //飞机顺    555666 3467  至少一个连着的飞机

    Bomb,                   //炸弹      5555  四张相同的牌
}

export interface ICardData {
    type: CardType;
    point: number;
}

//点数相同的牌分类，记录了数量
interface ICardClassData {
    point: number;
    count: number;
}

class CardSetBase {
    protected type: CardSetType = null;
    protected cardSet: ICardData[] = null;
    protected cardClassSet: ICardClassData[] = null;

    //如果是连子，连子的数量是多少
    protected straightCount: number = 0;

    //根牌点数上限，用来处理2这种特殊点数，2最大
    protected rootCardPointMax: number = 100;

    //根牌点数作用是用来比较同类牌组大小的，比如 55589根牌是5  888 JQ根牌是8, 根牌8的更大 
    protected rootCardPoint: number = 0;

    protected isStraight(newCardClassSet: ICardClassData[]): [boolean, number] {
        let ret: [boolean, number] = [false, 0];

        if (newCardClassSet.length == 0) {
            return ret;
        }

        let prevPoint = newCardClassSet[0].point;
        for (let idx = 0; idx < newCardClassSet.length; idx++) {
            let curCard = newCardClassSet[idx];
            if (curCard.point - prevPoint == 1) {
                prevPoint = curCard.point;
            } else {
                return ret;
            }
        }

        ret[0] = true;
        ret[1] = newCardClassSet.length;
        return ret;
    }

    protected collectByCount(cardClassSet: ICardClassData[], count: number): [ICardClassData[], number] {
        let otherTotalCount = 0;
        let straight: ICardClassData[] = this.cardClassSet.filter((cardClassData, idx, arr) => {
            if (cardClassData.count >= count) {
                return true;
            } else {
                otherTotalCount += cardClassData.count;
                return false;
            }
        });
        return [straight, otherTotalCount];
    }


    /*
        cardSet: 原始牌组
        cardClassSet:分类过后的牌组，相同点数的牌是一类
    */
    public constructor(cardSet: ICardData[], cardClassSet: ICardClassData[]) {
        this.cardSet = cardSet;
        this.cardClassSet = cardClassSet;
    }

    public isValid(): boolean {
        return false;
    }

    public getRootCardPoint(): number {
        if (this.rootCardPoint == 2) {
            return this.rootCardPointMax;
        } else {
            return this.rootCardPoint;
        }
    }

    public getStraightCount(): number {
        return this.straightCount;
    }
}

class Single extends CardSetBase {
    public constructor(cardSet: ICardData[], cardClassSet: ICardClassData[]) {
        super(cardSet, cardClassSet);
        this.type = CardSetType.Single;
    }

    public isValid(): boolean {
        if (this.cardSet.length == 1) {
            this.rootCardPoint = this.cardSet[0].point;
            return true;
        } else {
            return false;
        }
    }
}

/*
    TODO: 现在还有个bug, 444 555 6667 这种三带二的识别不出来是正确的
 */
class SingleStraight extends CardSetBase {
    public constructor(cardSet: ICardData[], cardClassSet: ICardClassData[]) {
        super(cardSet, cardClassSet);
        this.type = CardSetType.SingleStraight;
    }

    public isValid(): boolean {
        if (this.cardSet.length >= 5) { //连子至少5张牌
            let prevCardPoint = this.cardSet[0].point;
            for (let idx = 1; idx < this.cardSet.length; idx++) {
                let curCard = this.cardSet[idx];
                if (curCard.point - prevCardPoint == 1) {
                    prevCardPoint = curCard.point;
                } else {
                    return false;
                }
            }
            this.rootCardPoint = this.cardSet[0].point;
            this.straightCount = this.cardSet.length;
            return true;
        } else {
            return false;
        }
    }
}

class Double extends CardSetBase {
    public constructor(cardSet: ICardData[], cardClassSet: ICardClassData[]) {
        super(cardSet, cardClassSet);
        this.type = CardSetType.Double;
    }

    public isValid(): boolean {
        if (this.cardSet.length == 2) {
            let firstCard = this.cardSet[0];
            let secondCard = this.cardSet[1];
            if (firstCard.point == secondCard.point) {
                this.rootCardPoint = firstCard.point;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

class DoubleStraight extends CardSetBase {
    public constructor(cardSet: ICardData[], cardClassSet: ICardClassData[]) {
        super(cardSet, cardClassSet);
        this.type = CardSetType.DoubleStraight;
    }

    public isValid(): boolean {
        let result = this.collectByCount(this.cardClassSet, 2);
        let newCardClassSet: ICardClassData[] = result[0];
        let ret: [boolean, number] = this.isStraight(newCardClassSet);
        if (ret) {
            let otherCardTotalCount = result[1];
            if (otherCardTotalCount == 0) {
                this.straightCount = ret[1];
                this.rootCardPoint = newCardClassSet[0].point;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}


class ThreeStraight extends CardSetBase {
    public constructor(cardSet: ICardData[], cardClassSet: ICardClassData[]) {
        super(cardSet, cardClassSet);
        this.type = CardSetType.ThreeStraight;
    }

    public isValid(): boolean {
        let result = this.collectByCount(this.cardClassSet, 3);
        let newCardClassSet: ICardClassData[] = result[0];
        let ret: [boolean, number] = this.isStraight(newCardClassSet);
        if (ret) {
            let otherCardTotalCount = result[1];
            //这个逻辑意思是，每个飞机带2张，如果飞机数*2和牌组中非飞机的牌数量总数相同，就是符合飞机顺子定义的
            if (this.straightCount * 2 == otherCardTotalCount) {
                this.straightCount = ret[1];
                this.rootCardPoint = newCardClassSet[0].point;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

class Bomb extends CardSetBase {
    public constructor(cardSet: ICardData[], cardClassSet: ICardClassData[]) {
        super(cardSet, cardClassSet);
        this.type = CardSetType.Bomb;
    }

    public isValid(): boolean {
        if (this.cardSet.length == 4) {
            if (this.cardSet[0].point == this.cardSet[1].point &&
                this.cardSet[0].point == this.cardSet[2].point &&
                this.cardSet[0].point == this.cardSet[3].point) {
                this.rootCardPoint = this.cardSet[0].point;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

export class Rules {
    public static getCardSetType(cardSet: ICardData[]): any {
        let point2cardClassData = {};
        for (let idx = 0; idx < cardSet.length; idx++) {
            let point = cardSet[idx].point;
            let newCardClassData:ICardClassData = point2cardClassData[point];
            if (newCardClassData == undefined) {
                newCardClassData = {point:point, count:1};
                point2cardClassData[point] = newCardClassData;
            }

            newCardClassData.count++;
        }

        let cardClassSet = [];
        for (const key in point2cardClassData) {
            if (point2cardClassData.hasOwnProperty(key)) {
                const element = point2cardClassData[key];
                cardClassSet.push(element);
            }
        }

        let obj = null;
        obj = new Single(cardSet, cardClassSet);
        if (obj.isValid()) {
            return obj
        }

        obj = new SingleStraight(cardSet, cardClassSet);
        if (obj.isValid()) {
            return obj;
        }

        obj = new Double(cardSet, cardClassSet);
        if(obj.isValid()) {
            return obj;
        }

        obj = new DoubleStraight(cardSet, cardClassSet);
        if(obj.isValid()) {
            return obj;
        }

        obj = new ThreeStraight(cardSet, cardClassSet);
        if(obj.isValid()) {
            return obj;
        }

        obj = new Bomb(cardSet, cardClassSet);
        if(obj.isValid()) {
            return obj;
        }

        return null;
    }


    public static AwinB<T extends CardSetBase>(cardSetA: T, cardSetB: T): boolean {
        if (cardSetA.isValid() && cardSetB.isValid()) {
            return true;
        }
    }
}