$(document).ready(function(){

  var checkks = window.localStorage.getItem("keepsignin");
  if (checkks == 'yes'){
	//redirect ke home.html
	var cuserid = window.localStorage.getItem("userPU");
	var cnip = window.localStorage.getItem("nipPU");
	var cNmUnitKerja = window.localStorage.getItem("NmUnitKerja");
	window.location.href = "home.html?userid="+cuserid+"&nip="+cnip+"&NmUnitKerja="+cNmUnitKerja ;
  }
  
  $("form#loginForm").submit(function() { // loginForm is submitted
	var username = $('#username').val(); // get username
    var password = $('#password').val(); // get password
	var keepsignin = 'no';
	if (document.getElementById("keepsignin").checked){
		keepsignin = 'yes' 
	}	
	
	if (username && password) { // values are not empty
      $.ajax({
		crossDomain: true,
		cache: false,
        type: "GET",
		url: apiPU+ "api_login.php", 											// URL php script
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
		jsonpCallback:"jsonppu",
		data: "username=" + username + "&password=" + password,								// send username and password as parameters
		// script call was *not* successful
        error: function(XMLHttpRequest, textStatus, errorThrown) { 							
          $('div#loginResult').text("responseText: " + XMLHttpRequest.responseText 
            + ", textStatus: " + textStatus 
            + ", errorThrown: " + errorThrown);
          $('div#loginResult').addClass("error");
        }, // error 
        // script call was successful : data contains the JSON values returned by php script 
        success: function(data){
			if (data.error) { 				// script returned error
				$('div#loginResult').text("data.error: " + data.error);
				$('div#loginResult').addClass("error");
			} else { 						// login was successful
				window.localStorage.setItem("userPU", username);
				window.localStorage.setItem("passwdPU", password);
				window.localStorage.setItem("idmd", data.idmd);
				window.localStorage.setItem("nipPU", data.nip);
				window.localStorage.setItem("keepsignin", keepsignin);
				window.localStorage.setItem("NmUnitKerja", data.NmUnitKerja);
				window.localStorage.setItem("namauser", data.nama);
				//set time checkpoint
				var tgl = new Date();
				var curr_date = formatDate(tgl);
				window.localStorage.setItem("tglcheck", curr_date);
				//--
				window.location.href = "home.html?userid="+data.userid+"&nama="+data.nama+"&nip="+data.nip+"&login=true&NmUnitKerja="+data.NmUnitKerja;
			} //else
        } // success
      }); // ajax
    } // if
    else {
      $('div#loginResult').text("enter username and password");
      $('div#loginResult').addClass("error");
    } // else
    $('div#loginResult').fadeIn();
    return false;
  });
});
