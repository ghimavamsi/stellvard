import re

def main():
    with open('about-us.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Team names
    content = content.replace('Darrell Steward', 'Dr. Sreedhar', 1)
    content = content.replace('Emily Sanders', 'Dr. Ananya Gupta')
    content = content.replace('Darrell Steward', 'Rajesh Kumar')
    content = content.replace('Laura Bennett', 'Priya Sharma')

    # Team Images
    content = content.replace('images/demo-2/team/team-img-01.jpg', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')
    content = content.replace('images/demo-2/team/team-img-02.jpg', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')
    content = content.replace('images/demo-2/team/team-img-03.jpg', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')
    content = content.replace('images/demo-2/team/team-img-04.jpg', 'https://images.unsplash.com/photo-1594824436951-7f1267b2d56a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')

    # Text improvements
    content = content.replace('Trust our experts they develop methods. carry out difficult projects.', 'Trust our experts who develop advanced methods and carry out complex genomic projects.')
    
    # Check if there are other demo-2 images
    content = content.replace('images/demo-2/marquee-img/img-01.jpg', 'assets/images/Human.png')
    content = content.replace('images/demo-2/marquee-img/img-02.jpg', 'assets/images/plant.png')
    content = content.replace('images/demo-2/marquee-img/img-03.jpg', 'assets/images/meta-genomics.png')
    content = content.replace('images/demo-2/marquee-img/img-04.jpg', 'assets/images/Human.png')
    content = content.replace('images/demo-2/marquee-img/img-05.jpg', 'assets/images/plant.png')
    
    # Marquee text
    content = content.replace('data-text="Laboratory">\n\t\t\t\t\t\t\t\t\t\tLaboratory', 'data-text="Genomics">\n\t\t\t\t\t\t\t\t\t\tGenomics')
    content = content.replace('data-text="Molecular">\n\t\t\t\t\t\t\t\t\t\tMolecular', 'data-text="Proteomics">\n\t\t\t\t\t\t\t\t\t\tProteomics')
    content = content.replace('data-text="Immunology">\n\t\t\t\t\t\t\t\t\t\tImmunology', 'data-text="Bioinformatics">\n\t\t\t\t\t\t\t\t\t\tBioinformatics')
    content = content.replace('data-text="Diagnostics">\n\t\t\t\t\t\t\t\t\t\tDiagnostics', 'data-text="Sequencing">\n\t\t\t\t\t\t\t\t\t\tSequencing')
    content = content.replace('data-text="Science">\n\t\t\t\t\t\t\t\t\t\tScience', 'data-text="Epigenomics">\n\t\t\t\t\t\t\t\t\t\tEpigenomics')

    with open('about-us.html', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Content updated successfully.")

if __name__ == '__main__':
    main()
