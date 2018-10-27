$(document).ready( ()=>{

  function showModal() {
    $('.overlay').animate({opacity: 'show'}, 1800);
    $('.modal').css({top: (-5*$(this).outerHeight())+'px'}).show().animate({top: ''}, 800);
    $('.close').focus();
  }
  
  function hideModal(){
    $('.modal').animate({top: (-5*$(this).outerHeight())+'px'}, 800, ()=>{$('.modal').hide();});
    $('.overlay').animate({opacity: 'hide'}, 1800);
  }

  ///////////////  events for Show/hide modal  ///////////////
  $('nav a[href="#sheldure"], .main_btna, .main_btn').on('click', showModal );
  // $('nav a[href="#sheldure"]').on('click', showModal );
  // $('.main_btna').on('click', showModal );
  // $('.main_btn').on('click', showModal );
  
  $('.close').on('click', hideModal);
  $('.modal').on('keydown', evt=>{
    if (evt.keyCode === 27){ // ESC key
      hideModal();
    }
  });
  
  $('.back').on('click', function (){$(this.parentNode).hide();});
  $('.thanks').on('keydown', function(evt){
    if (evt.keyCode === 27){ // ESC key
      $('.thanks').hide();
    }
  });
  
  
  ///////////////  async send form data  ///////////////
  $('.form').on('submit', (evt)=>{
    evt.preventDefault();
    // let formData = new FormData(document.getElementsByClassName('.form')[0]);
    
    let formData = {};
    [].forEach.call($('.form input'), el=>{ formData[el.name] = el.value; });
    let tmp = $('.form textarea')[0];
    formData[tmp.name] = tmp.value ;
  
    formData = JSON.stringify(formData);
    console.log(formData);
    
    // $.ajax({
    //   url: 'server.php',
    //   data: formData,
    //   dataType: 'json',
    //   type: 'POST',
    //   success () {
    //     hideModal();
    //     $('.thanks').show();
    //   },
    //   error () {
    //     hideModal();
    //     $('.thanks').show();
    //     $('.thanks p').html('Что-то пошло не так.<br>Попробуйте позже.');
    //   }
    // });
    
    function onPostSuccess() {
      hideModal();
      $('.thanks').show();
    }
    
    $.post('server.php', formData, onPostSuccess(), 'json');
    
  });
  
  
});