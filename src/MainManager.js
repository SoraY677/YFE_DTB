
import {Point} from "./Point";
import { StackObj } from "./StackObj";

//�S�𑍍̂��I�ɊǗ����AMain.js�Ƃ̂������s�����ԊǗ��E�I��js�t�@�C��
export class MainManager{

    constructor(windowx,windowy,Matter,engine){
        this.WINDOW_WIDTH = windowx;
        this.WINDOW_HEIGHT = windowy;
        this.Matter = Matter;
        this.engine = engine;
        this.stackobj;
        //���݂̃^�[��
        //(0:�v���C���[�̃^�[��,1:AI�̃^�[�� -1:�G���[)
        this.turnstate = -1;
    }

    //�Q�[���̏�����
    ResetGame(){
    //����̒ǉ�
    this.Matter.World.add(this.engine.world, [this.Matter.Bodies.rectangle(400, 600, 600, 50, { isStatic: true }),]);
    
    //��������߂�
    this.turnstate = Math.floor( Math.random() * 2 );
    //�ŏ��̃I�u�W�F�N�g�𐶐�
    this.stackobj = [new StackObj(new Point(100,100),new Point(100,100),Math.floor( Math.random() * 3 ),this.Matter)];
    //�ŏ��̃I�u�W�F�N�g��ǉ�
    this.Matter.World.add(this.engine.world, [this.stackobj[0].getShape(this.Matter.Bodies)]);
    }

    //�N���b�N�������ꂽ�ۂ̏���
    MouseupEvent(Event){
    //���̗̂���
    this.stackobj[this.stackobj.length-1].dropObject(this.Matter.Body);
    //�V���ȕ��̂̒ǉ�
    this.stackobj.push(new StackObj(new Point(Event.mouse.position.x,50),new Point(100,100), Math.floor( Math.random() * 3 ) ,this.Matter))

    this.Matter.World.add(this.engine.world, this.stackobj[this.stackobj.length-1].getShape(this.Matter.Bodies));
    }

    //�}�E�X���������ۂ̏���
    MousemoveEvent(Event){
        this.stackobj[this.stackobj.length-1].moveObject(Event.mouse.position.x,50);
    }

}