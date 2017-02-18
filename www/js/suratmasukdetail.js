var idUser = decodeURI (getURLparam('userid'));
var nipUser = decodeURI (getURLparam('nip'));
var noAgenda = decodeURI (getURLparam('noagenda'));
var idmduser = window.localStorage.getItem("idmd");
var NmUnitKerja = decodeURI (getURLparam('NmUnitKerja'));
//disposisi
var dsurat = '';
var disposisi = '';
var jmlhdisposisi = decodeURI (getURLparam('jmlhdisposisi'));
var sifat = decodeURI (getURLparam('sifat'));
var catatan = decodeURI (getURLparam('catatan'));
if (jmlhdisposisi>0) {
	for (var i = 0; i < jmlhdisposisi; i++) {
		disposisi = decodeURI (getURLparamRS('disposisi' +i));
		if (disposisi != "NA") {
			dsurat += '&disposisi[]=' +disposisi;
		}
	}
}
var jmlhlajurdisposisi = decodeURI (getURLparam('jmlhlajurdisposisi'));
var lajurdisposisi = '';
if (jmlhlajurdisposisi>0) {
	for (var i = 0; i < jmlhlajurdisposisi; i++) {
		lajurdisposisi = decodeURI (getURLparamRS('kodelajur' +i));
		if (lajurdisposisi != "NA") {
			dsurat += '&kodelajur[]=' +lajurdisposisi;
		}
	}
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
			type: "GET",
			url: apiPU+ "api_suratmasukdetail.php", 
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			jsonpCallback:"jsonppu",
			data: "noagenda=" +noAgenda+ "&userid=" +idUser+ "&nip=" +nipUser+ "&idmd=" +idmduser+dsurat+ "&sifat=" +sifat +"&catatan=" +catatan,	
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
						$("#suratdetail").html("error");
					},
			success: function(response){
						var content = '';
						content =  '<form id="disposisiform" name="disposisiform" action="" method="" data-ajax="false">';
						content +=  '<table data-role="table" data-mode="columntoggle" class="zebra"><tbody>';
						content +=  '<tr><td>No Agenda</td><td>: '+cleanResult(response.surat[0].NoAgenda)+'</td></tr>'; 
						if (cleanResult(response.surat[0].NoAgendaLokal) != "") {
							content +=  '<tr><td>No Agenda Lokal</td><td>: '+cleanResult(response.surat[0].NoAgendaLokal)+'</td></tr>';
						}
						if (cleanResult(response.surat[0].TglPenerimaan) != "") {
							content +=  '<tr><td>Tgl Penerimaan</td><td>: '+cleanResult(response.surat[0].TglPenerimaan)+'</td></tr>';
						}	
						if (cleanResult(response.surat[0].AsalSurat) != "") {
							content +=  '<tr><td>Asal Surat</td><td>: '+cleanResult(response.surat[0].AsalSurat)+'</td></tr>';
						}
						if (cleanResult(response.surat[0].unitpengirimsurat) != "") {
							content +=  '<tr><td>Unit Kerja Pengirim</td><td>: '+cleanResult(response.surat[0].unitpengirimsurat)+'</td></tr>';
						}
						if (cleanResult(response.surat[0].DiterimaDariKet) != "") {
							content +=  '<tr><td>Pejabat Pengirim (internal)</td><td>: '+cleanResult(response.surat[0].DiterimaDariKet)+'</td></tr>';
						}
						if (cleanResult(response.surat[0].tujuansurat) != "") {
							content +=  '<tr><td>Tujuan Surat</td><td>: '+cleanResult(response.surat[0].tujuansurat)+'</td></tr>'; 
						}
						if (cleanResult(response.surat[0].tembusansurat) != "") {
							content +=  '<tr><td>Tembusan Surat</td><td>: '+cleanResult(response.surat[0].tembusansurat)+'</td></tr>';
						}
						if (cleanResult(response.surat[0].NoSurat) != "") {
							content +=  '<tr><td>No Surat</td><td>: '+cleanResult(response.surat[0].NoSurat)+'</td></tr>';
						}	
						if (cleanResult(response.surat[0].TglSurat) != "") {
							content +=  '<tr><td>Tgl Surat</td><td>: '+cleanResult(response.surat[0].TglSurat)+'</td></tr>';
						}	
						if (cleanResult(response.surat[0].Lampiran) != "") {
							content +=  '<tr><td>Lampiran</td><td>: '+cleanResult(response.surat[0].Lampiran)+'</td></tr>';
						}
						if (cleanResult(response.surat[0].JenisSurat) != "") {
							content +=  '<tr><td>Jenis Surat</td><td>: '+convertJenisSurat(response.surat[0].JenisSurat)+'</td></tr>';
						}
						if (cleanResult(response.surat[0].penerimaInternal) != "") {
							content +=  '<tr><td>Penerima Internal</td><td>: '+cleanResult(response.surat[0].penerimaInternal)+'</td></tr>'; 
						}
						if (cleanResult(response.surat[0].penerimaExternal) != "") {
							content +=  '<tr><td>Penerima Eksternal</td><td>: '+cleanResult(response.surat[0].penerimaExternal)+'</td></tr>';
						}
						if (cleanResult(response.surat[0].tembusanInternal) != "") {
							content +=  '<tr><td>Tembusan Internal</td><td>: '+cleanResult(response.surat[0].tembusanInternal)+'</td></tr>';
						}
						if (cleanResult(response.surat[0].tembusanExternal) != "") {
							content +=  '<tr><td>Tembusan Eksternal</td><td>: '+cleanResult(response.surat[0].tembusanExternal)+'</td></tr>';
						}
						if (cleanResult(response.surat[0].JenisPenerima) != "") {
							content +=  '<tr><td>Jenis Penerima</td><td>: '+cleanResult(response.surat[0].JenisPenerima)+'</td></tr>';
						}
						if (cleanResult(response.surat[0].pejabatpemberidisposisi) != "") {
							content +=  '<tr><td>Pejabat Pemberi Surat</td><td>: '+cleanResult(response.surat[0].pejabatpemberidisposisi)+'</td></tr>';
						}	
						if (cleanResult(response.surat[0].Perihal) != "") {
							content +=  '<tr><td>Perihal</td><td>: '+cleanResult(response.surat[0].Perihal)+'</td></tr>';
						}
						if (cleanResult(response.surat[0].RingkasanPokok) != "") {
							content +=  '<tr><td>Ringkasan Pokok</td><td>: '+cleanResult(response.surat[0].RingkasanPokok)+'</td></tr>';
						}	
						if (cleanResult(response.surat[0].Keterangan) != "") {
							content +=  '<tr><td>Keterangan</td><td>: '+cleanResult(response.surat[0].Keterangan)+'</td></tr>';
						}
						
						//file
						content +=  '<tr><td colspan="2"> &nbsp; </td></tr>';
						var ext = "";
						var url = "";
						var urldownload = "";
						if (cleanResult(response.surat[0].UrlFileUpload1) != "") {	
							ext = getExt (response.surat[0].UrlFileUpload1);
							if (isDocFile(ext)){
								url = "window.open('http://docs.google.com/viewer?url="+fileDownload+"surat_masuk/" +response.surat[0].UrlFileUpload1+ "', '_blank', 'location=yes');";
							}else{
								url = "window.open('"+fileDownload+"surat_masuk/" +response.surat[0].UrlFileUpload1+ "', '_blank', 'location=yes');";
							}	
							urldownload = "downloadFile('"+fileDownload+"surat_masuk/"+response.surat[0].UrlFileUpload1+"')" ;
							
							content +=  '<tr><td>Scan Surat Asli 1</td><td>: <a href="#" onclick="' +url+ '">Tampilkan file</a>&nbsp;&nbsp;&nbsp; <img src="img/download.png" height="25" onclick="' +urldownload+ '"></td></tr>';
						}
						if (cleanResult(response.surat[0].UrlFileUpload2) != "") {	
							ext = getExt (response.surat[0].UrlFileUpload2);
							if (isDocFile(ext)){
								url = "window.open('http://docs.google.com/viewer?url="+fileDownload+"surat_masuk/" +response.surat[0].UrlFileUpload2+ "', '_blank', 'location=yes');";
							}else{
								url = "window.open('"+fileDownload+"surat_masuk/" +response.surat[0].UrlFileUpload2+ "', '_blank', 'location=yes');";
							}	
							urldownload = "downloadFile('"+fileDownload+"surat_masuk/"+response.surat[0].UrlFileUpload2+"')" ;
							
							content +=  '<tr><td>Scan Surat Asli 2</td><td>: <a href="#" onclick="' +url+ '">Tampilkan file</a>&nbsp;&nbsp;&nbsp; <img src="img/download.png" height="25" onclick="' +urldownload+ '"></td></tr>';
						}
						if (cleanResult(response.surat[0].UrlFileUpload3) != "") {	
							ext = getExt (response.surat[0].UrlFileUpload3);
							if (isDocFile(ext)){
								url = "window.open('http://docs.google.com/viewer?url="+fileDownload+"surat_masuk/" +response.surat[0].UrlFileUpload3+ "', '_blank', 'location=yes');";
							}else{
								url = "window.open('"+fileDownload+"surat_masuk/" +response.surat[0].UrlFileUpload3+ "', '_blank', 'location=yes');";
							}		
							urldownload = "downloadFile('"+fileDownload+"surat_masuk/"+response.surat[0].UrlFileUpload3+"')" ;
							
							content +=  '<tr><td>Scan Surat Asli 3</td><td>: <a href="#" onclick="' +url+ '">Tampilkan file</a>&nbsp;&nbsp;&nbsp; <img src="img/download.png" height="25" onclick="' +urldownload+ '"></td></tr>';
						}
					
						//disposisi
						content +=  '<tr><td colspan="2">&nbsp;<input type="hidden" name="noagenda" value="' +response.surat[0].NoAgenda+ '">'; 
						content +=  '<input type="hidden" name="userid" value="' +idUser+ '">'; 
						content +=  '<input type="hidden" name="nip" value="' +nipUser+ '">'; 
						content +=  '<input type="hidden" name="idmd" value="' +idmduser+ '">'; 
						content +=  '<input type="hidden" name="jmlhdisposisi" value="' +response.disposisi.length+ '">'; 
						content +=  '<input type="hidden" name="jmlhlajurdisposisi" value="' +response.lajurdisposisi.length+ '"></td></tr>'; 
						content +=  '<tr><td>Catatan</td><td><textarea name="catatan" id="catatan" style="width:100%"></textarea></td></tr>';
						content +=  '<tr><td>Sifat</td><td><input type="radio" name="sifat" value="Biasa" checked> Biasa<br>';
						content +=	'<input type="radio" name="sifat" value="Mendesak"> Mendesak<br>';
						content +=	'<input type="radio" name="sifat" value="Perlu Perhatian Khusus"> Perlu Perhatian Khusus<br> ';
						content +=	'<input type="radio" name="sifat" value="Perhatikan Batas Waktu"> Perhatikan Batas Waktu</td></tr>';
						content +=  '<tr><td colspan="2"><b>Diteruskan/Didisposisikan Kepada</b></td></tr>'; 
						for (var i = 0; i < response.disposisi.length; i++) {
							content +=  '<tr><td colspan="2"><input type="checkbox" name="disposisi' +i+ '" value="' +response.disposisi[i].NIP+ '"> ' +response.disposisi[i].Nama+ '(' +response.disposisi[i].NIP+ ') - ' +response.disposisi[i].UraianJabatan+ '<br></td></tr>'; 
						}
											
						content +=  '<tr><td colspan="2"><b>Lajur Disposisi</b></td></tr>'; 
						for (var i = 0; i < response.lajurdisposisi.length; i++) {
							content +=  '<tr><td colspan="2"><input type="checkbox" name="kodelajur' +i+ '" value="' +response.lajurdisposisi[i].kode+ '"> ' +response.lajurdisposisi[i].deskripsi+ '<br></td></tr>'; 
						}
						content +=  '<tr><td colspan="2"><button type="submit" id="gogo" name="gogo" value="disposisi" class="ui-btn ui-btn-inline ui-shadow ui-corner-all">Disposisikan</button></td></tr>'; 
						content +=  '</tbody></table></form>';					
										
						//links
						var link = 'home.html?userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;			//home
						document.getElementById("linkhomeup").href = link ; 
						document.getElementById("linkhomedown").href = link ; 
						link = 'surat_masuk.html?userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;		//back
						document.getElementById("linkbackup").href = link ; 
						document.getElementById("linkbackdown").href = link ; 
						link = 'data_disposisi.html?noagenda='+response.surat[0].NoAgenda+'&userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;			//data disposisi
						document.getElementById("linkdatadisup").href = link ; 
						document.getElementById("linkdatadisdown").href = link ; 
						link = 'progress_disposisi.html?noagenda='+response.surat[0].NoAgenda+'&userid='+idUser+'&nip='+nipUser+'&NmUnitKerja='+NmUnitKerja;		//progress disposisi
						document.getElementById("linkprogessdisup").href = link ; 
						document.getElementById("linkprogessdisdown").href = link ; 
						
						$("#suratdetail").html(content);
						//disposisi berhasil
						if (response.disposisiaction[0].Status == 'Sukses'){
							$("#disposisiresult").html(response.disposisiaction[0].Action);
						}	
					}
		});
	});