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
            case 1:
            this.shape = this.Bodies.rectangle(point.x,point.y,size.x,size.y,{
                //??????true?false???
                isStatic: true,
                render: {
                    lineWidth: 1,
                    hasBounds: false,
                    enabled:true,
                    strokeStyle: '#d04030',
                    friction: 0.5,
                    fillStyle: '#d04030'
                }
            });
            return ;
            //三角形
            case 2:
            return;
            //四角
            case 3:
            return;
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
        //x畋標擣分
        if(this.shape.position.x < windowleft)return true;
        else if(this.shape.position.x > windowright)return true;
        //y擣分
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