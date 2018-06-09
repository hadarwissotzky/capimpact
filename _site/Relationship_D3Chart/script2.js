document.addEventListener("DOMContentLoaded", function (event) {
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        g = svg.append("g").attr("transform", "translate(40,0)");

    var tree = d3.cluster()
        .size([height, width - 350]);

    doIt();
});

var stratify = d3.stratify()
    .parentId(function (d) {
        console.log(d);
        return d.LevelID;
    }).id(function (d) {
        console.log(d);
        return d.LevelID;
    });

function doIt() {

    d3.queue()
        .defer(d3.csv, "resources/M_R_Capability_Model.csv")
        .defer(d3.csv, "resources/Optum_Capability_Model.csv")
        .defer(d3.csv, "resources/UHC_Capability_Model.csv")
        .defer(d3.csv, "resources/UHG_Capability_Model.csv")
        .await(function (error, file1, file2, file3, file4) {
            if (error) {
                console.error('Oh dear, something went wrong: ' + error);
            }
            else {
                var data = [{LevelID: "root", Name: "root"}].concat(file1);
                createTree(file1);
            }
        });


}

function createTree(data) {
    clean_data = [];
    data.forEach(function (d) {
        var index = clean_data.findIndex(function (cd) {
            return d.LevelID == cd.LevelID;
        })

        var parent = clean_data.findIndex(function (cd) {
            return d.LevelID.substr(0, d.LevelID.lastIndexOf(".")) == cd.LevelID;
        })

        if (index < 0 && d.LevelID.indexOf('..') < 0 && parent >= 0) {
            clean_data.push(d)
        }

        if (index >= 0) {
            var tmp = clean_data[index];
            tmp.Collision = true;
            clean_data[index] = tmp;
            d.Collision = true;
            d.LevelID = d.LevelID + "#"
            clean_data.push(d)
        }

        if (d.LevelID.indexOf('..') >= 0) {
            var container = document.getElementById("orphan_data")
            var p = document.createElement("P");
            var t = document.createTextNode("[" + d.LevelID + "] " + d.Name);
            p.appendChild(t);
            container.appendChild(p);
        }
    })

    var root = stratify(clean_data)
    tree(root);
    var link = g.selectAll(".link")
        .data(root.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", function (d) {
            return "M" + d.y + "," + d.x
                + "C" + (d.parent.y + 100) + "," + d.x
                + " " + (d.parent.y + 100) + "," + d.parent.x
                + " " + d.parent.y + "," + d.parent.x;
        });

    var node = g.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", function (d) {
            return "node" + (d.children ? " node--internal" : " node--leaf");
        })
        .style("fill", function (d) {
            return d.data.Collision ? 'red' : '';
        })
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + (d.x) + ")";
        })

    node.append("circle")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", 3)
        .attr("x", function (d) {
            return d.children ? -8 : 8;
        })
        .style("text-anchor", function (d) {
            return d.children ? "end" : "start";
        })
        .text(function (d) {
            return "[" + d.data.LevelID + "] " + d.data.Name;
        });
}