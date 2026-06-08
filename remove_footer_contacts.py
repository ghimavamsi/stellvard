import re

def remove_footer_items(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to find the Contact Us ul and remove the UK Office, Dubai Hub, and Email Us list items.
    # The safest way is to target the list items containing 'UK Office', 'Dubai Hub', and 'Email Us'
    
    # 1. Find the UK Office li
    content = re.sub(r'<li class="pbmit-list-item" style="margin-bottom: 20px;">\s*<span class="pbmit-list-item-inner">\s*<span class="pbmit-list-item-title"[^>]*>\s*UK\s*Office</span>.*?</li>', '', content, flags=re.DOTALL)
    
    # 2. Find the Dubai Hub li
    content = re.sub(r'<li class="pbmit-list-item" style="margin-bottom: 20px;">\s*<span class="pbmit-list-item-inner">\s*<span class="pbmit-list-item-title"[^>]*>\s*Dubai\s*Hub\s*\(GCC\)</span>.*?</li>', '', content, flags=re.DOTALL)
    
    # 3. Find the Email Us li
    content = re.sub(r'<li class="pbmit-list-item">\s*<span class="pbmit-list-item-inner">\s*<span class="pbmit-list-item-title"[^>]*>\s*Email\s*Us</span>.*?</li>', '', content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
files_to_update = ['index.html', 'about-us.html', 'contact-us.html']
for file in files_to_update:
    remove_footer_items(file)
    print(f"Updated {file}")
