import re

def main():
    with open('service-details.html', 'r', encoding='utf-8') as f:
        content = f.read()

    new_list = """<ul>
											<li class="post-active"><a href="service-details.html"> Human Genomics </a></li>
											<li><a href="service-details.html"> Plant Genomics </a></li>
											<li><a href="service-details.html"> Meta Genomics </a></li>
											<li><a href="service-details.html"> Epigenomics </a></li>
											<li><a href="service-details.html"> SNP Genotyping </a></li>
											<li><a href="service-details.html"> Single Cell RNA Sequencing </a></li>
											<li><a href="service-details.html"> Transcriptomics </a></li>
											<li><a href="service-details.html"> Customized ELISA kits development </a></li>
											<li><a href="service-details.html"> Customized Antibodies Development </a></li>
											<li><a href="service-details.html"> Bio Informatic Analysis </a></li>
											<li><a href="service-details.html"> NGS Library Preparation </a></li>
											<li><a href="service-details.html"> Species Identification </a></li>
										</ul>"""

    # We need to replace the ul inside all-post-list
    pattern = r'<div class="all-post-list">\s*<ul>.*?</ul>\s*</div>'
    replacement = f'<div class="all-post-list">\n\t\t\t\t\t\t\t\t\t\t{new_list}\n\t\t\t\t\t\t\t\t\t</div>'
    
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    with open('service-details.html', 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Updated service-details.html sidebar")

if __name__ == '__main__':
    main()
