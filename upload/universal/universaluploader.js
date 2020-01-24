universalUploader={version:"2.0",FILE_READY:0,FILE_UPLOADING:1,FILE_COMPLETE:2,FILE_STOPPED:3,FILE_ERROR:4,FILE_RESIZE:5,uploaders:[],options:{debug:false,uploaders:"html5, flash, silverlight, html4",showAlertOnError:true,allowRotateImages:false,resizeImages_options:[{width:400,height:400,resizeMode:"fit",filePrefix:""},],imagesPath:"images/",statusIcons:{0:"file_ready.png",1:"file_progress.gif",2:"file_complete.png",3:"file_ready.png",4:"file_error.png"},icons:{add:"add.png",upload:"upload.png",cancel:"cancel.png",clear:"clear.png",remove:"remove.png",file:"file_unknown.png",rotateLeft:"rotateLeft.png",rotateRight:"rotateRight.png"},width:"500",height:"250",postFields_file:"Filedata",postFields_fileName:"fileName",postFields_fileIndex:"fileIndex",postFields_fileId:"FileId",postFields_filePath:"filePath",postFields_fileSize:"fileSize",postFields_filesCount:"filesCount",postFields_uploaderType:"uploaderType",uploaderType:"uploaderType"},translation:{constant_notAvailable:"N/A",constant_bytes:"B",constant_kiloBytes:"KB",constant_megaBytes:"MB",constant_gigaBytes:"GB",constant_decimalSeparator:".",tabheader_classic:"Classic","tabheader_drag-and-drop":"Drag and Drop",tabheader_flash:"Flash",tabheader_silverlight:"Silverlight",tabheader_java:"Java",button_browse:"Browse",button_upload:"Upload",button_cancel:"Cancel",button_clear:"Clear",remove_tooltip:"Remove file",rotate_left_tooltip:"Rotate left",rotate_right_tooltip:"Rotate right",drop_files:"Drop files here!",messages_filesCountExceeded:"Only {51} files are allowed to upload! {50} files were ignored!",messages_fileSizeExceeded:"Only files less than {51} are allowed! {50} files were ignored!",messages_fileSizeNotEnough:"Only files more than {51} are allowed. {50} files were ignored!",messages_totalFileSizeExceeded:"Total size of the files should be less than {51}. {50} files were ignored!",messages_wrongFileType:"Only files with following type: {51} allowed to upload! {50} files were ignored!",messages_disabledType:"File with following types : {51} are not allowed to upload! {50} files were ignored!",messages_foldersNotSupported:"Folders are not supported yet! {50} elements(files) were ignored!",status_ready:"Count of files: {1} ({2})",status_uploading:"Total: {0}% ({3}/{1}) {4}/{2} ({5}/sec, time left: {6}:{7}:{8})",status_complete:"Upload complete! {3} files ({4}/{2}), Elapsed time: {9}:{10}:{11}",status_error:"Error: {12}",status_resize:"Resize images: {0}% ({3}/{1})",status_waitConnection:"Problem with network connection. Waiting for connection restore."},activeTab:"",readyBound:false,filteredImages:[],init:function(b){var a=this;
this.files=[];
this.tabChange=function(d){var g=d.srcElement?d.srcElement.id:this.id;
var f=g.substr(0,g.indexOf("_header"));
if(a.activeTab!=f){var c=document.getElementById("absdiv_"+a.activeTab);
if(c&&c!=null){c.style.visibility="hidden"
}universalUploader.setSelectedTab(a.activeTab,false);
universalUploader.setSelectedTab(f,true);
a.activeTab=f;
a.files=a.uploaders[a.activeTab].getFiles();
a.uploaders[a.activeTab].afterRender();
a.getProgressInfo().reset();
a.drawList_Refresh(a.activeTab);
a.updateStatus()
}};
this.applyGrayFilter=function(g,j,o){if(a.filteredImages[j]){return a.filteredImages[j]
}if(g){try{var d=document.createElement("canvas");
var k=d.getContext("2d");
var n=g.width;
var f=g.height;
d.width=n;
d.height=f;
k.drawImage(g,0,0);
var c=k.getImageData(0,0,n,f);
for(var p=0;
p<c.height;
p++){for(var q=0;
q<c.width;
q++){var h=(p*4)*c.width+q*4;
var l=(c.data[h]+c.data[h+1]+c.data[h+2])/3;
c.data[h]=l;
c.data[h+1]=l;
c.data[h+2]=l
}}k.putImageData(c,0,0,0,0,c.width,c.height);
if(!a.filteredImages[j]){a.filteredImages[j]=d.toDataURL()
}return d.toDataURL()
}catch(m){return o
}}return o
};
this.getCurrentState=function(c){return a.uploaders[c?c:a.activeTab].currentState
};
this.setCurrentState=function(c,d){a.uploaders[c?c:a.activeTab].currentState=d
};
this.uploadButtonHandler=function(){if(a.getCurrentState()==a.FILE_UPLOADING){a.stop()
}else{a.upload()
}};
this.upload=function(){if(a.options.formName){var d=a.getFormFields(a.options.formName),c=0;
for(c=0;
c<d.length;
c++){if(d[c][0]){a.options.postFields[d[c][0]]=d[c][1]
}}}if(b.resizeImages){var e=a.getFiles(a.activeTab);
for(var c=0;
c<e.length;
c++){if(e[c].status==a.FILE_COMPLETE){e[c].status=a.FILE_READY
}}if(a.uploaders[a.activeTab].setResizeParams){a.uploaders[a.activeTab].setResizeParams(a.getResizeParams(a.activeTab))
}}a.uploaders[a.activeTab].upload()
};
this.startUpload=function(){if(a.getCurrentState()!=a.FILE_UPLOADING){a.upload()
}};
this.cancelUpload=function(){a.stop()
};
this.removeAll=function(){a.clearList()
};
this.stop=function(){a.uploaders[a.activeTab].stop();
a.onUploadStop(a.activeTab)
};
this.getProgressInfo=function(c){return a.uploaders[(c==undefined?a.activeTab:c)].progressInfo
};
this.clearList=function(){var d=0;
var c=document.getElementById("clearButton_"+a.activeTab);
if(!c||(c&&c.className.indexOf("uuButtonDisabled")<0)){if(a.getCurrentState()==a.FILE_UPLOADING){a.stop()
}a.uploaders[a.activeTab].clearList()
}};
this.removeFile=function(c,d){if(a.getCurrentState()!=a.FILE_UPLOADING){a.uploaders[a.activeTab].removeFile(c,d);
a.removeListItem(c)
}};
this.removeListItem=function(d){var c=document.getElementById(d+"_listItem");
if(c){c.parentNode.removeChild(c)
}};
this.getFiles=function(c){return a.uploaders[c!=undefined?c:a.activeTab].getFiles()
};
this.getFilesCount=function(c){return a.getFiles(c).length
};
this.getFile=function(){return a.getFiles(arguments[1])[arguments[0]]
};
this.removeFileItem=function(d){var c=this.id.substr(0,this.id.indexOf("_remove"));
a.removeFile(c)
};
this.render=function(e,f){if(!a.isReady||e==true){universalUploader.isReady=true;
var d=document.body;
if(a.options.holder){d=document.getElementById(a.options.holder)
}if(!a.options.customUI){if(f&&document.getElementById("tabs_container")){tabContainer=document.getElementById("tabs_container")
}else{tabContainer=document.createElement("dl");
tabContainer.className="tabs";
tabContainer.id="tabs_container";
d.appendChild(tabContainer)
}}var c=0;
if(a.uploaders){for(key in a.uploaders){if(a.uploaders.hasOwnProperty(key)&&typeof a.uploaders[key]!="function"){if(!a.options.customUI){a.addTabTo(tabContainer,a.uploaders[key],c==0)
}else{a.renderCustomUI(d,a.uploaders[key],c==0)
}c++
}}}if(c>0){a.updateStatus();
if(!e&&!f){a.callEventHandel("Init",true)
}}else{if(!f){a.callEventHandel("Init",false)
}}}};
this.renderCustomUI=function(c,f,d){if(document.getElementById("uu_fileList")){document.getElementById("uu_fileList").innerHTML='#AFTERCONTROLS#<div id="'+f.type+'_fileList" class="fileList'+(f.fileView=="thumbnails"?"Thumbs":"")+'">#INSIDELIST#</div>#AFTERLIST#'
}if(document.getElementById("uu_statusLabel")){document.getElementById("uu_statusLabel").innerHTML='<div id="'+f.type+'_statusLabel" class="uuStatusLabel">Here goes status info</div>'
}if(document.getElementById("uu_progressBar")){document.getElementById("uu_progressBar").innerHTML='<div id="'+f.type+'_progressBar" class="uuProgressBar"><div id="'+f.type+'_progressBarBody" class="uuProgressBarBody"></div></div>'
}if(document.getElementById("uu_controls")){document.getElementById("uu_controls").innerHTML='#BEFORECONTROLS#<div id="controlsContainer_'+f.type+'" class="uuControlsContainer"><a class="uuButton uuClearButton" href="#" id="clearButton_'+f.type+'" onclick="javascript: universalUploader.clearList();"><span><span><img src="'+universalUploader.getIcon("clear")+'"/>'+universalUploader.getTranslatedString("button_clear")+'</span></span></a><a id="browseButton_'+f.type+'" class="uuButton" href="#"><span><span><img src="'+universalUploader.getIcon("add")+'"/>'+universalUploader.getTranslatedString("button_browse")+'</span></span></a>&nbsp;<a class="uuButton" href="#" id="uploadButton_'+f.type+'" onclick="javascript: universalUploader.uploadButtonHandler();"><span><span><img src="'+universalUploader.getIcon("upload")+'"/>'+universalUploader.getTranslatedString("button_upload")+"</span></span></a>#AFTERBUTTONS#</div>"+(document.getElementById("uu_fileList")?"":"#AFTERCONTROLS#")
}var e=c.innerHTML;
if(!document.getElementById("uu_controls")){e=e.replace(a.options.customUI_browseButtonId,"browseButton_"+f.type)
}e=(document.getElementById("uu_controls")?"":"#BEFORECONTROLS##AFTERBUTTONS#")+(document.getElementById("uu_fileList")?"":"#AFTERCONTROLS##INSIDELIST##AFTERLIST#")+e;
e=f.render(e);
a.activeTab=f.type;
c.innerHTML=e;
if(d){f.afterRender()
}if(document.getElementById(f.type+"_fileList")){a.drawList_InitialDraw(f.type)
}};
this.addTabTo=function(d,f,e){if(e){a.activeTab=f.type
}if(!a.options.singleUploader||(a.options.singleUploader&&a.options.renderTabHeader)){tabHeader=document.createElement("dt");
tabHeader.id=f.type+"_header";
tabHeader.innerHTML=this.getTranslatedString("tabheader_"+f.type);
tabHeader.className=e?"selected":"";
a.addEventListener("click",tabHeader,this.tabChange);
d.appendChild(tabHeader)
}tabContents=document.createElement("div");
tabContents.id=f.type+"_content";
tabContents.className="tab-content";
if(a.options.width){tabContents.style.width=100+"%"
}if(a.options.height){tabContents.style.height="300px";
if(a.options.singleUploader&&!a.options.renderTabHeader){tabContents.style.height="250px"
}}var c="#BEFORECONTROLS##AFTERBUTTONS##AFTERCONTROLS#";
if(!f.renderOwnUi){c='#BEFORECONTROLS#<div id="controlsContainer_'+f.type+'" class="uuControlsContainer"><a class="uuButton uuClearButton" href="#" id="clearButton_'+f.type+'" onclick="javascript: universalUploader.clearList();"><span><span><img src="'+universalUploader.getIcon("clear")+'"/>'+universalUploader.getTranslatedString("button_clear")+'</span></span></a><a id="browseButton_'+f.type+'" class="uuButton" href="#"><span><span><img src="'+universalUploader.getIcon("add")+'"/>'+universalUploader.getTranslatedString("button_browse")+'</span></span></a>&nbsp;<a class="uuButton" href="#" id="uploadButton_'+f.type+'" onclick="javascript: universalUploader.uploadButtonHandler();"><span><span><img src="'+universalUploader.getIcon("upload")+'"/>'+universalUploader.getTranslatedString("button_upload")+"</span></span></a>#AFTERBUTTONS#</div>#AFTERCONTROLS#"
}if(!f.renderOwnUi){c+='<div id="'+f.type+'_fileList" class="fileList'+(f.fileView=="thumbnails"?"Thumbs":"")+'">#INSIDELIST#</div>#AFTERLIST#'
}else{c+="#INSIDELIST##AFTERLIST#"
}c=f.render(c);
if(!f.isProgressVisible||(f.isProgressVisible&&f.isProgressVisible())){c+='<div id="'+f.type+'_statusPanel" class="uuStatusContainer"><div id="'+f.type+'_statusLabel" class="uuStatusLabel">Here goes status info</div><div id="'+f.type+'_progressBar" class="uuProgressBar"><div id="'+f.type+'_progressBarBody" class="uuProgressBarBody"></div></div></div>'
}tabContents.innerHTML=c;
tabBody=document.createElement("dd");
tabBody.id=f.type+"_body";
tabBody.className=e?"selected":"";
if(a.options.singleUploader&&!a.options.renderTabHeader){tabBody.className+=" extended"
}tabBody.appendChild(tabContents);
d.appendChild(tabBody);
if(a.options.width){d.style.width="100%"/*a.options.width+"px"*/
}if(a.options.height){d.style.height="300px"/*a.options.height+"px"*/
}if(e){f.afterRender()
}a.drawList_InitialDraw(f.type)
};
this.getWidth=function(c){return parseInt(a.options.width)
};
this.getHeight=function(c){return parseInt(a.options.height)
};
this.setWidth=function(c){a.setSize(c,a.options.height)
};
this.setHeight=function(c){a.setSize(a.options.width,c)
};
this.setSize=function(e,d,g){holder=document.getElementById("tabs_container");
a.options.width=e;
a.options.height=d;
if(a.options.width){holder.style.width="100%"
}if(a.options.height){holder.style.height="300px"
}if(a.uploaders){for(key in a.uploaders){if(a.uploaders.hasOwnProperty(key)&&typeof a.uploaders[key]!="function"){var h=document.getElementById(a.uploaders[key].type+"_content");
var c=document.getElementById(a.uploaders[key].type+"_listItemsHolder"),f=document.getElementById(a.uploaders[key].type+"_fileList");
if(a.options.width){h.style.width=(a.options.width-22>0?a.options.width-22:1)+"px"
}if(a.options.height){h.style.height=(a.options.height-52>0?a.options.height-52:1)+"px";
f.style.height=Number(a.options.height-115>0?a.options.height-115:1)+"px";
if(a.options.singleUploader&&!a.options.renderTabHeader){h.style.height=(a.options.height-32>0?a.options.height-32:1)+"px";
f.style.height=Number(a.options.height-95>0?a.options.height-95:1)+"px"
}c.style.height=f.style.height
}if(g){a.drawList_Redraw(a.uploaders[key].type)
}}}}};
this.addAllUploaders=function(){a.addUploader(universalUploader.Html4);
a.addUploader(universalUploader.Html5);
a.addUploader(universalUploader.Flash);
a.addUploader(universalUploader.Silverlight);
a.addUploader(universalUploader.Java)
};
this.matchFeatures=function(d){if(a.options.features){for(var c=0;
c<a.options.features.length;
c++){if(!d.features[a.options.features[c]]){return false
}}}return true
};
this.addUploader=function(c){if(c&&c.available){a.uploaders[c.type]=c
}};
this.getTranslatedString=function(c){return a.translation[c]
};
this.getFileStat=function(){var c=[a.files.length,0,0,0];
for(i=0;
i<a.files.length;
i++){c[1]+=a.files[i].size>0?a.files[i].size:0;
if(a.files[i].status==a.FILE_COMPLETE){c[2]++;
c[3]+=a.files[i].size>0?a.files[i].size:0
}}return c
};
this.bindEventListener=function(c,d){if(a.options){a.options.handlers[c]=d
}};
this.unbindEventListener=function(c){if(a.options&&a.options.handlers[c]){a.options.handlers[c]=null;
delete a.options.handlers[c]
}};
this.callEventHandel=function(c){if(a.options&&a.options.handlers[c]&&typeof a.options.handlers[c]=="function"){var f=[];
for(var d=1;
d<arguments.length;
d++){f.push(arguments[d])
}try{return a.options.handlers[c].apply(this,f)
}catch(g){universalUploader.debug(g)
}return null
}};
this.onAddFiles=function(c,d){if(a.getCurrentState(c)!=a.FILE_UPLOADING){a.setCurrentState(c,a.FILE_READY)
}a.files=a.getFiles(a.activeTab);
if(c==a.activeTab){for(i=0;
i<d.length;
i++){a.drawList_AddFile(d[i])
}}if(a.getCurrentState(c)!=a.FILE_UPLOADING){a.getProgressInfo(c).reset()
}else{a.getProgressInfo(c).resetStat()
}if(c==a.activeTab){a.updateStatus()
}a.callEventHandel("FilesAdded",c,d);
if(a.options.autoStart){a.startUpload()
}};
this.onRemoveFile=function(e,c,f){a.removeListItem(c);
a.setCurrentState(e,a.FILE_READY);
var d=a.getFile(c,e);
if(d){a.getProgressInfo(e).totalFiles--;
if(d.size>0){a.getProgressInfo(e).totalSize-=d.size
}if(d.status==universalUploader.FILE_COMPLETE){a.getProgressInfo(e).uploadedFiles--;
if(d.size>0){a.getProgressInfo(e).uploadedSize-=d.size
}}}if(e==a.activeTab){a.updateStatus()
}if(!f){a.callEventHandel("FilesRemoved",e,[d])
}};
this.onClearList=function(c){var d=a.getFiles(c);
if(d.length>0){a.callEventHandel("FilesRemoved",c,d)
}};
this.onImageLoaded=function(f,c,g,d){var e=a.getFile(c,f);
if(e&&(!a.uploaders[f].features||(a.uploaders[f].features&&a.uploaders[f].features.imagesPreview))){e.status=universalUploader.FILE_READY;
e.image.loaded=true;
if(!d){universalUploader.debug("image loaded "+g.length);
a.resizeImageForPreview(f,c,g);
a.callEventHandel("ImageLoaded",f,e)
}else{e.image.data=g;
a.drawList_RedrawFile(f,e)
}}if(f==a.activeTab){a.updateStatus()
}};
this.onImageRotated=function(e,c,f){var d=a.getFile(c,e);
if(d){a.drawList_RedrawFile(e,d,f);
a.callEventHandel("ImageRotated",e,d)
}if(e==a.activeTab){a.updateStatus()
}};
this.onResizeImagesStart=function(c){a.setCurrentState(c,a.FILE_RESIZE);
if(a.uploaders[c].currentResizeCycle==0){a.getProgressInfo(c).reset();
a.getProgressInfo(c).totalSize=-1
}a.getProgressInfo(c).undeterminated=true;
if(c==a.activeTab){a.updateStatus()
}a.callEventHandel("ResizeImagesStart",c)
};
this.onResizeImagesComplete=function(c){a.setCurrentState(c,a.FILE_READY);
a.getProgressInfo(c).reset(a.uploaders[c].currentResizeCycle!=0);
a.getProgressInfo(c).undeterminated=false;
universalUploader.debug("onResizeImagesComplete "+a.getProgressInfo(c).weights.length);
if(c==a.activeTab){a.updateStatus()
}a.callEventHandel("ResizeImagesComplete",c)
};
this.onResizeImagesProgress=function(c,f,e,d){a.setCurrentState(c,a.FILE_RESIZE);
a.getProgressInfo(c).totalFiles=e;
a.getProgressInfo(c).uploadedFiles=f;
universalUploader.debug("totalsize is "+a.getProgressInfo(c).totalSize);
if(c==a.activeTab){a.updateStatus()
}a.callEventHandel("ResizeImagesProgress",c,f,e,d)
};
this.onError=function(c,d){if(a.options.showAlertOnError){a.showAlert(d)
}a.getProgressInfo(c).lastError=d;
a.callEventHandel("Error",c,d)
};
this.onUploadStart=function(c){if(a.setCurrentState(c)!=a.FILE_RESIZE){a.setCurrentState(c,a.FILE_UPLOADING);
if(!a.options.resizeImages){a.getProgressInfo(c).reset()
}}if(c==a.activeTab){a.updateStatus()
}a.drawList_Refresh(c);
a.callEventHandel("UploadStart",c)
};
this.onUploadComplete=function(d){if(b.resizeImages){a.uploaders[d].currentResizeCycle++
}if(a.getCurrentState(d)==a.FILE_ERROR||!b.resizeImages||(b.resizeImages&&a.uploaders[d].currentResizeCycle>=a.resizeCycles)){a.setCurrentState(d,a.FILE_COMPLETE);
if(d==a.activeTab){a.updateStatus()
}a.drawList_Refresh(d);
a.callEventHandel("UploadComplete",d);
a.uploaders[d].currentResizeCycle=0;
if(a.options.redirectUrl){window.location=a.options.redirectUrl
}}else{var e=a.getFiles(d);
for(var c=0;
c<e.length;
c++){e[c].status=a.FILE_READY
}a.upload(d)
}};
this.onUploadStop=function(c){a.getProgressInfo(c).stopTime=new Date();
if(a.getCurrentState(c)!=a.FILE_ERROR){a.setCurrentState(c,a.FILE_READY);
if(c==a.activeTab){a.updateStatus()
}}a.drawList_Refresh(c);
a.callEventHandel("UploadStop",c)
};
this.onFileUploadStart=function(e,c){a.setCurrentState(e,a.FILE_UPLOADING);
var d=a.getFile(c,e);
a.getProgressInfo(e).lastBytes=0;
if(d){d.status=universalUploader.FILE_UPLOADING;
d.bytesLoaded=0;
d.error="";
a.drawList_RedrawFile(e,d)
}if(e==a.activeTab){a.updateStatus()
}a.callEventHandel("FileUploadStart",e,d)
};
this.onFileUploadProgress=function(f,c,d){if(a.getCurrentState(f)!=a.FILE_STOPPED){a.setCurrentState(f,a.FILE_UPLOADING)
}var e=a.getFile(c,f);
if(e){e.bytesLoaded=d;
a.drawList_RedrawFile(f,e)
}a.getProgressInfo(f).onProgress(d);
if(f==a.activeTab){a.updateStatus()
}a.callEventHandel("UploadProgress",f,e,a.getProgressInfo(f))
};
this.onFileUploadError=function(f,d,c,g){a.setCurrentState(f,a.FILE_ERROR);
a.stop(f);
var e=a.getFile(d,f);
if(e){e.status=universalUploader.FILE_ERROR;
e.bytesLoaded=0;
e.error=c+". "+g+".";
a.drawList_RedrawFile(f,e)
}a.getProgressInfo(f).lastError=g;
if(f==a.activeTab){a.updateStatus()
}a.callEventHandel("FileUploadError",f,e,c,g);
a.callEventHandel("Error",f,g)
};
this.onFileUploadStop=function(e,c){var d=a.getFile(c,e);
if(d){if(a.getCurrentState(e)!=universalUploader.FILE_ERROR){d.status=universalUploader.FILE_STOPPED
}d.bytesLoaded=0;
d.error="";
a.drawList_RedrawFile(e,d)
}a.onUploadStop(e);
a.callEventHandel("FileUploadStop",e,d)
};
this.onFileUploadComplete=function(f,c,d){var e=a.getFile(c,f);
a.getProgressInfo(f).uploadedFiles++;
if(e){e.serverResponse=d;
if(a.getCurrentState(f)!=universalUploader.FILE_ERROR){e.status=universalUploader.FILE_COMPLETE
}e.bytesLoaded=e.size;
e.error="";
a.onFileUploadProgress(f,c,e.size)
}if(f==a.activeTab){a.updateStatus()
}a.callEventHandel("FileUploadComplete",f,e,d)
};
this.getFileStateIcon=function(c){return a.options.imagesPath+a.options.statusIcons[c]
};
this.getIcon=function(c){return a.options.imagesPath+a.options.icons[c]
};
this.drawList_InitialDraw=function(d){if(d){var e=document.getElementById(d+"_fileList");
if(e){e.innerHtml="";
var c=document.createElement("ul");
c.id=d+"_listItemsHolder";
c.className="listItemsHolder";
e.style.height=(a.options.height-115)+"px";
if(a.options.singleUploader&&!a.options.renderTabHeader){e.style.height=Number(a.options.height-95>0?a.options.height-95:1)+"px"
}c.style.height=e.style.height;
e.appendChild(c)
}}};
this.drawList_Redraw=function(c){if(!c){c=a.activeTab
}if(c){var e=document.getElementById(c+"_listItemsHolder");
if(e){e.innerHtml="";
while(e.hasChildNodes()){e.removeChild(e.lastChild)
}var d=a.getFiles(c);
for(i=0;
i<d.length;
i++){a.drawList_AddFile(d[i])
}}}};
this.setButtonsStates=function(e){var c=!(a.getCurrentState(e)==a.FILE_UPLOADING);
a.setButtonState(e,"clearButton_","clear",c);
var d=document.getElementById("uploadButton_"+a.activeTab);
if(d){if(c){d.innerHTML='<span><span><img src="'+universalUploader.getIcon("upload")+'"/>'+a.getTranslatedString("button_upload")+"</span></span>"
}else{d.innerHTML='<span><span><img src="'+universalUploader.getIcon("cancel")+'"/>'+a.getTranslatedString("button_cancel")+"</span></span>"
}}};
this.setButtonState=function(c,f,e,d){if(!a.options.customUI){if(d){a.setButtonEnabled(c,f,e)
}else{a.setButtonDisabled(c,f,e)
}}};
this.setButtonEnabled=function(f,h,g){var d=document.getElementById(h+f);
if(d&&d.className.indexOf("uuButtonDisabled")>=0){a.removeClass(d,"uuButtonDisabled");
var c=d.getElementsByTagName("img");
for(var e=0;
c[e];
e++){c[e].src=universalUploader.getIcon(g)
}}};
this.setButtonDisabled=function(f,h,g){var d=document.getElementById(h+f);
if(d&&d.className.indexOf("uuButtonDisabled")<0){a.addClass(d,"uuButtonDisabled");
var c=d.getElementsByTagName("img");
for(var e=0;
c[e];
e++){c[e].src=universalUploader.applyGrayFilter(c[e],h,universalUploader.getIcon(g))
}}};
this.drawList_Refresh=function(c){if(!c){c=a.activeTab
}if(c){a.setButtonsStates(c);
var e=document.getElementById(c+"_listItemsHolder");
if(e){var d=a.getFiles(c);
for(i=0;
i<d.length;
i++){a.drawList_RedrawFile(c,d[i])
}}}};
this.drawList_AddFile=function(e){if(a.activeTab){var n=document.getElementById(a.activeTab+"_listItemsHolder");
if(n){var s=(a.options.fileView&&a.options.fileView.toLowerCase()=="thumbnails"?"Thumbs":"");
var c=n.offsetWidth;
var q=document.createElement("li");
q.id=e.id+"_listItem";
q.className="listItem"+s;
var d=null;
if(s=="Thumbs"){q.style.width=a.options.thumbnailView_width+"px";
q.style.height=a.options.thumbnailView_height+"px";
d=document.createElement("div");
d.id=e.id+"_bottomPanel";
d.className="bottomPanel"+s;
d.style.width=(a.options.thumbnailView_width)+"px";
q.appendChild(d);
if(a.isRotateSupported()&&a.options.allowRotateImages&&e.isValidImage()&&(!a.uploaders[a.activeTab].features||(a.uploaders[a.activeTab].features&&a.uploaders[a.activeTab].features.resizeImages))){var p=document.createElement("div");
p.id=e.id+"_topPanel";
p.className="topPanel"+s;
p.style.width=(a.options.thumbnailView_width)+"px";
q.appendChild(p);
var r=document.createElement("div");
r.id=e.id+"_rotateLeft";
r.className="rotateLeft";
r.innerHTML='<img title="'+a.getTranslatedString("rotate_left_tooltip")+'" src="'+a.getIcon("rotateLeft")+'" onClick="javascript: universalUploader.rotateImage(\''+e.id+"', -90)\">";
p.appendChild(r);
var t=document.createElement("div");
t.id=e.id+"_rotateRight";
t.className="rotateRight";
t.innerHTML='<img title="'+a.getTranslatedString("rotate_right_tooltip")+'" src="'+a.getIcon("rotateRight")+'" onClick="javascript: universalUploader.rotateImage(\''+e.id+"', 90)\">";
p.appendChild(t);
var o=document.createElement("div");
o.id=e.id+"_fileSpacerTop";
o.className="fileName";
o.innerHTML="&nbsp;";
o.style.width=(a.options.thumbnailView_width-45)+"px";
p.appendChild(o)
}var m=document.createElement("div");
m.id=e.id+"imgHolder";
m.className="imgHolder";
m.style.height=a.options.thumbnailView_height+"px";
m.style.width=a.options.thumbnailView_width+"px";
q.appendChild(m);
var h=document.createElement("img");
h.id=e.id+"_fileThumb";
h.className="fileThumb";
h.src=a.getIcon("file");
if(e.isValidImage()&&a.uploaders[a.activeTab].features&&a.uploaders[a.activeTab].features.imagesPreview&&a.uploaders[a.activeTab].loadImage){if(!e.image.loaded){h.src=a.getFileStateIcon(1);
a.uploaders[a.activeTab].loadImage(e.id)
}else{h.src=e.image.data
}}h.style.maxHeight=a.options.thumbnailView_height+"px";
h.style.maxWidth=a.options.thumbnailView_width+"px";
m.appendChild(h)
}var k=document.createElement("div");
k.id=e.id+"_fileState";
k.className="fileState";
k.innerHTML='<img src="'+a.getFileStateIcon(e.status)+'">';
if(s=="Thumbs"){d.appendChild(k)
}else{q.appendChild(k)
}var g=document.createElement("div");
g.id=e.id+"_fileName";
g.className="fileName";
if(s!="Thumbs"){g.style.width=(c-162)+"px"
}else{g.style.width=(a.options.thumbnailView_width-45)+"px"
}g.innerHTML="<span>"+e.name+"</span>";
if(s=="Thumbs"){d.appendChild(g)
}else{q.appendChild(g)
}var j=document.createElement("div");
j.id=e.id+"_fileRemove";
j.className="fileRemove";
if(e.status==a.FILE_UPLOADING||a.getCurrentState()==a.FILE_UPLOADING){j.innerHTML='<img id="_rmIcon" title="'+a.getTranslatedString("remove_tooltip")+'" src="'+universalUploader.applyGrayFilter(document.getElementById("_rmIcon"),"rmIcon",universalUploader.getIcon("remove"))+'" >'
}else{j.innerHTML='<img id="_rmIcon" title="'+a.getTranslatedString("remove_tooltip")+'" src="'+universalUploader.getIcon("remove")+'" onClick="javascript: universalUploader.removeFile(\''+e.id+"')\">"
}if(s=="Thumbs"){d.appendChild(j)
}else{q.appendChild(j)
}if(s!="Thumbs"){var f=document.createElement("div");
f.id=e.id+"_fileSize";
f.className="fileSize"+s;
f.innerHTML=a.formatBytes(e.size,1);
q.appendChild(f);
var l=document.createElement("div");
l.id=e.id+"_fileStatus";
l.className="fileStatus"+s;
l.innerHTML=e.getPercent()+"%";
q.appendChild(l)
}var o=document.createElement("div");
o.id=e.id+"_fileSpacer";
o.className="fileSpacer";
o.innerHTML="&nbsp;";
if(s=="Thumbs"){d.appendChild(o)
}else{q.appendChild(o)
}n.appendChild(q)
}}};
this.drawList_RedrawFile=function(m,c,g){if(m==a.activeTab){var l=document.getElementById(a.activeTab+"_listItemsHolder");
var d=document.getElementById(c.id+"_listItem");
if(l&&d&&d.offsetTop>d.offsetHeight){l.scrollTop=d.offsetTop-d.offsetHeight
}var j=document.getElementById(c.id+"_fileStatus");
if(j){j.innerHTML=c.getPercent()+"%"
}var h=document.getElementById(c.id+"_fileState");
var n='<img src="'+a.getFileStateIcon(c.status)+'">';
if(h&&h.innerHTML!=n){h.innerHTML=n
}var f=document.getElementById(c.id+"_fileRemove");
if(f){if(c.status==a.FILE_UPLOADING||a.getCurrentState()==a.FILE_UPLOADING){f.innerHTML='<img id="_rmIcon" title="'+a.getTranslatedString("remove_tooltip")+'" src="'+universalUploader.applyGrayFilter(document.getElementById("_rmIcon"),"rmIcon",universalUploader.getIcon("remove"))+'" >'
}else{f.innerHTML='<img id="_rmIcon" title="'+a.getTranslatedString("remove_tooltip")+'" src="'+universalUploader.getIcon("remove")+'" onClick="javascript: universalUploader.removeFile(\''+c.id+"')\">"
}}var e=document.getElementById(c.id+"_fileThumb");
if(e&&l&&d){var k=document.getElementById(c.id+"_topPanel");
if(c.isValidImage()&&c.image.loaded){e.src=g?g:c.image.data
}else{e.src=a.getIcon("file");
if(k){k.style.visibility="hidden"
}}e.removeAttribute("width",0);
e.removeAttribute("height",0)
}}};
this.updateStatus=function(){var d=document.getElementById(a.activeTab+"_progressBarBody");
if(d){d.style.width=a.getProgressInfo().getTotalPercent()+"%"
}var c=document.getElementById(a.activeTab+"_statusLabel");
if(c){switch(a.getCurrentState()){case a.FILE_READY:c.innerHTML=a.getProgressInfo().replacePlaceHolders(a.getTranslatedString("status_ready"));
break;
case a.FILE_UPLOADING:c.innerHTML=a.getProgressInfo().replacePlaceHolders(a.getTranslatedString("status_uploading"));
break;
case a.FILE_COMPLETE:c.innerHTML=a.getProgressInfo().replacePlaceHolders(a.getTranslatedString("status_complete"));
break;
case a.FILE_ERROR:c.innerHTML=a.getProgressInfo().replacePlaceHolders(a.getTranslatedString("status_error"));
break;
case a.FILE_RESIZE:c.innerHTML=a.getProgressInfo().replacePlaceHolders(a.getTranslatedString("status_resize"));
break
}}};
this.getCoordinates=function(f){var e=f,d=0,h=0,g;
while(e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop)){g=isNaN(window.globalStorage)?0:window.getComputedStyle(e,null);
d+=e.offsetLeft-e.scrollLeft+(g?parseInt(g.getPropertyValue("border-left-width"),10):0);
h+=e.offsetTop-e.scrollTop+(g?parseInt(g.getPropertyValue("border-top-width"),10):0);
e=e.offsetParent
}return{x:f.X=d,y:f.Y=h}
};
this.positionFormUnderButton=function(n,f,m){if(n&&f){var j=universalUploader.getCoordinates(n);
f.style.zIndex=999;
f.style.position="absolute";
f.style.width=n.offsetWidth+"px";
f.style.height=n.offsetHeight+"px";
f.style.overflowX="hidden";
f.style.overflowY="hidden";
var c=j.y;
var e=j.x;
f.style.top=c+"px";
f.style.left=e+"px"
}if(m){var l=function(o){m.click();
try{if(o.preventDefault){o.preventDefault()
}if(o.stopPropagation){o.stopPropagation()
}if(window.event){window.event.returnValue=false
}if(o.stopEvent){o.stopEvent()
}}catch(p){}};
var g=function(o){universalUploader.addClass(n,"uuButtonHover")
},d=function(o){universalUploader.removeClass(n,"uuButtonHover")
},k=function(o){universalUploader.addClass(n,"uuButtonActive")
},h=function(o){universalUploader.removeClass(n,"uuButtonActive")
};
universalUploader.removeEventListener("click",n,l);
universalUploader.addEventListener("click",n,l);
universalUploader.removeEventListener("mouseover",m,g);
universalUploader.addEventListener("mouseover",m,g);
universalUploader.removeEventListener("mouseout",m,d);
universalUploader.addEventListener("mouseout",m,d);
universalUploader.removeEventListener("mousedown",m,k);
universalUploader.addEventListener("mousedown",m,k);
universalUploader.removeEventListener("mouseup",m,h);
universalUploader.addEventListener("mouseup",m,h)
}};
this.rotateImage=function(e,d){var c=a.getFile(e,a.activeTab);
c.image.rotation+=d;
if(c.image.rotation<0){c.image.rotation+=360
}if(c.image.rotation>=360){c.image.rotation-=360
}a.animateRotation(e,c.image.rotation,d);
if(a.uploaders[a.activeTab].rotateImage){a.uploaders[a.activeTab].rotateImage(e,c.image.rotation)
}};
this.animateRotation=function(j,h,g){var f=h-g;
var c=document.getElementById(j+"_fileThumb");
var e=setInterval(function(){if((g>0&&f>h)||(g<0&&f<h)){clearInterval(e)
}else{c.style.msTransform="rotate("+f+"deg)";
c.style.transform="rotate("+f+"deg)";
c.style["-webkit-transform"]="rotate("+f+"deg)";
c.style["-moz-transform"]="rotate("+f+"deg)";
c.style["-o-transform"]="rotate("+f+"deg)";
c.style["-ms-transform"]="rotate("+f+"deg)";
c.style["-sand-transform"]="rotate("+f+"deg)";
if(g>0){f+=2
}else{f-=2
}}},5)
};
this.resizeImageForPreview=function(d,f,e,c){return a.resizeImage("preview",d,f,e,a.options.thumbnailView_width,a.options.thumbnailView_height,c)
};
this.resizeImage=function(o,u,j,m,d,r,k,t,s,c){var l=new Image();
var q=d;
var p=r;
var f=document.getElementById("universaluploadercanvas");
var g=a.getFile(j,u);
var h=g?g.image.rotation:0;
if(!f){try{f=document.createElement("canvas");
f.id="universaluploadercanvas"
}catch(n){universalUploader.debug("canvas could not be created")
}}if(h==90||h==270){q=r;
p=d
}l.onload=function(){var L=null;
try{L=f.getContext("2d")
}catch(H){universalUploader.debug("getContext is nor supported on canvas")
}if(L==null){if(o=="preview"){l.width=q;
l.height=p
}universalUploader.onImageLoaded(u,j,o!="preview"?null:l.src,true)
}else{var v=document.createElement("canvas");
var I=1;
var J=l.width;
var F=l.height;
var z=o=="preview"?"fit":t?t.toLowerCase():"fit";
if(z=="fitbywidth"||(z=="fit"&&J>q&&J/F>1)){I=q/J
}if(z=="fitbyheight"||(z=="fit"&&F>p)){I=p/F
}v.width=l.width;
v.height=l.height;
while(v.width>6826||v.height>6826){v.width=v.width/2;
v.height=v.height/2
}var A=v.getContext("2d");
A.drawImage(l,0,0,v.width,v.height);
while(v.width/2>J*I&&v.height/2>F*I){var y=document.createElement("canvas");
y.width=v.width/2;
y.height=v.height/2;
var G=y.getContext("2d");
G.drawImage(v,0,0,y.width,y.height);
v=y
}var C=J*I,K=F*I;
var D=0,B=0;
switch(h){case 90:B=K*(-1);
C=K;
K=J*I;
break;
case 180:D=C*(-1);
B=K*(-1);
break;
case 270:D=C*(-1);
C=K;
K=J*I;
break
}f.width=C;
f.height=K;
L.rotate(h*Math.PI/180);
L.translate(D,B);
L.drawImage(v,0,0,v.width,v.height,0,0,J*I,F*I);
if(o=="preview"){if(k){universalUploader.onImageRotated(u,j,f.toDataURL("image/png"))
}else{universalUploader.onImageLoaded(u,j,f.toDataURL("image/png"),true)
}}else{var E=null;
var x=c?"image/"+c:"image/jpeg";
try{if(x=="image/jpeg"&&s){E=f.toDataURL(x,s/100)
}else{E=f.toDataURL(x)
}}catch(H){E=f.toDataURL(x)
}a.uploaders[u].onImageResized(j,E,true)
}}l.onload=null;
l.onerror=null;
if(f.parentNode){f.parentNode.removeChild(f)
}};
l.onerror=function(){l.onload=null;
l.onerror=null;
var e=a.getFile(j,u);
universalUploader.debug("image load error "+e.name+" type "+o);
if(e){e.image.loadErrors=true
}if(o=="preview"){if(k){universalUploader.onImageRotated(u,j,null)
}else{universalUploader.onImageLoaded(u,j,null,true)
}}else{a.uploaders[u].onImageResized(j,null,true)
}if(f.parentNode){f.parentNode.removeChild(f)
}};
l.src=m?m.replace("data:base64","data:image/jpeg;base64"):""
};
this.formatBytes=function(d,e){var f=a.getTranslatedString("constant_decimalSeparator");
f=f?f:".";
var c=e==true?1:0;
if(d<0){return a.getTranslatedString("constant_notAvailable")
}if(d<1024){return a.formatNumber(d,c,f)+" "+a.getTranslatedString("constant_bytes")
}if(d>=1024&&d/1024<1024){return a.formatNumber(d/1024,c,f)+" "+a.getTranslatedString("constant_kiloBytes")
}if(d/1024>=1024&&d/1024/1024<1024){return a.formatNumber(d/1024/1024,c,f)+" "+a.getTranslatedString("constant_megaBytes")
}if(d/1024/1024>=1024){return a.formatNumber(d/1024/1024/1024,c,f)+" "+a.getTranslatedString("constant_gigaBytes")
}return d+" "+a.getTranslatedString("constant_bytes")
};
this.isExtensionInArray=function(f,e){var d=0,c="";
d=f.lastIndexOf(".");
if(d>=0){c=f.substring(d+1).toLowerCase();
if(e.indexOf(c)>=0||e==undefined||e.length==0){return true
}return false
}return false
};
this.getExtension=function(e){var d=0,c="";
d=e.lastIndexOf(".");
if(d>=0){return e.substring(d+1)
}return""
};
this.isValidFile=function(g,f,d,c){try{if(a.options.fileFilter_ignoreFolders&&c&&!g.type&&(g.size%4096==0&&g.size<=102400||g.size<0)){return 11
}else{if(a.options.fileFilter_maxSize!=-1&&g.size>=0&&g.size>a.options.fileFilter_maxSize){return 4
}else{if(a.options.fileFilter_maxTotalSize!=-1&&(a.getProgressInfo().totalSize+d+g.size)>a.options.fileFilter_maxTotalSize){return 7
}else{if(a.options.fileFilter_types&&!a.isExtensionInArray(g.name,a.options.fileFilter_types.split(","))){return 8
}else{if(a.options.fileFilter_minSize!=-1&&g.size>=0&&g.size<a.options.fileFilter_minSize){return 9
}else{if(a.options.fileFilter_disabledTypes&&a.isExtensionInArray(g.name,a.options.fileFilter_disabledTypes.split(","))){return 10
}else{if(a.options.fileFilter_maxCount!=-1&&(a.files.length+f.length+1)>a.options.fileFilter_maxCount){return 2
}}}}}}}}catch(h){return -1
}return -1
};
this.displayResultOfAdd=function(d){var c=0;
for(c=2;
c<d.length;
c++){if(d[c]>0){switch(c){case 2:a.onError(a.activeTab,a.replaceMessagesPlaceHolders(a.getTranslatedString("messages_filesCountExceeded"),a.options.fileFilter_maxCount,d[c]));
break;
case 4:a.onError(a.activeTab,a.replaceMessagesPlaceHolders(a.getTranslatedString("messages_fileSizeExceeded"),a.formatBytes(a.options.fileFilter_maxSize,1),d[c]));
break;
case 7:a.onError(a.activeTab,a.replaceMessagesPlaceHolders(a.getTranslatedString("messages_totalFileSizeExceeded"),a.formatBytes(a.options.fileFilter_maxTotalSize,1),d[c]));
break;
case 8:a.onError(a.activeTab,a.replaceMessagesPlaceHolders(a.getTranslatedString("messages_wrongFileType"),a.options.fileFilter_types,d[c]));
break;
case 9:a.onError(a.activeTab,a.replaceMessagesPlaceHolders(a.getTranslatedString("messages_fileSizeNotEnough"),a.formatBytes(a.options.fileFilter_minSize,1),d[c]));
break;
case 10:a.onError(a.activeTab,a.replaceMessagesPlaceHolders(a.getTranslatedString("messages_disabledType"),a.options.fileFilter_disabledTypes,d[c]));
case 11:a.onError(a.activeTab,a.replaceMessagesPlaceHolders(a.getTranslatedString("messages_foldersNotSupported"),null,d[c]));
break
}}}};
this.replaceMessagesPlaceHolders=function(e,f,d){var c=e.replace(/\{50\}/g,d);
c=c.replace(/\{51\}/g,f);
return c
};
this.showAlert=function(c){setTimeout(function(){alert(c)
},1)
};
this.base64ToBlob=function(g){var j=window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder||window.BlobBuilder;
var f=window.Blob;
universalUploader.debug("BlobBuilder "+j+" Blob "+f);
if(typeof j==="undefined"&&typeof f==="undefined"||!g){return g
}var e=g;
if(g.indexOf(",")>=0){if(g.split(",")[0].indexOf("base64")>=0){e=atob(g.split(",")[1])
}else{e=unescape(g.split(",")[1])
}}var d=g.split(",")[0].split(":")[1].split(";")[0];
var l=new ArrayBuffer(e.length);
var c=new Uint8Array(l);
for(var h=0;
h<e.length;
h++){c[h]=e.charCodeAt(h)
}universalUploader.debug("mimeString "+d);
if(typeof j!="undefined"){var k=new j();
k.append(l);
return k.getBlob(d)
}if(typeof f!="undefined"){return new f([l],{type:d})
}};
this.resizeCycles=0;
this.initOptions=function(c){if(!c.handlers){c.handlers={}
}if(c.customUI){c.singleUploader=true;
c.renderTabHeader=false
}if(c.resizeImages&&c.resizeImages_options){if(c.resizeImages_options instanceof Array){a.resizeCycles=c.resizeImages_options.length
}else{if(typeof(c.resizeImages_options)=="object"){a.resizeCycles=1
}}}if(c.fileView=="thumbnails"){if(!c.thumbnailView_width){a.options.thumbnailView_width=120
}if(!c.thumbnailView_height){a.options.thumbnailView_height=120
}}for(key in c){if(c.hasOwnProperty(key)){a.options[key]=c[key]
}}if(!a.options.features){a.options.features=new Array()
}if(a.options.hasOwnProperty("chunkedUpload")&&a.options.chunkedUpload==true){a.options.features.push("chunkedUpload")
}if(a.options.hasOwnProperty("resizeImages")&&a.options.resizeImages==true){a.options.features.push("resizeImages")
}if(a.options.hasOwnProperty("amazonS3")){a.options.features.push("amazonS3")
}a.options.url=a.getAbsoluteUrl(a.options.url)
};
this.setParameter=function(c,d){var e={};
e[c]=d;
a.initOptions(a.extend(a.options,e));
for(key in a.uploaders){if(a.uploaders[key].setParameters){a.uploaders[key].setParameters(a.options)
}}a.applyParam(c)
};
this.getParameter=function(c){return a.options[c]
};
this.applyParam=function(d){switch(d){case"fileView":var c=document.getElementById(a.uploaders[a.activeTab].type+"_fileList");
if(c){c.className="fileList"+(a.options.fileView=="thumbnails"?"Thumbs":"")
}a.drawList_Redraw(a.activeTab);
break;
case"thumbnailView_width":case"thumbnailView_height":a.drawList_Redraw(a.activeTab);
break;
case"customUI":case"renderTabHeader":a.render(true,true);
break
}};
this.getResizeParams=function(c){var d={};
if(b.resizeImages&&b.resizeImages_options){if(b.resizeImages_options instanceof Array){d=b.resizeImages_options[a.uploaders[c].currentResizeCycle]
}else{d=b.resizeImages_options
}}if(!d.quality){d.quality=100
}if(!d.format){d.format="jpeg"
}if(d.format.toLowerCase()=="jpg"){d.format="jpeg"
}else{d.format=d.format.toLowerCase()
}return d
};
this.initOptions(b);
this.addAllUploaders();
if(this.options.uploaders){upls=this.options.uploaders.toLowerCase().trim();
upls=this.options.uploaders.toLowerCase().split(",");
tempArr=[];
for(i=0;
i<upls.length;
i++){if(this.uploaders[upls[i].trim()]){upl=this.uploaders[upls[i].trim()];
upl.init(this.options);
if(upl.available&&this.matchFeatures(upl)){tempArr[upl.type]=upl;
if(this.options.singleUploader){break
}}}}this.uploaders=tempArr
}this.bindReady()
},setSelectedTab:function(b,a){try{tabHeader=document.getElementById(b+"_header");
tabHeader.className=a?"selected":"";
tabBody=document.getElementById(b+"_body");
tabBody.className=a?"selected":""
}catch(c){universalUploader.debug(c)
}},addEventListener:function(b,c,a){if(c){if(document.addEventListener){c.addEventListener(b,a,false)
}else{if(document.attachEvent){c.attachEvent("on"+b,a)
}}}},removeEventListener:function(b,c,a){if(c){if(c.removeEventListener){c.removeEventListener(b,a,false)
}if(c.detachEvent){c.detachEvent("on"+b,a)
}}},fireEvent:function(b,c){if(b.fireEvent){b.fireEvent("on"+c)
}else{var a=document.createEvent("Events");
a.initEvent(c,true,false);
b.dispatchEvent(a)
}},addClass:function(b,c){if(!b.className){b.className=c
}else{var a=" "+b.className+" ",d=b.className;
if(a.indexOf(" "+c+" ")<0){d+=" "+c
}b.className=d.trim()
}},removeClass:function(b,c){if(b.className){if(c){var a=(" "+b.className+" ").replace(" "+c+" "," ");
b.className=a.trim()
}else{b.className=""
}}},bindReady:function(){if(this.readyBound){return
}this.readyBound=true;
if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);
universalUploader.render()
},false)
}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);
universalUploader.render()
}});
if(document.documentElement.doScroll&&window==window.top){(function(){if(universalUploader.isReady){return
}try{document.documentElement.doScroll("left")
}catch(a){setTimeout(arguments.callee,0);
return
}universalUploader.render()
})()
}}}this.addEventListener("load",window,universalUploader.render)
},getAbsoluteUrl:function(a){try{var d="",c=-1;
if(a.match(/^https?:\/\//i)||a.match(/^\//)||a===""){return a
}c=window.location.pathname.lastIndexOf("/");
d=(c<=0)?"/":window.location.pathname.substr(0,c)+"/";
return d+a
}catch(b){return a
}},getUid:function(){return((new Date()).getTime()+""+Math.floor(Math.random()*1000000)).substr(0,18)
},formatNumber:function(f,c,h,e){f=(f+"").replace(/[^0-9+\-Ee.]/g,"");
var b=!isFinite(+f)?0:+f,a=!isFinite(+c)?0:Math.abs(c),k=(typeof e==="undefined")?"":e,d=(typeof h==="undefined")?".":h,j="",g=function(o,m){var l=Math.pow(10,m);
return""+Math.round(o*l)/l
};
j=(a?g(b,a):""+Math.round(b)).split(".");
if(j[0].length>3){j[0]=j[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,k)
}if((j[1]||"").length<a){j[1]=j[1]||"";
j[1]+=new Array(a-j[1].length+1).join("0")
}return j.join(d)
},getFormFields:function(h){var b=document.getElementById(h),f=new Array(),k=new Array(),a=0,c=false;
if(b){for(var g=0;
g<b.elements.length;
g++){k=new Array();
k[0]=b.elements[g].name;
c=false;
if(b.elements[g].type=="checkbox"||b.elements[g].type=="radio"){if(b.elements[g].checked){k[1]=b.elements[g].value
}else{k=null
}}else{if(b.elements[g].type=="select-multiple"){var d=b.elements[g];
for(var e=0;
e<d.length;
e++){if(d.options[e].selected){k=new Array();
k[0]=b.elements[g].name;
k[1]=d.options[e].value;
f[a]=k;
a++;
c=true
}}}else{k[1]=b.elements[g].value
}}if(!c){f[a]=k;
a++
}}}return f
},applyTranslation:function(a){for(key in a){if(a.hasOwnProperty(key)){this.translation[key]=a[key]
}}},initLanguage:function(){var a="en";
if(this.options.language_autoDetect){a=(navigator.language)?navigator.language:navigator.userLanguage
}else{if(this.options.language_source&&this.options.language_source.indexOf("{0}")>=0){return null
}}if(a==undefined){a="en"
}else{if(a.length>1){a=a.substr(0,2)
}}a=a.toLowerCase();
var b=this.options.language_source.replace(/\{0\}/g,a);
if(b){this.loadJsFile(b)
}return null
},loadJsFile:function(a){var b=document.createElement("script");
b.setAttribute("type","text/javascript");
b.setAttribute("src",a);
if(b){document.getElementsByTagName("head")[0].appendChild(b)
}},zeroPad:function(d,c){return(d.toString().length>c)?d:("00000000000000000000"+d).slice(-c)
},getVersion:function(){return this.version
},debug:function(a){if(this.options.debug){console.log(a)
}if(this.options.debug&&this.options.debug=="alert"){alert(a)
}},isRotateSupported:function(){if(this.transformationSupported===undefined){this.transformationSupported=false;
try{var b=document.createElement("img");
if(b.style.transform!==undefined||b.style.msTransform!==undefined||b.style.webkitTransform!==undefined||b.style.mozTransform!==undefined||b.style.MozTransform!==undefined||b.style.oTransform!==undefined||b.style.OTransform!==undefined){this.transformationSupported=true
}}catch(a){universalUploader.debug(a)
}}universalUploader.debug("transformationSupported: "+this.transformationSupported);
return this.transformationSupported;
return true
},isIOS:function(){return/(iPhone|iPod|iPad)/i.test(navigator.userAgent)
},isIOS6:function(){if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)){if(/OS [1-5]_\d like Mac OS X/i.test(navigator.userAgent)){return false
}else{return true
}}return false
},isAndroid:function(){return navigator.userAgent.match(/Android/i)
},extend:function(d,a){var b={};
for(var c in d){b[c]=d[c]
}for(var c in a){b[c]=a[c]
}return b
},getMimeType:function(a){if(this.mimeTypes){if(this.mimeTypes.hasOwnProperty(this.getExtension(a))){return this.mimeTypes[this.getExtension(a)]
}}return"application/octet-stream"
}};
universalUploader.File=function(d,e,b,c){var a=this;
e=e.replace(/\\/g,"/");
if(e.lastIndexOf("/")>0){e=e.substring(e.length,e.lastIndexOf("/")+1)
}this.getIOSFileName=function(){};
this.id=d;
this.status=0;
this.relativePath=c;
this.name=universalUploader.isIOS6()?a.id+"."+universalUploader.getExtension(e):e;
this.thumbnailSize=0;
this._size=!isNaN(b)&&b>0?b:-1;
this.bytesLoaded=0;
this.serverResponse="";
this.image={loadErrors:false,loaded:false,data:null,uploadData:null,rotation:0,type:"jpeg"};
this.size=this._size;
this.fileSize=this._size;
this.setSize=function(){a.size=(universalUploader.options.resizeImages?0:a._size)+(universalUploader.options.resizeImages?a.thumbnailSize:0);
if(universalUploader.options.resizeImages){if(this.image.type=="jpg"){this.image.type="jpeg"
}if(!universalUploader.isExtensionInArray(this.name.toLowerCase(),[this.image.type])){this.name=this.name.replace(universalUploader.getExtension(this.name),this.image.type)
}}};
this.getPercent=function(){var f=Math.round((a.bytesLoaded/a.size)*100);
return(a.status==2)?100:(f>=100)?99:f
};
this.isValidImage=function(){return universalUploader.isExtensionInArray(this.name,["jpeg","jpg","bmp","png"])&&!this.image.loadErrors
}
};
universalUploader.ProgressInfo=function(){var a=this;
a.lastError="";
a.totalFiles=0;
a.totalSize=0;
a.uploadedFiles=0;
a.uploadedSize=0;
a.startTime=new Date();
a.stopTime=new Date();
a.lastProgressTime=new Date();
a.lastBytes=0;
a.bandwidth=0;
a.avgBw=[];
a.weights=[];
a.avBwCount=30;
a.avBwCurr=0;
a.undeterminated=false;
a.getPercent=function(){return(a.totalSize==0)?0:(a.uploadedSize/a.totalSize)*100
};
a.reset=function(b){a.resetStat(b);
a.resetProgress(b)
};
a.resetStat=function(b){var c=universalUploader.getFileStat();
a.totalFiles=c[0];
if(b){a.weights.push(a.totalSize)
}else{a.weights=[]
}a.totalSize=(b?a.totalSize:0)+c[1];
a.uploadedFiles=c[2];
a.uploadedSize=b?a.uploadedSize:c[3]
};
a.resetProgress=function(b){if(!b){a.startTime=new Date()
}a.stopTime=new Date();
a.lastProgressTime=new Date();
a.lastBwStore=new Date();
a.lastBytes=0;
a.bandwidth=0;
a.avgBw=[];
a.avBwCurr=0
};
a.getBandwdth=function(){var b=0;
for(i=0;
i<a.avgBw.length;
i++){b+=a.avgBw[i]
}return a.avgBw.length>0?b/a.avgBw.length:universalUploader.getTranslatedString("constant_notAvailable")
};
a.onProgress=function(e){var b=new Date();
a.stopTime=b;
var d=b.getTime()-a.lastProgressTime.getTime();
var c=e-a.lastBytes;
if(c>0){a.uploadedSize+=c;
if(d<=0){d=1
}a.bandwidth=(c/(d/1000));
if(b.getTime()-a.lastBwStore.getTime()>500||a.avgBw.length==0){if(a.avBwCurr<a.avBwCount){a.avgBw.push(a.bandwidth)
}else{a.avgBw[a.avBwCur]=a.bandwidth
}a.avBwCurr++;
a.lastBwStore=b
}a.lastProgressTime=b;
a.lastBytes=e
}};
a.getTotalPercent=function(){var c=a.totalSize>0&&!a.undeterminated?Math.round((a.uploadedSize/a.totalSize)*100):a.uploadedFiles>0?Math.round(a.uploadedFiles/a.totalFiles*100):0;
if(universalUploader.options.resizeImages){if(!a.undeterminated){var b=0;
if(universalUploader.resizeCycles>0&&universalUploader.uploaders[universalUploader.activeTab].currentResizeCycle<universalUploader.resizeCycles){c=(universalUploader.uploaders[universalUploader.activeTab].currentResizeCycle)/universalUploader.resizeCycles*100;
for(var d=0;
d<a.weights.length;
d++){b=a.weights[d]
}c+=Math.round(((a.uploadedSize-b)/(a.totalSize-b))*100/universalUploader.resizeCycles)
}}else{if(universalUploader.resizeCycles>0&&universalUploader.uploaders[universalUploader.activeTab].currentResizeCycle<universalUploader.resizeCycles){c*=(universalUploader.uploaders[universalUploader.activeTab].currentResizeCycle+1)/universalUploader.resizeCycles
}}}return Math.round(isNaN(c)?0:c)
};
a.timeLeft=function(){if(a.bandwidth>0){var b=(a.totalSize-a.uploadedSize)/(a.getBandwdth());
return b>0?b:0
}return 0
};
a.timeLeftHour=function(){return Math.floor(a.timeLeft()/60/60)
};
a.timeLeftMin=function(){return Math.floor(a.timeLeft()/60-Math.floor(a.timeLeftHour())*60)
};
a.timeLeftSec=function(){return Math.round(a.timeLeft()%60)
};
a.elapsedTime=function(){return(a.stopTime.getTime()-a.startTime.getTime())/1000
};
a.elapsedHour=function(){return Math.floor(a.elapsedTime()/60/60)
};
a.elapsedMin=function(){return Math.floor(a.elapsedTime()/60-Math.floor(a.elapsedHour())*60)
};
a.elapsedSec=function(){return Math.round(a.elapsedTime()%60)
};
a.replacePlaceHolders=function(c){var b=c.replace(/\{0\}/g,a.getTotalPercent());
b=b.replace(/\{1\}/g,a.totalFiles);
b=b.replace(/\{2\}/g,universalUploader.formatBytes(a.totalSize,1));
b=b.replace(/\{3\}/g,a.uploadedFiles);
b=b.replace(/\{4\}/g,universalUploader.formatBytes(a.uploadedSize,1));
b=b.replace(/\{5\}/g,universalUploader.formatBytes(a.getBandwdth(),1));
b=b.replace(/\{6\}/g,universalUploader.zeroPad(a.timeLeftHour(),2));
b=b.replace(/\{7\}/g,universalUploader.zeroPad(a.timeLeftMin(),2));
b=b.replace(/\{8\}/g,universalUploader.zeroPad(a.timeLeftSec(),2));
b=b.replace(/\{9\}/g,universalUploader.zeroPad(a.elapsedHour(),2));
b=b.replace(/\{10\}/g,universalUploader.zeroPad(a.elapsedMin(),2));
b=b.replace(/\{11\}/g,universalUploader.zeroPad(a.elapsedSec(),2));
b=b.replace(/\{12\}/g,a.lastError);
return b
}
};
String.prototype.trim=function trim12(){var c=this.replace(/^\s\s*/,""),a=/\s/,b=c.length;
while(a.test(c.charAt(-b))){}return c.slice(0,b+1)
};
if(Array.indexOf="undefined"||!Array.indexOf){Array.prototype.indexOf=function(b){for(var a=0;
a<this.length;
a++){if(this[a]==b){return a
}}return -1
}
}if(typeof console==="undefined"){console={}
}if(typeof console.log==="undefined"){console.log=function(){}
}universalUploader.Html4={type:"classic",available:true,stopped:false,features:{resizeImages:false,dragAndDrop:false,imagesPreview:false,chunkedUpload:false,amazons3:true},ids:[],initParams:function(a){this.options=universalUploader.extend(this.options,a);
this.url=a.url;
this.postFields=a.postFields?a.postFields:[];
this.postFields[this.options.postFields_uploaderType]=this.type;
this.fileView=this.options.fileView?this.options.fileView.toLowerCase():"list"
},init:function(b){var a=this;
a.currentState=universalUploader.FILE_READY;
this.options=universalUploader.extend(this.options,b);
this.progressInfo=new universalUploader.ProgressInfo();
this.id="html4_uploadForm";
this.initParams(b);
this._files=[];
this.render=function(d){var g=universalUploader.getUid();
a.lastId=g;
var f=d;
var e='<iframe id="hidden_iframe" name="hidden_iframe" src="#" style="width:0;height:0;border:0px solid #fff;display:none"></iframe>';
var c='<form id="form_'+g+'" name="form_'+g+'" class="uuFileInput" action="'+a.url+'" method="post" encoding="multipart/form-data" enctype="multipart/form-data" target="hidden_iframe" ><input id="file_'+g+'" name="'+a.options.postFields_file+'" class="uuFileInput" type="file" onchange="javascript: universalUploader.Html4.addFile(this);"></form>';
f=f.replace("#BEFORECONTROLS#",e);
f=f.replace("#AFTERBUTTONS#",c);
f=f.replace("#AFTERCONTROLS#","");
f=f.replace("#INSIDELIST#","");
f=f.replace("#AFTERLIST#","");
return f
};
this.afterRender=function(){var d=document.getElementById("browseButton_"+a.type);
var f=document.getElementById("form_"+a.lastId);
var c=document.getElementById("file_"+a.lastId);
var e=document.getElementById("absdiv_"+a.type);
if(!e){e=document.createElement("div");
e.id="absdiv_"+a.type;
f.parentNode.removeChild(f);
document.getElementsByTagName("body")[0].appendChild(e);
e.appendChild(f)
}e.style.visibility="visible";
e.style.zIndex=999;
e.style.position="absolute";
e.style.overflowX="hidden";
e.style.overflowY="hidden";
universalUploader.positionFormUnderButton(d,e,c);
c.className="uuFileInput";
f.className="uuFileInput"
};
this.addFile=function(d){fileInput=this;
addedfiles=[];
if(d&&d.type=="file"){fileInput=d
}else{if(d&&d.srcElement){fileInput=d.srcElement
}}var h=fileInput.id.substring(5);
var e=new universalUploader.File(h,fileInput.value,-1);
var l=[0,0,0,0,0,0,0,0,0,0,0,0];
var j=universalUploader.isValidFile(e,addedfiles,0);
if(j>=0){l[j]++;
universalUploader.displayResultOfAdd(l)
}else{fileInput.style.display="none";
document.getElementById("form_"+h).style.display="none";
var k=universalUploader.Html4;
var n=document.getElementById(k.type+"_content");
if(!n){n=document.getElementById(k.options.holder)
}universalUploader.removeEventListener("change",fileInput,k.addFile);
fileInput.removeAttribute("onchange");
if(n){var c=universalUploader.getUid();
k.lastId=c;
fForm=document.createElement("form");
fForm.setAttribute("id","form_"+c);
fForm.setAttribute("name","form_"+c);
fForm.setAttribute("enctype","multipart/form-data");
fForm.setAttribute("encoding","multipart/form-data");
fForm.setAttribute("method","post");
fForm.setAttribute("action",k.url);
fForm.setAttribute("target","hidden_iframe");
fileInput=document.createElement("input");
fileInput.setAttribute("id","file_"+c);
fileInput.setAttribute("name",k.options.postFields_file);
fileInput.setAttribute("type","file");
fileInput.className="uuFileInput";
universalUploader.addEventListener("change",fileInput,k.addFile);
fForm.appendChild(fileInput);
document.getElementById("form_"+h).parentNode.insertBefore(fForm,document.getElementById("form_"+h).nextSibling);
k.ids.push(h);
addedfiles.push(e);
var m=document.getElementById("browseButton_"+k.type);
m.onClick=null;
var f=document.getElementById("absdiv_"+k.type);
f.appendChild(fForm);
universalUploader.positionFormUnderButton(m,f,fileInput)
}for(var g=0;
g<addedfiles.length;
g++){k._files[addedfiles[g].id]=addedfiles[g];
k._files.push(addedfiles[g])
}if(addedfiles.length>0){universalUploader.onAddFiles(k.type,addedfiles)
}}};
this.setParameters=function(c){a.initParams(c);
a.applyParams()
};
this.applyParams=function(){for(var c=a._files.length-1;
c>=0;
c--){var d=document.getElementById("form_"+a._files[c].id);
if(d){d.setAttribute("action",a.url)
}}};
this.getFiles=function(){return a._files
};
this.clearList=function(){universalUploader.onClearList(a.type);
for(var c=a._files.length-1;
c>=0;
c--){a.removeFile(a._files[c].id,true)
}};
this.removeFile=function(c,e){universalUploader.onRemoveFile(a.type,c,e);
if(a.ids.indexOf(c)>=0){a.ids.splice(a.ids.indexOf(c),1)
}var d=document.getElementById("file_"+c);
var f=document.getElementById("form_"+c);
if(d){d.parentNode.removeChild(d)
}if(f){f.parentNode.removeChild(f)
}if(a._files[c]){a._files.splice(a._files.indexOf(a._files[c]),1);
a._files[c]=null;
delete a._files[c]
}};
this.upload=function(){a.stopped=false;
universalUploader.onUploadStart(a.type);
a.uploadQueue=this.ids.slice();
a.uploadNext()
};
this.stop=function(){if(!a.stopped){if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){window.frames.hidden_iframe.window.document.execCommand("Stop")
}else{window.frames.hidden_iframe.window.stop()
}a.stopped=true;
if(a._files.length>0){universalUploader.onFileUploadStop(a.type,a.currentId)
}}};
this.appendToUploadQueue=function(c){for(var d=c.length-1;
d>=0;
d--){a.uploadQueue.push(c[d].id)
}};
this.uploadNext=function(){if(!a.stopped){a.currentId=a.uploadQueue.shift();
var c=document.getElementById("file_"+a.currentId);
if(a.currentId&&c&&c.value&&a._files[a.currentId]&&a._files[a.currentId].status!=universalUploader.FILE_COMPLETE){a.doFileUpload(a.currentId)
}else{if(a.uploadQueue.length>0){a.uploadNext()
}else{universalUploader.onUploadComplete(a.type)
}}}};
this.doFileUpload=function(g){var f=a.currentId,e=document.getElementById("hidden_iframe"),d=document.getElementById("form_"+f);
fInput=document.getElementById("file_"+f);
e.src=window.ActiveXObject?'javascript:""':"about:blank";
a.postFields[a.options.postFields_fileId]=f;
a.postFields[a.options.postFields_fileSize]=a._files[f].size;
a.postFields[a.options.postFields_filesCount]=a._files.length;
if(a.options.amazonS3){fInput.setAttribute("name","file");
a.postFields=new Array();
a.postFields.Filename=(a.options.resizeImages?a.options.resizeOptions.filePrefix:"")+a._files[g].name;
if(!a.options.amazonS3.key){a.options.amazonS3.key="<FILENAME>"
}a.postFields.key=decodeURIComponent(a.options.amazonS3.key).replace("<FILENAME>",(a.options.resizeImages?a.options.resizeOptions.filePrefix:"")+a._files[g].name).replace("<ID>",g);
a.postFields.AWSAccessKeyId=decodeURIComponent(a.options.amazonS3.accessKeyId);
a.postFields.policy=decodeURIComponent(a.options.amazonS3.policy);
a.postFields.signature=decodeURIComponent(a.options.amazonS3.signature);
a.postFields.acl=decodeURIComponent(a.options.amazonS3.acl);
a.postFields.success_action_status="201";
if(!a.options.amazonS3.contentType){a.options.amazonS3.contentType="<AUTODETECT>"
}a.postFields["Content-Type"]=a.options.amazonS3.contentType.replace("<AUTODETECT>",universalUploader.getMimeType(a.postFields.Filename))
}for(key in a.postFields){if(a.postFields.hasOwnProperty(key)){postField=document.createElement("input");
postField.setAttribute("id",key+g);
postField.setAttribute("name",key);
postField.setAttribute("value",a.postFields[key]);
postField.setAttribute("type","hidden");
d.insertBefore(postField,fInput)
}}if(window.ActiveXObject){document.frames[e.id].name=e.id
}function c(){var h=this,m="",l,k;
try{try{l=e.contentWindow.document||e.contentDocument||WINDOW.frames[g].document
}catch(j){}if(l){if(a.options.html4_params&&a.options.html4_params.textResponse){m=l.documentElement.innerText||l.documentElement.textContent
}else{if(l.body){if(/textarea/i.test((k=l.body.firstChild||{}).tagName)){m=k.value
}else{m=l.body.innerHTML
}}else{m=l.documentElement.innerText||l.documentElement.textContent
}}}a.fileComplete(f,m)
}catch(j){a.fileError(g,j)
}universalUploader.removeEventListener("load",e,c)
}if(universalUploader.onFileUploadStart(a.type,a.currentId)===false){return
}e.onLoad=null;
universalUploader.addEventListener("load",e,c);
d.submit()
};
this.fileComplete=function(d,c){universalUploader.onFileUploadComplete(a.type,a.currentId,c);
a.uploadNext()
};
this.fileError=function(d,c){universalUploader.onFileUploadError(a.type,a.currentId,"",c.message)
}
}};
universalUploader.Html5={type:"drag-and-drop",available:true,totalThumbnailsCount:0,currentResizeCycle:0,features:{dragAndDrop:true,imagesPreview:false,chunkedUpload:false,resizeImages:false,amazonS3:true},formid:"",initParams:function(a){this.options=universalUploader.extend(this.options,a);
if(this.options.checkConnectionOnIOError==null){this.options.checkConnectionOnIOError=true
}this.chunkSize=a.chunkSize<0?16384:a.chunkSize;
this.url=a.url;
this.postFields=a.postFields?a.postFields:[];
this.postFields[a.postFields_uploaderType]=this.type;
this.timeout=a.timeout?a.timeout:4294967295;
this.addDir=a.allowSelectDirectory;
this.fileView=a.fileView?a.fileView.toLowerCase():"list";
this.options.resizeOptions=universalUploader.getResizeParams(this.type)
},init:function(e){var b=this;
b.currentState=universalUploader.FILE_READY;
this.requestTime=-1;
this.sendBlobInForm=!universalUploader.isAndroid();
this.options=universalUploader.extend(this.options,e);
this.chunckedBase64=false;
this.progressInfo=new universalUploader.ProgressInfo();
this.id=universalUploader.getUid();
this.imagesToLoad=[];
this.files=[];
this._files=[];
this.ids=[];
this.currentId=null;
this.dndTimeout=null;
this.initParams(e);
if(window.XMLHttpRequest){xhr=new XMLHttpRequest();
b.available=(xhr.sendAsBinary||xhr.upload)?true:false;
try{var g=new FormData()
}catch(h){b.available=false
}}else{b.available=false
}if(!b.available){return false
}try{var a=new FileReader();
try{if(a.readAsBinaryString){this.features.chunkedUpload=true
}}catch(h){}var d=document.createElement("canvas");
if(a.readAsDataURL&&d.toDataURL){if(d.getContext){var c=d.getContext("2d");
d.height=480;
d.width=640;
c.fillRect(25,25,100,100);
var f=d.toDataURL("image/jpeg");
if(f.substr(0,6)!="data:,"){universalUploader.debug("is android? "+universalUploader.isAndroid());
b.features.imagesPreview=true;
b.features.resizeImages=true
}else{universalUploader.debug("image preview/resize is not supported")
}}else{universalUploader.debug("canvas.getContext is not supported")
}}}catch(h){universalUploader.debug(h)
}try{if(window.File.slice){b.features.chunkedUpload=true
}}catch(h){}try{if(window.File.webkitSlice){b.features.chunkedUpload=true
}}catch(h){}try{if(window.File.mozSlice){b.features.chunkedUpload=true
}}catch(h){}this.isInputDirSupported=function(){var j=document.createElement("input");
if("webkitdirectory" in j||"mozdirectory" in j||"odirectory" in j||"msdirectory" in j||"directory" in j){return true
}return false
};
this.render=function(o){var q=o;
var m="";
var p="";
var k=' multiple="multiple" ';
if(b.options.fileFilter_maxCount&&b.options.fileFilter_maxCount==1){k=""
}var j=b.options.fileFilter_types?b.options.fileFilter_types.split(","):[];
for(i=0;
i<j.length;
i++){if(j.indexOf("/")<0){p+="."
}p+=j[i];
if(i<j.length-1){p+=", "
}}if(b.addDir){m='webkitdirectory="" directory="" mozdirectory="" msdirectory="" odirectory=""'
}var l='<form id="form_'+b.id+'" name="form_'+b.id+'" action="'+b.url+'" method="post" encoding="multipart/form-data" enctype="multipart/form-data" target="hidden_iframe" ><input '+m+' id="file_'+b.id+'" name="file_'+b.id+'" accept="'+p+'" type="file" class="uuFileInput" onchange="javascript: universalUploader.Html5.addFiles(this);" '+k+"></form>";
var n=b.options.dropTargetId?"":'<div id="drop_target" class="dropTarget">'+universalUploader.getTranslatedString("drop_files")+"</div>";
q=q.replace("#BEFORECONTROLS#","");
q=q.replace("#AFTERBUTTONS#",l);
q=q.replace("#AFTERCONTROLS#",n);
q=q.replace("#INSIDELIST#","");
q=q.replace("#AFTERLIST#","");
return q
};
this.afterRender=function(){var k=document.getElementById(b.options.dropTargetId?b.options.dropTargetId:"drop_target");
universalUploader.addEventListener("dragenter",document.body,function(q){var p=document.getElementById(b.type+"_fileList");
if(!p){p=document.getElementById(b.options.holder)
}k=document.getElementById(b.options.dropTargetId?b.options.dropTargetId:"drop_target");
k.style.display="block";
k.style.width=p.clientWidth+"px";
k.style.height=p.clientHeight+"px";
if(b.dndTimeout){clearTimeout(b.dndTimeout)
}b.dndTimeout=setTimeout(b.dragend,3000);
var o=document.getElementById("form_"+b.id);
var l=document.getElementById("file_"+b.id);
try{universalUploader.addEventListener("change",l,b.dragend)
}catch(n){universalUploader.debug(n)
}if(navigator.userAgent.indexOf("Safari")>0){var m=document.getElementById("absdiv_"+b.type);
universalUploader.positionFormUnderButton(k,m);
o.style.height=m.style.height
}});
universalUploader.addEventListener("dragstart",document.body,b.dragstart);
universalUploader.addEventListener("dragend",document.body,b.dragend);
if(k&&(navigator.userAgent.indexOf("Safari")<0||navigator.userAgent.indexOf("Chrome")>0)){universalUploader.addEventListener("dragover",k,b.dragOver);
universalUploader.addEventListener("drop",k,b.drop);
var j=document.getElementById("file_"+b.id);
universalUploader.addEventListener("drop",j,b.drop)
}b.placeInputOverBrowseButton(true)
};
this.dragstart=function(j){try{if(j.preventDefault){j.preventDefault()
}if(j.stopPropagation){j.stopPropagation()
}if(window.event){window.event.returnValue=false
}if(j.stopEvent){j.stopEvent()
}}catch(j){if(debugmode){throw j
}}return false
};
this.dragOver=function(j){try{if(b.dndTimeout){clearTimeout(b.dndTimeout)
}b.dndTimeout=setTimeout(b.dragend,3000);
if(j.preventDefault){j.preventDefault()
}if(j.stopPropagation){j.stopPropagation()
}if(window.event){window.event.returnValue=false
}if(j.stopEvent){j.stopEvent()
}}catch(j){if(debugmode){throw j
}}return false
};
this.dragend=function(k){try{b.placeInputOverBrowseButton();
if(b.dndTimeout){clearTimeout(b.dndTimeout)
}var l=document.getElementById(b.options.dropTargetId?b.options.dropTargetId:"drop_target");
l.style.display="none";
var j=document.getElementById("file_"+b.id)
}catch(k){throw k
}};
this.drop=function(j){try{b.placeInputOverBrowseButton();
var k=document.getElementById(b.options.dropTargetId?b.options.dropTargetId:"drop_target");
k.style.display="none";
if(j.preventDefault){j.preventDefault()
}if(j.stopPropagation){j.stopPropagation()
}if(window.event){window.event.returnValue=false
}if(j.stopEvent){j.stopEvent()
}if(!j.dataTransfer||!j.dataTransfer.files||j.dataTransfer.files.length<1){return
}b._addFiles(j.dataTransfer.files)
}catch(j){throw j
}};
this.placeInputOverBrowseButton=function(n){var q=document.getElementById(b.options.dropTargetId?b.options.dropTargetId:"drop_target");
var j=document.getElementById("controlsContainer_"+b.type);
var l=document.getElementById("browseButton_"+b.type);
var p=document.getElementById("form_"+b.id);
var k=document.getElementById("file_"+b.id);
try{q.removeChild(k)
}catch(o){}p.appendChild(k);
var m=document.getElementById("absdiv_"+b.type);
if(!m){m=document.createElement("div");
m.id="absdiv_"+b.type;
p.parentNode.removeChild(p);
document.getElementsByTagName("body")[0].appendChild(m);
m.appendChild(p)
}else{m.appendChild(p)
}m.style.visibility="visible";
m.style.zIndex=999;
m.style.position="absolute";
m.style.overflowX="hidden";
m.style.overflowY="hidden";
universalUploader.positionFormUnderButton(l,m,n?k:null);
p.style.height=m.style.height
};
this.addFiles=function(j){this.dragend();
this._addFiles(j.files)
};
this._addFiles=function(r){var q=[],k=null,l=0,p=[0,0,0,0,0,0,0,0,0,0,0,0],o=-1,j=0;
for(var n=0;
n<r.length;
n++){var k=r[n];
if(k.name!=""&&k.name!="."){var m=universalUploader.getUid();
b.files[m]=k;
b.files.push(k);
b.ids.push(m);
k=new universalUploader.File(m,k.name||k.fileName,k.size||k.fileSize,k.webkitRelativePath?k.webkitRelativePath:null);
o=universalUploader.isValidFile(k,q,l,true);
if(o<0){q.push(k);
l+=k.size
}else{p[o]++;
j++
}}}if(j>0){universalUploader.displayResultOfAdd(p)
}for(var n=0;
n<q.length;
n++){b._files[q[n].id]=q[n];
b._files.push(q[n])
}if(q.length>0){setTimeout(function(){universalUploader.onAddFiles(b.type,q)
},100)
}};
this.getFiles=function(){return b._files
};
this.clearList=function(){universalUploader.onClearList(b.type);
for(var k=b._files.length-1;
k>=0;
k--){b.removeFile(b._files[k].id,true)
}var j=document.getElementById("file_"+b.id);
j.value=null
};
this.removeFile=function(j,l){universalUploader.onRemoveFile(b.type,j,l);
if(b.ids.indexOf(j)>=0){b.ids.splice(b.ids.indexOf(j),1)
}if(b.files[j]){b.files.splice(b.files.indexOf(b.files[j]),1);
b.files[j]=null;
delete b.files[j]
}if(b._files[j]){b._files.splice(b._files.indexOf(b._files[j]),1);
b._files[j]=null;
delete b._files[j]
}var k=document.getElementById("file_"+b.id);
k.value=null
};
this.loadImage=function(j,m){if(b.files[j]&&b.features.imagesPreview){var l=b.files[j];
if(b.imagesToLoad==null){b.imagesToLoad=[]
}if(b.imagesToLoad&&b.imagesToLoad.indexOf(j)<0){var k=b.imagesToLoad.length==0;
b.imagesToLoad.push(j);
if(k){b._loadImage(b.imagesToLoad[0],m)
}}}};
this._loadImage=function(k,n){if(b.files[k]&&b.features.imagesPreview){var m=b.files[k];
if(b.imagesToLoad.indexOf(k)>=0){var j=new FileReader();
var l=function(o){if(o&&o.target&&o.target.error){switch(o.target.error.code){case o.target.error.NOT_FOUND_ERR:universalUploader.debug("File Not Found!");
break;
case o.target.error.NOT_READABLE_ERR:universalUploader.debug("File is not readable");
break;
case o.target.error.ABORT_ERR:break;
default:universalUploader.debug("An error occurred reading this file.")
}}if(b.imagesToLoad.indexOf(k)>=0){b.imagesToLoad.splice(b.imagesToLoad.indexOf(k),1)
}if(n){b.resizeImage(k,null,false)
}else{if(universalUploader.onImageLoaded&&!n){universalUploader.onImageLoaded(b.type,k,null,false)
}}if(b.imagesToLoad&&b.imagesToLoad.length>0){b._loadImage(b.imagesToLoad[0],n)
}j=null;
delete j
};
j.onerror=l;
j.onload=function(o){if(b.imagesToLoad.indexOf(k)>=0){b.imagesToLoad.splice(b.imagesToLoad.indexOf(k),1)
}if(n){b.resizeImage(k,this.result,false)
}else{if(universalUploader.onImageLoaded&&!n){universalUploader.onImageLoaded(b.type,k,o.target.result,false)
}}if(b.imagesToLoad&&b.imagesToLoad.length>0){b._loadImage(b.imagesToLoad[0],n)
}j=null;
delete j
};
j.readAsDataURL(m)
}}};
this.setResizeParams=function(j){b.options.resizeOptions=j
};
this.setParameters=function(j){b.initParams(j);
b.applyParams()
};
this.applyParams=function(){};
this.resizeImage=function(j,k){universalUploader.onResizeImagesProgress(b.type,b.totalThumbnailsCount-b.imagesToLoad.length,b.totalThumbnailsCount,0);
universalUploader.resizeImage("upload",b.type,j,k,b.options.resizeOptions.width,b.options.resizeOptions.height,true,b.options.resizeOptions.resizeMode,b.options.resizeOptions.quality,b.options.resizeOptions.format)
};
this.onImageResized=function(j,l){var k=b._files[j];
if(k){universalUploader.debug("Html5 onImageResized "+k.name+" - "+l.substr(0,20));
k.image.uploadData=universalUploader.base64ToBlob(l);
if(k.image.uploadData){k.thumbnailSize=k.image.uploadData.length||k.image.uploadData.size;
k.image.type=k.image.uploadData.type?k.image.uploadData.type.replace("image/",""):"jpg";
k.setSize();
universalUploader.debug("file.thumbnailSize "+k.thumbnailSize+" type is "+k.image.type)
}else{universalUploader.debug("file.image.uploadData is null after base64ToBlob")
}}if(b.imagesToLoad.length==0){setTimeout(function(){universalUploader.onResizeImagesComplete(b.type)
},10);
setTimeout(function(){b.upload(true)
},10)
}};
this.generateThumbnails=function(){b.imagesToLoad=[];
universalUploader.onResizeImagesStart(b.type);
for(var j=b._files.length-1;
j>=0;
j--){if(b._files[j].isValidImage()){b.loadImage(b._files[j].id,true)
}}b.totalThumbnailsCount=b.imagesToLoad.length
};
this.stop=function(){if(b.checkTimer){clearInterval(b.checkTimer)
}if(!b.stopped){b.stopped=true;
if(b.xhr&&b.xhr.readyState!=4){b.xhr.abort()
}}};
this.upload=function(j){if(b.options.resizeImages&&!j){b.generateThumbnails()
}else{b.requestTime=-1;
b.stopped=false;
universalUploader.onUploadStart(b.type);
b.uploadQueue=b.ids.slice();
b.uploadNext()
}};
this.appendToUploadQueue=function(j){for(var k=j.length-1;
k>=0;
k--){b.uploadQueue.push(j[k].id)
}};
this.resumeUpload=function(){universalUploader.getProgressInfo(b.type).uploadedSize-=b._files[b.currentId].bytesLoaded;
b._files[b.currentId].bytesLoaded=0;
universalUploader.getProgressInfo(b.type).lastBytes=0;
b.uploadNext()
};
this.uploadNext=function(){b.xhr=null;
b.currentId=b.uploadQueue.shift();
b.chunkSize=b.options.chunkSize<0?163840:b.options.chunkSize;
if(b.currentId&&!b.stopped&&b._files[b.currentId]&&b._files[b.currentId].status!=universalUploader.FILE_COMPLETE){if(b.options.chunkedUpload){b.doChunkedUpload(b.currentId)
}else{b.doFileUpload(b.currentId)
}}else{if(b.uploadQueue.length>0){b.uploadNext()
}else{universalUploader.onUploadComplete(b.type)
}}};
this.doFileUpload=function(q){var o=b.files[q];
var p=null;
if(!b.xhr){p=new XMLHttpRequest();
b.xhr=p
}else{p=b.xhr
}if(p.upload){p.upload.onloadstart=function(r){universalUploader.onFileUploadStart(b.type,b.currentId)
};
p.upload.onprogress=function(s){if(s.lengthComputable&&s.total>0){var r=b._files[b.currentId];
universalUploader.onFileUploadProgress(b.type,b.currentId,s.loaded>r.size?r.size:s.loaded)
}};
p.upload.onerror=function(r){if(b.currentId){universalUploader.onFileUploadError(b.type,b.currentId,p.status?p.status.toString():"",p.statusText?p.statusText:"")
}b.onNetwrokProblem(0,this.statusText?this.statusText:"")
};
p.upload.onabort=function(r){universalUploader.onFileUploadStop(b.type,b.currentId)
}
}p.onreadystatechange=function(s){if(p.readyState==4&&!b.stopped){var r=p.responseText;
universalUploader.debug("onreadystatechange "+p.readyState+" status: "+p.status+" response"+r);
if(p.status>=200&&p.status<300){universalUploader.onFileUploadComplete(b.type,b.currentId,r);
b.uploadNext()
}else{universalUploader.onFileUploadError(b.type,b.currentId,p.status?p.status.toString():0,r)
}}};
try{var n=b.url;
if(!b.options.amazonS3){n+=universalUploader.isIOS6()?(n.indexOf("?")<0?"?":"&")+"rand="+universalUploader.getUid():""
}p.open("POST",n,true);
p.timeout=b.timeout
}catch(l){universalUploader.debug(l)
}try{var m=new FormData();
var k=false;
if(!b.options.amazonS3){b.postFields[b.options.postFields_filePath]=b._files[q].relativePath;
b.postFields[b.options.postFields_fileName]=(b.options.resizeImages?b.options.resizeOptions.filePrefix:"")+b._files[q].name;
b.postFields[b.options.postFields_fileId]=q;
b.postFields[b.options.postFields_fileSize]=o.size;
b.postFields[b.options.postFields_filesCount]=b._files.length
}else{b.postFields=new Array();
b.postFields.Filename=(b.options.resizeImages?b.options.resizeOptions.filePrefix:"")+b._files[q].name;
if(!b.options.amazonS3.key){b.options.amazonS3.key="<FILENAME>"
}b.postFields.key=decodeURIComponent(b.options.amazonS3.key).replace("<FILENAME>",(b.options.resizeImages?b.options.resizeOptions.filePrefix:"")+b._files[q].name).replace("<ID>",q);
b.postFields.AWSAccessKeyId=decodeURIComponent(b.options.amazonS3.accessKeyId);
b.postFields.policy=decodeURIComponent(b.options.amazonS3.policy);
b.postFields.signature=decodeURIComponent(b.options.amazonS3.signature);
b.postFields.acl=decodeURIComponent(b.options.amazonS3.acl);
b.postFields.success_action_status="201";
if(!b.options.amazonS3.contentType){b.options.amazonS3.contentType="<AUTODETECT>"
}b.postFields["Content-Type"]=b.options.amazonS3.contentType.replace("<AUTODETECT>",universalUploader.getMimeType(b.postFields.Filename))
}for(key in b.postFields){if(b.postFields.hasOwnProperty(key)){m.append(key,b.postFields[key])
}}if(b.options.resizeImages&&b._files[q].image.uploadData){if(!b.sendBlobInForm){var j=new FileReader();
k=true;
j.onload=function(){b.postFields[!b.options.amazonS3?b.options.postFields_file:"file"]=j.result;
var t=b.getMultipart(p);
if(p.sendAsBinary){p.sendAsBinary(t)
}else{var r=new Uint8Array(t.length);
for(var s=0;
s<t.length;
s++){r[s]=(t.charCodeAt(s)&255)
}p.send(r.buffer)
}t=null;
delete t;
j=null;
delete j
};
j.readAsBinaryString(b._files[q].image.uploadData)
}else{m.append(!b.options.amazonS3?b.options.postFields_file:"file",b._files[q].image.uploadData,b._files[q].name)
}}else{m.append(!b.options.amazonS3?b.options.postFields_file:"file",o)
}}catch(l){}if(!k){p.send(m)
}};
this.getMultipart=function(m){universalUploader.debug("manually combine multipart request");
var n="----"+universalUploader.getUid();
var j="--";
var l="\r\n";
var k="";
m.setRequestHeader("Content-Type","multipart/form-data; boundary="+n);
for(name in b.postFields){if(b.postFields.hasOwnProperty(name)){value=b.postFields[name];
if(name==b.options.postFields_file){k+=j+n+l+'Content-Disposition: form-data; name="'+name+'"; filename="binarydata"'+l+"Content-Type: application/octet-stream"+l+l+value+l
}else{k+=j+n+l+'Content-Disposition: form-data; name="'+name+'"'+l+l+unescape(encodeURIComponent(value))+l
}}}k+=j+n+j+l;
return k
};
this.sendFileChunks=function(j,p,n){universalUploader.debug("sendFileChunks "+j+" start byte "+p+" dt.lenth"+n);
var l=new XMLHttpRequest();
b.xhr=l;
var m=b.files[j];
var r=b._files[j];
if(!a){universalUploader.debug(" allocate new FileReader");
a=new FileReader()
}var o=navigator.userAgent.toLowerCase();
function q(w,z){var s=new FileReader();
var y=w;
var x=y+b.chunkSize<r.size?y+b.chunkSize:r.size;
universalUploader.debug("loadNextChunk "+y+" - "+x+" reader "+s);
s.onerror=function(A){var B="An error occurred reading file.";
switch(A.target.error.code){case A.target.error.NOT_FOUND_ERR:B="File Not Found!";
break;
case A.target.error.NOT_READABLE_ERR:B="File is not readable";
break;
default:B="An error occurred reading file."
}universalUploader.onFileUploadError(b.type,b.currentId,"",B);
universalUploader.debug("upload next : error in read");
b.uploadNext()
};
function u(A){if(this.readyState==FileReader.DONE){if(this.removeEventListener){this.removeEventListener("loadend",u)
}else{this.onload=null
}universalUploader.debug(" reader.onloadend "+j+" start byte "+y+" chunkSize"+b.chunkSize);
k(j,y,this.result)
}}universalUploader.debug(" before set loadend  reader.addEventListener "+s.addEventListener);
if(s.addEventListener){s.addEventListener("loadend",u)
}else{s.onload=u
}universalUploader.debug(" after set loadend");
if(b.options.resizeImages&&b._files[j].image.uploadData){universalUploader.debug("_self.options.resizeImages "+b.options.resizeImages);
k(j,y,b._files[j].image.uploadData.slice(y,x))
}else{try{universalUploader.debug("before slice ");
var v=File.prototype.slice||File.prototype.mozSlice||File.prototype.webkitSlice;
universalUploader.debug("slice "+v);
if(window.FormData){if(b.sendBlobInForm){k(j,y,v.call(m,y,x))
}else{universalUploader.debug("before call of readAsBinaryString");
s.readAsBinaryString(v.call(m,y,x))
}}else{universalUploader.debug("FormData is not supported "+v);
if(b.chunckedBase64){s.readAsDataURL(v.call(m,y,x))
}else{s.readAsArrayBuffer(v.call(m,y,x))
}}}catch(t){universalUploader.debug(t)
}}}function k(u,C,y){universalUploader.debug("sendFileChunk "+C);
var E=C?C:0;
var s=16384000;
if(y&&y.length){b.chunkSize=y.length
}if(y&&y.size){b.chunkSize=y.size
}var A=b.chunkSize;
var D=E+b.chunkSize>=r.size;
universalUploader.debug("startByte:"+E+" chunkSize : "+b.chunkSize+" isLastChunk "+D);
var v=null;
var w=b.url;
try{w+=(w.indexOf("?")<0?"?":"&")+"chunkedUpload=true&rand="+universalUploader.getUid()+"&";
if(!window.FormData||typeof(y)==="string"){universalUploader.debug("FormData is not supported ");
w+="FileName="+b._files[u].name+"&";
w+="StartByte="+E+"&";
w+="isMultiPart="+b.chunckedBase64+"&";
w+="Complete="+D+"&";
w+=b.options.postFields_fileId+"="+u
}try{l.open("POST",w,true);
l.timeout=b.timeout;
l.setRequestHeader("If-Modified-Since","Sat, 1 Jan 2005 00:00:00 GMT")
}catch(B){universalUploader.debug(B)
}if(window.FormData){universalUploader.debug("FormData supported "+typeof(y));
v=new FormData();
b.postFields[b.options.postFields_filePath]=b._files[u].relativePath;
b.postFields[b.options.postFields_fileName]=(b.options.resizeImages?b.options.resizeOptions.filePrefix:"")+b._files[u].name;
b.postFields[b.options.postFields_fileId]=u;
b.postFields[b.options.postFields_fileSize]=r.size;
b.postFields[b.options.postFields_filesCount]=b._files.length;
b.postFields.Complete=D?"true":"false";
b.postFields.isMultiPart="true";
b.postFields.StartByte=E;
if(typeof(y)!=="string"){for(key in b.postFields){if(b.postFields.hasOwnProperty(key)){v.append(key,b.postFields[key])
}}v.append(b.options.postFields_file,y)
}else{b.postFields[b.options.postFields_file]=y;
v=b.getMultipart(l)
}}}catch(B){universalUploader.onFileUploadError(b.type,b.currentId,0,B);
return
}if(l.upload){l.upload.onloadstart=function(F){b.requestTime=new Date().getTime();
l.upload.removeEventListener("loadstart",arguments.callee)
};
l.upload.onprogress=function(F){};
l.upload.onerror=function(F){universalUploader.debug("error in xhr");
b.onNetwrokProblem(0,this.statusText?this.statusText:"")
};
l.upload.onabort=function(F){universalUploader.onFileUploadStop(b.type,b.currentId)
}
}function t(){universalUploader.debug("upload chunk request "+this.readyState);
if(this.readyState==4&&!b.stopped){if(this.status>=200&&this.status<300){if(this.removeEventListener){this.removeEventListener("loadend",t)
}if(!D){universalUploader.debug("Server response "+this.responseText);
var G=(b.requestTime>=0)?(new Date().getTime()-b.requestTime):1;
if(G<=0){G=1
}if(b.options.chunkSize<0&&!universalUploader.isIOS6()){if(b.requestTime>0){var F=Math.round(b.chunkSize/G*1000);
var H=Math.round(universalUploader.getProgressInfo(b.type).getBandwdth());
universalUploader.debug("current avarage bandwidth: "+H);
universalUploader.debug("max bandwith with current chunksize: "+F);
if(F>H){if(F>b.chunkSize){if(F<s){b.chunkSize=Math.round(F)
}else{b.chunkSize=Math.round(s)
}universalUploader.debug("increase cunksize to : "+b.chunkSize)
}}if(b.options.maxChunkSize&&b.chunkSize>b.options.maxChunkSize){b.chunkSize=b.options.maxChunkSize
}}}universalUploader.onFileUploadProgress(b.type,u,E+b.chunkSize>r.size?r.size:E+b.chunkSize);
universalUploader.debug("Start read from"+(E+A)+" chunk size is "+b.chunkSize);
q(E+A,b.chunkSize);
y=null;
v=null
}else{var I=this.responseText;
setTimeout(function(){universalUploader.onFileUploadComplete(b.type,u,I)
},1);
universalUploader.debug("upload next : last chunk");
setTimeout(function(){b.uploadNext()
},1)
}}else{universalUploader.debug("upload next : bad response code");
b.onNetwrokProblem(this.status,this.responseText)
}}else{if(b.stopped){universalUploader.onFileUploadStop(b.type,b.currentId)
}}}l.onreadystatechange=t;
if(!b.stopped){if(typeof(y)!=="string"){l.send(v?v:y)
}else{if(l.sendAsBinary){l.sendAsBinary(v)
}else{var z=new Uint8Array(v.length);
for(var x=0;
x<v.length;
x++){z[x]=(v.charCodeAt(x)&255)
}l.send(z.buffer)
}}}else{universalUploader.onFileUploadStop(b.type,b.currentId)
}y=null
}q(p,n)
};
this.doChunkedUpload=function(k,q,s,n){var l=b.files[k];
var w=b._files[k];
var v=new XMLHttpRequest();
var o=!q?true:false;
var u=!o?(s?s:0):0;
var j=16384000;
if(!l){universalUploader.debug("no file!")
}universalUploader.debug("startByte:"+u+" chunkSize : "+b.chunkSize);
var p=b.chunkSize;
var t=!o&&u+b.chunkSize>=w.size;
var m=b.url;
try{m+=(m.indexOf("?")<0?"?":"&")+"chunkedUpload=true&rand="+universalUploader.getUid()+"&";
m+="QuerySize=true&";
m+="FileName="+b._files[k].name+"&";
m+="StartByte=0&";
m+="isMultiPart="+b.chunckedBase64+"&";
m+="Complete=false&";
m+=b.options.postFields_fileId+"="+k
}catch(r){universalUploader.debug(r);
universalUploader.onFileUploadError(b.type,b.currentId,0,r)
}try{v.open("POST",m,true);
v.timeout=b.timeout
}catch(r){universalUploader.debug(r)
}v.addEventListener("error",function(x){universalUploader.debug("xhr error while check file on server");
b.onNetwrokProblem(0,v&&v.statusText?v.statusText:"")
},false);
v.addEventListener("abort",function(x){universalUploader.onFileUploadStop(b.type,b.currentId)
},false);
v.onreadystatechange=function(z){universalUploader.debug("check request onreadystatechange"+this.readyState);
if(this.readyState==4&&!b.stopped){var y=this.responseText;
if(this.status>=200&&this.status<300){try{universalUploader.onFileUploadStart(b.type,b.currentId);
u=parseInt(y)||0;
universalUploader.getProgressInfo(b.type).uploadedSize+=u;
b._files[k].bytesLoaded=u;
universalUploader.getProgressInfo(b.type).lastBytes=u;
setTimeout(function(){b.sendFileChunks(k,u,b.chunkSize)
},10)
}catch(x){universalUploader.debug(x)
}}else{universalUploader.debug("upload next : bad response code");
b.onNetwrokProblem(this.status,this.responseText)
}v.onreadystatechange=null;
v=null;
delete v
}};
if(!b.stopped){v.send()
}else{universalUploader.onFileUploadStop(b.type,b.currentId)
}};
this.onNetwrokProblem=function(j,k){if(b.options.checkConnectionOnIOError){if(!b.checkTimer&&!b.stopped){b.uploadQueue.unshift(b.currentId);
b.checkStartTime=new Date().getTime();
b.checkTimer=setInterval(b.checkConnection,b.options.checkConnectionInterval?b.options.checkConnectionInterval:2000)
}}else{if(b.currentId){universalUploader.onFileUploadError(b.type,b.currentId,j,k)
}setTimeout(function(){b.uploadNext()
},1)
}};
this.checkConnection=function(){var m=(b.options.checkConnectionUntil?b.options.checkConnectionUntil:10)*60;
var l=(new Date().getTime()-b.checkStartTime)/1000;
if(l>m){clearInterval(b.checkTimer);
b.checkTimer=null;
universalUploader.onFileUploadError(b.type,b.currentId,0,"");
b.stop()
}else{var n=new XMLHttpRequest();
universalUploader.debug("checkConnection");
var k=b.url;
k+=(k.indexOf("?")<0?"?":"&")+"rand="+universalUploader.getUid()+"&";
try{n.open("GET",k,true);
n.timeout=1000
}catch(j){universalUploader.debug(j)
}n.addEventListener("error",function(o){if(n){n.onreadystatechange=null;
n=null;
delete n
}},false);
n.onreadystatechange=function(p){if(this.readyState==4){var o=this.responseText;
if(this.status>=200&&this.status<300&&b.checkTimer){clearInterval(b.checkTimer);
b.checkTimer=null;
b.resumeUpload()
}n.onreadystatechange=null;
n=null;
delete n
}};
n.send()
}}
}};
universalUploader.Flash={type:"flash",available:true,options:{},params:{},currentResizeCycle:0,askedToLoadImage:0,features:{resizeImages:true,dragAndDrop:false,imagesPreview:true,chunkedUpload:false,amazonS3:true},inited:false,detectFlashPlayer:function(){var g=[0,0,0],f=null;
if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]=="object"){f=navigator.plugins["Shockwave Flash"].description;
if(f&&!(typeof navigator.mimeTypes!="undefined"&&navigator.mimeTypes["application/x-shockwave-flash"]&&!navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)){plugin=true;
ie=false;
f=f.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
g[0]=parseInt(f.replace(/^(.*)\..*$/,"$1"),10);
g[1]=parseInt(f.replace(/^.*\.(.*)\s.*$/,"$1"),10);
g[2]=/[a-zA-Z]/.test(f)?parseInt(f.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0
}}else{if(typeof window.ActiveXObject!="undefined"){try{var b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
if(b){f=b.GetVariable("$version");
if(f){ie=true;
f=f.split(" ")[1].split(",");
g=[parseInt(f[0],10),parseInt(f[1],10),parseInt(f[2],10)]
}}}catch(c){}}}return g[0]
},initParams:function(b){this.options=universalUploader.extend(this.options,b);
if(!this.renderOwnUi){this.params.hiddenMode=true;
this.params.overlayObjectId="browseButton_"+this.type
}else{if(b.formName){this.params.formName=b.formName
}}this.params.customPostFields=b.postFields_uploaderType+";"+this.type+"|";
if(b.postFields){for(key in b.postFields){if(b.postFields.hasOwnProperty(key)){this.params.customPostFields+=key+";"+b.postFields[key]+"|"
}}}if(b.fileFilter_types){var d=b.fileFilter_types.split(",");
var c=0;
this.params["fileFilter.types"]="Allowed files| ";
for(c=0;
c<d.length;
c++){if(d[c]){this.params["fileFilter.types"]+=(c!=0?":":"")+" *."+d[c]
}}}if(b.postFields_file){this.params["postFields.file"]=b.postFields_file
}if(b.postFields_fileId){this.params["postFields.fileId"]=b.postFields_fileId
}if(b.postFields_fileSize){this.params["postFields.fileSize"]=b.postFields_fileSize
}if(b.postFields_fileIndex){this.params["postFields.fileIndex"]=b.postFields_fileIndex
}if(b.postFields_filesCount){this.params["postFields.filesCount"]=b.postFields_filesCount
}if(b.thumbnailView_width){this.params["thumbnailView.thumbnailWidth"]=b.thumbnailView_width
}if(b.thumbnailView_height){this.params["thumbnailView.thumbnailHeight"]=b.thumbnailView_height
}if(b.resizeImages){var a=universalUploader.getResizeParams(this.type);
this.params.sendThumbnails=true;
this.params.sendOriginalImages=false;
this.params["thumbnail.width"]=a.width;
this.params["thumbnail.height"]=a.height;
this.params["thumbnail.resizeMode"]=a.resizeMode;
this.params["thumbnail.fileName"]=a.filePrefix+"<FILENAME>";
this.params["thumbnail.format"]=a.format=="jpeg"?"JPG":"PNG";
if(a.quality){this.params["thumbnail.jpgQuality"]=a.quality
}}if(this.options.amazonS3){if(this.options.amazonS3.key){this.params["amazonS3.key"]=this.options.amazonS3.key
}this.params["amazonS3.accessKeyId"]=this.options.amazonS3.accessKeyId;
this.params["amazonS3.policy"]=this.options.amazonS3.policy;
this.params["amazonS3.signature"]=this.options.amazonS3.signature;
this.params["amazonS3.acl"]=this.options.amazonS3.acl;
if(this.options.amazonS3.contentType){this.params["amazonS3.contentType"]=this.options.amazonS3.contentType
}}this.params["debug.enabled"]=false;
this.params.uploadUrl=encodeURIComponent(b.url);
this.params.checkConnectionOnIOError=false;
this.params.showIOError=true;
this.params.useExternalInterface="true";
this.params.javaScriptEventsPrefix="universalUploader.Flash.MultiPowUpload";
for(key in b.flash_params){if(b.flash_params.hasOwnProperty(key)){this.params[key]=b.flash_params[key]
}}},init:function(c){var a=this;
a.currentState=universalUploader.FILE_READY;
this._files=[];
this.progressInfo=new universalUploader.ProgressInfo();
this.options=universalUploader.extend(this.options,c);
try{var b=document.createElement("canvas");
b.id="universaluploadercanvas"
}catch(d){this.features.imagesPreview=false
}this.renderOwnUi=c.flash_ownUi;
this.options.swfUrl=c.flash_swfUrl?c.flash_swfUrl:"ElementITMultiPowUpload.swf";
this.params.serialNumber=c.serialNumber;
this.fileView=c.fileView?c.fileView.toLowerCase():"list";
this.initParams(c);
if(this.detectFlashPlayer()<10){this.available=false;
return false
}this.getFlashVars=function(){var e="";
for(key in a.params){if(a.params.hasOwnProperty(key)){e+=key+"="+a.params[key]+"&"
}}return e
};
this.render=function(f){var g=f;
var e='<div id="MultiPowUpload_holder"><strong>You need at least 10 version of Flash player!</strong><a href="http://www.adobe.com/go/getflashplayer">&nbsp;Get Adobe Flash player</a></div>	';
g=g.replace("#BEFORECONTROLS#","");
if(!a.renderOwnUi){g=g.replace("#AFTERBUTTONS#",e);
g=g.replace("#AFTERCONTROLS#","");
g=g.replace("#INSIDELIST#","");
g=g.replace("#AFTERLIST#","")
}else{g=g.replace("#AFTERBUTTONS#","");
g=g.replace(g.substr(g.indexOf("#AFTERCONTROLS#"),g.indexOf("#AFTERLIST#")),"");
g=g.replace("#AFTERCONTROLS#","");
g=g.replace("#AFTERLIST#",e)
}return g
};
this.isProgressVisible=function(){return !a.renderOwnUi
};
this.afterRender=function(){if(!a.inited){universalUploader.setButtonState(a.type,"browseButton_","add",false);
var m={BGColor:"#FFFFFF",wmode:(a.isProgressVisible()?"transparent":"window")};
var h={id:"MultiPowUpload",name:"MultiPowUpload",style:"position: "+(a.isProgressVisible()?"absolute":"relative")+";"};
var g={serialNumber:a.params.serialNumber,useExternalInterface:"true",uploadUrl:a.params.url};
for(key in a.params){if(a.params.hasOwnProperty(key)){g[key]=a.params[key]
}}var l=document.getElementById(a.type+"_content");
var k=l?l.offsetWidth-20:100,f=l?l.offsetHeight-20:100;
if(!a.renderOwnUi){try{var e=document.getElementById(a.type+"_fileList");
if(e){k=e.offsetWidth-3;
f-=document.getElementById("controlsContainer_"+a.type).offsetHeight;
f-=document.getElementById(a.type+"_statusPanel").offsetHeight
}}catch(j){}}swfobject.embedSWF(a.options.swfUrl,"MultiPowUpload_holder",k,f,"10.0.0",null,g,m,h)
}};
this.setResizeParams=function(e){if(a.options.resizeImages){MultiPowUpload.setParameter("sendThumbnails",true);
MultiPowUpload.setParameter("sendOriginalImages",false);
MultiPowUpload.setParameter("thumbnail.width",e.width);
MultiPowUpload.setParameter("thumbnail.height",e.height);
MultiPowUpload.setParameter("thumbnail.resizeMode",e.resizeMode);
MultiPowUpload.setParameter("thumbnail.fileName",e.filePrefix+"<FILENAME>");
MultiPowUpload.setParameter("thumbnail.format",e.format=="jpeg"?"JPG":"PNG");
if(e.quality){MultiPowUpload.setParameter("thumbnail.jpgQuality",e.quality)
}}};
this.setParameters=function(e){a.initParams(e);
a.applyParams()
};
this.applyParams=function(){for(key in a.params){if(a.params.hasOwnProperty(key)){MultiPowUpload.setParameter(key,a.params[key])
}}};
this.upload=function(){this.params.customPostFields=c.postFields_uploaderType+";"+this.type+"|";
if(c.postFields){for(key in c.postFields){if(c.postFields.hasOwnProperty(key)){this.params.customPostFields+=key+";"+c.postFields[key]+"|"
}}MultiPowUpload.setParameter("customPostFields",this.params.customPostFields)
}a.stopped=false;
MultiPowUpload.uploadAll()
};
this.stop=function(){if(!a.stopped){MultiPowUpload.cancelUpload();
a.stopped=true;
a.resizeToUpload=false
}};
this.convertFile=function(f){var e=new universalUploader.File(f.id,f.name,f.size);
e.status=f.status;
e.bytesLoaded=f.percentDone/100*f.size;
return e
};
this.getFiles=function(){return a._files
};
this.clearList=function(){MultiPowUpload.removeAll()
};
this.removeFile=function(e){MultiPowUpload.removeFile(e)
};
this._removeFile=function(e,f){universalUploader.onRemoveFile(a.type,e,f);
if(a._files[e]){a._files.splice(a._files.indexOf(a._files[e]),1);
a._files[e]=null;
delete a._files[e]
}};
this.rotateImage=function(f,e){if(a._files[f]){MultiPowUpload.setImageRotation(f,a._files[f].image.rotation)
}};
this.loadImage=function(e){if(a._files[e]&&a.features.imagesPreview){MultiPowUpload.generateThumbnail(e);
a.askedToLoadImage++
}};
this.MultiPowUpload_onThumbnailGenerateStart=function(){a.resizeToUpload=true;
setTimeout(function(){universalUploader.onResizeImagesStart(a.type)
},10)
};
this.MultiPowUpload_onThumbnailGenerateProgress=function(g,e,f){setTimeout(function(){universalUploader.onResizeImagesProgress(a.type,g,e,f)
},10)
};
this.MultiPowUpload_onThumbnailGenerateComplete=function(){try{var g=MultiPowUpload.getFiles();
for(var f=0;
f<g.length;
f++){a._files[g[f].id].thumbnailSize=g[f].uploadThumbnailSize;
a._files[g[f].id].setSize()
}}catch(h){}setTimeout(function(){universalUploader.onResizeImagesComplete(a.type)
},10)
};
this.MultiPowUpload_onImageLoaded=function(e){if(a.askedToLoadImage>0){a.askedToLoadImage--;
if(a._files[e.id]){a._files[e.id].image.rotation=e.rotateAngle
}if(universalUploader.onImageLoaded){setTimeout(function(){universalUploader.onImageLoaded(a.type,e.id,"data:image/png;base64,"+MultiPowUpload.getFileThumbnail(e.id),false)
},10)
}}};
this.MultiPowUpload_onMovieLoad=function(){a.inited=true;
universalUploader.setButtonState(a.type,"browseButton_","add",true);
if(!a.options.customUI){universalUploader.positionFormUnderButton(document.getElementById("browseButton_"+a.type),null,MultiPowUpload)
}for(var e=a._files.length-1;
e>=0;
e--){a._removeFile(a._files[e].id)
}};
this.MultiPowUpload_onAddFiles=function(m){var e=[],k=null,j=0,l=[0,0,0,0,0,0,0,0,0,0,0,0],h=-1,g=0;
for(var f=0;
f<m.length;
f++){var k=m[f];
if(k.name!=""){k=a.convertFile(m[f]);
h=universalUploader.isValidFile(k,e,j);
if(h<0){e.push(k);
j+=k.size
}else{MultiPowUpload.removeFile(k.id);
l[h]++;
g++
}}}if(g>0){universalUploader.displayResultOfAdd(l)
}for(var f=0;
f<e.length;
f++){a._files[e[f].id]=e[f];
a._files.push(e[f])
}if(e.length>0){setTimeout(function(){universalUploader.onAddFiles(a.type,e)
},100)
}};
this.MultiPowUpload_onRemoveFiles=function(f){for(var e=0;
e<f.length;
e++){a._removeFile(f[e].id)
}};
this.MultiPowUpload_onClearList=function(f){universalUploader.onClearList(a.type);
for(var e=a._files.length-1;
e>=0;
e--){a._removeFile(a._files[e].id,true)
}};
this.MultiPowUpload_onFileStart=function(e){universalUploader.onFileUploadStart(a.type,e.id)
};
this.MultiPowUpload_onProgress=function(e){setTimeout(function(){universalUploader.onFileUploadProgress(a.type,e.id,MultiPowUpload.getProgressInfo().currentFileUploadedBytes)
},10)
};
this.MultiPowUpload_onThumbnailUploadComplete=function(f,e){universalUploader.debug(f.name+" thumbnail uploaded");
setTimeout(function(){universalUploader.onFileUploadProgress(a.type,f.id,MultiPowUpload.getProgressInfo().currentFileUploadedBytes)
},10);
setTimeout(function(){universalUploader.onFileUploadComplete(a.type,f.id,decodeURIComponent(f.serverResponse))
},10)
};
this.MultiPowUpload_onCancel=function(){a.stopped=true;
universalUploader.onFileUploadStop(a.type,MultiPowUpload.getProgressInfo().currentListItem.id)
};
this.MultiPowUpload_onError=function(f,e){universalUploader.onFileUploadError(a.type,f.id,"",e);
a.MultiPowUpload_onCancel()
};
this.MultiPowUpload_onErrorMessage=function(e){universalUploader.onError(a.type,e)
};
this.MultiPowUpload_onStart=function(){universalUploader.onUploadStart(a.type)
};
this.MultiPowUpload_onComplete=function(){universalUploader.onUploadComplete(a.type)
};
this.MultiPowUpload_onServerResponse=function(e){universalUploader.onFileUploadComplete(a.type,e.id,decodeURIComponent(e.serverResponse))
}
}};
swfobject=function(){var aq="undefined",aD="object",ab="Shockwave Flash",X="ShockwaveFlash.ShockwaveFlash",aE="application/x-shockwave-flash",ac="SWFObjectExprInst",ax="onreadystatechange",af=window,aL=document,aB=navigator,aa=false,Z=[aN],aG=[],ag=[],al=[],aJ,ad,ap,at,ak=false,aU=false,aH,an,aI=true,ah=function(){var a=typeof aL.getElementById!=aq&&typeof aL.getElementsByTagName!=aq&&typeof aL.createElement!=aq,e=aB.userAgent.toLowerCase(),c=aB.platform.toLowerCase(),h=c?/win/.test(c):/win/.test(e),k=c?/mac/.test(c):/mac/.test(e),g=/webkit/.test(e)?parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,d=!+"\v1",f=[0,0,0],l=null;
if(typeof aB.plugins!=aq&&typeof aB.plugins[ab]==aD){l=aB.plugins[ab].description;
if(l&&!(typeof aB.mimeTypes!=aq&&aB.mimeTypes[aE]&&!aB.mimeTypes[aE].enabledPlugin)){aa=true;
d=false;
l=l.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
f[0]=parseInt(l.replace(/^(.*)\..*$/,"$1"),10);
f[1]=parseInt(l.replace(/^.*\.(.*)\s.*$/,"$1"),10);
f[2]=/[a-zA-Z]/.test(l)?parseInt(l.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0
}}else{if(typeof af.ActiveXObject!=aq){try{var j=new ActiveXObject(X);
if(j){l=j.GetVariable("$version");
if(l){d=true;
l=l.split(" ")[1].split(",");
f=[parseInt(l[0],10),parseInt(l[1],10),parseInt(l[2],10)]
}}}catch(b){}}}return{w3:a,pv:f,wk:g,ie:d,win:h,mac:k}
}(),aK=function(){if(!ah.w3){return
}if((typeof aL.readyState!=aq&&aL.readyState=="complete")||(typeof aL.readyState==aq&&(aL.getElementsByTagName("body")[0]||aL.body))){aP()
}if(!ak){if(typeof aL.addEventListener!=aq){aL.addEventListener("DOMContentLoaded",aP,false)
}if(ah.ie&&ah.win){aL.attachEvent(ax,function(){if(aL.readyState=="complete"){aL.detachEvent(ax,arguments.callee);
aP()
}});
if(af==top){(function(){if(ak){return
}try{aL.documentElement.doScroll("left")
}catch(a){setTimeout(arguments.callee,0);
return
}aP()
})()
}}if(ah.wk){(function(){if(ak){return
}if(!/loaded|complete/.test(aL.readyState)){setTimeout(arguments.callee,0);
return
}aP()
})()
}aC(aP)
}}();
function aP(){if(ak){return
}try{var b=aL.getElementsByTagName("body")[0].appendChild(ar("span"));
b.parentNode.removeChild(b)
}catch(a){return
}ak=true;
var d=Z.length;
for(var c=0;
c<d;
c++){Z[c]()
}}function aj(a){if(ak){a()
}else{Z[Z.length]=a
}}function aC(a){if(typeof af.addEventListener!=aq){af.addEventListener("load",a,false)
}else{if(typeof aL.addEventListener!=aq){aL.addEventListener("load",a,false)
}else{if(typeof af.attachEvent!=aq){aM(af,"onload",a)
}else{if(typeof af.onload=="function"){var b=af.onload;
af.onload=function(){b();
a()
}
}else{af.onload=a
}}}}}function aN(){if(aa){Y()
}else{am()
}}function Y(){var d=aL.getElementsByTagName("body")[0];
var b=ar(aD);
b.setAttribute("type",aE);
var a=d.appendChild(b);
if(a){var c=0;
(function(){if(typeof a.GetVariable!=aq){var e=a.GetVariable("$version");
if(e){e=e.split(" ")[1].split(",");
ah.pv=[parseInt(e[0],10),parseInt(e[1],10),parseInt(e[2],10)]
}}else{if(c<10){c++;
setTimeout(arguments.callee,10);
return
}}d.removeChild(b);
a=null;
am()
})()
}else{am()
}}function am(){var g=aG.length;
if(g>0){for(var h=0;
h<g;
h++){var c=aG[h].id;
var m=aG[h].callbackFn;
var a={success:false,id:c};
if(ah.pv[0]>0){var j=aS(c);
if(j){if(ao(aG[h].swfVersion)&&!(ah.wk&&ah.wk<312)){ay(c,true);
if(m){a.success=true;
a.ref=av(c);
m(a)
}}else{if(aG[h].expressInstall&&au()){var e={};
e.data=aG[h].expressInstall;
e.width=j.getAttribute("width")||"0";
e.height=j.getAttribute("height")||"0";
if(j.getAttribute("class")){e.styleclass=j.getAttribute("class")
}if(j.getAttribute("align")){e.align=j.getAttribute("align")
}var f={};
var d=j.getElementsByTagName("param");
var l=d.length;
for(var k=0;
k<l;
k++){if(d[k].getAttribute("name").toLowerCase()!="movie"){f[d[k].getAttribute("name")]=d[k].getAttribute("value")
}}ae(e,f,c,m)
}else{aF(j);
if(m){m(a)
}}}}}else{ay(c,true);
if(m){var b=av(c);
if(b&&typeof b.SetVariable!=aq){a.success=true;
a.ref=b
}m(a)
}}}}}function av(b){var d=null;
var c=aS(b);
if(c&&c.nodeName=="OBJECT"){if(typeof c.SetVariable!=aq){d=c
}else{var a=c.getElementsByTagName(aD)[0];
if(a){d=a
}}}return d
}function au(){return !aU&&ao("6.0.65")&&(ah.win||ah.mac)&&!(ah.wk&&ah.wk<312)
}function ae(f,d,h,e){aU=true;
ap=e||null;
at={success:false,id:h};
var a=aS(h);
if(a){if(a.nodeName=="OBJECT"){aJ=aO(a);
ad=null
}else{aJ=a;
ad=h
}f.id=ac;
if(typeof f.width==aq||(!/%$/.test(f.width)&&parseInt(f.width,10)<310)){f.width="310"
}if(typeof f.height==aq||(!/%$/.test(f.height)&&parseInt(f.height,10)<137)){f.height="137"
}aL.title=aL.title.slice(0,47)+" - Flash Player Installation";
var b=ah.ie&&ah.win?"ActiveX":"PlugIn",c="MMredirectURL="+af.location.toString().replace(/&/g,"%26")+"&MMplayerType="+b+"&MMdoctitle="+aL.title;
if(typeof d.flashvars!=aq){d.flashvars+="&"+c
}else{d.flashvars=c
}if(ah.ie&&ah.win&&a.readyState!=4){var g=ar("div");
h+="SWFObjectNew";
g.setAttribute("id",h);
a.parentNode.insertBefore(g,a);
a.style.display="none";
(function(){if(a.readyState==4){a.parentNode.removeChild(a)
}else{setTimeout(arguments.callee,10)
}})()
}aA(f,d,h)
}}function aF(a){if(ah.ie&&ah.win&&a.readyState!=4){var b=ar("div");
a.parentNode.insertBefore(b,a);
b.parentNode.replaceChild(aO(a),b);
a.style.display="none";
(function(){if(a.readyState==4){a.parentNode.removeChild(a)
}else{setTimeout(arguments.callee,10)
}})()
}else{a.parentNode.replaceChild(aO(a),a)
}}function aO(b){var d=ar("div");
if(ah.win&&ah.ie){d.innerHTML=b.innerHTML
}else{var e=b.getElementsByTagName(aD)[0];
if(e){var a=e.childNodes;
if(a){var f=a.length;
for(var c=0;
c<f;
c++){if(!(a[c].nodeType==1&&a[c].nodeName=="PARAM")&&!(a[c].nodeType==8)){d.appendChild(a[c].cloneNode(true))
}}}}}return d
}function aA(e,g,c){var d,a=aS(c);
if(ah.wk&&ah.wk<312){return d
}if(a){if(typeof e.id==aq){e.id=c
}if(ah.ie&&ah.win){var f="";
for(var j in e){if(e[j]!=Object.prototype[j]){if(j.toLowerCase()=="data"){g.movie=e[j]
}else{if(j.toLowerCase()=="styleclass"){f+=' class="'+e[j]+'"'
}else{if(j.toLowerCase()!="classid"){f+=" "+j+'="'+e[j]+'"'
}}}}}var h="";
for(var k in g){if(g[k]!=Object.prototype[k]){h+='<param name="'+k+'" value="'+g[k]+'" />'
}}a.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+f+">"+h+"</object>";
ag[ag.length]=e.id;
d=aS(e.id)
}else{var b=ar(aD);
b.setAttribute("type",aE);
for(var l in e){if(e[l]!=Object.prototype[l]){if(l.toLowerCase()=="styleclass"){b.setAttribute("class",e[l])
}else{if(l.toLowerCase()!="classid"){b.setAttribute(l,e[l])
}}}}for(var m in g){if(g[m]!=Object.prototype[m]&&m.toLowerCase()!="movie"){aQ(b,m,g[m])
}}a.parentNode.replaceChild(b,a);
d=b
}}return d
}function aQ(b,d,c){var a=ar("param");
a.setAttribute("name",d);
a.setAttribute("value",c);
b.appendChild(a)
}function aw(a){var b=aS(a);
if(b&&b.nodeName=="OBJECT"){if(ah.ie&&ah.win){b.style.display="none";
(function(){if(b.readyState==4){aT(a)
}else{setTimeout(arguments.callee,10)
}})()
}else{b.parentNode.removeChild(b)
}}}function aT(a){var b=aS(a);
if(b){for(var c in b){if(typeof b[c]=="function"){b[c]=null
}}b.parentNode.removeChild(b)
}}function aS(a){var c=null;
try{c=aL.getElementById(a)
}catch(b){}return c
}function ar(a){return aL.createElement(a)
}function aM(a,c,b){a.attachEvent(c,b);
al[al.length]=[a,c,b]
}function ao(a){var b=ah.pv,c=a.split(".");
c[0]=parseInt(c[0],10);
c[1]=parseInt(c[1],10)||0;
c[2]=parseInt(c[2],10)||0;
return(b[0]>c[0]||(b[0]==c[0]&&b[1]>c[1])||(b[0]==c[0]&&b[1]==c[1]&&b[2]>=c[2]))?true:false
}function az(b,f,a,c){if(ah.ie&&ah.mac){return
}var e=aL.getElementsByTagName("head")[0];
if(!e){return
}var g=(a&&typeof a=="string")?a:"screen";
if(c){aH=null;
an=null
}if(!aH||an!=g){var d=ar("style");
d.setAttribute("type","text/css");
d.setAttribute("media",g);
aH=e.appendChild(d);
if(ah.ie&&ah.win&&typeof aL.styleSheets!=aq&&aL.styleSheets.length>0){aH=aL.styleSheets[aL.styleSheets.length-1]
}an=g
}if(ah.ie&&ah.win){if(aH&&typeof aH.addRule==aD){aH.addRule(b,f)
}}else{if(aH&&typeof aL.createTextNode!=aq){aH.appendChild(aL.createTextNode(b+" {"+f+"}"))
}}}function ay(a,c){if(!aI){return
}var b=c?"visible":"hidden";
if(ak&&aS(a)){aS(a).style.visibility=b
}else{az("#"+a,"visibility:"+b)
}}function ai(b){var a=/[\\\"<>\.;]/;
var c=a.exec(b)!=null;
return c&&typeof encodeURIComponent!=aq?encodeURIComponent(b):b
}var aR=function(){if(ah.ie&&ah.win){window.attachEvent("onunload",function(){var a=al.length;
for(var b=0;
b<a;
b++){al[b][0].detachEvent(al[b][1],al[b][2])
}var d=ag.length;
for(var c=0;
c<d;
c++){aw(ag[c])
}for(var e in ah){ah[e]=null
}ah=null;
for(var f in swfobject){swfobject[f]=null
}swfobject=null
})
}}();
return{registerObject:function(a,e,c,b){if(ah.w3&&a&&e){var d={};
d.id=a;
d.swfVersion=e;
d.expressInstall=c;
d.callbackFn=b;
aG[aG.length]=d;
ay(a,false)
}else{if(b){b({success:false,id:a})
}}},getObjectById:function(a){if(ah.w3){return av(a)
}},embedSWF:function(l,e,h,f,c,a,b,j,g,k){var d={success:false,id:e};
if(ah.w3&&!(ah.wk&&ah.wk<312)&&l&&e&&h&&f&&c){ay(e,false);
aj(function(){h+="";
f+="";
var r={};
if(g&&typeof g===aD){for(var p in g){r[p]=g[p]
}}r.data=l;
r.width=h;
r.height=f;
var o={};
if(j&&typeof j===aD){for(var q in j){o[q]=j[q]
}}if(b&&typeof b===aD){for(var m in b){if(typeof o.flashvars!=aq){o.flashvars+="&"+m+"="+b[m]
}else{o.flashvars=m+"="+b[m]
}}}if(ao(c)){var n=aA(r,o,e);
if(r.id==e){ay(e,true)
}d.success=true;
d.ref=n
}else{if(a&&au()){r.data=a;
ae(r,o,e,k);
return
}else{ay(e,true)
}}if(k){k(d)
}})
}else{if(k){k(d)
}}},switchOffAutoHideShow:function(){aI=false
},ua:ah,getFlashPlayerVersion:function(){return{major:ah.pv[0],minor:ah.pv[1],release:ah.pv[2]}
},hasFlashPlayerVersion:ao,createSWF:function(a,b,c){if(ah.w3){return aA(a,b,c)
}else{return undefined
}},showExpressInstall:function(b,a,d,c){if(ah.w3&&au()){ae(b,a,d,c)
}},removeSWF:function(a){if(ah.w3){aw(a)
}},createCSS:function(b,a,c,d){if(ah.w3){az(b,a,c,d)
}},addDomLoadEvent:aj,addLoadEvent:aC,getQueryParamValue:function(b){var a=aL.location.search||aL.location.hash;
if(a){if(/\?/.test(a)){a=a.split("?")[1]
}if(b==null){return ai(a)
}var c=a.split("&");
for(var d=0;
d<c.length;
d++){if(c[d].substring(0,c[d].indexOf("="))==b){return ai(c[d].substring((c[d].indexOf("=")+1)))
}}}return""
},expressInstallCallback:function(){if(aU){var a=aS(ac);
if(a&&aJ){a.parentNode.replaceChild(aJ,a);
if(ad){ay(ad,true);
if(ah.ie&&ah.win){aJ.style.display="block"
}}if(ap){ap(at)
}}aU=false
}}}
}();
universalUploader.Silverlight={type:"silverlight",available:true,options:{},params:{},currentResizeCycle:0,uploadController:null,inited:false,features:{resizeImages:true,dragAndDrop:false,imagesPreview:true,chunkedUpload:true},detectSilverlightVersion:function(b){var a;
try{try{var f=new ActiveXObject("AgControl.AgControl");
if(f.IsVersionSupported(b)){a=Number(b)
}else{a=Number(b)-1
}}catch(d){var c=navigator.plugins["Silverlight Plug-In"];
if(c){if(c.description==="1.0.30226.2"){a=2
}else{a=parseInt(c.description[0])
}}else{a=0
}}}catch(d){a=0
}return a
},initParams:function(b){this.options=universalUploader.extend(this.options,b);
this.params.LicenseKey=b.serialNumber;
this.params.HandlersObject="universalUploader.Silverlight";
this.params.ChunkMultipart=true;
this.params.ChunkSize=b.chunkSize<0?0:b.chunkSize;
this.params.MaxChunkSize=b.maxChunkSize?b.maxChunkSize:-1;
if(!this.renderOwnUi){this.params.HiddenMode=true
}else{if(b.formName){this.params.FormName=b.formName
}}this.params.CustomPostFields=b.postFields_uploaderType+";"+this.type+"|";
if(b.postFields){for(key in b.postFields){if(b.postFields.hasOwnProperty(key)){this.params.CustomPostFields+=key+";"+b.postFields[key]+"|"
}}}if(b.fileFilter_types){var d=b.fileFilter_types.split(",");
var c=0;
this.params.FileTypesFilter="Allowed files| ";
for(c=0;
c<d.length;
c++){this.params.FileTypesFilter+=(c!=0?";":"")+"*."+d[c]
}}if(b.postFields_file){this.params.PostFieldsFile=b.postFields_file
}if(b.postFields_fileId){this.params.PostFieldsFileId=b.postFields_fileId
}if(b.postFields_fileSize){this.params.PostFieldsFileSize=b.postFields_fileSize
}if(b.postFields_filesCount){this.params.PostFieldsFilesCount=b.postFields_filesCount
}if(b.thumbnailView_width){this.params.ThumbnailViewImageWidth=b.thumbnailView_width
}if(b.thumbnailView_height){this.params.ThumbnailViewImageHeight=b.thumbnailView_height
}this.params.ThumbnailResizeSmall=false;
if(b.resizeImages){var a=universalUploader.getResizeParams(this.type);
this.params.ResizeImages=true;
this.params.ImageWidth=a.width;
this.params.ImageHeight=a.height;
this.params.ImageResizeMode=a.resizeMode;
this.params.ImageResizeFormat=a.format;
if(a.quality){this.params.JpegQuality=a.quality
}}this.params.UploadHandler=b.url+(b.url.indexOf("?")>=0?"&":"?")+"chunkedUpload=true";
for(key in b.silverlight_params){if(b.silverlight_params.hasOwnProperty(key)){this.params[key]=b.silverlight_params[key]
}}},init:function(c){var a=this;
a.currentState=universalUploader.FILE_READY;
this._files=[];
this.options=universalUploader.extend(this.options,c);
this.fileView=a.options.fileView?a.options.fileView.toLowerCase():"list";
this.progressInfo=new universalUploader.ProgressInfo();
this.renderOwnUi=c.silverlight_ownUi;
this.options.xapUrl=c.silverlight_xapUrl?c.silverlight_xapUrl:"UltimateUploader.xap";
try{var b=document.createElement("canvas");
b.id="universaluploadercanvas"
}catch(d){this.features.imagesPreview=false
}this.initParams(c);
if(this.detectSilverlightVersion("4.0")<4){this.available=false;
return false
}this.getInitParams=function(){var e="";
for(key in a.params){if(a.params.hasOwnProperty(key)){e+=key+"="+a.params[key]+","
}}return e
},this.render=function(e){var f=e;
f=f.replace("#BEFORECONTROLS#","");
f=f.replace("#AFTERBUTTONS#","");
f=f.replace("#AFTERCONTROLS#","");
f=f.replace("#INSIDELIST#","");
f=f.replace("#AFTERLIST#","");
return f
};
this.isProgressVisible=function(){return !a.renderOwnUi
};
this.afterRender=function(){if(!a.inited){a.inited=true;
universalUploader.setButtonState(a.type,"browseButton_","add",false);
var k=document.getElementById(a.type+"_content");
var h=k?k.offsetWidth-20:1,f=k?k.offsetHeight-20:1;
var g=document.createElement("div");
g.id="silverlightHolder_"+a.type;
if(!a.renderOwnUi){g.style.position="absolute";
g.style.top="0px";
g.style.zIndex="99999"
}try{g.style.width=h+"px";
g.style.height=f+"px"
}catch(j){}if(!a.options.customUI&&document.getElementById(a.type+"_content")){document.getElementById(a.type+"_content").appendChild(g)
}else{document.getElementById(a.options.holder).appendChild(g)
}g.innerHTML='<object id="ultimateUploader" data="data:application/x-silverlight-2," type="application/x-silverlight-2" width="100%" height="100%" ><param name="source" value="'+a.options.xapUrl+'" /><param name="windowless" value="'+(!a.renderOwnUi?"true":"false")+'"/><param name="minRuntimeVersion" value="4.0.50826.0" />'+(!a.renderOwnUi?'<param name="background" value="Transparent"/>':"")+'<param name="enablehtmlaccess" value="true"/><param name="autoUpgrade" value="true" /><param name="initParams" value="'+a.getInitParams()+'" /></object>'
}};
this.setResizeParams=function(f){if(a.options.resizeImages){uploadController.ResizeImages=true;
uploadController.ImageWidth=f.width;
uploadController.ImageHeight=f.height;
if(f.resizeMode){var e=f.resizeMode.toLowerCase();
if(e=="fit"){uploadController.ImageResizeMode=0
}else{if(e=="fitbywidth"){uploadController.ImageResizeMode=1
}else{if(e=="fitbyheight"){uploadController.ImageResizeMode=2
}}}}uploadController.ImageResizeFormat=f.format;
uploadController.ThumbNameTemplate=f.filePrefix+"{0}";
uploadController.ResizedImageNameTemplate=f.filePrefix+"{0}";
if(f.quality){uploadController.JpegQuality=f.quality
}}};
this.setParameters=function(e){a.initParams(e);
a.applyParams()
};
this.applyParams=function(){for(key in a.params){if(a.params.hasOwnProperty(key)){try{uploadController[key]=a.params[key]
}catch(f){universalUploader.debug(f)
}}}};
this.upload=function(){this.params.CustomPostFields=c.postFields_uploaderType+";"+this.type+"|";
if(c.postFields){for(key in c.postFields){if(c.postFields.hasOwnProperty(key)){this.params.CustomPostFields+=key+";"+c.postFields[key]+"|"
}}uploadController.CustomPostFields=this.params.CustomPostFields
}if(a.uploadController){this.stopped=false;
uploadController.StartUpload()
}};
this.stop=function(){if(!a.stopped){if(a.uploadController){uploadController.CancelUpload()
}a.stopped=true
}};
this.convertFile=function(f){var e=new universalUploader.File(f.Id,f.FileName,f.FileLength);
e.status=f.Status;
switch(f.Status){case 0:e.status=0;
break;
case 1:e.status=1;
break;
case 2:e.status=0;
break;
case 3:e.status=2;
break;
case 4:e.status=4;
break;
case 5:e.status=5;
break
}e.bytesLoaded=f.UploadPercent/100*f.FileLength;
return e
};
this.getFiles=function(){return a._files
};
this.clearList=function(){if(a.uploadController){uploadController.RemoveAll()
}};
this.removeFile=function(e){if(a.uploadController){uploadController.RemoveFile(e)
}};
this._removeFile=function(e,f){universalUploader.onRemoveFile(a.type,e,f);
if(a._files[e]){a._files.splice(a._files.indexOf(a._files[e]),1);
a._files[e]=null;
delete a._files[e]
}};
this.loadImage=function(e){if(a._files[e]&&a.features.imagesPreview){uploadController.GenerateImagePreview(e)
}};
this.rotateImage=function(f,e){if(a._files[f]){uploadController.RotateImage(f,a._files[f].image.rotation)
}}
},onPreviewLoaded:function(b){var a=this.type;
if(universalUploader.onImageLoaded){setTimeout(function(){universalUploader.onImageLoaded(a,b.Id,"data:image/jpeg;base64,"+uploadController.GetImagePreview(b.Id),false)
},10)
}},onImagesResizeStart:function(b){var a=this.type;
if(universalUploader.onResizeImagesStart){setTimeout(function(){universalUploader.onResizeImagesStart(a)
},10)
}},onImagesResizeProgress:function(b){var a=this.type;
if(universalUploader.onResizeImagesProgress){setTimeout(function(){universalUploader.onResizeImagesProgress(a,b.CompleteCount,b.TotalCount,0)
},10)
}},onImagesResizeComplete:function(d){var c=this.type;
var a=uploadController.GetFiles();
var e;
for(var b=0;
b<a.length;
b++){if(a[b].IsImage){e=this._files[a[b].Id];
e.thumbnailSize=a[b].FileLength;
e.setSize()
}}if(universalUploader.onResizeImagesComplete){setTimeout(function(){universalUploader.onResizeImagesComplete(c)
},10)
}},onFileUploadStart:function(a){universalUploader.onFileUploadStart(this.type,a.Id)
},onFileUploadResume:function(a){universalUploader.onFileUploadStart(this.type,a.Id)
},onFileUploadProgress:function(a){universalUploader.onFileUploadProgress(this.type,a.Id,a.BytesUploaded)
},onFileUploadCancel:function(a){this.stopped=true;
universalUploader.onFileUploadStop(this.type,a.Id)
},onUploadCancel:function(){this.stopped=true
},onError:function(a){universalUploader.onFileUploadError(this.type,a.Id,"",a.ErrorMessage)
},onUploadStart:function(){this.stopped=false;
universalUploader.onUploadStart(this.type)
},onUploadComplete:function(){universalUploader.onUploadComplete(this.type)
},onFileUploadComplete:function(a){var b=a.ServerResponse;
universalUploader.onFileUploadComplete(this.type,a.Id,b)
},onRemoveFiles:function(c){var b=c.Files;
for(var a=0;
a<b.length;
a++){this._removeFile(b[a].Id)
}},onClearList:function(b){universalUploader.onClearList(this.type);
for(var a=this._files.length-1;
a>=0;
a--){this._removeFile(this._files[a].id,true)
}},onAddFiles:function(a){var j=a.Files;
var h=[],c=null,d=0,g=[0,0,0,0,0,0,0,0,0,0,0,0],f=-1,b=0;
for(var e=0;
e<j.length;
e++){var c=j[e];
if(c.FileName!=""){c=this.convertFile(j[e]);
f=universalUploader.isValidFile(c,h,d);
if(f<0){h.push(c);
d+=c.size
}else{g[f]++;
b++
}}}if(b>0){universalUploader.displayResultOfAdd(g)
}for(var e=0;
e<h.length;
e++){this._files[h[e].id]=h[e];
this._files.push(h[e])
}if(h.length>0){universalUploader.onAddFiles(this.type,h)
}},onInit:function(){this.inited=true;
this.uploadController=document.getElementById("ultimateUploader").Content.JSAPI;
universalUploader.setButtonState(this.type,"browseButton_","add",true);
var b=document.getElementById("silverlightHolder_"+this.type);
var e=document.getElementById("browseButton_"+this.type);
if(b!=null&&e!=null&&!this.renderOwnUi){if(!b.style.position||b.style.position!="absolute"){b.style.position="absolute"
}b.style.width=e.offsetWidth+"px";
b.style.height=e.offsetHeight+"px";
var d=0;
var c=0;
var a=e;
while(a&&a.tagName!="BODY"&&b.offsetParent!=a&&a.nodeType){d+=a.offsetTop||0;
c+=a.offsetLeft||0;
a=a.offsetParent
}a=e.parentNode;
while(a&&a.tagName!="BODY"&&b.offsetParent!=a&&a.nodeType){c-=a.scrollLeft||0;
d-=a.scrollTop||0;
a=a.parentNode
}b.style.top=d+"px";
b.style.left=c+"px";
universalUploader.positionFormUnderButton(e,null,document.getElementById("ultimateUploader"))
}uploadController=document.getElementById("ultimateUploader").Content.JSAPI
}};
universalUploader.Java={type:"java",available:true,options:{},params:{},currentResizeCycle:0,inited:false,JPU:null,features:{resizeImages:true,dragAndDrop:true,imagesPreview:true,chunkedUpload:true,amazonS3:true},isRequiredJavaInstalled:function(){return(navigator.javaEnabled()||navigator.javaEnabled)&&!universalUploader.isAndroid()&&!universalUploader.isIOS()
},isSafari:function(){return(navigator.userAgent.indexOf("Safari")>=0&&navigator.userAgent.indexOf("Chrome")<0)
},initDeployJava:function(){},initParams:function(b){this.options=universalUploader.extend(this.options,b);
this.params["Common.SerialNumber"]=this.options.serialNumber;
if(!this.renderOwnUi){this.params["Common.RunHidden"]=true
}this.params["Upload.HttpUpload.CustomPostFields"]=!this.options.amazonS3?b.postFields_uploaderType+"="+this.type+";":"";
if(b.postFields&&!this.options.amazonS3){for(key in b.postFields){if(b.postFields.hasOwnProperty(key)){this.params["Upload.HttpUpload.CustomPostFields"]+=key+"="+b.postFields[key]+";"
}}}if(b.resizeImages){var a=universalUploader.getResizeParams(this.type);
this.params["Upload.Thumbnails.Upload"]=true;
this.params["Upload.Thumbnails.UploadOriginalFile"]=false;
this.params["Upload.Thumbnails.Width"]=a.width;
this.params["Upload.Thumbnails.Height"]=a.height;
this.params["Upload.Thumbnails.FilePrefix"]=a.filePrefix;
this.params["Upload.Thumbnails.ResizeMode"]=a.resizeMode;
this.params["Upload.Thumbnails.Format"]=a.format;
if(a.quality){this.params["Upload.Thumbnails.JPEGQuality"]=a.quality
}}if(this.options.amazonS3){if(this.options.amazonS3.key){this.params["Upload.AmazonS3.Key"]=decodeURIComponent(this.options.amazonS3.key).replace("<FILENAME>","#FILENAME#")
}this.params["Upload.AmazonS3.AccessKeyId"]=decodeURIComponent(this.options.amazonS3.accessKeyId);
this.params["Upload.AmazonS3.Policy"]=decodeURIComponent(this.options.amazonS3.policy);
this.params["Upload.AmazonS3.Signature"]=decodeURIComponent(this.options.amazonS3.signature);
this.params["Upload.AmazonS3.Acl"]=decodeURIComponent(this.options.amazonS3.acl);
if(this.options.amazonS3.contentType){this.params["Upload.AmazonS3.ContentType"]=this.options.amazonS3.contentType.replace("<AUTODETECT>","#AUTODETECT#")
}}if(b.fileView&&b.fileView=="thumbnails"){this.params["Common.DetailsArea.Thumbnails.Cell.ThumbHeight"]=b.thumbnailView_width;
this.params["Common.DetailsArea.Thumbnails.Cell.ThumbWidth"]=b.thumbnailView_height
}if(b.chunkedUpload){this.params["Upload.HttpUpload.ChunkedUpload.Enabled"]=true;
this.params["Upload.HttpUpload.ChunkedUpload.ChunkSize"]=b.chunkSize;
this.params["Upload.HttpUpload.ChunkedUpload.MaxChunkSize"]=b.maxChunkSize?b.maxChunkSize:-1;
this.params["Upload.HttpUpload.ChunkedUpload.Multipart"]=true;
this.params["Upload.UploadUrl"]=b.url+(b.url.indexOf("?")>=0?"&":"?")+"chunkedUpload=true"
}else{this.params["Upload.UploadUrl"]=b.url
}if(b.postFields_file){this.params["Upload.HttpUpload.FieldName.FileBody"]=b.postFields_file
}if(b.postFields_fileSize){this.params["Upload.HttpUpload.FieldName.FileSize"]=b.postFields_fileSize
}if(b.postFields_fileIndex){this.params["Upload.HttpUpload.FieldName.FileIndex"]=b.postFields_fileIndex
}if(b.postFields_filePath){this.params["Upload.HttpUpload.FieldName.FilePath"]=b.postFields_filePath
}if(b.fileFilter_types){var d=b.fileFilter_types.split(",");
var c=0;
this.params["Upload.FileFilter.Types"]="";
for(c=0;
c<d.length;
c++){if(d[c]){this.params["Upload.FileFilter.Types"]+=(c!=0?",":"")+d[c]
}}}this.params["Common.UploadMode"]="true";
this.params["Common.ShowErrorMessages"]="false";
this.params["Upload.HttpUpload.MaxFilesCountPerRequest"]="1";
this.params["Common.UseLiveConnect"]="true";
this.params["Common.JavaScriptEventsPrefix"]="JavaPowUpload_";
this.params["Common.JavaScriptEventsContext"]="universalUploader.Java";
for(key in b.java_params){if(b.java_params.hasOwnProperty(key)){this.params[key]=b.java_params[key]
}}},init:function(c){var a=this;
this.options=universalUploader.extend(this.options,c);
a.currentState=universalUploader.FILE_READY;
this._files=[];
this.progressInfo=new universalUploader.ProgressInfo();
this.fileView=c.fileView?c.fileView.toLowerCase():"list";
this.renderOwnUi=c.java_ownUi;
this.options.codebase=c.java_libPath?c.java_libPath:"uploaders/java/";
this.initParams(c);
if(!this.isRequiredJavaInstalled()){this.available=false;
return false
}try{var b=document.createElement("canvas");
b.id="universaluploadercanvas"
}catch(d){this.features.imagesPreview=false
}this.render=function(f){var g=f;
var e='<div id="JavaPowUpload_holder"><span style="border:1px  solid #FF0000;display:block;padding:5px;margin-top:10px;margin-bottom:10px;text-align:left; background: #FDF2F2;color:#000;">You should <b>enable applets</b> running at browser and to have the <b>Java</b> (JRE) version &gt;= 1.5.<br />If applet is not displaying properly, please check <a target="_blank" href="http://java.com/en/download/help/testvm.xml" title="Check Java applets">additional configurations</a></span></div>	';
g=g.replace("#BEFORECONTROLS#","");
if(!a.renderOwnUi){g=g.replace("#AFTERBUTTONS#","");
g=g.replace("#AFTERCONTROLS#","");
g=g.replace("#INSIDELIST#",e);
g=g.replace("#AFTERLIST#","")
}else{g=g.replace("#AFTERBUTTONS#","");
g=g.replace(g.substr(g.indexOf("#AFTERCONTROLS#"),g.indexOf("#AFTERLIST#")),"");
g=g.replace("#AFTERCONTROLS#","");
g=g.replace("#AFTERLIST#",e)
}return g
};
this.isProgressVisible=function(){return !a.renderOwnUi
};
this.afterRender=function(){if(!a.inited){universalUploader.setButtonState(a.type,"browseButton_","add",false);
if(document.getElementById("browseButton_"+a.type)){universalUploader.addEventListener("click",document.getElementById("browseButton_"+a.type),function(){universalUploader.Java.browseFiles()
})
}var n=document.getElementById(a.type+"_content");
var k=n?n.offsetWidth-20:1,f=n?n.offsetHeight-20:1;
var h={codebase:this.options.codebase,code:"com.elementit.JavaPowUpload.Manager",archive:"commons-httpclient.jar, JavaPowUpload.jar",name:"JavaPowUpload",id:"JavaPowUpload",mayscript:"true",alt:"JavaPowUpload by www.element-it.com",width:k,height:f};
var l={};
var g="1.5";
for(key in a.params){if(a.params.hasOwnProperty(key)){l[key]=a.params[key]
}}var j=document.getElementById("JavaPowUpload_holder");
j.innerHTML=this.getAppletTag(h,l);
if(!a.renderOwnUi){j.style.position="absolute";
j.style.top="10px";
j.style.zIndex="99999"
}try{j.style.width=k+"px";
j.style.height=f+"px"
}catch(m){}}universalUploader.addEventListener("dragenter",document.body,a.dragenter);
universalUploader.addEventListener("dragover",document.body,a.dragover);
universalUploader.addEventListener("dragend",document.body,a.dragend)
};
this.dragover=function(f){try{if(f.preventDefault){f.preventDefault()
}if(f.stopPropagation){f.stopPropagation()
}if(window.event){window.event.returnValue=false
}if(f.stopEvent){f.stopEvent()
}}catch(f){if(debugmode){throw f
}}if(a.dndTimeout){clearTimeout(a.dndTimeout)
}a.dndTimeout=setTimeout(a.dragend,3000)
};
this.dragenter=function(j){try{if(j.preventDefault){j.preventDefault()
}if(j.stopPropagation){j.stopPropagation()
}if(window.event){window.event.returnValue=false
}if(j.stopEvent){j.stopEvent()
}}catch(j){if(debugmode){throw j
}}if(a.dndTimeout){clearTimeout(a.dndTimeout)
}a.dndTimeout=setTimeout(a.dragend,3000);
var k=document.getElementById(a.type+"_content");
if(!k){k=document.getElementById(a.options.holder)
}var g=document.getElementById("JavaPowUpload_holder");
var h=k?k.offsetWidth-20:1,f=k?k.offsetHeight-20:1;
if(!a.renderOwnUi){g.style.position=document.getElementById(a.type+"_content")?"absolute":"relative";
g.style.top="10px";
g.style.zIndex="99999";
try{g.style.width=h+"px";
g.style.height=f+"px";
a.JPU.width=h;
a.JPU.height=f
}catch(j){}}return false
};
this.dragend=function(j){try{var k=document.getElementById(a.type+"_content");
var g=document.getElementById("JavaPowUpload_holder");
var h=k?k.offsetWidth-20:1,f=k?k.offsetHeight-20:1;
if(!a.renderOwnUi){g.style.position="absolute";
g.style.top="10px";
g.style.zIndex="99999";
try{g.style.width="1px";
g.style.height="1px";
a.JPU.width=1;
a.JPU.height=1
}catch(j){}}}catch(j){throw j
}};
this.getAppletTag=function(h,m){var e="<applet ";
var g="";
var j="</applet>";
var n=true;
for(var f in h){e+=(" "+f+'="'+h[f]+'"');
if(f=="code"||f=="java_code"){n=false
}}if(m!="undefined"&&m!=null){var l=false;
for(var k in m){if(k=="codebase_lookup"){l=true
}if(k=="object"||k=="java_object"){n=false
}g+='<param name="'+k+'" value="'+m[k]+'"/>'
}if(!l){g+='<param name="codebase_lookup" value="false"/>'
}}if(n){e+=(' code="dummy"')
}e+=">";
e+='<span style="border:1px  solid #FF0000;display:block;padding:5px;margin-top:10px;margin-bottom:10px;text-align:left; background: #FDF2F2;color:#000;">You should <b>enable applets</b> running at browser and to have the <b>Java</b> (JRE) version &gt;= 1.5.<br />If applet is not displaying properly, please check <a target="_blank" href="http://java.com/en/download/help/testvm.xml" title="Check Java applets">additional configurations</a></span>';
return e+"\n"+g+"\n"+j
};
this.browseFiles=function(){this.JPU.clickBrowse()
};
this.setResizeParams=function(e){if(a.options.resizeImages){a.JPU.setParam("Upload.Thumbnails.Upload",true);
a.JPU.setParam("Upload.Thumbnails.UploadOriginalFile",false);
a.JPU.setParam("Upload.Thumbnails.Width",e.width);
a.JPU.setParam("Upload.Thumbnails.Height",e.height);
a.JPU.setParam("Upload.Thumbnails.ResizeMode",e.resizeMode);
a.JPU.setParam("Upload.Thumbnails.FilePrefix",e.filePrefix);
a.JPU.setParam("Upload.Thumbnails.Format",e.format);
if(e.quality){a.JPU.setParam("Upload.Thumbnails.JPEGQuality",e.quality)
}}};
this.setParameters=function(e){a.initParams(e);
a.applyParams()
};
this.applyParams=function(){for(key in a.params){if(a.params.hasOwnProperty(key)){a.JPU.setParam(key,a.params[key])
}}};
this.upload=function(){if(c.postFields&&!this.options.amazonS3){this.params.customPostFields="";
for(key in c.postFields){if(c.postFields.hasOwnProperty(key)){this.params.customPostFields+=key+"="+c.postFields[key]+";"
}}this.JPU.setParam("Upload.HttpUpload.CustomPostFields",this.params.customPostFields)
}a.stopped=false;
this.JPU.clickDownload()
};
this.stop=function(){if(!a.stopped){this.JPU.clickStop();
a.stopped=true
}};
this.convertFile=function(e){var f=new universalUploader.File(e.getId()+"",e.getFilename()+"",e.getLength());
f.status=e.getStatus();
return f
};
this.getFiles=function(){return a._files
};
this.clearList=function(){this.JPU.clearTree()
};
this.removeFile=function(e){this.JPU.removeFileById(e)
};
this._removeFile=function(e,f){universalUploader.onRemoveFile(a.type,e,f);
if(a._files[e]){a._files.splice(a._files.indexOf(a._files[e]),1);
a._files[e]=null;
delete a._files[e]
}};
this.rotateImage=function(f,e){if(a._files[f]){JavaPowUpload.getItemById(f).setRotateAngle(a._files[f].image.rotation)
}};
this.loadImage=function(e){if(a._files[e]&&a.features.imagesPreview){JavaPowUpload.generateThumbnail(e)
}};
this.JavaPowUpload_onThumbnailGenerateStart=function(){setTimeout(function(){universalUploader.onResizeImagesStart(a.type)
},10)
};
this.JavaPowUpload_onThumbnailGenerateProgress=function(g,e,f){setTimeout(function(){universalUploader.onResizeImagesProgress(a.type,g,e,f)
},10)
};
this.JavaPowUpload_onThumbnailGenerateComplete=function(){try{var f=JavaPowUpload.getFiles();
for(i=f.size()-1;
i>=0;
i--){if(f.get(i).isFile()){a._files[f.get(i).getId()].thumbnailSize=f.get(i).getUploadThumbnailLength();
a._files[f.get(i).getId()].setSize()
}}}catch(g){}setTimeout(function(){universalUploader.onResizeImagesComplete(a.type)
},10)
};
this.JavaPowUpload_onImageLoaded=function(f){if(typeof(f)=="string"){f=JavaPowUpload.getItemById(f)
}var e=f.getBase64EncodedImage();
if(universalUploader.onImageLoaded){setTimeout(function(){universalUploader.onImageLoaded(a.type,f.getId()+"","data:image/png;base64,"+e,false)
},10)
}};
this.JavaPowUpload_onAppletInit=function(){a.inited=true;
a.JPU=document.getElementById("JavaPowUpload");
var l=document.getElementById(a.type+"_content");
var j=l?l.offsetWidth-20:1,f=l?l.offsetHeight-20:1;
if(!a.renderOwnUi){j=1;
f=1;
var h=document.getElementById("JavaPowUpload_holder");
try{h.style.width=j+"px";
h.style.height=f+"px"
}catch(k){}try{a.JPU.width=j+"px";
a.JPU.height=f+"px"
}catch(k){}}universalUploader.setButtonState(a.type,"browseButton_","add",true);
for(var g=a._files.length-1;
g>=0;
g--){a._removeFile(a._files[g].id)
}};
this.JavaPowUpload_onAddFiles_=function(o){alert("add files "+o);
if(!a.renderOwnUi){a.dragend()
}var n=o;
if(typeof(n)=="string"){var j=JavaPowUpload.getFiles();
n=new Array(j.size());
for(h=j.size()-1;
h>=0;
h--){if(j.get(h).isFile()){n[h]=j.get(h)
}}}var m=[],f=null,g=0,l=[0,0,0,0,0,0,0,0,0,0,0,0],k=-1,e=0;
for(var h=0;
h<n.length;
h++){var f=n[h];
if(f.name!=""){f=a.convertFile(n[h]);
k=universalUploader.isValidFile(f,m,g);
if(k<0){m.push(f);
g+=f.size
}else{a.removeFile(f.id);
l[k]++;
e++
}}}if(e>0){universalUploader.displayResultOfAdd(l)
}for(var h=0;
h<m.length;
h++){a._files[m[h].id]=m[h];
a._files.push(m[h])
}if(m.length>0){universalUploader.onAddFiles(a.type,m)
}};
this.JavaPowUpload_onAddFile=function(j){if(!a.renderOwnUi){a.dragend()
}var o=new Array(j);
try{if(typeof(j)=="string"){o=new Array(JavaPowUpload.getItemById(j))
}}catch(l){universalUploader.debug("error")
}var n=[],f=null,g=0,m=[0,0,0,0,0,0,0,0,0,0,0,0],k=-1,e=0;
for(var h=0;
h<o.length;
h++){var f=o[h];
if(f.name!=""){f=a.convertFile(o[h]);
k=universalUploader.isValidFile(f,n,g);
if(k<0){n.push(f);
g+=f.size
}else{a.removeFile(f.id);
m[k]++;
e++
}}}if(e>0){universalUploader.displayResultOfAdd(m)
}for(var h=0;
h<n.length;
h++){a._files[n[h].id]=n[h];
a._files.push(n[h])
}if(n.length>0){universalUploader.onAddFiles(a.type,n)
}};
this.JavaPowUpload_onRemoveFile=function(e){if(typeof(e)=="string"){e=JavaPowUpload.getItemById(e)
}a._removeFile(e.getId()+"")
};
this.JavaPowUpload_onFileStart=function(e){if(typeof(e)=="string"){e=JavaPowUpload.getItemById(e)
}universalUploader.onFileUploadStart(a.type,e.getId()+"")
};
this.JavaPowUpload_onFileProgress=function(e){if(typeof(e)=="string"){e=JavaPowUpload.getItemById(e)
}universalUploader.onFileUploadProgress(a.type,e.getId()+"",this.JPU.getProgressInfo().getCurrentFileBytesRead())
};
this.JavaPowUpload_onFileStopped=function(e){if(typeof(e)=="string"){e=JavaPowUpload.getItemById(e)
}a.stopped=true;
universalUploader.onFileUploadStop(a.type,e.getId()+"")
};
this.JavaPowUpload_onError=function(e){universalUploader.onFileUploadError(a.type,this.JPU.getProgressInfo().getCurrentFileId()+"","",e);
universalUploader.onError(a.type,e)
};
this.JavaPowUpload_onUploadStart=function(){universalUploader.onUploadStart(a.type)
};
this.JavaPowUpload_onUploadFinish=function(){universalUploader.onUploadComplete(a.type)
};
this.JavaPowUpload_onServerResponse=function(e,f){universalUploader.onFileUploadComplete(a.type,this.JPU.getProgressInfo().getCurrentFileId()+"",f)
}
}};