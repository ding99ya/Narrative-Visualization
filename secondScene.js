async function init() {
    data = await d3.csv("https://flunky.github.io/cars2017.csv");
    firstData = data.filter(function(d) {
        if (d["EngineCylinders"] <= 4) {
            return d;
        }
    })
    secondData = data.filter(function(d) {
    if (d["EngineCylinders"] > 4 && d["EngineCylinders"] <= 8) {
        return d;
    }
    })

    xs = d3.scaleLog().domain([10,150]).range([0,200]);
    ys = d3.scaleLog().domain([10,150]).range([200,0]);

    var tooltip = d3.select("#tooltip");

    d3.select('svg')
    .append("g")
    .attr("transform","translate("+50+","+50+")") 
    .selectAll('circle')
    .data(firstData)
    .enter()
    .append('circle')
    .attr('cx',function(d,i) {return xs(d.AverageCityMPG);})
    .attr('cy',function(d,i) {return ys(d.AverageHighwayMPG);})
    .attr('r',3)
    .style("fill", function(d,i){return "lightblue"})
    .on("mouseover", function(d,i) {
        tooltip.style("opacity", 1)
            .style("left", (d3.event.pageX)+"px")
            .style("top", (d3.event.pageY)+"px")
            .html("Cylinders: "+d.EngineCylinders+"<br>"+"AverageCityMPG: "+d.AverageCityMPG+"<br>"+"AverageHighwayMPG: "+d.AverageHighwayMPG)
    })
    .on("mouseout", function() {
        tooltip.style("opacity", 0)
    })

    d3.select('svg')
    .append("g")
    .attr("transform","translate("+50+","+50+")") 
    .selectAll('circle')
    .data(secondData)
    .enter()
    .append('circle')
    .attr('cx',function(d,i) {return xs(d.AverageCityMPG);})
    .attr('cy',function(d,i) {return ys(d.AverageHighwayMPG);})
    .attr('r',3)
    .style("fill", function(d,i){return "yellow"})
    .on("mouseover", function(d,i) {
        tooltip.style("opacity", 1)
            .style("left", (d3.event.pageX)+"px")
            .style("top", (d3.event.pageY)+"px")
            .html("Cylinders: "+d.EngineCylinders+"<br>"+"AverageCityMPG: "+d.AverageCityMPG+"<br>"+"AverageHighwayMPG: "+d.AverageHighwayMPG)
    })
    .on("mouseout", function() {
        tooltip.style("opacity", 0)
    })

    d3.select('svg')
    .append("g")
    .attr("transform","translate("+50+","+50+")")
    .call(d3.axisLeft(ys)
    .tickValues([10,20,50,100])
    .tickFormat(d3.format("~s")));

    d3.select('svg')
    .append("g")
    .attr("transform","translate("+50+","+250+")")
    .call(d3.axisBottom(xs)
    .tickValues([10,20,50,100])
    .tickFormat(d3.format("~s")));
}

