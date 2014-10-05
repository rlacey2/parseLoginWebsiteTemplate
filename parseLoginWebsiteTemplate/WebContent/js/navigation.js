 
$(document).ready(function(){
	
	 $("#navcontainer ul").append(generate_anchor("./index.html", "Login") );
	 $("#navcontainer ul").append(generate_anchor("./home.html", "My Home") );
	 $("#navcontainer ul").append(generate_anchor("./_demo.html", "Demo") );

	 $("#navcontainer ul").append(generate_anchor("./_blank.html", "_Blank") );
 	 
     
 });  // ready

function generate_anchor(hRef, aDesc)
{
	return "<li><a   href='" + hRef + "'>" + aDesc+ "</a></li>";
}
    
   
    
 
