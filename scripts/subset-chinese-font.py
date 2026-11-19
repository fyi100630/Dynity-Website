"""Subset the upstream Noto Sans TC variable TTF for the site's current copy."""

import argparse
from pathlib import Path

from fontTools import subset

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("font", type=Path, help="Upstream NotoSansTC[wght].ttf")
args = parser.parse_args()

root = Path(__file__).resolve().parent.parent
characters = {
    character
    for file in (root / "app").rglob("*")
    if file.suffix in {".tsx", ".ts"}
    for character in file.read_text(encoding="utf-8")
    if ord(character) >= 0x3000
}

options = subset.Options()
options.flavor = "woff2"
options.hinting = False

font = subset.load_font(args.font, options)
subsetter = subset.Subsetter(options=options)
subsetter.populate(text="".join(sorted(characters)))
subsetter.subset(font)
subset.save_font(font, root / "app/assets/fonts/noto-sans-tc-subset.woff2", options)
