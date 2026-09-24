#!/usr/bin/env python3
"""
RICH Club - image optimizer (Phase 8.2)

Converts the JPG/PNG files in assets/images to smaller WebP files,
resizing very large photos. Originals are kept unless you delete them.

Setup (once):   pip install Pillow
Run:            python tools/optimize-images.py --update-content
                (run from the richclub folder)

--update-content also changes .jpg/.png to .webp inside js/content.js
so the website uses the new files.
logo, qr and og-cover are skipped on purpose (keep them as PNG/JPG).
"""
import argparse
import re
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is missing. Run:  pip install Pillow")

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "assets" / "images"
CONTENT = ROOT / "js" / "content.js"

SKIP_STEMS = {"logo", "qr", "og-cover"}
# name of folder or file -> (max width in px, WebP quality)
RULES = {"hero": (1920, 78), "news": (1400, 80), "projects": (1000, 80),
         "about": (1100, 80), "founder": (900, 82)}
DEFAULT_RULE = (1200, 80)
WARN_KB = 250


def rule_for(path: Path):
    for part in (*path.relative_to(IMAGES).parts[:-1], path.stem):
        if part in RULES:
            return RULES[part]
    return DEFAULT_RULE


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--update-content", action="store_true", help="switch paths in js/content.js to .webp")
    ap.add_argument("--delete-originals", action="store_true", help="remove the JPG/PNG after converting")
    args = ap.parse_args()

    files = sorted(p for p in IMAGES.rglob("*") if p.suffix.lower() in {".jpg", ".jpeg", ".png"}
                   and p.stem not in SKIP_STEMS)
    if not files:
        sys.exit("No JPG/PNG images found in assets/images.")

    converted, total_before, total_after = [], 0, 0
    for src in files:
        max_w, quality = rule_for(src)
        dst = src.with_suffix(".webp")
        with Image.open(src) as im:
            im = ImageOps.exif_transpose(im)
            if im.width > max_w:
                im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
            has_alpha = im.mode in ("RGBA", "LA") or "transparency" in im.info
            im = im.convert("RGBA" if has_alpha else "RGB")
            im.save(dst, "WEBP", quality=quality, method=6)
        before, after = src.stat().st_size, dst.stat().st_size
        total_before += before
        total_after += after
        converted.append(src)
        flag = "  <-- still large, try a smaller source" if after > WARN_KB * 1024 else ""
        print(f"{src.relative_to(IMAGES)}: {before // 1024} KB -> {after // 1024} KB{flag}")

    print(f"\nTotal: {total_before // 1024} KB -> {total_after // 1024} KB")

    if args.update_content and CONTENT.exists():
        text = CONTENT.read_text(encoding="utf-8")
        for src in converted:
            rel = "assets/images/" + src.relative_to(IMAGES).as_posix()
            text = text.replace(rel, str(Path(rel).with_suffix(".webp").as_posix()))
        CONTENT.write_text(text, encoding="utf-8")
        print("js/content.js updated to use .webp paths.")

    if args.delete_originals:
        for src in converted:
            src.unlink()
        print("Original JPG/PNG files deleted.")


if __name__ == "__main__":
    main()
