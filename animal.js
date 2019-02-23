
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
        this.dropflag = 0;
        this.maru = this.Bodies.rectangle(this.point.x,this.point.y,20,20,{
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
        this.dropflag = 1;
    }

    //マウスが動いた際に一緒の座標に合わせて移動する処理(y座標固定)
    moveObject(ox,oy){
        console.log("x:",ox,"y:",oy);
        if(this.dropflag == 0)this.Matter.Body.setPosition(this.maru,{x:ox,y:oy});   
    }
}
