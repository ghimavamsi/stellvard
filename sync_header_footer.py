import re

def main():
    # Read index.html
    with open('index.html', 'r', encoding='utf-8') as f:
        index_content = f.read()

    # Extract header from index.html
    header_pattern = r'<!-- Header Main Area -->\s*<header class="site-header pbmit-header-style-1" id="masthead">.*?</header>\s*<!-- Header Main Area End Here -->'
    header_match = re.search(header_pattern, index_content, flags=re.DOTALL)
    if not header_match:
        print("Header not found in index.html")
        return
    header_content = header_match.group(0)

    # Extract footer from index.html
    footer_pattern = r'<!-- footer -->\s*<footer class="site-footer pbmit-footer-style-1">.*?</footer>'
    footer_match = re.search(footer_pattern, index_content, flags=re.DOTALL)
    if not footer_match:
        print("Footer not found in index.html")
        return
    footer_content = footer_match.group(0)

    # Read portfolio-grid-col-4.html
    with open('portfolio-grid-col-4.html', 'r', encoding='utf-8') as f:
        target_content = f.read()

    # Replace header in portfolio-grid-col-4.html
    target_header_pattern = r'<!-- Header Main Area -->\s*<header class="site-header pbmit-header-style-1" id="masthead">.*?</header>\s*<!-- Header Main Area End Here -->'
    target_content = re.sub(target_header_pattern, header_content, target_content, flags=re.DOTALL)

    # Replace footer in portfolio-grid-col-4.html
    target_footer_pattern = r'<!-- footer -->\s*<footer class="site-footer pbmit-footer-style-1">.*?</footer>'
    target_content = re.sub(target_footer_pattern, footer_content, target_content, flags=re.DOTALL)

    # Save portfolio-grid-col-4.html
    with open('portfolio-grid-col-4.html', 'w', encoding='utf-8') as f:
        f.write(target_content)

    print("Successfully synced header and footer to portfolio-grid-col-4.html")

if __name__ == '__main__':
    main()
