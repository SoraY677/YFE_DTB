import * as Matter from "matter-js";
import {Animal,Point,Size} from "./animal";

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
        height: 600,
        showAngleIndicator: true,
        showCollisions: true
    }
});

// add bodies
World.add(engine.world, [
    // walls
    Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
    Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
    Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
    Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
]);

var animal = [new Animal(new Point(100,100),new Size(100,100),Matter)];
var animallength = 1;

// add all of the bodies to the world
World.add(engine.world, [animal[0].getBall(Bodies)]);
// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: true
            }
        }
    });
World.add(engine.world, mouseConstraint);

render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});


//マウスのクリックが離された時の動作
Events.on(mouseConstraint,'mouseup',function(Event){
    console.log("mouse up")
    animal[animallength-1].dropObject(Body);
    animallength = animal.push(new Animal(new Point(Event.mouse.position.x,50),new Size(100,100),Matter))
    World.add(engine.world, animal[animallength-1].getBall(Bodies));
});

//マウスが動いた際の処理
Events.on(mouseConstraint,"mousemove",function(Event){
    animal[animallength-1].moveObject(Event.mouse.position.x,50)
});

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);