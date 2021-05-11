var favhobby={
  "project":"myColoring",
  "owner": "Anzhela Petrosyan",
  "fullname": "",
  "country": "",
  "gender": "",
  "color" : "", 
  "colorw" : "",
  "booknum" : "",
  "favartist" : "",
  "adults" : "",
  "date" : "",

}
function Validatecurrentvalue(){
  var currentvalue=document.getElementById("fullname").value;
  console.log("Eventcall;", currentvalue.length)
  if (currentvalue.length > 10){
   document.getElementById("fullnameerror").innerHTML="Bad";
  } else{
    document.getElementById("fullnameerror").innerHTML="Good";
  }
}

function handleFullNameChange(){
 favhobby.fullname=document.getElementById("fullname").value;

}

function handleCountryChange(){
 favhobby.country=document.getElementById("country").value;
}
 function handleDateChange(){
 favhobby.date=document.getElementById("date").value;
}

 function handleGenderChange(){
   favhobby.gender=document.getElementById("gender").value;
 }
function handleFavColorChange () {
   favhobby.color=document.getElementById("color").value;
 }
 function handleColorWChange () {
   favhobby.colorw=document.getElementById("colorw").value;
 }

function handleColoringBookChange(){
 favhobby.booknum=document.getElementById("booknum").value;
}
function handleFavArtistChange(){
 favhobby.favartist=document.getElementById("favartist").value;

}
function handleBenefitChange(){
 favhobby.adults=document.getElementById("adults").value;
}
function handleCheckboxChange(e) {
  var value = e.target.id;
  if (e.target.value == "on") {
    favhobby.colorw = favhobby.colorw + "," + value;
  }
} 

function SaveData(e) {
  e.preventDefault();
  console.log("The current value is", favhobby)
  
  $.ajax({
    type: 'POST',
    url: "https://cse120-2021api-anzhela.herokuapp.com/data",
    data: favhobby,
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
}

function loadExistingData() {
	var existingData = [];
  $.ajax({
    type : "GET",
    url : "https://cse120-2021api-anzhela.herokuapp.com/data",
    dataType : "json",
    success : function(data) {
      console.log("success", data);
      existingData = data;
      displayData(existingData.data);
    },
    error : function(data) {
        console.log("Error")
    }
  });
}

function displayData(existingData) {
  document.getElementById("existingData").innerHTML = "<ul>";
  for (var i = 0; i < existingData.length; i++) {
    currentBook = existingData[i];
    document.getElementById("existingData").innerHTML += "<li><i>" + currentBook.fullname + "</li> : <b>" + currentBook.title + "</b></li>";
  }
  document.getElementById("existingData").innerHTML += "</ul>"
}
    
function deleteData(id) {

    var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
    if (r == true) {
      
    } else {
      return;
    }

    var tmp = {
        "id": id
    }

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021api-anzhela.herokuapp.com/data/delete",
        data: tmp,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
            document.getElementById("div" + id).style.display = "none";
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");  
        }
    });
}
function saveData() {
	var tmp = {
		"test": "Data"
	}

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021api-anzhela.herokuapp.com/data",
        data: tmp,
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
}

function loadExistingData() {
    $.ajax({
        type : "GET",
        url : "https://cse120-2021api-anzhela.herokuapp.com/data",
        dataType : "json",
        success : function(data) {
        	console.log("success", data);
            displayData(data.data);
        },
        error : function(data) {
            console.log("Error")
        }
    });
}

function displayData(data) {
    document.getElementById("dataContainer").innerHTML = "";
    data.forEach(elem => {

    var item = document.createElement("div");
        item.id = "div" + elem["_id"];
        item.className = "item";
    if (Object.keys(elem).length == 1) {
    var span = document.createElement("span");
        span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
        item.appendChild(span);
        }
    Object.keys(elem).forEach(key => {
      if (key != "_id") {
      var span = document.createElement("span");

      var b = document.createElement("b");
          b.innerHTML = key + ": ";
          span.appendChild(b);
                
          span.className = "item";
      if (elem[key]) {
          span.innerHTML += elem[key];
      } else {
        
      var span1 = document.createElement("span");
          span1.className = "undefined";
          span1.innerHTML = "N/A";
          span.appendChild(span1)
                }
          item.appendChild(span);

      var br = document.createElement("br");
          item.appendChild(br);
            }
        })
      var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.id = elem["_id"];
        button.addEventListener("click", function(e){
          deleteData(e.target.id);
        }, false);
        item.appendChild(button);
        document.getElementById("dataContainer").appendChild(item);
    })

}
var loadedData = [];

