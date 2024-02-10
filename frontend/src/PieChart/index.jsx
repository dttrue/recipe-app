import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const PieChart = () => {
    const [data, setData] = useState([]);
    const svgRef = useRef();

    // Function to process the data
    const processData = (data) => {
        const counts = { Breakfast: 0, Lunch: 0, Dinner: 0, Dessert: 0, Other: 0 };
        data.forEach(dish => {
            if (Object.prototype.hasOwnProperty.call(counts, dish.category)) {
                counts[dish.category] += 1;
            } else {
                counts["Other"] += 1;
            }
        });
        return Object.entries(counts).map(([category, count]) => ({ category, count }));
    };

    useEffect(() => {
        // Fetch data from API
        axios.get("http://localhost:1111/api/recipes")
            .then(response => {
                setData(processData(response.data.data));
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        if (data.length === 0) return;

        const svg = d3.select(svgRef.current);
        const w = 500;
        const h = 500;
        const radius = Math.min(w, h) / 2;

        const pie = d3.pie().value(d => d.count);
        const arc = d3.arc().innerRadius(0).outerRadius(radius);

     

        // Clear previous chart
        svg.attr('width', w).attr('height', h).selectAll("*").remove();

        // Append pie chart segments
        const arcs = svg.append('g')
            .attr('transform', `translate(${w / 2}, ${h / 2})`)
            .selectAll("path")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", d => {
                switch (d.data.category) {
                    case "Breakfast": return "red";
                    case "Lunch": return "green";
                    case "Dinner": return "blue";
                    case "Dessert": return "orange";
                    default: return "purple";
                }
            });
        arcs.nodes()
        // Append labels
        const labelArc = d3.arc().innerRadius(radius - 80).outerRadius(radius);
        svg.append('g')
            .attr('transform', `translate(${w / 2}, ${h / 2})`)
            .selectAll('text')
            .data(pie(data))
            .enter()
            .append('text')
            .attr("transform", d => {
                const centroid = labelArc.centroid(d);

                return `translate(${centroid})`;
            })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(d => {

                return `${d.data.category}: ${d.data.count}`;
            })
            .style("fill", "white")
            .style("font-size", "14px")
            .style("font-family", "Arial, sans-serif")
            .style("font-weight", "bold")
            .style("text-shadow", "2px 2px 4px rgba(0, 0, 0, 0.5)")
            .style("background-color", "rgba(0, 0, 0, 0.5)")
            .style("padding", "5px")

    }, [data]);
    return (
        <svg ref={svgRef}></svg>
    );
}

export default PieChart;
