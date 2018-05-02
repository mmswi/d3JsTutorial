import './index.css';
import * as d3 from "d3";
import 'd3-selection-multi'; // this is used for object attributes
import 'd3-scale';
import 'd3-axis';

/*
*  !!!! IMPORTANT !!!!!
*   DISPLAY SHOWS FROM TOP LEFT TO BOTTOM RIHGHT
*   Y-SCALE: [0, 0] is TOP LEFT
*   Y-SCALE: [height of svg, 0] is BOTTOM LEFT
*   X-SCALE: [0, width of svg] is TOP RIGHT
*   X-SCALE: [width of svg, width of svg] is BOTTOM RIGHT
* */

// Drawing shapes
(function() {
    d3.select(".d3bar1")
        .append("svg")
        .append("rect")
            .attr("width", 50)
            .attr("height", 100)
            .style("fill", "blue");

    d3.select(".d3circle1")
        .append("svg")
        .append("circle")
            .attr("cx", 50)
            .attr("cy", 25)
            .attr("r", 25)
            .style("fill", "blue");

    d3.select(".d3text1")
        .append("svg")
            .attr("width", 250)
            .attr("height", 50)
        .append("text")
            .text("my text val")
            .attr("x", 0)
            .attr("y", 25)
            .style("fill", "red");
})();

// Drawing with data
(function() {
    const w = 300;
    const h = 120;
    const padding = 2;
    const dataset = [5, 10, 15, 20, 25, 11];
    const dataset2 = [5, 10, 15, 20, 25, 11, 22, 24, 7, 18, 6];

    const svg = d3.select(".d3dataDraw1")
        .append("svg")
            .attr("width", w)
            .attr("height", h)

    // creating rect shapes with the data
    svg.selectAll("rect") // aren't any rects on the page, will use enter() to create
        .data(dataset) // this will draw 5 rectangles (5 vals in array)
        .enter()
        .append("rect")
            .attr("x", (d, i) =>i * (w / dataset.length)) //i is the index - using this function to set the
            // spacing of the bars, based on dataset and svg width
            .attr("y", (d) => h-(d*4)) // drawing starts from top left (0) - downwards
            // IMPORTANT! To have everything aligned bottom, you need to position the drawing
            // to the height of the svg minus the actual height of the drawing, so it enters in the view
            .attr("width", w / dataset.length - padding) // can use also just calculus and this applies for all bars
            .attr("height", (d) => d*4) // the height of the drawing is set to the data in the data set
            .style("fill", (d) => "rgb(" + [Math.floor(250-Math.random()*d*5), Math.floor(255-Math.random()*d*10), Math.floor(255-Math.random()*d*10)].join(", ") + ")")

    // using multiple attributes as an object
    const svgtwo = d3.select(".d3dataDrawTwo")
        .append("svg")
        .attrs({
            "width": w,
            "height": h
        });
    svgtwo.selectAll("rect")
        .data(dataset2)
        .enter()
        .append("rect")
        .attrs({
            x: (d, i) =>i * (w / dataset2.length),
            y: (d) => h-(d*4),
            width: w / dataset2.length - padding,
            height: (d) => d*4,
            fill: (d) => "rgb(" + [0 , d*10, 10].join(", ") + ")"
        });
    svgtwo.selectAll("text")
        .data(dataset2)
        .enter()
        .append("text")
        .text((d) => d)
        .attrs({
            "text-anchor": "middle",
            x: (d, i) => (i * w/dataset2.length + (w/dataset2.length - padding) /2),
            y: (d) => h - (d*4)+14,
            fill: "#ffffff"
        })
})();

