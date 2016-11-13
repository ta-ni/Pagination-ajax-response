var api = 'https://api.github.com/',
    option = {
      page: 1,
      perPage: 3
    };


showResult(option);
toggleActive();


//-------- ajax result-------

function getAjaxResult(callback, option) {
  $.ajax({
    url: api + 'users/octocat/repos?page='+ option.page +'&per_page='+ option.perPage,
    method: 'GET',
    success: callback,
    error: function () {
      alert('Error');
    }
  });
}

//-------- callback -----------
function showResult(option){
  getAjaxResult(function (result) {
    var html = [];
    var repository, text;

    for(var i = 0; i < result.length; i++){

      repository = $('<div class="user-info" />');
      text = $('<p class="user-text" />');

      text
          .append($('<a href="'+ result[i].owner.html_url + '" class="user-login">' + result[i].owner.login +'</a><span> / </span>'))
          .append($('<a href="'+ result[i].html_url + '" class="user-repository">' + result[i].name +'</a>'));

      if(!(result[i].description === null)) {
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

  if ( option.page === 1 ) return;
  option.page--;

  $('#content').empty();
  showResult(option);
  toggleActive();
});


$('#next').on('click', function(){

  if(option.page === 3) return;
  option.page++;

  $('#content').empty();
  showResult(option);
  toggleActive();
});


function toggleActive () {

  if (option.page === 1) {
    $('#prev').addClass('inactive');
    $('#next').removeClass('inactive');
  }
  else if (option.page === 3){
    $('#next').addClass('inactive');
    $('#prev').removeClass('inactive');
  }
  $('#page_number').text(option.page);
}