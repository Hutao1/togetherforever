class Tanchu {
	constructor(options){
		this.title = options.title;
		this.during = options.during || 2;
		this.init();
	}
	init(){
		var toast = $('<div>'+this.title+'</div>');
		$('body').append(toast);
		toast.css({position:"fixed",left:"50%",top:"50%",transform:"translate(-50%,-50%)",background:"#000",
		color:'#fff',fontSize:"0.15rem",padding:"0.1rem 0.2rem",borderRadius:"0.1rem",display:"flex",
		justifyContent:"center",alignItems:"center",transition:this.during+'s ease-in'})
		setTimeout(()=>{
			toast.css("opacity","0");
			
		},0)
		setTimeout(()=>{
			toast.remove()
		},this.during*1000)
	}
}
function getOrientation(file, callback) {
  var reader = new FileReader();
  reader.onload = function(e) {
    var view = new DataView(e.target.result);
    if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
    var length = view.byteLength, offset = 2;
    while (offset < length) {
      var marker = view.getUint16(offset, false);
      offset += 2;
      if (marker == 0xFFE1) {
        if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
        var little = view.getUint16(offset += 6, false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        var tags = view.getUint16(offset, little);
        offset += 2;
        for (var i = 0; i < tags; i++)
          if (view.getUint16(offset + (i * 12), little) == 0x0112)
            return callback(view.getUint16(offset + (i * 12) + 8, little));
      }
      else if ((marker & 0xFF00) != 0xFF00) break;
      else offset += view.getUint16(offset, false);
    }
    return callback(-1);
  };
  reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
}