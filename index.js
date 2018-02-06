var fs = require('fs');


if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

var path_src = process.argv[2];
var format = process.argv[3];
var pictures = [];
console.log(process.argv[0], "+", process.argv[1]);

function dir_reader(path) {
    fs.readdir(path, function (err, items) {
        for (var i = 0; i < items.length; i++) {
            if ((items[i].indexOf(".")!=-1) && (items[i].indexOf(format)!=-1)){
                //console.log(items[i]);
                var png_file = {
                    name: items[i],
                    path: path
                };
                pictures.push(png_file);
                //console.log(pictures);
            } else {
                dir_reader(path+"/"+items[i]);
            }
        }
    });
}


dir_reader(path_src);
console.log(pictures.length);
for (var i=0; i<pictures.length; i++){
    console.log("Имя файла: " + pictures[i].name + "\t" + "Путь:" + pictures[i].path);
}

