/**
 *
 * @authors chan.yisen (aihuacyc@gmail.com)
 * @date    2017-01-22 15:25:51
 * @version $Id$
 */

$(function(){
	var $header = $("header"),
		$banner = $("#banner"),
		$w768 = $("#w768"),
		$ic = $("#index-content"),
		$win = $(window);
	var WHG = {
		SetHeader: function(){
			if(!$w768.is(":visible")){
				if($banner.length){
					$header.addClass("fix-btm");
					$win.scroll(function(event) {
						if($(this).scrollTop() > 20){
							$header.removeClass("fix-btm");
						}else{
							$header.addClass("fix-btm");
						}
					});
				}
			}else{
				if($banner.length){
					$header.addClass("no-bg");
					$header.find(".h-left img").attr("src", "/VFHOLDINGSLIMITED.png");
					$win.scroll(function(event) {
						if($(this).scrollTop() >= 100){
							$header.removeClass("no-bg");
							$header.find(".h-left img").attr("src", "/VFHOLDINGSLIMITED.png");
						}else{
							$header.addClass("no-bg");
							$header.find(".h-left img").attr("src", "/VFHOLDINGSLIMITED.png");
						}
					});
				}
			}
			var $navList = $("ul.nav-list"),
				$navLi = $navList.find("li"),
				$hbg = $header.find(".h-bg");
			$navLi.hover(function(){
				var $ah = $(this).find(".sub-nav").actual("height");
				$hbg.height($ah).stop(true,true).slideDown();
				$(this).siblings().find(".sub-nav").stop(true,true).hide();
				$(this).find(".sub-nav").stop(true,true).slideDown();
			}, function(){
				$(this).find(".sub-nav").stop(true,true).hide();
				$hbg.removeAttr("style").stop(true,true).hide();
			});
			$(".lang-wrap").hover(function(){
				var $llh = $(this).find(".lang-list").actual("height");
				$hbg.height($llh).stop(true,true).slideDown();
				$(this).find(".lang-list").stop(true,true).slideDown();
			}, function(){
				$(this).find(".lang-list").stop(true,true).hide();
				$hbg.removeAttr("style").stop(true,true).hide();
			});
			// 	$snw = $header.find(".sub-nav-wrap"),
			// 	$sn = $snw.find(".sub-nav"),
			// 	$hMid = $header.find(".h-mid");
			// $header.mousemove(function(e){
				// if(e.target)
				// console.log($(e.target));
			// 	if(!$(e.target).is(".h-mid, .h-mid *, .sub-nav-wrap, .sub-nav-wrap *")){
			// 		$sn.hide();
			// 		$navLi.find(">a").removeClass("active");
			// 	}
			// });
			// $header.mouseleave(function(){
			// 	$sn.hide();
			// 	$navLi.find(">a").removeClass("active");
			// });
			// $navLi.hover(function(){
			// 	var $index = $(this).index();
			// 	$(this).siblings().find(">a").removeClass("active");
			// 	$(this).find(">a").addClass("active");
			// 	$snw.addClass("active");
			// 	$sn.eq($index).show().siblings().hide();
			// }, function(){});
			// $hMid.hover(function(){}, function(){
			// 	if($snw.hasClass('active')){
			// 		$snw.removeClass("active");
			// 		$sn.hide();
			// 	}
			// });
			// $snw.hover(function(){
			// 	$(this).show();
			// }, function(){
			// 	$(this).hide();
			// });
			// console.log($sn.eq(3).actual("height"));
		},
		SetPhoneNav: function(){
			var $menu = $("#menu"),
				$close = $("#close"),
				$phoneNav = $("#phone-nav"),
				$phoneNavList = $phoneNav.find("ul.phone-nav-list"),
				$phoneNava = $phoneNavList.find(">li").find(">a"),
				$langIcon = $phoneNav.find(".lang-icon");
			$menu.on("click", function(e){
				e.preventDefault();
				if(Modernizr.csstransitions){
					$phoneNav.fadeIn(300).addClass("active");
				}else{
					$phoneNav.fadeIn(300);
					$phoneNav.find(".nav-wrap").animate({left: 0}, 400);
				}
			});
			$close.on("click", function(e){
				e.preventDefault();
				if(Modernizr.csstransitions){
					$phoneNav.removeClass("active").fadeOut(300);
				}else{
					$phoneNav.find(".nav-wrap").animate({left: "-100%"}, 400);
					$phoneNav.fadeOut(300);
				}
			});
			$phoneNava.on("click", function(e){
				if($(this).next().length){
					e.preventDefault();
					if($(this).next().is(":visible")){
						$(this).next().slideUp(500);
					}else{
						$(this).parent("li").siblings().find(".sub-nav").slideUp(300);
						$(this).next().slideDown(500);
					}
				}
			});
			$langIcon.on("click", function(){
				$(this).next().toggle();
			});
		},
		SetBanner: function(){
			var $wh = $win.height(),
				$bannerList = $banner.find("ul.banner-list"),
				$bannerLi = $bannerList.find("li"),
				$bannerLen = $bannerLi.length,
				$bannerInfo = $bannerList.find(".banner-info"),
				$bannerNav = $banner.find("ul.banner-nav"),
				$bannerNavLi = $bannerNav.find("li"),
				$bannerPrev = $banner.find("a.banner-prev"),
				$bannerNext = $banner.find("a.banner-next"),
				index = 0,
				autoShow = null;
			$banner.height($wh);
			$win.resize(function(event) {
				$wh = $win.height();
				$banner.height($wh);
			});
			bannerShow(0);
			$bannerNavLi.hover(function(){
				clearInterval(autoShow);
			}, function(){
				autoShow = setInterval(function(){
					index++;
					if(index > $bannerLen-1){
						index = 0;
					}
					bannerShow(index);
				}, 5000);
			}).eq(0).trigger("mouseleave");
			$bannerNavLi.on("click", function(){
				index = $(this).index();
				bannerShow(index);
			});
			$bannerNext.on("click", function(e){
				e.preventDefault();
				index++;
				if(index > $bannerLen-1){
					index = 0;
				}
				bannerShow(index);
			});
			$banner.on("swipeleft", function(){
				index++;
				if(index > $bannerLen-1){
					index = 0;
				}
				bannerShow(index);
			});
			$bannerPrev.on("click", function(e){
				e.preventDefault();
				index--;
				if(index < 0){
					index = $bannerLen-1;
				}
				bannerShow(index);
			});
			$banner.on("swiperight", function(){
				index--;
				if(index < 0){
					index = $bannerLen-1;
				}
				bannerShow(index);
			});
			// $banner.on("tapstart", function(){
			// 	clearInterval(autoShow);
			// });
			// $banner.on("tapend", function(){
			// 	alert("end");
			// });
			function bannerShow(i){
				$bannerLi.eq(i).fadeIn(800).delay(500).addClass("active").siblings().fadeOut(1200, function(){
					$(this).removeClass("active");
				});
				if(Modernizr.csstransitions){
					console.log("trans");
				}else{
					console.log("no-trans");
				}
				$bannerNavLi.eq(i).addClass("active").siblings().removeClass("active");
			}
		},
		IndexVideo: function(){
			// var $video = $("#i-video"),
			var	v = document.getElementById("i-video"),
				$playBtn = $("#index-content, .ir-about-wrap").find(".play-btn"),
				$btn = $playBtn.find('.btn');
			$btn.on("click", function(){
				$playBtn.fadeOut(300);
				v.play();
			});
		},
		SetSlick: function(){
			var $fBrandList = $("ul.f-brand-list"),
				$fPrev = $("a.f-brand-prev"),
				$fNext = $("a.f-brand-next");
			$fBrandList.slick({
				dots: false,
				infinite: true,
				slidesToShow: 7,
				slidesToScroll: 1,
				autoplay: true,
				autoplaySpeed: 2000,
				prevArrow: $fPrev,
				nextArrow: $fNext,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 4
						}
					},
					{
						breakpoint: 760,
						settings: {
							slidesToShow: 2
						}
					}
				]
			});
			var $indexReportList = $("ul.index-report-list");
			$indexReportList.slick({
				dots: false,
				infinite: false,
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
				responsive: [
					{
						breakpoint: 760,
						settings: {
							dots: true,
							slidesToShow: 1
						}
					}
				]
			});

			var $foodWrap = $(".food-wrap"),
				$foodBox = $foodWrap.find(".food-box"),
				$foodPrev = $foodWrap.find(".food-prev"),
				$foodNext = $foodWrap.find(".food-next");
			$foodBox.slick({
				dots: false,
				infinite: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				prevArrow: $foodPrev,
				nextArrow: $foodNext,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 760,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
		},
		AutoHeight: function(){
			var $aHeight = $ic.find(".a-height");
			$aHeight.matchHeight();
			console.log("autoheight");
			var $fbl = $("ul.f-brand-list"),
				$innerLi = $fbl.find(".inner-li");
			$innerLi.matchHeight();
		},
		ScrollToShow: function(){
			var s1 = $ic.length ? $ic.offset().top : 0,
				$iis = $ic.find(".index-ir-stock"),
				s2 = $ic.length ? $iis.offset().top : 0;
			$(".wow").attr("style", "visibility: hidden;");
			$win.scroll(function(){
				var $st = $(this).scrollTop();
				if($st > s1){
					$(".index-about-content").addClass("animate fadeInUp");
				}
			});
			// var wow = new WOW({
			// 	offset: $win.height()
			// });
			// wow.init();
		},
		SetCal: function(){
			var WapDetail=window.WapDetail||{};
				WapDetail.url_get_data = function () {
					var t = window.document.location.href.toString();
					t = t.replace(/(\#[\w\.]*$)/g, "");
					var e = t.split("?");
					if ("string" == typeof e[1]) {
						e = e[1].split("&");
						var i = {};
						for (var a in e) {
							var n = e[a].split("=");
							i[n[0]] = n[1]
						}
						return i;
					}
					return {}

				}
			var date = new Date();
			var getn = WapDetail.url_get_data();
			var scrollSpeed = 200;
			// var liShowable = 7;
			var liShowable;
			// if($(window).width() > 1024){
			// 	liShowable = 4;
			// }
			// if($(window).width() <= 1024){
			// 	liShowable = 4;
			// }
			// if($(window).width() <= 768){
			// 	liShowable = 4;
			// }
			// if($(window).width() <= 640){
			// 	liShowable = 4;
			// }
			if($(window).width() <= 540){
				liShowable = 2;
			}else{
				liShowable = 4;
			}
			// if($(window).width() <= 480){
			// 	liShowable = 2;
			// }
			// if($(window).width() <= 400){
			// 	liShowable = 2;
			// }
			var $mswidth = $(".month-scroll").width();

			var offset = 0;
			var yrTabs = $('.month-wrap');
			var container = yrTabs.find('.month-scroll');

			var ul = container.children('ul');
			var lis = ul.children('li');
			// var liWidth = lis.eq(0).outerWidth(true);
			var liWidth = $mswidth / liShowable;
			lis.width(liWidth); // 新增

			var maxOffset = lis.length - liShowable;
			var moving = false;
			var width = lis.length * liWidth ;//+ lis.length - 1;
			var lilen = lis.length;
			ul.css('width', width + 500);
			console.log("t or f:" + (getn.month == undefined));
			getn.month = getn.month == undefined ? (date.getMonth()+1):getn.month;
			if (lilen > liShowable) {
			    lis.each(function(i) {
			    	// console.log($(this).text());
			    	// console.log(getn.year);
			    	console.log("month:"+getn.month);
			    	// console.log($(this).attr("data-month"));
			        if ($(this).attr("data-month") == getn.month) {
			            offset = (i >= liShowable - 1 && (lis.length - i) <= (liShowable - 1)) ? lis.length - liShowable : i;
			            				//4				  12					4						8
			            // Move to current year
			            //ul.css('margin-left', -(liWidth + 1) * offset);
						console.log("offset:"+offset);
			            ul.css('margin-left', -liWidth * offset);
			        }
			    });

			    yrTabs.find('.prev-month').click(function() {
			        if (moving || offset === 0) {
			            return false;
			        }
			        var m = ul.css('margin-left').replace('px', '');
			        if (offset-- > 0) {
			            moving = true;

			            ul.animate({
			                marginLeft: parseInt(m) + liWidth + 1
			            }, scrollSpeed, function() {
			                moving = false;
			            });
			        }
			        if (offset < 0) {
			            offset = 0;
			        }
			        return false;
			    });

			    yrTabs.find('.next-month').click(function() {
			        if (moving || lis.length <= liShowable || offset == lis.length - liShowable) {
			            return false;
			        }
			        var m = ul.css('margin-left').replace('px', '');
			        if (offset++ < maxOffset) {
			            moving = true;
			            ul.animate({
			                marginLeft: parseInt(m) - liWidth - 1
			            }, scrollSpeed, function() {
			                moving = false;
			            });
			        }
			        if (offset > maxOffset) {
			            offset = maxOffset;
			        }
			        return false;
			    });
			}
		},
		SetLogo: function(){
			var $logoList = $("ul.logo-list"),
				$logoLi = $logoList.find("li"),
				$dropDown = $logoLi.find(".drop-down"),
				$dropSpan = $dropDown.find("span"),
				$dropBox = $dropDown.find(".drop-box"),
				$dropDl = $dropBox.find("dl"),
				$dropDd = $dropDl.find("dd"),
				$dropa = $dropDd.find("a");
			var DFormat = "下載格式";
			if($("#ver-sc").length){
				DFormat = "下载格式";
			}else if($("#ver-en").length){
				DFormat = "Download Formats";
			}
			console.log(DFormat);
			$dropSpan.on("click", function(){
				$(this).parents("li").siblings().find($dropSpan).removeClass("active").text(DFormat);
				$(this).parents("li").siblings().find($dropBox).hide();
				$(this).toggleClass("active").next().toggle();
			});
			$dropa.on("click", function(e){
				var atxt = $(this).text();
				$(this).parents(".drop-box").prev().text(atxt);
			});
			$("body").on("click", function(e){
				if(!$(e.target).is(".drop-down, .drop-down *")){
					$dropBox.hide();
				}
			});
		},
		SetTabs: function(){
			var $tabNav = $(".tab-nav"),
				$tabList = $tabNav.find(".tab-list");
			$tabList.idTabs();
		},
		SetBp: function(){
			var $europe = $("ul.bp-europe-list"),
				$europeLi = $europe.find(">li"),
				$ea = $europeLi.find(">a");
			$ea.on("click", function(e){
				e.preventDefault();
			});
			if(Modernizr.touch){
				$ea.on("click", function(){
					if($(this).next().is(":visible")){
						$(this).next().hide();
					}else{
						$(this).next().show().parent().siblings().find(".bp-info").hide();
					}
				});
			}

			var $bpBox = $(".bp-box"),
				$bpWorld = $bpBox.find(".bp-world"),
				$wa = $bpWorld.find("a"),
				$cBox = $bpBox.find(".country-box"),
				$ipop = $cBox.find(".i-pop"),
				$ispan = $ipop.find(">span"),
				$iclose = $ipop.find(".i-close"),
				$return = $cBox.find(".return");
			$wa.on("click", function(e){
				var $id = $(this).attr("href");
				$($id).fadeIn().siblings(".country-box").fadeOut();
				return false;
			});
			$return.on("click", function(e){
				$(this).parents(".country-box").fadeOut();
				return false;
			});
			$ispan.on("click", function(){
				$(this).addClass("active").parents(".i-pop").siblings().find(">span").removeClass("active");
				$(this).parents(".i-pop").siblings().find(".i-info").removeClass("active").hide();
				$(this).next().addClass("active").show();
			});
			$iclose.on("click", function(){
				$(this).parents(".i-pop").find(">span").removeClass("active");
				$(this).parents(".i-pop").find(".i-info").removeClass("active").hide();
			});
		}
	}

	
	var $yearTab = $(".year-tab"),
		tabWidth = $yearTab.width(),
		$yearPrev = $yearTab.find(".year-prev"),
		$yearNext = $yearTab.find(".year-next");
	var $yearTabList = $("ul.year-tab-list"),
		$yearLi = $yearTabList.find("li"),
		yearNum = $yearLi.length,
		w = 60,
		i = 0;
	var totalWidth = yearNum * w,
		liShow = Math.floor(tabWidth / w);
	$yearTabList.width(totalWidth);
	if($yearLi.eq(0).hasClass("active")){
		$yearPrev.addClass("disable");
	}
	if(totalWidth <= tabWidth){
		$yearPrev.addClass("disable");
		$yearNext.addClass("disable");
	}
	$yearLi.find("a").on("click", function(e){
		e.preventDefault();
		var $yid = $($(this).attr("href"));
		$(this).parent().addClass("active").siblings().removeClass("active");
		$yid.fadeIn(2000).siblings().hide();
	});
	$yearPrev.on("click", function(){
		i--;
		if($(this).hasClass("disable")){
			return false;
		}else{
			if(i <= 0){
				$(this).addClass("disable");
			}
			if(i<0){
				i = 0;
				//$yearTabList.animate({marginLeft: 0});
			}else{
				$yearTabList.animate({marginLeft: "-" + i * w + "px"});
				$yearNext.removeClass("disable");
			}
		}
	});
	$yearNext.on("click", function(){
		i++;
		if($(this).hasClass("disable")){
			return false;
		}else{
			if(i >= (yearNum - liShow)){
				$(this).addClass("disable");
			}
			if(i > (yearNum - liShow)){
				i = yearNum - liShow;
				return false;
			}else{
				$yearTabList.animate({marginLeft: "-" + i * w + "px"});
				$yearPrev.removeClass("disable");
			}
		}
	});

	var $avl = $("ul.about-vision-list"),
		$avli = $avl.find(">li"),
		$avh3 = $avli.find("h3");
	$avh3.on("click", function(){
		if($(this).next().is(":visible")){
			$(this).next().slideUp();
		}else{
			$(this).next().slideDown();
		}
	});

	var $imgTxtList = $("ul.img-txt-list"),
		$imgTxtLi = $imgTxtList.find("li");
	$imgTxtLi.hover(function(){
		$(this).find(".txt-wrap").fadeIn();
	}, function(){
		$(this).find(".txt-wrap").fadeOut();
	});

	// set parallax
	var $s = $("#scene");
	var scene = document.getElementById('scene');
	if($s.length > 0){
		var parallaxInstance = new Parallax(scene);
	}
	// set global map
	var $a1 = $(".bus-menu-wrap .menu-item > a"),
		$a2 = $(".map-1-box").find(".a"),
		$bmore = $(".bus-menu-box").find(".more"),
		$mdmore = $(".md-more"),
		$mwrap = $(".map-wrap");
	var $h = 0;
	$(".map-wrap > div").each(function(){
		$h = $h < $(this).outerHeight(true) ? $(this).outerHeight(true) : $h;
		// console.log($h);
	});
	// console.log($h);
	$a1.click(function(e){
		e.preventDefault();
		var $aid = $(this).attr("href");
		var $aindex = $(this).parent().index();
		// console.log($aindex);
		if($aindex == 1){
			$(this).parents(".bus-menu-box").removeClass("d1 d2 d3").addClass("d0");
		}else if($aindex == 2){
			$(this).parents(".bus-menu-box").removeClass("d0 d2 d3").addClass("d1");
		}else if($aindex == 3){
			$(this).parents(".bus-menu-box").removeClass("d1 d0 d3").addClass("d2");
		}else{
			$(this).parents(".bus-menu-box").removeClass("d1 d2 d0").addClass("d3");
		}
		$(this).parent().addClass("active").siblings().removeClass("active");
		$mdmore.find(".more").eq($aindex-1).addClass("active").siblings().removeClass("active");
		$($aid).removeClass("posa").addClass("posr").siblings().removeClass("posr").addClass("posa");
		$($aid).stop().fadeIn(300).siblings().stop().fadeOut(500);
	});
	$a2.click(function(e){
		e.preventDefault();
		var $i = $(this).attr("data-index");
		var $a2id = $(this).attr("href");
		if($i == 0){
			$(".bus-menu-box").removeClass("d1 d2 d3").addClass("d0");
		}else if($i == 1){
			$(".bus-menu-box").removeClass("d0 d2 d3").addClass("d1");
		}else if($i == 2){
			$(".bus-menu-box").removeClass("d1 d0 d3").addClass("d2");
		}else{
			$(".bus-menu-box").removeClass("d1 d2 d0").addClass("d3");
		}
		$bmore.parent().eq($i).addClass("active").siblings().removeClass("active");
		$mdmore.find(".more").eq($i).addClass("active").siblings().removeClass("active");
		$($a2id).removeClass("posa").addClass("posr").siblings().removeClass("posr").addClass("posa");
		$($a2id).stop().fadeIn(300).siblings().stop().fadeOut(500);
	});
	$mwrap.find(".a1").hover(function(){
		$(".map-china").addClass("active");
		// $(".map-china").fadeIn();
		// $(".map-eu, .map-us").fadeOut();
	}, function(){
		$(".map-china").removeClass("active");
	});
	$mwrap.find(".a2").hover(function(){
		$(".map-eu").addClass("active");
		// $(".map-eu").fadeIn();
		// $(".map-china, .map-us").fadeOut();
	}, function(){
		$(".map-eu").removeClass("active");
	});
	$mwrap.find(".a3").hover(function(){
		$(".map-us").addClass("active");
		// $(".map-us").fadeIn();
		// $(".map-china, .map-eu").fadeOut();
	}, function(){
		$(".map-us").removeClass("active");
	});
	$(".tab-box-china li a").click(function(e){
		e.preventDefault();
	});
	// set pig
	var $pigWrap = $("#pig-wrap"),
		$cls = $pigWrap.find(".cls-1"),
		$line = $pigWrap.find(".line"),
		$meatBox = $pigWrap.find(".meat-box"),
		$mLeft = $meatBox.find(".meat-box-left"),
		$mRight = $meatBox.find(".meat-box-right");
	if($("html").hasClass("no-touch")){
		console.log("no touch");
		$cls.hover(function(){
			var $lineId = $(this).attr("data-line"),
				$pgcId = $(this).attr("data-id");
				// console.log($lineId +","+ $pgcId);
			$mLeft.css({
				"left": "50%",
				"opacity": 0
			});
			$mRight.css({
				"right": "50%",
				"opacity": 0
			});
			if($meatBox.parent().hasClass("hide")){
				$meatBox.parent().removeClass("hide").addClass("show");
			}

			$(this).addClass("active").siblings(".cls-1").removeClass("active");
			// $("#"+$lineId).fadeIn().siblings(".line").fadeOut();
			$("#"+$lineId).addClass("active").siblings(".line").removeClass("active");

			$(".meat-box-item").removeAttr("style");
			$("#"+$pgcId).addClass("active").siblings(".meat-box-item").removeClass("active");
			$mLeft.stop().animate({
				"left": 0,
				"opacity": 1
			}, 800, function(){});
			$mRight.stop().animate({
				"right": 0,
				"opacity": 1
			}, 800, function(){
				$("#"+$pgcId).stop().animate({"opacity": 1}, 600, function(){});
			});
			// $meatBox.width(0);
			// $("#"+$pgcId).addClass("active").fadeIn().siblings(".meat-box-item").hide();
			// $meatBox.animate({
			// 	"width": "90%"
			// }, 2000, function(){
			// 	$("#"+$pgcId).fadeIn();
			// });
		},function(){});
	}else{
		console.log("touch");
		$cls.click(function(){
			var $lineId = $(this).attr("data-line"),
				$pgcId = $(this).attr("data-id");
				// console.log($lineId +","+ $pgcId);
			$mLeft.css({
				"left": "50%",
				"opacity": 0
			});
			$mRight.css({
				"right": "50%",
				"opacity": 0
			});
			if($meatBox.parent().hasClass("hide")){
				$meatBox.parent().removeClass("hide").addClass("show");
			}

			$(this).addClass("active").siblings(".cls-1").removeClass("active");
			// $("#"+$lineId).fadeIn().siblings(".line").fadeOut();
			$("#"+$lineId).addClass("active").siblings(".line").removeClass("active");

			$(".meat-box-item").removeAttr("style");
			$("#"+$pgcId).addClass("active").siblings(".meat-box-item").removeClass("active");
			$mLeft.stop().animate({
				"left": 0,
				"opacity": 1
			}, 800, function(){});
			$mRight.stop().animate({
				"right": 0,
				"opacity": 1
			}, 800, function(){
				$("#"+$pgcId).stop().animate({"opacity": 1}, 600, function(){});
			});
			// $meatBox.width(0);
			// $("#"+$pgcId).addClass("active").fadeIn().siblings(".meat-box-item").hide();
			// $meatBox.animate({
			// 	"width": "90%"
			// }, 2000, function(){
			// 	$("#"+$pgcId).fadeIn();
			// });
		});
	}
	// $cls.hover(function(){}, function(){});
	$("#pig-wrap").click(function(e){
		var $tar = $(e.target).parent();
		// console.log(e.target);
		if(!($tar.is(".cls-1"))){
			// console.log(e.target);
			$cls.removeClass("active");
			$line.removeClass("active");
			$(this).find(".meat-class").removeClass("show").addClass("hide");
		}
	});
	// $("#pg6").trigger("click");
	// document ready
	WHG.SetHeader();
	WHG.SetPhoneNav();
	WHG.SetBanner();
	WHG.SetSlick();
	WHG.AutoHeight();
	WHG.IndexVideo();
	WHG.SetLogo();
	WHG.SetCal();
	WHG.SetTabs();
	WHG.SetBp();
	// WHG.ScrollToShow();
	//免责声明
	var $disc = $("#disc");
	$disc.click(function(){
		window.open('include/disclaimer.php','disclaimer','status=yes,scrollbars=no,width=550,height=500');
	});
});