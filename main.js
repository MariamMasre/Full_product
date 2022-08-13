  //منادي للبيانات من المربعات 
  let title =document.getElementById('title');
  let price =document.getElementById('price');
  let taxes =document.getElementById('taxes');
  let ads =document.getElementById('ads');
  let discount =document.getElementById('discount');
  let total =document.getElementById('total');
  let count =document.getElementById('count');
  let category =document.getElementById('category');
  let submit =document.getElementById('submit');
  
  let mood = 'create';

  let tmp;
      /*  هلا بدنا نختبر انو جبنا كل بيانات  
      console.log(title, price,taxes,ads,discount,total,count,category,submit);*/

//////////////////////get total\\\\\\\\\\\\\\\\\\\\\\
function getTotal(){
    /*عشان نختبر  انو ربطنا ما بين المربعات والونكشن
    فا راح يظهر بالكونسكلل بعد ما عبي اي فراغ يظهر دون
    console.log('done');*/


//بتاكد انو سعر المنج موجود واذا غير موجود لا يتم حساب التوتل حتى لو تم وضع ضرائب
    if(price.value != ''){
        //حط اشاره + قبل كل كلمه مشان يحولها لنبر لانها كانت استرنق
       let result = (+price.value + +taxes.value +  +ads.value)- +discount.value;
       total.innerHTML =result;
       //بغير لون المربع لانو صار به  نتيجه
       total.style.background = '#040';
    } else{
        total.innerHTML = '';
        total.style.background ='#red';
    }

}
/////////////////////create product\\\\\\\\\\\\\\\\\\
//لازم نتاكد اذا لوكل استورج فارغه او مليانه مشان ما يمسح البيانات في الوكل استورج فا 
/*ليش بمسح البيانات في لوكل لانه مجرد
 ما يحط البيانات في لوكل عن طريق الاريه را تنحفظ بس 
اذا ارجعنا شغلنا الصسفحه فا راح تصير اريه فارغه
 فا مشا هيك بصير الوكل استرج برضو فارغ*/
 let dataPro;
 if(localStorage.product != null){ 
    dataPro = JSON.parse(localStorage.product);
 }else{
//عشان نحفظ البيانات نستخدم اريه 
 dataPro = [];}
//  function()راح ينادي ال  'submit'على زرار 'onclick'  لما  يكبس 
submit.onclick = function(){
    //عمل اوبجكت مشان يجمع كل صفات في اوبجكت وحده ويضيفه على اريه كاوبجكت
let newPro ={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
}
dataPro.push(newPro);
localStorage.setItem('product',JSON.stringify(dataPro));
if (mood ==='create'){
/*///////////////count \\\\\\\\\\\\ 
بعد ما نعبي البيانات فا بختار كم مره بدي تتكرر البيانات */
if(newPro.count > 1){
    for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
        
    }
}else{
    dataPro.push(newPro);
}
}else{
dataPro[ tmp] =newPro;
mood ='create';
submit.innerHTML ='Creat';
count.style.display = 'block' ;
}
/////////////////////save localstorage\\\\\\\\\\\\\\\
// ********local storageراح نحفظ البيانات في *****
localStorage.setItem('product' , JSON.stringify(dataPro));
clearData();
showData();
}



/////////////////////clear inputs\\\\\\\\\\\\\\\\\\\\
function clearData(){
title.value ='';
price.value ='';
taxes.value ='';
ads.value ='';
discount.value ='';
total.innerHTML ='';
count.value ='';
category.value ='';

}
//////////////////////read\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function showData(){
    getTotal();
 let table = ''; 
 for(let i = 0; i < dataPro.length;i++){
    table += `
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].parse}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="updat">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td> 
    </tr>
    `;
 }
 //عشان يظهر ويختفي زر ديليت ااول بناء على اذا كان يحتوي على بيانات او  لا 
 document.getElementById('tbody').innerHTML = table;
 let btnDelete =document.getElementById('deleteAll');
 if(dataPro.length>0){
btnDelete.innerHTML=`
 <button onclick="deleteAll()" >delete All(${dataPro.length}) </button>`;
 }else{
    btnDelete.innerHTML=` `;
 }
}
showData();

///////////////////delete\\\\\\\\\\\\\\\\
function deleteData(i){
    //حذف القيمه من الاريه
dataPro.splice(i,1);
//حدث الاريه الجديده في لوكل ستورج
localStorage.product=JSON.stringify(dataPro);
// عاد تشغيل الصفحه مشان تظهر على طول النتيجه
showData();
}
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

///////////////////update\\\\\\\\\\\\\\\\\\\\\
function updateData(i){
    //مشان نحط القيم في المربعات مشان نعدل عليها
title.value =dataPro[i].title;
price.value = dataPro[i].parse;
taxes.value =dataPro[i].taxes;
ads.value = dataPro[i].ads;
discount.value =dataPro[i].discount;
getTotal();
//مشان نشيل مربع التكرار لانو ما منحتاجه
count.style.display ='';
category.value = dataPro[i].category;
submit.innerHTML ='Update';
mood ='update';
// ونستخدمها في فانكشون الاخرىiمشان نحفظ قيمه 
tem = i;
scroll({
 top :0  ,
 //لما تكبس على ابديت بطلع لفوق
 behavior:'smooth' ,
})

}

//////////////////////search\\\\\\\\\\\\\\\\
let searchMood = 'title';
function getSearchMood(id){
    let search = document.getElementById('search');
if (id == 'searchTitle'){
searchMood = 'title';


}else{
    searchMood = 'category';
    
}
search.placeholder='Search By '+searchMood;
search.focus();
//هي مشان عند الضغط على اي من كبستين سيرشس يخلي ملربع فاضي
search.value ='';
//مشان يعرض البيانات
showData();
}
function searchData(value){
    let table ='';
if(searchMood == 'title'){

    for (let i = 0; i < dataPro.length; i++) {
        if(dataPro[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].parse}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="updat">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td> 
            </tr>
            `

            

        }
        
    }

}else{

    for (let i = 0; i < dataPro.length; i++) {
        if(dataPro[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].parse}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="updat">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td> 
            </tr>
            `

            

        }
        
    }
}
document.getElementById('tbody').innerHTML=table;
}



//////////////clean data \\\\\\\\\\\\\\\\يتاكد انو المستخدم عبا كل الفراغات

