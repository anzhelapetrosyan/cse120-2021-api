var Mybook={
  "project":"myBook",
  "owner": "Anzhela Petrosyan",
  "fullname": "",
  "title": "",
  "author": "",
  "colour": "",
  "covertype" : "", 
  "numberofpages": "",
  "price": "",
  "currency": "",
  "language" : "",
  "edition": "",
  "dimensions": "",
  "publisher": "",
  "publishingyear":"", 
  "originalpublishingyear": "",
  "genre": "",

}


function handleFullNameChange(){
 myBook.fullname=document.getElementById("fullname").value;

}

function handleTitleChange(){
 myBook.title=document.getElementById("title").value;
}

function handleAuthorChange(){
   myBook.author=document.getElementById("author").value;
}

function handleColorChange(){
   myBook.colour=document.getElementById("colour").value;
}

function handleCoverTypeChange(e){
  myBook.covertype= e.target.value; 
 if ( myBook.covertype !="other"){
    myBook.othercovertype="";
   document.getElementById("othertext").style.display="none";
 } else{
   document.getElementById("othertext").style.display="block";
 }
}

function handleCustomTypeChange(){
if( myBook.covertype=="other"){
  myBook.othercovertype=document.getElementById("othertext").value;
}
}

function handleNumberofPagesChange(){
 myBook.numberofpages=document.getElementById("numberofpages").value;
}

function handlePriceChange(){
  myBook.price=document.getElementById("price").value;
}

function handleCurrencyChange(){
 myBook.currency=document.getElementById("currency").value;
}

function handleLanguageChange(event){
   myBook.language= event.target.value;
  if ( myBook.language != "other"){
    myBook.otherlanguage="";
    document.getElementById("otherlangtext").style.display="none";
  } else{
    document.getElementById("otherlangtext").style.display="block";
  }
}
function handleCustomLangChange(){
  if ( myBook.language=="other") {
    document.getElementById("otherlanguage").value;
  }
}

function handleEditionChange(){
   myBook.edition=document.getElementById("edition").value;
}
function handleDimensionsChange(){
  myBook.dimensions=document.getElementById("dimensions").value;
}
function handlePublisherChange(){
   myBook.publisher=document.getElementById("publisher").value;
}

function handlePubYearChange(){
  myBook.publishingyear=document.getElementById("publishingyear").value;
}

function handleOriginalPublishingyearChange(){
   myBook.originalpublishingyear=document.getElementById("originalpublishinyear").value;
}

function handleOriginalPubYearChange(){
  myBook.originalpublishingyear=document.getElementById("originalpubdate").value;
}

function handleGenreChange(){
   myBook.genre=document.getElementById("genre").value;
}


function showData(e) {
   console.log(myBook);
   e.preventDefault();
}
  $.ajax({
    type: 'POST',
    url: "https://cse120-2021api-anzhela.herokuapp.com/data",
    data: myBook,
    cache: false,
    dataType : 'json',
    success: function (data) {
    console.log("success");
    },
    error: function (xhr) {
    console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });  
