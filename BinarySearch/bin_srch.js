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
    }
    console.log(arr);
    let low = 0;
    let high = 5;
    const search = 7
    while(low <= high)
    {
        let mid = Math.floor((low + high) / 2);
        x.rows[0].cells[mid].children[0].style.background = 'aqua'
        await sleep(2000);
        if(arr[mid] < search)
        {
            hide(low, mid);
            await sleep(2000);
            low = mid + 1;
        }
        else if(arr[mid] > search)
        {
            hide(mid, high);
            await sleep(2000);
            high = mid - 1;
        }
        else{
            x.rows[0].cells[mid].children[0].style.background = 'green'
            await sleep(1000)
            return;
        }
    }
    alert("Element not present")
}

function hide(a, b){
    for(let i = a; i <= b; i++)
    {
        console.log("exc");
        x.rows[0].cells[i].children[0].style.background = 'red'
    }
}