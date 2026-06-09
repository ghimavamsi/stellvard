import glob, re

def main():
    html_files = glob.glob('*.html')
    script_tag = '<script src="js/search.js?v=1"></script>\n</body>'
    
    for hf in html_files:
        with open(hf, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'js/search.js' not in content:
            content = re.sub(r'</body>', script_tag, content)
            
            with open(hf, 'w', encoding='utf-8') as f:
                f.write(content)
                
    print("Injected search.js into all HTML files")

if __name__ == '__main__':
    main()
