var idUser = decodeURI (getURLparam('userid'));
var nipUser = decodeURI (getURLparam('nip'));
var namaUser = decodeURI (getURLparam('nama'));
var NmUnitKerja = decodeURI (getURLparam('NmUnitKerja'));

	function init() {
			var login = decodeURI (getURLparam('login'));
			//cek session
			if (!isSessionOK(idUser)) {
				window.location.href = "logout.html";
			}
			//greeting
			//namaUser = "Selamat Datang " + namaUser;
			//if (login=='true'){
			//	document.getElementById("unitkerja").innerHTML = namaUser;
			//}
			//href link
			document.getElementById("suratmasuk").href = "surat_masuk.html?userid="+idUser+"&nip="+nipUser+"&NmUnitKerja="+NmUnitKerja;
			document.getElementById("agenda").href = "agenda.html?userid="+idUser+"&nip="+nipUser+"&NmUnitKerja="+NmUnitKerja;
			document.getElementById("profile").href = "profile.html?userid="+idUser+"&nip="+nipUser+"&NmUnitKerja="+NmUnitKerja;
			document.getElementById("ubahpassword").href = "ubah_passwd.html?userid="+idUser+"&nip="+nipUser+"&NmUnitKerja="+NmUnitKerja;
			//document.getElementById("unitkerja").innerHTML = NmUnitKerja;
			document.getElementById("unitkerja").innerHTML =  window.localStorage.getItem("namauser");
			return(false);
		}
		
	$(document).ready(function(){	
		var myVar = setInterval(checkMailFull, timercheck);		//check every 60s
		
        $.ajax({
			crossDomain: true,
			cache: false,
			type: "GET",
			url: apiPU+ "api_unreadmsg.php", 
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			jsonpCallback:"jsonppu",
			data: "userid=" + idUser + "&nip=" + nipUser,								// send username and password as parameters
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
						$("#notifikasi").html("error");
					},
			success: function(response){
						var content = '';
						if (response.jumlah > 0){
							content = "<img src=\"img/1A.png\" height=\"60\">(" +response.jumlah+ ")" ;
							$("#suratmasuk").html(content);
						}
					}
	
		});
		
//		$("#checkunread").click(function(e){	
//			checkMailFull();	
//		});
		
	});