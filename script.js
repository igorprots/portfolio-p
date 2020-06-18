   //Add your token 
   var token = '[your access token]';
   //Declare the var to save the nexturl from the API
   nexturl = '';

   //First call will load at the beginning of the site
   $.ajax({
       //Modify the count value to set how many photos you want to load
       url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token + '&count=12',
       dataType: 'jsonp',
       type: 'GET',
       data: { access_token: token },
       success: function(data) {
           //Gather The images of the User 
           for (i = 0; i < data.data.length; i++) {
               //this variables are just to save the data and simplify you
               // can also use the data.data[] info instead
               img = data.data[i].images.low_resolution.url;
               img_link = data.data[i].link;
               likes = data.data[i].likes.count;
               comments = data.data[i].comments.count;
               interactions = data.data[i].comments.count + data.data[i].likes.count;
               //Appends the variables inside the div 
               $("#add-data").append("<img src='" + img + "' width='150px' height='150px'> <p>Likes: " + likes + "</p><p>Comments: " + comments + "</p><p>Total Interactions: " + interactions + "</p></div><div class='card-action'><a href='" + img_link + "'>Check Photo</a> ");
           }
           nexturl = data.pagination.next_url;
       },
       error: function(data) {
           console.log(data)
       }
   });



   //Load More Photos From Instagram
   //If you click on the Load More text / button / etc it will run again the code 
   //adding the next 12 photos
   $('#LoadMore').click(divFunction);

   function divFunction(e) {
       e.preventDefault();
       //Each request from instagram can handle only 33 Images (that's how the API works')
       $.ajax({
           url: nexturl, // we don't need to specify parameters for this request - everything is in URL already
           dataType: 'jsonp',
           type: 'GET',
           success: function(data) {
               for (x in data.data) {
                   img = data.data[x].images.low_resolution.url;
                   img_link = data.data[x].link;
                   likes = data.data[x].likes.count;
                   comments = data.data[x].comments.count;
                   interactions = data.data[x].comments.count + data.data[x].likes.count;
                   //console.log('Image ID: ' + img_id + ' Image Link: ' + img_link + ' Likes: ' + likes); 
                   i++;
                   $("#add-data").append("<div class='col s4'><div class='card horizontal'><div class='card-image'><img src='" + img + "' width='150px' height='150px'></div><div class='card-stacked'><div class='card-content'><p >Likes: " + likes + "</p><p>Comments: " + comments + "</p><p>Total Interactions: " + interactions + "</p></div><div class='card-action'><a href='" + img_link + "'>Check Photo</a></div></div></div></div>");
               }
               nexturl = data.pagination.next_url;
               console.log(tot_nexturl)
           },
           error: function(result2) {
               console.log(result2);
           }
       });
   }