$fn = 100;

wall_thickness = 3;

// Petri dish / membrane holder
petri_inner_diameter = 67;

// Legs
leg_diameter = 6;
leg_height = 60;

// Adjustable parameters
outer_diameter = petri_inner_diameter + 2*wall_thickness + leg_diameter*2 + 1.4;

module blackout_cover() {
  difference() {
      cylinder(h = leg_height+wall_thickness, d = outer_diameter+2+wall_thickness);
      cylinder(h = leg_height+wall_thickness, d = outer_diameter+2);
  }
}

// Render
blackout_cover();