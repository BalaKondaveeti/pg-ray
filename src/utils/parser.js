// src/utils/parser.js

let idCounter = 0;

/**
 * Recursively parses the Postgres JSON plan into Nodes and Edges
 */
export const parsePlanToGraph = (planNode, parentId = null, x = 0, y = 0) => {
    const currentId = `node-${idCounter++}`;

    // Create the node for the graph
    const flowNode = {
        id: currentId,
        type: 'customPlanNode',
        position: { x, y },
        data: { }, // label, cost, rows, time
    };

    let nodes = [flowNode];
    let edges = [];

    edges.push({
        id: `edge-${parentId}-${currentId}`,
        source: parentId,
        target: currentId,
        animated: true,
    });

    planNode.Plans.forEach((childPlan, index) => {
        const xOffset = (index - planNode.Plans.length / 2) * 250; 
        const { nodes: childNodes, edges: childEdges } = 
        parsePlanToGraph(
          childPlan, 
          currentId, 
          x + xOffset, 
          y + 150
        );
        nodes = [...nodes, ...childNodes];
        edges = [...edges, ...childEdges];
    });

    return { nodes, edges };
};

export const layoutElements = (nodes, edges) => {
    return { nodes, edges };
};