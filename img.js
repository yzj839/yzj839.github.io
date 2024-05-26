/*
 * Demo1:选取一张图片，并预览
 */
$("#img_input").on("change", function(e) {

    var file = e.target.files[0]; //获取图片资源
  
    // 只选择图片文件
    if (!file.type.match('image.*')) {
      return false;
    }
  
    var reader = new FileReader();
  
    reader.readAsDataURL(file); // 读取文件
  
    // 渲染文件
    reader.onload = function(arg) {
  
      var img = '<img class="preview" src="' + arg.target.result + '" alt="preview"/>';
      $(".preview_box").empty().append(img);
    }
  });
  
  /*
   * Demo2:拖拽上传
   */
  // 必须阻止dragenter和dragover事件的默认行为，这样才能触发 drop 事件
  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  
    var files = evt.dataTransfer.files; // 文件对象
  
    // 处理多文件
    var output = [];
    var str;
    for (var i = 0, f; f = files[i]; i++) {
      //output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
        f.size, ' bytes, last modified: ',
        f.lastModifiedDate.toLocaleDateString(), '</li>');
        str=escape(f.name)
    }
    // 显示文件信息
    document.getElementById('list').innerHTML = output.join('');
    //document.getElementById('drop_zone').vaue = str;
    //document.getElementById('list').innerHTML =files.length;
  }
  
  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  }
  
  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  
  /*
   * Demo3:label样式
   */
  $("#img_input2").on("change", function(e) {
  
    var file = e.target.files[0]; //获取图片资源
  
    // 只选择图片文件
    if (!file.type.match('image.*')) {
      return false;
    }
  
    var reader = new FileReader();
  
    reader.readAsDataURL(file); // 读取文件
  
    // 渲染文件
    reader.onload = function(arg) {
  
      var img = '<img class="preview" src="' + arg.target.result + '" alt="preview"/>';
      $("#preview_box2").empty().append(img);
    }
  });