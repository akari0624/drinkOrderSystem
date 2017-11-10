//  2017/09/11  version r_use 1.0.0
// react SPA用

export const MAXUploadPicQuantityOfThisApp = 3;
export const MAXUploadPicByte = 819200;  // 800 KB

const FileUploadModule = (function() {
  var _config = {
    
    maxUploadPicQuantity: MAXUploadPicQuantityOfThisApp,
    serverURL: "/uploadImg"
  };


  var privateUtilFunc = {
    createImgPreviewURL: function(imgFileList) {
const objHasBlobSrcAndFileBlob = {};     
const imgPreviewSrcArr = [];
const fileArr = [];
      if (
        imgFileList.length >
        _config.maxUploadPicQuantity
      ) {
        alert("最多只可上傳" + _config.maxUploadPicQuantity + "張圖片");
        return [];
        //  caller 判斷return的Array長度是否為0,如果是,就不setState,才不用做無意義的render
      }

      for (var i = 0; i < imgFileList.length; i += 1) {
        const currImgFile = imgFileList[i];

        console.log('size',currImgFile.size);
        if(currImgFile.size > MAXUploadPicByte){

          const fileTooBigString = `${currImgFile.name} 超過可上傳的檔案大小(${MAXUploadPicByte/1024}KB)`;
          alert(fileTooBigString);
          continue;
        }

        imgPreviewSrcArr.push(
          window.URL.createObjectURL(currImgFile)
        );

        fileArr.push(currImgFile);
      }

      objHasBlobSrcAndFileBlob['imgPreviewSrcArr'] = imgPreviewSrcArr;
      objHasBlobSrcAndFileBlob['fileArr'] = fileArr;

      return objHasBlobSrcAndFileBlob;
    },
    // 下面這個要用建構式來invoke
    FileUploader: function(img, file) {
      console.log("pUpload", file);
      var reader = new FileReader();
      var xhr = new XMLHttpRequest();
      this.xhr = xhr;

      var self = this;

      // onProgress callback
      //  進度條  可以用canvas來畫
      this.xhr.upload.addEventListener(
        "progress",
        function(e) {
          if (e.lengthComputable) {
            var percentage = Math.round(e.loaded * 100 / e.total);
            console.log(percentage);
          }
        },
        false
      );

      xhr.upload.addEventListener(
        "load",
        function(e) {
          console.log("檔案上傳完畢");
        },
        false
      );

      // 這裡才是起點，上面的都是callback
      xhr.open("POST", _config.serverURL, true);
      //  xhr.setRequestHeader('Content-Type', 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p--');
      // xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');

      // reader.onload = function(e) { // 當reader.readAsBinaryString... 做完的時候就send出xhr

      var formData = new FormData(); //用formData 就不需使用FileReader, 用FileReader 就不需使用formData ,
      // 但你要看你的後端要怎麼接，如果後端在接二進位資料流時，對於這個資料還是要有一個key去辨識它
      // 那可能就一定要用formData  因為用xhr.send(File/Blob) 是無法對這個二進位資料加上key值的,
      // 在這裡我的後端是 node.js 並且使用muller這個library實作接收檔案這塊，他在接檔案時一定要有一個key值，
      // 那我就不能不用FormData, 詭異的是  我用原生XMLHttpRequest搭配FormData後端居然都接收不到檔案，
      // 用$ajax 卻可以，原因  就是 用了FormData就不用自己手動設定Content-Type ,應該是FormData會幫我們加上去(和boundary)。
      // 用FileReader時才需要自己加(但不確定對應的Content-Type是不是 multipart/form-data,因為用FileReader.readAsXXX 寫出去的都會變成raw-binary)

      //     console.log(e.target.result);
      formData.append("avatar", file);

      xhr.send(formData); // xhr.send(:FormData) 或 this.result,this就是 reader
      //  };

      //    reader.readAsArrayBuffer(file);
    }

    // JQFileUploader: function(img, file) {

    //     var data = new FormData();

    //     data.append("avatar", file);

    //     $.ajax({
    //         type: "POST",
    //         url: _config.serverURL,
    //         contentType: false,
    //         processData: false,
    //         data: data,
    //         success: function(res) {
    //             console.log('jQ $AJAX success', res);
    //         }

    //     })

    // }
  };

  return {
    configModule: function(configParameterObj) {
        // modify init _config settting ,if it should
      _config = configParameterObj;
    },

    onFileSelected: function(fileList) {
    
      return privateUtilFunc.createImgPreviewURL(fileList);
    },

    onFileDrop: function(files) {
    
      // return the img blob src for outsider component to render
      return privateUtilFunc.createImgPreviewURL(files);
    },

    startFilesUpload: function(fileArr) {
      if (fileArr.length === 0) {
        alert("無檔案可上傳......");
        return;
      }

      for (var i = 0; i < fileArr.length; i += 1) {
        console.log(fileArr[i]);
        new privateUtilFunc.FileUploader("", fileArr[i]);
      }
    },
    removeOneFromBrowserObjectURLCached:function(theObjectUrl){

// 這個模組裡其中一個的 impure操作
        //  return true or false
         window.URL.revokeObjectURL(theObjectUrl);
        
    }
  };
})();


export default FileUploadModule;