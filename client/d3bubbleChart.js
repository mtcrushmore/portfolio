var d3data = {
      title: 'projection1',
      priority: 10,
      img: 'https://www.ibiblio.org/wm/paint/auth/kandinsky/kandinsky.comp-8.jpg',
      children: [
        {
          title: 'immedia',
          url: 'https://www.immedia.xyz',
          description: 'your real-time encyclopedia',
          img: './assets/immedia.png',
          priority: 1,
        },
        {
          title: 'koupler',
          url: 'https://www.immedia.xyz',
          description: 'a meeting site for couples', 
          img: './assets/koupler.png',
          priority: 1.5,
        },
        {
          title: 'deepspace',
          url: 'https://mtcrushmore.github.io',
          description: 'solar system creator', 
          img: './assets/deepspace.png',
          priority: 2,
        },
        {
          title: 'fudwize',
          url: 'https://fudwize.herokuapp.xyz',
          description: 'connecting foodbanks and restaurants', 
          img: './assets/fudwize.png',
          priority: 1.5,
        },
        {
          title: 'gram',
          url: 'https://github.com/mtcrushmore/gram',
          description: 'real-time whiteboard and chat', 
          img: './assets/gram.png',
          priority: 2.5,
        },
      ]
};

var width = window.innerWidth;

var bubble = d3.layout.pack()
  .sort(null)
  .size([width, width])
  .padding(1.5)

var svg = d3.select('#d3chart').append('svg')
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
  .on('click', function(d) {
    console.log(d);
  })
  .attr({
    class: 'node',
    transform: function(d) { return 'translate(' + d.x + ',' + d.y + ')'; }
  })

node.append('circle')
  .attr('r', function(d) { return 100/d.value; })
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
        x: -70,
        y: -70,
        width: 300,
        height: 300,
      })
      return 'url(#tile-img' + d.title + ')'
  })
  .on('click', function(d) {
    console.log(d);
  })

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










