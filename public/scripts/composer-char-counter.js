// $(document).ready(() => {
//   console.log('ready guys!')
// });

$(document).ready(() => {
  $(".new-tweet").on('input',function(e) {
    let tweetLen = $(this.text).val().length;
    let numLeft = 140 - tweetLen;
    if (numLeft < 0) {
      return $(this.counter).val(numLeft).css('color', 'red')
    } else { 
      return $(this.counter).val(numLeft).css('color', 'black')
    }
  });
});



