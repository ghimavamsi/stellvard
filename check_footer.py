import re
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'<h2 class="widget-title">Contact Us</h2>.*?<ul class="pbmit-list-items">(.*?)</ul>', text, re.DOTALL)
if match:
    print(match.group(1))
