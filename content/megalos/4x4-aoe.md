+++
title = "4x4 AOE Effects"
weight = 30
[extra]
banner_image = "/shutterstock_1586177053.jpg"
+++

# 4x4 AOE Effects

Sometimes you need a boss to go big. Sometimes you need to model some kind of wild environmental phenomenon - lava, landslides, meteor falls, or whatever. You can use this system to create semi-random AOE effects.

## Map Assumptions

This system strongly assumes you are using a 4x4 zone map arranged in squares, very similar to the map layouts in MMORPGs such as Final Fantasy XIV. It will work on any map with at least 3x3 zones, and will work fine on larger maps if you change where the center points are positioned.

## Picking Affected Zones

This system uses the pips of a six-sided die as a guide to which parts of a 3x3 area will be targeted.

<div class="columns is-centered">
<div class="column">
<img src="/dice/3x3-1.svg" width="90" height="90">
</div>
<div class="column">
<img src="/dice/3x3-2.svg" width="90" height="90">
</div>
<div class="column">
<img src="/dice/3x3-3.svg" width="90" height="90">
</div>
<div class="column">
<img src="/dice/3x3-4.svg" width="90" height="90">
</div>
<div class="column">
<img src="/dice/3x3-5.svg" width="90" height="90">
</div>
<div class="column">
<img src="/dice/3x3-6.svg" width="90" height="90">
</div>
</div>

1. A single pip targets the center zone of a 3x3 area.
2. Two pips target the center zone, and one of the four diagonal corners. On a 4x4 map, the diagonal will be the one closest to the outer boundary of the map - filling the map with 2s would form an "X".
3. Three pips target the center zone and two of the four diagonals, forming a line. On a 4x4 map, the lines are perpendicular to the outermost corners - filling the map with 3s would form a diamond shape.
4. Four pips fill the four diagonal zones of the 3x3 area.
5. Five pips fill the center and four diagonal zones.
6. Six pips fill either the left- and right-most zones, or the top- and bottom-most zones - pick the alignment however you wish.

## Using 4x4 AOE Effects

<div class="columns is-centered">
<div class="column">
<img src="/dice/4x4-2.svg" width="120" height="120">
</div>
<div class="column">
<img src="/dice/4x4-3.svg" width="120" height="120">
</div>
<div class="column">
<img src="/dice/4x4-6-2.svg" width="120" height="120">
</div>
<div class="column">
<img src="/dice/4x4-3s.svg" width="120" height="120">
</div>
</div>

You roll from 1 to 4 dice. You can assign the dice to one of the four portions of the map. Instead of rolling, you can also just pick a result.

When 4x4 AOE effects come into play, their presence can be telegraphed before the effect actually lands. Let the players know an effect is active, and where it'll land. Have the effect actually land one round later (e.g. if a boss is creating the effect, it should happen during the boss's next action). This gives characters a chance to move out of the way.

Characters in a single zone are only affected once, no matter how many times the zone would be targeted.

## Interactive Tool

<div id="interactive-tool-root"></div>