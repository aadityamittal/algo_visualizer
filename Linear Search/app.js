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
    for(var i = 0; i < 6; i++)
    {
        x.rows[0].cells[i].children[0].style.background = 'aqua'
        await sleep(2000);
        if(arr[i] == 5)
        {
            x.rows[0].cells[i].children[0].style.background = 'green'
            await sleep(1000);
            alert("Search Successfull")
            return;
        }
        else{
            x.rows[0].cells[i].children[0].style.background = 'red'
            await sleep(1000);
        }
        x.rows[0].cells[i].children[0].style.background = 'white'
    }
    alert("Element not present")
}