// function that does all the character count for the tweet

$(document).ready(() => {
  $(".new-tweet").on('input',function() {
    let tweetLen = $(this.text).val().length;
    let numLeft = 140 - tweetLen;
    if (numLeft < 0) {
      return $(this.counter).text(numLeft).css('color', 'red');
    } else {
      return $(this.counter).text(numLeft).css('color', 'black');
    }
  });
});



