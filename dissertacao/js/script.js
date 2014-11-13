/* Author: Pedro Pontes
   modified: 24-09-2012
*/
$(window).load(function() {
	var items = [];
  items.push("All");

	$.each($('.language'), function(index, value) {
    var text = ($(this).text()).replace(/ /g,'');
    text = text.replace('.','');
    text = text.replace(/\+/g,'plus');
		items.push($(this).text());
    ($(this).parents(".box")).addClass(text);
    $(this).addClass("selector");
    $(this).attr("data-filter", "." + text);
	});

	items.sort();

	var last;
	$.each(items, function(index, value){
    var text = (value).replace(/ /g,'');
    text = text.replace('.','');
    text = text.replace(/\+/g,'plus');

    if(index === 0){
      $(".filters").append('<a href="#" class="selector" data-filter="*">'+ value + ' </a>');
    }else{
      if(value != last)
      $(".filters").append('<a href="#" class="selector" data-filter=".' + text +'">'+ value + ' </a>');
    }
		last = value;
	});

  $('.container').isotope({
    // options
    itemSelector : '.box',
    layoutMode : 'masonry'
  });

  $('.selector').click(function(){
    var selector = $(this).attr('data-filter');
    $('.container').isotope({ filter: selector });
    return false;
  });

  $('.container').height($(window).height());
});

/* -----------------------------
          Navigation Control
    ----------------------------*/
$('#about').click(function() {
  $("#aboutpage").slideDown('slow');
  
});
$('#aboutback').click(function() {
  $("#mainpage").css('display', 'block');
  $("#aboutpage").slideUp('slow');
});

$('#contacts').click(function() {
  $("#contactspage").css('display', 'block');
  $("#mainpage").slideUp('slow');
});
$('#contactsback').click(function() {
 $("#mainpage").slideDown('slow');
});

$("#projects").click( function(){
  $('.container').isotope('reLayout');
	$(".on-top").fadeOut(1000);
	$("#menu").show(1000);
});

$("#logo").click( function(){
	$("#menu").hide(1000);
  $(".on-top").fadeIn(1000);
});

/* -----------------------------
          Divs animations
    ----------------------------*/

$(".aboutlink").click( function(){
  var divId = $(this).attr("id");
  divId += "-content";
  $("#pictureme").fadeOut();
  $("#"+divId).fadeIn();
});

$(".indexmenu").hoverIntent(
  function(){
    if($(this).attr("id")== "about"){
      console.log($("#nameabout").text);
      $("#name").replaceWith('<h2>New heading</h2>');
    }
  },
  function(){
    
  }
);

$(".slide").hoverIntent(
  function(){
    var current = $(".indextitle:visible").attr("id");
    if(current !== "name"){
      $("#" + current).fadeOut(700, function(){
        $("#name").fadeIn(1500);
        last = "";
      });
    }
  },
   function(){}
);

var fatherheight;
var undo = false;
$(".box").hoverIntent(
	function () {
  var childheight = $(this).children('.info').height();
  fatherheight = $(this).height();

  if(fatherheight< childheight){
    $(this).height(childheight);
    $('.container').isotope('reLayout');
    undo = true;
  }

	$(this).children('.info').stop(true, true).show(800);
	$(this).children('img').stop(true, true).fadeTo(800, 0.89);
	},
	function () {
    if(undo){
      var dis = $(this);
      var currentfather = fatherheight;
      $(this).children('.info').hide(500, function(){
        dis.height(currentfather);
        $('.container').isotope('reLayout');
      });
      $(this).children('img').fadeTo(500, 0.5);
      undo = false;
    }else{
      $(this).children('.info').hide(500);
      $(this).children('img').fadeTo(500, 0.5);
    }
	}
);