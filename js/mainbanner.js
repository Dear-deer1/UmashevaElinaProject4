document.addEventListener("DOMContentLoaded", function () {
    const svg = document.getElementById('emotion');

    const points = {
      "ненавижу": { x: 60, y: 250 },
      "я хочу с тобой": { x: 170, y: 380 },
      "люблю тебя!": { x: 260, y: 500 },
      "иди кушать": { x: 420, y: 400 },
      "только не домой": { x: 490, y: 530 },
      "иди #####": { x: 540, y: 320 },
      "прости, пап": { x: 650, y: 240 },
      "жду дома, родная": { x: 760, y: 200 },
      "поправляйся": { x: 840, y: 330 },
      "прощай": { x: 300, y: 180 },
      "останься рядом": { x: 390, y: 120 },
    };
    
    const connections = [
      ["ненавижу", "я хочу с тобой"],
      ["я хочу с тобой", "люблю тебя!"],
      ["люблю тебя!", "иди кушать"],
      ["иди кушать", "иди #####"],
      ["иди #####", "жду дома, родная"],
      ["жду дома, родная", "поправляйся"],
      ["иди #####", "прости, пап"],
      ["прощай", "я хочу с тобой"],
      ["прощай", "останься рядом"],
      ["останься рядом", "только не домой"],
      ["иди #####", "прощай"],
    ];
    
    const pointElements = {};
    const textElements = {};
    const lines = [];
    const state = {};
    
    function randomOffset(max = 50) {
      return (Math.random() - 0.5) * max * 2;
    }
    
    function lerp(a, b, t) {
      return a + (b - a) * t;
    }
    
    for (const [label, { x, y }] of Object.entries(points)) {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("r", 3);
      circle.setAttribute("fill", "white");
      svg.appendChild(circle);
    
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("fill", "white");
      text.setAttribute("font-size", 20);
      text.setAttribute("text-anchor", "middle");
      text.textContent = label;
      svg.appendChild(text);
    
      pointElements[label] = circle;
      textElements[label] = text;
    
      state[label] = {
        baseX: x,
        baseY: y,
        currentX: x,
        currentY: y,
        targetX: x + randomOffset(),
        targetY: y + randomOffset(),
      };
    }
    
    for (const [a, b] of connections) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("stroke", "white");
      line.setAttribute("stroke-width", 1);
      svg.insertBefore(line, svg.firstChild);
      lines.push({ el: line, a, b });
    }
    
    function update() {
      for (const name in state) {
        const p = state[name];
        p.currentX = lerp(p.currentX, p.targetX, 0.05);
        p.currentY = lerp(p.currentY, p.targetY, 0.05);
        const cx = p.currentX;
        const cy = p.currentY;
        pointElements[name].setAttribute("cx", cx);
        pointElements[name].setAttribute("cy", cy);
        textElements[name].setAttribute("x", cx);
        textElements[name].setAttribute("y", cy - 10);
        const dx = Math.abs(cx - p.targetX);
        const dy = Math.abs(cy - p.targetY);
        if (dx < 2 && dy < 2) {
          p.targetX = p.baseX + randomOffset();
          p.targetY = p.baseY + randomOffset();
        }
      }
      for (const line of lines) {
        const a = state[line.a];
        const b = state[line.b];
        line.el.setAttribute("x1", a.currentX);
        line.el.setAttribute("y1", a.currentY);
        line.el.setAttribute("x2", b.currentX);
        line.el.setAttribute("y2", b.currentY);
      }
      requestAnimationFrame(update);
    }
    
    update();

})