const canvasSize = { width: 628, height: 500 };

const waterColor = "#e4f1f7";
const landColor = "#969696";

const segments = {
  R: {
    name: "Richmond Line",
    stations: ["rich", "deln", "plza", "nbrk", "dbrk", "ashb"],
    connections: { K: "mcar" },
  },
  C: {
    name: "Concord Line",
    stations: ["pitt", "ncon", "conc", "phil", "wcrk", "lafy", "orin", "rock"],
    connections: { K: "mcar", eBART: "pctr" },
  },
  eBART: {
    name: "eBART Line",
    stations: ["antc", "pctr"],
    connections: { C: "pitt" },
  },
  K: {
    name: "Downtown Oakland Line",
    stations: ["mcar", "19th", "12th"],
    connections: { R: "ashb", C: "rock", M: "woak", AL: "lake" },
  },
  AL: {
    name: "Alameda/Livermore Interline",
    stations: ["lake", "ftvl", "cols", "sanl", "bayf"],
    connections: { K: "12th", M: "woak", A: "hayw", L: "cast", O: "oakl" },
  },
  A: {
    name: "Alameda Line",
    stations: ["hayw", "shay", "ucty", "frmt", "warm", "mlpt", "bery"],
    connections: { AL: "bayf" },
  },
  L: {
    name: "Livermore Line",
    stations: ["cast", "wdub", "dubl"],
    connections: { AL: "bayf" },
  },
  M: {
    name: "Market/Mission Line",
    stations: ["woak", "embr", "mont", "powl", "civc", "16th", "24th", "glen", "balb", "daly"],
    connections: { K: "12th", AL: "lake", SM: "colm" },
  },
  SM: {
    name: "San Mateo Line",
    stations: ["colm", "ssan", "sbrn"],
    connections: { M: "daly" },
  },
  SFO: {
    name: "SFO Line",
    stations: ["sfia"],
    connections: { SM: "sbrn", MLBR: "mlbr" },
  },
  MLBR: {
    name: "Millbrae Line",
    stations: ["mlbr"],
    connections: { SM: "sbrn", SFO: "sfia" },
  },
  OAK: {
    name: "OAK Airtrain",
    stations: ["oakl"],
    connections: { AL: "cols" },
  },
};

const lines = [{
  color: "Orange",
  segments: ["R", "K", "AL", "A"],
}, {
  color: "Yellow",
  segments: ["C", "eBART", "K", "M", "SM", "SFO"],
}, {
  color: "Blue",
  segments: ["M", "AL", "L"],
}, {
  color: "Red",
  segments: ["R", "K", "M", "SM", "MLBR"],
}, {
  color: "Green",
  segments: ["M", "AL", "A"],
}, {
  color: "Beige",
  segments: ["OAK"],
}];

const landforms = [{
  name: "bay area",
  color: waterColor,
  path: [
    { x: .085, y: .000 },
    { x: .085, y: .111 },
    { x: .154, y: .201 },
    { x: .154, y: .233 },
    { x: .184, y: .278 },
    { x: .153, y: .325 },
    { x: .086, y: .325 },
    { x: .041, y: .272 },
    { x: .016, y: .272 },
    { x: .000, y: .251 },
    { x: .000, y: 1.00 },
    { x: .171, y: 1.00 },
    { x: .171, y: .946 },
    { x: .123, y: .887 },
    { x: .123, y: .817 },
    { x: .075, y: .757 },
    { x: .075, y: .521 },
    { x: .084, y: .503 },
    { x: .084, y: .415 },
    { x: .125, y: .369 },
    { x: .161, y: .369 },
    { x: .179, y: .378 },
    { x: .244, y: .378 },
    { x: .322, y: .482 },
    { x: .322, y: .599 },
    { x: .347, y: .633 },
    { x: .347, y: .767 },
    { x: .382, y: .767 },
    { x: .404, y: .797 },
    { x: .424, y: .797 },
    { x: .495, y: .880 },
    { x: .561, y: .880 },
    { x: .585, y: .854 },
    { x: .585, y: .826 },
    { x: .510, y: .731 },
    { x: .510, y: .650 },
    { x: .483, y: .617 },
    { x: .458, y: .638 },
    { x: .416, y: .587 },
    { x: .416, y: .526 },
    { x: .385, y: .487 },
    { x: .361, y: .487 },
    { x: .361, y: .411 },
    { x: .369, y: .398 },
    { x: .369, y: .354 },
    { x: .235, y: .186 },
    { x: .217, y: .186 },
    { x: .191, y: .146 },
    { x: .244, y: .074 },
    { x: .244, y: .000 },
  ],
}, {
  name: "alameda",
  color: landColor,
  path: [
    { x: .373, y: .495 },
    { x: .384, y: .495 },
    { x: .411, y: .527 },
    { x: .411, y: .542 },
    { x: .401, y: .542 },
    { x: .373, y: .507 },
  ],
}];

