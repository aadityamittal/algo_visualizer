var x = document.getElementById("tab")

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }
async function fm() {
    var arr = [];
    for (let i = 0; i < 6; i++) {
            arr.push(parseInt(x.rows[0].cells[i].children[0].value,10)) 
            x.rows[0].cells[i].children[0].disabled = true;
    }
    console.log(arr);
    let n = arr.length;
 
    // One by one move boundary of unsorted subarray
    for (let i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted array
        let min_idx = i;
        x.rows[0].cells[i].children[0].style.background = 'aqua'
        await sleep(2000)
        let prev = -1;
        for (let j = i+1; j < n; j++){
            if (arr[j] < arr[min_idx]){
                console.log(prev);
                if(prev != -1){
                    x.rows[0].cells[prev].children[0].style.background = 'white'
                    console.log(prev);
                }
                x.rows[0].cells[j].children[0].style.background = 'blueviolet'
                prev = j;
                min_idx = j;
                await sleep(2000)
            }
        }
        // Swap the found minimum element with the first
        // element
        let temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;

        let v = x.rows[0].cells[min_idx].children[0].value
        x.rows[0].cells[min_idx].children[0].value = x.rows[0].cells[i].children[0].value
        x.rows[0].cells[i].children[0].value = v;
        await sleep(2000);
        x.rows[0].cells[i].children[0].style.background = 'white'
        x.rows[0].cells[min_idx].children[0].style.background = 'white'
        await sleep(1000);
        //swapping table values
    }
}
function hide(a, b){
    for(let i = a; i <= b; i++)
    {
        console.log("exc");
        x.rows[0].cells[i].children[0].style.background = 'red'
    }
}