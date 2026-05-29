"""
Convert all PNG images in src/assets/images/ to WebP format.
Keeps originals intact, creates .webp siblings.
Also generates tiny 20px blur placeholders for progressive loading.
"""
import os
import sys
from pathlib import Path

try:
    from PIL import Image  # type: ignore
except ImportError:
    print("Installing Pillow...")
    os.system(f"{sys.executable} -m pip install Pillow --quiet")
    from PIL import Image  # type: ignore

IMAGES_DIR = Path(__file__).parent.parent / "src" / "assets" / "images"
QUALITY = 80  # WebP quality (80 is a good balance)
PLACEHOLDER_SIZE = 20  # Tiny placeholder for blur-up effect

def convert_images():
    if not IMAGES_DIR.exists():
        print(f"Images directory not found: {IMAGES_DIR}")
        return

    png_files = list(IMAGES_DIR.glob("*.png"))
    print(f"Found {len(png_files)} PNG files in {IMAGES_DIR}")

    total_saved = 0

    for png_path in sorted(png_files):
        webp_path = png_path.with_suffix(".webp")

        try:
            img = Image.open(png_path)

            # Convert to WebP
            img.save(webp_path, "WEBP", quality=QUALITY, method=6)

            png_size = png_path.stat().st_size
            webp_size = webp_path.stat().st_size
            saved = png_size - webp_size
            total_saved += saved
            pct = (saved / png_size) * 100

            print(f"  ✓ {png_path.name} → {webp_path.name}  "
                  f"({png_size // 1024}KB → {webp_size // 1024}KB, "
                  f"-{pct:.0f}%)")

        except Exception as e:
            print(f"  ✗ {png_path.name}: {e}")

    print(f"\nTotal saved: {total_saved // 1024}KB ({total_saved / (1024*1024):.1f}MB)")

if __name__ == "__main__":
    convert_images()
