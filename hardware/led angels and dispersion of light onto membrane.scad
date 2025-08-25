$fn=100;

led_count = 5;
led_radius = 37;
led_view_angle = 50; // degrees
led_hole_diameter = 2.84;
ring_thickness = 3;
leg_height = 60;  // sample plane roughly at Z=60

// Draw a simple beam cone to show the approximate path
module beam_cone(angle, h) {
    base_r = tan(angle)*h;
    rotate([180,0,180])
        cylinder(h=h, r1=0, r2=base_r, center=false);
}

// LED ring with a given tilt angle, offset in X for side by side view
module led_ring_with_tilt(tilt_angle, x_offset) {
    translate([x_offset,0,0])
        difference() {
            cylinder(h=ring_thickness, d=80);
            cylinder(h=ring_thickness+0.2, d=58);
            for (i = [0:led_count-1]) {
                led_angle = i * 360 / led_count;
                rotate([0,0,led_angle])
                    translate([led_radius,0,0])
                        rotate([0,tilt_angle,0])
                            cylinder(h=10, d=led_hole_diameter);
            }
        }
        for (j = [0:led_count-1]) {
            beam_angle = j * 360 / led_count;
            rotate([0,0,beam_angle])
                rotate([0,0,0])
                    translate([x_offset+led_radius,0,0])
                        rotate([0,tilt_angle,0])
                            color("lightgreen",0.5)
                                beam_cone(led_view_angle/2, 66);  // approximate beam with LED viewing angle
        }
}

// Compose the three comparisons
led_ring_with_tilt(35, -200);
led_ring_with_tilt(40, 0);
led_ring_with_tilt(45, 200);

// Draw the membrane plane at leg_height
color("blue",0.3)
    translate([-300,-25,-leg_height])
        cube([600,50,0.5]);
