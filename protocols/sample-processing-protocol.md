# Microplastics Detection Protocol

## 1. Sample Measurement
- Measure **10 mL** of tap water using a clean syringe or pipette.  
- No pretreatment (e.g., oxidation or digestion) is applied.

---

## 2. Filtration
- Place a **47 mm nylon membrane filter** (0.22 µm pore size) into the filter holder.  
- Pass the **10 mL sample** through the membrane using gentle vacuum.  
- Allow the membrane to **air dry under gentle vacuum** until mostly dry.

---

## 3. Nile Red Working Solution Preparation
- **Stock solution**: 1 mg/mL Nile Red in absolute ethanol (96%).  
- **Working solution**: dilute 0.1 mL stock + 0.9 mL ethanol to get **100 µg/mL**.  
- Prepare working solution fresh before staining.

---

## 4. Staining the Membrane
- With the membrane still in the holder:
  - Apply ~100 µL of the **100 µg/mL Nile Red** working solution evenly over the surface.
  - Incubate for **2 minutes** protected from light.
  - Apply gentle vacuum for **1 minute** to remove excess solution.

---

## 5. Imaging Setup
- Keep membrane in place on holder or 60 mm Petri dish.
- Use **Raspberry Pi Camera 2** + **6 mm lens** at **60 mm distance** from membrane.
- **Emission filter** (golden amber) placed behind the lens.
- **10 green LEDs** (560–568 nm) mounted at ~45° around membrane.
- LEDs powered from 5 V rail, switched by N-MOSFET from Pi GPIO.
- LEDs on during capture; camera uses long exposure.

---

## 6. Image Capture & Processing
- Capture image via Pi software.
- Processing pipeline:
  1. Convert to HSV color space.
  2. Mask relevant hue ranges (red/orange/yellow/green).
  3. Blur, threshold, and clean image.
  4. Detect contours and count particles.
  5. Classify count into **Low / Medium / High**.

---

## 7. Cleanup
- Turn off LEDs via software.
- Remove or store membrane as needed.
- Save image and analysis output.