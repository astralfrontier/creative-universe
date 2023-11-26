+++
title = "Creating Isometric Battlemaps in Blender"
description = "The tools and techniques for making nice 3D maps"
date = "2023-11-25 16:40:15"
authors = ["astralfrontier"]

[taxonomies]
tags = ["Blender"]

[extra]
banner_image = "blog/Arise.png"
+++

Here's what I did to create a battlemap for Arise.

<!-- more -->

# The Model

1. Add a Grid mesh to the world
2. Set the number of divisions to 8 (or 12, or whatever)
3. Set the total size to (2m * number of divisions), e.g. 16m for an 8x8 grid

This gives you a basic grid to work with.

## Raising individual squares

In Edit mode, selecting one or more faces and typing `e1` will extrude a face up by 1 meter.
Because the Grid's normals are aimed face up, you don't have to fix the extrusion along a particular axis.
You can extrude multiple faces multiple times.

## Ramps and slopes

You can create ramps and slopes by selecting an edge and typing `gz-1` (to move down 1 meter),
for example. The downside is that this will drag neighboring squares' vertices, which may not be what you want.

An alternative is to extrude the faces around where you intend to put a ramp,
then extrude the ramp face separately, then manipulate its edges.

# Textures

I experimented with models and textures from the following sources:

- Tiny Texture Pack 1-3 from [Screaming Brain Studios](https://screamingbrainstudios.itch.io/)
- Kenney's 3D models at [kenney.nl](https://kenney.nl/)

# Exporting an Isomorphic image

1. Set the camera angles to X = 54.7 degrees, Y = 0.000004 degrees, Z to 45 degrees.
2. Move your camera so that the entire map is in view
3. In the Camera properties, set the Lens Type to "Orthographic"
4. Render and save the image

## Delineating squares

To include lines showing the boundaries of each square:

1. Add a "Wireframe" modifier.
2. Turn off "Replace Original", and leave other settings alone.
3. In Render Properties, turn on Freestyle
4. In View Layer, turn on Freestyle