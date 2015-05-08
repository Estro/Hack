 (function(TESCO) {
     "use strict";

     var room = Math.random().toString(36).substring(7);
     var counter = 3;

     if (room === null || room === undefined || room === "undefined") {
         var time = new Date();
         room = 'myTesco' + time.getMilliseconds();
     }
     $('.player iframe').attr('src', 'https://98fb662.ngrok.com/' + room);

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
              var item = items[itemCounter];
             $('.shopping-list').append('<div class="list-item" data-id="' + counter + '"><img src="' + item.image + '"><h2>' + item.Product + '</h2><h3>' + item.Price + '</h3><span class="red">Remove</span></div>');
             itemCounter++;
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
         var item = items[itemCounter];
         $('.shopping-list').append('<div class="list-item" data-id="' + counter + '"><img src="' + item.image + '"><h2>' + item.Product + '</h2><h3>' + item.Price + '</h3><span>'+item.Quantity +'</span></div>');
         itemCounter++;
         setTimeout(function() {
             $('.user-message').fadeOut();
         }, 5000);

     });


     socket.on('connected', function(message) {
         $('.loader').hide();
         $('.desktop').attr('src', 'https://98fb662.ngrok.com/' + message);
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

     var itemCounter = 0;

     var items = [{
         "Product ID": 272260396,
         "Product": "Lactofree Hard Cheese 200G",
         "Quantity": 1,
         "Price": "�1.79",
         "Location": "Aisle 31, Right, Mod 15, Shelf A",
         "image": "/images/272260396.jpg"
     }, {
         "Product ID": 285212132,
         "Product": "Tesco Cherry Tomatoes 330G",
         "Quantity": 1,
         "Price": "£0.90",
         "Location": "Aisle 5, Right, Mod 11, Shelf F",
         "image": "/images/285212132.jpg"
     }, {
         "Product ID": 254656543,
         "Product": "Tesco British Semi Skimmed Milk 2.272Ltr/4Pints",
         "Quantity": 1,
         "Price": "£1.00",
         "Location": "Aisle 1, Left, Mod 20, Shelf D",
         "image": "/images/254656543.jpg"
     }, {
         "Product ID": 258877943,
         "Product": "Lactofree Fresh Semi Skimmed Milk 1L",
         "Quantity": 1,
         "Price": "£1.35",
         "Location": "Aisle 6, Right, Mod 10, Shelf D",
         "image": "/images/258877943.jpg"
     }];

 })(window.TESCO = window.TESCO || {});
