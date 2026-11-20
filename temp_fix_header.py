with open('raicilla.html', 'r', encoding='utf-8') as f:
    html = f.read()

target = '<th style="padding:1rem 1.2rem;font-family:var(--serif);font-size:1.05rem;font-weight:700;color:var(--gold-2)">Raicilla (Hnos. Arrizón)</th>'
replacement = '<th style="padding:1rem 1.2rem;font-family:var(--serif);font-size:1.05rem;font-weight:700;color:var(--gold-2)">Raicilla</th>'

if target in html:
    html = html.replace(target, replacement)
    print("SUCCESS: Updated Raicilla column header")
else:
    print("ERROR: Target header not found")

# Also check last row: "100% Artesanal en taberna familiar desde 1932" -> let's make it general or keep artisanal taberna
old_row = '100% Artesanal en taberna familiar desde 1932'
new_row = '100% Artesanal en tabernas tradicionales'
if old_row in html:
    html = html.replace(old_row, new_row)
    print("SUCCESS: Updated production row to be general for Raicilla")

with open('raicilla.html', 'w', encoding='utf-8') as f:
    f.write(html)
