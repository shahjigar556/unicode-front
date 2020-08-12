//alert('Hello World');
let email=document.getElementById('exampleFormControlInput1');//email
$('.success').hide();
$('.fail').hide();

let number=document.getElementById('call');//call
let check=0;
let checkemail=0,checkmobile=0;
/* for Notifications*/
let a=document.querySelectorAll('.allow');
//console.log(a);
$('.yes-show').hide();
$('.no-show').hide();
console.log(a.length);
for(let i=0;i<a.length;i++){
    a[i].addEventListener('click',function(){
        let id=this.id;
        if(id==='yes'){
            console.log('Yes');
            $('.no-show').hide();
            $('.yes-show').fadeIn();
        }
        else if(id==='no'){
            console.log('no');
            alert('You Have Turned Off Notifications');
            $('.yes-show').hide();
            $('.no-show').fadeIn();
        }
    })
}
/*for email*/

email.addEventListener('blur',function(){
    let imgsrc="../img/icon-30.png";
    let val=email.value;
    console.log(val);
    check=validateEmail(val);// validating email
    if(check===true){
        $('#mail .fail').fadeOut();
        $('#mail .success').fadeIn();
        checkemail=true;
    }
    else{
        $('#mail .success').fadeOut();
        $('#mail .fail').fadeIn();
        checkemail=false;
    }
})
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(email));
    return re.test(email);
  }
  /*for mobile number*/
  number.addEventListener('blur',function(){
      let val=number.value;
      console.log(val);
      check=validatePhone(val);
       if(check===true){
           $('#phone .fail').fadeOut();
           $('#phone .success').fadeIn();
           checkmobile=true;
       }
       else{
           $('#phone .success').fadeOut();
           $('#phone .fail').fadeIn();
           checkmobile=false;
       }
  })
  function validatePhone(number)
  {
     var regx = /^[6-9]\d{9}$/ ;
    if(regx.test(number))
      return true;
    else
      return false;
  }
  /*First Name and Last Name*/

  $('.confirm').on('click',function(){
    firstName=document.getElementById('firstName').value;
    lastName=document.getElementById('lastName').value;    
      if(checkmobile&&checkemail){
          alert(`Are you sure ${firstName} ${lastName} the information provided is correct`);
      }
      else{
         if(checkemail===false&&checkmobile==true){
             alert("Enter Valid Email address");
         }      
         else if(checkmobile===false&&checkemail===true){
             alert('Enter valid phone number');
         }
         else if(checkmobile===false&&checkemail===false){
             alert('Enter Valid Phone Number and Valid Email Address');
         }
      }
  })