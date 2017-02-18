var idUser = decodeURI (getURLparam('userid'));
var nipUser = decodeURI (getURLparam('nip'));
var namaUser = decodeURI (getURLparam('nama'));
var sfield = decodeURI (getURLparam('sfield')); 
var skey = decodeURI (getURLparam('skey')); 
var filter = decodeURI (getURLparam('filter')); 
var NmUnitKerja = decodeURI (getURLparam('NmUnitKerja'));

var parmfilter = '' ;
if (filter == "OK"){
	parmfilter = "&sfield=" + sfield + "&skey=" + skey ;
}

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
        $.ajax({
			crossDomain: true,
			cache: false,
			type: "GET",
			url: apiPU+ "api_suratmasuk.php", 
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			jsonpCallback:"jsonppu",
			data: "userid=" + idUser + "&nip=" + nipUser + parmfilter + pagefilter,	
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
						$("#suratmasuk").html("error");
					},
			success: function(response){
						var content = '';
						var statusdisposisi = '';
						for (var i = 0; i < response.surat.length; i++) {
							//status disposisi
							if (cleanResult(response.surat[i].sdisposisi) == "") {
								statusdisposisi = "Belum didisposisikan" ;
							}else{
								statusdisposisi = response.surat[i].sdisposisi ;
							}
							//tampilkan
							if (response.surat[i].sbaca=='Sudah Dibaca'){
								content = '<li><a href="surat_masuk_detail.html?noagenda='+response.surat[i].no+'&userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja+'" data-transition="slide" data-ajax="false">'+response.surat[i].pengirim+'<br>' +response.surat[i].tanggal+ '<br>' +	response.surat[i].nosurat+ '<br>' +response.surat[i].perihal+ '<br>' +statusdisposisi+ '</a></li>';
							}else{
								content = '<li><a href="surat_masuk_detail.html?noagenda='+response.surat[i].no+'&userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja+'" data-transition="slide" data-ajax="false"><font color="blue">'+response.surat[i].pengirim+'<br>' +response.surat[i].tanggal+ '<br>' +	response.surat[i].nosurat+ '</font><br>' +response.surat[i].perihal+ '<br>' +statusdisposisi+ '</a></li>';
							}
							$('#listsuratmasuk').append(content);
							$('#listsuratmasuk').trigger('create');    
							$('#listsuratmasuk').listview('refresh');
						}
						
						var link = 'home.html?userid='+idUser+'&nip='+nipUser+"&NmUnitKerja="+NmUnitKerja;
						document.getElementById("linkhomeup").href = link ; 
						document.getElementById("linkhomedown").href = link ; 
					
						var pagenext = parseInt(response.others[0].page)+1;
						var pageprev = parseInt(response.others[0].page)-1;
						if (pageprev > 0){
							link = 'surat_masuk.html?userid='+idUser+'&nip='+nipUser+'&page='+pageprev+'&NmUnitKerja='+NmUnitKerja;
							document.getElementById("prev").href = link ; 
						}
						link = 'surat_masuk.html?userid='+idUser+'&nip='+nipUser+'&page='+pagenext+'&NmUnitKerja='+NmUnitKerja;
						document.getElementById("next").href = link ;
						document.getElementById("hal").innerHTML = response.others[0].page;

						document.getElementById("userid").value = idUser;
						document.getElementById("nip").value = nipUser;
					}
	
		});
	});