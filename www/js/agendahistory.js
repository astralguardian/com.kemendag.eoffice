var idUser = decodeURI (getURLparam('userid'));
var nipUser = decodeURI (getURLparam('nip'));
var namaUser = decodeURI (getURLparam('nama'));
var NmUnitKerja = decodeURI (getURLparam('NmUnitKerja'));
var page = decodeURI (getURLparamRS('page')); 
var pagefilter = '' ;
if (page != "NA"){
	pagefilter = "&page=" + page;
}

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
			url: apiPU+ "api_agendahistory.php", 
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			jsonpCallback:"jsonppu",
			data: "userid=" + idUser + "&nip=" + nipUser + pagefilter,								// send parameters
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
						$("#agenda").html("error");
					},
			success: function(response){
						//links
						var link = 'home.html?userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;			//home
						document.getElementById("linkhomeup").href = link ; 
						document.getElementById("linkhomedown").href = link ; 
						link = 'agenda.html?userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;			//back
						document.getElementById("linkbackup").href = link ; 
						document.getElementById("linkbackdown").href = link ; 
						
						//history agenda
						var content = '';
						for (var i = 0; i < response.history.length; i++) {
							content = "<li><a href='agenda_detail.html?noagenda="+response.history[i].NoAgenda+"&userid="+idUser+"&nip="+nipUser+"&NmUnitKerja="+NmUnitKerja+"' data-transition='slide' data-ajax='false'>" + response.history[i].NamaAgenda + "<br>Tanggal : " + response.history[i].TglMulai + "<br>Lokasi : " +response.history[i].Lokasi + "</a></li>";
							$('#listhistory').append(content);
							$('#listhistory').trigger('create');    
							$('#listhistory').listview('refresh');
						}
						
						//paging
						var pagenext = parseInt(response.others[0].page)+1;
						var pageprev = parseInt(response.others[0].page)-1;
						if (pageprev > 0){
							link = 'agenda_history.html?userid='+idUser+'&nip='+nipUser+'&page='+pageprev+'&NmUnitKerja='+NmUnitKerja;
							document.getElementById("prev").href = link ; 
						}
						link = 'agenda_history.html?userid='+idUser+'&nip='+nipUser+'&page='+pagenext+'&NmUnitKerja='+NmUnitKerja;
						document.getElementById("next").href = link ;
						document.getElementById("hal").innerHTML = response.others[0].page;
					}
		});
	});
		