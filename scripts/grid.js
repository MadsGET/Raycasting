const grid =
{
    resolution: 64,    // Defines the map resolution in each axis and in px
    nodes: [],          // Holds each node within the canvas.
    map:                // Map which draws squares into the world, must be squared.
    [
        [1, 0, 0, 0],
        [1, 0, 1, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
    ],

    Initialize()
    {
        // Set canvas properties
        canvas.width = this.resolution;
        canvas.height = this.resolution;

        let ctx = canvas.getContext('2d');
        let useAltColor = false;

        for(let x = 0; x < this.resolution; x++)
        {
            for(let y = 0; y < this.resolution; y++)
            {
                let currentPosition = new Vector(x, y);
                let currentIndex = this.FetchNodeIndex(currentPosition);
                let currentColor = (useAltColor) ? '#333333' : '#999999';

                // Add a new node to our list.
                this.nodes[currentIndex] = this.AddNode(currentPosition, currentColor);

                // Switch colors
                useAltColor = !useAltColor;
            }
            useAltColor = !useAltColor;
        }

        // Draw the map on the scene.
        this.CreateTiles();
    },

    CreateTiles()
    {
        // Map calculation.
        let tileSize = this.resolution / this.map[0].length;
        let mapSize = this.map.length * this.map[0].length / 4;

        for(let x = 0; x < mapSize; x++)
        {
            for(let y = 0; y < mapSize; y++)
            {
                if(this.map[y][x] != 0)
                {
                    let origin = new Vector(x * tileSize, y * tileSize);
                    this.CreateSquare(origin, tileSize);
                }
            }
        }
    },

    AddNode(position, color)
    {
        return{
            position,
            color,
            state: false,
        }
    },

    // Fetch a node index based upon a position
    FetchNodeIndex(position)
    {
        return position.x + (position.y * grid.resolution);
    },

    // Fetches a node object from a position
    FetchNode(position)
    {
        return this.nodes[this.FetchNodeIndex(position)];
    },

    UpdateNode(position, state)
    {
        let node = this.FetchNode(position);
        if(node == null) return;
        node.color = '#00FFFF';
        node.state = state;
    },

    CreateSquare(origin, size)
    {
        let cornerX = origin.Add(new Vector(0, size));
        let cornerY = origin.Add(new Vector(size, 0));
        this.CreateLine(origin, new Vector(0, 1), size);       // Creates a line in the yAxis.
        this.CreateLine(origin, new Vector(1, 0), size);       // Creates a line in the xAxis.
        this.CreateLine(cornerX, new Vector(1, 0), size);       // Creates a line in the xAxis.
        this.CreateLine(cornerY, new Vector(0, 1), size);       // Creates a line in the xAxis.
    },

    CreateLine(origin, direction, length)
    {
        // console.log('Origin     ' + origin.ToString());    
        // console.log('Direction  ' + direction.ToString());
        for(let i = 0; i < length + 1; i++)
        {
            let newPosition = origin.Add(new Vector(direction.x * i, direction.y * i));
            grid.UpdateNode(newPosition, true);
        }
    },

    DrawGrid(ctx)
    {
        for(let i = 0; i < this.nodes.length; i++)
        {
            this.DrawToCanvas(this.nodes[i].position, this.nodes[i].color, ctx);
        }
    },

    DrawToCanvas(position, color, ctx)
    {
        ctx.fillStyle = color;
        ctx.fillRect(position.x, position.y, 1, 1);
    },
}

// Self intialize
grid.Initialize();
// grid.CreateLine(new Vector(0, 32), new Vector(1, 0), 10);
// grid.CreateSquare(new Vector(32, 32), 8);
// grid.CreateSquare(new Vector(0, 0), 128);