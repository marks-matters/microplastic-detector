from gpiozero import LED
from time import sleep

# Initialize the LEDs on GPIO pins as global variables
led_gen = LED(23)
led_3mm = LED(24)
led_diff = LED(27)

def illuminate_sample(lights=True):
    """
    Function to control LED illumination for sample imaging.
    Args:
        lights (bool): True to turn lights on, False to turn them off
    """

    if lights:
        print("Illuminating sample...")
        led_gen.on()
        led_3mm.on()
        led_diff.on()
        sleep(0.25)  # Allow LEDs to stabilize
    else:
        led_gen.off()
        led_3mm.off()
        led_diff.off()
        print("Sample illumination complete.")

def cleanup():
    """Clean up GPIO resources"""
    led_gen.close()
    led_3mm.close()
    led_diff.close()

if __name__ == "__main__":
    # Example usage
    try:
        illuminate_sample(lights=True)
        sleep(2)  # Keep LEDs on for 2 seconds
    finally:
        illuminate_sample(lights=False)
        cleanup()