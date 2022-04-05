var d3 = Object.assign({}, require('d3-selection'));

var opts = {
    width: 600,
    height: 120,
    margins: { top: 0, right: 0, bottom: 0, left: 0 }
};

function commaValue(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function tbl(value, coinValue, id) {
    // console.log(value, coinValue, id, payVersion)
    var sf = 0.7; //scale factor
    /* 
        var chartW = Math.max(opts.width - opts.margins.left - opts.margins.right, 0.1);
        var chartH = Math.max(opts.height - opts.margins.top - opts.margins.bottom, 0.1); */

    var parentDiv = d3.select('#' + id).html('');

    var svg = parentDiv.append('svg').attr('width', '100%').attr("viewBox", "0 0 " + opts.width + ' ' + opts.height)
        .attr("preserveAspectRatio", "xMinYMin meet");

    /*     svg.append('g').append('text')
            .attr('class', 'payTableText')
            .attr('font-size', 22 * sf)
            .attr('y', 90)
            .attr('x', 10)
            .text('*Discard Bonus (3-Card Hand)'); */

    var visSvg = svg.append('g').attr('class', 'vis-group');

    /*     var colSpecs = [
            {
                xShift: 4,
                filterData: function (v, i) {
                    return i >= 8;
                }
            },
            {
                xShift: 204,
                filterData: function (v, i) {
                    return i >= 4 && i < 8;
                }
            },
            {
                xShift: 404,
                filterData: function (v, i) {
                    return i < 4;
                }
            },
        ] */

    var colSpecs = [{
            xShift: 4,
            filterData: function(v, i) {
                return i >= 6;

            }
        },
        {
            xShift: 204,
            filterData: function(v, i) {
                return i >= 3 && i < 6;
            }
        },
        {
            xShift: 404,
            filterData: function(v, i) {
                return i < 3;
            }
        },
    ]



    colSpecs.forEach((c) => {

        var col = visSvg.selectAll('g.row1')
            .data(value.filter(c.filterData));

        col.enter().append('rect')
            .attr('class', 'cell row')
            .attr('width', 195)
            .attr('height', 30 * sf)
            .attr('x', c.xShift)
            .attr('rx', 10)
            .attr('ry', 10)
            .attr('y', (y, j) => {
                return (((33 * j) + 1) * sf);
            })
            .style('fill', (c) => {
                return c.clr;
            })
            .style('stroke', 'silver')
            .style('stroke-width', '1px')
            .style('opacity', 1)
            .attr('id', 'rsltRow');

        col.enter().append('text')
            .attr('y', (y, j) => {
                return ((33 * (j + 1) - 10) * sf)
            })
            .attr('x', c.xShift + 5)
            .attr('class', 'payTableText')
            .attr('font-size', 14)
            .text((d) => {
                return d.text
            });

        col.enter().append('text')
            .attr('y', (y, i) => {
                return ((33 * (i + 1) - 9) * sf)
            })
            .attr('x', c.xShift + 190)
            .attr('class', 'payTableText')
            .attr('font-size', 18)
            .attr('text-anchor', 'end')
            .text((d) => {
                return '$' + commaValue(d.reward * coinValue)
            });
    });
}




export { tbl as default }