var hostname = 'http://' + window.location.hostname;
var signOimages = "https://s3.amazonaws.com/idrt-sign-o";
var signOvideos = "https://s3.amazonaws.com/idrt-myasltech/video/myasltech/";
var siteVideos = "https://s3.amazonaws.com/idrt-myasltech/video/idrtsitevideo/";

var signOimagesMount = "https://s3.amazonaws.com/idrt-myasltech/images";
var idrthostname = "http://www.idrt.com";



var IDRTStringUtils = {
    replaceAll: function (haystack, needle, replace){
        var pattern = new RegExp(needle,'g');
        return haystack.replace(pattern, replace);

    },
    escapeForInlineQuotes : function(string){
        var rtn = string;
        rtn = IDRTStringUtils.replaceAll(rtn,"'",'&#8217;');

        return rtn;

    },
    sleep: function(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    },
    capitaliseFirstLetter: function(string)
    {
        if (string)
            return string.charAt(0).toUpperCase() + string.slice(1);
        else
            return '';
    }

}

//var signOimagesMount = "http://" + window.location.hostname + "/idrt-sign-o";
//https://s3.amazonaws.com/idrt-rsc/instructional_videos/myASLTech/SIGN-O+Instructions.mp4

