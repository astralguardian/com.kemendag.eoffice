var idUser = decodeURI (getURLparam('userid'));
var nipUser = decodeURI (getURLparam('nip'));
var noAgenda = decodeURI (getURLparam('noagenda'));
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
			type: "GET",
			url: apiPU+ "api_datadisposisi.php", 
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			jsonpCallback:"jsonppu",
			data: "noagenda=" + noAgenda + "&userid=" + idUser + "&nip=" + nipUser,								// send username and password as parameters
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
						$("#datadisposisi").html("error");
					},
			success: function(response){
						var content = '';
						for (var i = 0; i < response.disposisi.length; i++) {
							content = "<li><a href='data_disposisi_detail.html?noagenda="+noAgenda+"&userid="+idUser+"&nip="+nipUser+"&IdTDXSInbox="+response.disposisi[i].IdTDXSInbox+"&NmUnitKerja="+NmUnitKerja+"' data-transition='slide' data-ajax='false'>Tgl Disposisi : " + response.disposisi[i].TglProses + "<br>Pegirim : " + response.disposisi[i].NamaPengirim + "<br>Penerima : " + response.disposisi[i].NamaPenerima + "<br>Sifat : " + response.disposisi[i].Sifat + "<br>Catatan : " + response.disposisi[i].Catatan + "<br>Lajur disposisi : " + response.disposisi[i].LajurDisposisi + "</a></li>";
							$('#listdatadisposisi').append(content);
							$('#listdatadisposisi').trigger('create');    
							$('#listdatadisposisi').listview('refresh');
						}
						
						//links
						var link = 'home.html?userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;
						document.getElementById("linkhomeup").href = link ; 
						document.getElementById("linkhomedown").href = link ;
						link = 'surat_masuk_detail.html?noagenda='+noAgenda+'&userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;
						document.getElementById("linkbackup").href = link ; 
						document.getElementById("linkbackdown").href = link ;
						link = "DATA DISPOSISI<br>"+noAgenda ;
						document.getElementById("judul").innerHTML = link ;
					}
	
		});
	});