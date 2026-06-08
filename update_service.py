import re

def main():
    with open('service-details.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update title and active breadcrumb
    content = re.sub(r'<h1 class="pbmit-tbar-title">.*?</h1>', '<h1 class="pbmit-tbar-title">Human Genomics</h1>', content)
    content = re.sub(r'<span class="post-root post post-post current-item">.*?</span>', '<span class="post-root post post-post current-item">Human Genomics</span>', content)
    content = re.sub(r'<p class="pbmit-tbar-desc">.*?</p>', '<p class="pbmit-tbar-desc">Comprehensive solutions for clinical research, precision medicine, and population-scale genomic studies.</p>', content)

    # 2. Update the main image
    content = content.replace('images/service/service-single-01.jpg', 'assets/images/Human.png')
    
    # 3. Update main title
    content = re.sub(r'<h2 class="pbmit-title">\s*Empowering Precision Genomics for a Healthier Future\s*</h2>', '<h2 class="pbmit-title">Human Genomics Services</h2>', content)

    # 4. Update the intro text
    old_intro = r'<p>\s*<span class="pbmit-drop-cap">\s*<span class="pbmit-drop-cap-letter">S</span>\s*</span>\s*Stellvard Bioscience is a deep-tech genomics enterprise delivering advanced.*?high-quality genomic insights.\s*</p>'
    new_intro = r'''<p>
										<span class="pbmit-drop-cap">
											<span class="pbmit-drop-cap-letter">O</span>
										</span>
										ur human genomics services offer comprehensive solutions for clinical research, precision medicine, and population-scale genomic studies. We leverage state-of-the-art next-generation sequencing (NGS) and long-read technologies to decode the complexities of the human genome with unprecedented accuracy. From early disease detection to advanced therapeutic development, our platforms ensure high-fidelity insights.
									</p>'''
    content = re.sub(old_intro, new_intro, content, flags=re.DOTALL)

    # 5. Update the three step titles and descriptions
    content = content.replace('<h2 class="pbmit-element-title">Sample Submission</h2>', '<h2 class="pbmit-element-title">Whole Genome Sequencing</h2>')
    content = content.replace('Collection and preparation of biological samples for\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tgenomic analysis.', 'Comprehensive analysis of the entire human genome to identify rare variants, structural variations, and complex genomic alterations.')

    content = content.replace('<h2 class="pbmit-element-title">Sequencing & Analysis</h2>', '<h2 class="pbmit-element-title">Targeted Exome Sequencing</h2>')
    content = content.replace('Advanced sequencing using PacBio HiFi and\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tnext-generation genomics platforms.', 'Deep sequencing of the protein-coding regions to accurately diagnose genetic disorders and identify disease-causing mutations.')

    content = content.replace('<h2 class="pbmit-element-title">AI-Powered Interpretation\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</h2>', '<h2 class="pbmit-element-title">Clinical Interpretation</h2>')
    content = content.replace('Comprehensive bioinformatics analysis and clinical-grade\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treporting.', 'AI-powered bioinformatics workflows to deliver actionable clinical insights, variant classification, and detailed diagnostic reporting.')

    # 6. Remove the extra pbmit-ihbox-style-7 blocks at the bottom, or change them.
    # The current page has blocks for "Human Genomics" and "Plant & Animal Genomics" at the bottom of the page content.
    # Since the whole page is now about Human Genomics, let's remove those small blocks at the bottom that list other services.
    content = re.sub(r'<p>\s*Our genomics solutions support human health.*?services.\s*</p>', '', content, flags=re.DOTALL)
    content = re.sub(r'<div class="pbmit-ihbox-style-7 mb-3">.*?</div>\s*</div>\s*</div>\s*</div>', '', content, flags=re.DOTALL)

    with open('service-details.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("service-details.html updated successfully")

if __name__ == '__main__':
    main()
