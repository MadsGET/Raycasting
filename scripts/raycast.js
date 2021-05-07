const raycast = 
{
    drawRay: true,             // Toggles the drawing of rays.
    colorOrigin: '#FF0000',

    CastAll(rayList)
    {
        let result = [];

        for(let i = 0; i < rayList.length; i++)
        {
            let distance = rayList[i].Cast();
            result.push(distance);
        }

        return result;
    },
}

class Ray
{
    constructor(origin, direction, maxLength)
    {
        this.origin = origin;
        this.direction = direction;
        this.maxLength = maxLength;
    }

    Cast()
    {
        let ctx = canvas.getContext('2d');
        for(let i = 1; i < this.maxLength +1; i++)
        {
            // Calculate the new position.
            let newPosition = this.origin.Add(new Vector(this.direction.x * i, this.direction.y * i));
            
            // Check if this node is closed.
            let currentIndex = grid.FetchNodeIndex(newPosition);

            // End if the node contains something.
            if(grid.nodes[currentIndex] != null && grid.nodes[currentIndex].state) return i - 1;
            else if(grid.nodes[currentIndex] == null) return -1;
            
            this.DrawToCanvas(newPosition, '#ff6969', ctx);
        }   
        
        return this.maxLength;
    }

    Growcast()
    {
        return null;
    }

    DrawToCanvas(position, color, ctx)
    {
        if(!raycast.drawRay)return;
        ctx.fillStyle = color;
        ctx.fillRect(position.x, position.y, 1, 1);
    }
}