var imagelink = new Array(22);
var filename2 = new Array (22);

window.onload = function() { CategoryTable();}

var filename2 = "foodcaty.html";
var filename = "genericgamecaty.php";
var categoryname = "";
var popwin;

function Categoryfunction(filenamem, categoryName)
{	
	if (window.opener == null || window.opener.closed)
	{
		//alert("Parent opened");
		var url = hostname + '/' + filename+'?categoryName=' + categoryName;
		document.location= url;
	}
}

function bodyMouseOver ()
{
	document.getElementById("body").src = signOimages + "/Images/body-1.png";
}
function bodyMouseOut ()
{
	document.getElementById("body").src = signOimages + "/Images/body-2.png";
}

function MouseOver1 ()
{
	document.getElementById("trans").src = signOimages + "/Images/menu/transportation-1.png";
}
function MouseOut1 ()
{
	document.getElementById("trans").src = signOimages + "/Images/menu/transportation-2.png";
}

function MouseOver2 ()
{
	document.getElementById("letter").src = signOimages + "/Images/menu/letters-1.png";
}
function MouseOut2 ()
{
	document.getElementById("letter").src = signOimages + "/Images/menu/letters-2.png";
}

function MouseOver3 ()
{
	document.getElementById("people").src = signOimages + "/Images/menu/people-1.png";
}
function MouseOut3 ()
{
	document.getElementById("people").src = signOimages + "/Images/menu/people-2.png";
}

function MouseOver4 ()
{
	document.getElementById("all").src = signOimages + "/Images/menu/all-1.png";
}
function MouseOut4 ()
{
	document.getElementById("all").src = signOimages + "/Images/menu/all-2.png";
}

function MouseOver5 ()
{
	document.getElementById("cloth").src = signOimages + "/Images/menu/clothing-1.png";
}
function MouseOut5 ()
{
	document.getElementById("cloth").src = signOimages + "/Images/menu/clothing-2.png";
}

function MouseOver6 ()
{
	document.getElementById("geo").src = signOimages + "/Images/menu/geography-1.png";
}
function MouseOut6 ()
{
	document.getElementById("geo").src = signOimages + "/Images/menu/geography-2.png";
}

function MouseOver7 ()
{
	document.getElementById("food").src = signOimages + "/Images/menu/food-1.png";
}
function MouseOut7()
{
	document.getElementById("food").src = signOimages + "/Images/menu/food-2.png";
}

function MouseOver8 ()
{
	document.getElementById("desc").src = signOimages + "/Images/menu/descripition-1.png";
}
function MouseOut8 ()
{
	document.getElementById("desc").src = signOimages + "/Images/menu/descripition-2.png";
}

function MouseOver9 ()
{
	document.getElementById("feel").src = signOimages + "/Images/menu/feelings-1.png";
}
function MouseOut9 ()
{
	document.getElementById("feel").src = signOimages + "/Images/menu/feelings-2.png";
}

function MouseOver10 ()
{
	document.getElementById("sport").src = signOimages + "/Images/menu/sports-1.png";
}
function MouseOut10 ()
{
	document.getElementById("sport").src = signOimages + "/Images/menu/sports-2.png";
}

function MouseOver11 ()
{
	document.getElementById("envi").src = signOimages + "/Images/menu/environment-1.png";
}
function MouseOut11 ()
{
	document.getElementById("envi").src = signOimages + "/Images/menu/environment-2.png";
}

function MouseOver12 ()
{
	document.getElementById("school").src = signOimages + "/Images/menu/school-1.png";
}
function MouseOut12 ()
{
	document.getElementById("school").src = signOimages + "/Images/menu/school-2.png";
}

function MouseOver13 ()
{
	document.getElementById("home").src = signOimages + "/Images/menu/home-1.png";
}
function MouseOut13 ()
{
	document.getElementById("home").src = signOimages + "/Images/menu/home-2.png";
}

function MouseOver14 ()
{
	document.getElementById("action").src = signOimages + "/Images/menu/action-1.png";
}
function MouseOut14 ()
{
	document.getElementById("action").src = signOimages + "/Images/menu/action-2.png";
}

function MouseOver15 ()
{
	document.getElementById("shape").src = signOimages + "/Images/menu/colorshapes-1.png";
}
function MouseOut15 ()
{
	document.getElementById("shape").src = signOimages + "/Images/menu/colorshapes-2.png";
}

