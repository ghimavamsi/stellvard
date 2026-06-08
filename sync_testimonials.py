import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        index_content = f.read()

    # Extract testimonial from index
    testimonial_match = re.search(r'<!--\s*Testimonial start\s*-->(.*?)<!--\s*Testimonial End\s*-->', index_content, re.IGNORECASE | re.DOTALL)
    if not testimonial_match:
        print("Could not find testimonial in index.html")
        return
    # we want to include the start and end comments in our extraction
    testimonial_content = testimonial_match.group(0)

    with open('about-us.html', 'r', encoding='utf-8') as f:
        about_content = f.read()

    # Find the two Testimonial Start markers in about-us.html
    starts = [m for m in re.finditer(r'<!--\s*Testimonial start\s*-->', about_content, re.IGNORECASE)]
    
    if len(starts) >= 2:
        # replace from the first start to the second start
        start_idx = starts[0].start()
        end_idx = starts[1].end()
        
        # We replace the entire block, and put back the Testimonial End so it's clean next time
        about_content_new = about_content[:start_idx] + testimonial_content + '\n' + about_content[end_idx:]
        
        with open('about-us.html', 'w', encoding='utf-8') as f:
            f.write(about_content_new)
            
        print("Testimonials synced successfully.")
    else:
        print("Could not find two Testimonial Start markers in about-us.html")

if __name__ == '__main__':
    main()
