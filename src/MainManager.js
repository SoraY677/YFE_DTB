
import {Point} from "./Point";
import { StackObj } from "./StackObj";

//全体を総合的に管理し、Main.jsとのやり取りを行う中間管理職的なjsファイル
export class MainManager{

    constructor(windowx,windowy,Matter,engine){
        this.WINDOW_WIDTH = windowx;
        this.WINDOW_HEIGHT = windowy;
        this.Matter = Matter;
        this.engine = engine;
        this.stackobj;
        //現在のターン
        //(0:プレイヤーのターン,1:AIのターン -1:エラー)
        this.turnstate = -1;
    }

    //ゲームの初期化
    ResetGame(){
    //足場の追加
    this.Matter.World.add(this.engine.world, [this.Matter.Bodies.rectangle(400, 600, 600, 50, { isStatic: true }),]);
    
    //初手を決める
    this.turnstate = Math.floor( Math.random() * 2 );
    //最初のオブジェクトを生成
    this.stackobj = [new StackObj(new Point(100,100),new Point(100,100),Math.floor( Math.random() * 3 ),this.Matter)];
    //最初のオブジェクトを追加
    this.Matter.World.add(this.engine.world, [this.stackobj[0].getShape(this.Matter.Bodies)]);
    }

    //クリックが離された際の処理
    MouseupEvent(Event){
    //物体の落下
    this.stackobj[this.stackobj.length-1].dropObject(this.Matter.Body);
    //新たな物体の追加
    this.stackobj.push(new StackObj(new Point(Event.mouse.position.x,50),new Point(100,100), Math.floor( Math.random() * 3 ) ,this.Matter))

    this.Matter.World.add(this.engine.world, this.stackobj[this.stackobj.length-1].getShape(this.Matter.Bodies));
    }

    //マウスが動いた際の処理
    MousemoveEvent(Event){
        this.stackobj[this.stackobj.length-1].moveObject(Event.mouse.position.x,50);
    }

}