// building a line chart
(function () {
//    d3dataDrawLineChart1
    const w = 400;
    const h = 350;
    const monthlySales = [
        {"month": 10, "sales": 100},
        {"month": 20, "sales": 130},
        {"month": 30, "sales": 250},
        {"month": 40, "sales": 300},
        {"month": 50, "sales": 265},
        {"month": 60, "sales": 225},
        {"month": 70, "sales": 180},
        {"month": 80, "sales": 120},
        {"month": 90, "sales": 145},
        {"month": 100, "sales": 130}
    ];


    // line functions that will take an array of objects
    const lineFunc = d3.line()
        .x(d=>d.month*3)
        .y(d=>h-d.sales);


    const svg = d3.select(".d3dataDrawLineChart1")
        .append("svg")
        .attrs({
            "width": w,
            "height": h
        });

    // drawing the line
    svg.append("path")
        .attrs({
            d: lineFunc(monthlySales),
            "stroke": "purple",
            "stroke-width": 2,
            "fill": "none"
        })

    // adding labels
    svg.selectAll("text")
        .data(monthlySales)
        .enter()
        .append("text")
        .text(d => d.sales)
        .attrs({
            x: d => d.month*3-25,
            y: d => h-d.sales,
            "font-size": "12px",
            "font-family": "sans-serif",
            "fill": "blue",
            "text-anchor": "start",
            "dy": ".35em",
            "font-weight": (d, i) => i===0 || i===(monthlySales.length-1) ? "bold" : "normal"
        })

})();

// building a scatterplot
(function () {
//    d3dataDrawScatterplot1
    const w = 400;
    const h = 350;
    const monthlySales = [
        {"month": 10, "sales": 100},
        {"month": 20, "sales": 130},
        {"month": 30, "sales": 250},
        {"month": 40, "sales": 300},
        {"month": 50, "sales": 265},
        {"month": 60, "sales": 225},
        {"month": 70, "sales": 180},
        {"month": 80, "sales": 120},
        {"month": 90, "sales": 145},
        {"month": 100, "sales": 130}
    ];

    const svg = d3.select(".d3dataDrawScatterplot1").append("svg").attrs({width: w, height: h});

//    add dots
    svg.selectAll("circle")
        .data(monthlySales)
        .enter()
        .append("circle")
        .attrs({
            cx: (d) => d.month*3,
            cy: (d) => h-d.sales,
            r: 5,
            "fill": (d) => salesKPI(d.sales)
        })

//    adding labels
    svg.selectAll("text")
        .data(monthlySales)
        .enter()
        .append("text")
        .text((d) => showMinMax(monthlySales, 'sales', d.sales, 'minmax')) //minmax or all
        .attrs({
            x: d => d.month*3 - 25,
            y: d => h - d.sales,
            "font-size": "12px",
            "font-family": "sans-serif",
            "fill": "blue",
            "text-anchor": "start",
            "dy": ".35em",
        })

//    KPI color
    function salesKPI(d) {
        return d >= 250 ? "green" : "red"
    }

// returns a min or a max or all values, depending on the type we pass to it
    function showMinMax(dataSet, col, val, type) {
        const max=d3.max(dataSet, (d) => d[col]);
        const min=d3.min(dataSet, (d) => d[col]);
        if(type==='minmax' && (val=== max || val ===min )) {
            return val;
        } else {
            if (type === 'all') {
                return val;
            }
        }
    }

})();

// Working with data from external sources
// Working with data from csv
(async function() {
    const h = 100;
    const w = 400;
    // const ds;
    // For reasons unknown, d3.csv when not finding the file, is returning the index.html line by line
    // Also, that html is the error
    // ms -> monthly sales
    const ms = await d3.csv('./data/03/MonthlySales.csv');

    // builing a line from csv
    buildLineFromCsv(ms, ".d3dataDrawCSV1");

    // building a table and showing totals
    showMetrics(ms, ".d3dataDrawCSV2");

    function buildLineFromCsv(csvData, htmlselector) {
        const lineFunc = d3.line()
            .x(d=>(d.month-20130001)/3.25)
            .y(d=>h-d.sales);

        const svg = d3.select(htmlselector)
            .append("svg")
            .attrs({
                "width": w,
                "height": h
            });
        svg.append("path")
            .attrs({
                d: lineFunc(csvData),
                stroke: "purple",
                "stroke-width": 2,
                "fill": "none"
            });
    }

    function showMetrics(csvData, htmlselector) {
        // creating a table
        const t = d3.select(htmlselector).append("table");

        // get total
        const salesTotal = csvData.reduce((acc, curr)=>{
            // fun fact: multiplying by 1, converts string into number, if string is number
            // ms is an array of objects, and acc will be first returned as 0
            return acc + (curr.sales)*1
        },0);

        const salesAvg = salesTotal / csvData.length;

        const metrics = [];
        metrics.push("Sales Total: " + salesTotal);
        metrics.push("Sales Average: " + salesAvg.toFixed(2));

        // adding the total to the table
        t.selectAll("tr")
            .data(metrics)
            .enter()
            .append("tr")
            .append("td")
            .text((d) => d)
    }

})();

