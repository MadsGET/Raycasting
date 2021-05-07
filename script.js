// Grid Properties
// const mapSizePx = 512;                // Mapsize x and y in px
// let gridSize = 4;                     // Amount of tiles in each direction
// const textmargin = 4;                 // Canvas text margin in px
// const canvas = document.getElementById('canvas');
// let tiles = [];

// // Player Properties
// const playerSize = mapSizePx / gridSize / 8;

// function Setup()
// {
//     let calculatedTileSize = mapSizePx / gridSize;

//     // Setup canvas
//     canvas.width = mapSizePx;
//     canvas.height = mapSizePx;

//     // Calculate tilesize
//     CreateGrid(calculatedTileSize);
//     DrawTiles(calculatedTileSize);
//     DrawPlayer(GetTile(new Vector(0, 0)).worldPosition);
// }

// function CreateGrid(tileSize)
// {
//     for(let x = 0; x < gridSize; x++)
//     {
//         for(let y = 0; y < gridSize; y++)
//         {
//             tiles[x + (y * gridSize)] = ({
//                 gridPosition: new Vector(x, y), 
//                 worldPosition: new Vector((x * tileSize) + tileSize / 2, (y * tileSize) + tileSize / 2),
//             });
//         }
//     }
// }

// function GetTile(position)
// {
//     return tiles[position.x + (position.y * gridSize)];
// }

// function DrawTiles(tileSize)
// {    
//     let ctx = canvas.getContext("2d");

//     for(let x = 0; x < gridSize; x++)
//     {
//         for(let y = 0; y < gridSize; y++)
//         {
//             ctx.beginPath();
//             ctx.rect(x * tileSize, y * tileSize, tileSize, tileSize);
//             ctx.stroke();
//             ctx.strokeText(`${x}, ${y}`, x * tileSize + textmargin, (y + 1) * tileSize - textmargin);
//         }
//     }

//     ctx.closePath();
// }

// function DrawPlayer(position)
// {
//     let ctx = canvas.getContext("2d");
//     ctx.beginPath();
//     ctx.arc(position.x, position.y, playerSize, 0, 2 * Math.PI);
//     ctx.fillStyle = '#FF0000';
//     ctx.fill();

//     ctx.beginPath();
//     ctx.moveTo(position.x, position.y);
//     ctx.lineTo(position.x + 320, position.y);
//     ctx.stroke();
// }