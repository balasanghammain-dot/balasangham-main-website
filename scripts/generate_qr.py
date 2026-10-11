import os
import qrcode
import qrcode.image.svg
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ARTIFACT_DIR = "/home/dhyandevp/.gemini/antigravity/brain/a93b1267-d1cb-405a-86ff-146736f7ecf8"
PUBLIC_DIR = "public/qr"
os.makedirs(ARTIFACT_DIR, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)

URL = "https://balasangham-main-website.vercel.app/"
LOGO_PATH = "public/balasangham-logo.png"

# Color Palette matching Balasangham Design System
BG_CREAM = (255, 249, 232)       # Soft Cream #FFF9E8
WHITE = (255, 255, 255)
GOLD_PRIMARY = (255, 201, 40)    # Primary Yellow #FFC928
GOLD_LIGHT = (255, 216, 77)      # Bright Golden Yellow #FFD84D
ORANGE_WARM = (255, 159, 0)      # Warm Orange #FF9F00
RED_DEEP = (215, 25, 32)         # Deep Red #D71920
DARK_INK = (24, 19, 19)          # Near-Black #181313
DARK_BROWN = (50, 26, 18)        # Dark Brown #321A12
GRAY_TEXT = (95, 85, 80)
BORDER_COLOR = (235, 220, 195)
PILL_BG = (255, 243, 215)

FONT_BOLD = "/usr/share/fonts/liberation-sans-fonts/LiberationSans-Bold.ttf"
FONT_REGULAR = "/usr/share/fonts/liberation-sans-fonts/LiberationSans-Regular.ttf"

def make_base_qr(box_size=20, border=2, fill=DARK_INK, back=WHITE):
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=box_size,
        border=border,
    )
    qr.add_data(URL)
    qr.make(fit=True)
    return qr.make_image(fill_color=fill, back_color=back).convert("RGBA")

