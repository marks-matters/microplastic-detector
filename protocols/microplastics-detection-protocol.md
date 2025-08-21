# Microplastics Detection Protocol

## Materials
- **Tap water sample**, 20 mL
- **Syringe**, ≤10 mL capacity
- **Pipette**, ≥10 mL capacity
- **Filter holder** with funnel and vacuum-enabled catchment beaker
- **Nylon membrane filter**, 47 mm diameter, 0.22 µm pore size
- **Vacuum pump**, 5v
- **Absolute ethanol**, ≥96%
- **Nile Red powder**
- **2 x amber vials** for stock and working solutions
- **Micropipette** for 100 µL dispensing
- **Raspberry Pi Camera 2**
- **6 mm macro lens**
- **LEE #134 Golden Amber emission filter**
- **LED ring with camera window and leg threads**, the 10 x LED slots angled inwards at 45° and 5 x leg threads
- **10 x green LED lights** with a wavelength of 560–568 nm (peak at 565nm) and a viewing angle of 50°
- **5 x 60 mm legs** with screw thread
- **Light shield** to block out light during florencence and imaging
- **N-MOSFET**, logic-level
- **Resistors**, 11 x 220 Ω (one per LED and one for the MOSFET gate) and 1 x 10 kΩ as a gate pull-down
- **5 V regulated supply** via Raspberry Pi 5 V rail
- **Petri dishes**, 60 mm, for positioning membrane, and 50 mm for covering during staining
- **Raspberry Pi** with image capture and analysis software
- **Breadboard** for wiring up LEDs, MOSFET and vacuum
- **Connector cables**

---

## 1. Nile Red Working Solution Preparation
- **Stock solution**: 1 mg/mL Nile Red in absolute ethanol (96%).  
- **Working solution**: dilute 0.1 mL stock + 0.9 mL ethanol to get **100 µg/mL**.  
- Prepare working solution fresh before staining.

---

## 2. Sample Measurement
- Measure **20 mL** of tap water using a clean syringe or pipette.  
- No pretreatment (e.g., oxidation or digestion) is applied.

---

## 3. Filtration
- Place a **47 mm nylon membrane filter, with 0.22 µm pore size** into the filter holder.  
- Pass the **20 mL sample** through the membrane using **gentle vacuum**.  
- Allow the membrane to **partially air dry** under gentle vacuum.

---

## 4. Staining the Membrane
- Transfer the membrane to a **60 mm Petri dish**.
- **Apply 4-5 drops**, totalling ~100 µL, of the 100 µg/mL Nile Red working solution evenly over the surface.
- Incubate for **30 minutes**, partially covered with another Petri dish and protected from light.
<!-- - Apply gentle vacuum for **1 minute** to remove excess solution. -->

---

## 5. Imaging Setup
- Use a **Raspberry Pi Camera 2** with an attached **6 mm lens** at **60 mm distance** from the membrane.
- **Emission filter** (Golden Amber) placed behind the lens.
- **10 green LEDs** (560–568 nm) mounted in parallel, with 220 Ω resistors, at ~45° around membrane.
- LEDs powered from 5 V rail, switched by N-MOSFET from Pi GPIO.
- LEDs on during capture; camera uses long exposure.

---

## 6. Image Capture & Processing
- Capture image via Pi software.
- Processing pipeline:
  1. Convert to HSV color space.
  2. Mask relevant hue ranges (deep red/red/orange).
  3. Blur, threshold, and clean image.
  4. Detect contours and count particles.
  5. Classify count into **Low / Medium / High**.

---

## 7. Cleanup
- Turn off LEDs via software.
- Remove or store membrane as needed.
- Save image and analysis output.