var popWin = null;
var videoname = "";
var width = 550;
var height = 340;

//Other Videos
function popNow (videoname)
{
    popWin = window.open (hostname + '/Sign-O/videopage.html', 'introvideo', 'width=540, height=475, status=no');
    popWin.document.write("<p><video src='" + siteVideos + videoname + ".mp4' width='510' height='410' controls='controls' autoplay='autoplay'> Your browser does not support the video tag. </video></p>");
    popWin.moveTo((screen.availWidth - width)/2, (screen.availHeight - height)/2);
    popWin.focus();
    timer=setTimeout("popWin.close()", 171000);
}

//myASL Tech Videos
function popNow2 (videoname)
{
	popWin = window.open (hostname + '/Sign-O/videopage.html', 'introvideo', 'width=540, height=475, status=no');
	popWin.document.write("<p><video src='" + signOvideos + videoname + ".mp4' width='510' height='410' controls='controls' autoplay='autoplay'> Your browser does not support the video tag. </video></p>");
	popWin.moveTo((screen.availWidth - width)/2, (screen.availHeight - height)/2);
	popWin.focus();
	timer=setTimeout("popWin.close()", 171000);
}

function popNow3 (videoname)
{
    popWin = window.open (hostname + '/Sign-O/videopage.html', 'introvideo', 'width=540, height=475, status=no');
    popWin.document.write("<p><video src='" + signOvideos + videoname + ".swf' width='510' height='410' controls='controls' autoplay='autoplay'> Your browser does not support the video tag. </video></p>");
    popWin.moveTo((screen.availWidth - width)/2, (screen.availHeight - height)/2);
    popWin.focus();
    timer=setTimeout("popWin.close()", 171000);
}
