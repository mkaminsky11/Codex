from PIL import Image
import sys
import os

def convert_atex(path):
    imag = Image.open(path)
    imag = imag.convert ('RGBA')
    imag.putalpha(imag.convert('L'))
    imag.save(path)

path = sys.argv[1]
files = os.listdir(path)
for f in files:
    if f.endswith(".png"):
        convert_atex(os.path.join(path, f))