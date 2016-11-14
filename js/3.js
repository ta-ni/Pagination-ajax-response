var API = 'https://api.github.com/',
    REPOS_PER_PAGE = 3,
    currentPage = 1;

showResult();
toggleActive();


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

//-------- callback -----------
function showResult(){
  var option = {
    page: currentPage,
    perPage: REPOS_PER_PAGE
  };

  getAjaxResult(function (result) {
    var html = [];
    var repository, text;

    for(var i = 0; i < result.length; i++){

      repository = $('<div class="user-info" />');
      text = $('<p class="user-text" />');

      text
          .append($('<a href="'+ result[i].owner.html_url + '" class="user-login">' + result[i].owner.login +'</a><span> / </span>'))
          .append($('<a href="'+ result[i].html_url + '" class="user-repository">' + result[i].name +'</a>'));

      if(!(result[i].description === null) || (result[i].description !== null)) {
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

  $('#content').empty();
  showResult();
  toggleActive();
});


$('#next').on('click', function(){

  if(currentPage === 3) return;
  currentPage++;

  $('#content').empty();
  showResult();
  toggleActive();
});


function toggleActive () {

  if (currentPage === 1) {
    $('#prev').addClass('inactive');
    $('#next').removeClass('inactive');
  }
  else if (currentPage === 3){
    $('#next').addClass('inactive');
    $('#prev').removeClass('inactive');
  }
  else {
    $('#next').removeClass('inactive');
    $('#prev').removeClass('inactive');
  }
  $('#page_number').text(currentPage);
}