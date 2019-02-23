import * as Matter from "matter-js";
import {Animal,Point,Size} from "./animal";
// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engines
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

var animal = new Animal(new Point(100,100),new Size(100,100));

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [animal.getBall(Bodies), boxB, ground]);

document.onmousedown = function(e){
    console.log(e);
    console.log(Matter.Vector.create(100,100));
   Matter.Body.setPosition(animal.getBall(Bodies),Matter.Vector.create(e.screenX,e.screenY));
}

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);