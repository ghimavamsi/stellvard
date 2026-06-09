import glob, re

def main():
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            idx_content = f.read()
    except Exception as e:
        print("Error reading index.html", e)
        return

    # Extract header area correctly:
    # We want everything from <div class="pbmit-main-header-area pbmit-infostack-header">
    # up to its matching </div> before pbmit-slider-area.
    # A robust way is to just find the string between these two unique markers:
    start_marker = '<div class="pbmit-main-header-area pbmit-infostack-header">'
    
    # In index.html, the end of the pbmit-main-header-area is before 
    # 			</div>
    # 			<div class="pbmit-slider-area pbmit-slider-one">
    # Let's find the position.
    start_idx = idx_content.find(start_marker)
    if start_idx == -1:
        print("Could not find start marker for header")
        return
        
    end_marker = '<div class="pbmit-slider-area pbmit-slider-one">'
    end_idx = idx_content.find(end_marker, start_idx)
    
    if end_idx == -1:
        print("Could not find end marker for header")
        return
        
    # the actual header block ends a couple of divs before pbmit-slider-area.
    # we just take from start_marker to the last </div> before end_idx.
    temp_header = idx_content[start_idx:end_idx]
    last_div_idx = temp_header.rfind('</div>')
    # wait, the structure is:
    #                 </div>
    #             </div>
    #             <div class="pbmit-slider-area ...
    # So the matching closing div for pbmit-main-header-area is the first one going backwards.
    # Actually, we can just extract using a simple trick: split the header by </header>
    # Let's just use re to extract the whole pbmit-main-header-area div contents.
    
    # We can match up to the end of the div by counting divs or using regex for the specific content.
    # Let's just grab the whole innerHTML between pbmit-main-header-area and the end of the row of divs.
    
    m = re.search(r'(<div class="pbmit-main-header-area pbmit-infostack-header">.*?\s*</div>\s*)</div>\s*(?:<div class="pbmit-slider-area|</header>)', idx_content, re.DOTALL)
    if not m:
        print("Regex for header failed")
        return
    header_html = m.group(1)
    
    # Extract footer
    m_foot = re.search(r'<footer[^>]*>.*?</footer>', idx_content, re.DOTALL)
    if not m_foot:
        print("Regex for footer failed")
        return
    footer_html = m_foot.group(0)
    
    html_files = glob.glob('*.html')
    if 'index.html' in html_files:
        html_files.remove('index.html')
        
    for hf in html_files:
        with open(hf, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # replace header
        # Find start of pbmit-main-header-area
        s_idx = content.find(start_marker)
        if s_idx != -1:
            # find the end of it
            # The structure is: 
            # <div class="pbmit-main-header-area pbmit-infostack-header">...</div>
            # </div>
            # </header>
            
            # Using regex to replace
            content = re.sub(r'<div class="pbmit-main-header-area pbmit-infostack-header">.*?\s*</div>\s*(?=</div>\s*</header>|</div>\s*<div class="pbmit-title-bar-wrapper)', header_html, content, flags=re.DOTALL)
            
        # replace footer
        content = re.sub(r'<footer[^>]*>.*?</footer>', footer_html, content, flags=re.DOTALL)
        
        with open(hf, 'w', encoding='utf-8') as f:
            f.write(content)
            
    print("Done")

if __name__ == '__main__':
    main()
