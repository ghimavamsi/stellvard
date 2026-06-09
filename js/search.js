(function ($) {
  "use strict";

  const searchIndex = [
    // Services
    { title: "Human Genomics", url: "Human_Genomics.html", category: "Service" },
    { title: "Plant Genomics", url: "Plant_Genomics.html", category: "Service" },
    { title: "Meta Genomics", url: "Meta_Genomics.html", category: "Service" },
    { title: "Epigenomics", url: "Epigenomics.html", category: "Service" },
    { title: "SNP Genotyping", url: "SNP_Genotyping.html", category: "Service" },
    { title: "Single Cell RNA Sequencing", url: "Single_Cell_RNA_Sequencing.html", category: "Service" },
    { title: "Transcriptomics", url: "Transcriptomics.html", category: "Service" },
    { title: "Customized ELISA Kits", url: "Customized_ELISA_Kits.html", category: "Service" },
    { title: "Customized Antibodies", url: "Customized_Antibodies.html", category: "Service" },
    { title: "Bio Informatic Analysis", url: "Bio_Informatic_Analysis.html", category: "Service" },
    { title: "NGS Library Preparation", url: "NGS_Library_Preparation.html", category: "Service" },
    { title: "Species Identification", url: "Species_Identification.html", category: "Service" },

    // Principles
    { title: "Reed Biotech", url: "Reed_Biotech.html", category: "Principle" },
    { title: "ELK Biotech", url: "ELK_Biotech.html", category: "Principle" },
    { title: "GeneMedi", url: "GeneMedi.html", category: "Principle" },
    { title: "Elabscience", url: "Elabscience.html", category: "Principle" },
    { title: "Zymo Research", url: "Zymo_Research.html", category: "Principle" },
    { title: "Biocomma", url: "Biocomma.html", category: "Principle" },

    // Portfolio
    { title: "Elisa Kits", url: "Portfolio.html#elisa-kits", category: "Portfolio" },
    { title: "Antibodies", url: "Portfolio.html#antibodies", category: "Portfolio" },
    { title: "PCR Kits", url: "Portfolio.html#pcr-kits", category: "Portfolio" },
    { title: "DNA/ RNA Extraction Kits", url: "Portfolio.html#dna-rna-kits", category: "Portfolio" },
    { title: "Microbiology Media", url: "Portfolio.html#microbiology", category: "Portfolio" },

    // Pages
    { title: "About Us", url: "about-us.html", category: "Page" },
    { title: "Contact Us", url: "contact-us.html", category: "Page" },
    { title: "Portfolio", url: "Portfolio.html", category: "Page" },
    { title: "Home", url: "index.html", category: "Page" }
  ];

  $(document).ready(function() {
    // Add suggestion container to DOM near each search field
    $('.search-field').each(function() {
      let $input = $(this);
      let $container = $('<div class="pbmit-search-suggestions"></div>');
      $input.after($container);

      $input.on('input', function() {
        let query = $(this).val().toLowerCase();
        $container.empty();

        if (query.length > 0) {
          let matches = searchIndex.filter(item => item.title.toLowerCase().includes(query));
          
          if (matches.length > 0) {
            let ul = $('<ul></ul>');
            matches.forEach(match => {
              let li = $('<li class="pbmit-search-suggestion-item"></li>');
              let a = $('<a></a>').attr('href', match.url);
              let title = $('<span></span>').text(match.title);
              let category = $('<span class="pbmit-search-category"></span>').text(match.category);
              
              a.append(title).append(category);
              li.append(a);
              ul.append(li);
            });
            $container.append(ul);
            $container.show();
          } else {
            $container.hide();
          }
        } else {
          $container.hide();
        }
      });

      // Handle form submission
      let $form = $input.closest('form');
      $form.on('submit', function(e) {
        e.preventDefault();
        let query = $input.val().toLowerCase();
        if (query.length > 0) {
          let matches = searchIndex.filter(item => item.title.toLowerCase().includes(query));
          if (matches.length > 0) {
            window.location.href = matches[0].url;
          }
        }
      });
    });

    // Hide suggestions when clicking outside
    $(document).on('click', function(e) {
      if (!$(e.target).closest('.pbmit-search-wrap, .search-form').length) {
        $('.pbmit-search-suggestions').hide();
      }
    });

    // Prevent search form from navigating to index.html default action
    $('form.search-form, form:has(.search-field)').attr('action', 'javascript:void(0)');
  });

})(jQuery);
