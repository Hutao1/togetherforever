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
