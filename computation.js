const asynchronousLongConputation = () => {
    let data = 3_000_000_000_000_000;
    let res = 0;
    for(let i = 0; i <= res; i++ ) {
       data += i
    }
    return data
}

process.on("message", (result) => {
            if(result === "start") {
              const data = asynchronousLongConputation()
              process.send(data)
            }
})
