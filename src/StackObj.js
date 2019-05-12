//落とすアニマルのクラス
export class StackObj{
    //揄期化揶理
    /*引摧 point:オブジェクトの揄期昊定畋標(Point型), size:画面サイズ(Point)
           skind;オブジェクトの型の種類, dropstd:動いているかどうか判定する用の基捩値
           Matter:Matter*/
    //返値 なし
    constructor(point, size, skind,  Matter ){
        this.angle = 0;
        this.Matter = Matter;
        this.Bodies = Matter.Bodies;
        //this.dropstd = dropstd; 
        this.dropflag = 0;
        //種類によって返す掵形を変える
        switch(skind){
            //四角形
            case 0:
            this.shape = this.Bodies.rectangle(point.x,point.y,size.x,size.y,{
                //??????true?false???
                isStatic: true,
                render: {
                    lineWidth: 0.2,
                    hasBounds: false,
                    enabled:true,
                    restitution: 1,
                    strokeStyle: '#d04030',
                    friction: 1.0,
                    frictionStatic:10,
                    frictionAir : 1.0,
                    fillStyle: '#d04030'
                }
            });
            break;
            //三角形
            case 1:
            this.shape = this.Bodies.rectangle(point.x,point.y,20,20,{
                //??????true?false???
                isStatic: true,
                render: {
                    lineWidth: 0.2,
                    hasBounds: false,
                    enabled:true,
                    restitution: 1,
                    strokeStyle: '#d04030',
                    friction: 1,
                    frictionStatic:0,
                    frictionAir : 1.0,
                    fillStyle: '#d04030'
                }
            });
            break;
            //四角
            case 2:
            this.shape = this.Bodies.rectangle(point.x,point.y,20,50,{
                //??????true?false???
                isStatic: true,
                render: {
                    lineWidth: 0.2,
                    hasBounds: false,
                    enabled:true,
                    restitution: 1,
                    strokeStyle: '#d04030',
                    friction: 1.0,
                    frictionStatic:10,
                    frictionAir : 1,
                    fillStyle: '#d04030'
                }
            });
            break;
        }

    }

    getShape(){
        return this.shape;
    }

    //???????
    RotateObject(cangle){
        this.angle += cangle;
        this.Matter.Body.setStatic(this.shape,true);
        this.Matter.Body.setAngle(this.shape,this.angle);
        //this.Matter.Body.setStatic(this.shape,false);
    }

    //?????????????????????
    dropObject(){
        this.Matter.Body.setStatic(this.shape,false);
        //console.log(this.shape.position.x);
        this.Matter.Body.setPosition(this.shape,{x:this.shape.position.x,y:this.shape.position.y+80});
        this.dropflag = 1;
    }

    //?????????????????????????(y????)
    moveObject(ox,oy){
        //console.log("x:",ox,"y:",oy);
        if(this.dropflag == 0)this.Matter.Body.setPosition(this.shape,{x:ox,y:oy});
        //console.log(this.shape.position);
    }

    //画面外落下判定
    //引数
    //windowleft:画面左端の落下判定
    //windowright:右端
    //windowdown:下
    //返値戞落下したかどうかの判定(true:画面外落下判定時,false:画面内)
    dropJudge(windowleft,windowdown,windowright){
        //x成分
        if(this.shape.position.x < windowleft)return true;
        else if(this.shape.position.x > windowright)return true;
        //y成分
        if(this.shape.position.y > windowdown)return true;
        return false
    }

    //指定した以上の加速度の場合は動作中とみなしてtrueを返す
    //引数　stdspeed:指定の加速度
    //返値　移動中かどうか(移動中:true,止まっている:false)
    changeJudge(stdspeed){
        if(this.shape.speed > stdspeed) return true;
        else return false
    }
}