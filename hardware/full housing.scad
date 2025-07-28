$fn = 100;

wall_thickness = 3;

// Petri dish / membrane holder
petri_inner_diameter = 67;
petri_outer_diameter = petri_inner_diameter + wall_thickness;
petri_height = 10;

// Legs
leg_diameter = 6;
leg_height = 60;

// Adjustable parameters
inner_diameter = 58;
outer_diameter = petri_inner_diameter + 2*wall_thickness + leg_diameter*2 + 1.4;
led_radius = (inner_diameter + (outer_diameter-inner_diameter)/1.082)/2;
led_hole_diameter = 3.2;
led_tilt = 45;
led_count = 10;

// Camera
camera_case_protrution = 9;
camera_slot_width = 30.8;
lens_protrution = 13+2;

module base() {
  union() {
    cylinder(h=wall_thickness, d=outer_diameter);
    translate([2,0,-0.5*camera_case_protrution])
      cube([camera_slot_width+2*wall_thickness,camera_slot_width+2*wall_thickness,camera_case_protrution], center = true);
  }
}

module camera_slot() {
  // 12mm from top, 16mm from bottom, 30.4 across
  // 12mm tall, wtih 3mm of base, exposes 9mm of case
  translate([2,0,-0.5*(camera_case_protrution-wall_thickness)])
    cube([camera_slot_width,camera_slot_width,camera_case_protrution+wall_thickness], center = true);
}

// Main LED ring with tilted through-holes
module led_ring() {
  difference() {
    base();
    camera_slot();
        
    for (i = [0:led_count-1]) {
      angle = i * 360 / led_count;
      rotate([0,0,angle]) translate([led_radius,0,-1.2])
        rotate([0,315,0])
          cylinder(h=5, d=led_hole_diameter);
      rotate([0,0,angle]) translate([led_radius-2.9,0,1.7])
        rotate([0,315,0])
          cylinder(h=7.4, d1=3.2, d2=11);
    }
  }
}


// Legs
module legs() {
  for (i = [0:led_count/2]) {
    angle = i * 360 / (led_count/2)+17.5;
    rotate([0,0,angle])
      translate([outer_diameter/2-leg_diameter/2-2,0,wall_thickness])
        cylinder(h=leg_height, d=leg_diameter);
  }
}

// Petri dish holder for membrane
module petri_dish() {
    translate([0,0,20+wall_thickness+leg_height-petri_height])
        difference() {
            cylinder(h=petri_height, d=petri_outer_diameter);
            cylinder(h=petri_height-wall_thickness, d=petri_inner_diameter);
        }
}

module blackout_cover() {
    translate([0,0,90])
        difference() {
            cylinder(h = leg_height+wall_thickness, d = outer_diameter+2+wall_thickness);
            cylinder(h = leg_height+wall_thickness, d = outer_diameter+2);
        }
}

// Attachment to increase camera height for lens
// Lens is 13mm tall + 2mm
module camera_slot_extension() {
  // 12mm from top, 16mm from bottom, 30.4 across
  // 12mm tall, wtih 3mm of base, exposes 9mm of case
  difference() {
    union() {
      translate([2,0,-20-camera_case_protrution])
        cube([camera_slot_width+2*wall_thickness,camera_slot_width+2*wall_thickness,lens_protrution], center = true);
      translate([2,0,-20-wall_thickness])
        cube([camera_slot_width+4*wall_thickness,camera_slot_width+4*wall_thickness,camera_case_protrution+wall_thickness], center = true);
    }
    union() {
      translate([2,0,-20-camera_case_protrution])
        cube([camera_slot_width,camera_slot_width,lens_protrution], center = true);
      translate([2,0,-20])
        cube([camera_slot_width+2.2*wall_thickness,camera_slot_width+2.2*wall_thickness,camera_case_protrution], center = true);
    }
  }
}

// Assemble full system
module microplastics_detector() {
  led_ring();
  legs();
  petri_dish();
  blackout_cover();
  camera_slot_extension();
}

// Render
microplastics_detector();
