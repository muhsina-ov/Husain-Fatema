import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_whatsapp_thumb():
    W, H = 600, 600
    # Cream background matching Ivory Waltz
    img = Image.new("RGB", (W, H), "#f6f0e6")
    draw = ImageDraw.Draw(img)

    # Outer border
    draw.rectangle([16, 16, W - 17, H - 17], outline="#c4b094", width=2)
    draw.rectangle([22, 22, W - 23, H - 23], outline="#e5dacf", width=1)

    # Monogram badge
    badge_r = 25
    badge_cx, badge_cy = W // 2, 54
    draw.ellipse(
        [badge_cx - badge_r, badge_cy - badge_r, badge_cx + badge_r, badge_cy + badge_r],
        fill="#b38a42",
        outline="#9c7530",
        width=1,
    )
    font_mono = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 15)
    draw.text((badge_cx, badge_cy), "H · F", fill="#ffffff", font=font_mono, anchor="mm")

    # Typography
    font_sub = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 10)
    font_title = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 36)
    font_meta = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 15)
    font_venues = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 13)

    draw.text((W // 2, 94), "TOGETHER WITH THEIR FAMILIES", fill="#7a6d60", font=font_sub, anchor="mm")
    draw.text((W // 2, 130), "Husain & Fatema", fill="#1a1814", font=font_title, anchor="mm")

    # Divider line
    draw.line([W // 2 - 40, 156, W // 2 + 40, 156], fill="#c4b094", width=1)

    draw.text((W // 2, 172), "WEDDING CEREMONY · 21st & 22nd NOVEMBER 2026", fill="#4a4036", font=font_meta, anchor="mm")
    draw.text((W // 2, 194), "Ezzy Mawaid  ·  Shakuntala Farms", fill="#7a6d60", font=font_venues, anchor="mm")

    # Load couple photo/poster
    poster = Image.open("public/assets/hero-video-poster.jpg").convert("RGB")
    
    # We want an arched frame in the lower portion: e.g. x from 130 to 470 (w=340), y from 220 to 570 (h=350)
    arch_w = 360
    arch_h = 360
    arch_x = (W - arch_w) // 2
    arch_y = 220

    # Resize/crop poster to fill arch_w x arch_h
    pw, ph = poster.size
    scale = max(arch_w / pw, arch_h / ph)
    new_w = int(pw * scale)
    new_h = int(ph * scale)
    poster_resized = poster.resize((new_w, new_h), Image.Resampling.LANCZOS)
    crop_x = (new_w - arch_w) // 2
    crop_y = max(0, int((new_h - arch_h) * 0.25))
    poster_cropped = poster_resized.crop((crop_x, crop_y, crop_x + arch_w, crop_y + arch_h))

    # Create arch mask (rounded top, flat or slightly rounded bottom)
    mask = Image.new("L", (arch_w, arch_h), 0)
    mask_draw = ImageDraw.Draw(mask)
    # top half circle/arch
    corner_r = arch_w // 2
    mask_draw.rounded_rectangle([0, 0, arch_w, arch_h], radius=corner_r, fill=255)

    # Paste with mask
    img.paste(poster_cropped, (arch_x, arch_y), mask)

    # Draw arch outline
    draw.rounded_rectangle([arch_x, arch_y, arch_x + arch_w, arch_y + arch_h], radius=corner_r, outline="#b38a42", width=3)
    draw.rounded_rectangle([arch_x + 3, arch_y + 3, arch_x + arch_w - 3, arch_y + arch_h - 3], radius=corner_r - 3, outline="#ffffff", width=1)

    # Save highly optimized JPEG
    out_path = "public/whatsapp-thumb.jpg"
    img.save(out_path, "JPEG", quality=90, optimize=True)
    print(f"Saved {out_path}, size: {os.path.getsize(out_path)} bytes")

def create_og_banner():
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), "#f6f0e6")
    draw = ImageDraw.Draw(img)

    # Outer border
    draw.rectangle([24, 24, W - 25, H - 25], outline="#c4b094", width=2)
    draw.rectangle([32, 32, W - 33, H - 33], outline="#e5dacf", width=1)

    # Left side content
    left_x = 90

    # Monogram badge
    badge_r = 34
    badge_cx, badge_cy = left_x + badge_r, 95
    draw.ellipse(
        [badge_cx - badge_r, badge_cy - badge_r, badge_cx + badge_r, badge_cy + badge_r],
        fill="#b38a42",
        outline="#9c7530",
        width=2,
    )
    font_mono = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 20)
    draw.text((badge_cx, badge_cy), "H · F", fill="#ffffff", font=font_mono, anchor="mm")

    font_sub = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 14)
    font_title = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 56)
    font_sec = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 15)
    font_dates = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 26)
    font_venues = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 20)
    font_cta = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 17)

    draw.text((left_x, 175), "TOGETHER WITH THEIR FAMILIES", fill="#7a6d60", font=font_sub)
    draw.text((left_x, 210), "Husain & Fatema", fill="#1a1814", font=font_title)

    # Divider line
    draw.line([left_x, 290, left_x + 180, 290], fill="#b38a42", width=2)

    draw.text((left_x, 320), "WEDDING CEREMONY", fill="#9c7530", font=font_sec)
    draw.text((left_x, 355), "21st & 22nd November 2026", fill="#2c261f", font=font_dates)
    draw.text((left_x, 400), "Ezzy Mawaid  ·  Shakuntala Farms", fill="#5c5146", font=font_venues)
    draw.text((left_x, 465), "An Auspicious Celebration • Click to Open Invitation", fill="#9c7530", font=font_cta)

    # Right side: Arch photo frame
    arch_w = 460
    arch_h = 520
    arch_x = W - arch_w - 70
    arch_y = (H - arch_h) // 2

    poster = Image.open("public/assets/hero-video-poster.jpg").convert("RGB")
    pw, ph = poster.size
    scale = max(arch_w / pw, arch_h / ph)
    new_w = int(pw * scale)
    new_h = int(ph * scale)
    poster_resized = poster.resize((new_w, new_h), Image.Resampling.LANCZOS)
    crop_x = (new_w - arch_w) // 2
    crop_y = max(0, int((new_h - arch_h) * 0.2))
    poster_cropped = poster_resized.crop((crop_x, crop_y, crop_x + arch_w, crop_y + arch_h))

    corner_r = arch_w // 2
    mask = Image.new("L", (arch_w, arch_h), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, arch_w, arch_h], radius=corner_r, fill=255)

    img.paste(poster_cropped, (arch_x, arch_y), mask)

    draw.rounded_rectangle([arch_x, arch_y, arch_x + arch_w, arch_y + arch_h], radius=corner_r, outline="#b38a42", width=4)
    draw.rounded_rectangle([arch_x + 4, arch_y + 4, arch_x + arch_w - 4, arch_y + arch_h - 4], radius=corner_r - 4, outline="#ffffff", width=1)

    out_path = "public/og-image.jpg"
    img.save(out_path, "JPEG", quality=90, optimize=True)
    print(f"Saved {out_path}, size: {os.path.getsize(out_path)} bytes")

    # Also save as og-invitation.jpg
    img.save("public/og-invitation.jpg", "JPEG", quality=90, optimize=True)

create_whatsapp_thumb()
create_og_banner()
