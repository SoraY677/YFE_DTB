
//座標
export class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

//大きさ
export class Size{
    constructor(height,width){
        this.height = height;
        this.width = width;
    }
}

/*設置する動物のクラス */
export class Animal{
    constructor(point, size, Matter){
        this.point = point;
        this.size = size;
        this.Matter = Matter;
        this.Bodies = Matter.Bodies;
        this.maru = this.Bodies.circle(this.point.x,this.point.y,this.size.height,{
            //固定するかをtrueかfalseで変更
            isStatic: true,
            render: {
                lineWidth: 1,
                strokeStyle: '#d04030',
                fillStyle: '#d04030'
            }
        });
    }

    getBall(){
        return this.maru;
    }

    //マウスがクリックされた際に動物を落とす処理
    dropObject(){
        this.Matter.Body.setStatic(this.maru,false);
    }

    moveObject(ox,oy){
        console.log("x:",ox,"y:",oy);
        this.Matter.Body.setPosition(this.maru,{x:ox,y:oy});
    }
}
