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
    var items = fs.readdirSync(path);
    for (var i = 0; i < items.length; i++) {
        if ((items[i].indexOf(".") != -1) && (items[i].indexOf(format) != -1)) {
            //console.log(items[i]);
            var png_file = {
                name: items[i],
                path: path
            };
            pictures.push(png_file);
            //console.log(pictures);
        } else {
            dir_reader(path + "/" + items[i]);
        }
    }
}

function files_sort(a,b) {
    if(a.name<b.name){
        return -1;
    }else if (a.name>b.name){
        return 1;
    }else {
        return 0;
    }
}


dir_reader(path_src);
pictures.sort(files_sort);
console.log(pictures.length);
for (var i=0; i<pictures.length; i++){
    console.log("Имя файла: " + pictures[i].name + "\n" + "Путь:" + pictures[i].path + "\n\n");
}

