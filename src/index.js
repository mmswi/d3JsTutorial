import './index.css';
import * as d3 from "d3";

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