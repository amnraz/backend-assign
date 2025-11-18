const os = require('os')

function getSystemInfo() {

    console.log("System Information");

    console.log("-----------------------")


    console.log("System Architecture: ", os.arch());
    console.log("Number of CPU Cores: ", os.cpus().length);
    console.log("CPU Model: ", os.cpus()[0].model);
    console.log("CPU Speed (MHz): ", os.cpus()[0].speed);

    console.log("Total Memory (GB): ", (os.totalmem() / (1024 ** 3)).toFixed(2));
    console.log("Free Memory (GB): ", (os.freemem() / (1024 ** 3)).toFixed(2));
    const memoryUsage = process.memoryUsage();
    console.log("Heap Used (MB): ", (memoryUsage.heapUsed / (1024 ** 2)).toFixed(2));
    console.log("Heap Total (MB): ", (memoryUsage.heapTotal / (1024 ** 2)).toFixed(2));
    console.log("Hostname: ", os.hostname());
    console.log("OS Type: ", os.type());
}
module.exports = getSystemInfo;