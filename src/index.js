import './index.css';
import * as d3 from "d3";

d3.select(".d3bar")
    .append("svg")
    .append("rect")
    .attr("width", 50)
    .attr("height", 100)
    .style("fill", "blue");