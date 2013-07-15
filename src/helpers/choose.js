function(arr) {
  if(arr instanceof Array === false) {
    return '';
  }

  var i = random.int(arr.length - 1);
  return arr[i];
}