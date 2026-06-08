import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        index_content = f.read()

    with open('contact-us.html', 'r', encoding='utf-8') as f:
        contact_content = f.read()

    # Extract header from index
    header_match = re.search(r'<!-- Header Main Area -->.*?<!-- Header Main Area End Here -->', index_content, re.DOTALL)
    if header_match:
        header = header_match.group(0)
        
        # Make "Contact Us" active instead of "Home"
        header = header.replace('<li class="active">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="index.html">Home</a>', '<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="index.html">Home</a>')
        # We need to find the Contact Us link and make it active.
        header = header.replace('<li><a href="contact-us.html">Principle</a></li>', '<li><a href="contact-us.html">Principle</a></li>')
        # Wait, the nav in index.html I created was:
        # <li><a href="index.html">Home</a></li>
        # <li><a href="about-us.html">About</a></li>
        # ...
        # <li><a href="contact-us.html">Contact Us</a></li>
        # Or did I rename it to "Principle"? Let's just make sure "Contact Us" or the exact nav link for contact gets .active
        
        # Actually I'll use regex to remove class="active" and add it to contact-us.html
        header = re.sub(r'<li class="active">', r'<li>', header)
        header = re.sub(r'<li>\s*<a href="contact-us.html">', r'<li class="active"><a href="contact-us.html">', header)

        # Remove slider from header
        slider_match = re.search(r'<div class="pbmit-slider-area pbmit-slider-one">.*?</div>\s*</header>', header, re.DOTALL)
        if slider_match:
            header = header[:slider_match.start()] + '</header>'

        contact_content = re.sub(r'<!-- Header Main Area -->.*?<!-- Header Main Area End Here -->', header, contact_content, flags=re.DOTALL)

    # Extract footer from index
    footer_match = re.search(r'<!-- footer -->\s*<footer class="site-footer pbmit-footer-style-1">.*?</footer>', index_content, re.DOTALL)
    if footer_match:
        footer = footer_match.group(0)
        contact_content = re.sub(r'<!-- footer -->\s*<footer.*?</footer>', footer, contact_content, flags=re.DOTALL)

    # Replace content texts
    contact_content = contact_content.replace('<title>Contact Us – Labozen HTML Template</title>', '<title>Contact Us – Stellvard Bioscience</title>')
    contact_content = contact_content.replace('<span>Labozen</span>', '<span>Stellvard Bioscience</span>')
    contact_content = contact_content.replace('Lab services involve testing samples of blood, urine, or tissue to provide diagnostic <br> information for healthcare providers.', 'Get in touch with our genomics experts for services, partnerships, or support across our India, UK, and Dubai locations.')
    
    # Contact Details
    contact_content = contact_content.replace('1010 Rue Sainte-Catherine Ste 200, Montréal, QC H3B 5L1, Canada', 'Sy No. 11/26, Plot No. 34/B, N Square, 4th Floor, Hitech City Main Road, Khanamet Village, Hyderabad, Telangana – 500 081, India')
    
    # We replace email tags
    # The template obfuscates email using cloudflare. Let's just strip that and put the raw email for simplicity.
    email_block = r'<a href="https://labozen-demo.pbminfotech.com/cdn-cgi/l/email-protection#d9b7b6abbca9b5a099a9bbb4b0b7bfb6adbcbab1f7bab6b4">\s*<span class="pbmit-button-text"><span class="__cf_email__"[^>]+>\[email&#160;protected\]</span></span>\s*</a>'
    contact_content = re.sub(email_block, '<a href="mailto:sreedhar@stellvard.com"><span class="pbmit-button-text">sreedhar@stellvard.com</span></a>', contact_content)
    
    contact_content = contact_content.replace('Trusted lab experts delivering solution and best work.', 'Our dedicated support team is available 24/7.')
    
    contact_content = contact_content.replace('1-888-452-1510', '+91 73307 56745')
    contact_content = contact_content.replace('tel:1-888-452-1510', 'tel:+917330756745')
    
    contact_content = contact_content.replace('30000+ People <br> Trusting us!', '1000+ Researchers <br> Trusting us!')
    contact_content = contact_content.replace('images/demo-1/testimonial-img-01.png', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')

    # Remove Client Start section completely
    contact_content = re.sub(r'<!-- Client Start -->.*?<!-- Client End -->', '', contact_content, flags=re.DOTALL)

    # Iframe
    new_iframe = '<iframe src="https://maps.google.com/maps?q=Hitech%20City,%20Hyderabad,%20India&t=m&z=12&output=embed&iwloc=near" title="Stellvard HQ, Hyderabad" aria-label="Stellvard HQ, Hyderabad"></iframe>'
    contact_content = re.sub(r'<iframe src="https://maps\.google\.com/maps.*?</iframe>', new_iframe, contact_content)

    # Remove any extra demo scripts if present, but they should be fine.
    
    with open('contact-us.html', 'w', encoding='utf-8') as f:
        f.write(contact_content)
        
    print("Contact Us page updated successfully.")

if __name__ == '__main__':
    main()