function loadBookEditItem() {
    localStorage = window.localStorage;
    editItem = JSON.parse(localStorage.getItem("editItem"));
    console.log(editItem);
    document.getElementById("_id").innerHTML = editItem["_id"];
    document.getElementById("title").value = editItem["title"];
    document.getElementById("fullname").value = editItem["fullname"];   
    document.getElementById("author").value = editItem["author"];   
    document.getElementById("numberofpages").value = editItem["numberofpages"];
    document.getElementById("price").value = editItem["price"];
    document.getElementById("currency").value = editItem["currency"];
    document.getElementById("language").value = editItem["language"];
    document.getElementById("edition").value = editItem["edition"];
    document.getElementById("publisher").value = editItem["publisher"];
    document.getElementById("publishingyear").value = editItem["publishingyear"];
    document.getElementById("originalpubdate").value = editItem["originalpubdate"];
    document.getElementById("genre").value = editItem["genre"];
}
function loadColoringEditItem() {
    localStorage = window.localStorage;
    editItem = JSON.parse(localStorage.getItem("editItem"));
    console.log(editItem);
    document.getElementById("_id").value = editItem["_id"];
    document.getElementById("fullname").value = editItem["fullname"];
    document.getElementById("country").value = editItem["country"]; 
    document.getElementById("date").value = editItem["date"];
    document.getElementById("gender").value = editItem["gender"];
    document.getElementById("color").value = editItem["color"];
    document.getElementById("colorw").value = editItem["colorw"];      
    document.getElementById("booknum").value = editItem["booknum"];
    document.getElementById("favartist").value = editItem["favartist"];
    document.getElementById("adults").value = editItem["adults"];
    
}

function editData(id) {
    var tmp = id.split("edit_");
    var item_id = tmp[1];

    loadedData.forEach(item => {
        if ( item._id == item_id) {
            console.log(item); 
            localStorage = window.localStorage;
            localStorage.setItem('editItem', JSON.stringify(item));
            if (item["project"] == "myColoring") {
            document.location  = "coloring.html"; 
            } else {
            document.location  = "book.html"; 
            }
        }
    })
}

function deleteData(id) {

    var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
    if (r == false) {
        return;
    }

    var tmp = {
        "id": id
    }

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021api-anzhela.herokuapp.com/data/delete",
        data: tmp,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
            document.getElementById("div" + id).style.display = "none";
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");  
        }
    });
}

