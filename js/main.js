 (function(TESCO) {
     "use strict";

     var room = Math.random().toString(36).substring(7);
     var counter = 4;

     if (room === null) {
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
             $('.tab-item').removeClass('active');
             $(this).addClass('active');
             if ($(this).text().trim() === 'Home') {
                 TESCO.gotoScreen('home');
             }

             if ($(this).text().trim() === 'Store Helper') {
                 TESCO.gotoScreen('helper');
             }
         });

         $('.callforhelp').click(function() {
             TESCO.gotoScreen('selection');
         });

         $('#send-btn').click(function() {
             var text = $('#sender').val();

             console.log('sendings');
             $('#sender').val('');
             $('.shopping-list.admin').append('<div class="list-item" data-id="' + counter + '"><img src="http://www.americansweets.co.uk/ekmps/shops/statesidecandy/images/walkers-prawn-cocktail-flavour-crisps-case-of-48-x-32.5g-bags-6107-p.jpg"><h2>New Item</h2><h3>£1.50</h3><span class="red">Remove</span></div>');
             socket.emit('message', text);
             count++;
         });

         $('.red').click(function() {
         	socket.emit('delete', $(this).parent().attr('data-id'));
         });

         $('.tabs li').click(function() {
             $('.tab-content').hide();
             var tab = $(this).text().trim();
             if (tab === 'Shopping List') {
                 $('.tab-content.two').show();
             }

             if (tab === 'System Links') {
                 $('.tab-content.three').show();
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
         console.log('received');
         $('.loader').hide();
         $('.desktop').attr('src', 'https://apprtc.appspot.com/r/Tesco' + message);
     });

     socket.on('disconnected', function(message) {
         $('.loader').show();
         $('.desktop').attr('src', '');
     });

     socket.on('delete', function(message) {
         $('.list-item[data-id="' + parseInt(message) + '"]').remove();
     });

     TESCO.events();
     $('.home').show();
     $('.desktop').height($(window).height() - 50);

 })(window.TESCO = window.TESCO || {});