const stations = {
  ["12th"]: {
    name: "12th St. Oakland City Center",
    links: [
      { station: "19th", time: 0, distance: 0 },
      { station: "woak", time: 0, distance: 0 },
      { station: "lake", time: 0, distance: 0 },
    ],
    location: { x: .401, y: .400 },
  },
  ["16th"]: {
    name: "16th St. Mission",
    links: [
      { station: "civc", time: 0, distance: 0 },
      { station: "24th", time: 0, distance: 0 },
    ],
    location: { x: .218, y: .568 },
  },
  ["19th"]: {
    name: "19th St. Oakland",
    links: [
      { station: "12th", time: 0, distance: 0 },
      { station: "mcar", time: 0, distance: 0 },
    ],
    location: { x: .401, y: .369 },
  },
  ["24th"]: {
    name: "24th St. Mission",
    links: [
      { station: "16th", time: 0, distance: 0 },
      { station: "glen", time: 0, distance: 0 },
    ],
    location: { x: .218, y: .594 },
  },
  antc: {
    name: "Antioch",
    links: [
      { station: "pctr", time: 0, distance: 0 },
    ],
    location: { x: .764, y: .119 },
  },
  ashb: {
    name: "Ashby",
    links: [
      { station: "mcar", time: 0, distance: 0 },
      { station: "dbrk", time: 0, distance: 0 },
    ],
    location: { x: .371, y: .281 },
  },
  balb: {
    name: "Balboa Park",
    links: [
      { station: "glen", time: 0, distance: 0 },
      { station: "daly", time: 0, distance: 0 },
    ],
    location: { x: .218, y: .649 },
  },
  bayf: {
    name: "Bay Fair",
    links: [
      { station: "cast", time: 0, distance: 0 },
      { station: "sanl", time: 0, distance: 0 },
      { station: "hayw", time: 0, distance: 0 },
    ],
    location: { x: .520, y: .591 },
  },
  bery: {
    name: "Berryessa / North San José",
    links: [
      { station: "mlpt", time: 0, distance: 0 },
    ],
    location: { x: .689, y: .912 },
  },
  cast: {
    name: "Castro Valley",
    links: [
      { station: "bayf", time: 0, distance: 0 },
      { station: "wdub", time: 0, distance: 0 },
    ],
    location: { x: .620, y: .606 },
  },
  civc: {
    name: "Civic Center / UN Plaza",
    links: [
      { station: "powl", time: 0, distance: 0 },
      { station: "16th", time: 0, distance: 0 },
    ],
    location: { x: .235, y: .518 },
  },
  cols: {
    name: "Coliseum",
    links: [
      { station: "ftvl", time: 0, distance: 0 },
      { station: "sanl", time: 0, distance: 0 },
      { station: "oakl", time: 0, distance: 0 },
    ],
    location: { x: .473, y: .531 },
  },
  colm: {
    name: "Colma",
    links: [
      { station: "daly", time: 0, distance: 0 },
      { station: "ssan", time: 0, distance: 0 },
    ],
    location: { x: .257, y: .729 },
  },
  conc: {
    name: "Concord",
    links: [
      { station: "ncon", time: 0, distance: 0 },
      { station: "phil", time: 0, distance: 0 },
    ],
    location: { x: .542, y: .145 },
  },
  daly: {
    name: "Daly City",
    links: [
      { station: "balb", time: 0, distance: 0 },
      { station: "colm", time: 0, distance: 0 },
    ],
    location: { x: .235, y: .701 },
  },
  dbrk: {
    name: "Downtown Berkeley",
    links: [
      { station: "ashb", time: 0, distance: 0 },
      { station: "nbrk", time: 0, distance: 0 },
    ],
    location: { x: .351, y: .251 },
  },
  dubl: {
    name: "Dublin / Pleasanton",
    links: [
      { station: "wdub", time: 0, distance: 0 },
    ],
    location: { x: .769, y: .606 },
  },
  deln: {
    name: "El Cerrito del Norte",
    links: [
      { station: "rich", time: 0, distance: 0 },
      { station: "plza", time: 0, distance: 0 },
    ],
    location: { x: .285, y: .174 },
  },
  plza: {
    name: "El Cerrito Plaza",
    links: [
      { station: "deln", time: 0, distance: 0 },
      { station: "nbrk", time: 0, distance: 0 },
    ],
    location: { x: .308, y: .201 },
  },
  embr: {
    name: "Embarcadero",
    links: [
      { station: "woak", time: 0, distance: 0 },
      { station: "mont", time: 0, distance: 0 },
    ],
    location: { x: .280, y: .458 },
  },
  frmt: {
    name: "Fremont",
    links: [
      { station: "ucty", time: 0, distance: 0 },
      { station: "warm", time: 0, distance: 0 },
    ],
    location: { x: .665, y: .771 },
  },
  ftvl: {
    name: "Fruitvale",
    links: [
      { station: "lake", time: 0, distance: 0 },
      { station: "cols", time: 0, distance: 0 },
    ],
    location: { x: .449, y: .503 },
  },
  glen: {
    name: "Glen Park",
    links: [
      { station: "24th", time: 0, distance: 0 },
      { station: "balb", time: 0, distance: 0 },
    ],
    location: { x: .218, y: .623 },
  },
  hayw: {
    name: "Hayward",
    links: [
      { station: "bayf", time: 0, distance: 0 },
      { station: "shay", time: 0, distance: 0 },
    ],
    location: { x: .565, y: .647 },
  },
  lafy: {
    name: "Lafayette",
    links: [
      { station: "orin", time: 0, distance: 0 },
      { station: "wcrk", time: 0, distance: 0 },
    ],
    location: { x: .476, y: .226 },
  },
  lake: {
    name: "Lake Merritt",
    links: [
      { station: "12th", time: 0, distance: 0 },
      { station: "woak", time: 0, distance: 0 },
      { station: "ftvl", time: 0, distance: 0 },
    ],
    location: { x: .425, y: .472 },
  },
  mcar: {
    name: "MacArthur",
    links: [
      { station: "ashb", time: 0, distance: 0 },
      { station: "rock", time: 0, distance: 0 },
      { station: "19th", time: 0, distance: 0 },
    ],
    location: { x: .401, y: .338 },
  },
  mlbr: {
    name: "Millbrae",
    links: [
      { station: "sbrn", time: 0, distance: 0 },
      { station: "sfia", time: 0, distance: 0 },
    ],
    location: { x: .327, y: .822 },
  },
  mlpt: {
    name: "Milpitas",
    links: [
      { station: "warm", time: 0, distance: 0 },
      { station: "bery", time: 0, distance: 0 },
    ],
    location: { x: .689, y: .870 },
  },
  mont: {
    name: "Montgomery St.",
    links: [
      { station: "embr", time: 0, distance: 0 },
      { station: "powl", time: 0, distance: 0 },
    ],
    location: { x: .266, y: .478 },
  },
  nbrk: {
    name: "North Berkeley",
    links: [
      { station: "dbrk", time: 0, distance: 0 },
      { station: "plza", time: 0, distance: 0 },
    ],
    location: { x: .332, y: .225 },
  },
  ncon: {
    name: "North Concord / Martinez",
    links: [
      { station: "pitt", time: 0, distance: 0 },
      { station: "conc", time: 0, distance: 0 },
    ],
    location: { x: .585, y: .119 },
  },
  oakl: {
    name: "Oakland International Airport",
    links: [
      { station: "cols", time: 0, distance: 0 },
    ],
    location: { x: .457, y: .605 },
  },
  orin: {
    name: "Orinda",
    links: [
      { station: "rock", time: 0, distance: 0 },
      { station: "lafy", time: 0, distance: 0 },
    ],
    location: { x: .455, y: .249 },
  },
  pitt: {
    name: "Pittsburg / Bay Point",
    links: [
      { station: "pctr", time: 0, distance: 0 },
      { station: "ncon", time: 0, distance: 0 },
    ],
    location: { x: .648, y: .119 },
  },
  pctr: {
    name: "Pittsburg Center",
    links: [
      { station: "pitt", time: 0, distance: 0 },
      { station: "antc", time: 0, distance: 0 },
    ],
    location: { x: .713, y: .119 },
  },
  phil: {
    name: "Pleasant Hill / Contra Costa Centre",
    links: [
      { station: "conc", time: 0, distance: 0 },
      { station: "wcrk", time: 0, distance: 0 },
    ],
    location: { x: .520, y: .171 },
  },
  powl: {
    name: "Powell St.",
    links: [
      { station: "mont", time: 0, distance: 0 },
      { station: "civc", time: 0, distance: 0 },
    ],
    location: { x: .250, y: .496 },
  },
  rich: {
    name: "Richmond",
    links: [
      { station: "deln", time: 0, distance: 0 },
    ],
    location: { x: .269, y: .142 },
  },
  rock: {
    name: "Rockridge",
    links: [
      { station: "orin", time: 0, distance: 0 },
      { station: "mcar", time: 0, distance: 0 },
    ],
    location: { x: .432, y: .279 },
  },
  sbrn: {
    name: "San Bruno",
    links: [
      { station: "ssan", time: 0, distance: 0 },
      { station: "sfia", time: 0, distance: 0 },
      { station: "mlbr", time: 0, distance: 0 },
    ],
    location: { x: .297, y: .789 },
  },
  sfia: {
    name: "San Francisco International Airport",
    links: [
      { station: "mlbr", time: 0, distance: 0 },
      { station: "sbrn", time: 0, distance: 0 },
    ],
    location: { x: .362, y: .798 },
  },
  sanl: {
    name: "San Leandro",
    links: [
      { station: "bayf", time: 0, distance: 0 },
      { station: "cols", time: 0, distance: 0 },
    ],
    location: { x: .496, y: .561 },
  },
  shay: {
    name: "South Hayward",
    links: [
      { station: "hayw", time: 0, distance: 0 },
      { station: "ucty", time: 0, distance: 0 },
    ],
    location: { x: .596, y: .689 },
  },
  ssan: {
    name: "South San Francisco",
    links: [
      { station: "sbrn", time: 0, distance: 0 },
      { station: "colm", time: 0, distance: 0 },
    ],
    location: { x: .279, y: .755 },
  },
  ucty: {
    name: "Union City",
    links: [
      { station: "shay", time: 0, distance: 0 },
      { station: "frmt", time: 0, distance: 0 },
    ],
    location: { x: .631, y: .729 },
  },
  wcrk: {
    name: "Walnut Creek",
    links: [
      { station: "phil", time: 0, distance: 0 },
      { station: "lafy", time: 0, distance: 0 },
    ],
    location: { x: .496, y: .199 },
  },
  warm: {
    name: "Warm Springs",
    links: [
      { station: "mlpt", time: 0, distance: 0 },
      { station: "frmt", time: 0, distance: 0 },
    ],
    location: { x: .689, y: .831 },
  },
  wdub: {
    name: "West Dublin / Pleasanton",
    links: [
      { station: "dubl", time: 0, distance: 0 },
      { station: "cast", time: 0, distance: 0 },
    ],
    location: { x: .708, y: .606 },
  },
  woak: {
    name: "West Oakland",
    links: [
      { station: "12th", time: 0, distance: 0 },
      { station: "lake", time: 0, distance: 0 },
      { station: "embr", time: 0, distance: 0 },
    ],
    location: { x: .370, y: .439 },
  },
};

