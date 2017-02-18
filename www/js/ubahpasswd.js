var idUser = decodeURI (getURLparam('userid'));
var nipUser = decodeURI (getURLparam('nip'));
var NmUnitKerja = decodeURI (getURLparam('NmUnitKerja'));
		
	function init() {
		document.getElementById("username").innerHTML = idUser;
		document.getElementById("username").value = idUser;
		document.getElementById("linkhomeup").href = 'home.html?userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;
		document.getElementById("linkbackup").href = 'home.html?userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;
		//document.getElementById("unitkerja").innerHTML = NmUnitKerja;
		document.getElementById("unitkerja").innerHTML = window.localStorage.getItem("namauser"); 
		
		//cek session
		if (!isSessionOK(idUser)) {
			window.location.href = "logout.html";
		}
		return(false);
		}

$(document).ready(function(){
	var myVar = setInterval(checkMailFull, timercheck);		//check every 60s
	
  $("form#loginForm").submit(function() { // loginForm is submitted
	var username = $('#username').val(); // get username
	var passwd_baru = $('#passwd_baru').val(); // get password
	var passwd_baru2 = $('#passwd_baru2').val(); // get password
	
	if (username && passwd_baru && passwd_baru2) { // values are not empty
		if (passwd_baru == passwd_baru2){
			$.ajax({
				crossDomain: true, 
				cache: false,
				type: "GET",
				url: apiPU+ "api_ubahpasswd.php", 											// URL php script
				contentType: "application/json; charset=utf-8",
				dataType: "jsonp",
				jsonpCallback:"jsonppu",
				data: "username=" + username + "&passwd_baru=" + passwd_baru,				// send parameters
				error: function(XMLHttpRequest, textStatus, errorThrown) { 							
					$('div#UPResult').text("responseText: " + XMLHttpRequest.responseText 
						+ ", textStatus: " + textStatus 
						+ ", errorThrown: " + errorThrown);
				}, // error 
				success: function(data){
					if (data.error) { 				// script returned error
						$('div#UPResult').text("data.error: " + data.error);
						//$('div#UPResult').addClass("alert alert-danger");
					} else { 						// change passwd was successful
						$('div#UPResult').text("data.success: " + data.success);
						//$('div#UPResult').addClass("alert alert-success");
					} //else
				} // success
			}); // ajax
		} else { // if
			 $('div#UPResult').text("Password baru dan konfirmasi tidak sama");
			 //$('div#UPResult').addClass("alert alert-danger");
		}
    } else {
		$('div#UPResult').text("Masukkan password lama dan baru");
		//$('div#UPResult').addClass("alert alert-danger");
    } 
	$('div#UPResult').fadeIn();
    return false;
  });
 
});
