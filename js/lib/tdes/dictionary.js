function DictionaryObject(searchBoxId, selectListId, displayId, collectionJSONParam){

    //Class attributes
    var searchId = searchBoxId;
    var selectId = selectListId;
    var displayId = displayId;
    var collectionJSON = collectionJSONParam;
    var latestResults = null;
    var currentIndex = 0;
    var currentObj = null;
    //refers to the same object
    var self = this;
    var currentButton = 'graphic';
    var bigImageUrl = 'https://idrt-myasltech.s3.amazonaws.com/images/name-big/[NAME].png';
    var signImageUrl = 'https://idrt-myasltech.s3.amazonaws.com/images/name/';
    var conceptImageUrl = 'https://s3.amazonaws.com/idrt-myasltech/images/name-g/';
    var videoImageUrl = 'https://idrt-myasltech.s3.amazonaws.com/videos/name-big/[NAME].mp4';
    var videoDefinitionImageUrl = 'https://idrt-myasltech.s3.amazonaws.com/videos/name-d/[NAME].mp4';
    var printImageUrl = '';

    var templateCompound = '<img src="{source}" alt="{word}" prevImage="{source}" style="float:left;display: block;"  />';
    var templateImg = '<img class="{imguid}" onerror="imgError(this);" src="{source}" prevImage="{source}" alt="{word}"  style="float:left;width:120px;height:120px;pointer:cursor;" />';
    var fileTemp = null;

    function init(){
        loadFilter();
        displayList();
        self.selectObj(0);
        $('body').append('<iframe id="dictionaryHelperPrintFrame" style="width: 0px;height:0px;visibility: hidden"></iframe>');
    }

    //private methods
    function loadFilter(filter){

        var result = [];

        filter = filter || '';

        for(var key in collectionJSON) {
            var obj = collectionJSON[key];

            if (filter && key.toLowerCase().indexOf(filter.toLowerCase()) === 0) {
                result.push(obj);
            }else if( filter == ''){
                result.push(obj);
            }

        }
        latestResults = result;
    }

    function size(){
        return latestResults ? latestResults.length : 0;
    }

    function clearSelect(){
        $('#' + selectListId).html('');
    }


    function getImagesTag(imguid, word, arrImages, imageUrl){
        var template = '';

        template = templateImg.replace('{imguid}',imguid);



        var size = ( arrImages && arrImages.length) ? arrImages.length : 0;
        var html = '';
        for (var i = 0 ; i < size ; i++){
            var imgsrc = encodeURIComponent(arrImages[i]);
            html += replaceAll(template, '{source}',imageUrl+ imgsrc +'.png');
            html = replaceAll(html, '{word}',arrImages[i]);


        }

        return html;

    }



    function displayList(){
        clearSelect();

        var len = latestResults ? latestResults.length : 0;
        var sel = document.getElementById(selectListId);

        var opt = null;
        var options = [];
        var obj = null;

        for (var i = 0 ; i < len ; i++ ){
            obj = latestResults[i];

            var opt = document.createElement('div');

            opt.innerHTML = obj.base_words;
            opt.setAttribute('pindex',i);
            opt.setAttribute('id','doption'+i);

            opt.className = "option";
            opt.onclick = function(){
                var index = parseInt( $(this).attr('pindex') );

                self.selectObj(index);
            };

            sel.appendChild(opt);

        }

        return sel;

    }

    function printImage(file){

        var objFrame =  $('#dictionaryHelperPrintFrame');

        if (!objFrame.length){
            return;
        }

        $('<img/>').attr('src', file).load(function() {
            $(this).remove();
            $('div.display-area img.loader').hide();

            var content = '<img src="'+file+'">';
			objFrame.contents().find('body').html(content);

			$('#dictionaryHelperPrintFrame')[0].focus();
			$('#dictionaryHelperPrintFrame')[0].contentWindow.print();
        });

    }

    function displayText(text,display){

        var html = '<div style="position: absolute;left: 50%;top: 50%;width:300px; height:200px;margin: -100px 0 0 -150px;">'+text + '</div>';
        $('div.display-area img.loader').hide();
        display.html(html);

    }


    function displayImage(imgArr, display, imageUrl){

        var timestamp =  new Date().getTime();
        var imguid = 'siguid' + timestamp;

        var marginHorizontal = imgArr && imgArr.length ? imgArr.length * 120 : 120;
        var marginDenominator = (imgArr.length > 3) ? 5 : 2;
        marginHorizontal = marginHorizontal/marginDenominator;

        var margin = 'margin: -60px 0 0 -'+marginHorizontal+'px;';

        var topMargin = 0;

        if (imgArr.length <= 3) {
            topMargin = 50;
        }
        else if ((imgArr.length >= 3) && (imgArr.length < 5)) {
                 topMargin = 40;
             }
             else if ((imgArr.length >= 5) && (imgArr.length < 7)) {
                     topMargin = 25;
                  }
                  else {
                          topMargin = 20;
                  }

        var html = '<div style="position: absolute;left: 50%;top:' + topMargin + '%;'+margin+'">'+getImagesTag(imguid, '', imgArr, imageUrl) + '</div>';

        $('div.display-area img.loader').hide();

        display.html(html);
    }

    //getImagesTag(imguid, word, obj1.sign_only_graphics);

    function displayBackgroundImage(file, display){
        $('<img/>').attr('src', file).load(function() {
            $(this).remove();
            $('div.display-area img.loader').hide();
            display.css('background-image', 'url("'+file+'")');
        });
    }

    function clearDisplay(){
        var display = $('#' + displayId);
        display.css('background-image', 'none');
        display.html('');
    }

    function clearSearch(){
        $('div.option').removeClass('selected');
    }

    //public methods

    this.displayGraphics = function(){
        var display = $('#' + displayId);
        var content = '';

        $('div.display-area img.loader').show();
        clearDisplay();

        if (currentButton == 'graphic'){

            var file = bigImageUrl.replace('[NAME]', currentObj.dictionary_big_graphics);
            fileTemp = file;
            displayBackgroundImage(file, display);

        }else if (currentButton == 'english'){
			fileTemp = null;
            displayText(currentObj.definition_text, display);

        }else if (currentButton == 'asl'){

            $('div.display-area img.loader').hide();

            if (!currentObj.definition_videos)
                return;

            var file = videoDefinitionImageUrl.replace('[NAME]', currentObj.definition_videos);
			fileTemp = null;
            var overlayContent = '<video controls="controls" autoplay="autoplay" width="320" height="240" poster="https://idrt-myasltech.s3.amazonaws.com/games/signing_science_for_kids/Buttons/loading.gif" preload="auto" title="Video"><source src="'+file+'" type="video/mp4"/></video>';

            display.html(overlayContent);

        }else if (currentButton == 'concept'){

            var file = conceptImageUrl + currentObj.concept_pics + '.png';
            fileTemp = file;
            displayImage([currentObj.concept_pics], display, conceptImageUrl);

        }else if (currentButton == 'sign'){

            var file = signImageUrl + currentObj.sign_only_graphics + '.png';
            fileTemp = file;
            displayImage(currentObj.sign_only_graphics, display, signImageUrl);

        }else if (currentButton == 'video'){
            $('div.display-area img.loader').hide();
            var file = videoImageUrl.replace('[NAME]', currentObj.dictionary_big_videos);
			fileTemp = null;
            var overlayContent = '<video controls="controls" autoplay="autoplay" width="320" height="240" poster="https://idrt-myasltech.s3.amazonaws.com/games/signing_science_for_kids/Buttons/loading.gif" preload="auto" title="Video"><source src="'+file+'" type="video/mp4"/></video>';

            display.html(overlayContent);

        }else if (currentButton == 'print'){
            var file = bigImageUrl.replace('[NAME]', currentObj.dictionary_big_graphics);
			
			if (fileTemp != null)
				printImage(fileTemp);
			else
				printImage(file);
				
            displayBackgroundImage(file, display);
            currentButton = 'graphic';
        }





    }


    function selectedIndex(index){
        $('div.option').removeClass('active');

        var thisObj = $('div[pindex="'+index+'"]');

        thisObj.addClass('active')
    }

    this.setCurrentButton = function(buttonName){
        currentButton = buttonName;
    }

    this.selectObj = function(index){

        currentIndex = index;

        selectedIndex( currentIndex );
        currentObj = latestResults[currentIndex];
        self.displayGraphics();

		var word = currentObj.base_words;
		var idx = word.indexOf('(');

		if (idx > 0) {
			word = word.substr(0, idx - 1);
		}

		$.get("/get_sponsor_info.php",
		{
			word: word
		},
		function(data, status) {
			var sign_fields = data.split("||");

			if (sign_fields[0].length < 1 && sign_fields[1].length < 1 && sign_fields[3].length < 1) {
				$("#logo").remove();
				$("#logo_text").remove();
				$("#sponsor_logo").remove();
				$("#sponsor_button").remove();

                $('.sponsoring').append('<div id="sponsor_logo" style="padding:10px 0 10px 15px;"><a href="http://www.idrt.com" target="_blank"><img src="/assets/images/available_to_sponsor.png" alt="logo" width="160" height="120"></div>');
                $('.sponsoring').append('<div id="sponsor_button" style="padding: 0 0 0 5px;"><a href="/sponsor_request_form.php" target="_blank" style="float: left; margin-left: 10px; margin-right: 5px; padding: 5px 10px 5px 10px; background-color:#bf1e2e; background: -prefix-linear-gradient(top, #990000, #bf1e2e 60%); background: linear-gradient(to bottom, #990000, #bf1e2e 60%); border:1px solid #660000; border-radius: 8px; -moz-border-radius:8px; -webkit-border-radius:8px; font-family: arial, sans-serif; font-size: 14px; color: #ffffff; text-align: center; text-decoration: none;"><b>Sponsor this Sign!</b></a></div>');
			}
			else {
				$("#logo").remove();
				$("#logo_text").remove();
				$("#sponsor_logo").remove();
				$("#sponsor_button").remove();

				if (sign_fields[4] == 'active') {
					if (sign_fields[5] == 'tribute') {
						if (sign_fields[1].length > 0) {
							$('.sponsoring').append('<div id="logo" style="padding:10px 0 10px 0px;"><img src="' + sign_fields[1] + '" alt="logo" width="250" height="160"></div>');
						}
					}
					else {
						if (sign_fields[3].length > 0) {
							$('.sponsoring').append('<div id="logo" style="padding:10px 0 10px 0px;"><a href="' + sign_fields[2] + '" target="_blank"><img src="' + sign_fields[3] + '" alt="logo" width="250" height="160"></div>');
						}
					}

					if (sign_fields[0].length > 0) {
						$('.sponsoring').append('<div id="logo_text" style="font-family: Arial, Helvetica, sans-serif; font-size: 80%; padding:5px 0 5px 2px;"><p><b>' + sign_fields[0] + '</b></p></div>');
					}
				}
				else {
					$('.sponsoring').append('<div id="sponsor_logo" style="padding:10px 0 10px 15px;"><a href="http://www.idrt.com" target="_blank"><img src="assets/images/available_to_sponsor.png" alt="logo" width="160" height="120"></div>');
				    $('.sponsoring').append('<div id="sponsor_button" style="padding: 0 0 0 5px;"><a href="/sponsor_request_form.php" target="_blank" style="float: left; margin-left: 10px; margin-right: 5px; padding: 5px 10px 5px 10px; background-color:#bf1e2e; background: -prefix-linear-gradient(top, #990000, #bf1e2e 60%); background: linear-gradient(to bottom, #990000, #bf1e2e 60%); border:1px solid #660000; border-radius: 8px; -moz-border-radius:8px; -webkit-border-radius:8px; font-family: arial, sans-serif; font-size: 14px; color: #ffffff; text-align: center; text-decoration: none;"><b>Sponsor a Sign!</b></a></div>');
				}
			}
		});
    }

    this.next = function(){
        if (currentIndex + 1 >= size()){
            currentIndex = size() - 1;
        }else{
            currentIndex++;
        }
        self.selectObj(currentIndex);
    }

    this.previous = function(){
        if (currentIndex - 1 <=0 ){
            currentIndex = 0;
        }else{
            currentIndex--;
        }
        self.selectObj(currentIndex);
    }

    this.getCurrentFilename = function(){
		if (fileTemp != null)
			return fileTemp;
		else
			bigImageUrl.replace('[NAME]', currentObj.dictionary_big_graphics);
    }

    this.filter = function(){

        clearSearch();
        var text = $('#'+searchId).val();

        var sel = $('#' + selectListId + " div.option");
        var obj = null;
        var firstFound = null;
        $.each(sel, function(key,objJ){
            var obj = $(objJ);
            if (text && obj.html().toLowerCase().indexOf(text.toLowerCase()) === 0) {
                obj.addClass('selected');
                if (!firstFound){
                    firstFound = obj;
                }
            }

        });

        if (firstFound){

            $('#' + selectListId).scrollTop( $('#' + selectListId).scrollTop() +  firstFound.position().top - 90);


        }
        //clear so scroll to beginning of list
        if (text==''){
            $('#' + selectListId).scrollTop( 0 );
        }

    }

    init();

}

