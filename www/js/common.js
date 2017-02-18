//api global var
var apiPU = "http://eoffice.kemendag.go.id/mobile_services/";
var fileStorage = "http://eoffice.kemendag.go.id/_FileStorage/";
var fileDownload = "http://eoffice.kemendag.go.id/_FileDownload/";
//var apiPU = "http://103.12.84.244/mobile_services/";
//var fileStorage = "http://103.12.84.244/_FileStorage/";
//var fileDownload = "http://103.12.84.244/_FileDownload/";
var timercheck = 60000 ;	//60s

function getURLparam(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
        if (pair[0] == variable) {
			return pair[1];
		}
	}
	return(false);
}

function getURLparamRS(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
        if (pair[0] == variable) {
			return pair[1];
		}
	}
	return("NA");
}

function isSessionOK(username) {
	var currentuser = window.localStorage.getItem("userPU");
	if (username == currentuser){
		return(true);
	}else{
		return(false);
	}
}

function cleanResult (input){
	if (input == undefined) {
		return ("");
	}else{
		return (input.trim());
	}
}

function convertJenisSurat (input){				//TDXSNaskahDinas
	var output = "";
	switch (input) {
		case "B.": output = "Biasa";
			break;
		case "BA.": output = "Berita Acara";
			break;
		case "FX.": output = "Faximile";
			break;
		case "INS.": output = "Instruksi";
			break;
		case "K.": output = "Surat Kuasa";
			break;
		case "KEP.": output = "Keputusan";
			break;
		case "KET.": output = "Surat Keterangan";
			break;
		case "ND.": output = "Nota Dinas";
			break;
		case "PEM.": output = "Pemberitahuan";
			break;
		case "PENG.": output = "Pengumuman";
			break;
		case "PER.": output = "Surat Peringatan";
			break;
		case "RHS.": output = "Rahasia";
			break;
		case "SE.": output = "Surat Edaran";
			break;
		case "SI.": output = "Surat Ijin";
			break;
		case "SKP.": output = "Surat Keterangan Perjalanan Dinas";
			break;
		case "SP.": output = "Surat Perintah";
			break;
		case "SPK.": output = "Surat Perintah Kerja";
			break;
		case "TAR.": output = "Pengantar";
			break;
		case "UND.": output = "Undangan";
			break;
		default: output = "";
	}
	return (output);
}

function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1 ; 		// months are zero indexed
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second ;
}

function isDocFile (fileExt){
	var fileExtDoc = ["doc", "docx", "pdf", "xls", "xlsx", "ppt", "pptx", "zip", "rar", "psd", "txt", "xps", "tif"];
	for (var i = 0; i < fileExtDoc.length; i++) {
		if (fileExtDoc[i] == fileExt) {
			return true;
		}
	}
	return false;
}

function getExt(fileName) {
	fileName = fileName.toLowerCase()
	var fileExt = fileName.substr((fileName.lastIndexOf('.') + 1));
	return fileExt.trim();
}

function checkMail(idUser, nipUser) {
	var tglcp = window.localStorage.getItem("tglcheck");
	var msg = 0;
	$.ajax({
		crossDomain: true,
		cache: false,
		type: "GET",
		url: apiPU+ "api_newmessage.php",
		contentType: "application/json; charset=utf-8",
		dataType: "jsonp",
		jsonpCallback:"jsonppu",
		data: "userid=" + idUser + "&nip=" + nipUser + "&tglcp=" + tglcp,								// send parameters
		success: function(response){
				var tgl = new Date();
				var curr_date = formatDate(tgl);
				window.localStorage.setItem("tglcheck", curr_date);
				msg = response.newmessage;
			}
		});

	return [msg, tglcp];
}

//function notif
//function clearNotification() {
//	window.plugins.statusBarNotification.clear();
//}

function sendNotifWithBeep(message) {
	//beep - vibrate - show - beep
	navigator.notification.beep(1);
    navigator.notification.vibrate(1000);
//	window.plugins.statusBarNotification.notify("Notification", message, Flag.FLAG_AUTO_CANCEL);
	navigator.notification.beep(1);
}

function checkMailFull() {
	var tglcp = window.localStorage.getItem("tglcheck");
	var nipUser = window.localStorage.getItem("nipPU");
	$.ajax({
		crossDomain: true,
		cache: false,
		async: false,
		type: "GET",
		url: apiPU+ "api_newmessage.php",
		contentType: "application/json; charset=utf-8",
		dataType: "jsonp",
		jsonpCallback:"jsonppu",
		data: "nip=" + nipUser + "&tglcp=" + tglcp,								// send parameters
		success: function(response){
				window.localStorage.setItem("tglcheck", response.currenttime);
				if (response.newmessage > 0) {
					sendNotifWithBeep("anda mempunyai surat masuk baru");
				}
			}
		});
}
