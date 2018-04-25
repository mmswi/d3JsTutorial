import './index.css';
import * as d3 from "d3";
import 'd3-selection-multi'; // this is used for object attributes

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
    const w = 200;
    const h = 100;
    const padding = 2;
    const dataset = [5, 10, 15, 20, 25];

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
        .data(dataset)
        .enter()
        .append("rect")
        .attrs({
            x: (d, i) =>i * (w / dataset.length),
            y: (d) => h-(d*4),
            width: w / dataset.length - padding,
            height: (d) => d*4,
            fill: (d) => "rgb(" + [0 , d*10, 10].join(", ") + ")"
        });

})();