"""Generate redesigned Expatica company overview PDF."""
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, Color, white, black
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

OUT_DOWNLOADS = Path(r"C:\Users\HP\Downloads\Expatica-Company-Overview.pdf")
OUT_SITE = Path(r"C:\work\expatica\pennycreditfrontend\public\assets\company\about-expatica.pdf")

W, H = A4
MARGIN = 18 * mm
CONTENT_W = W - 2 * MARGIN

BRAND = HexColor("#0d9488")
BRAND_DARK = HexColor("#134e4a")
BRAND_DEEP = HexColor("#042f2e")
GOLD = HexColor("#d97706")
GOLD_LIGHT = HexColor("#f59e0b")
INK = HexColor("#0f172a")
MUTED = HexColor("#475569")
SOFT = HexColor("#f0fdfa")
CARD = HexColor("#f8fafc")
LINE = HexColor("#cbd5e1")

PLANS = [
    ("Starter Savings", "7 Days", "$100", "$1,000", "5%", "Yes"),
    ("Weekly Flex", "7 Days", "$50", "$500", "3%", "Yes"),
    ("Quick Returns", "2 Weeks", "$250", "$2,500", "8%", "Yes"),
    ("Fixed Income 30", "30 Days", "$1,000", "$10,000", "$150 fixed", "Yes"),
    ("Monthly Growth Plan", "1 Month", "$500", "$5,000", "12%", "Yes"),
    ("Premium Quarterly", "3 Months", "$3,000", "$20,000", "25%", "Yes"),
    ("ROI Only 60 Days", "60 Days", "$2,000", "$15,000", "18%", "No*"),
    ("Bi-Annual Elite", "6 Months", "$7,500", "$50,000", "45%", "Yes"),
    ("High Yield Annual", "12 Months", "$15,000", "$100,000", "75%", "Yes"),
    ("Diamond VIP", "12 Months", "$50,000", "$500,000", "120%", "Yes"),
]


