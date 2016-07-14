$( document ).ready(function(){
  var $contactForm = $('#contact-form');
  var sliderHeight = 100;
  if (window.matchMedia('(max-device-width: 600px)').matches) {
    sliderHeight = 120;
  }
  $(".button-collapse").sideNav();
  $('.modal-trigger').leanModal();
  $('.slider').slider({
    indicators: false,
    height: sliderHeight
  });
  $('.materialboxed').materialbox();
  $('select').material_select();
  $('.datepicker').pickadate({
    format: 'mm/dd/yy'
  });

  if (!detectIE()) {
    $('body').addClass('sticky-body');
    $('main').addClass('sticky-main');
  }

  // $contactForm.submit(function(e) {
  //   e.preventDefault();
  //   $.ajax({
  // 		url: '//formspree.io/info@robotxspace.com',
  // 		method: 'POST',
  // 		data: $(this).serialize(),
  // 		dataType: 'json',
  // 		beforeSend: function() {
  // 			Materialize.toast('Sending Message...', 1000);
  // 		},
  // 		success: function(data) {
  // 			Materialize.toast('Success! Your message was sent.', 5000, 'green white-text');
  //       $(':input','#contact-form')
  //         .not(':button, :submit, :reset, :hidden')
  //         .val('');
  //       $('#message').trigger('autoresize');
  //       $('#contact').closeModal();
  // 		},
  // 		error: function(err) {
  // 			Materialize.toast('There was an error sending your message. Please try again in a few minutes.', 5000, 'red white-text');
  // 		}
  // 	});
  // });
  jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');
      // Add replaced image's ID to the new SVG
      if(typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if(typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
      }
      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');
      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
      }
      // Replace image with new SVG
      $img.replaceWith($svg);
    }, 'xml');
  });

  $('.top-btn a').click(function(e) {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    e.preventDefault();
  });

  $(document).scroll(function() {
    var y = $(this).scrollTop();
    var height = window.innerHeight;
    if (y > height) {
      $('.top-btn').fadeIn();
    } else {
      $('.top-btn').fadeOut();
    }
  });

});

function initMap() {
  var office = {lat: 37.39504, lng: -121.97842};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: office,
    scrollwheel: false
  });

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h6>ZGC Innovation Center</h6>'+
      '<div id="bodyContent">'+
      '<p>4500 Great America Parkway<br>'+
      'Santa Clara, CA 95054</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: office,
    map: map,
    title: 'GWC'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    // other browser
    return false;
}
