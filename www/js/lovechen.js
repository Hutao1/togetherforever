class Tanchu {
	constructor(options){
		this.title = options.title;
		this.during = options.during || 1;
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
class Secondtrue{
	constructor(options){
		this.title = options.title;
		this.callback = options.callback;
		this.init();
	}
	init(){
		var _this = this;
		var model = $("<div style='position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 999;'></div>")
		$('body').append(model);
		model.css({background:"rgba(0,0,0,0.4)"})
		var secondtachu = $('<div style="padding:0.2rem 0.3rem;text-align:center;width:2rem;background:rgb(255,255,255);position:fixed;left:50%;top:50%;transform:translate(-50%,-50%)">'+this.title+
		'<div style="margin-top:0.1rem;display:flex;width:100%;justify-content:space-around"><div class="secondbtnfalse" style="color:rgb(0,0,0)">取消</div><div style="color:rgb(0,255,255)" class="secondbtntrue">确定</div></div></div>')
		model.append(secondtachu);
		secondtachu.css({color:"#666666"})
		$(".secondbtntrue").click(function(){
			_this.callback()
			model.remove()
		})
		$(".secondbtnfalse").click(function(){
			model.remove()
		})
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
function getTime(time){
	var rttime =new Date(time);
	var year = rttime.getFullYear();
	var month = rttime.getMonth()+1;
	var days = rttime.getDate();
	var hours = rttime.getHours();
	var minutes = rttime.getMinutes();
	var weeks = "";
	switch(rttime.getDay()){
		case 0: weeks = "星期日";
		break;
		case 1: weeks = "星期一";
		break;
		case 2: weeks = "星期二";
		break;
		case 3: weeks = "星期三";
		break;
		case 4: weeks = "星期四";
		break;
		case 5: weeks = "星期五";
		break;
		case 6: weeks = "星期六";
		break;
	}
	return year+"年"+month+"月"+days+"日 "+addzero(hours)+":"+addzero(minutes)+" "+weeks
}
function addzero(num){
	if(num < 10){
		num = "0"+num
	}
	return num;
}
function showFTList(res){
	var str = ""
	if(res.list.length>0){
		res.list.forEach((item,index)=>{
			str +=`<div class="listshow" data-id="${item.id}" data-sort="${item.sort}">
						<div class="time">
							${item.updateTime?getTime(item.updateTime):getTime(item.createTime)}
						</div>
							<div class="totop flex allcenter">
								<img class="toppicture" src="img/${item.isTop == 0?'totopfalse':'totoptrue'}.png" alt="" />
								<img class="delpicture" src="img/delete.png" alt="" style="width: 0.2rem; height: 0.2rem;"/>
							</div>
						<div class="content">
							${item.content}
						</div>
						<div class="${item.sort == 1?'leftbubble':'rightbubble'} addbuble"></div>
					</div>`
		})
		$(".all").html(str);
	}
	
}
function showSCList(res){
	var str = ""
	if(res.list.length>0){
		res.list.forEach((item,index)=>{
			str +=`<div class="listshow searchlist" data-id="${item.id}" data-sort="${item.sort}">
						<div class="time">
							${item.updateTime?getTime(item.updateTime):getTime(item.createTime)}
						</div>
						<div class="content">
							${item.content}
						</div>
					</div>`
			/*<div class="listshow searchlist">
									<div class="time">
										2018年5月16日 22:51 星期三
									</div>
									<div class="content">
										编辑成功了呀琛琛编辑成功了呀琛琛编辑成功了呀琛琛编辑成功了呀琛琛编辑成功了呀琛琛编辑成功了呀琛琛编辑成功了呀琛琛编辑成功了呀琛琛
									</div>
								</div>*/
		})
		$(".searchhere").html(str);
	}
	
}