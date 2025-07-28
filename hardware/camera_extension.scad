$fn = 100;

wall_thickness = 3;

// Camera
camera_case_protrution = 9;
camera_slot_width = 30.8;
lens_protrution = 13+2;

// Attachment to increase camera height for lens
// Lens is 13mm tall + 2mm
module camera_slot_extension() {
  // 12mm from top, 16mm from bottom, 30.4 across
  // 12mm tall, wtih 3mm of base, exposes 9mm of case
  difference() {
    union() {
      translate([2,0,camera_case_protrution])
        cube([camera_slot_width+2*wall_thickness,camera_slot_width+2*wall_thickness,lens_protrution], center = true);
      translate([2,0,wall_thickness])
        cube([camera_slot_width+4*wall_thickness,camera_slot_width+4*wall_thickness,camera_case_protrution+wall_thickness], center = true);
    }
    union() {
      translate([2,0,camera_case_protrution])
        cube([camera_slot_width,camera_slot_width,lens_protrution], center = true);
      translate([2,0,0])
        cube([camera_slot_width+2.2*wall_thickness,camera_slot_width+2.2*wall_thickness,camera_case_protrution], center = true);
    }
  }
}

// Render
camera_slot_extension();
