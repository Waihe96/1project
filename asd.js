let arr = [1,4,1,1,4,5];
let b =[];


  function filter(array){
      array.sort();
      array.forEach((element,index) => {if (element==1){
        array.splice(index,1);
      }
        
      });
     

     

      
    }
  
filter(arr);
console.log(arr);