import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { X, TrendingUp, AlertCircle } from 'lucide-react';
import Card from './ui/Card';

interface GraphVisualizationProps {
  className?: string;
  nodeCount?: number;
}

interface NodeData {
  id: number;
  x: number;
  y: number;
  z: number;
  group: number; // 1, 2, 3
  radius: number;
  name: string;
  mastery: number; // 0-100
  trend: 'up' | 'flat' | 'down';
  projectedX?: number;
  projectedY?: number;
  projectedZ?: number;
  projectedScale?: number;
}

interface LinkData {
  source: number;
  target: number;
}

// Mock Data for Skills
const SKILLS = {
  1: ["Linear Algebra", "Calculus II", "Physics Mechanics", "Organic Chemistry", "World History", "English Lit", "Macroeconomics", "Biology", "Geometry", "Statistics"],
  2: ["Deductive Reasoning", "Pattern Recognition", "Abstract Thinking", "Synthesis", "Problem Decomposition", "Causal Inference", "Spatial Reasoning", "Critical Analysis"],
  3: ["Resilience", "Growth Mindset", "Focus", "Collaboration", "Curiosity", "Self-Regulation", "Persistence", "Adaptability"]
};

const COLORS = {
  1: "#3B82F6", // Blue
  2: "#06B6D4", // Cyan
  3: "#10B981"  // Green
};

