var idUser = decodeURI (getURLparam('userid'));
var nipUser = decodeURI (getURLparam('nip'));
var NmUnitKerja = decodeURI (getURLparam('NmUnitKerja'));

	function init() {
		//cek session
		if (!isSessionOK(idUser)) {
			window.location.href = "logout.html";
		}
		//document.getElementById("unitkerja").innerHTML = NmUnitKerja;
		document.getElementById("unitkerja").innerHTML = window.localStorage.getItem("namauser"); 
		return(false);
	}
		
	$(document).ready(function(){
		var myVar = setInterval(checkMailFull, timercheck);		//check every 60s
		
        $.ajax({
			crossDomain: true,
			cache: false,
			type: "GET",
			url: apiPU+ "api_profile.php", 
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			jsonpCallback:"jsonppu",
			data: "username=" + idUser + "&nip=" + nipUser,	
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
						$("#suratmasuk").html("error");
					},
			success: function(response){
						document.getElementById("username").value = idUser ;
						document.getElementById("nip").value = response.profile[0].NIP;
						document.getElementById("nama").value = response.profile[0].Nama;
						document.getElementById("direktorat").value = response.profile[0].NmDirektorat;
						document.getElementById("unitkerja").value = response.profile[0].NmUnitKerja;
						document.getElementById("jabatan").value = response.profile[0].UraianJabatan;
						document.getElementById("grup").value = response.profile[0].group_privilleges_name;
						document.getElementById("email").value = response.profile[0].Email;
						document.getElementById("handphone").value = response.profile[0].NoHp;
						
						var link = 'home.html?userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;
						document.getElementById("linkhomeup").href = link ; 
						document.getElementById("linkhomedown").href = link ;
						document.getElementById("linkbackup").href = link ;						
						document.getElementById("linkbackdown").href = link ;
					}
	
		});
	});