function dataCheck() {
  for (const [code, { name, links }] of Object.entries(stations)) {
    links.forEach(link => {
      const outbound = link.station;
      
      if(!stations[outbound]) {
        // bad outbound link
        console.log(`${name} (${code}) has invalid link to "${outbound}"`);
      } else {
        // verify inbound link
        const other = stations[outbound];
        
        let foundLink = false;
        other.links.forEach(inlink => {
          if(inlink.station === code) {
            foundLink |= true;
            
            // can only check time and distance matching if we have both ends
            if(inlink.time !== link.time) {
              console.log(`${name} and ${other.name} disagree on time: ${inlink.time} v ${link.time}`);
            }
            
            if(inlink.distance !== link.distance) {
              console.log(`${name} and ${other.name} disagree on distance: ${inlink.distance} v ${link.distance}`);
            }
          }
        });
        
        if(!foundLink) {
          // didn't find inbound link
          console.log(`${other.name} has invalid backlink to ${code}`);
        }
      }
    });
  }
}

const convertPoint = ({ x, y }) => {
  return {
    x: Math.round(x * canvasSize.width), 
    y: Math.round(y * canvasSize.height),
  };
};

const drawMap = (map, state) => {
  const context = map.getContext("2d");
  
  // clear all previous drawing
  context.clearRect(0, 0, canvasSize.width, canvasSize.height);
  
  // draw background
  landforms.forEach(({ color, path }) => {
    context.beginPath();
    context.fillStyle = color;
    context.lineWidth = 0;
    
    // start at the last point
    const startPoint = convertPoint(path[path.length-1]);
    context.moveTo(startPoint.x, startPoint.y);
    
    path.forEach(point => {
      const {x, y} = convertPoint(point);
      
      context.lineTo(x, y);
    });
    
    context.fill();
    context.closePath();
  });
  
  // draw station circles
  // if no selected segment, highlight nothing
  const highlightStations = segments[state.selectedSegment]?.stations ?? [];
  
  Object.entries(stations).forEach(([code, station]) => {
    const {x, y} = convertPoint(station.location);
    
    context.beginPath();
    
    if(highlightStations.includes(code)) {
      context.fillStyle = "cornflowerblue";
      context.strokeStyle = "black";
      
      context.lineWidth = 2;
    } else {
      context.fillStyle = "white";
      context.strokeStyle = "black";
      
      context.lineWidth = 1;
    }
    
    context.ellipse(x, y, 5, 5, 0, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    
    context.lineWidth = 1;
    context.font = "11px sans-serif";
    context.strokeText(code, x + 10, y + 4)
  });
  context.closePath();
};

const buildTable = (linesArea, state, repaint) => {
  // build column groups
  const colgroup = linesArea.querySelectorAll("table colgroup")[0];
  
  // two unused header groups to start (these are the index and line color)
  colgroup.append(document.createElement("col"));
  colgroup.append(document.createElement("col"));
  
  // and one group for each of the segments
  // keep a reference to these for later lookup
  const colgroups = {};
  Object.keys(segments).forEach(key => {
    const column = document.createElement("col");
    column.id = key;
    colgroup.append(column);
    
    colgroups[key] = column;
  });
  
  // build headers
  const thead = linesArea.querySelectorAll("table thead")[0];
  
  // top header; mostly static, but with the "line segments" colspan
  const topHeader = document.createElement("tr");
  {
    // in a block for scoping convenience
    
    let header = document.createElement("th");
    header.rowSpan = 2;
    topHeader.append(header);
    
    header = document.createElement("th");
    header.rowSpan = 2;
    header.textContent = "Line Color";
    topHeader.append(header);
    
    header = document.createElement("th");
    header.colSpan = Object.keys(segments).length;
    header.style = "background: white;";
    header.textContent = "Line Segments";
    topHeader.append(header);
  }
  thead.append(topHeader);

  // subheader, one for each segment
  const subheader = document.createElement("tr");
  
  Object.entries(segments).forEach(([key, { name }]) => {
    const anchor = document.createElement("a");
    anchor.textContent = key;
    anchor.title = name;
    
    const header = document.createElement("th");
    header.style = "font-size: .7em; width: 60px;";
    header.append(anchor);
    
    const colgroup = colgroups[key];
    
    header.onmouseover = event => {
      colgroup.className = "selectedColumn";
      header.className = "selectedColumn";
      
      state.selectedSegment = key;
      
      repaint();
    };
    
    header.onmouseout = event => {
      colgroup.className = "";
      header.className = "";
      
      state.selectedSegment = undefined;
      
      repaint();
    };
    
    subheader.append(header);
  });
  
  thead.append(subheader);
  
  // lines in table body
  const tableBody = linesArea.querySelectorAll("table tbody")[0];
  
  lines.forEach((line, index) => {    
    const row = document.createElement("tr");
    
    const sequence = document.createElement("td");
    sequence.append(`${index+1}`);
    row.append(sequence);
    
    const color = document.createElement("td");
    color.append(line.color);
    row.append(color);
    
    Object.keys(segments).forEach(segment => {
      const hasSegment = document.createElement("td");
      
      if(line.segments.includes(segment)) {
        hasSegment.append("Y");
      }
      
      row.append(hasSegment);
    });
    
    tableBody.append(row);
  });
};

function main() {
  const state = {
    selectedSegment: undefined,
  };
  
  const map = document.getElementById("bartmap");
  map.width = canvasSize.width;
  map.height = canvasSize.height;
  
  const repaint = () => {
    drawMap(map, state);
  };
  
  const linesArea = document.getElementById("lines");
  buildTable(linesArea, state, repaint);
  
  // draw in canvas
  repaint();
}

dataCheck();
main();