def draw_header_bar(c, title_right=""):
    c.setFillColor(BRAND_DEEP)
    c.rect(0, H - 14 * mm, W, 14 * mm, fill=1, stroke=0)
    c.setFillColor(GOLD_LIGHT)
    c.rect(0, H - 15.5 * mm, W, 1.5 * mm, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(MARGIN, H - 9 * mm, "EXPATICA")
    if title_right:
        c.setFont("Helvetica", 8)
        c.drawRightString(W - MARGIN, H - 9 * mm, title_right)


def draw_footer(c, page, total=8):
    c.setFillColor(BRAND_DEEP)
    c.rect(0, 0, W, 12 * mm, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica", 7.5)
    c.drawString(MARGIN, 4.5 * mm, "expaticaonline.com  ·  Expatica Financial Services Ltd.")
    c.drawRightString(W - MARGIN, 4.5 * mm, f"Page {page} of {total}")


def wrap_text(c, text, x, y, max_width, font="Helvetica", size=9.5, leading=13, color=INK):
    c.setFont(font, size)
    c.setFillColor(color)
    words = text.split()
    lines = []
    current = ""
    for w in words:
        test = (current + " " + w).strip()
        if c.stringWidth(test, font, size) <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = w
    if current:
        lines.append(current)
    for i, line in enumerate(lines):
        c.drawString(x, y - i * leading, line)
    return y - len(lines) * leading


def section_title(c, y, number, title):
    c.setFillColor(BRAND)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, y, number)
    c.setFillColor(BRAND_DARK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(MARGIN + 14 * mm, y, title)
    c.setStrokeColor(BRAND)
    c.setLineWidth(1)
    c.line(MARGIN, y - 3 * mm, W - MARGIN, y - 3 * mm)
    return y - 10 * mm


def card(c, x, y, w, h, title, body):
    c.setFillColor(SOFT)
    c.setStrokeColor(BRAND)
    c.setLineWidth(0.6)
    c.roundRect(x, y - h, w, h, 4, fill=1, stroke=1)
    c.setFillColor(BRAND_DARK)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(x + 3 * mm, y - 5.5 * mm, title)
    wrap_text(c, body, x + 3 * mm, y - 10 * mm, w - 6 * mm, size=8, leading=10.5, color=MUTED)


def new_page(c):
    c.showPage()


def page_cover(c):
    # Full bleed dark cover
    c.setFillColor(BRAND_DEEP)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(BRAND)
    c.rect(0, H - 8 * mm, W, 8 * mm, fill=1, stroke=0)
    c.setFillColor(GOLD_LIGHT)
    c.rect(0, H - 10 * mm, W, 2 * mm, fill=1, stroke=0)

    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(W / 2, H - 45 * mm, "OFFICIAL COMPANY OVERVIEW")

    c.setFont("Helvetica-Bold", 36)
    c.drawCentredString(W / 2, H - 70 * mm, "EXPATICA")

    c.setStrokeColor(GOLD_LIGHT)
    c.setLineWidth(1.2)
    c.line(W / 2 - 30 * mm, H - 78 * mm, W / 2 + 30 * mm, H - 78 * mm)

    c.setFont("Helvetica", 12)
    c.setFillColor(HexColor("#99f6e0"))
    c.drawCentredString(W / 2, H - 90 * mm, "Premium Digital Banking · Lending · Investments")

    # Accent box
    c.setFillColor(HexColor("#0f766e"))
    c.roundRect(MARGIN + 10 * mm, H - 175 * mm, CONTENT_W - 20 * mm, 55 * mm, 6, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(W / 2, H - 132 * mm, "CLEAR PRESENTATION OF OUR COMPANY,")
    c.drawCentredString(W / 2, H - 140 * mm, "SERVICES & INVESTMENT PACKAGES")
    c.setFont("Helvetica", 9)
    c.setFillColor(HexColor("#ccfbf1"))
    c.drawCentredString(W / 2, H - 155 * mm, "As listed on the Expatica platform")
    c.drawCentredString(W / 2, H - 165 * mm, "expaticaonline.com")

    # Bottom meta
    c.setFillColor(HexColor("#5eead4"))
    c.setFont("Helvetica", 8.5)
    c.drawCentredString(W / 2, 40 * mm, "Expatica Financial Services Ltd.")
    c.drawCentredString(W / 2, 32 * mm, "New York · London · Singapore  ·  Established 2000")
    c.setFillColor(GOLD_LIGHT)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(W / 2, 20 * mm, "www.expaticaonline.com")

    new_page(c)


def page_contents(c, page_no):
    draw_header_bar(c, "Contents")
    draw_footer(c, page_no)
    y = H - 30 * mm
    c.setFillColor(BRAND_DARK)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(MARGIN, y, "Inside this document")
    y -= 14 * mm

    items = [
        ("01", "About Expatica", "Who we are, our story, and what makes us different"),
        ("02", "Technology · Trust · Support", "How we build confidence for every client"),
        ("03", "EXP Investment Portfolio Explained", "How packages work on the platform"),
        ("04", "Our Investment Packages", "Full list of plans as shown on Expatica"),
        ("05", "Platform Services", "Banking, loans, cards, crypto & transfers"),
        ("06", "Why You Should Trust Us", "Recognition, reliability, and client protection"),
        ("07", "Our Insurance & Closing", "Account protection and final guidance"),
    ]
    for num, title, sub in items:
        c.setFillColor(SOFT)
        c.roundRect(MARGIN, y - 14 * mm, CONTENT_W, 16 * mm, 3, fill=1, stroke=0)
        c.setFillColor(BRAND)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(MARGIN + 4 * mm, y - 6 * mm, num)
        c.setFillColor(BRAND_DARK)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(MARGIN + 16 * mm, y - 5 * mm, title)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 8)
        c.drawString(MARGIN + 16 * mm, y - 10.5 * mm, sub)
        y -= 20 * mm

    new_page(c)


def page_about(c, page_no):
    draw_header_bar(c, "01  About Expatica")
    draw_footer(c, page_no)
    y = H - 28 * mm
    y = section_title(c, y, "01", "ABOUT EXPATICA")

    c.setFillColor(BRAND_DARK)
    c.setFont("Helvetica-Oblique", 10)
    c.drawString(MARGIN, y, "We have been known to give investors the better choice.")
    y -= 10 * mm

    about = (
        "With over 153,000 investments under our management, $5 billion+ in assets under our "
        "administration, and multiple industry recognitions, we have made Expatica the safe "
        "haven for investors who want to trust their financial partner to help them reach "
        "their financial goals — in due time, without the fear of disappointment."
    )
    y = wrap_text(c, about, MARGIN, y, CONTENT_W, size=9.5, leading=13) - 4 * mm

    about2 = (
        "Expatica is a premium digital banking and investment platform that unifies everyday "
        "money management, lending, savings, curated investment packages, virtual cards, "
        "cryptocurrency deposits, and global transfers in one secure experience. We serve "
        "individuals and businesses who want transparent fees, fast decisions, and modern "
        "financial tools without visiting a branch."
    )
    y = wrap_text(c, about2, MARGIN, y, CONTENT_W, size=9.5, leading=13) - 5 * mm

    about3 = (
        "The platform operates under Expatica Financial Services Ltd., with presence in "
        "New York, London, and Singapore. This framework supports transparency, accountability, "
        "and trust across all client interactions. Established in 2000, Expatica continues to "
        "evolve with technology while keeping client outcomes at the center of every product."
    )
    y = wrap_text(c, about3, MARGIN, y, CONTENT_W, size=9.5, leading=13) - 8 * mm

    # Three pillars
    card_w = (CONTENT_W - 8 * mm) / 3
    card(c, MARGIN, y, card_w, 38 * mm, "TECHNOLOGY",
         "We constantly improve our application with the latest trends and solutions. Our ambition is to make Expatica one of the most reliable and functional platforms on the market.")
    card(c, MARGIN + card_w + 4 * mm, y, card_w, 38 * mm, "TRUST",
         "Years of activity and a growing global client base have earned Expatica trust worldwide. Your investments are managed with strong operational controls and clear processes.")
    card(c, MARGIN + 2 * (card_w + 4 * mm), y, card_w, 38 * mm, "SUPPORT",
         "We help clients become better investors. Our support team and educational resources serve both beginners and experienced investors.")

    y -= 48 * mm
    c.setFillColor(BRAND_DARK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(MARGIN, y, "Our Mission")
    y -= 5 * mm
    mission = (
        "We believe everyone deserves access to world-class financial tools without complexity. "
        "Our mission is to make saving, borrowing, transferring, and growing wealth simple, "
        "transparent, and accessible from anywhere in the world."
    )
    wrap_text(c, mission, MARGIN, y, CONTENT_W, size=9.5, leading=13)
    new_page(c)


def page_tech_trust(c, page_no):
    draw_header_bar(c, "02  Technology · Trust · Support")
    draw_footer(c, page_no)
    y = H - 28 * mm
    y = section_title(c, y, "02", "TECHNOLOGY · TRUST · SUPPORT")

    blocks = [
        ("TECHNOLOGY ADVANCEMENT",
         "Nowadays, technology is one of the most important elements of investing and finance. "
         "We know that — that is why we constantly improve our trading and banking application "
         "in accordance with the latest trends and solutions. Our ambition is to make Expatica "
         "one of the most reliable and functional platforms on the market, combining digital "
         "wallets, loans, investments, virtual cards, crypto deposits, and global transfers."),
        ("TRUSTWORTHINESS",
         "Over years of activity in the financial markets, we have earned the trust of over "
         "153,000 customers around the world. Your investments are safe with us — we operate "
         "with strong supervision standards and clear compliance controls. Established in 2000, "
         "Expatica continues to build long-term confidence through transparent package terms "
         "and consistent client service."),
        ("SUPPORTIVE SERVICE",
         "We are here to help our clients become better investors. That is why our experienced "
         "customer service team works to support you through the platform journey, and our "
         "library of educational materials contains guides suitable for both beginners and "
         "experienced investors. For how to register or navigate the dashboard, refer to the "
         "Expatica web guide on expaticaonline.com."),
    ]
    for title, body in blocks:
        c.setFillColor(SOFT)
        c.roundRect(MARGIN, y - 42 * mm, CONTENT_W, 44 * mm, 4, fill=1, stroke=0)
        c.setFillColor(BRAND)
        c.rect(MARGIN, y - 42 * mm, 2.5 * mm, 44 * mm, fill=1, stroke=0)
        c.setFillColor(BRAND_DARK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(MARGIN + 6 * mm, y - 5 * mm, title)
        wrap_text(c, body, MARGIN + 6 * mm, y - 11 * mm, CONTENT_W - 12 * mm, size=9, leading=12)
        y -= 50 * mm

    new_page(c)


def page_portfolio_explained(c, page_no):
    draw_header_bar(c, "03  Investment Portfolio Explained")
    draw_footer(c, page_no)
    y = H - 28 * mm
    y = section_title(c, y, "03", "EXP INVESTMENT PORTFOLIO EXPLAINED")

    intro = (
        "You are presented with the Expatica Investment Portfolio page once you are logged "
        "into your account and click the “Investments” option."
    )
    y = wrap_text(c, intro, MARGIN, y, CONTENT_W, size=9.5, leading=13) - 4 * mm

    body = (
        "The Expatica Investment Portfolio comprises several packages which are carefully "
        "customized by Expatica. Featured plans include Starter Savings, Weekly Flex, Quick "
        "Returns, Fixed Income 30, Monthly Growth Plan, Premium Quarterly, ROI Only 60 Days, "
        "Bi-Annual Elite, High Yield Annual, and Diamond VIP — with additional options "
        "available in your dashboard as the platform expands."
    )
    y = wrap_text(c, body, MARGIN, y, CONTENT_W, size=9.5, leading=13) - 4 * mm

    body2 = (
        "Most packages listed in this document are featured packages as shown on the platform. "
        "These portfolios were specifically designed with our shareholders and potential clients "
        "at heart — simple to navigate, clear in terms, and user friendly."
    )
    y = wrap_text(c, body2, MARGIN, y, CONTENT_W, size=9.5, leading=13) - 8 * mm

    c.setFillColor(BRAND_DARK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(MARGIN, y, "How to invest on the platform")
    y -= 6 * mm
    steps = [
        "Log in to your Expatica account and open Investments.",
        "Review each package: duration, minimum, maximum, return, and capital rules.",
        "Click Invest on your chosen plan.",
        "Confirm the amount and complete funding using the payment method shown.",
        "Track your active investment and returns from your dashboard.",
    ]
    for i, step in enumerate(steps, 1):
        c.setFillColor(BRAND)
        c.circle(MARGIN + 3 * mm, y + 1.5 * mm, 3 * mm, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 8)
        c.drawCentredString(MARGIN + 3 * mm, y, str(i))
        c.setFillColor(INK)
        c.setFont("Helvetica", 9)
        c.drawString(MARGIN + 9 * mm, y, step)
        y -= 8 * mm

    y -= 4 * mm
    note = (
        "Note: Returns shown on packages are period returns for the stated duration of each "
        "plan (not necessarily annualized APY). Always read the plan terms before investing. "
        "For navigation help, refer to the Expatica web guide on expaticaonline.com."
    )
    c.setFillColor(HexColor("#fff7ed"))
    c.roundRect(MARGIN, y - 28 * mm, CONTENT_W, 30 * mm, 4, fill=1, stroke=0)
    wrap_text(c, note, MARGIN + 4 * mm, y - 5 * mm, CONTENT_W - 8 * mm, size=8.5, leading=11.5, color=MUTED)
    new_page(c)


def page_packages(c, page_no):
    draw_header_bar(c, "04  Our Investment Packages")
    draw_footer(c, page_no)
    y = H - 28 * mm
    y = section_title(c, y, "04", "OUR INVESTMENT PACKAGES")

    intro = (
        "Below are the investment packages as listed on the Expatica platform. Packages range "
        "from starter plans for beginners to VIP packages for high-value investors."
    )
    y = wrap_text(c, intro, MARGIN, y, CONTENT_W, size=9, leading=12) - 6 * mm

    # Table header
    cols = [28*mm, 20*mm, 20*mm, 22*mm, 24*mm, 22*mm]
    headers = ["Plan", "Duration", "Minimum", "Maximum", "Return", "Capital"]
    x0 = MARGIN
    row_h = 8.2 * mm

    c.setFillColor(BRAND_DARK)
    c.rect(x0, y - row_h, CONTENT_W, row_h, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 7.5)
    x = x0 + 2 * mm
    for h, wcol in zip(headers, cols):
        c.drawString(x, y - 5.2 * mm, h)
        x += wcol
    y -= row_h

    for i, row in enumerate(PLANS):
        bg = SOFT if i % 2 == 0 else CARD
        c.setFillColor(bg)
        c.rect(x0, y - row_h, CONTENT_W, row_h, fill=1, stroke=0)
        c.setStrokeColor(LINE)
        c.setLineWidth(0.3)
        c.line(x0, y - row_h, x0 + CONTENT_W, y - row_h)
        c.setFillColor(INK)
        c.setFont("Helvetica", 7.5)
        x = x0 + 2 * mm
        for val, wcol in zip(row, cols):
            c.setFont("Helvetica-Bold" if wcol == cols[0] else "Helvetica", 7.5)
            c.drawString(x, y - 5.2 * mm, val)
            x += wcol
        y -= row_h

    y -= 6 * mm
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Oblique", 7.5)
    c.drawString(MARGIN, y, "* ROI Only 60 Days returns profit only; capital is not returned under this plan’s rules.")
    y -= 8 * mm

    c.setFillColor(BRAND_DARK)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, y, "Package highlights")
    y -= 5 * mm
    highlights = [
        "Weekly Flex — from $50 for 7 days at 3% (ideal for beginners).",
        "Starter Savings — $100–$1,000 for 7 days at 5%.",
        "Fixed Income 30 — fixed $150 return on eligible amounts for 30 days.",
        "Diamond VIP — $50,000–$500,000 for 12 months at 120%.",
        "All featured packages are carefully selected to present clear ROI terms for shareholders and clients.",
    ]
    for h in highlights:
        y = wrap_text(c, "•  " + h, MARGIN, y, CONTENT_W, size=8.5, leading=11.5) - 1.5 * mm

    y -= 4 * mm
    close = (
        "When you finish reviewing packages on the platform, click Invest under your chosen "
        "plan. You will be directed to complete purchase by sending the investment amount "
        "using the payment method shown for your account."
    )
    wrap_text(c, close, MARGIN, y, CONTENT_W, size=8.5, leading=11.5)
    new_page(c)


def page_services(c, page_no):
    draw_header_bar(c, "05  Platform Services")
    draw_footer(c, page_no)
    y = H - 28 * mm
    y = section_title(c, y, "05", "PLATFORM SERVICES")

    services = [
        ("Digital Wallet",
         "Multi-currency wallet with real-time balances. Track fiat and crypto holdings "
         "(BTC, ETH, USDT, SOL, BNB, LTC) in one dashboard."),
        ("Loans",
         "Personal, Business, Home, and Auto loan products with online application and "
         "wallet disbursement after approval. Competitive starting rates and flexible terms."),
        ("Savings",
         "Savings goals, locked savings options, and auto-save tools to help clients build "
         "disciplined wealth habits."),
        ("Virtual Cards",
         "Visa and Mastercard virtual cards for online spending, with freeze controls, "
         "limits, and secure PIN management."),
        ("Crypto Deposits",
         "Fund your account with BTC, ETH (ERC-20), USDT (TRC-20), SOL, BNB, and LTC. "
         "Deposits are credited after verification."),
        ("Global Transfers",
         "Send money via Wire, Local Transfer, PayPal, Skrill, Google Pay, Western Union, "
         "Wise, and Payoneer — authorized with your transaction PIN."),
    ]

    for title, body in services:
        c.setFillColor(SOFT)
        c.roundRect(MARGIN, y - 22 * mm, CONTENT_W, 23.5 * mm, 3, fill=1, stroke=0)
        c.setFillColor(BRAND_DARK)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(MARGIN + 4 * mm, y - 5 * mm, title)
        wrap_text(c, body, MARGIN + 4 * mm, y - 10 * mm, CONTENT_W - 8 * mm, size=8.2, leading=10.5, color=MUTED)
        y -= 26 * mm

    new_page(c)


def page_trust(c, page_no):
    draw_header_bar(c, "06  Why You Should Trust Us")
    draw_footer(c, page_no)
    y = H - 28 * mm
    y = section_title(c, y, "06", "WHY YOU SHOULD TRUST US")

    intro = (
        "Being in the brokerage and investments space for years, there are clear reasons "
        "Expatica stands out. We have proven our capabilities by building a sustainable "
        "investment portfolio experience that continues to attract recognition in the "
        "international finance community."
    )
    y = wrap_text(c, intro, MARGIN, y, CONTENT_W, size=9.5, leading=13) - 5 * mm

    body = (
        "By supporting modern funding methods — including cryptocurrencies and digital assets "
        "in eligible regions — we have built a functional system designed to process "
        "investments clearly and deliver returns according to each package’s published terms. "
        "Our goal remains consistent: a self-sufficient platform that stands behind the ROI "
        "expectations presented to shareholders and clients."
    )
    y = wrap_text(c, body, MARGIN, y, CONTENT_W, size=9.5, leading=13) - 8 * mm

    badges = [
        ("CLEAR ROI TERMS", "Every featured package shows duration, amount range, and return rules before you invest."),
        ("GLOBAL PRESENCE", "New York · London · Singapore — built for clients worldwide."),
        ("SECURE PLATFORM", "Bank-grade encryption, verification, and transaction PIN protection."),
        ("MODERN FUNDING", "Bank transfers and crypto deposits supported for flexible funding."),
    ]
    badge_w = (CONTENT_W - 6 * mm) / 2
    for i, (t, b) in enumerate(badges):
        col = i % 2
        row = i // 2
        x = MARGIN + col * (badge_w + 6 * mm)
        yy = y - row * 36 * mm
        c.setFillColor(CARD)
        c.setStrokeColor(BRAND)
        c.setLineWidth(0.7)
        c.roundRect(x, yy - 30 * mm, badge_w, 32 * mm, 4, fill=1, stroke=1)
        c.setFillColor(BRAND)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(x + 3 * mm, yy - 6 * mm, t)
        wrap_text(c, b, x + 3 * mm, yy - 12 * mm, badge_w - 6 * mm, size=8, leading=10.5, color=MUTED)

    y -= 78 * mm
    closing = (
        "All these strengths contribute to why Expatica is trusted — combining digital banking "
        "convenience with clear investment packages, strong operational discipline, and "
        "client-first support."
    )
    wrap_text(c, closing, MARGIN, y, CONTENT_W, size=9.5, leading=13)
    new_page(c)


def page_insurance(c, page_no):
    draw_header_bar(c, "07  Insurance & Closing")
    draw_footer(c, page_no)
    y = H - 28 * mm
    y = section_title(c, y, "07", "OUR INSURANCE POLICY")

    body = (
        "Considering the quality of financial and investment services we offer at Expatica, "
        "we recognize the necessity of protecting user accounts with recognized financial "
        "safeguards and internal controls. This approach is strategic — to support indemnity "
        "and continuity in the event of operational mishap or account jeopardy, within the "
        "scope of applicable policies and regulations."
    )
    y = wrap_text(c, body, MARGIN, y, CONTENT_W, size=9.5, leading=13) - 5 * mm

    body2 = (
        "For any other information on our firm and mode of operation, as well as a guide "
        "through our platform, please visit the Legal pages on our website. Documents can "
        "also be requested through official Expatica outlets and will be made available once "
        "the request is processed."
    )
    y = wrap_text(c, body2, MARGIN, y, CONTENT_W, size=9.5, leading=13) - 5 * mm

    body3 = (
        "On this same hand, do not hesitate to make your complaint regarding our services as "
        "demanded and directed in our Complaint Handling Policy."
    )
    y = wrap_text(c, body3, MARGIN, y, CONTENT_W, size=9.5, leading=13) - 12 * mm

    c.setFillColor(BRAND_DEEP)
    c.roundRect(MARGIN, y - 55 * mm, CONTENT_W, 58 * mm, 6, fill=1, stroke=0)
    c.setFillColor(GOLD_LIGHT)
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(W / 2, y - 12 * mm, "We wish you a fruitful investment period with us!")
    c.setFillColor(white)
    c.setFont("Helvetica", 9.5)
    c.drawCentredString(W / 2, y - 24 * mm, "Expatica Financial Services Ltd.")
    c.drawCentredString(W / 2, y - 32 * mm, "New York · London · Singapore  ·  Established 2000")
    c.setFillColor(HexColor("#5eead4"))
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(W / 2, y - 44 * mm, "www.expaticaonline.com")

    y -= 70 * mm
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7.5)
    disclaimer = (
        "This document is provided for informational purposes and presents company services "
        "and investment packages as listed on the Expatica platform. Product availability, "
        "returns, and terms may vary by region, verification level, and plan rules. Always "
        "review live package details in your account before investing."
    )
    wrap_text(c, disclaimer, MARGIN, y, CONTENT_W, size=7.5, leading=10, color=MUTED)


def build():
    OUT_DOWNLOADS.parent.mkdir(parents=True, exist_ok=True)
    OUT_SITE.parent.mkdir(parents=True, exist_ok=True)

    for out in (OUT_DOWNLOADS, OUT_SITE):
        c = canvas.Canvas(str(out), pagesize=A4)
        page_cover(c)
        page_contents(c, 2)
        page_about(c, 3)
        page_tech_trust(c, 4)
        page_portfolio_explained(c, 5)
        page_packages(c, 6)
        page_services(c, 7)
        page_trust(c, 8)
        page_insurance(c, 9)
        c.save()
        print(f"Wrote {out}")


if __name__ == "__main__":
    build()
