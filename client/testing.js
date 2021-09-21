var fs=require("fs");
fs.readFile("./package.json",'utf-8', function (err,stringdata){
    const data=JSON.parse(stringdata)
    arr=(Object.keys(data['dependencies']))
    for (item in arr) {
        console.log(arr[item])

    }
    // console.log(arr[0])
})
