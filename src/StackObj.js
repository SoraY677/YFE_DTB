//���Ƃ��A�j�}���̃N���X
export class StackObj{
    //����������
    /*���� point:�I�u�W�F�N�g�̝����ݒ���W(Point�^), size:��ʃT�C�Y(Point)
           skind;�I�u�W�F�N�g�̌^�̎��, dropstd:�����Ă��邩�ǂ������肷��p�̊�l
           Matter:Matter*/
    //�Ԓl �Ȃ�
    constructor(point, size, skind,  Matter ){
        this.angle = 0;
        this.Matter = Matter;
        this.Bodies = Matter.Bodies;
        //this.dropstd = dropstd; 
        this.dropflag = 0;
        //��ނɂ���ĕԂ��}�`��ς���
        switch(skind){
            //�l�p�`
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
            //�O�p�`
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
            //�l�p
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

    //��ʊO��������
    //����
    //windowleft:��ʍ��[�̗�������
    //windowright:�E�[
    //windowdown:��
    //�Ԓl�@�����������ǂ����̔���(true:��ʊO�������莞,false:��ʓ�)
    dropJudge(windowleft,windowdown,windowright){
        //x����
        if(this.shape.position.x < windowleft)return true;
        else if(this.shape.position.x > windowright)return true;
        //y����
        if(this.shape.position.y > windowdown)return true;
        return false
    }

    //�w�肵���ȏ�̉����x�̏ꍇ�͓��쒆�Ƃ݂Ȃ���true��Ԃ�
    //�����@stdspeed:�w��̉����x
    //�Ԓl�@�ړ������ǂ���(�ړ���:true,�~�܂��Ă���:false)
    changeJudge(stdspeed){
        if(this.shape.speed > stdspeed) return true;
        else return false
    }
}