# 2D to 3D Rendering
!["2d to 3d rendering"](assets\2d-to-3d-projection-showcase.gif)

## Summary

Inspired by the original DOOM video game, this is my attempt to recreate 3D rendering of a 2D game.

## How it works

Did you know that original DOOM was not entirely 3D? It had a 2D map in which the character moved around, which is why you can't look up or down, or that shooting enemies in high-ground requires no additional aiming.

How did they pull that off? I'm not sure, I actually didn't made further research on it... However, I got an idea that might replicate a limited version of the effect. Here is how it works:

- We can cast 2D rays in front of the character and check if the rays collided with anything.
- If they did, we can calculate the distance to the point of intersection (hence why all my walls are rectangles, makes it much easier).
- From this distance, we can render a vertical line of colored pixels whose color and location depend on this distance.
- With enough rays, the end result is a crude approximation of 3D space without actually doing any calculations in 3D!

## How to Install
- Just clone or download the files. You can use variety of ways to host the website locally.
- I use live server from VS Code.

## How to play
- Use left and right arrow buttons to rotate your character.
- To move around, use up and down arrow buttons.
- By adjusting the slider, you can change the number of rays casted, which essentially increases the resolution of the "render".