// Working with data from JSON
(async function() {
    const h = 100;
    const w = 400;

    // ms -> monthly sales
    const ms = await d3.json('./data/03/MonthlySales.json');
    const msc = await d3.json('./data/03/MonthlySalesbyCategory.json');

    // builing a line from json
    buildLineFromJSON(ms, ".d3dataDrawJSON1");
    showHeader(msc, ".d3dataDrawJSON2");
    buildLineFromJSON(msc.monthlySales, ".d3dataDrawJSON2");

    function buildLineFromJSON(jsonData, htmlselector) {
        const lineFunc = d3.line()
            .x(d=>(d.month-20130001)/3.25)
            .y(d=>h-d.sales);

        const svg = d3.select(htmlselector)
            .append("svg")
            .attrs({
                "width": w,
                "height": h
            });
        svg.append("path")
            .attrs({
                d: lineFunc(jsonData),
                stroke: "purple",
                "stroke-width": 2,
                "fill": "none"
            });
    }

    function showHeader(jsonData, htmlselector) {
        d3.select(htmlselector).append("h4")
            .text(jsonData.category + " Sales (2013)")
    }

})();

// Working with data from apis
(async function() {
    const h = 100;
    const w = 400;

    // msc -> monthly sales by category
    // getting data from api
    const msc = await d3.json('https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json');
    // using window.atob to decode base64 data
    const decodedData = JSON.parse(window.atob(msc.content));

    // builing a line and showing header for multiple categories
    decodedData.contents.forEach((ds) => {
        showHeader(ds, ".d3apiDrawCSV1");
        buildLineFromJSON(ds.monthlySales, ".d3apiDrawCSV1");
    });

    function buildLineFromJSON(jsonData, htmlselector) {
        const lineFunc = d3.line()
            .x(d=>(d.month-20130001)/3.25)
            .y(d=>h-d.sales);

        const svg = d3.select(htmlselector)
            .append("svg")
            .attrs({
                "width": w,
                "height": h
            });
        svg.append("path")
            .attrs({
                d: lineFunc(jsonData),
                stroke: "purple",
                "stroke-width": 2,
                "fill": "none"
            });
    }

    function showHeader(jsonData, htmlselector) {
        d3.select(htmlselector).append("h4")
            .text(jsonData.category + " Sales (2013)")
    }

})();

// Scaling data
(async function() {
    const h = 100;
    const w = 400;
    const scale = d3.scaleLinear()
        .domain([130, 350]) // the min and the max of a given array of values
        .range([10, 100]); // the range of the display - 350 is equiv to 100 and 130 to 10, in our example
    // values in between the domain ranges, are calculated as a range percentage
    console.log(scale(200));

    // msc -> monthly sales by category
    // getting data from api
    const msc = await d3.json('https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json');
    // using window.atob to decode base64 data
    const decodedData = JSON.parse(window.atob(msc.content));
    console.log(decodedData)
    // builing a line and showing header for multiple categories
    decodedData.contents.forEach((ds) => {
        showHeader(ds, ".d3ScaleData1");
        buildLineFromJSON(ds.monthlySales, ".d3ScaleData1");
    });

    function buildLineFromJSON(jsonData, htmlselector) {
        const minMonth = d3.min(jsonData, d => d.month);
        const maxMonth = d3.max(jsonData, d => d.month);

        const xScale = d3.scaleLinear() // using xScale to show the months
            .domain([minMonth, maxMonth]) // setting min and max from monthlySales
            .range([0, w]); // max range set as svg width

        const yScale = d3.scaleLinear() // using yScale to show the sales
            .domain([
                0,
                d3.max(jsonData, d => d.sales)
            ]) // setting min and max from monthlySales
            .range([h, 0]); // max range set as svg height

        const lineFunc = d3.line()
            .x(d=> {
                return xScale(d.month)
            }) // replaced the functions with scales
            .y(d=>yScale(d.sales));

        const svg = d3.select(htmlselector)
            .append("svg")
            .attrs({
                "width": w,
                "height": h
            });
        svg.append("path")
            .attrs({
                d: lineFunc(jsonData),
                stroke: "purple",
                "stroke-width": 2,
                "fill": "none"
            });
    }

    function showHeader(jsonData, htmlselector) {
        d3.select(htmlselector).append("h4")
            .text(jsonData.category + " Sales (2013)")
    }

})();

