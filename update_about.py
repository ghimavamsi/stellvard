import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        index_content = f.read()
    
    with open('about-us.html', 'r', encoding='utf-8') as f:
        about_content = f.read()

    # Extract header from index
    header_match = re.search(r'<!-- Header Main Area -->.*?<!-- Header Main Area End Here -->', index_content, re.DOTALL)
    if not header_match:
        print("Could not find header in index.html")
        return
    header = header_match.group(0)

    # Make "About" active instead of "Home"
    # The home active li looks like: <li class="active">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="index.html">Home</a>
    header = header.replace('<li class="active">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="index.html">Home</a>', '<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="index.html">Home</a>')
    header = header.replace('<li><a href="#">About</a></li>', '<li class="active"><a href="about-us.html">About</a></li>')

    # Remove the slider from the header (since it's only for the homepage)
    # The slider is inside <div class="pbmit-slider-area pbmit-slider-one">
    slider_match = re.search(r'<div class="pbmit-slider-area pbmit-slider-one">.*?</div>\s*</header>', header, re.DOTALL)
    if slider_match:
        # Just remove the slider div entirely, leaving the </header>
        header = header[:slider_match.start()] + '</header>'

    # Extract footer from index
    footer_match = re.search(r'<!-- footer -->\s*<footer class="site-footer pbmit-footer-style-1">.*?</footer>', index_content, re.DOTALL)
    if not footer_match:
        print("Could not find footer in index.html")
        return
    footer = footer_match.group(0)

    # Replace header in about
    about_content = re.sub(r'<!-- Header Main Area -->.*?<!-- Header Main Area End Here -->', header, about_content, flags=re.DOTALL)
    
    # Replace footer in about
    about_content = re.sub(r'<!-- footer -->\s*<footer.*?</footer>', footer, about_content, flags=re.DOTALL)

    # Some basic text and image cleanups in about-us.html
    # Image 1
    about_content = about_content.replace('images/demo-2/about-img-01.jpg', 'https://images.unsplash.com/photo-1530026405186-ed1f4956ce84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')
    # Image 2
    about_content = about_content.replace('images/demo-2/about-img-02.jpg', 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')
    # Image 3
    about_content = about_content.replace('images/demo-1/about-img-02.jpg', 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')

    with open('about-us.html', 'w', encoding='utf-8') as f:
        f.write(about_content)
    
    print("Updated about-us.html successfully.")

if __name__ == '__main__':
    main()
