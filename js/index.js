var pNameInput = document.getElementById("pName");
var pPriceInput = document.getElementById("pPrice");
var pCategoryInput = document.getElementById("pCategory");
var pDescInput = document.getElementById("pDesc");

// 3
var userNameAlert = document.getElementById("userNameAlert");
var CategorAlert = document.getElementById("CategorAlert");

var globalUpdateIndex = 0;

var myStore;
if(localStorage.getItem("productInStorage") == null) {
	myStore = [];
}

else {
	myStore = JSON.parse(localStorage.getItem("productInStorage"));
	displayProducts();
}

//addProduct ==> buttonده مش بيشتغل حاجه خالص غير لم اضغط علي ال
function addProduct() {
	// 5	// ده علشان لم لو صح اطبع في المتصفح لو غلط ميطبعش حاجه if واعمل 
	if(validateProductName() && validateCategory()  == true) {
		var oneProduct = {
			pName : pNameInput.value,
			pPrice :  pPriceInput.value,
			pCategory : pCategoryInput.value,
			pDesc : pDescInput.value,
		}
		
		myStore.push(oneProduct);
		localStorage.setItem("productInStorage" , JSON.stringify(myStore))
		displayProducts();
		clearInputs();
	}
}

//clear ==> addProduct اللي اسم button لم بضغط علي inputده بيعمل مسح في ال
function clearInputs() {
	pNameInput.value = "";	
	pPriceInput.value = "";
	pCategoryInput.value = "";
	pDescInput.value = "";
}

//display ==> HTMLده العنصر اللي جبتها من ال
function displayProducts()
{
	var cartuna = ``;
	
	for(var i=0; i < myStore.length; i++)
	{

		cartuna += `<tr>
						<td>`+i+`</td>
						<td>`+myStore[i].pName+`</td>
						<td>`+myStore[i].pPrice+`</td>
						<td>`+myStore[i].pCategory+`</td>
						<td>`+myStore[i].pDesc+`</td>
						<td><button onclick="updateProduct(`+i+`)" class="btn btn-outline-warning">update</button></td>
						<td><button onclick="deleteProduct(`+i+`)" class="btn btn-outline-danger">delete</button></td>
					</tr>`
	}					
	document.getElementById("tBody").innerHTML = cartuna;	
}


//Delete
function deleteProduct(pDeleteIndex) {
	myStore.splice(pDeleteIndex,1);
	displayProducts(); 
	localStorage.setItem("productInStorage" , JSON.stringify(myStore))
}

//Update
function updateProduct(pUpdateIndex) {
	globalUpdateIndex = pUpdateIndex;
	
	pNameInput.value = myStore[pUpdateIndex].pName
	pPriceInput.value = myStore[pUpdateIndex].pPrice
	pCategoryInput.value = myStore[pUpdateIndex].pCategory
	pDescInput.value = myStore[pUpdateIndex].pDesc;

	document.querySelector(".addUpdate").style.display = "none";
	document.querySelector(".buttonUpdate").classList.remove ("d-none");
}

//updateNow
//Add Product ل Update وبعد م اعدل يغير معايا من Update ل اسم Add Productيتغير اسم ال Update ده علشان لم اضغط علي 
function updateNow() {
	//32
	myStore[globalUpdateIndex].pName = pNameInput.value
	myStore[globalUpdateIndex].pPrice = pPriceInput.value
	myStore[globalUpdateIndex].pCategory = pCategoryInput.value
	myStore[globalUpdateIndex].pDesc = pDescInput.value
	
	displayProducts();
	clearInputs();
	localStorage.setItem("productInStorage" , JSON.stringify(myStore));	

	document.querySelector(".addUpdate").style.display = "inline-block";
	document.querySelector(".buttonUpdate").classList.add ("d-none");
}

//Search	
function pSearch(searchTerm){
	
	var cartunaSearch = ``;

	for(var i=0 ; i < myStore.length ; i++)
	{
		if( (myStore[i].pName).toLowerCase().includes(searchTerm.toLowerCase()) 
			|| 
			(myStore[i].pCategory).toLowerCase().includes(searchTerm.toLowerCase())
		)
		{
					cartunaSearch += `<tr>
						<td>`+i+`</td>
						<td>`+myStore[i].pName+`</td>
						<td>`+myStore[i].pPrice+`</td>
						<td>`+myStore[i].pCategory+`</td>
						<td>`+myStore[i].pDesc+`</td>
						<td><button onclick="updateProduct(`+i+`)" class="btn btn-outline-warning">update</button></td>
						<td><button onclick="deleteProduct(`+i+`)" class="btn btn-outline-danger">delete</button></td>
					</tr>`;
		}
	}
	document.getElementById("tBody").innerHTML = cartunaSearch;
}

//1		//Validation => Regx
//حرف كبتل وارقام وهكذه Password يدخل بشروط معاينه مثلا داخل في Password و Emailيعني لم عميل يدخل علي ال
function validateProductName() {
	//
	var rgx = /^[a-zA-Z]{3,15}$/	//ده كده يكتب حروف كبتل واسمول فقط 
	//
	if(rgx.test(pNameInput.value) == true )//test يعني بيعمل jsده مسود في ال testال
								//is-valid اعمل true لو بترجع pNameInput.value علي test انا كده بقول اعمل 
	{
		pNameInput.classList.add("is-valid");//htmlال class في is-validانا كده بقول ضافه ال classList.addال
											//علامه صح ولون اخضرinputده يعني طلع ال is-valid
		pNameInput.classList.remove("is-invalid"); 
		// 4
		userNameAlert.classList.replace("d-block" , "d-none");//alertاخفي ال true انا كده بقول لو replace("d-block" , "d-none")
																//htmlاللي في ال alertبتاع ال idده ال userNameAlert
		return true;	//true صح ترجع validateProductNameاللي اسمها functionلو ال
	}
	
	
	else {	//is-invalid لو عامل غلط اعمل 
		pNameInput.classList.add("is-invalid");//htmlال class في is-invalidانا كده بقول ضافه ال classList.addال
											//علامه خطا ولون احمر inputده يعني طلع ال is-invalid
		pNameInput.classList.remove("is-valid"); //is-valid يكتب غلط ويرجع تاني يعمل Userده علشان لم ال
		// 4
		userNameAlert.classList.replace("d-none" , "d-block");//alertغلط اظهر ل ال inputدخل في ال uesrانا كده بقول لو ال replace("d-none" , "d-block")
							//jsوال htmlم بين ال classده بيعمل تبدل ب ال eplaceال
		return false;	//false لو غلط رجع validateProductName اللي اسمها functionلو ال
	}
}

pNameInput.addEventListener("keyup" , validateProductName);//inputيشيل ايده من ال userده يعني بيشتغل لم الblur
// pNameInput.addEventListener("blur" , validateProductName);//inputيشيل ايده من ال userده يعني بيشتغل لم الblur


//----------------------------------------

//6		//Validation => Regx

function validateCategory() {
	var rgx = /^[a-zA-Z]{3,15}$/;

	if(rgx.test(pCategoryInput.value) == true ) {
		pCategoryInput.classList.add("is-valid");
		pCategoryInput.classList.remove("is-invalid"); 
		CategorAlert.classList.replace("d-block" , "d-none");
		return true;
	}
	
	
	else {	
		pCategoryInput.classList.add("is-invalid");
		pCategoryInput.classList.remove("is-valid");
		CategorAlert.classList.replace("d-none" , "d-block");
		return false;
	}
}

pCategoryInput.addEventListener("keyup" , validateCategory);




//Validation	 searsh انا عايز اعمل ال 