function saveData() {
	var tmp = {
		"test": "Data"
	}

  $.ajax({
      type: 'POST',
      url: "https://cse120-2021api-anzhela.herokuapp.com/data",
      data: tmp,
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
}

function loadExistingData() {
  myColoringData = [];
  myBookData = [];
  otherData = [];
  $.ajax({
      type : "GET",
      url : "https://cse120-2021api-anzhela.herokuapp.com/data",
      dataType : "json",
      success : function(data) {
        loadedData = data.data;
        data.data.forEach(elem => {
          if (elem["owner"] == "Anzhela Petrosyan") {
            if (elem["project"] == "myColoring") {
              myColoringData.push(elem);
            } else {
              myBookData.push(elem);
            }
          } else {
            otherData.push(elem);
          }
        })
        displayData(myColoringData, "coloringDataContainer");
        displayData(myBookData, "bookDataContainer");
        displayData(otherData, "otherDataContainer");
      },
      error : function(data) {
          console.log("Error")
      }
  });
}

function displayData(data, containerDivName) {
  document.getElementById(containerDivName).innerHTML = "";
  data.forEach(elem => {
    var item = document.createElement("div");
    item.id = "div" + elem["_id"];
    item.className = "item";
    if (Object.keys(elem).length == 1) {
      var span = document.createElement("span");
      span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
      item.appendChild(span);
    }
    Object.keys(elem).forEach(key => {
      if (key != "_id") {
        var span = document.createElement("span");

        var b = document.createElement("b");
        b.innerHTML = key + ": ";
        span.appendChild(b);
        
        span.className = "item";
        if (elem[key]) {
            span.innerHTML += elem[key];
        } else {
            var span1 = document.createElement("span");
            span1.className = "undefined";
            span1.innerHTML = "N/A";
            span.appendChild(span1)
        }
        item.appendChild(span);

        var br = document.createElement("br");
        item.appendChild(br);
      }
    })
    var edit_button = document.createElement("button");
    edit_button.innerHTML = "Edit";
    edit_button.id = "edit_" + elem["_id"];
    edit_button.className = "edit";
    edit_button.addEventListener("click", function(e){
        editData(e.target.id);
    }, false);
    item.appendChild(edit_button);

    var button = document.createElement("button");
    button.innerHTML = "Delete";
    button.id = elem["_id"];
    button.addEventListener("click", function(e){
        deleteData(e.target.id);
    }, false);
    item.appendChild(button);
    document.getElementById(containerDivName).appendChild(item);
  })

}

function toggleOtherData() {
  var otherData = document.getElementById("otherDataContainer");
  if (otherData.style.display == "block") {
    otherData.style.display = "none";
  } else {
    otherData.style.display = "block";
  }
}

function toggleColoringData() {
  var coloringData = document.getElementById("coloringDataContainer");
  if (coloringData.style.display == "block") {
    coloringData.style.display = "none";
  } else {
    coloringData.style.display = "block";
  }
}

function toggleBookData() {
  var bookData = document.getElementById("bookDataContainer");
  if (bookData.style.display == "block") {
    bookData.style.display = "none";
  } else {
    bookData.style.display = "block";
  }
}
function updateData(e) {
  e.preventDefault();
  var updatedBook = {};
  updatedBook.id = document.getElementById("_id").value;
  updatedBook.fullname = document.getElementById("fullname").value;
  updatedBook.title = document.getElementById("title").value;
  updatedBook.author = document.getElementById("author").value;
  updatedBook.colour = document.getElementById("colour").value;
  updatedBook.covertype = document.getElementById("covertype").value;
  updatedBook.numberofpages = document.getElementById("numberofpages").value;
  updatedBook.price = document.getElementById("price").value;
  updatedBook.currency = document.getElementById("currency").value;
  updatedBook.language = document.getElementById("language").value;
  updatedBook.edition = document.getElementById("edition").value;
  updatedBook.dimensions = document.getElementById("dimensions").value;
  updatedBook.publisher = document.getElementById("publisher").value;
  updatedBook.publishingyear = document.getElementById("publishingyear").value;
  updatedBook.originalpubdate = document.getElementById("originalpubdate").value;
  updatedBook.genre = document.getElementById("genre").value;
      $.ajax({
      type: 'POST',
      url: "https://cse120-2021api-anzhela.herokuapp.com/data/update",
      data: updatedBookData,
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
}

function ColoringData(e) {
  e.preventDefault();
    if(validateFormData() == false) {
    return;
  } else {console.log("The current value is", favhobby)
  }
  $.ajax({
    type: 'POST',
    url: "https://cse120-2021api-anzhela.herokuapp.com/data",
    data: favhobby,
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
}

function saveData() {
	var tmp = {
		"test": "Data"
	}

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021api-anzhela.herokuapp.com/data",
        data: tmp,
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
}

function loadExistingData() {
	var existingData = [];
  $.ajax({
    type : "GET",
    url : "https://cse120-2021api-anzhela.herokuapp.com/data",
    dataType : "json",
    success : function(data) {
    console.log("success", data);
    existingData = data;
    displayData(existingData.data);
    },
    error : function(data) {
        console.log("Error")
    }
  });
}

function displayData(existingData) {
  document.getElementById("existingData").innerHTML = "<ul>";
  for (var i = 0; i < existingData.length; i++) {
    currentBook = existingData[i];
    document.getElementById("existingData").innerHTML += "<li><i>" + currentBook.fullname + "</li> : <b>" + currentBook.title + "</b></li>";
  }
  document.getElementById("existingData").innerHTML += "</ul>" 
}
