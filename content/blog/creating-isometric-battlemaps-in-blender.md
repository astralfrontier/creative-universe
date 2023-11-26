+++
title = "Creating Isometric Battlemaps in Blender"
description = "The tools and techniques for making nice 3D maps"
date = "2023-11-25 16:40:15"
authors = ["astralfrontier"]

[taxonomies]
tags = ["Arise", "Blender"]

[extra]
banner_image = "blog/Arise.png"
+++

Here's what I did to create a battlemap for Arise in Blender.

<!-- more -->

Blender is a free, open source 3D application. It does 3D modeling, texture painting,
compositing, and even video editing. It can be downloaded for free at [blender.org](https://www.blender.org/).

Once you've installed Blender, open the program.

You can use `a` to select all objects, then `x` to delete everything and start fresh.

# The Grid

To get started with a map, add a Grid mesh to the world. Hit `Shift-a` and select Mesh, then Grid.

Once you've created the Grid, hit `F9` to edit its properties.
Set the number of subdivisions to 8 (or 12 for a larger map). This is the number of *faces* the Grid is divided into.
For size, enter `16m` for an 8x8 grid with 2 meter squares, or `24m` for a 12x12 grid.

To start modeling your map, click on the Grid with the mouse, then hit `Tab` to enter Edit mode.

Edit mode lets you make changes to the individual *vertices*, *edges*, and *faces*
that make up a 3D object. You'll mostly be working with faces - the squares - but sometimes
you'll be working with edges - the lines between squares - when making ramps and slopes.

In Edit mode, the `1`, `2` and `3` keys let you choose whether you're selecting vertices, edges, or faces.
To select faces, for example, hit `3`, then click on faces with your mouse.

You can leave Edit mode by hitting `Tab` again.

## Elevating individual squares

In Edit mode, selecting one or more faces and typing `e1` will extrude ("e") a face up by 1 meter ("1").

The Grid's *normals* - where a face is naturally "pointed" at - are aimed straight up.
Thus, when you extrude, you're creating more geometry aimed straight up.

You can extrude multiple times to raise a given square or set of squares.

## Ramps and slopes

You can create ramps and slopes by selecting an edge and typing `gz-1` (to move down 1 meter),
for example. This means move ("g") along the Z axis ("z") by negative one meters ("-1").

The downside is that this will drag neighboring squares' vertices, which may not be what you want.

An alternative is to extrude the faces around where you intend to put a ramp,
then extrude the ramp face separately, then manipulate its edges.

# Textures

I experimented with models and textures from the following sources:

- Tiny Texture Pack 1-3 from [Screaming Brain Studios](https://screamingbrainstudios.itch.io/)
- Kenney's 3D models at [kenney.nl](https://kenney.nl/)

# Exporting an Isomorphic image

1. Set the camera angles to X = 54.7 degrees, Y = 0.000004 degrees, Z = 45 degrees.
2. Move your camera so that the entire map is in view
3. In the Camera properties, set the Lens Type to "Orthographic"
4. Render and save the image

## Delineating squares

To include lines showing the boundaries of each square:

1. Add a "Wireframe" modifier.
2. Turn off "Replace Original", and leave other settings alone.
3. In Render Properties, turn on Freestyle
4. In View Layer, turn on Freestyle