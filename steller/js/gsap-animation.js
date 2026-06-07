(function ($) {
	"use strict";

	gsap.registerPlugin(ScrollTrigger, SplitText);
	gsap.config({
		nullTargetWarn: false,
		trialWarn: false
	});

	jQuery.fn.pbmit_is_bound = function(type) {
		if (this.data('events') !== undefined) {
			if (this.data('events')[type] === undefined || this.data('events')[type].length === 0) {
				return false;
			}
			return (-1 !== $.inArray(fn, this.data('events')[type]));
		} else {
			return false;
		}
	};

	/*----  Functions  ----*/
	function getpercentage(x, y, elm) { 
		elm.find('.pbmit-fid-inner').html(y + '/' + x);
		var cal = Math.round((y * 100) / x);
		return cal;
	}

	/*----  Sticky Header ----*/
	var pbmit_sticky_header = function () {
		if (jQuery('.pbmit-header-sticky-yes').length > 0) {
			var header_html = jQuery('#masthead .pbmit-main-header-area').html();
			jQuery('.pbmit-sticky-header').append(header_html);
			jQuery('.pbmit-sticky-header #menu-toggle').attr('id', 'menu-toggle2');
			jQuery('#menu-toggle2').on('click', function () {
				jQuery("#menu-toggle").trigger("click");
			});
			jQuery('.pbmit-sticky-header .main-navigation ul, .pbmit-sticky-header .main-navigation ul li, .pbmit-sticky-header .main-navigation ul li a').removeAttr('id');
			jQuery('.pbmit-sticky-header h1').each(function () {
				var thisele = jQuery(this);
				var thisele_class = jQuery(this).attr('class');
				thisele.replaceWith('<span class="' + thisele_class + '">' + jQuery(thisele).html() + '</span>');
			});

			// For infostack header
			if (jQuery('.pbmit-main-header-area').hasClass('pbmit-infostack-header')) {
				jQuery('.pbmit-sticky-header .pbmit-pre-header-wrapper').remove();
			}
		}
	};

	var pbmit_sticky_header_class = function () {
		var lastScroll = 0;

		if (jQuery('#wpadminbar').length > 0) {
			jQuery('#masthead').addClass('pbmit-adminbar-exists');
		}

		jQuery(window).on('scroll', function () {
			var scroll = jQuery(window).scrollTop();
			var header_height = 0;

			if (jQuery('.pbmit-main-header-area').length > 0) {                
				header_height = jQuery('.pbmit-main-header-area').height();
			}

			if (scroll === 0) {
				jQuery('#masthead .pbmit-sticky-header').removeClass('pbmit-fixed-header');
			} else {
				if (scroll > lastScroll) {
					// Scrolling down → hide sticky
					jQuery('#masthead .pbmit-sticky-header').removeClass('pbmit-fixed-header');
				} else {
					// Scrolling up
					if (scroll > 300) {
						// Above 300px → show sticky
						jQuery('#masthead .pbmit-sticky-header').addClass('pbmit-fixed-header');
					} else {
						// Below 300px → hide sticky
						jQuery('#masthead .pbmit-sticky-header').removeClass('pbmit-fixed-header');
					}
				}
			}
			lastScroll = scroll;
		});
	};

	var pbmit_toggleSidebar = function() {
		jQuery('#menu-toggle').on('click', function() {
			jQuery("body:not(.mega-menu-pbminfotech-top) .pbmit-navbar > div, body:not(.mega-menu-pbminfotech-top)").toggleClass("active");
		})
		if (jQuery('.pbmit-navbar > div > .closepanel').length == 0) {
			jQuery('.pbmit-navbar > div').append('<span class="closepanel"><svg class="qodef-svg--close qodef-m" xmlns="http://www.w3.org/2000/svg" width="20.163" height="20.163" viewBox="0 0 26.163 26.163"><rect width="36" height="1" transform="translate(0.707) rotate(45)"></rect><rect width="36" height="1" transform="translate(0 25.456) rotate(-45)"></rect></svg></span>');
			jQuery('.pbmit-navbar > div > .closepanel, .mega-menu-pbminfotech-top .nav-menu-toggle').on('click', function() {
				jQuery(".pbmit-navbar > div, body, .mega-menu-wrap").toggleClass("active");
			});
			return false;
		}
	}
	var pbmit_flotingbar = function() {
		jQuery('.pbmit-nav-menu-toggle').on('click', function() {
			jQuery("body .floting-bar-wrap").toggleClass("active");
		})
		if (jQuery('.floting-bar-wrap .closepanel').length == 0) {
			jQuery('.floting-bar-wrap').append('<span class="closepanel"><svg class="qodef-svg--close qodef-m" xmlns="http://www.w3.org/2000/svg" width="26.163" height="26.163" viewBox="0 0 26.163 26.163"><rect width="36" height="1" transform="translate(0.707) rotate(45)"></rect><rect width="36" height="1" transform="translate(0 25.456) rotate(-45)"></rect></svg></span>');
			jQuery('.floting-bar-wrap .closepanel').on('click', function() {
				jQuery(".floting-bar-wrap").toggleClass("active");
			});
			return false;
		}
	}

	var pbmit_navbar = function() {
		if (!jQuery('ul#pbmit-top-menu > li > a[href="#"]').pbmit_is_bound('click')) {
			jQuery('ul#pbmit-top-menu > li > a[href="#"]').on('click', function() { return false; });
		}
		jQuery('.pbmit-navbar li:has(ul)').append("<span class='sub-menu-toggle'><i class='pbmit-base-icon-angle-right'></i></span>");
		jQuery('.pbmit-navbar li').on('mouseover', function() {
			if (jQuery(this).children("ul").length == 1) {
				var parent = jQuery(this);
				var child_menu = jQuery(this).children("ul");
				if (jQuery(parent).offset().left + jQuery(parent).width() + jQuery(child_menu).width() > jQuery(window).width()) {
					jQuery(child_menu).addClass('pbmit-nav-left');
				} else {
					jQuery(child_menu).removeClass('pbmit-nav-left');
				}
			}
		});
		jQuery('.sub-menu-toggle').on('click', function() {
			if (jQuery(this).siblings('.sub-menu, .children').hasClass('show')) {
				jQuery(this).siblings('.sub-menu, .children').removeClass('show');
				jQuery('i', jQuery(this)).removeClass('pbmit-base-icon-up-open-big').addClass('pbmit-base-icon-angle-right');
			} else {
				jQuery(this).siblings('.sub-menu, .children').addClass('show');
				jQuery('i', jQuery(this)).removeClass('pbmit-base-icon-angle-right').addClass('pbmit-base-icon-up-open-big');
			}
			return false;
		});
		jQuery('.nav-menu-toggle').on('click', function() {
			jQuery('.pbmit-navbar ul.menu > li > a').on('click', function() {
				if (jQuery(this).attr('href') == '#' && jQuery(this).siblings('ul.sub-menu, ul.children').length > 0) {
					jQuery(this).siblings('.sub-menu-toggle').trigger('click');
					return false;
				}
			});
		})
	}

	/*---- Active Hover ----*/
	var pbmit_active_hover = function() {
		var pbmit_var = jQuery('.pbmit-element-static-box-style-1, .pbmit-element-portfolio-style-2,.pbmit-element-portfolio-style-4,.pbmit-element-static-box-style-3,.pbmit-element-service-style-5,.pbmit-element-static-box-style-4');
		if (!pbmit_var.length) {
			return;
		}
		pbmit_var.each(function() {
			var pbmit_Class = '.pbmit-static-box-style-1, .pbmit-hover-inner .pbmit-title-wrapper,.pbmit-hover-inner .pbmit-title-wrapper,.pbmit-service-style-5';
			jQuery(this)
				.find(pbmit_Class).first()
				.addClass('pbmit-active');
			jQuery(this)
				.find(pbmit_Class)
				.on('mouseover', function() {
					jQuery(this).addClass('pbmit-active').siblings().removeClass('pbmit-active');
				});
		});
	}

	var pbmit_portfolio_style2 = function() {
		jQuery(".pbmit-element-portfolio-style-2 .pbmit-portfolio-style-2").eq(0).addClass('pbmit-active');
		jQuery(".pbmit-element-portfolio-style-2 .pbmit-portfolio-style-2").on("click", function() {
			var main_row = jQuery(this).closest('.pbmit-element-portfolio-style-2');
			jQuery('.pbmit-portfolio-style-2', main_row).removeClass('pbmit-active');
			jQuery(this).addClass('pbmit-active');
		});
	};

	/*---- Title Animation ----*/
	function pbmit_title_animation() {
		ScrollTrigger.matchMedia({
			"(min-width: 1025px)": function() {
				var pbmit_var = jQuery('.pbmit-custom-heading, .pbmit-heading-subheading');
				if (!pbmit_var.length) {
					return;
				}
				const quotes = document.querySelectorAll(".pbmit-custom-heading .pbmit-title , .pbmit-heading-subheading .pbmit-title");
				quotes.forEach(quote => {
					var getclass = quote.closest('.pbmit-custom-heading ,.pbmit-heading-subheading').className;
					var animation = getclass.split('animation-');
					if (animation[1] == "style1") return
					//Reset if needed
					if (quote.animation) {
						quote.animation.progress(1).kill();
						quote.split.revert();
					}
					quote.split = new SplitText(quote, {
						type: "lines,words",
						linesClass: "split-line"
					});
					gsap.set(quote, { perspective: 400 });
					if (animation[1] == "style2") {
						gsap.set(quote.split.words, {
							opacity: 0,
							y: "90%",
							rotateX: "-40deg"
						});
					}
					if (animation[1] == "style3") {
						gsap.set(quote.split.words, {
							opacity: 0,
							x: "50"
						});
					}
					if (animation[1] == "style4") {
						gsap.set(quote.split.words, {
							opacity: 0,
						});
					}
					quote.animation = gsap.to(quote.split.words, {
						scrollTrigger: {
							trigger: quote,
							start: "top 90%",
						},
						x: "0",
						y: "0",
						rotateX: "0",
						opacity: 1,
						duration: 1,
						ease: Back.easeOut,
						stagger: .02
					});
				});
			},
		});
	}

	/*---- Thia Sticky ----*/
	var pbmit_thia_sticky = function() {
		if(typeof jQuery.fn.theiaStickySidebar == "function"){
			jQuery('.pbmit-sticky-sidebar').theiaStickySidebar({
				additionalMarginTop: 100
			});
			jQuery('.pbmit-sticky-column').theiaStickySidebar({
				additionalMarginTop: 150
			});
		}
	}

	/*---- Tween Effect ----*/
	var pbmit_tween_effect = function() {
	if (jQuery(window).width() < 768) return;
		jQuery(window).on('scroll resize', function () {
			jQuery('.pbmit-tween-effect').each(function () {
			let $el = jQuery(this),
				rect = this.getBoundingClientRect(),
				inView = rect.top < window.innerHeight && rect.bottom > 0;
			if (!inView) return;
			let progress = 1 - (rect.top / window.innerHeight);
			progress = Math.max(0, Math.min(1, progress)); // Clamp 0–1
			const getVal = (attr) => parseFloat($el.data(attr)) || 0;
			let tx = getVal('x-start') + (getVal('x-end') - getVal('x-start')) * progress,
				ty = getVal('y-start') + (getVal('y-end') - getVal('y-start')) * progress,
				scale = getVal('scale-x-start') + (getVal('scale-x-end') - getVal('scale-x-start')) * progress,
				skewX = getVal('skew-x-start') + (getVal('skew-x-end') - getVal('skew-x-start')) * progress,
				skewY = getVal('skew-y-start') + (getVal('skew-y-end') - getVal('skew-y-start')) * progress,
				rotate = getVal('rotate-x-start') + (getVal('rotate-x-end') - getVal('rotate-x-start')) * progress;
			$el.css('transform', `translate(${tx}%, ${ty}%) scale(${scale}) skew(${skewX}deg, ${skewY}deg) rotate(${rotate}deg)`);
			});
		}).trigger('scroll');
	}

	/*---- Sortable ----*/
	var pbmit_sorting = function() {
		jQuery('.pbmit-sortable-yes:not(.pbmit-ajax-sortable-yes)').each(function() {
			var boxes = jQuery('.pbmit-element-posts-wrapper', this);
			var links = jQuery('.pbmit-sortable-list a', this);
			boxes.isotope({
				animationEngine: 'best-available',
				layoutMode: 'masonry',
				masonry: {
					horizontalOrder: true
				}
			});
			if( jQuery('body').hasClass('rtl') ){
				boxes.isotope({
					isOriginLeft: false,
					originLeft: false,
				});
			}
			links.on('click', function(e) {
				var selector = jQuery(this).data('sortby');
				if (selector != '*') {
					var selector = '.' + selector;
				}
				boxes.isotope({
					animationEngineString : 'best-available',
					filter: selector,
					itemSelector: '.pbmit-ele',
					layoutMode: 'masonry',
					masonry: {
						horizontalOrder: true
					}
				});
				if( jQuery('body').hasClass('rtl') ){
					boxes.isotope({
						isOriginLeft: false,
						originLeft: false,
					});
				}
				links.removeClass('pbmit-selected');
				jQuery(this).addClass('pbmit-selected');
				e.preventDefault();
			});
		});
	}

	/*---- Search Btn ----*/
	var pbmit_search_btn = function() {
		jQuery(function() {
			var search_form = jQuery(".pbmit-header-search-form");
			var search_field = jQuery('.pbmit-header-search-form .search-field');
			var $body = jQuery('body');
			jQuery(".pbmit-header-search-btn").on('click', function(e) {
				if (!search_form.hasClass('active')) {
					search_form.addClass('active');
					setTimeout(function() { search_field.get(0).focus(); }, 500);
				} else if (search_field.val() === '') {
					search_form.removeClass('active');
					search_field.get(0).focus();
				}
				e.preventDefault();
				return false;
			});
			jQuery(".pbmit-header-search-form .pbmit-search-overlay, .pbmit-header-search-form .pbmit-search-close").on('click', function (e) {
				$body.addClass('pbmit-search-animation-out');
				setTimeout(function () {
					$body.removeClass('pbmit-search-animation-out');
				}, 800);
				setTimeout(function () {
					search_form.removeClass('active');
				}, 800);
				e.preventDefault();
				return false;
			});
		});
	}

	/* ====================================== */
	/* Add Animation
	/* ====================================== */
	function add_animation(threshold = 0.2) {
		const reveals = document.querySelectorAll(".animation");

		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("loaded");

				// STOP observing → animation will NOT repeat
				observer.unobserve(entry.target);
			}
			});
		}, { threshold });

		reveals.forEach(el => observer.observe(el));
	}

	/* ====================================== */
	/* Testimonial Vertical
	/* ====================================== */
	function pbmit_testimonial_vertical() {
		jQuery(".pbmit-element-testimonial-style-3").each(function() {
			if (typeof Swiper !== 'undefined') {
				var pbmit_thumb = new Swiper(".pbmit-testimonial-thumbs", { 
					direction: "horizontal",
					spaceBetween: 10,
					slidesPerView: 4,
					freeMode: false,
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					watchOverflow: true,
					breakpoints: {
						0: { slidesPerView: 1, direction: "horizontal" },
						768: { slidesPerView: 2, direction: "horizontal" },
						1200: { slidesPerView: 2, direction: "horizontal" },
						1366: { slidesPerView: 3, direction: "horizontal" },
						1367: { slidesPerView: 4, direction: "vertical" }
					}
				});
				var pbmit_blockquote = new Swiper(".pbmit-testimonial-quote", {
					direction: "horizontal",
					spaceBetween: 10,
					thumbs: {
						swiper: pbmit_thumb
					},
				});
				pbmit_blockquote.on('slideChangeTransitionStart', function() {
					pbmit_thumb.slideTo(pbmit_blockquote.activeIndex);
				});
				pbmit_thumb.on('transitionStart', function() {
					pbmit_blockquote.slideTo(pbmit_thumb.activeIndex);
				});
			}
		});
	}

	/* ====================================== */
	/* Tabs
	/* ====================================== */
	var pbmit_tabs = function() {
		var tab_number = '';
		jQuery('.pbmit-tab-link').on('click', function(){
			if( !jQuery(this).hasClass('pbmit-tab-li-active') ){
				var wrapper = jQuery(this).closest('.pbmit-tabs');
				var parent = jQuery(this).closest('ul.pbmit-tabs-links');
				jQuery('li', parent).each(function(){
					jQuery(this).removeClass('pbmit-tab-li-active')
				});
				jQuery(this).addClass('pbmit-tab-li-active');
				tab_number = jQuery(this).data('pbmit-tab');
				wrapper.find('.pbmit-tab-content').removeClass('pbmit-tab-active');
				wrapper.find('.pbmit-tab-content-'+tab_number).addClass('pbmit-tab-active');
			}
		});
		var this_title = '';
		jQuery('.pbmit-tab-content-title').on('click', function(){
			this_title = jQuery(this);
			tab_number = jQuery(this).data('pbmit-tab');
			var wrapper = jQuery(this).closest('.pbmit-tabs');
			wrapper.find('li.pbmit-tab-link[data-pbmit-tab="'+tab_number+'"]').trigger('click');
			var animateTo = jQuery(this_title).offset().top - 10;
			if (jQuery('#wpadminbar').length > 0) {
				animateTo = animateTo - jQuery('#wpadminbar').height();
			}
			jQuery('html, body').animate({
				scrollTop: animateTo
			}, 500);
		});
	};

	/* ====================================== */
	/* Service Active Hover
	/* ====================================== */
	var pbmit_service_active_hover = function () {
		var pbmit_var = jQuery('.pbmit-element-service-style-2');
		if (!pbmit_var.length) return;
		pbmit_var.each(function () {
			var pbmit_Class = ' .pbmit-service-style-2';
			var $items = jQuery(this).find(pbmit_Class);
			// Set second item active initially
			$items.removeClass('pbmit-active');
			$items.eq(1).addClass('pbmit-active');
			// Mouse over: activate hovered item
			$items.on('mouseover', function () {
				$items.removeClass('pbmit-active');
				jQuery(this).addClass('pbmit-active');
			});
			// Mouse leave: revert to second item
			jQuery(this).on('mouseleave', function () {
				$items.removeClass('pbmit-active');
				$items.eq(1).addClass('pbmit-active');
			});
		});
	};

	/* ====================================== */
	/* Testimonial Horizontal
	/* ====================================== */
	function pbmit_testimonial_horizontal() {
		jQuery(".pbmit-element-testimonial-style-2").each(function() {
			if (typeof Swiper !== 'undefined') {
				var pbmit_thumb = new Swiper(".pbmit-testimonial-thumbs", {
					slidesPerView: 4,
					freeMode: false,
					spaceBetween: 30,
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					watchOverflow: true,
					breakpoints: {
						0: {
							slidesPerView: 1,
						},
						650: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 2,
						},
						1024: {
							slidesPerView: 3,
						},
						1200: {
							slidesPerView: 4,
						}
					}
				});
				var pbmit_blockquote = new Swiper(".pbmit-testimonial-quote", {
					direction: "horizontal",
					spaceBetween: 10,
					thumbs: {
						swiper: pbmit_thumb
					},
				});
				pbmit_blockquote.on('slideChangeTransitionStart', function() {
					pbmit_thumb.slideTo(pbmit_blockquote.activeIndex);
				});
				pbmit_thumb.on('transitionStart', function() {
					pbmit_blockquote.slideTo(pbmit_thumb.activeIndex);
				});
			}
		});
		jQuery(".pbmit-element-testimonial-style-5").each(function() {
			if (typeof Swiper !== 'undefined') {
				var pbmit_thumb = new Swiper(".pbmit-testimonial-thumbs", {
					slidesPerView: 3,
					freeMode: false,
					spaceBetween: 20,
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					watchOverflow: true,
					breakpoints: {
						0: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 2,
						},
						1024: {
							slidesPerView: 2,
						},
						1200: {
							slidesPerView: 3,
						}
					}
				});
				var pbmit_blockquote = new Swiper(".pbmit-testimonial-quote", {
					direction: "horizontal",
					spaceBetween: 10,
					thumbs: {
						swiper: pbmit_thumb
					},
				});
				pbmit_blockquote.on('slideChangeTransitionStart', function() {
					pbmit_thumb.slideTo(pbmit_blockquote.activeIndex);
				});
				pbmit_thumb.on('transitionStart', function() {
					pbmit_blockquote.slideTo(pbmit_thumb.activeIndex);
				});
			}
		});
	}

	function pbmit_testimonial_animation() {
		ScrollTrigger.matchMedia({
			"(min-width: 768px)": () => {
		
			var areas = gsap.utils.toArray(".pbmit-testimonial-style-4");
			var itemsToAnimate = areas.slice(1).reverse();
		
			itemsToAnimate.forEach(function (pbmi_item, index) {
				gsap.set(pbmi_item, {
					rotate: -(index * 2) - 2,
					yPercent: 0,
					willChange: "transform"
				});
			});
		
			var pbmit_card = gsap.timeline({
				scrollTrigger: {
					ease: "none",
					trigger: '.pbmit-testimonial-sticky',
					pin: true,
					start: "top 120px",
					end: "+=" + (itemsToAnimate.length * 300),
					scrub: 1.5,
					pinSpacing: true,
					invalidateOnRefresh: true
				}
			});
		
			itemsToAnimate.forEach(function (pbmi_item, index) {
				pbmit_card.to(pbmi_item, {
				yPercent: -200,
				rotate: 0,
				ease: "power1.inOut"
				}, index * 0.3 );
			});		
			}
		});
	}

	/* Static Box Slider */
	var pbmit_staticbox_hover_slide = function () {
		if (typeof Swiper !== 'undefined') {
			// Check if elements exist before initializing Swiper
			if (document.querySelector(".pbmit-element-static-box-style-1 .pbmit-static-image")) {
				var pbmit_hover1 = new Swiper(".pbmit-element-static-box-style-1 .pbmit-static-image", {
					speed: 6000,
					grabCursor: true,
					effect: "creative",
					creativeEffect: {
						prev: {
							translate: [0, "-100%", 0],
						},
						next: {
							translate: [0, "100%", 0],
						},
					},
				});
			}
			if (document.querySelector(".pbmit-element-static-box-style-1 .pbmit-short-description")) {
				var pbmit_hover2 = new Swiper(".pbmit-element-static-box-style-1 .pbmit-short-description", {
					speed: 6000,
					grabCursor: true,
					effect: "creative",
					creativeEffect: {
						prev: {
							translate: [0, "-100%", 0],
						},
						next: {
							translate: [0, "100%", 0],
						},
					},
				});
			}
			if (document.querySelector(".pbmit-element-portfolio-style-2 .pbmit-static-image")) {
				var pbmit_hover3 = new Swiper(".pbmit-element-portfolio-style-2 .pbmit-static-image", {
					speed: 6000,
					effect: "fade",
				});
			}
			if (document.querySelector(".pbmit-element-static-box-style-3 .pbmit-static-image, .pbmit-element-static-box-style-4 .pbmit-static-image")) {
				var pbmit_hover4 = new Swiper(".pbmit-element-static-box-style-3 .pbmit-static-image, .pbmit-element-static-box-style-4 .pbmit-static-image", {
					direction: "horizontal",
					autoplay: false,
					loop: false,
					allowTouchMove: false,
					simulateTouch: false,
					touchRatio: 0,
				});
			}
			if (document.querySelector(".pbmit-element-static-box-style-4 .pbmit-static-content")) {
				var pbmit_hover5 = new Swiper(".pbmit-element-static-box-style-4 .pbmit-static-content", {
					direction: "horizontal",
					autoplay: false,
					loop: false,
					allowTouchMove: false,
					simulateTouch: false,
					touchRatio: 0,
				});
			}
			// Only bind mouseenter if Swipers are initialized
			jQuery('.pbmit-element-static-box-style-1 .pbmit-hover-inner li, .pbmit-element-portfolio-style-2 .pbmit-hover-inner li, .pbmit-element-static-box-style-3 .pbmit-hover-inner li, .pbmit-element-static-box-style-4 .pbmit-hover-inner li').on('mouseenter', function () {
				var myIndex = jQuery(this).index();
				if (pbmit_hover1) pbmit_hover1.slideTo(myIndex, 500);
				if (pbmit_hover2) pbmit_hover2.slideTo(myIndex, 500);
				if (pbmit_hover3) pbmit_hover3.slideTo(myIndex, 500);
				if (pbmit_hover4) pbmit_hover4.slideTo(myIndex, 500);
				if (pbmit_hover5) pbmit_hover5.slideTo(myIndex, 500);
			});
		}
	};

	/* Portfolio Style */
	var pbmit_portfolio_style = function() {
		jQuery(".pbmit-element-portfolio-style-2, .pbmit-element-portfolio-style-4").each(function () {
			var $wrapper = jQuery(this);
			var $items = $wrapper.find(".pbmit-portfolio-style-2, .pbmit-portfolio-style-4");

			// Activate first item inside each wrapper
			$items.removeClass('pbmit-active');
			$items.eq(0).addClass('pbmit-active');

			// Click event
			$items.on("click", function () {
				$items.removeClass('pbmit-active');
				jQuery(this).addClass('pbmit-active');
			});

		});
	};

	/* Pricingtable Switcher */
	var pbmit_pricingtable_switcher = function () {
		var flt_monthly = document.getElementById("filt-monthly"),
			flt_yearly = document.getElementById("filt-yearly"),
			toggle_switch = document.getElementById("switcher"),
			// Select any element whose ID starts with "monthly" or "yearly"
			content_monthly = document.querySelectorAll('[id^="monthly"]'),
			content_yearly = document.querySelectorAll('[id^="yearly"]');

		if (!flt_monthly || !flt_yearly || !toggle_switch) return;

		function showMonthly() {
			toggle_switch.checked = false;
			flt_monthly.classList.add("toggler-active");
			flt_yearly.classList.remove("toggler-active");

			content_monthly.forEach(el => el.classList.remove("hide"));
			content_yearly.forEach(el => el.classList.add("hide"));
		}

		function showYearly() {
			toggle_switch.checked = true;
			flt_yearly.classList.add("toggler-active");
			flt_monthly.classList.remove("toggler-active");

			content_monthly.forEach(el => el.classList.add("hide"));
			content_yearly.forEach(el => el.classList.remove("hide"));
		}

		// Click listeners
		flt_monthly.addEventListener("click", showMonthly);
		flt_yearly.addEventListener("click", showYearly);

		toggle_switch.addEventListener("change", function () {
			if (toggle_switch.checked) showYearly();
			else showMonthly();
		});

		// Default state
		showMonthly();
	};

	ScrollTrigger.matchMedia({
		"(max-width: 1200px)": function() {
			ScrollTrigger.getAll().forEach(t => t.kill());
		}
	});

	// on load
	jQuery(window).on('load', function(){
		pbmit_sticky_header();
		pbmit_sticky_header_class();
		pbmit_toggleSidebar();
		pbmit_navbar();
		pbmit_active_hover();
		pbmit_portfolio_style2();
		pbmit_thia_sticky();
		pbmit_title_animation();
		pbmit_tween_effect();
		pbmit_sorting();
		pbmit_search_btn();
		add_animation();
		pbmit_testimonial_vertical();
		pbmit_tabs();
		pbmit_service_active_hover();
		pbmit_testimonial_horizontal();
		pbmit_testimonial_animation();
		pbmit_staticbox_hover_slide();
		pbmit_portfolio_style();
		pbmit_pricingtable_switcher();
		gsap.delayedCall(1, () =>
			ScrollTrigger.getAll().forEach((t) => {
				t.refresh();
			})
		);
	});
})($);