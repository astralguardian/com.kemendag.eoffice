var idUser = decodeURI (getURLparam('userid'));
var nipUser = decodeURI (getURLparam('nip'));
var noAgenda = decodeURI (getURLparam('noagenda'));
var IdTDXSInbox = decodeURI (getURLparam('IdTDXSInbox'));
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
			url: apiPU+ "api_datadisposisidetail.php", 
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			jsonpCallback:"jsonppu",
			data: "noagenda=" + noAgenda + "&userid=" + idUser + "&nip=" + nipUser + "&IdTDXSInbox=" + IdTDXSInbox,								// send username and password as parameters
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
						$("#datadisposisi").html("error");
					},
			success: function(response){
						var content = '<p><table data-role="table" data-mode="columntoggle" class="zebra" style="width:100%"><tbody>';
						content +=  '<tr><td>Tgl Masuk</td><td>: '+cleanResult(response.disposisi[0].TglInbox)+'</td></tr>';
						content +=  '<tr><td>Tgl Disposisi</td><td>: '+cleanResult(response.disposisi[0].TglProses)+'</td></tr>';
						content +=  '<tr><td>Disposisi Dari</td><td>: '+cleanResult(response.disposisi[0].NamaPengirim)+'</td></tr>';
						content +=  '<tr><td>Disposisikan Kepada</td><td>: '+cleanResult(response.disposisi[0].NamaPenerima)+'</td></tr>';
						content +=  '<tr><td>Sifat</td><td>: '+cleanResult(response.disposisi[0].Sifat)+'</td></tr>';
						content +=  '<tr><td>Lajur Disposisi</td><td>: '+cleanResult(response.disposisi[0].LajurDisposisi)+'</td></tr>';
						content +=  '<tr><td>Catatan</td><td>: '+cleanResult(response.disposisi[0].Catatan)+'</td></tr>';
						content += "</tbody></table></p>";		
						$("#datadisposisi").html(content);
						
						//links
						var link = 'home.html?userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;			//home
						document.getElementById("linkhomeup").href = link ; 
						document.getElementById("linkhomedown").href = link ; 
						link = 'data_disposisi.html?noagenda='+noAgenda+'&userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;		//back
						document.getElementById("linkbackup").href = link ; 
						document.getElementById("linkbackdown").href = link ; 
					}
		});
	});