function FingerSpellingObject(searchBoxId, selectListId, selectedListParam,displaySpelling, collectionJSONParam){

    //Class attributes
    var searchId = searchBoxId;
    var selectId = selectListId;
    var selectedList = selectedListParam;

    var collectionJSON = collectionJSONParam;
    var latestResults = null;
    var currentIndex = 0;
    var currentObj = null;

    //refers to the same object
    var self = this;
    var currentButton = 'only';
    var scrambleAndWords = false;

    var headingSpellingOnly = 'Write the words at the bottom of the page for the scrambled fingerspelling.';

    var headingSpellingWords = 'Write the number for the scrambled fingerspelling next to the correct word.';

    var fileTemp = null;

    function init(){
        loadFilter();
        displayList();
        $('body').append('<iframe id="spellingHelperPrintFrame" style="width: 0px;height:0px;visibility: visible"></iframe>');
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

    function _countSelectedWords(){
        var list = $('#' + selectedListParam + ' div.option:visible');

        return list.length;

    }

    function clearSelect(){
        $('#' + selectListId).html('');
    }



    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    function scrambleArray(arr){

        var r = [];

        var temp = arr;

        var newIndex = 0;

        do {
            newIndex = randomIntFromInterval(0, temp.length - 1);

            r.push( temp[newIndex] );

            temp.splice(newIndex, 1);

        } while (temp.length > 0);

        return r;
    }

    function scrambleWord(word){

        return scrambleArray( wordToArray(word) );

    }

    function wordToArray(word){

        var r = [];

        var last = 0;
        for (var index = 0; index < word.length ; index++){
            r.push( word.substring(index, index + 1) );
        }

        return r;

    }


    function displayList(){
        clearSelect();

        var len = latestResults ? latestResults.length : 0;
        var sel = document.getElementById(selectListId);
        var selected = document.getElementById(selectedListParam);

        var opt = null;
        var optSel = null;
        var options = [];
        var obj = null;

        for (var i = 0 ; i < len ; i++ ){
            obj = latestResults[i];

            var opt = document.createElement('div');
            var optSel = document.createElement('div');

            opt.innerHTML = obj.base_words;
            opt.setAttribute('pindex',i);
            opt.setAttribute('id','doption'+i);
            opt.className = "option";

            opt.onclick = function(){
                var index = parseInt( $(this).attr('pindex') );
                var elem = $('#doption' + index);
                if (elem.hasClass('active')){
                    elem.removeClass('active');
                }else{
                    elem.addClass('active')
                }
            };

            opt.ondblclick = function(){
                var index = parseInt( $(this).attr('pindex') );
                var added = self.checkObj(index);

                $('#' + selectListId + ' div.option.active').removeClass('active');
                $('#' + selectedListParam + ' div.option.active').removeClass('active');
                if (added)
                    displayScrambledImages();

            };

            sel.appendChild(opt);


            optSel.innerHTML = obj.base_words;
            optSel.setAttribute('pindex',i);
            optSel.setAttribute('id','dsoption'+i);
            optSel.className = "option";

            optSel.onclick = function(){
                var index = parseInt( $(this).attr('pindex') );
                var elem = $('#dsoption' + index);

                if (elem.hasClass('active')){
                    elem.removeClass('active');
                }else{
                    elem.addClass('active');
                }
            };

            optSel.ondblclick = function(){
                var index = parseInt( $(this).attr('pindex') );
                self.uncheckObj(index);

                $('#' + selectListId + ' div.option.active').removeClass('active');
                $('#' + selectedListParam + ' div.option.active').removeClass('active');

                displayScrambledImages();

            };

            sel.appendChild(opt);
            selected.appendChild(optSel);
        }

        return sel;

    }

    function printImage(){

        var objFrame =  $('#spellingHelperPrintFrame');

        if (!objFrame.length){
            return;
        }

        var content = $('#' + displaySpelling).html();
        objFrame.contents().find('body').html('<div id="displaySpelling">'+content + '</div>');

        $('<link rel="stylesheet" type="text/css" href="/assets/css/style.css" media="all" /><link rel="stylesheet" type="text/css" href="/assets/css/fingerspelling.css" media="all" />').appendTo(objFrame.contents().find('head'));


        $('#spellingHelperPrintFrame')[0].focus();
        $('#spellingHelperPrintFrame')[0].contentWindow.print();


    }

    function getWordWithoutParenthesis(base_word){
        var word = base_word;

        var idx = word.indexOf('(');

        if (idx > 0) {
            word = word.substr(0, idx - 1);
        }

        return word;
    }


    function clearSearch(){
        $('div.option').removeClass('selected');
    }

    function getHighlightedIndexes(listContainerId){
        var opts = [];
        var list = $('#' + listContainerId + ' div.option.active');

        $.each(list, function(key, elem){

            opts.push( $(elem).attr('pindex') );


        });
        return opts;
    }


    function getSelectedWords(){
        var opts = [];
        var list = $('#' + selectedListParam + ' div.option:visible');

        $.each(list, function(key, elem){

            opts.push( getWordWithoutParenthesis( $(elem).html() ) );

        });

        return opts;
    }

    function _checkObj(index){
        var size = _countSelectedWords();
        var rtn = false;

        if(size>=6){

            if (size==6) alert('Sorry, you have a limited space for six words.');
            return rtn;

        }
        rtn = true;

        $('#doption' + index).hide();
        $('#dsoption' + index).show();

        return rtn;
    }

    function _uncheckObj(index){
        $('#doption' + index).show();
        $('#dsoption' + index).hide();
    }

    function getHhtmlLetter(wordArr){

        var html =  '<li>';


        for ( var i = 0 ; i < wordArr.length; i++ ){

            var letter = wordArr[i].toLocaleLowerCase();
            var delim = '';
            if (letter >= 'a' && letter <='z'){

                html+= delim + "<img src='http://idrt.com/fingerspelling/images/"+letter+".png' />";
                delim = ', ';
            }
        }

        html += '</li>';

        return html;

    }


    function getArray3Elements(arr){

        var rtn = [];


        for (var i = 0; i < 3 ; i++)
            if(typeof arr[i] == 'undefined') {
                rtn.push('');
            }else{
                rtn.push( arr[i] );
            }

        return rtn;

    }

    function displayRowTable(words){

        words = scrambleArray(words);

        var html = '<table>';
        var counter = 1;
        var blank = '________________________________________________________';

        for (var i = 0; i < words.length; i++){


            var value = '';
            html += '<tr>';

            value = '<span class="spellingwords" style="'+ ( scrambleAndWords ? '':'display:none' ) +'">' + words[i] + '</span><span class="spellingonly" style="'+ ( !scrambleAndWords ? '':'display:none' ) +'">' + (  words[i] ? (counter++) + '. ' +  blank : '' ) + '</span>'

            html += '<td>' + value + '</td>';


            html += '</tr>';

        }

        html += '</table>';

        return html;

    }


    function displayWordTable(words){

        var html = ''

        words = scrambleArray(words);

        var size = words.length;

        var groupArr = [];

        if (size > 0 && size <= 3){

            groupArr[0] = getArray3Elements(words);

        }else if(size > 3 && size <= 6){

            var a2 = words.splice(0,3);
            groupArr[0] = getArray3Elements(a2);
            groupArr[1] = getArray3Elements(words);

        }

        html += '<table>';
        var counter = 1;
        var prefix = '';
        var blank = '____________________________';

        for (var i = 0; i < groupArr.length; i++){

            var curArr = groupArr[i];
            var value = '';
            html += '<tr>';
            for (var k = 0; k < curArr.length; k++ ){



                value = '<span class="spellingwords" style="'+ ( scrambleAndWords ? '':'display:none' ) +'">' + curArr[k] + '</span><span class="spellingonly" style="'+ ( !scrambleAndWords ? '':'display:none' ) +'">' + (  curArr[k] ? (counter++) + '. ' +  blank : '' ) + '</span>'

                html += '<td>' + value + '</td>';

            }
            html += '</tr>';

        }
        html += '</table>';

        return html;

    }

    function displayFooter(words){

        var html = '<div class="footer">';

        html += displayRowTable(words);

        html += '</div>';
        return html;

    }


    function displayScrambledImages(){

        // get list words
        var words = getSelectedWords();


        var html = '<h1 id="displaySpellingHeadingText">' + ( scrambleAndWords ? headingSpellingOnly : headingSpellingWords )  + '</h1><ol>';

        // produce images
        for (var i = 0; i < words.length; i++){
            var word = words[i];
            var wordArr = scrambleWord(word);

            html += getHhtmlLetter(wordArr);

        }

        html += '</ol>';

        html += displayFooter(words);

        $('#displaySpelling').html(html);

    }


    //public methods




    this.addToSelected = function(){

        var selIndexes = getHighlightedIndexes(selectListId);

        var originalSize = _countSelectedWords();

        $.each (selIndexes, function(k, index){

            _checkObj(index);

        })


        $('#' + selectListId + ' div.option.active').removeClass('active');
        $('#' + selectedListParam + ' div.option.active').removeClass('active');

        if (selIndexes.length > 0 && originalSize != 6)
            displayScrambledImages();

    }

    this.removeFromSelected = function(){

        var selIndexes = getHighlightedIndexes(selectedListParam);

        $.each (selIndexes, function(k, index){

            _uncheckObj(index);

        })

        $('#' + selectListId + ' div.option.active').removeClass('active');
        $('#' + selectedListParam + ' div.option.active').removeClass('active');

        if (selIndexes.length > 0)
            displayScrambledImages();

    }


    this.displayFingerSpellingOnly = function(){
        scrambleAndWords = false;
        $("#displaySpellingHeadingText").html(headingSpellingOnly);
        $('.spellingwords').hide();
        $('.spellingonly').show();


    }

    this.displayFingerSpellingWords = function(){
        scrambleAndWords = true;
        $("#displaySpellingHeadingText").html(headingSpellingWords);
        $('.spellingwords').show();
        $('.spellingonly').hide();

    }

    this.scrambleAgain = function(){

        displayScrambledImages();

    }

    this.print = function(){

        printImage();
    }

    this.setCurrentButton = function(buttonName){
        currentButton = buttonName;


    }


    this.checkObj = function(index){
        return _checkObj(index);
    }

    this.uncheckObj = function(index){
        _uncheckObj(index)
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