// Adding axis
(async function() {
    const h = 100;
    const w = 300;
    const padding = 20;
    const scale = d3.scaleLinear()
        .domain([130, 350]) // the min and the max of a given array of values
        .range([10, 100]); // the range of the display - 350 is equiv to 100 and 130 to 10, in our example
    // values in between the domain ranges, are calculated as a range percentage
    console.log(scale(200));

    // msc -> monthly sales by category
    // getting data from api
    const msc = await d3.json('https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json');
    // using window.atob to decode base64 data
    const decodedData = JSON.parse(window.atob(msc.content));
    console.log(decodedData)
    // builing a line and showing header for multiple categories
    decodedData.contents.forEach((ds) => {
        showHeader(ds, ".d3AxisData1");
        buildLineFromJSON(ds.monthlySales, ".d3AxisData1");
    });

    function buildLineFromJSON(jsonData, htmlselector) {
        const minMonth = d3.min(jsonData, d => d.month);
        const maxMonth = d3.max(jsonData, d => d.month);

        // Note, in our example, the data is sorted properly
        const minDate = getDate(jsonData[0]['month']);
        const maxDate = getDate(jsonData[jsonData.length - 1]['month'])

        const xScale = d3.scaleTime() // using xScale to show the months
            .domain([minDate, maxDate]) // setting min and max from dates
            .range([padding + 5, w - padding]) // max range set as svg width
            .nice();

        const yScale = d3.scaleLinear() // using yScale to show the sales
            .domain([
                0,
                d3.max(jsonData, d => d.sales)
            ]) // setting min and max from monthlySales
            .range([h-10, 0]) // max range set as svg height
            .nice();

        const lineFunc = d3.line()
            .x(d=> {
                return xScale(getDate(d.month))
            }) // replaced the functions with scales
            .y(d=>yScale(d.sales));

        const svg = d3.select(htmlselector)
            .append("svg")
            .attrs({
                "width": w,
                "height": h+padding
            });
        svg.append("path")
            .attrs({
                d: lineFunc(jsonData),
                stroke: "purple",
                "stroke-width": 2,
                "fill": "none"
            });

        // ADDING AXIS
        const yAxisGen = d3.axisLeft().scale(yScale).ticks(4);
        const xAxisGen = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat("%b"));

        const yAxis = svg.append("g").call(yAxisGen)
            .attrs({
                "class": "axis",
                "transform": "translate(" + padding + ", 0)"
            })

        const xAxis = svg.append("g").call(xAxisGen)
            .attrs({
                "class": "axis",
                "transform": "translate(0, " + (h-10) + ")"
            })
    }

    function showHeader(jsonData, htmlselector) {
        d3.select(htmlselector).append("h4")
            .text(jsonData.category + " Sales (2013)")
    }

    function getDate(d) {
        // 20131201
        const strDate = new String(d);
        const year = strDate.substr(0, 4);
        const month = strDate.substr(4, 2) - 1; //zero base index
        const day = strDate.substr(6, 2);

        return new Date(year, month, day);
    }

})();