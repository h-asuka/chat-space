$(function(){
  function buildHTML(message){
    var imageA = "";
     if (message.image) {
       imageA = `<img src="${message.image}" class = "lower-message__image">`
     }
      var html = `<div class="main-bar__contents__main" data-message_id= ${message.id}>
                    <div class="main-bar__contents__main__above">
                      <div class="main-bar__contents__main__above__a">
                        ${message.user_name}
                      </div>
                      <div class="main-bar__contents__main__above__b">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="main-bar__contents__main__below">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                        ${imageA}
                    </div>
                  </div>`
      return html;
  };

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildHTML(message);
      $('.main-bar__contents').append(html);
      $('.main-bar__contents').animate({ scrollTop: $('.main-bar__contents')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.main-bar__footer__left__btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
      $('.main-bar__footer__left__btn').prop('disabled', false);
    });
  });


  var reloadMessages = function() {
    var last_message_id = $('.main-bar__contents__main:last').data('message_id');
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-bar__contents').append(insertHTML);
        $('.main-bar__contents').animate({ scrollTop: $('.main-bar__contents')[0].scrollHeight});
    })
    .fail(function() {
      alert('error');
    });
    };
  };
  setInterval(reloadMessages, 7000);
});