function MouseOver16 ()
{
	document.getElementById("time").src = signOimages + "/Images/menu/time-1.png";
}
function MouseOut16 ()
{
	document.getElementById("time").src = signOimages + "/Images/menu/time-2.png";
}

function MouseOver17 ()
{
	document.getElementById("arts").src = signOimages + "/Images/menu/thearts-1.png";
}
function MouseOut17 ()
{
	document.getElementById("arts").src = signOimages + "/Images/menu/thearts-2.png";
}

function MouseOver18 ()
{
	document.getElementById("tech").src = signOimages + "/Images/menu/technology-1.png";
}
function MouseOut18 ()
{
	document.getElementById("tech").src = signOimages + "/Images/menu/technology-2.png";
}

function MouseOver19 ()
{
	document.getElementById("religion").src = signOimages + "/Images/menu/religious-1.png";
}
function MouseOut19 ()
{
	document.getElementById("religion").src = signOimages + "/Images/menu/religious-2.png";
}

function MouseOver20 ()
{
	document.getElementById("number").src = signOimages + "/Images/menu/numbers-1.png";
}
function MouseOut20 ()
{
	document.getElementById("number").src = signOimages + "/Images/menu/numbers-2.png";
}

function MouseOver21 ()
{
	document.getElementById("animal").src = signOimages + "/Images/menu/animals-1.png";
}
function MouseOut21 ()
{
	document.getElementById("animal").src = signOimages + "/Images/menu/animals-2.png";
}

function CategoryTable() 
{
	var categorytable = document.getElementById("categorytable");
	var i, j;
	var row = new Array();
	var cell = new Array();

	var row_num = 4; //edit this value to suit
	var cell_num = 6; //edit this value to suit

	categorytable.setAttribute('id','newtable');

	tbody = document.createElement('tbody');

	for(i = 0; i < row_num; i++)
	{
		row[i] = document.createElement('tr');

		for(j = 0; j < cell_num; j++) 
		{
			cell[j] = document.createElement('td');
			row[i].appendChild(cell[j]);
		}
		tbody.appendChild(row[i]);
	}
	categorytable.appendChild(tbody);
	 
	categorytable.rows[0].cells[0].onclick = function(){Categoryfunction(filename,"All");}
	categorytable.rows[0].cells[1].onclick = function(){Categoryfunction(filename,"Food");}
	categorytable.rows[0].cells[2].onclick = function(){Categoryfunction(filename,"Letters");}
	categorytable.rows[0].cells[3].onclick = function(){Categoryfunction(filename,"Transportation");}
	categorytable.rows[0].cells[4].onclick = function(){Categoryfunction(filename,"Environment");}
	categorytable.rows[0].cells[5].onclick = function(){Categoryfunction(filename,"Colors");}
	categorytable.rows[1].cells[0].onclick = function(){Categoryfunction(filename,"People");}
	categorytable.rows[1].cells[1].onclick = function(){Categoryfunction(filename,"Holidays");}
	categorytable.rows[1].cells[2].onclick = function(){Categoryfunction(filename,"Description");}
	categorytable.rows[1].cells[3].onclick = function(){Categoryfunction(filename,"Body");}
	categorytable.rows[1].cells[4].onclick = function(){Categoryfunction(filename,"Action");}
	categorytable.rows[1].cells[5].onclick = function(){Categoryfunction(filename,"School");}
	categorytable.rows[2].cells[0].onclick = function(){Categoryfunction(filename,"Feelings");}
	categorytable.rows[2].cells[1].onclick = function(){Categoryfunction(filename,"Clothing");}
	categorytable.rows[2].cells[2].onclick = function(){Categoryfunction(filename,"Religion");}
	categorytable.rows[2].cells[3].onclick = function(){Categoryfunction(filename,"The Arts");}
	categorytable.rows[2].cells[4].onclick = function(){Categoryfunction(filename,"Time");}
	categorytable.rows[2].cells[5].onclick = function(){Categoryfunction(filename,"Animals");}
	categorytable.rows[3].cells[0].onclick = function(){Categoryfunction(filename,"Geography");}
	categorytable.rows[3].cells[1].onclick = function(){Categoryfunction(filename,"Technology");}
	categorytable.rows[3].cells[2].onclick = function(){Categoryfunction(filename,"Sports");}
	categorytable.rows[3].cells[3].onclick = function(){Categoryfunction(filename,"Home");}
	categorytable.rows[3].cells[4].onclick = function(){Categoryfunction(filename,"Numbers");}
	categorytable.rows[3].cells[5].onclick = function(){Categoryfunction(filename,"");}
}
