+++
title = "Principles of Arise GMCs"
description = "How to design adversaries for Arise"
date = "2023-11-28 23:13:37"
authors = ["astralfrontier"]

[taxonomies]
tags = ["Arise"]

[extra]
banner_image = "blog/Arise.png"
+++

The [Arise playtest](https://mataramg.itch.io/arise-trpg) is out,
but there's only a handful of GMCs - GM Characters, or "monsters" - available.
Let's work out some principles to make more, and then create a few

<!-- more -->

# Deconstructing the Arise GMCs

Like characters, GMCs have aspects.
These affect their vulnerabilitties, but don't otherwise impact individual stats.

## Stat blocks

The first thing you'll notice is that each stat block has two versions of a GMC:
a lower-rank baseline and a version that's two ranks higher.
The difference is slightly higher stats and (usually) a bonus move from their move list.
So this simplifies things - I just need a way to create those baseline GMCs.
But it would be nice if the upranked versions were consistent too!

I created a [spreadsheet](https://docs.google.com/spreadsheets/d/1nABDEg1_IjH-3T1cElCi6dgB6y9qoKdfBE1nnF5OeJo/edit?usp=sharing)
with the existing GMCs and their stats, and tried to figure out if
I could assign a "stat weight" to things like SPD and PDEF.
This would multipy (stat value * stat weight) for each stat, sum the result,
and compare that against a similarly weighted value based on rank.
Ideally, a correctly weighted rank would balance against the sum of correctly weighted stats.
I kept a running total of the standard deviation for the difference - the lower that deviation,
the closer I was.

The result goes something like this:

- You start with SPD 1, Dash 2, ATK or MGK 5, PDEF 5, MDEF 5, 1 Counter, 5 HP
- Your budget is 30 points per rank, +/- 5 points per rank (so you can go between 100 and 140 at rank 4, being 120 +/- 20)
- Spend 5 points per +1 to SPD, Dash, or HP
- Spend 5 points to raise Counters to 2 for upranked monsters
- Spend 5 point per +5 to ATK, MGK, PDEF, or MDEF

If you roughly balance your points spent, favoring stats appropriate to the GMC (for example,
more PDEF for tankier monsters, more SPD or Dash for fast guys),
this process should give you something like the standard GMCs.

## Moves

Each GMC has 3-4 moves on its AI list.
While it's important that these be specialized to really bring out a GMC's personality,
there's still a few things we can glean from them.

To populate a GMC's move list, start with the basic enemy. Design 3 moves.
Add an additional move for upranked enemies that activates on a 6.
Before that, decide how often each move should fire: with a 1/6 chance, a 2/6 chance, or a 3/6 change.

The basic move types are:

- Dash +0, Melee Attack +0
- Dash +0, Ranged Attack +0, Range 4
- I gain 2 beneficial statuses, or gain 1 status + heal 1 HP
- Summon a bonus enemy at the bottom of the round, cancel if I die (upranked enemies only)

If the move is an attack, it will receive 1-3 upgrades.
Give it a number of upgrades based on how often it fires:

- 3 in 6 chance (e.g. 1-3, 4-6): 1 upgrade
- 2 in 6 chance: 2 upgrades
- 1 in 6 chance: 3 upgrades

Take Dash -1 to gain an extra upgrade

Typical upgrades for an attack:

- Raise Dash by +1
- Chance to inflict a status (33% chance per upgrade spent, e.g. on a 1-2 on d6)
- Instead of doing damage, inflict a status
- Gain +5 ATK or +10 DEF
- Change a single-target attack to an AOE, e.g. Line 3
- Add an elemental damage type
- Change the tile type where the attack lands
- Adjust target or self's position by 1 on the turn tracker

Of course, moves should not be bound by this format - this is intended
as a starting point, not a straitjacket.

# Creating new GMCs

Let's use these guidelines to see if we can construct a new enemy type.

## The Skrint

Skrint (the singular and plural are the same) are small goblinkind
with a worrying quality: when a band of Skrint latch onto something
beautiful or interesting, they develop a hivemind with each other.
Without individual motivations, the collective sets to work
protecting and venerating the "shiny" that has captured their attention.

For this reason, fellow Skrint often encourage adventurers to
steal the "shiny" away from a Skrint pack that's fixated on it,
even if some individual members of the pack must be hurt.
Once the "shiny" is gone, the hivemind collapses and the
affected Skrint will return to their original selves.

Individual Skrint in the world often pick up eccentric habits,
manners of dress, or obsessions in an attempt to resist this
urge with fellow Skrint. They become fanatically individual
to retain their selves, no matter how quirky or weird it makes them seem.
Their latent telepathy, the source of the hivemind,
otherwise makes them empathetic and sensitive to the needs and feelings of others.

## Skrint Design

We'll start Skrint as a rank 2 GMC with the Metal aspect (when they are in their hivemind).

Their base stats are SPD 1 Dash 2 ATK 5 PDEF 5 MDEF 5 Counters 1 HP 5.
Our point budget is (30 * 2) or 60, plus or minus (5 * 2) or 10 points.
We'll give them the standard 60 points.

We spend 10 points for SPD 3, 5 points for Dash 3, and nothing for HP.
We'll spend 10 points on both PDEF and MDEF, bringing them to 15.
25 points gives us an ATK of 30, and we leave MGK at 5.
That's 60 points.

Comparing our stats to the rank 2 soldier, we see it has
SPD 2, Dash 3, ATK 30, MGK 0, PDEF 15, MDEF 5, HP 6.
The Skrint is a little faster but a little more frail by comparison.

We'll give the Skrint the following moves:

- Raking Claws (1-3): Dash +0, Melee Attack +5.
- Pelting Rocks (4-5): Dash +0, Ranged Attack +5, Range 4. Sharp Rocks: Roll d6: on 1-2, the target is BLEEDING.
- Battle Frenzy (6): I gain HASTE heal 1 HP

Upranked Skrint at rank 4 get +1 SPD, +1 Counter, +2 HP, and a +5 to ATK, PDEF, and MDEF. Their move list is:

- Raking Claws (1-2): Dash +0, Melee Attack +5.
- Pelting Rocks (3-4): Dash +0, Ranged Attack +5, Range 4. Sharp Rocks: Roll d6: on 1-2, the target is BLEEDING.
- Battle Frenzy (5): I gain HASTE heal 1 HP
- Summon Pack (6): add one Skrint (Basic) to the bottom of the turn tracker, otherwise as per the Grave Thrall's "Howlcall" move.

## Skrint Encounters

An encounter with a Skrint hivemind should include at least one upranked Skrint,
who can summon more units.

The map should include the "shiny" - an object, or a doorway to a place - that
the Skrint have latched onto. An objective of the battle should be to deprive
the hivemind of the shiny, thus bringing the Skrint to their senses.

The GM can stipulate that Downed Skrint aren't killed, merely injured,
and that they'll be treated by their comrades once the hivemind is dispelled.
The PCs can help with this task, perhaps during a Camp scene.