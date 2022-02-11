
function maxInversions(arr) {
    
  let i = 0;
  let j = 1;
  let k = 2;
  let inversions = 0;
  
  while(true) {
    
      if(arr[i] > arr[j] && arr[j] > arr[k]) {
          inversions++
      }
      
      if(i === arr.length - 3) {
        break;
      }else if(j === arr.length - 2) {
        i++;
        j = i + 1;
        k = j + 1;
      }else if(k === arr.length - 1) {
        j++;
        k = j + 1;
      }else{
        k++
      }

  }
  
  return inversions;
}


console.log(maxInversions([5, 3, 4, 2, 1]))
