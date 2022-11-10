/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {
  const name = tweet.user.name;
  const avatar = tweet.user.avatars;
  const handle = tweet.user.handle;
  const content = tweet.content.text;
  const time = tweet.created_at;
  const output = ` <article class="tweet-box">
  <header id="tweet-header">
    <div class="user-div">
    <img class="img-layout" src="${avatar}">
    <span>${name}</span>
  </div>
  <div class="user-div">
    <span class="email-color">${handle}</span>
  </div>
  </header>
  <div class="content-layout">
  <span>${escape(content)}</span>
  </div>
  <hr>
  <footer id="tweet-footer">
    <div class="user-div">
    <span class="day-font email-color">${timeago.format(time)}</span>
    </div>
    <div class="icon-div">
      <i class="fa-solid fa-heart icon-pad"></i>
      <i class="fa-solid fa-flag icon-pad"></i>
      <i class="fa-sharp fa-solid fa-repeat icon-pad"></i>
    </div>
  </footer>
</article>`
  return output;
};

const renderTweets = (tweets) => {
  if(Array.isArray(tweets)){
    for (const tweet of tweets){
      $(document).ready(() => {
       $("#tweet-box").prepend(createTweetElement(tweet));
      })
    }
  } else $("#tweet-box").prepend(createTweetElement(tweets));
};

$(document).ready (function() {
  $('#nav-button').click(() => {
    $('html, body').animate({
      scrollTop: 0
    }, 'slow');
    $('#tweet-text').focus();
    return;
  })

  $('.nav-button1').click(() => {
    $('html, body').animate({
      scrollTop: 0
    }, 'slow');
    $('#tweet-text').focus();
    return;
  })

  $(document).scroll((e) => {
    $('.tweeter').css('opacity', '0%');
    $('.tab-logo').css('opacity', '100%');
    const scrollTop = $(window).scrollTop();
    // console.log(scrollTop)
    if (scrollTop <= 90){
      $('.nav-button1').css('opacity', '0%');
    } else {
      $('.nav-button1').css('opacity', '100%');
    }
  })
})


$(document).ready( function() {
  const $loadTweets = function () {
    $.ajax('/tweets', {method: 'GET'})
    .then(function (data) {
      renderTweets(data);
    })
  }

  const $loadNewTweets = function () {
    $.ajax('/tweets', {method: 'GET'})
    .then(function (data) {
      let dataLen = data.length;
      renderTweets(data[dataLen-1]);
    })
  }

  $loadTweets();
  $('#error-div').hide()
  $('.new-tweet').submit(function (e) {
    e.preventDefault();
    
    if($(this.counter).val() < 0) {
      $('#error-div').show()
      $('#error-msg').text('Tweet exceeded 140 characters. Please do a shorter one.')
      return;
    }
    if(!$(this.text).val()) {
      $('#error-div').show()
      $('#error-msg').text('Empty tweet, please type your tweet')
      return;
    }
    $('#error-div').hide('slow')
    $.post("/tweets", $(this).serialize())
    $(this.text).val('')
    $(this.counter).text(140)
    $.get("/tweets", function(){
      $loadNewTweets();
    })
  })
});

