
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
    constructor(point, size){
        this.point = point;
        this.size = size;
    }

    getBall(bodies){
        var maru = bodies.circle(this.point.x,this.point.y,this.size.height);
        return maru;
    }
    
    moveBall(x,y){
        this.point.x = x;
        this.point.y = y;
    }
}
