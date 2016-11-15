var API = 'https://api.github.com/',
    REPOS_PER_PAGE = 3,
    currentPage = 1,
    lastPage;

getLastPage();
showResult();

//------- get last page -------
function getLastPage () {
  var option = {
    page: undefined,
    perPage: undefined
  };

  getAjaxResult(function(result){
    lastPage = (result.length - result.length % REPOS_PER_PAGE)/REPOS_PER_PAGE;
  }, option);
}

//-------- ajax result-------

function getAjaxResult(callback, option) {
  $.ajax({
    url: API + 'users/octocat/repos?page='+ option.page +'&per_page='+ option.perPage,
    method: 'GET',
    success: callback,
    error: function () {
      alert('Error');
    }
  });
}

//-------- show result -----------
function showResult(){
  var option = {
    page: currentPage,
    perPage: REPOS_PER_PAGE
  };

  getAjaxResult(function (result) {

    var html = [], repository, text;
    $('#content').empty();

    for(var i = 0; i < result.length; i++){

      repository = $('<div class="user-info" />');
      text = $('<p class="user-text" />');

      text
          .append($('<a href="'+ result[i].owner.html_url + '" class="user-login">' + result[i].owner.login +'</a><span> / </span>'))
          .append($('<a href="'+ result[i].html_url + '" class="user-repository">' + result[i].name +'</a>'));

      if( result[i].description !== null ) {
        text
            .append($('<p class="user-description">' + result[i].description +'</p>'));
      }

        repository
          .append(text)
          .append($('<img src="'+ result[i].owner.avatar_url + '" class="user-avatar">'));

      html.push(repository);
    }

    $('#content').append(html);

  }, option);
}


//---------- pagination ------------

$('#prev').on('click', function(){

  if ( currentPage === 1 ) return;
  currentPage--;

  showResult();
  toggleActive();
});


$('#next').on('click', function(){

  if(currentPage === lastPage) return;
  currentPage++;

  showResult();
  toggleActive();
});


function toggleActive () {

  if ( currentPage === 1 ) {
    $('#prev').toggleClass('inactive', true);
    $('#next').toggleClass('inactive', false);
  } else if (currentPage === lastPage) {

    $('#prev').toggleClass('inactive', false);
    $('#next').toggleClass('inactive', true);
  } else {

    $('#next').toggleClass('inactive', false);
    $('#prev').toggleClass('inactive', false);
  }
  $('#page_number').text(currentPage);
}