const GraphVisualization: React.FC<GraphVisualizationProps> = ({ className = '', nodeCount = 50 }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Generate stable random data
  const data = useMemo(() => {
    const nodes: NodeData[] = [];
    const links: LinkData[] = [];

    // Generate Nodes in a 3D sphere distribution
    for (let i = 0; i < nodeCount; i++) {
      // Spherical coordinates
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      
      const r = 300; // Radius of the sphere
      
      const group = Math.floor(Math.random() * 3) + 1;
      const skillsList = SKILLS[group as keyof typeof SKILLS];
      
      nodes.push({
        id: i,
        x: r * Math.cos(theta) * Math.sin(phi),
        y: r * Math.sin(theta) * Math.sin(phi),
        z: r * Math.cos(phi),
        group: group,
        radius: Math.random() * 2 + 3,
        name: skillsList[Math.floor(Math.random() * skillsList.length)],
        mastery: Math.floor(Math.random() * 40) + 60, // 60-100%
        trend: Math.random() > 0.5 ? 'up' : 'flat'
      });
    }

    // Generate Links based on distance
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        // Connect nearby nodes
        if (dist < 120) {
          links.push({ source: i, target: j });
        }
      }
    }

    return { nodes, links };
  }, [nodeCount]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth || window.innerWidth;
    const height = svgRef.current.clientHeight || 800;
    
    // Clear previous
    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create selection groups
    const linkGroup = g.append("g").attr("class", "links");
    const nodeGroup = g.append("g").attr("class", "nodes");

    // Static Selection references
    const linkSel = linkGroup.selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#4A7C9B")
      .attr("stroke-width", 1);

    const nodeSel = nodeGroup.selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("fill", d => COLORS[d.group as keyof typeof COLORS])
      .attr("cursor", "pointer")
      .on("mouseenter", function(_event, d) {
        setIsHovering(true);
        d3.select(this)
          .transition().duration(200)
          .attr("r", (d as any).projectedScale * 12)
          .attr("fill", "#fff");
      })
      .on("mouseleave", function(_event, d) {
        setIsHovering(false);
        if (selectedNode?.id !== d.id) {
           d3.select(this)
            .transition().duration(200)
            .attr("r", (d as any).projectedScale * d.radius)
            .attr("fill", COLORS[d.group as keyof typeof COLORS]);
        }
      })
      .on("click", (event, d) => {
        event.stopPropagation();
        setSelectedNode(d);
      });

    let angle = 0;
    let animationId: number;

    const animate = () => {
      // If hovering or node selected, slow down rotation significantly
      const rotationSpeed = (isHovering || selectedNode) ? 0.0005 : 0.002;
      angle += rotationSpeed;

      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // 3D Projection Logic
      const focalLength = 400;

      // Update Nodes
      data.nodes.forEach((node: any) => {
        // Rotate around Y axis
        const rx = node.x * cos - node.z * sin;
        const rz = node.z * cos + node.x * sin;
        const ry = node.y; // No rotation around X/Z for now

        // Project
        const scale = focalLength / (focalLength + rz + 400); // +400 to push it back
        node.projectedX = rx * scale;
        node.projectedY = ry * scale;
        node.projectedScale = scale;
        node.projectedZ = rz; // For sorting
      });

      // Update DOM
      // We manually update attributes for performance instead of React render
      
      linkSel
        .attr("x1", (d: any) => data.nodes[d.source].projectedX!)
        .attr("y1", (d: any) => data.nodes[d.source].projectedY!)
        .attr("x2", (d: any) => data.nodes[d.target].projectedX!)
        .attr("y2", (d: any) => data.nodes[d.target].projectedY!)
        .attr("opacity", (d: any) => {
            // Fade distant links
            const zAvg = (data.nodes[d.source].projectedZ! + data.nodes[d.target].projectedZ!) / 2;
            const distScale = Math.max(0, (1 - (zAvg + 300) / 600)); // Rough depth map
            return distScale * 0.4;
        });

      nodeSel
        .attr("cx", (d: any) => d.projectedX)
        .attr("cy", (d: any) => d.projectedY)
        .attr("r", (d: any) => {
            const baseR = d.id === selectedNode?.id ? 10 : d.radius;
            return baseR * d.projectedScale * (d.id === selectedNode?.id ? 1.5 : 1);
        })
        .attr("opacity", (d: any) => {
           // Fade distant nodes
           return Math.max(0.2, 1 - (d.projectedZ + 300) / 800);
        })
        .sort((a: any, b: any) => b.projectedZ - a.projectedZ); // Sort by depth

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [data, isHovering, selectedNode]);

  // Handle outside click to close card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
             // Let the SVG click handler handle node clicks
             // We only want to close if clicking strictly outside nodes
             // This is tricky with SVG separate, so we'll just check if target is NOT a circle
             if ((event.target as HTMLElement).tagName !== 'circle') {
                 setSelectedNode(null);
             }
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`}>
      <svg 
        ref={svgRef} 
        className="w-full h-full pointer-events-auto"
        style={{ overflow: 'visible' }} // Allow tooltips to overflow if needed
      />

      {/* Interactive Competency Card */}
      {selectedNode && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-in fade-in zoom-in duration-200">
           <Card className="w-80 backdrop-blur-xl bg-aeios-deep/90 border border-aeios-p1/30 text-white shadow-2xl shadow-aeios-p1/10">
              <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                     <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: COLORS[selectedNode.group as keyof typeof COLORS] }}></div>
                     <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                         Pillar {selectedNode.group}
                     </span>
                  </div>
                  <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white transition-colors">
                      <X className="w-4 h-4" />
                  </button>
              </div>

              <h3 className="text-xl font-bold mb-1">{selectedNode.name}</h3>
              <p className="text-sm text-slate-400 mb-6">Mastery Assessment</p>

              <div className="space-y-4">
                  <div>
                      <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-300">Proficiency</span>
                          <span className="font-mono font-bold text-aeios-signal">{selectedNode.mastery}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ 
                                width: `${selectedNode.mastery}%`,
                                backgroundColor: COLORS[selectedNode.group as keyof typeof COLORS]
                            }}
                          ></div>
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                          <div className="flex items-center text-xs text-slate-400 mb-1">
                              <TrendingUp className="w-3 h-3 mr-1" /> Trend
                          </div>
                          <div className="text-sm font-semibold text-emerald-400">
                              {selectedNode.trend === 'up' ? '+4.2%' : '+0.0%'}
                          </div>
                      </div>
                      <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                          <div className="flex items-center text-xs text-slate-400 mb-1">
                              <AlertCircle className="w-3 h-3 mr-1" /> Gaps
                          </div>
                          <div className="text-sm font-semibold text-slate-200">
                              None Detected
                          </div>
                      </div>
                  </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-between items-center">
                  <span className="text-xs text-slate-500">ID: N-{selectedNode.id}29-X</span>
                  <button className="text-xs text-aeios-signal hover:text-white transition-colors font-medium">
                      View Learning Path →
                  </button>
              </div>
           </Card>
        </div>
      )}
    </div>
  );
};

export default GraphVisualization;