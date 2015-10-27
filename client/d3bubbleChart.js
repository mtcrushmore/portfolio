
var d3data = {
      title: 'projection1',
      priority: 10,
      img: 'https://www.ibiblio.org/wm/paint/auth/kandinsky/kandinsky.comp-8.jpg',
      children: [
        {
          title: 'about',
          url: 'https://www.immedia.xyz',
          description: 'a meeting site for couples', 
          img: './assets/background2.jpg',
          priority: 2,
        },
        {
          title: 'contact',
          url: 'https://mtcrushmore.github.io',
          description: 'solar system creator', 
          img: './assets/background2.jpg',
          priority: 1.5,
        },
        {
          title: 'projects',
          url: 'https://www.immedia.xyz',
          description: 'your real-time encyclopedia',
          img: './assets/background2.jpg',
          priority: 1,
        },
      ]
};

var width = window.innerWidth/1.2;

var bubble = d3.layout.pack()
  .sort(null)
  .size([width/1.5, width/1.5])
  .padding(1.5)

var svg = d3.select('#d3bubbleChart').append('svg')
  .attr({
    height: width,
    width: width,
    class: 'bubble'
  })

var defs = svg.append('svg:defs');

var node = svg.selectAll('.node')
  .data(bubble.nodes(classes(d3data))
    .filter(function(d) { return !d.children; }))
  .enter().append('g')
  .attr({
    class: 'node',
    transform: function(d) { return 'translate(' + d.x + ',' + d.y + ')'; }
  })


node.append('circle')
  .attr('r', function(d) { return 130/d.value; })
  .style('fill', function(d) {
    defs.append('svg:pattern')
      .attr('id', 'tile-img' + d.title)
      .attr('width', '20')
      .attr('height', '20')
      .append('svg:image')
      .attr('xlink:href', function() {
        if (d.img) { return d.img; }
      })
      .attr({
        x: 0,
        y: -50,
        width: 400,
        height: 400,
      })
      return 'url(#tile-img' + d.title + ')'
  })
  // .on('mouseover', function(d) {
  //   var line = d3.svg.line()
  //     .x(function(d) { return d.x})
  //     .y(function(d) { return d.y})
  //     .interpolate('linear')
  //   svg.append('path')
  //     .transition()
  //     .duration(500)
  //     .delay(200)
  //     .attr('d', line([ { 'x' : d.x, 'y' : d.y }, { 'x' : d.x + 100, 'y' : d.y - 100 } ]))
  //     .attr('stroke', 'white')
  //     .attr('stroke-width', 2)
  //     .style('stroke-dasharray', ('3, 3'))
  // })
  // .on('mouseout', function(d) {
  //   d3.selectAll('path').remove();
  // })
  .on('click', function(d) {
    element = document.getElementById(d.title)
    alignWithTop = true;
    element.scrollIntoView(alignWithTop);
  })
  
node.append('text')
  .attr({
    class: 'text',
    class: 'nodeText'
  })
  .attr({
    x: function(d) { return -20 },
    y: function(d) { return + (150/d.value) + 20 }, 
    stroke: 'white',
  })
  .text(function(d) { return d.title })


function classes(root) {
  var classes = [];
  function recurse(name, node) {
    if (node.children) { 
      node.children.forEach(function(child) { 
        recurse(node.title, child);
      }
    )} else {
        classes.push({
          title: node.title, 
          url: node.url,
          description: node.description,
          img: node.img, 
          value: node.priority,
      })
    }
  }
  recurse (null, root);
  return {children: classes};
}










