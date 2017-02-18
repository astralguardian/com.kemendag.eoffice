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
			url: apiPU+ "api_progressdisposisi.php", 
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			jsonpCallback:"jsonppu",
			data: "noagenda=" + noAgenda + "&userid=" + idUser + "&nip=" + nipUser,								// send username and password as parameters
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
						$("#progressdisposisi").html("error");
					},
			success: function(response){
						var content = '';
						var file = '';
						var url = ''
						for (var i = 0; i < response.prdisposisi.length; i++) {
							if (response.prdisposisi[i].UrlFileUpload1 != undefined && response.prdisposisi[i].UrlFileUpload1 != "") {
								//file += '<a href="http://103.12.84.244/_FileDownload/surat_masuk/'+response.prdisposisi[i].UrlFileUpload1+'" target="_blank">Scan Surat 1</a>'
								url = "window.open('http://docs.google.com/viewer?url="+fileDownload+"surat_masuk/" +response.prdisposisi[i].UrlFileUpload1+ "', '_blank', 'location=yes');";
								file += '<a href="#" onclick="' +url+ '">Scan Surat 1</a> '
							}
							if (response.prdisposisi[i].UrlFileUpload2 != undefined && response.prdisposisi[i].UrlFileUpload2 != "") {
								//file += '<a href="http://103.12.84.244/_FileDownload/surat_masuk/'+response.prdisposisi[i].UrlFileUpload2+'" target="_blank">Scan Surat 2</a>'
								url = "window.open('http://docs.google.com/viewer?url="+fileDownload+"surat_masuk/" +response.prdisposisi[i].UrlFileUpload2+ "', '_blank', 'location=yes');";
								file += '<a href="#" onclick="' +url+ '">Scan Surat 2</a> '
							}
							if (response.prdisposisi[i].UrlFileUpload3 != undefined && response.prdisposisi[i].UrlFileUpload3 != "") {
								//file += '<a href="http://103.12.84.244/_FileDownload/surat_masuk/'+response.prdisposisi[i].UrlFileUpload3+'" target="_blank">Lembar Disposisi</a>'
								url = "window.open('http://docs.google.com/viewer?url="+fileDownload+"surat_masuk/" +response.prdisposisi[i].UrlFileUpload2+ "', '_blank', 'location=yes');";
								file += '<a href="#" onclick="' +url+ '">Lembar Disposisi</a> '
							}
							content = "<li>Tgl : " +response.prdisposisi[i].TglProses+ "<br>NIP : " +response.prdisposisi[i].UserId+ "<br>Nama : "+response.prdisposisi[i].Nama+ "<br>Proses : " +response.prdisposisi[i].NmStatus+ "<br>Keterangan : " +response.prdisposisi[i].Keterangan+ "<br>Ditujukan Kepada : " +response.prdisposisi[i].DitujukanKepada+ " - " +response.prdisposisi[i].NamaKepada+"<br>File Uploaded : " +file+ "</li>";
							$('#listprogressdisposisi').append(content);
							$('#listprogressdisposisi').trigger('create');    
							$('#listprogressdisposisi').listview('refresh');
							
						}

						//links
						var link = 'home.html?userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;			//home
						document.getElementById("linkhomeup").href = link ; 
						document.getElementById("linkhomedown").href = link ; 
						link = 'surat_masuk_detail.html?noagenda='+noAgenda+'&userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;		//back
						document.getElementById("linkbackup").href = link ; 
						document.getElementById("linkbackdown").href = link ;
						link = "PROGRESS DISPOSISI<br>"+noAgenda ;
						document.getElementById("judul").innerHTML = link ;
					}
	
		});
	});