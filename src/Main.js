import * as Matter from "matter-js";
import {MainManager} from "./MainManager"
import {Point} from "./Point";
import { StackObj } from "./StackObj";

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint;

// create an engines
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 800,
        showAngleIndicator: true,
        showCollisions: true
    }
});

// add bodies
World.add(engine.world, [
    // ??
    Bodies.rectangle(400, 600, 600, 50, { isStatic: true }),
]);

var stackobj = [new StackObj(new Point(100,100),new Point(100,100),1,Matter)];

// add all of the bodies to the world
World.add(engine.world, [stackobj[0].getShape(Bodies)]);
// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});


//?????????????????
Events.on(mouseConstraint,'mouseup',function(Event){
    //console.log("mouse up");
    stackobj[stackobj.length-1].dropObject(Body);
    stackobj.push(new StackObj(new Point(Event.mouse.position.x,50),new Point(100,100), 1 ,Matter))
    World.add(engine.world, stackobj[stackobj.length-1].getShape(Bodies));
});

//???????????
Events.on(mouseConstraint,"mousemove",function(Event){
    stackobj[stackobj.length-1].moveObject(Event.mouse.position.x,50);
    //console.log(stackobj[0].getBall().speed);
    if(stackobj[0].dropJudge(0,800,600))console.log("object drop out!");
});

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);