 (function(TESCO) {
     "use strict";

     var room = Math.random().toString(36).substring(7);
     var counter = 3;

     if (room === null || room === undefined || room === "undefined") {
         var time = new Date();
         room = 'myTesco' + time.getMilliseconds();
     }
     $('.player iframe').attr('src', 'https://apprtc.appspot.com/r/Tesco' + room);

     TESCO.gotoScreen = function(screen) {
         $('.screen').hide();
         $('.' + screen).show();
     };

     TESCO.events = function() {
         $('.exit').click(function() {
             $('.selection').show();
             $('.player').hide();
         });

         $('#startButton').click(function() {
             $('.selection').hide();
             $('.player').show();
             socket.emit('connected', room);
         });

         $('.tab-item').click(function() {
             socket.emit('disconnected');
         	 //$('.phone-screen .player').hide();
             $('.tab-item').removeClass('active');
             $(this).addClass('active');
             if ($(this).text().trim() === 'Home') {
                 TESCO.gotoScreen('home');
             }

             if ($(this).text().trim() === 'Store Helper') {
                 TESCO.gotoScreen('helper');
             }

             if ($(this).text().trim() === 'Profile') {
                 TESCO.gotoScreen('profile');
             }
         });

         $('.callforhelp').click(function() {
             TESCO.gotoScreen('selection');
         });

         $('.toggle').click(function() {
             $(this).toggleClass('active');
             var id = $(this).attr('id');
             socket.emit('toggle', id);
         });

         $('#send-btn').click(function() {
             var text = $('#sender').val();
             $('#sender').val('');
             $('.shopping-list.admin').append('<div class="list-item" data-id="' + counter + '"><img src="http://www.americansweets.co.uk/ekmps/shops/statesidecandy/images/walkers-prawn-cocktail-flavour-crisps-case-of-48-x-32.5g-bags-6107-p.jpg"><h2>New Item</h2><h3>£1.50</h3><span class="red">Remove</span></div>');
             socket.emit('message', text);
             counter++;
         });

         $('.shopping-list.admin').on('click', '.red', function() {
             socket.emit('deleteitem', $(this).parent().attr('data-id'));
             $('.list-item[data-id="' + $(this).parent().attr('data-id') + '"]').remove();
         });

         $('.tabs li').click(function() {
             $('.tab-content').hide();
             $('.tabs li').removeClass('active');
             $(this).addClass('active');
             var tab = $(this).text().trim();
             if (tab === 'Shopping List') {
                 $('.tab-content.two').show();
             }

             if (tab === 'System Links') {
                 $('.tab-content.three').show();
             }

             if (tab === 'Profile') {
                 $('.tab-content.one').show();
             }
         });
     };
     var socket = io.connect();

     socket.on('message', function(message) {
         $('.user-message').text(message).fadeIn();
         $('.shopping-list').append('<div class="list-item" data-id="' + counter + '"><img src="http://www.americansweets.co.uk/ekmps/shops/statesidecandy/images/walkers-prawn-cocktail-flavour-crisps-case-of-48-x-32.5g-bags-6107-p.jpg"><h2>New Item</h2><h3>£1.50</h3><span>1</span></div>');

         setTimeout(function() {
             $('.user-message').fadeOut();
         }, 5000);

     });


     socket.on('connected', function(message) {
         $('.loader').hide();
         $('.desktop').attr('src', 'https://apprtc.appspot.com/r/Tesco' + message);
     });

     socket.on('disconnected', function(message) {
         $('.loader').show();
         $('.desktop').attr('src', '');
     });

     socket.on('toggle', function(message) {
     	$('#' + message).toggleClass('active');
        $('.user-message').text('Profile Setting changed').fadeIn();
             setTimeout(function() {
                 $('.user-message').fadeOut();
             }, 5000);
     });

     socket.on('deleteitem', function(message) {
         $('.list-item[data-id="' + message + '"]').remove();
         $('.user-message').text('Item removed from basket').fadeIn();

         setTimeout(function() {
             $('.user-message').fadeOut();
         }, 5000);
     });

     TESCO.events();
     $('.home').show();
     $('.desktop').height($(window).height() - 50);

 })(window.TESCO = window.TESCO || {});
