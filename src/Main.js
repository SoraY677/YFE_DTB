import * as Matter from "matter-js";
import {MainManager} from "./MainManager"

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
engine.world.gravity.x = 0;
engine.world.gravity.y = 0.7;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 800,
    }
});

//総合管理マネージャーインスタンス
var manager = new MainManager(render.options.width,render.options.height,Matter,engine);

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
    max: { x:manager.WINDOW_WIDTH, y:manager.WINDOW_HEIGHT}
});

manager.ResetGame();

//クリック離された際の処理
Events.on(mouseConstraint,'mouseup',function(Event){
    manager.MouseupEvent(Event);
});

//マウスが動いた際の処理
Events.on(mouseConstraint,"mousemove",function(Event){
    manager.MousemoveEvent(Event);
});

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);