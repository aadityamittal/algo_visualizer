var x = document.getElementById("tab")

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }
async function fm() {
    var arr = [];
    for (let i = 0; i < 6; i++) 
    {
            arr.push(parseInt(x.rows[0].cells[i].children[0].value,10)) 
            x.rows[0].cells[i].children[0].disabled = true;
    }
    console.log(arr);
    let n = arr.length;
    for (let i = 1; i < n; i++)
    {
        let temp=arr[i];
        x.rows[0].cells[i].children[0].style.background = 'aqua'
        let j=i-1;
        await sleep(2000)

       while(j>=0 && arr[j]>temp)
       {
           x.rows[0].cells[j].children[0].style.background = 'blueviolet'
           x.rows[0].cells[j+1].children[0].style.background = 'red'
           await sleep(1000)
           arr[j+1]=arr[j];
           x.rows[0].cells[j+1].children[0].value = x.rows[0].cells[j].children[0].value
            await sleep(2000)
            x.rows[0].cells[j].children[0].style.background = 'white'
            x.rows[0].cells[j+1].children[0].style.background = 'white'
           j--;
       }
       x.rows[0].cells[j+1].children[0].style.background = 'cadetblue'
       await sleep(2000)
       arr[j+1]=temp;
       x.rows[0].cells[j+1].children[0].value =temp;
       await sleep(2000)
       x.rows[0].cells[j+1].children[0].style.background = 'white'

    }
       
}