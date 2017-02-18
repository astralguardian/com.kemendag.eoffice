var folderName = 'Download';
var fileName = '';

function downloadFile(URL) {
    //step to request a file system 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
    function fileSystemSuccess(fileSystem) {
        var download_link = encodeURI(URL);
		fileName = download_link.substr(download_link.lastIndexOf('/') + 1); //Get filename of URL
		var directoryEntry = fileSystem.root; // to get root path of directory
        directoryEntry.getDirectory(folderName, {
            create: true,
            exclusive: false
        }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
		
//        var fp = fileSystem.root.toURL(); // Returns Fullpath of local directory		3.X
//		var fp = fileSystem.root.toNativeURL(); // Returns Fullpath of local directory		3.X

		var	fp = cordova.file.externalRootDirectory;						//6.X
//		var fp = fileSystem.root.fullPath; // Returns Fullpath of local directory				2.X
		
        fp = fp + "/" + folderName + "/" + fileName; // fullpath and name of the file which we want to give
//		fp = fp + "/" + fileName; // fullpath and name of the file which we want to give
        // download function call
        filetransfer(download_link, fp);
    }

    function onDirectorySuccess(parent) {
        // Directory created successfuly
    }

    function onDirectoryFail(error) {
        //Error while creating directory
        alert("Unable to create new directory: " + error.code);

    }

    function fileSystemFail(evt) {
        //Unable to access file system
        alert(evt.target.error.code);
    }
}

function filetransfer(download_link, fp) {
    var fileTransfer = new FileTransfer();
    // File download function with URL and local path
    fileTransfer.download(download_link, fp,
        function(entry) {
            alert("download complete: " + entry.fullPath);			//ios
			//alert("download complete into folder Download");		//android
        },
        function(error) {
            //Download abort errors or download failed errors
            alert("download error " +error.code+ ", source " + error.source);
        }
    );
}