'use strict';

figma.showUI(__html__, { width: 232, height: 300 });
figma.ui.onmessage = msg => {
    if (msg.type == 'PieChart') {
        var [outerRadius, innerRadius, percents] = [msg.outerRadius, msg.innerRadius, msg.percents];
        var filledEllipse = figma.createEllipse();
        var ellipse = figma.createEllipse();
        var frame = figma.createFrame();
        var endingAngle = 2 * Math.PI * percents / 100;
        var convertedInnerRadius = innerRadius / outerRadius;
        filledEllipse.resize(outerRadius, outerRadius);
        ellipse.resize(outerRadius, outerRadius);
        frame.resize(outerRadius, outerRadius);
        filledEllipse.arcData = { startingAngle: 0, endingAngle: endingAngle, innerRadius: convertedInnerRadius };
        ellipse.arcData = { startingAngle: endingAngle, endingAngle: 2 * Math.PI, innerRadius: convertedInnerRadius };
        filledEllipse.fills = [{ type: 'SOLID', color: { r: 1, g: 0.4, b: 0.2 } }];
        ellipse.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
        frame.appendChild(ellipse);
        frame.appendChild(filledEllipse);
        if (figma.currentPage.selection) {
            if (Array.isArray(figma.currentPage.selection)) {
                var currentSelection = figma.currentPage.selection[0];
                frame.x = currentSelection.width / 2 - outerRadius / 2;
                frame.y = currentSelection.height / 2 - outerRadius / 2;
                figma.currentPage.selection[0].appendChild(frame);
            }
        }
    }
    figma.closePlugin();
};
