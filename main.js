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

var animal = new Animal(new Point(100,100),new Size(100,100),Matter);

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [animal.getBall(Bodies), boxB, ground]);
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

Events.on(mouseConstraint,'mouseup',function(Event){
    console.log("mouse up")
    animal.dropObject(Body);
});

//マウスが動いた際の処理
Events.on(mouseConstraint,"mousemove",function(Event){
    animal.moveObject(Event.mouse.position.x,50)
});

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);