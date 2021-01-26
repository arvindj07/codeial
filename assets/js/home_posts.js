{
  // method to submit Form data for new Post using Ajax
  let createPost = function(){
    // getting Post Form using id using Ajax nd Jquery
    let newPostForm = $('#new-post-form');

    // handling Submit Event
    newPostForm.submit(function(e){
      e.preventDefault();        // to prevent the rendering of Default action while submiting the FORM

      $.ajax({
        type: 'post',
        url: ' /posts/create',  // ie., action in The Post Form in home.ejs, this url now calls the action
                              //posts_controller.create func() using the routes
        data: newPostForm.serialize(),// the data in Form is converted to JSON object i.e, in key-value format and stored 
                                       //in data and passed along the req, coz of this we r able to use req.body content

        // on suucessful req,we r getting back 'data' as Json object from the post_controller create func() , using return func() in if(req.xhr){ return Json_object; }
        success:function(data){     // data is the json object returned if the req is successful
          // console.log(data);
          let newPost= newPostDom(data.data.post);//pass 'post' data frm the returned json obj into func to create post 
          // Display the Post 
          $('#posts-list-container>ul').prepend(newPost);// Display current Post on top of list using prepend 

    //      NOTE: for now, we r only able to add the ajax delete Post method to the dynamically addded Post, not the pre-existing one, for that we have to loop it over the existing ones too
          deletePost($(' .delete-post-button', newPost)); // we r getting the object which has a 
                                      // class-'.delete-post-button' within the object newPost and passig it in deletePost
        },
        error:function(error){
          console.log(error.responseText);
        }

      });

    });
  }

  // method to create a Post in DOM
  let newPostDom = function(post){
// put the whole _post.ejs file inside return $(``); these are backticks- `, ${} used in case of accessing variables
// here we r returning the html format of the newly created post
// in Ajax we have to use post._id nd not post.id(this gives undefined)
//  NOTE: we  r not able to use displlay user-name here with ${post.user.name }
    return $(`<li id="post-${post._id}">
                <p>
                  <!-- Creating delete button for Post  -->                  
                    <small>
                      <!-- passing post.id as string/url params -->
                      <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>   
                    </small>
              
                    ${post.content}
                  <br>
                  <small>
                    ${post.user.name }
                  </small>
                </p>
                  
                
                  <!-- Create a comment on a particular Post if the user is Signed-In  -->
                
                <div class="post-comments">                  
                    <form action="/comments/create" method="POST">
                      <input type="text" name="content" placeholder="Add Comment..." required>
                          <!-- here we r sending the Post id in a hidden manner using input type-hidden -->
                      <input type="hidden" name="post" value="${ post._id }">      
                      <input type="submit" value="Add Comment">
              
                    </form>
              
                    <!-- Displaying the Comments on each post -->
                  <div id="post-comments-list">
                    <ul id="post-comments-${ post._id }">

                    </ul>
              
                  </div>
                </div>
              
              </li> `);
  }

  //method to delete a post from DOM
  // we r gonna delete using link ie., the <a> tag
  let deletePost= function(deleteLink){
    // when the delete link is clicked
    $(deleteLink).click(function(e){
      e.preventDefault();

      $.ajax({
        type:'get',
        url:$(deleteLink).prop('href'), //this is how u get the value of href in <a> tag
        success:function(data){
          $(`#post-${data.data.post_id}`).remove(); // removing the post using the id(css selector) specified in each post
        },
        error:function(error){
          console.log(error.responseText);
        }
      });
    });
  }

  //   Very Important
  // call the createPost() func
  createPost();

}