def add_centered_logo(qr_img, logo_path, scale=0.22):
    qr_w, qr_h = qr_img.size
    logo = Image.open(logo_path).convert("RGBA")
    
    target_dim = int(qr_w * scale)
    logo.thumbnail((target_dim, target_dim), Image.Resampling.LANCZOS)
    lw, lh = logo.size
    
    pad = int(lw * 0.15)
    bw, bh = lw + 2 * pad, lh + 2 * pad
    badge = Image.new("RGBA", (bw, bh), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(badge)
    radius = int(bw * 0.25)
    
    b_draw.rounded_rectangle([0, 0, bw, bh], radius=radius, fill=(255, 255, 255, 255), outline=RED_DEEP, width=max(3, int(qr_w * 0.006)))
    badge.paste(logo, (pad, pad), mask=logo)
    
    pos = ((qr_w - bw) // 2, (qr_h - bh) // 2)
    result = qr_img.copy()
    result.paste(badge, pos, mask=badge)
    return result

# -------------------------------------------------------------
# 1. Standard & Clean Standalone QRs
# -------------------------------------------------------------
print("Generating standalone QR codes...")
std_qr = make_base_qr(box_size=28, border=2)
std_qr = std_qr.resize((1024, 1024), Image.Resampling.NEAREST)
std_qr.save(f"{PUBLIC_DIR}/balasangham-qr-standard.png")
std_qr.save(f"{ARTIFACT_DIR}/balasangham-qr-standard.png")

branded_qr = add_centered_logo(std_qr, LOGO_PATH, scale=0.22)
branded_qr.save(f"{PUBLIC_DIR}/balasangham-qr-clean.png")
branded_qr.save(f"{ARTIFACT_DIR}/balasangham-qr-clean.png")

# -------------------------------------------------------------
# 2. Promotional Poster (1000 x 1400)
# -------------------------------------------------------------
print("Generating Promotional Poster...")
PW, PH = 1000, 1400
poster = Image.new("RGBA", (PW, PH), (*BG_CREAM, 255))
pdraw = ImageDraw.Draw(poster)

# Header color stripes
pdraw.rectangle([0, 0, PW, 16], fill=(*RED_DEEP, 255))
pdraw.rectangle([0, 16, PW, 26], fill=(*GOLD_LIGHT, 255))
pdraw.rectangle([0, 26, PW, 32], fill=(*ORANGE_WARM, 255))

# Top Balasangham Flag Logo
logo_top = Image.open(LOGO_PATH).convert("RGBA")
logo_top.thumbnail((90, 90), Image.Resampling.LANCZOS)
lt_w, lt_h = logo_top.size
top_y = 65
poster.paste(logo_top, ((PW - lt_w) // 2, top_y), mask=logo_top)

# Badge Pill: BALASANGHAM KERALA
f_badge = ImageFont.truetype(FONT_BOLD, 17)
badge_text = "BALASANGHAM KERALA"
bb = pdraw.textbbox((0, 0), badge_text, font=f_badge)
bw = bb[2] - bb[0]
bpw, bph = bw + 34, 38
bpx = (PW - bpw) // 2
bpy = top_y + lt_h + 16
pdraw.rounded_rectangle([bpx, bpy, bpx + bpw, bpy + bph], radius=19, fill=(*RED_DEEP, 255))
pdraw.text((bpx + 17, bpy + 9), badge_text, font=f_badge, fill=WHITE)

# Headline
f_h1 = ImageFont.truetype(FONT_BOLD, 44)
f_h2 = ImageFont.truetype(FONT_BOLD, 46)
f_sub = ImageFont.truetype(FONT_REGULAR, 22)

h1 = "Find out new website"
h2 = "for Balasangham"
sub = "Scan the QR code with your mobile camera to visit"

h1b = pdraw.textbbox((0, 0), h1, font=f_h1)
h2b = pdraw.textbbox((0, 0), h2, font=f_h2)
sub_b = pdraw.textbbox((0, 0), sub, font=f_sub)

ty = bpy + bph + 24
pdraw.text(((PW - (h1b[2] - h1b[0])) // 2, ty), h1, font=f_h1, fill=(*DARK_INK, 255))
pdraw.text(((PW - (h2b[2] - h2b[0])) // 2, ty + 52), h2, font=f_h2, fill=(*RED_DEEP, 255))
pdraw.text(((PW - (sub_b[2] - sub_b[0])) // 2, ty + 112), sub, font=f_sub, fill=(*GRAY_TEXT, 255))

# White Main Card
CW, CH = 650, 730
CX = (PW - CW) // 2
CY = ty + 160

# Card Drop Shadow
sh_layer = Image.new("RGBA", (CW + 40, CH + 40), (0, 0, 0, 0))
sh_draw = ImageDraw.Draw(sh_layer)
sh_draw.rounded_rectangle([20, 20, CW + 20, CH + 20], radius=32, fill=(0, 0, 0, 38))
sh_layer = sh_layer.filter(ImageFilter.GaussianBlur(14))
poster.paste(sh_layer, (CX - 20, CY - 10), mask=sh_layer)

# Card Body
pdraw.rounded_rectangle([CX, CY, CX + CW, CY + CH], radius=32, fill=(255, 255, 255, 255), outline=BORDER_COLOR, width=2)
# Golden accent top bar
pdraw.rounded_rectangle([CX + 60, CY, CX + CW - 60, CY + 8], radius=4, fill=(*GOLD_PRIMARY, 255))

# QR Code inside card
qr_display_size = 480
card_qr = make_base_qr(box_size=14, border=1)
card_qr = card_qr.resize((qr_display_size, qr_display_size), Image.Resampling.LANCZOS)
card_qr = add_centered_logo(card_qr, LOGO_PATH, scale=0.22)
qr_px = CX + (CW - qr_display_size) // 2
qr_py = CY + 35
poster.paste(card_qr, (qr_px, qr_py), mask=card_qr)

# URL Pill Button inside Card
f_url = ImageFont.truetype(FONT_BOLD, 21)
f_hint = ImageFont.truetype(FONT_REGULAR, 17)
url_txt = "balasangham-main-website.vercel.app"
ub = pdraw.textbbox((0, 0), url_txt, font=f_url)
uw = ub[2] - ub[0]
pw, ph = uw + 44, 52
px = CX + (CW - pw) // 2
py = qr_py + qr_display_size + 30

pdraw.rounded_rectangle([px, py, px + pw, py + ph], radius=26, fill=(*PILL_BG, 255), outline=(*GOLD_PRIMARY, 255), width=2)
pdraw.text((px + 22, py + 14), url_txt, font=f_url, fill=(*DARK_INK, 255))

# Scan instruction text under pill (no emojis to prevent missing glyphs)
hint_txt = "Quick scan to read stories, news & district updates"
hb = pdraw.textbbox((0, 0), hint_txt, font=f_hint)
pdraw.text((CX + (CW - (hb[2] - hb[0])) // 2, py + ph + 16), hint_txt, font=f_hint, fill=(*GRAY_TEXT, 255))

# Bottom footer on poster
f_foot = ImageFont.truetype(FONT_REGULAR, 17)
ft = "Democratic Children's Movement of Kerala • Estd. 1938"
fb = pdraw.textbbox((0, 0), ft, font=f_foot)
pdraw.text(((PW - (fb[2] - fb[0])) // 2, PH - 50), ft, font=f_foot, fill=(*GRAY_TEXT, 255))

poster.save(f"{PUBLIC_DIR}/balasangham-qr-poster.png")
poster.save(f"{ARTIFACT_DIR}/balasangham-qr-poster.png")

# -------------------------------------------------------------
# 3. Square Social Card (1000 x 1000)
# -------------------------------------------------------------
print("Generating Square Social Card...")
SQW, SQH = 1000, 1000
sq = Image.new("RGBA", (SQW, SQH), (*BG_CREAM, 255))
sdraw = ImageDraw.Draw(sq)

# Top decorative stripes
sdraw.rectangle([0, 0, SQW, 14], fill=(*RED_DEEP, 255))
sdraw.rectangle([0, 14, SQW, 22], fill=(*GOLD_LIGHT, 255))

# Top logo thumbnail on social card
sq_logo = Image.open(LOGO_PATH).convert("RGBA")
sq_logo.thumbnail((56, 56), Image.Resampling.LANCZOS)
sl_w, sl_h = sq_logo.size
sq.paste(sq_logo, ((SQW - sl_w) // 2, 40), mask=sq_logo)

# Title
f_sq_title = ImageFont.truetype(FONT_BOLD, 38)
f_sq_sub = ImageFont.truetype(FONT_BOLD, 20)

sq_t = "Find out new website for Balasangham"
sq_tb = sdraw.textbbox((0, 0), sq_t, font=f_sq_title)
sdraw.text(((SQW - (sq_tb[2] - sq_tb[0])) // 2, 106), sq_t, font=f_sq_title, fill=(*RED_DEEP, 255))

sq_s = "Official State & District Web Portal"
sq_sb = sdraw.textbbox((0, 0), sq_s, font=f_sq_sub)
sdraw.text(((SQW - (sq_sb[2] - sq_sb[0])) // 2, 154), sq_s, font=f_sq_sub, fill=(*DARK_INK, 255))

# Card
SCW = 620
SCH = 620
SCX = (SQW - SCW) // 2
SCY = 195

# Shadow
s_sh = Image.new("RGBA", (SCW + 40, SCH + 40), (0, 0, 0, 0))
s_sh_draw = ImageDraw.Draw(s_sh)
s_sh_draw.rounded_rectangle([20, 20, SCW + 20, SCH + 20], radius=32, fill=(0, 0, 0, 35))
s_sh = s_sh.filter(ImageFilter.GaussianBlur(12))
sq.paste(s_sh, (SCX - 20, SCY - 10), mask=s_sh)

sdraw.rounded_rectangle([SCX, SCY, SCX + SCW, SCY + SCH], radius=32, fill=(255, 255, 255, 255), outline=BORDER_COLOR, width=2)
sdraw.rounded_rectangle([SCX + 60, SCY, SCX + SCW - 60, SCY + 8], radius=4, fill=(*GOLD_PRIMARY, 255))

# QR inside
sq_qr_size = 500
card_sq_qr = make_base_qr(box_size=15, border=1)
card_sq_qr = card_sq_qr.resize((sq_qr_size, sq_qr_size), Image.Resampling.LANCZOS)
card_sq_qr = add_centered_logo(card_sq_qr, LOGO_PATH, scale=0.22)
sq.paste(card_sq_qr, (SCX + (SCW - sq_qr_size) // 2, SCY + (SCH - sq_qr_size) // 2), mask=card_sq_qr)

# Bottom Pill
spw, sph = uw + 44, 52
spx = (SQW - spw) // 2
spy = SCY + SCH + 45

sdraw.rounded_rectangle([spx, spy, spx + spw, spy + sph], radius=26, fill=(*PILL_BG, 255), outline=(*GOLD_PRIMARY, 255), width=2)
sdraw.text((spx + 22, spy + 14), url_txt, font=f_url, fill=(*DARK_INK, 255))

sq.save(f"{PUBLIC_DIR}/balasangham-qr-card.png")
sq.save(f"{ARTIFACT_DIR}/balasangham-qr-card.png")

# -------------------------------------------------------------
# 4. Vector SVG
# -------------------------------------------------------------
print("Generating SVG QR code...")
svg_factory = qrcode.image.svg.SvgPathImage
svg_qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=12,
    border=2,
    image_factory=svg_factory
)
svg_qr.add_data(URL)
svg_qr.make(fit=True)
svg_img = svg_qr.make_image(fill_color="#181313")
svg_img.save(f"{PUBLIC_DIR}/balasangham-qr.svg")
svg_img.save(f"{ARTIFACT_DIR}/balasangham-qr.svg")

print("Done! All files refreshed successfully.")
