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
			url: apiPU+ "api_agendadetail.php", 
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			jsonpCallback:"jsonppu",
			data: "noagenda=" + noAgenda + "&userid=" + idUser + "&nip=" + nipUser,								// send username and password as parameters
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
						$("#agendadetail").html("error");
					},
			success: function(response){
						var content = '';
						content =  '<table data-role="table" data-mode="columntoggle" class="zebra" style="width:100%"><tbody>';
						content +=  '<tr><td>No Agenda</td><td>: '+response.NoAgenda+'</td></tr>'; 
						content +=  '<tr><td>Nama Agenda</td><td>: '+response.NamaAgenda+'</td></tr>';
						content +=  '<tr><td>Tgl Mulai</td><td>: '+response.TglMulai+'</td></tr>';
						content +=  '<tr><td>Tgl Selesai</td><td>: '+response.TglSelesai+'</td></tr>';
						content +=  '<tr><td>Lokasi</td><td>: '+response.Lokasi+'</td></tr>';
						content +=  '<tr><td>Penyelenggara</td><td>: '+response.Penyelenggara+'</td></tr>';
						content +=  '<tr><td>Keterangan</td><td>: '+response.Keterangan+'</td></tr>'; 
						content +=  '</tbody></table>';					
						$("#agendadetail").html(content);
						
						//links
						var link = 'home.html?userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;			//home
						document.getElementById("linkhomeup").href = link ; 
						document.getElementById("linkhomedown").href = link ; 
						link = 'agenda.html?userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;			//back
						document.getElementById("linkbackup").href = link ; 
						document.getElementById("linkbackdown").href = link ; 
					}
	
		});
	});